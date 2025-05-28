// ... existing code ...

export interface IUsernameGuid {
  emailResponse?: string;
  smsResponse?: string;
  status?: string;
  text?: string;
  userName?: string;
  locationPhone?: string;
}

export class UsernameGuidModel implements IUsernameGuid {
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
  }: IUsernameGuid) {
    this.emailResponse = emailResponse;
    this.smsResponse = smsResponse;
    this.status = status;
    this.text = text;
    this.userName = userName;
    this.locationPhone = locationPhone;
  }

  static fromJson(json: { [key: string]: any }): UsernameGuidModel {
    return new UsernameGuidModel({
      emailResponse: json['emailResponse'],
      smsResponse: json['smsResponse'],
      status: json['status'],
      text: json['text'],
      userName: json['userName'],
      locationPhone: json['locationPhone'],
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