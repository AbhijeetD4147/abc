export interface UpdatePasswordRequest {
  newPassword?: string;
  userName?: string;
}

export class UpdatePasswordRequestModel implements UpdatePasswordRequest {
  newPassword?: string;
  userName?: string;

  constructor({
    newPassword,
    userName,
  }: UpdatePasswordRequest) {
    this.newPassword = newPassword;
    this.userName = userName;
  }

  static fromJson(json: { [key: string]: any }): UpdatePasswordRequestModel {
    return new UpdatePasswordRequestModel({
      newPassword: json['newPassword'] as string,
      userName: json['userName'] as string,
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'newPassword': this.newPassword,
      'userName': this.userName,
    };
  }
}