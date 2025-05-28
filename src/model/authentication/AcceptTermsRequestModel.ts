export interface NewPatientTermsRequest {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  dob?: string;
  locationId?: number;
  patientNumber?: number;
  isAccepted?: boolean;
  acceptedDate?: string;
  signature?: string;
  sourceFrom?: string;
  loginHistory?: string;
  authUserId?: string;
}

export class NewPatientTermsRequestModel {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  dob?: string;
  locationId?: number;
  patientNumber?: number;
  isAccepted?: boolean;
  acceptedDate?: string;
  signature?: string;
  sourceFrom?: string;
  loginHistory?: string;
  authUserId?: string;

  constructor(data: NewPatientTermsRequest) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.mobile = data.mobile;
    this.email = data.email;
    this.dob = data.dob;
    this.locationId = data.locationId;
    this.patientNumber = data.patientNumber;
    this.isAccepted = data.isAccepted;
    this.acceptedDate = data.acceptedDate;
    this.signature = data.signature;
    this.sourceFrom = data.sourceFrom;
    this.loginHistory = data.loginHistory;
    this.authUserId = data.authUserId;
  }

  static fromJson(json: any): NewPatientTermsRequestModel {
    return new NewPatientTermsRequestModel({
      firstName: json['firstName'],
      lastName: json['lastName'],
      mobile: json['mobile'],
      email: json['email'],
      dob: json['dob'],
      locationId: json['locationId'],
      patientNumber: json['patientNumber'],
      isAccepted: json['isAccepted'],
      acceptedDate: json['acceptedDate'],
      signature: json['signature'],
      sourceFrom: json['sourceFrom'],
      loginHistory: json['loginHistory'],
      authUserId: json['authUserId'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['firstName'] = this.firstName;
    data['lastName'] = this.lastName;
    data['mobile'] = this.mobile;
    data['email'] = this.email;
    data['dob'] = this.dob;
    data['locationId'] = this.locationId;
    data['patientNumber'] = this.patientNumber;
    data['isAccepted'] = this.isAccepted;
    data['acceptedDate'] = this.acceptedDate;
    data['signature'] = this.signature;
    data['sourceFrom'] = this.sourceFrom;
    data['loginHistory'] = this.loginHistory;
    data['authUserId'] = this.authUserId;
    return data;
  }
}

export interface ExistingPatientTermsRequest {
  ptCustomerId?: number;
  isAccepted?: boolean;
  acceptedDate?: string;
  signature?: string;
  sourceFrom?: string;
}

export class ExistingPatientTermsRequestModel {
  ptCustomerId?: number;
  isAccepted?: boolean;
  acceptedDate?: string;
  signature?: string;
  sourceFrom?: string;

  constructor(data: ExistingPatientTermsRequest) {
    this.ptCustomerId = data.ptCustomerId;
    this.isAccepted = data.isAccepted;
    this.acceptedDate = data.acceptedDate;
    this.signature = data.signature;
    this.sourceFrom = data.sourceFrom;
  }

  static fromJson(json: any): ExistingPatientTermsRequestModel {
    return new ExistingPatientTermsRequestModel({
      ptCustomerId: json['ptCustomerId'],
      isAccepted: json['isAccepted'],
      acceptedDate: json['acceptedDate'],
      signature: json['signature'],
      sourceFrom: json['sourceFrom'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['ptCustomerId'] = this.ptCustomerId;
    data['isAccepted'] = this.isAccepted;
    data['acceptedDate'] = this.acceptedDate;
    data['signature'] = this.signature;
    data['sourceFrom'] = this.sourceFrom;
    return data;
  }
}

export interface AuthorizedIndividualTermsRequest {
  acceptedDate?: string;
  authId?: number;
  isAccepted?: boolean;
  signature?: string;
  sourceFrom?: string;
  userId?: number;
}

export class AuthorizedIndividualTermsRequestModel {
  acceptedDate?: string;
  authId?: number;
  isAccepted?: boolean;
  signature?: string;
  sourceFrom?: string;
  userId?: number;

  constructor(data: AuthorizedIndividualTermsRequest) {
    this.acceptedDate = data.acceptedDate;
    this.authId = data.authId;
    this.isAccepted = data.isAccepted;
    this.signature = data.signature;
    this.sourceFrom = data.sourceFrom;
    this.userId = data.userId;
  }

  static fromJson(json: any): AuthorizedIndividualTermsRequestModel {
    return new AuthorizedIndividualTermsRequestModel({
      acceptedDate: json['acceotedDate'], // Note: Typo 'acceotedDate' from Dart code
      authId: json['authId'],
      isAccepted: json['isAccpetd'], // Note: Typo 'isAccpetd' from Dart code
      signature: json['signature'],
      sourceFrom: json['sourceFrom'],
      userId: json['userId'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['acceotedDate'] = this.acceptedDate; // Note: Typo 'acceotedDate' from Dart code
    data['authId'] = this.authId;
    data['isAccpetd'] = this.isAccepted; // Note: Typo 'isAccpetd' from Dart code
    data['signature'] = this.signature;
    data['sourceFrom'] = this.sourceFrom;
    data['userId'] = this.userId;
    return data;
  }
}