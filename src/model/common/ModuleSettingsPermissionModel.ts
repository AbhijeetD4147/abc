export interface ModulePermission {
  isPortalEnabled?: string;
  portalTheme?: string;
  syncPhoto?: string;
  syncDriverLicence?: string;
  portalIdleTimeOut?: string;
  portalUrlName?: string;
  isBillingModuleEnabled?: string;
  isOpticalModuleEnabled?: string;
  isAppointmentModuleEnabled?: string;
  isIDDriverLicenceEnabled?: string;
  showBillingPaymentsOnPortal?: string;
  allowOnlineBillingPaymentsOnPortal?: string;
  showBillingInvoiceOnPortal?: string;
  showOpticalExpiredRxOnPortal?: string;
}

export class ModulePermissionModel implements ModulePermission {
  isPortalEnabled?: string;
  portalTheme?: string;
  syncPhoto?: string;
  syncDriverLicence?: string;
  portalIdleTimeOut?: string;
  portalUrlName?: string;
  isBillingModuleEnabled?: string;
  isOpticalModuleEnabled?: string;
  isAppointmentModuleEnabled?: string;
  isIDDriverLicenceEnabled?: string;
  showBillingPaymentsOnPortal?: string;
  allowOnlineBillingPaymentsOnPortal?: string;
  showBillingInvoiceOnPortal?: string;
  showOpticalExpiredRxOnPortal?: string;

  constructor(data?: ModulePermission) {
    if (data) {
      this.isPortalEnabled = data.isPortalEnabled;
      this.portalTheme = data.portalTheme;
      this.syncPhoto = data.syncPhoto;
      this.syncDriverLicence = data.syncDriverLicence;
      this.portalIdleTimeOut = data.portalIdleTimeOut;
      this.portalUrlName = data.portalUrlName;
      this.isBillingModuleEnabled = data.isBillingModuleEnabled;
      this.isOpticalModuleEnabled = data.isOpticalModuleEnabled;
      this.isAppointmentModuleEnabled = data.isAppointmentModuleEnabled;
      this.isIDDriverLicenceEnabled = data.isIDDriverLicenceEnabled;
      this.showBillingPaymentsOnPortal = data.showBillingPaymentsOnPortal;
      this.allowOnlineBillingPaymentsOnPortal = data.allowOnlineBillingPaymentsOnPortal;
      this.showBillingInvoiceOnPortal = data.showBillingInvoiceOnPortal;
      this.showOpticalExpiredRxOnPortal = data.showOpticalExpiredRxOnPortal;
    }
  }

  static fromJson(json: { [key: string]: any }): ModulePermissionModel {
    const model = new ModulePermissionModel();
    model.isPortalEnabled = json['isPortalEnabled'];
    model.portalTheme = json['portalTheme'];
    model.syncPhoto = json['syncPhoto'];
    model.syncDriverLicence = json['syncDriverLicence'];
    model.portalIdleTimeOut = json['portalIdleTimeOut'];
    model.portalUrlName = json['portalUrlName'];
    model.isBillingModuleEnabled = json['isBillingModuleEnabled'];
    model.isOpticalModuleEnabled = json['isOpticalModuleEnabled'];
    model.isAppointmentModuleEnabled = json['isAppointmentModuleEnabled'];
    model.isIDDriverLicenceEnabled = json['isIDDriverLicenceEnabled'];
    model.showBillingPaymentsOnPortal = json['showBillingPaymentsOnPortal'];
    model.allowOnlineBillingPaymentsOnPortal = json['allowOnlineBillingPaymentsOnPortal'];
    model.showBillingInvoiceOnPortal = json['showBillingInvoiceOnPortal'];
    model.showOpticalExpiredRxOnPortal = json['showOpticalExpiredRxOnPortal'];
    return model;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['isPortalEnabled'] = this.isPortalEnabled;
    data['portalTheme'] = this.portalTheme;
    data['syncPhoto'] = this.syncPhoto;
    data['syncDriverLicence'] = this.syncDriverLicence;
    data['portalIdleTimeOut'] = this.portalIdleTimeOut;
    data['portalUrlName'] = this.portalUrlName;
    data['isBillingModuleEnabled'] = this.isBillingModuleEnabled;
    data['isOpticalModuleEnabled'] = this.isOpticalModuleEnabled;
    data['isAppointmentModuleEnabled'] = this.isAppointmentModuleEnabled;
    data['isIDDriverLicenceEnabled'] = this.isIDDriverLicenceEnabled;
    data['showBillingPaymentsOnPortal'] = this.showBillingPaymentsOnPortal;
    data['allowOnlineBillingPaymentsOnPortal'] = this.allowOnlineBillingPaymentsOnPortal;
    data['showBillingInvoiceOnPortal'] = this.showBillingInvoiceOnPortal;
    data['showOpticalExpiredRxOnPortal'] = this.showOpticalExpiredRxOnPortal;
    return data;
  }
}