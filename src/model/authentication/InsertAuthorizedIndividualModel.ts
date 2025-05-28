export interface InsertAuthorizedIndividual {
  authIndividualId?: number;
  insertStatus?: boolean;
  locationPhone?: string;
}

export class InsertAuthorizedIndividualModel {
  authIndividualId?: number;
  insertStatus?: boolean;
  locationPhone?: string;

  constructor(data: InsertAuthorizedIndividual) {
    this.authIndividualId = data.authIndividualId;
    this.insertStatus = data.insertStatus;
    this.locationPhone = data.locationPhone;
  }

  static fromJson(json: any): InsertAuthorizedIndividualModel {
    return new InsertAuthorizedIndividualModel({
      authIndividualId: json['authIndividualId'],
      insertStatus: json['insertStatus'],
      locationPhone: json['locationPhone'] ?? "",
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['authIndividualId'] = this.authIndividualId;
    data['insertStatus'] = this.insertStatus;
    data['locationPhone'] = this.locationPhone;
    return data;
  }
}