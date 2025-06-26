export interface HealthSummaryList {
  healthTitle?: string;
  examId?: number;
  examDate?: string;
  customerId?: number;
  sentFrom?: string;
  sentDate?: string;
  healthSummaryId?: number;
  practicePersonId?: number;
  userId?: number;
  totalRecords?: number;
  isSeen?: boolean;
}

export class HealthSummaryListModel implements HealthSummaryList {
  healthTitle?: string;
  examId?: number;
  examDate?: string;
  customerId?: number;
  sentFrom?: string;
  sentDate?: string;
  healthSummaryId?: number;
  practicePersonId?: number;
  userId?: number;
  totalRecords?: number;
  isSeen?: boolean;

  constructor(data?: HealthSummaryList) {
    if (data) {
      this.healthTitle = data.healthTitle;
      this.examId = data.examId;
      this.examDate = data.examDate;
      this.customerId = data.customerId;
      this.sentFrom = data.sentFrom;
      this.sentDate = data.sentDate;
      this.healthSummaryId = data.healthSummaryId;
      this.practicePersonId = data.practicePersonId;
      this.userId = data.userId;
      this.totalRecords = data.totalRecords;
      this.isSeen = data.isSeen;
    }
  }

  static fromJson(json: { [key: string]: any }): HealthSummaryListModel {
    const model = new HealthSummaryListModel();
    model.healthTitle = json['healthTitle'];
    model.examId = json['examId'];
    model.examDate = json['examDate'];
    model.customerId = json['customerId'];
    model.sentFrom = json['sentFrom'];
    model.sentDate = json['sentDate'];
    model.healthSummaryId = json['healthSummaryId'];
    model.practicePersonId = json['practicePersonId'];
    model.userId = json['userId'];
    model.totalRecords = json['totalRecords'];
    model.isSeen = json['isSeen'];
    return model;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['healthTitle'] = this.healthTitle;
    data['examId'] = this.examId;
    data['examDate'] = this.examDate;
    data['customerId'] = this.customerId;
    data['sentFrom'] = this.sentFrom;
    data['sentDate'] = this.sentDate;
    data['healthSummaryId'] = this.healthSummaryId;
    data['practicePersonId'] = this.practicePersonId;
    data['userId'] = this.userId;
    data['totalRecords'] = this.totalRecords;
    data['isSeen'] = this.isSeen;
    return data;
  }
}

export interface HealthSummaryThread {
  summaryTitle?: string;
  summaryData?: string;
  healthSummaryId?: number;
  healthSummaryAttachment?: HealthSummaryThreadAttachment[];
}

export class HealthSummaryThreadModel implements HealthSummaryThread {
  summaryTitle?: string;
  summaryData?: string;
  healthSummaryId?: number;
  healthSummaryAttachment?: HealthSummaryThreadAttachmentModel[];

  constructor(data?: HealthSummaryThread) {
    if (data) {
      this.summaryTitle = data.summaryTitle;
      this.summaryData = data.summaryData;
      this.healthSummaryId = data.healthSummaryId;
      this.healthSummaryAttachment = data.healthSummaryAttachment?.map(
        (item) => new HealthSummaryThreadAttachmentModel(item)
      );
    }
  }

  static fromJson(json: { [key: string]: any }): HealthSummaryThreadModel {
    const model = new HealthSummaryThreadModel();
    model.summaryTitle = json['summaryTitle'];
    model.summaryData = json['summaryData'];
    model.healthSummaryId = json['healthSummaryId'];
    if (json['healthSummaryAttachement'] != null) {
      model.healthSummaryAttachment = (json['healthSummaryAttachement'] as any[]).map(
        (v) => HealthSummaryThreadAttachmentModel.fromJson(v)
      );
    }
    return model;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['summaryTitle'] = this.summaryTitle;
    data['summaryData'] = this.summaryData;
    data['healthSummaryId'] = this.healthSummaryId;
    if (this.healthSummaryAttachment != null) {
      data['healthSummaryAttachement'] = this.healthSummaryAttachment!.map(
        (v) => v.toJson()
      );
    }
    return data;
  }
}

export interface HealthSummaryThreadAttachment {
  attachmentBase64: string;
  attachmentFileName?: string;
  attachmentBase64FileContent?: string;
  attachmentType?: string;
  attachmentFileSize?: number;
}

export class HealthSummaryThreadAttachmentModel implements HealthSummaryThreadAttachment {
  attachmentId?: number;
  attachmentName?: string;
  attachmentSize?: number;
  attachmentType?: string;
  attachmentBase64: string; // Add this missing property
  attachmentFileName?: string;
  attachmentBase64FileContent?: string;
  attachmentFileSize?: number;

  constructor(data?: HealthSummaryThreadAttachment) {
    if (data) {
      this.attachmentFileName = data.attachmentFileName;
      this.attachmentBase64FileContent = data.attachmentBase64FileContent;
      this.attachmentType = data.attachmentType;
      this.attachmentFileSize = data.attachmentFileSize;
    }
  }

