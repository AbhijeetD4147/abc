export class ManagePermissions {
  /**
   * Request camera permission for web browsers
   */
  static async askCameraPermission(): Promise<boolean> {
    try {
      // Check if navigator.mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not supported in this browser');
        return false;
      }

      // Check current permission status
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });
        
        if (permission.state === 'denied') {
          alert('Camera permission denied. Please enable camera access in your browser settings.');
          return false;
        }
        
        if (permission.state === 'granted') {
          return true;
        }
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      // Stop the stream immediately as we only wanted to check permission
      stream.getTracks().forEach(track => track.stop());
      
      return true;
    } catch (error) {
      console.error('Camera permission error:', error);
      
      if (error instanceof DOMException) {
        switch (error.name) {
          case 'NotAllowedError':
            alert('Camera access denied. Please allow camera access and try again.');
            break;
          case 'NotFoundError':
            alert('No camera found on this device.');
            break;
          case 'NotSupportedError':
            alert('Camera not supported in this browser.');
            break;
          default:
            alert('Camera access error. Please check your browser settings.');
        }
      }
      
      return false;
    }
  }

  /**
   * Request storage permission for web browsers (File System Access API)
   */
  static async askStoragePermission(): Promise<boolean> {
    try {
      // Check if File System Access API is available
      if ('showDirectoryPicker' in window) {
        // Modern browsers with File System Access API
        try {
          await (window as any).showDirectoryPicker({ mode: 'readwrite' });
          return true;
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') {
            console.log('User cancelled directory selection');
            return false;
          }
          throw error;
        }
      } else {
        // Fallback for browsers without File System Access API
        // Web browsers generally don't require explicit storage permission
        // for localStorage, sessionStorage, or IndexedDB
        console.log('File System Access API not available. Using fallback storage methods.');
        return true;
      }
    } catch (error) {
      console.error('Storage permission error:', error);
      alert('Storage access error. Please check your browser settings.');
      return false;
    }
  }

  /**
   * Open browser settings (web equivalent of openAppSettings)
   */
  static openBrowserSettings(): void {
    alert(
      'To enable permissions:\n\n' +
      '1. Click the lock/shield icon in your address bar\n' +
      '2. Set Camera and Microphone to "Allow"\n' +
      '3. Refresh the page'
    );
  }

  /**
   * Check if camera permission is granted
   */
  static async isCameraPermissionGranted(): Promise<boolean> {
    try {
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });
        return permission.state === 'granted';
      }
      return false;
    } catch (error) {
      console.error('Error checking camera permission:', error);
      return false;
    }
  }

  /**
   * Check if storage access is available
   */
  static isStorageAccessAvailable(): boolean {
    return (
      'localStorage' in window &&
      'sessionStorage' in window &&
      'indexedDB' in window
    );
  }
}

export default ManagePermissions;