// ... existing code ...

export interface IForgotUpdatePasswordResponse {
  status?: string;
  text?: string;
}

export class ForgotUpdatePasswordResponseModel implements IForgotUpdatePasswordResponse {
  status?: string;
  text?: string;

  constructor({
    status,
    text,
  }: IForgotUpdatePasswordResponse) {
    this.status = status;
    this.text = text;
  }

  static fromJson(json: { [key: string]: any }): ForgotUpdatePasswordResponseModel {
    return new ForgotUpdatePasswordResponseModel({
      status: json['status'],
      text: json['text'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['status'] = this.status;
    data['text'] = this.text;
    return data;
  }
}