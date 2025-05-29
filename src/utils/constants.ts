export class ApiPath {
  static FirstAPI = 'https://patientportalapi.maximeyes.com/api/Home/getapiurl';
  static baseApi: string = "";
  static maximeyesNumber: any;

  static loginAttempt: number = 3;

  static globalTimeOutValue: number = 900;
  static globalCheckTimeList: number[] = [300];
  static transmitInfoMessage: string =
    "Send a secure message any provider using Direct Email. Type a simple text message. No special characters are allowed."
    + "\n\nNote: You will not be able to make changes to this message or attachments after sending it to";
  static messageToolTipInfo: string =
    "Send a secure message to us. Type a simple text message."
    + "\n\nNote: You will not be able to make changes to this message or attachments after sending it to practice.";
  static isSwitchUserToastVisible: boolean = false;

  static isSettingIconPopupVisible: boolean = false;
  static isSettingIconPopupOpen: boolean = false;

  static insuranceCardAttachmentSize: number = 2048;

  static isLogin: boolean = false;
  static isAccountLogin: boolean = false;

  static isGlobalStartTimer: boolean = false;

  static addressCount: number = 0;
  static phoneNumberCount: number = 0;
  static randomAddressCount: number = 0;
  static randomPhoneCount: number = 0;

  static isAppointmentModuleEnabled: boolean = false;
  static isIntakeModuleEnabled: boolean = false;

  static isBillingModuleEnabled: string = "Y";
  static isOpticalModuleEnabled: string = "Y";
  static isIDDriverLicenceEnabled: string = "Y";
  static showBillingPaymentsOnPortal: string = "Y";
  static allowOnlineBillingPaymentsOnPortal: string = "Y";
  static showBillingInvoiceOnPortal: string = "Y";
  static showOpticalExpiredRxOnPortal: string = "Y";
  static idleTime: string = "";

  static isIntakeFormFlow: boolean = false;

  //MBT 44438
  static isInsuranceScreenShowEnable: boolean = false;

  //API Stopper
  static MaxAPICalling: number = 3;

  //newrelic App token
  static androidAppToken: string =
    'AA245d9f0e3c8d724ed3ee2fe71d588845980e3384-NRMA';
  static iOSAppToken: string = 'AA180cf209d13d588a1bd498f14e3cb7784d0dd5f1-NRMA';
}