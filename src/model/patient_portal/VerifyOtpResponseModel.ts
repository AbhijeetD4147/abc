export interface IVerifyOtpResponseModel {
  otpMessage?: string;
  status?: boolean;
}

export class VerifyOtpResponseModel implements IVerifyOtpResponseModel {
  otpMessage?: string;
  status?: boolean;

  constructor({
    otpMessage,
    status
  }: IVerifyOtpResponseModel) {
    this.otpMessage = otpMessage;
    this.status = status;
  }

  static fromJson(json: { [key: string]: any }): VerifyOtpResponseModel {
    return new VerifyOtpResponseModel({
      otpMessage: json['otpMessage'],
      status: json['status'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['otpMessage'] = this.otpMessage;
    data['status'] = this.status;
    return data;
  }
}