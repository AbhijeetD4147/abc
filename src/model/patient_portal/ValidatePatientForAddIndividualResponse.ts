export interface IValidatePatientForAddIndividualResponse {
  dob?: string;
  emailId?: string;
  isExist?: boolean;
  matchType?: string;
  mobileNo?: string;
  patientName?: string;
  patientNumber?: string;
  patientType?: string;
  ptCustomerId?: any;
  authId?: number;
}

export class ValidatePatientForAddIndividualResponse implements IValidatePatientForAddIndividualResponse {
  dob?: string;
  emailId?: string;
  isExist?: boolean;
  matchType?: string;
  mobileNo?: string;
  patientName?: string;
  patientNumber?: string;
  patientType?: string;
  ptCustomerId?: any;
  authId?: number;

  constructor({
    dob,
    emailId,
    isExist,
    matchType,
    mobileNo,
    patientName,
    patientNumber,
    patientType,
    ptCustomerId,
    authId,
  }: IValidatePatientForAddIndividualResponse) {
    this.dob = dob;
    this.emailId = emailId;
    this.isExist = isExist;
    this.matchType = matchType;
    this.mobileNo = mobileNo;
    this.patientName = patientName;
    this.patientNumber = patientNumber;
    this.patientType = patientType;
    this.ptCustomerId = ptCustomerId;
    this.authId = authId;
  }

  static fromJson(json: { [key: string]: any }): ValidatePatientForAddIndividualResponse {
    return new ValidatePatientForAddIndividualResponse({
      dob: json['dob'],
      emailId: json['emailId'],
      isExist: json['isExist'],
      matchType: json['matchType'],
      mobileNo: json['mobileNo'],
      patientName: json['patientName'],
      patientNumber: json['patientNumber'],
      patientType: json['patientType'],
      ptCustomerId: json['ptCustomerId'],
      authId: json['authId'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['dob'] = this.dob;
    data['emailId'] = this.emailId;
    data['isExist'] = this.isExist;
    data['matchType'] = this.matchType;
    data['mobileNo'] = this.mobileNo;
    data['patientName'] = this.patientName;
    data['patientNumber'] = this.patientNumber;
    data['patientType'] = this.patientType;
    data['ptCustomerId'] = this.ptCustomerId;
    data['authId'] = this.authId;
    return data;
  }
}