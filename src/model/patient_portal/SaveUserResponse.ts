// ... existing code ...

export interface ISaveUserResponse {
  isExist?: boolean;
  status?: string;
  locationPhone?: string; //MBT 39298
}

export class SaveUserResponse implements ISaveUserResponse {
  isExist?: boolean;
  status?: string;
  locationPhone?: string; //MBT 39298

  constructor({
    isExist,
    status,
    locationPhone
  }: ISaveUserResponse) {
    this.isExist = isExist;
    this.status = status;
    this.locationPhone = locationPhone;
  }

  static fromJson(json: { [key: string]: any }): SaveUserResponse {
    return new SaveUserResponse({
      isExist: json['isExist'],
      status: json['status'],
      locationPhone: json['locationPhone'] ?? "", //MBT 39298
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['isExist'] = this.isExist;
    data['status'] = this.status;
    data['locationPhone'] = this.locationPhone; //MBT 39298
    return data;
  }
}