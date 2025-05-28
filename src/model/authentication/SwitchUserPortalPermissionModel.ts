export interface SwitchUserPortalPermission {
  isExpired: boolean;
  isPortalAccess: boolean;
  isHealthSummaryForDownload: boolean;
  isHealthSummaryForView: boolean;
  isHealthSummaryForTransmit: boolean;
  userProfilePhotoBase64: string;
  isOptedOut: boolean;
}

export class SwitchUserPortalPermissionModel implements SwitchUserPortalPermission {
  isExpired: boolean;
  isPortalAccess: boolean;
  isHealthSummaryForDownload: boolean;
  isHealthSummaryForView: boolean;
  isHealthSummaryForTransmit: boolean;
  userProfilePhotoBase64: string;
  isOptedOut: boolean;

  constructor({
    isExpired,
    isPortalAccess,
    isHealthSummaryForDownload,
    isHealthSummaryForView,
    isHealthSummaryForTransmit,
    userProfilePhotoBase64,
    isOptedOut,
  }: SwitchUserPortalPermission) {
    this.isExpired = isExpired;
    this.isPortalAccess = isPortalAccess;
    this.isHealthSummaryForDownload = isHealthSummaryForDownload;
    this.isHealthSummaryForView = isHealthSummaryForView;
    this.isHealthSummaryForTransmit = isHealthSummaryForTransmit;
    this.userProfilePhotoBase64 = userProfilePhotoBase64;
    this.isOptedOut = isOptedOut;
  }

  static fromJson(json: { [key: string]: any }): SwitchUserPortalPermissionModel {
    return new SwitchUserPortalPermissionModel({
      isExpired: json['isExpired'] as boolean,
      isPortalAccess: json['isPortalAccess'] as boolean,
      isHealthSummaryForDownload: json['isHealthSummaryForDownload'] as boolean,
      isHealthSummaryForView: json['isHealthSummaryForView'] as boolean,
      isHealthSummaryForTransmit: json['isHealthSummaryForTransmit'] as boolean,
      userProfilePhotoBase64: json['userProfilePhotoBase64'] as string,
      isOptedOut: json['isOptedOut'] as boolean,
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'isExpired': this.isExpired,
      'isPortalAccess': this.isPortalAccess,
      'isHealthSummaryForDownload': this.isHealthSummaryForDownload,
      'isHealthSummaryForView': this.isHealthSummaryForView,
      'isHealthSummaryForTransmit': this.isHealthSummaryForTransmit,
      'userProfilePhotoBase64': this.userProfilePhotoBase64,
      'isOptedOut': this.isOptedOut,
    };
  }
}