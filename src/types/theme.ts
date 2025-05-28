export interface ThemeResponse {
  theme: string;
  statusCode: number;
}

export interface ThemeServiceConfig {
  maxApiCalling: number;
  retryDelayMs: number;
}