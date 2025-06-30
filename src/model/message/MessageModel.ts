export interface MessageList {
  messageId?: number;
  ptcustomerId?: number;
  fromEmail?: string;
  toEmail?: string;
  isActive?: boolean;
  messageSubject?: string;
  messageTime?: string;
  messageStatus?: string;
  isMessageSeen?: boolean;
  totalRecords?: number;
  isAttachment?: boolean;
  threadCount?: number;
  ptPracticePersonId?: number;
  messageArchiveId?: number;
  messageType?: string;
  tempMessageType?: string;
  userInitials?: string;
  isChecked?: boolean;
  isEducationMaterial?: boolean;
}

export class MessageListModel implements MessageList {
  messageId?: number;
  ptcustomerId?: number;
  fromEmail?: string;
  toEmail?: string;
  isActive?: boolean;
  messageSubject?: string;
  messageTime?: string;
  messageStatus?: string;
  isMessageSeen?: boolean;
  messageText?: string;
  ptPracticePersonId?: number;
  parentMessageId?: number;
  userInitials?: string;
  messageType?: string;
  tempMessageType?: string;
  ptMessageAttachment?: MessageAttachment[];
  isEducationMaterial?: boolean;
  educationMaterialBase64FileContent?: string;

  constructor(init?: MessageList) {
    Object.assign(this, init);
  }

