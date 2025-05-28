export interface SwitchUserDetail {
    maximeyesPatientNumber?: string;
    portalExpiryDate?: string;
    userDOB?: string;
    userId?: number;
    userName?: string;
    userInitials?: string;
    ptCustomerId?: number;
    authId?: number;
  }
  
  export class SwitchUserDetailModel {
    maximeyesPatientNumber?: string;
    portalExpiryDate?: string;
    userDOB?: string;
    userId?: number;
    userName?: string;
    userInitials?: string;
    ptCustomerId?: number;
    authId?: number;
  
    constructor(data: SwitchUserDetail) {
      this.maximeyesPatientNumber = data.maximeyesPatientNumber;
      this.portalExpiryDate = data.portalExpiryDate;
      this.userDOB = data.userDOB;
      this.userId = data.userId;
      this.userName = data.userName;
      this.userInitials = data.userInitials;
      this.ptCustomerId = data.ptCustomerId;
      this.authId = data.authId;
    }
  
    static fromJson(json: any): SwitchUserDetailModel {
      return new SwitchUserDetailModel({
        maximeyesPatientNumber: json['maximeyesPatientNumber'],
        portalExpiryDate: json['portalExpiryDate'],
        userDOB: json['userDOB'],
        userId: json['userId'],
        userName: json['userName'],
        userInitials: json['userInitials'],
        ptCustomerId: json['ptCustomerId'],
        authId: json['authId'],
      });
    }
  
    toJson(): { [key: string]: any } {
      const data: { [key: string]: any } = {};
      data['maximeyesPatientNumber'] = this.maximeyesPatientNumber;
      data['portalExpiryDate'] = this.portalExpiryDate;
      data['userDOB'] = this.userDOB;
      data['userId'] = this.userId;
      data['userName'] = this.userName;
      data['userInitials'] = this.userInitials;
      data['ptCustomerId'] = this.ptCustomerId;
      data['authId'] = this.authId;
      return data;
    }
  }