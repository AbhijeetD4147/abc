export interface IAuthorizedPatientResponse {
  authId?: number;
  authName?: string;
  expiryDate?: string;
  authIntitals?: string;
  dateAdded?: string;
  isExpired?: boolean;
}

export class AuthorizedPatientResponse implements IAuthorizedPatientResponse {
  authId?: number;
  authName?: string;
  expiryDate?: string;
  authIntitals?: string;
  dateAdded?: string;
  isExpired?: boolean;

  constructor({
    authId,
    authName,
    expiryDate,
    authIntitals,
    dateAdded,
    isExpired,
  }: IAuthorizedPatientResponse) {
    this.authId = authId;
    this.authName = authName;
    this.expiryDate = expiryDate;
    this.authIntitals = authIntitals;
    this.dateAdded = dateAdded;
    this.isExpired = isExpired;
  }

  static fromJson(json: { [key: string]: any }): AuthorizedPatientResponse {
    return new AuthorizedPatientResponse({
      authId: json['authId'] ?? "",
      authName: json['authName'] ?? "",
      expiryDate: json['expiryDate'] ?? "",
      authIntitals: json['authIntitals'] ?? "",
      dateAdded: json['dateAdded'] ?? "",
      isExpired: json['isExpired'] ?? false,
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['authId'] = this.authId;
    data['authName'] = this.authName;
    data['expiryDate'] = this.expiryDate;
    data['authIntitals'] = this.authIntitals;
    data['dateAdded'] = this.dateAdded;
    data['isExpired'] = this.isExpired;
    return data;
  }

  static decode(musics: string): AuthorizedPatientResponse[] {
    return (JSON.parse(musics) as any[]).map((item: any) =>
      AuthorizedPatientResponse.fromJson(item)
    );
  }
}