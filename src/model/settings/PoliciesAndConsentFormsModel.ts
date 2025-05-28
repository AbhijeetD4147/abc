export interface PoliciesAndConsentFormList {
  dateSigned?: string;
  formName?: string;
  formType?: string;
  formURL?: string;
  status?: string;
  formBase64?: string;
}

export class PoliciesAndConsentFormListModel implements PoliciesAndConsentFormList {
  dateSigned?: string;
  formName?: string;
  formType?: string;
  formURL?: string;
  status?: string;
  formBase64?: string;

  constructor({
    dateSigned,
    formName,
    formType,
    formURL,
    status,
    formBase64,
  }: PoliciesAndConsentFormList) {
    this.dateSigned = dateSigned;
    this.formName = formName;
    this.formType = formType;
    this.formURL = formURL;
    this.status = status;
    this.formBase64 = formBase64;
  }

  static fromJson(json: { [key: string]: any }): PoliciesAndConsentFormListModel {
    return new PoliciesAndConsentFormListModel({
      dateSigned: json['dateSigned'] ?? '',
      formName: json['formName'] ?? '',
      formType: json['formType'] ?? '',
      formURL: json['formURL'] ?? '',
      status: json['status'] ?? '',
      formBase64: json['formBase64'] ?? '',
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'dateSigned': this.dateSigned,
      'formName': this.formName,
      'formType': this.formType,
      'formURL': this.formURL,
      'status': this.status,
      'formBase64': this.formBase64,
    };
  }
}