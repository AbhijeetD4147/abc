// ... existing code ...

export interface IAuthGuidResponse {
  authEmail?: string;
  authId?: number;
  authMobile?: string;
  authName?: string;
  isExpired?: boolean;
  status?: string;
}

export class AuthGuidResponseModel implements IAuthGuidResponse {
  authEmail?: string;
  authId?: number;
  authMobile?: string;
  authName?: string;
  isExpired?: boolean;
  status?: string;

  constructor({
    authEmail,
    authId,
    authMobile,
    authName,
    isExpired,
    status,
  }: IAuthGuidResponse) {
    this.authEmail = authEmail;
    this.authId = authId;
    this.authMobile = authMobile;
    this.authName = authName;
    this.isExpired = isExpired;
    this.status = status;
  }

  static fromJson(json: { [key: string]: any }): AuthGuidResponseModel {
    return new AuthGuidResponseModel({
      authEmail: json['authEmail'],
      authId: json['authId'],
      authMobile: json['authMobile'],
      authName: json['authName'],
      isExpired: json['isExpired'],
      status: json['status'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['authEmail'] = this.authEmail;
    data['authId'] = this.authId;
    data['authMobile'] = this.authMobile;
    data['authName'] = this.authName;
    data['isExpired'] = this.isExpired;
    data['status'] = this.status;
    return data;
  }
}