export interface NewPatientTermsResponse {
  ptCustomerid?: number;
  status?: boolean;
  userName?: string;
  locationPhone?: string;
}

export class NewPatientTermsResponseModel {
  ptCustomerid?: number;
  status?: boolean;
  userName?: string;
  locationPhone?: string;

  constructor(data: NewPatientTermsResponse) {
    this.ptCustomerid = data.ptCustomerid;
    this.status = data.status;
    this.userName = data.userName;
    this.locationPhone = data.locationPhone;
  }

  static fromJson(json: any): NewPatientTermsResponseModel {
    return new NewPatientTermsResponseModel({
      ptCustomerid: json['ptCustomerid'],
      status: json['status'],
      userName: json['userName'],
      locationPhone: json['locationPhone'] ?? "",
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['ptCustomerid'] = this.ptCustomerid;
    data['status'] = this.status;
    data['userName'] = this.userName;
    data['locationPhone'] = this.locationPhone;
    return data;
  }
}

export interface ExistingPatientTermsResponse {
  status?: boolean;
}

export class ExistingPatientTermsResponseModel {
  status?: boolean;

  constructor(data: ExistingPatientTermsResponse) {
    this.status = data.status;
  }

  static fromJson(json: any): ExistingPatientTermsResponseModel {
    return new ExistingPatientTermsResponseModel({
      status: json['status'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['status'] = this.status;
    return data;
  }
}

export interface AuthorizedIndividualTermsResponse {
  authId?: number;
  authName?: string;
  locationPhone?: string;
}

export class AuthorizedIndividualTermsResponseModel {
  authId?: number;
  authName?: string;
  locationPhone?: string;

  constructor(data: AuthorizedIndividualTermsResponse) {
    this.authId = data.authId;
    this.authName = data.authName;
    this.locationPhone = data.locationPhone;
  }

  static fromJson(json: any): AuthorizedIndividualTermsResponseModel {
    return new AuthorizedIndividualTermsResponseModel({
      authId: json['authId'],
      authName: json['authName'],
      locationPhone: json['locationPhone'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['authId'] = this.authId;
    data['authName'] = this.authName;
    data['locationPhone'] = this.locationPhone;
    return data;
  }
}