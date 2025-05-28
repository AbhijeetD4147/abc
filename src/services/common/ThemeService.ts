import axios, { type AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import type { ThemeResponse, ThemeServiceConfig } from '../../types/theme';
// import { authService } from './authService';
// import { globalParams } from '../utils/globalParams';

class ThemeService {
  private theme: string | null = null;
  private maximumCallingAPI: number = 0;
  private responseStatusCodeAPI: number | null = null;
  
  private readonly config: ThemeServiceConfig = {
    maxApiCalling: 3, 
    retryDelayMs: 1000
  };

  /**
   * Get application theme from the API
   * @returns Promise<ThemeResponse | null>
   */
  async getAppTheme(){
    // try {
    //   const url = `${process.env.VITE_API_BASE_URL}/api/Home/GetTheme`;//Update URL
      
    //   const response: AxiosResponse<string> = await axios.get(url, {
    //     headers: {
    //       'Authorization': `Bearer ${globalParams.TOKEN}`,
    //       'Content-Type': 'application/json',
    //       'X-Practice-Name': globalParams.PRACTICE_NAME
    //     }
    //   });

    //   if (response.status === 200) {
    //     this.theme = response.data;
    //     this.responseStatusCodeAPI = response.status;
        
    //     return {
    //       theme: this.theme,
    //       statusCode: this.responseStatusCodeAPI
    //     };
    //   } else {
    //     return await this.handleNon200Response(response.status);
    //   }
    // } catch (error: any) {
    //   return await this.handleError(error);
    // }
  }

  /**
   * Handle non-200 HTTP responses with retry logic
   */
  private async handleNon200Response(statusCode: number) {
    // this.maximumCallingAPI += 1;
    
    // if (this.maximumCallingAPI < this.config.maxApiCalling) {
    //   if (statusCode === 401) {
    //     // Token expired, regenerate and retry
    //     try {
    //       await authService.generateToken();
    //     //   return await this.getAppTheme();
    //     } catch (authError) {
    //       console.error('Token regeneration failed:', authError);
    //       toast.error('Authentication failed. Please login again.');
    //     //   return null;
    //     }
    //   } else {
    //     // Other errors, retry after delay
    //     await this.delay(this.config.retryDelayMs);
    //     // return await this.getAppTheme();
    //   }
    // } else {
    //   this.responseStatusCodeAPI = statusCode;
    //   toast.error(`Failed to fetch theme after ${this.config.maxApiCalling} attempts`);
    //   return null;
    // }
  }

  /**
   * Handle network and other errors
   */
  private async handleError(error: any) {
    if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
      console.log('No Internet');
      toast.error('No internet connection. Please check your network.');
    } else if (error.response) {
      // Server responded with error status
      return await this.handleNon200Response(error.response.status);
    } else {
      console.error('Caught error:', error);
      toast.error('An unexpected error occurred while fetching theme.');
    }
    return null;
  }

  /**
   * Utility method for delay
   */
  private delay(ms: number) {
    // return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get current theme value
   */
  getCurrentTheme(): string | null {
    return this.theme;
  }

  /**
   * Get last response status code
   */
  getLastStatusCode(): number | null {
    return this.responseStatusCodeAPI;
  }

  /**
   * Reset retry counter (useful for new requests)
   */
  resetRetryCounter(): void {
    this.maximumCallingAPI = 0;
  }
}

// Export singleton instance
export const themeService = new ThemeService();
export default themeService;