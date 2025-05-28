// ... existing code ...

export interface IPassword {
  guid?: string;
  password?: string;
}

export class PasswordModel implements IPassword {
  guid?: string;
  password?: string;

  constructor({
    guid,
    password,
  }: IPassword) {
    this.guid = guid;
    this.password = password;
  }

  static fromJson(json: { [key: string]: any }): PasswordModel {
    return new PasswordModel({
      guid: json['userName'],
      password: json['newPassword'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['userName'] = this.guid;
    data['newPassword'] = this.password;
    return data;
  }
}