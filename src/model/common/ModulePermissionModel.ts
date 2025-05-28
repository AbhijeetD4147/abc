export interface ModulePermissionByPractice {
    exist?: boolean;
    isAppointmentModuleEnabled?: boolean;
    isIntakeModuleEnabled?: boolean;
  }
  
  export class ModulePermissionByPracticeModel implements ModulePermissionByPractice {
    exist?: boolean;
    isAppointmentModuleEnabled?: boolean;
    isIntakeModuleEnabled?: boolean;
  
    constructor(data?: ModulePermissionByPractice) {
      if (data) {
        this.exist = data.exist;
        this.isAppointmentModuleEnabled = data.isAppointmentModuleEnabled;
        this.isIntakeModuleEnabled = data.isIntakeModuleEnabled;
      }
    }
  
    static fromJson(json: { [key: string]: any }): ModulePermissionByPracticeModel {
      const model = new ModulePermissionByPracticeModel();
      model.exist = json['exist'];
      model.isAppointmentModuleEnabled = json['is_AppBooking'];
      model.isIntakeModuleEnabled = json['is_PatientIntake'];
      return model;
    }
  
    toJson(): { [key: string]: any } {
      const data: { [key: string]: any } = {};
      data['exist'] = this.exist;
      data['is_AppBooking'] = this.isAppointmentModuleEnabled;
      data['is_PatientIntake'] = this.isIntakeModuleEnabled;
      return data;
    }
  }