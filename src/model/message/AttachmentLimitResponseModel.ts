export interface AttachmentLimitResponse {
  attachmentLimit?: string;
  locationPhone?: string; // MBT 39298
}

export class AttachmentLimitResponseModel implements AttachmentLimitResponse {
  attachmentLimit?: string;
  locationPhone?: string; // MBT 39298

  constructor({ attachmentLimit, locationPhone }: AttachmentLimitResponse) {
    this.attachmentLimit = attachmentLimit;
    this.locationPhone = locationPhone;
  }

  static fromJson(json: { [key: string]: any }): AttachmentLimitResponseModel {
    return new AttachmentLimitResponseModel({
      attachmentLimit: json['attachmentLimit'],
      locationPhone: json['locationPhone'] ?? "", // MBT 39298
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['attachmentLimit'] = this.attachmentLimit;
    data['locationPhone'] = this.locationPhone; // MBT 39298
    return data;
  }
}