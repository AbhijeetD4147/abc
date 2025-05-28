// ... existing code ...

export interface IForgotPasswordGUIDVerificationResponse {
  status?: string;
  text?: string;
  locationPhone?: string;
}

export class ForgotPasswordGUIDVerificationResponseModel implements IForgotPasswordGUIDVerificationResponse {
  status?: string;
  text?: string;
  locationPhone?: string;

  constructor({
    status,
    text,
    locationPhone,
  }: IForgotPasswordGUIDVerificationResponse) {
    this.status = status;
    this.text = text;
    this.locationPhone = locationPhone;
  }

  static fromJson(json: { [key: string]: any }): ForgotPasswordGUIDVerificationResponseModel {
    return new ForgotPasswordGUIDVerificationResponseModel({
      status: json['status'],
      text: json['text'],
      locationPhone: json['locationPhone'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['status'] = this.status;
    data['text'] = this.text;
    data['locationPhone'] = this.locationPhone;
    return data;
  }
}