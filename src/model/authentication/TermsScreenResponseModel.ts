export interface TermsScreenResponse {
  tncText?: string;
  patientName?: string;
}

export class TermsScreenResponseModel implements TermsScreenResponse {
  tncText?: string;
  patientName?: string;

  constructor({
    tncText,
    patientName,
  }: TermsScreenResponse) {
    this.tncText = tncText;
    this.patientName = patientName;
  }

  static fromJson(json: { [key: string]: any }): TermsScreenResponseModel {
    return new TermsScreenResponseModel({
      tncText: json['tncText'] as string || "",
      patientName: json['patientName'] as string || "",
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'tncText': this.tncText,
      'patientName': this.patientName,
    };
  }
}