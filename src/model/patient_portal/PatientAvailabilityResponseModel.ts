// ... existing code ...

export interface IPatientAvailabilityResponseModel {
  isExist?: boolean;
  patientNumber?: number;
  accountType?: string;
}

export class PatientAvailabilityResponseModel implements IPatientAvailabilityResponseModel {
  isExist?: boolean;
  patientNumber?: number;
  accountType?: string;

  constructor({
    isExist,
    patientNumber,
    accountType,
  }: IPatientAvailabilityResponseModel) {
    this.isExist = isExist;
    this.patientNumber = patientNumber;
    this.accountType = accountType;
  }

  static fromJson(json: { [key: string]: any }): PatientAvailabilityResponseModel {
    return new PatientAvailabilityResponseModel({
      isExist: json['isExist'],
      patientNumber: json['patientNumber'],
      accountType: json['accountType'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['isExist'] = this.isExist;
    data['patientNumber'] = this.patientNumber;
    data['accountType'] = this.accountType;
    return data;
  }
}