export interface ActivityLog {
  userId?: number;
  auditDateTime?: string;
  auditData?: string;
  auditDate?: string;
  auditTime?: string;
  userName?: string;
  totalRecord?: number;
}

export class ActivityLogModel implements ActivityLog {
  userId?: number;
  auditDateTime?: string;
  auditData?: string;
  auditDate?: string;
  auditTime?: string;
  userName?: string;
  totalRecord?: number;

  constructor({
    userId,
    auditDateTime,
    auditData,
    auditDate,
    auditTime,
    userName,
    totalRecord,
  }: ActivityLog) {
    this.userId = userId;
    this.auditDateTime = auditDateTime;
    this.auditData = auditData;
    this.auditDate = auditDate;
    this.auditTime = auditTime;
    this.userName = userName;
    this.totalRecord = totalRecord;
  }

  static fromJson(json: { [key: string]: any }): ActivityLogModel {
    return new ActivityLogModel({
      userId: json['userId'],
      auditDateTime: json['auditDateTime'],
      auditData: json['auditData'],
      auditDate: json['auditDate'],
      auditTime: json['auditTime'],
      userName: json['userName'],
      totalRecord: json['totalRecord'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['userId'] = this.userId;
    data['auditDateTime'] = this.auditDateTime;
    data['auditData'] = this.auditData;
    data['auditDate'] = this.auditDate;
    data['auditTime'] = this.auditTime;
    data['userName'] = this.userName;
    data['totalRecord'] = this.totalRecord;
    return data;
  }
}

export interface ActivityActionOption {
  moduleId?: number;
  moduleName?: string;
}

export class ActivityActionOptionModel implements ActivityActionOption {
  moduleId?: number;
  moduleName?: string;

  constructor({ moduleId, moduleName }: ActivityActionOption) {
    this.moduleId = moduleId;
    this.moduleName = moduleName;
  }

  static fromJson(json: { [key: string]: any }): ActivityActionOptionModel {
    return new ActivityActionOptionModel({
      moduleId: json['moduleId'],
      moduleName: json['moduleName'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['moduleId'] = this.moduleId;
    data['moduleName'] = this.moduleName;
    return data;
  }
}