export interface UsernameSuggestion {
  message?: string;
  userName1?: string;
  userName2?: string;
  userName3?: string;
}

export class UsernameSuggestionModel implements UsernameSuggestion {
  message?: string;
  userName1?: string;
  userName2?: string;
  userName3?: string;

  constructor({
    message,
    userName1,
    userName2,
    userName3,
  }: UsernameSuggestion) {
    this.message = message;
    this.userName1 = userName1;
    this.userName2 = userName2;
    this.userName3 = userName3;
  }

  static fromJson(json: { [key: string]: any }): UsernameSuggestionModel {
    return new UsernameSuggestionModel({
      message: json['message'] as string,
      userName1: json['userName1'] as string,
      userName2: json['userName2'] as string,
      userName3: json['userName3'] as string,
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'message': this.message,
      'userName1': this.userName1,
      'userName2': this.userName2,
      'userName3': this.userName3,
    };
  }
}