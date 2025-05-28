// ... existing code ...

export interface IResetLinkSendResponse {
  emailResponse?: string;
  userId?: number;
  isAccountLocked?: boolean;
  timeRemaining?: number;
  accountLockedDateTime?: string;
}

export class ResetLinkSendResponse implements IResetLinkSendResponse {
  emailResponse?: string;
  userId?: number;
  isAccountLocked?: boolean;
  timeRemaining?: number;
  accountLockedDateTime?: string;

  constructor({
    emailResponse,
    userId,
    isAccountLocked,
    timeRemaining,
    accountLockedDateTime,
  }: IResetLinkSendResponse) {
    this.emailResponse = emailResponse;
    this.userId = userId;
    this.isAccountLocked = isAccountLocked;
    this.timeRemaining = timeRemaining;
    this.accountLockedDateTime = accountLockedDateTime;
  }

  static fromJson(json: { [key: string]: any }): ResetLinkSendResponse {
    return new ResetLinkSendResponse({
      emailResponse: json['emailResponse'],
      userId: json['userId'],
      isAccountLocked: json['isAccountLocked'],
      timeRemaining: json['timeRemaining'],
      accountLockedDateTime: json['accountLockedDateTime'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['emailResponse'] = this.emailResponse;
    data['userId'] = this.userId;
    data['isAccountLocked'] = this.isAccountLocked;
    data['timeRemaining'] = this.timeRemaining;
    data['accountLockedDateTime'] = this.accountLockedDateTime;
    return data;
  }
}