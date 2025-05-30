// Import React types for context (equivalent to Flutter's BuildContext)
import { useContext } from 'react';


class Responsive {
  static isMobile(width: number): boolean {
    // Implement your mobile detection logic here
    // For example: return width < 768;
    return window.innerWidth < 768;
  }
}

export class AppSizeStyles {
  static getHeading(width: number, size: number): number {
    return Responsive.isMobile(width) ? 0.15 * size : 0.04 * size;
  }

  static getHeadingTextSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.06 : width * 0.016;
  }

  static getSubHeadingTextSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.04 : width * 0.012;
  }

  static getHeadingIconSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.16 : width * 0.06;
  }

  static getTextBoxTextSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.04 : width * 0.012;
  }

  static getTextBoxHeightSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.1 : width * 0.032;
  }

  static getErrorTextBoxHeightSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.1 : width * 0.053;
  }

  static getTextBoxIconSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.05 : width * 0.015;
  }

  static getRegularTextSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.035 : width * 0.011;
  }

  static getButtonHeightSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.1 : width * 0.03;
  }

  static getButtonTextSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.04 : width * 0.011;
  }

  static getSmallTextSize(width: number): number {
    return Responsive.isMobile(width) ? 8 : width * 0.008;
  }

  static getDashboardBigIconSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.1 : width * 0.03;
  }

  static getDashboardBigIconCircleSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.17 : width * 0.07;
  }

  static getDashHeadingTextSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.05 : width * 0.021;
  }

  static getDrawerSize(width: number): number {
    return Responsive.isMobile(width) ? width * 0.6 : width * 0.2;
  }
}