export interface AuthorizedIndividualPermission {
  isPortalAccess?: boolean;
  expiryDate?: string;
  isView?: boolean;
  isDownload?: boolean;
  isTransmit?: boolean;
  authName?: string;
  authEmail?: string;
  authMobile?: string;
  userId?: string;
  authId?: string;
  authDOB?: string;
  authUserCreatedDate?: string;
  isExpired?: boolean;
  isActivityLogAccess?: boolean;
}

export class AuthorizedIndividualPermissionModel {
  isPortalAccess?: boolean;
  expiryDate?: string;
  isView?: boolean;
  isDownload?: boolean;
  isTransmit?: boolean;
  authName?: string;
  authEmail?: string;
  authMobile?: string;
  userId?: string;
  authId?: string;
  authDOB?: string;
  authUserCreatedDate?: string;
  isExpired?: boolean;
  isActivityLogAccess?: boolean;

  constructor(data: AuthorizedIndividualPermission) {
    this.isPortalAccess = data.isPortalAccess;
    this.expiryDate = data.expiryDate;
    this.isView = data.isView;
    this.isDownload = data.isDownload;
    this.isTransmit = data.isTransmit;
    this.authName = data.authName;
    this.authEmail = data.authEmail;
    this.authMobile = data.authMobile;
    this.userId = data.userId;
    this.authId = data.authId;
    this.authDOB = data.authDOB;
    this.authUserCreatedDate = data.authUserCreatedDate;
    this.isExpired = data.isExpired;
    this.isActivityLogAccess = data.isActivityLogAccess;
  }

  static fromJson(json: any): AuthorizedIndividualPermissionModel {
    return new AuthorizedIndividualPermissionModel({
      isPortalAccess: json['isPortalAccess'],
      expiryDate: json['expiryDate'] ?? '',
      isView: json['isview'],
      isDownload: json['isDownload'],
      isTransmit: json['isTransmit'],
      authName: json['authName'] ?? '',
      authEmail: json['authEmail'] ?? '',
      authMobile: json['authMobile'] ?? '',
      userId: json['userId'] ?? '',
      authId: json['authId'] ?? '',
      authDOB: json['authDOB'] ?? '',
      authUserCreatedDate: json['authUserCreatedDate'] ?? '',
      isExpired: json['isExpired'],
      isActivityLogAccess: json['isActivityLogAccess'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['isPortalAccess'] = this.isPortalAccess;
    data['expiryDate'] = this.expiryDate;
    data['isview'] = this.isView;
    data['isDownload'] = this.isDownload;
    data['isTransmit'] = this.isTransmit;
    data['authName'] = this.authName;
    data['authEmail'] = this.authEmail;
    data['authMobile'] = this.authMobile;
    data['userId'] = this.userId;
    data['authId'] = this.authId;
    data['authDOB'] = this.authDOB;
    data['authUserCreatedDate'] = this.authUserCreatedDate;
    data['isExpired'] = this.isExpired;
    data['isActivityLogAccess'] = this.isActivityLogAccess;
    return data;
  }
}