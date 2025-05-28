// ... existing code ...

export interface IForgotUserNameGUIDVerificationResponseModel {
  emailResponse?: string;
  smsResponse?: string;
  status?: string;
  text?: string;
  userName?: string;
  locationPhone?: string;
}

export class ForgotUserNameGUIDVerificationResponseModel implements IForgotUserNameGUIDVerificationResponseModel {
  emailResponse?: string;
  smsResponse?: string;
  status?: string;
  text?: string;
  userName?: string;
  locationPhone?: string;

  constructor({
    emailResponse,
    smsResponse,
    status,
    text,
    userName,
    locationPhone,
  }: IForgotUserNameGUIDVerificationResponseModel) {
    this.emailResponse = emailResponse;
    this.smsResponse = smsResponse;
    this.status = status;
    this.text = text;
    this.userName = userName;
    this.locationPhone = locationPhone;
  }

  static fromJson(json: { [key: string]: any }): ForgotUserNameGUIDVerificationResponseModel {
    return new ForgotUserNameGUIDVerificationResponseModel({
      emailResponse: json['emailResponse'],
      smsResponse: json['smsResponse'],
      status: json['status'],
      text: json['text'],
      userName: json['userName'],
      locationPhone: json['locationPhone'] ?? "",
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['emailResponse'] = this.emailResponse;
    data['smsResponse'] = this.smsResponse;
    data['status'] = this.status;
    data['text'] = this.text;
    data['userName'] = this.userName;
    data['locationPhone'] = this.locationPhone;
    return data;
  }
}