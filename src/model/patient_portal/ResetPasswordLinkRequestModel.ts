// ... existing code ...

export interface IResetPasswordLinkRequestModel {
  urlName?: string;
  userName?: string;
}

export class ResetPasswordLinkRequestModel implements IResetPasswordLinkRequestModel {
  urlName?: string;
  userName?: string;

  constructor({
    urlName,
    userName
  }: IResetPasswordLinkRequestModel) {
    this.urlName = urlName;
    this.userName = userName;
  }

  static fromJson(json: { [key: string]: any }): ResetPasswordLinkRequestModel {
    return new ResetPasswordLinkRequestModel({
      urlName: json['urlName'],
      userName: json['userName'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['urlName'] = this.urlName;
    data['userName'] = this.userName;
    return data;
  }
}