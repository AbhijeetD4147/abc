// ... existing code ...

export interface IAuthUserDetail {
  authId?: any;
  authFirstName?: any;
  authLastName?: any;
  authMobileNo?: any;
  authEmail?: any;
  expiryDate?: any;
  matchFoundCustomerId?: any;
  authInitials?: any;
  authFullName?: any;
  lastPassChangedDate?: any;
}

export class AuthUserDetail implements IAuthUserDetail {
  authId?: any;
  authFirstName?: any;
  authLastName?: any;
  authMobileNo?: any;
  authEmail?: any;
  expiryDate?: any;
  matchFoundCustomerId?: any;
  authInitials?: any;
  authFullName?: any;
  lastPassChangedDate?: any;

  constructor({
    authId,
    authFirstName,
    authLastName,
    authMobileNo,
    authEmail,
    expiryDate,
    matchFoundCustomerId,
    authInitials,
    authFullName,
    lastPassChangedDate,
  }: IAuthUserDetail) {
    this.authId = authId;
    this.authFirstName = authFirstName;
    this.authLastName = authLastName;
    this.authMobileNo = authMobileNo;
    this.authEmail = authEmail;
    this.expiryDate = expiryDate;
    this.matchFoundCustomerId = matchFoundCustomerId;
    this.authInitials = authInitials;
    this.authFullName = authFullName;
    this.lastPassChangedDate = lastPassChangedDate;
  }

  static fromJson(json: { [key: string]: any }): AuthUserDetail {
    return new AuthUserDetail({
      authId: json['authId'],
      authFirstName: json['authFirstName'] ?? '',
      authLastName: json['authLastName'] ?? '',
      authMobileNo: json['authMobileNo'] ?? '',
      authEmail: json['authEmail'] ?? '',
      expiryDate: json['expiryDate'] ?? '',
      matchFoundCustomerId: json['matchFoundCustomerId'] ?? '',
      authInitials: json['authInitials'] ?? '',
      authFullName: json['authFullName'] ?? '',
      lastPassChangedDate: json['lastPassChangedDate'] ?? '',
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['authId'] = this.authId;
    data['authFirstName'] = this.authFirstName;
    data['authLastName'] = this.authLastName;
    data['authMobileNo'] = this.authMobileNo;
    data['authEmail'] = this.authEmail;
    data['expiryDate'] = this.expiryDate;
    data['matchFoundCustomerId'] = this.matchFoundCustomerId;
    data['authInitials'] = this.authInitials;
    data['authFullName'] = this.authFullName;
    data['lastPassChangedDate'] = this.lastPassChangedDate;
    return data;
  }

  toMap(): { [key: string]: any } {
    return {
      'authId': this.authId,
      'authFirstName': this.authFirstName,
      'authLastName': this.authLastName,
      'authMobileNo': this.authMobileNo,
      'authEmail': this.authEmail,
      'expiryDate': this.expiryDate,
      'matchFoundCustomerId': this.matchFoundCustomerId,
      'authInitials': this.authInitials,
      'authFullName': this.authFullName,
      'lastPassChangedDate': this.lastPassChangedDate,
    };
  }
}