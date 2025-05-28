export interface VendorDataResponse {
  vendorId?: string;
  vendorPassword?: string;
  accountId?: string;
}

export class VendorDataResponseModel implements VendorDataResponse {
  vendorId?: string;
  vendorPassword?: string;
  accountId?: string;

  constructor({
    vendorId,
    vendorPassword,
    accountId,
  }: VendorDataResponse) {
    this.vendorId = vendorId;
    this.vendorPassword = vendorPassword;
    this.accountId = accountId;
  }

  static fromJson(json: { [key: string]: any }): VendorDataResponseModel {
    return new VendorDataResponseModel({
      vendorId: json['vendorId'] as string,
      vendorPassword: json['vendorPassword'] as string,
      accountId: json['accountId'] as string,
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'vendorId': this.vendorId,
      'vendorPassword': this.vendorPassword,
      'accountId': this.accountId,
    };
  }
}