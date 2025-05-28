export interface AddAuthorizedIndividualRequest {
  email?: string;
  expiryDate?: string;
  firstName?: string;
  lastName?: string;
  locationId?: number;
  mobile?: string;
  ptCustomerId?: number;
  reason?: string;
  userId?: number;
}

export class AddAuthorizedIndividualRequestModel {
  email?: string;
  expiryDate?: string;
  firstName?: string;
  lastName?: string;
  locationId?: number;
  mobile?: string;
  ptCustomerId?: number;
  reason?: string;
  userId?: number;

  constructor(data: AddAuthorizedIndividualRequest) {
    this.email = data.email;
    this.expiryDate = data.expiryDate;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.locationId = data.locationId;
    this.mobile = data.mobile;
    this.ptCustomerId = data.ptCustomerId;
    this.reason = data.reason;
    this.userId = data.userId;
  }

  static fromJson(json: any): AddAuthorizedIndividualRequestModel {
    return new AddAuthorizedIndividualRequestModel({
      email: json['email'],
      expiryDate: json['expiryDate'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      locationId: json['locationId'],
      mobile: json['mobile'],
      ptCustomerId: json['ptCustomerId'],
      reason: json['reason'],
      userId: json['userId'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['email'] = this.email;
    data['expiryDate'] = this.expiryDate;
    data['firstName'] = this.firstName;
    data['lastName'] = this.lastName;
    data['locationId'] = this.locationId;
    data['mobile'] = this.mobile;
    data['ptCustomerId'] = this.ptCustomerId;
    data['reason'] = this.reason;
    data['userId'] = this.userId;
    return data;
  }
}