  static fromJson(json: { [key: string]: any }): MessageListModel {
    return new MessageListModel({
      messageId: json['messageId'],
      ptcustomerId: json['ptcustomerId'],
      fromEmail: json['fromEmail'],
      toEmail: json['toEmail'],
      isActive: json['isActive'],
      messageSubject: json['messageSubject'],
      messageTime: json['messageTime'],
      messageStatus: json['messageStatus'],
      isMessageSeen: json['isMessageSeen'],
      totalRecords: json['totalRecords'],
      isAttachment: json['isAttachment'],
      threadCount: json['threadCount'],
      ptPracticePersonId: json['ptPracticePersonId'],
      messageArchiveId: json['messageArchiveId'],
      messageType: json['messageType'],
      tempMessageType: json['tempMessageType'],
      userInitials: json['userInitials'],
      isChecked: json['isChecked'],
      isEducationMaterial: json['isEducationMaterial'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['messageId'] = this.messageId;
    data['ptcustomerId'] = this.ptcustomerId;
    data['fromEmail'] = this.fromEmail;
    data['toEmail'] = this.toEmail;
    data['isActive'] = this.isActive;
    data['messageSubject'] = this.messageSubject;
    data['messageTime'] = this.messageTime;
    data['messageStatus'] = this.messageStatus;
    data['isMessageSeen'] = this.isMessageSeen;
    data['messageText'] = this.messageText;
    data['ptPracticePersonId'] = this.ptPracticePersonId;
    data['parentMessageId'] = this.parentMessageId;
    data['userInitials'] = this.userInitials;
    data['messageType'] = this.messageType;
    data['tempMessageType'] = this.tempMessageType;
    if (this.ptMessageAttachment) {
      data['ptMessageAttachment'] = this.ptMessageAttachment.map((v) =>
        MessageAttachmentModel.fromJson(v).toJson()
      );
    }
    data['isEducationMaterial'] = this.isEducationMaterial;
    data['educationMaterialBase64FileContent'] = this.educationMaterialBase64FileContent;
    return data;
  }
}

export interface MessageAttachment {
  attachmentId?: number;
  attachmentType?: string;
  attachmentBase64FileContent?: string;
  attachmentFileName?: string;
  attachmentFileSize?: number;
}

export class MessageAttachmentModel implements MessageAttachment {
  attachmentId?: number;
  attachmentType?: string;
  attachmentBase64FileContent?: string;
  attachmentFileName?: string;
  attachmentFileSize?: number;

  constructor({
    attachmentId,
    attachmentType,
    attachmentBase64FileContent,
    attachmentFileName,
    attachmentFileSize,
  }: MessageAttachment) {
    this.attachmentId = attachmentId;
    this.attachmentType = attachmentType;
    this.attachmentBase64FileContent = attachmentBase64FileContent;
    this.attachmentFileName = attachmentFileName;
    this.attachmentFileSize = attachmentFileSize;
  }

  static fromJson(json: { [key: string]: any }): MessageAttachmentModel {
    return new MessageAttachmentModel({
      attachmentId: json['attachmentId'],
      attachmentType: json['attachmentType'],
      attachmentBase64FileContent: json['attachmentBase64FileContent'] ?? "",
      attachmentFileName: json['attachmentFileName'],
      attachmentFileSize: json['attachmentFileSize'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['attachmentId'] = this.attachmentId;
    data['attachmentType'] = this.attachmentType;
    data['attachmentBase64FileContent'] = this.attachmentBase64FileContent;
    data['attachmentFileName'] = this.attachmentFileName;
    data['attachmentFileSize'] = this.attachmentFileSize;
    return data;
  }
}

export interface MessageReply {
  ptcustomerId?: number;
  isActive?: boolean;
  messageSubject?: string;
  messageText?: string;
  messageDateTime?: string;
  messageStatus?: string;
  isInfoToMedicalChart?: boolean;
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
  ptMessageAttachment?: MessageAttachment[];
}

export class MessageReplyModel implements MessageReply {
  ptcustomerId?: number;
  isActive?: boolean;
  messageSubject?: string;
  messageText?: string;
  messageDateTime?: string;
  messageStatus?: string;
  isInfoToMedicalChart?: boolean;
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
  ptMessageAttachment?: MessageAttachmentModel[];

  constructor({
    ptcustomerId,
    isActive,
    messageSubject,
    messageText,
    messageDateTime,
    messageStatus,
    isInfoToMedicalChart,
    isDirectMessage,
    kno2Id,
    isCustomer,
    isIncoming,
    isFavourite,
    isReplied,
    parentMessageId,
    ptPracticePersonId,
    userId,
    switchUserId,
    ptMessageAttachment,
  }: MessageReply) {
    this.ptcustomerId = ptcustomerId;
    this.isActive = isActive;
    this.messageSubject = messageSubject;
    this.messageText = messageText;
    this.messageDateTime = messageDateTime;
    this.messageStatus = messageStatus;
    this.isInfoToMedicalChart = isInfoToMedicalChart;
    this.isDirectMessage = isDirectMessage;
    this.kno2Id = kno2Id;
    this.isCustomer = isCustomer;
    this.isIncoming = isIncoming;
    this.isFavourite = isFavourite;
    this.isReplied = isReplied;
    this.parentMessageId = parentMessageId;
    this.ptPracticePersonId = ptPracticePersonId;
    this.userId = userId;
    this.switchUserId = switchUserId;
    this.ptMessageAttachment = ptMessageAttachment?.map(
      (attachment) => new MessageAttachmentModel(attachment)
    );
  }

  static fromJson(json: { [key: string]: any }): MessageReplyModel {
    return new MessageReplyModel({
      ptcustomerId: json['ptcustomerId'],
      isActive: json['isActive'],
      messageSubject: json['messageSubject'],
      messageText: json['messageText'],
      messageDateTime: json['messageDateTime'],
      messageStatus: json['messageStatus'],
      isInfoToMedicalChart: json['isInfoToMedicalChart'],
      isDirectMessage: json['isDirectMessage'],
      kno2Id: json['kno2Id'],
      isCustomer: json['isCustomer'],
      isIncoming: json['isIncoming'],
      isFavourite: json['isFavourite'],
      isReplied: json['isReplied'],
      parentMessageId: json['parentMessageId'],
      ptPracticePersonId: json['ptPracticePersonId'],
      userId: json['userId'],
      switchUserId: json['switchUserId'],
      ptMessageAttachment: json['ptMessageAttachment']
        ? (json['ptMessageAttachment'] as any[]).map((i) =>
            MessageAttachmentModel.fromJson(i)
          )
        : undefined,
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['ptcustomerId'] = this.ptcustomerId;
    data['isActive'] = this.isActive;
    data['messageSubject'] = this.messageSubject;
    data['messageText'] = this.messageText;
    data['messageDateTime'] = this.messageDateTime;
    data['messageStatus'] = this.messageStatus;
    data['isInfoToMedicalChart'] = this.isInfoToMedicalChart;
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
    if (this.ptMessageAttachment) {
      data['ptMessageAttachment'] = this.ptMessageAttachment.map((v) =>
        v.toJson()
      );
    }
    return data;
  }
}

export interface MessageCompose {
  ptcustomerId?: number;
  isActive?: boolean;
  messageSubject?: string;
  messageText?: string;
  messageDateTime?: string;
  messageStatus?: string;
  isInfoToMedicalChart?: boolean;
  isDirectMessage?: boolean;
  kno2Id?: string;
  isCustomer?: boolean;
  isIncoming?: boolean;
  isFavourite?: boolean;
  parentMessageId?: number;
  ptPracticePersonId?: number;
  userId?: number;
  switchUserId?: number;
  ptMessageAttachment?: MessageAttachment[];
}

export class MessageComposeModel implements MessageCompose {
  ptcustomerId?: number;
  isActive?: boolean;
  messageSubject?: string;
  messageText?: string;
  messageDateTime?: string;
  messageStatus?: string;
  isInfoToMedicalChart?: boolean;
  isDirectMessage?: boolean;
  kno2Id?: string;
  isCustomer?: boolean;
  isIncoming?: boolean;
  isFavourite?: boolean;
  parentMessageId?: number;
  ptPracticePersonId?: number;
  userId?: number;
  switchUserId?: number;
  ptMessageAttachment?: MessageAttachmentModel[];

  constructor({
    ptcustomerId,
    isActive,
    messageSubject,
    messageText,
    messageDateTime,
    messageStatus,
    isInfoToMedicalChart,
    isDirectMessage,
    kno2Id,
    isCustomer,
    isIncoming,
    isFavourite,
    parentMessageId,
    ptPracticePersonId,
    userId,
    switchUserId,
    ptMessageAttachment,
  }: MessageCompose) {
    this.ptcustomerId = ptcustomerId;
    this.isActive = isActive;
    this.messageSubject = messageSubject;
    this.messageText = messageText;
    this.messageDateTime = messageDateTime;
    this.messageStatus = messageStatus;
    this.isInfoToMedicalChart = isInfoToMedicalChart;
    this.isDirectMessage = isDirectMessage;
    this.kno2Id = kno2Id;
    this.isCustomer = isCustomer;
    this.isIncoming = isIncoming;
    this.isFavourite = isFavourite;
    this.parentMessageId = parentMessageId;
    this.ptPracticePersonId = ptPracticePersonId;
    this.userId = userId;
    this.switchUserId = switchUserId;
    this.ptMessageAttachment = ptMessageAttachment?.map(
      (attachment) => new MessageAttachmentModel(attachment)
    );
  }

  static fromJson(json: { [key: string]: any }): MessageComposeModel {
    return new MessageComposeModel({
      ptcustomerId: json['ptcustomerId'],
      isActive: json['isActive'],
      messageSubject: json['messageSubject'],
      messageText: json['messageText'],
      messageDateTime: json['messageDateTime'],
      messageStatus: json['messageStatus'],
      isInfoToMedicalChart: json['isInfoToMedicalChart'],
      isDirectMessage: json['isDirectMessage'],
      kno2Id: json['kno2Id'],
      isCustomer: json['isCustomer'],
      isIncoming: json['isIncoming'],
      isFavourite: json['isFavourite'],
      parentMessageId: json['parentMessageId'],
      ptPracticePersonId: json['ptPracticePersonId'],
      userId: json['userId'],
      switchUserId: json['switchUserId'],
      ptMessageAttachment: json['ptMessageAttachment']
        ? (json['ptMessageAttachment'] as any[]).map((i) =>
            MessageAttachmentModel.fromJson(i)
          )
        : undefined,
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['ptcustomerId'] = this.ptcustomerId;
    data['isActive'] = this.isActive;
    data['messageSubject'] = this.messageSubject;
    data['messageText'] = this.messageText;
    data['messageDateTime'] = this.messageDateTime;
    data['messageStatus'] = this.messageStatus;
    data['isInfoToMedicalChart'] = this.isInfoToMedicalChart;
    data['isDirectMessage'] = this.isDirectMessage;
    data['kno2Id'] = this.kno2Id;
    data['isCustomer'] = this.isCustomer;
    data['isIncoming'] = this.isIncoming;
    data['isFavourite'] = this.isFavourite;
    data['parentMessageId'] = this.parentMessageId;
    data['ptPracticePersonId'] = this.ptPracticePersonId;
    data['userId'] = this.userId;
    data['switchUserId'] = this.switchUserId;
    if (this.ptMessageAttachment) {
      data['ptMessageAttachment'] = this.ptMessageAttachment.map((v) =>
        v.toJson()
      );
    }
    return data;
  }
}

export interface MessageThread {
  messageId?: number;
  ptcustomerId?: number;
  fromEmail?: string;
  toEmail?: string;
  isActive?: boolean;
  messageSubject?: string;
  messageTime?: string;
  messageStatus?: string;
  isMessageSeen?: boolean;
  messageText?: string;
  ptPracticePersonId?: number;
  parentMessageId?: number;
  userInitials?: string;
  messageType?: string;
  tempMessageType?: string;
  ptMessageAttachment?: MessageAttachment[];
  isEducationMaterial?: boolean;
  educationMaterialBase64FileContent?: string;
}

export class MessageThreadModel implements MessageThread {
  messageId?: number;
  ptcustomerId?: number;
  fromEmail?: string;
  toEmail?: string;
  isActive?: boolean;
  messageSubject?: string;
  messageTime?: string;
  messageStatus?: string;
  isMessageSeen?: boolean;
  messageText?: string;
  ptPracticePersonId?: number;
  parentMessageId?: number;
  userInitials?: string;
  messageType?: string;
  tempMessageType?: string;
  ptMessageAttachment?: MessageAttachmentModel[];
  isEducationMaterial?: boolean;
  educationMaterialBase64FileContent?: string;

  constructor({
    messageId,
    ptcustomerId,
    fromEmail,
    toEmail,
    isActive,
    messageSubject,
    messageTime,
    messageStatus,
    isMessageSeen,
    messageText,
    ptPracticePersonId,
    parentMessageId,
    userInitials,
    messageType,
    tempMessageType,
    ptMessageAttachment,
    isEducationMaterial,
    educationMaterialBase64FileContent,
  }: MessageThread) {
    this.messageId = messageId;
    this.ptcustomerId = ptcustomerId;
    this.fromEmail = fromEmail;
    this.toEmail = toEmail;
    this.isActive = isActive;
    this.messageSubject = messageSubject;
    this.messageTime = messageTime;
    this.messageStatus = messageStatus;
    this.isMessageSeen = isMessageSeen;
    this.messageText = messageText;
    this.ptPracticePersonId = ptPracticePersonId;
    this.parentMessageId = parentMessageId;
    this.userInitials = userInitials;
    this.messageType = messageType;
    this.tempMessageType = tempMessageType;
    this.ptMessageAttachment = ptMessageAttachment?.map(
      (attachment) => new MessageAttachmentModel(attachment)
    );
    this.isEducationMaterial = isEducationMaterial;
    this.educationMaterialBase64FileContent = educationMaterialBase64FileContent;
  }

  static fromJson(json: { [key: string]: any }): MessageThreadModel {
    return new MessageThreadModel({
      messageId: json['messageId'],
      ptcustomerId: json['ptcustomerId'],
      fromEmail: json['fromEmail'],
      toEmail: json['toEmail'],
      isActive: json['isActive'],
      messageSubject: json['messageSubject'],
      messageTime: json['messageTime'],
      messageStatus: json['messageStatus'],
      isMessageSeen: json['isMessageSeen'],
      messageText: json['messageText'],
      ptPracticePersonId: json['ptPracticePersonId'],
      parentMessageId: json['parentMessageId'],
      userInitials: json['userInitials'],
      messageType: json['messageType'],
      tempMessageType: json['tempMessageType'],
      ptMessageAttachment: json['ptMessageAttachment']
        ? (json['ptMessageAttachment'] as any[]).map((i) =>
            MessageAttachmentModel.fromJson(i)
          )
        : undefined,
      isEducationMaterial: json['isEducationMaterial'],
      educationMaterialBase64FileContent: json['educationMaterialBase64FileContent'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['messageId'] = this.messageId;
    data['ptcustomerId'] = this.ptcustomerId;
    data['fromEmail'] = this.fromEmail;
    data['toEmail'] = this.toEmail;
    data['isActive'] = this.isActive;
    data['messageSubject'] = this.messageSubject;
    data['messageTime'] = this.messageTime;
    data['messageStatus'] = this.messageStatus;
    data['isMessageSeen'] = this.isMessageSeen;
    data['messageText'] = this.messageText;
    data['ptPracticePersonId'] = this.ptPracticePersonId;
    data['parentMessageId'] = this.parentMessageId;
    data['userInitials'] = this.userInitials;
    data['messageType'] = this.messageType;
    data['tempMessageType'] = this.tempMessageType;
    if (this.ptMessageAttachment) {
      data['ptMessageAttachment'] = this.ptMessageAttachment.map((v) =>
        v.toJson()
      );
    }
    data['isEducationMaterial'] = this.isEducationMaterial;
    data['educationMaterialBase64FileContent'] = this.educationMaterialBase64FileContent;
    return data;
  }
}

// Add this interface at the end of the file
export interface MessageForward {
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
  ptMessageAttachment?: MessageAttachment[];
}

// Add this class implementation after the interface
export class MessageForwardModel implements MessageForward {
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
  ptMessageAttachment?: MessageAttachmentModel[];

  constructor({
    ptcustomerId,
    toEmail,
    isActive,
    messageSubject,
    messageText,
    messageDateTime,
    messageStatus,
    isDirectMessage,
    kno2Id,
    isCustomer,
    isIncoming,
    isFavourite,
    isReplied,
    parentMessageId,
    ptPracticePersonId,
    userId,
    switchUserId,
    ptMessageAttachment,
  }: MessageForward) {
    this.ptcustomerId = ptcustomerId;
    this.toEmail = toEmail;
    this.isActive = isActive;
    this.messageSubject = messageSubject;
    this.messageText = messageText;
    this.messageDateTime = messageDateTime;
    this.messageStatus = messageStatus;
    this.isDirectMessage = isDirectMessage;
    this.kno2Id = kno2Id;
    this.isCustomer = isCustomer;
    this.isIncoming = isIncoming;
    this.isFavourite = isFavourite;
    this.isReplied = isReplied;
    this.parentMessageId = parentMessageId;
    this.ptPracticePersonId = ptPracticePersonId;
    this.userId = userId;
    this.switchUserId = switchUserId;
    this.ptMessageAttachment = ptMessageAttachment?.map(
      (attachment) => new MessageAttachmentModel(attachment)
    );
  }

  static fromJson(json: { [key: string]: any }): MessageForwardModel {
    return new MessageForwardModel({
      ptcustomerId: json['ptcustomerId'],
      toEmail: json['toEmail'],
      isActive: json['isActive'],
      messageSubject: json['messageSubject'],
      messageText: json['messageText'],
      messageDateTime: json['messageDateTime'],
      messageStatus: json['messageStatus'],
      isDirectMessage: json['isDirectMessage'],
      kno2Id: json['kno2Id'],
      isCustomer: json['isCustomer'],
      isIncoming: json['isIncoming'],
      isFavourite: json['isFavourite'],
      isReplied: json['isReplied'],
      parentMessageId: json['parentMessageId'],
      ptPracticePersonId: json['ptPracticePersonId'],
      userId: json['userId'],
      switchUserId: json['switchUserId'],
      ptMessageAttachment: json['ptMessageAttachment']
        ? (json['ptMessageAttachment'] as any[]).map((i) =>
            MessageAttachmentModel.fromJson(i)
          )
        : undefined,
    });
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
    if (this.ptMessageAttachment) {
      data['ptMessageAttachment'] = this.ptMessageAttachment.map((v) =>
        v.toJson()
      );
    }
    return data;
  }
}