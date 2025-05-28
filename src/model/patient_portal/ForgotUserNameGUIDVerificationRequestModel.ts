// ... existing code ...

export interface IForgotUsernameGuidRequestModel {
  patientGUID?: string;
}

export class ForgotUsernameGuidRequestModel implements IForgotUsernameGuidRequestModel {
  patientGUID?: string;

  constructor({
    patientGUID,
  }: IForgotUsernameGuidRequestModel) {
    this.patientGUID = patientGUID;
  }

  static fromJson(json: { [key: string]: any }): ForgotUsernameGuidRequestModel {
    return new ForgotUsernameGuidRequestModel({
      patientGUID: json['patientGUID'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['patientGUID'] = this.patientGUID;
    return data;
  }
}