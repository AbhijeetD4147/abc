// ... existing code ...

export interface ISaveUserRequestModel {
  password?: string;
  ptCustomerId?: number;
  userName?: string;
  userType?: string;
}

export class SaveUserRequestModel implements ISaveUserRequestModel {
  password?: string;
  ptCustomerId?: number;
  userName?: string;
  userType?: string;

  constructor({
    password,
    ptCustomerId,
    userName,
    userType
  }: ISaveUserRequestModel) {
    this.password = password;
    this.ptCustomerId = ptCustomerId;
    this.userName = userName;
    this.userType = userType;
  }

  static fromJson(json: { [key: string]: any }): SaveUserRequestModel {
    return new SaveUserRequestModel({
      password: json['password'],
      ptCustomerId: json['ptCustomerId'],
      userName: json['userName'],
      userType: json['userType'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['password'] = this.password;
    data['ptCustomerId'] = this.ptCustomerId;
    data['userName'] = this.userName;
    data['userType'] = this.userType;
    return data;
  }
}