  static fromJson(json: { [key: string]: any }): HealthSummaryThreadAttachmentModel {
    const model = new HealthSummaryThreadAttachmentModel();
    model.attachmentFileName = json['attachmentFileName'];
    model.attachmentBase64FileContent = json['attachmentBase64FileContent'];
    model.attachmentType = json['attachmentType'];
    model.attachmentFileSize = json['attachmentFileSize'];
    return model;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['attachmentFileName'] = this.attachmentFileName;
    data['attachmentBase64FileContent'] = this.attachmentBase64FileContent;
    data['attachmentType'] = this.attachmentType;
    data['attachmentFileSize'] = this.attachmentFileSize;
    return data;
  }
}

export interface HealthSummaryTransmit {
  ptcustomerId?: number;
  toEmail?: string;
  isActive?: boolean;
  messageSubject?: string;
  messageText?: string;
  messageDateTime?: string;
  messageStatus?: string;
  isDirectMessage?: boolean;
  kno2Id?: string;
  isCustomer?: boolean;
  isIncoming?: boolean;
  isFavourite?: boolean;
  isReplied?: boolean;
  parentMessageId?: number;
  ptPracticePersonId?: number;
  userId?: number;
  switchUserId?: number;
  ptMessageAttachment?: HealthSummaryThreadAttachment[];
}

export class HealthSummaryTransmitModel implements HealthSummaryTransmit {
  ptcustomerId?: number;
  toEmail?: string;
  isActive?: boolean;
  messageSubject?: string;
  messageText?: string;
  messageDateTime?: string;
  messageStatus?: string;
  isDirectMessage?: boolean;
  kno2Id?: string;
  isCustomer?: boolean;
  isIncoming?: boolean;
  isFavourite?: boolean;
  isReplied?: boolean;
  parentMessageId?: number;
  ptPracticePersonId?: number;
  userId?: number;
  switchUserId?: number;
  ptMessageAttachment?: HealthSummaryThreadAttachmentModel[];

  constructor(data?: HealthSummaryTransmit) {
    if (data) {
      this.ptcustomerId = data.ptcustomerId;
      this.toEmail = data.toEmail;
      this.isActive = data.isActive;
      this.messageSubject = data.messageSubject;
      this.messageText = data.messageText;
      this.messageDateTime = data.messageDateTime;
      this.messageStatus = data.messageStatus;
      this.isDirectMessage = data.isDirectMessage;
      this.kno2Id = data.kno2Id;
      this.isCustomer = data.isCustomer;
      this.isIncoming = data.isIncoming;
      this.isFavourite = data.isFavourite;
      this.isReplied = data.isReplied;
      this.parentMessageId = data.parentMessageId;
      this.ptPracticePersonId = data.ptPracticePersonId;
      this.userId = data.userId;
      this.switchUserId = data.switchUserId;
      this.ptMessageAttachment = data.ptMessageAttachment?.map(
        (item) => new HealthSummaryThreadAttachmentModel(item)
      );
    }
  }

  static fromJson(json: { [key: string]: any }): HealthSummaryTransmitModel {
    const model = new HealthSummaryTransmitModel();
    model.ptcustomerId = json['ptcustomerId'];
    model.toEmail = json['toEmail'];
    model.isActive = json['isActive'];
    model.messageSubject = json['messageSubject'];
    model.messageText = json['messageText'];
    model.messageDateTime = json['messageDateTime'];
    model.messageStatus = json['messageStatus'];
    model.isDirectMessage = json['isDirectMessage'];
    model.kno2Id = json['kno2Id'];
    model.isCustomer = json['isCustomer'];
    model.isIncoming = json['isIncoming'];
    model.isFavourite = json['isFavourite'];
    model.isReplied = json['isReplied'];
    model.parentMessageId = json['parentMessageId'];
    model.ptPracticePersonId = json['ptPracticePersonId'];
    model.userId = json['userId'];
    model.switchUserId = json['switchUserId'];
    if (json['ptMessageAttachment'] != null) {
      model.ptMessageAttachment = (json['ptMessageAttachment'] as any[]).map(
        (v) => HealthSummaryThreadAttachmentModel.fromJson(v)
      );
    }
    return model;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['ptcustomerId'] = this.ptcustomerId;
    data['toEmail'] = this.toEmail;
    data['isActive'] = this.isActive;
    data['messageSubject'] = this.messageSubject;
    data['messageText'] = this.messageText;
    data['messageDateTime'] = this.messageDateTime;
    data['messageStatus'] = this.messageStatus;
    data['isDirectMessage'] = this.isDirectMessage;
    data['kno2Id'] = this.kno2Id;
    data['isCustomer'] = this.isCustomer;
    data['isIncoming'] = this.isIncoming;
    data['isFavourite'] = this.isFavourite;
    data['isReplied'] = this.isReplied;
    data['parentMessageId'] = this.parentMessageId;
    data['ptPracticePersonId'] = this.ptPracticePersonId;
    data['userId'] = this.userId;
    data['switchUserId'] = this.switchUserId;
    if (this.ptMessageAttachment != null) {
      data['ptMessageAttachment'] = this.ptMessageAttachment!.map(
        (v) => v.toJson()
      );
    }
    return data;
  }
}