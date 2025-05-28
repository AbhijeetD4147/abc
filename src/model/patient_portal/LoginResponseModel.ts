export interface ILoginResponseModel {
  loginStatus?: number;
  userId?: number;
  ptCustomerID?: number;
  maximeyesPatientNumber?: string;
  userType?: string;
  ptDOB?: string;
  loginAttemptsleft?: number;
  isAccountLocked?: boolean;
  timeRemaining?: number;
  accountLockedDateTime?: string;
  isOtpRequired?: boolean;
  userProfilePhotoBase64?: string;
  sessionGuid?: string;
  locationPhone?: string;
  iS_DOB_VERIFIED?: boolean;
  isOptedOut?: boolean;
  optedOutBy?: string;
  optedOutDate?: string;
}

export class LoginResponseModel implements ILoginResponseModel {
  loginStatus?: number;
  userId?: number;
  ptCustomerID?: number;
  maximeyesPatientNumber?: string;
  userType?: string;
  ptDOB?: string;
  loginAttemptsleft?: number;
  isAccountLocked?: boolean;
  timeRemaining?: number;
  accountLockedDateTime?: string;
  isOtpRequired?: boolean;
  userProfilePhotoBase64?: string;
  sessionGuid?: string;
  locationPhone?: string;
  iS_DOB_VERIFIED?: boolean;
  isOptedOut?: boolean;
  optedOutBy?: string;
  optedOutDate?: string;

  constructor({
    loginStatus,
    userId,
    ptCustomerID,
    maximeyesPatientNumber,
    userType,
    ptDOB,
    loginAttemptsleft,
    isAccountLocked,
    timeRemaining,
    accountLockedDateTime,
    isOtpRequired,
    userProfilePhotoBase64,
    sessionGuid,
    locationPhone,
    iS_DOB_VERIFIED,
    isOptedOut,
    optedOutBy,
    optedOutDate,
  }: ILoginResponseModel) {
    this.loginStatus = loginStatus;
    this.userId = userId;
    this.ptCustomerID = ptCustomerID;
    this.maximeyesPatientNumber = maximeyesPatientNumber;
    this.userType = userType;
    this.ptDOB = ptDOB;
    this.loginAttemptsleft = loginAttemptsleft;
    this.isAccountLocked = isAccountLocked;
    this.timeRemaining = timeRemaining;
    this.accountLockedDateTime = accountLockedDateTime;
    this.isOtpRequired = isOtpRequired;
    this.userProfilePhotoBase64 = userProfilePhotoBase64;
    this.sessionGuid = sessionGuid;
    this.locationPhone = locationPhone;
    this.iS_DOB_VERIFIED = iS_DOB_VERIFIED;
    this.isOptedOut = isOptedOut;
    this.optedOutBy = optedOutBy;
    this.optedOutDate = optedOutDate;
  }

  static fromJson(json: { [key: string]: any }): LoginResponseModel {
    return new LoginResponseModel({
      loginStatus: json['loginStatus'],
      userId: json['userId'],
      ptCustomerID: json['ptCustomerID'],
      maximeyesPatientNumber: json['maximeyesPatientNumber'],
      userType: json['userType'],
      ptDOB: json['ptDOB'],
      loginAttemptsleft: json['loginAttemptsleft'],
      isAccountLocked: json['isAccountLocked'],
      timeRemaining: json['timeRemaining'],
      isOtpRequired: json['isOtpRequired'],
      userProfilePhotoBase64: json['userProfilePhotoBase64'] ?? '',
      accountLockedDateTime: json['accountLockedDateTime'] ?? '',
      sessionGuid: json['sessionGuid'] ?? '',
      locationPhone: json['locationPhone'] ?? "",
      iS_DOB_VERIFIED: json['iS_DOB_VERIFIED'],
      isOptedOut: json['isOptedOut'],
      optedOutBy: json['optedOutBy'],
      optedOutDate: json['optedOutDate'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['loginStatus'] = this.loginStatus;
    data['userId'] = this.userId;
    data['ptCustomerID'] = this.ptCustomerID;
    data['maximeyesPatientNumber'] = this.maximeyesPatientNumber;
    data['userType'] = this.userType;
    data['ptDOB'] = this.ptDOB;
    data['loginAttemptsleft'] = this.loginAttemptsleft;
    data['isAccountLocked'] = this.isAccountLocked;
    data['timeRemaining'] = this.timeRemaining;
    data['isOtpRequired'] = this.isOtpRequired;
    data['userProfilePhotoBase64'] = this.userProfilePhotoBase64;
    data['accountLockedDateTime'] = this.accountLockedDateTime;
    data['sessionGuid'] = this.sessionGuid;
    data['locationPhone'] = this.locationPhone;
    data['iS_DOB_VERIFIED'] = this.iS_DOB_VERIFIED;
    data['isOptedOut'] = this.isOptedOut;
    data['optedOutBy'] = this.optedOutBy;
    data['optedOutDate'] = this.optedOutDate;
    return data;
  }
}