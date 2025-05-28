export interface PatientAccountHistory {
    loginHistory?: string;
    ptCustomerId?: number;
    maximEyesPatientNumber?: string;
    userId?: number;
    username?: string;
  }
  
  export class PatientAccountHistoryModel {
    loginHistory?: string;
    ptCustomerId?: number;
    maximEyesPatientNumber?: string;
    userId?: number;
    username?: string;
  
    constructor(data: PatientAccountHistory) {
      this.loginHistory = data.loginHistory;
      this.ptCustomerId = data.ptCustomerId;
      this.maximEyesPatientNumber = data.maximEyesPatientNumber;
      this.userId = data.userId;
      this.username = data.username;
    }
  
    static fromJson(json: any): PatientAccountHistoryModel {
      return new PatientAccountHistoryModel({
        loginHistory: json['loginHistory'],
        ptCustomerId: json['ptCustomerId'],
        maximEyesPatientNumber: json['maximeyesPatientNumber'],
        userId: json['userId'],
        username: json['userName'],
      });
    }
  
    toJson(): { [key: string]: any } {
      const data: { [key: string]: any } = {};
      data['loginHistory'] = this.loginHistory;
      data['ptCustomerId'] = this.ptCustomerId;
      data['maximeyesPatientNumber'] = this.maximEyesPatientNumber;
      data['userId'] = this.userId;
      data['userName'] = this.username;
      return data;
    }
  }