export interface OptOut {
  optOutText?: string;
  patientName?: string;
}

export class OptOutModel implements OptOut {
  optOutText?: string;
  patientName?: string;

  constructor({
    optOutText,
    patientName,
  }: OptOut) {
    this.optOutText = optOutText;
    this.patientName = patientName;
  }

  static fromJson(json: { [key: string]: any }): OptOutModel {
    return new OptOutModel({
      optOutText: json['optOutText'] ?? '',
      patientName: json['patientName'] ?? '',
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'optOutText': this.optOutText,
      'patientName': this.patientName,
    };
  }
}