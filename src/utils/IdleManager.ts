
import { ApiPath } from './constants'; // Adjust path as needed

export class IdleManager {
  private static _instance: IdleManager = new IdleManager();
  
  static getInstance(): IdleManager {
    return IdleManager._instance;
  }
  
  private constructor() {}

  private _lastActivity: Date = new Date();
  private _idleDuration: number = parseInt(ApiPath.idleTime) * 60 * 1000; // Convert minutes to milliseconds
  private onIdle: (() => void) | null = null;
  private _isActive: boolean = false;
  private _hasFired: boolean = false;
  private _eventListeners: (() => void)[] = [];
  private _intervalId: NodeJS.Timeout | null = null;

  startListening(options: { onIdle: () => void }): void {
    if (this._isActive) return;
    
    this._isActive = true;
    this.onIdle = options.onIdle;
    this._lastActivity = new Date();
    this._hasFired = false;

    this._addEventListeners();
    this._startActivityChecker();
  }

  private _addEventListeners(): void {
    const updateActivity = () => this._updateLastActivity();

    // Mouse and keyboard events
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('scroll', updateActivity);
    window.addEventListener('touchstart', updateActivity);

    // Store cleanup functions
    this._eventListeners = [
      () => window.removeEventListener('mousemove', updateActivity),
      () => window.removeEventListener('keydown', updateActivity),
      () => window.removeEventListener('scroll', updateActivity),
      () => window.removeEventListener('touchstart', updateActivity)
    ];

    // Page visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        this._checkIdle();
        this._updateLastActivity();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    this._eventListeners.push(() => 
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    );
  }

  private _updateLastActivity(): void {
    this._lastActivity = new Date();
    this._hasFired = false; // Reset
  }

  private _startActivityChecker(): void {
    this._intervalId = setInterval(() => {
      if (this._isActive) {
        this._checkIdle();
      }
    }, 1000); // Check every second
  }

  private _checkIdle(): void {
    const now = new Date();
    const diff = now.getTime() - this._lastActivity.getTime();
    
    if (diff >= this._idleDuration && !this._hasFired) {
      this._hasFired = true;
      if (this.onIdle) {
        this.onIdle();
      }
    }
  }

  stopListening(): void {
    this._isActive = false;
    
    // Clear interval
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
    
    // Remove event listeners
    this._eventListeners.forEach(cleanup => cleanup());
    this._eventListeners = [];
    
    // Reset state
    this.onIdle = null;
    this._hasFired = false;
  }
}

// Export singleton instance for convenience
export const idleManager = IdleManager.getInstance();