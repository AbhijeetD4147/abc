export interface Login {
    userName?: string;
    password?: string;
    geoLocation?: string;
    callFrom?: string;
  }
  
  export class LoginModel {
    userName?: string;
    password?: string;
    geoLocation?: string;
    callFrom?: string;
  
    constructor(data: Login) {
      this.userName = data.userName;
      this.password = data.password;
      this.geoLocation = data.geoLocation;
      this.callFrom = data.callFrom;
    }
  
    static fromJson(json: any): LoginModel {
      return new LoginModel({
        userName: json['userName'],
        password: json['password'],
        geoLocation: json['geoLocation'],
        callFrom: json['callFrom'],
      });
    }
  
    toJson(): { [key: string]: any } {
      const data: { [key: string]: any } = {};
      data['userName'] = this.userName;
      data['password'] = this.password;
      data['geoLocation'] = this.geoLocation;
      data['callFrom'] = this.callFrom;
      return data;
    }
  }