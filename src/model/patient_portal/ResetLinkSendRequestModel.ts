// ... existing code ...

export interface IResetLinkSendRequestModel {
  urlName?: string;
  userEmail?: string;
}

export class ResetLinkSendRequestModel implements IResetLinkSendRequestModel {
  urlName?: string;
  userEmail?: string;

  constructor({
    urlName,
    userEmail,
  }: IResetLinkSendRequestModel) {
    this.urlName = urlName;
    this.userEmail = userEmail;
  }

  static fromJson(json: { [key: string]: any }): ResetLinkSendRequestModel {
    return new ResetLinkSendRequestModel({
      urlName: json['urlName'],
      userEmail: json['userEmail'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['urlName'] = this.urlName;
    data['userEmail'] = this.userEmail;
    return data;
  }
}