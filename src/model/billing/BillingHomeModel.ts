export interface BillingHome {
  patientBalance?: number;
  accountBalance?: number;
  lstBillingPayments?: LstBillingPayments[];
  lstBillingInvoice?: LstBillingInvoice[];
}

export class BillingHomeModel implements BillingHome {
  patientBalance?: number;
  accountBalance?: number;
  lstBillingPayments?: LstBillingPaymentsModel[];
  lstBillingInvoice?: LstBillingInvoiceModel[];

  constructor(data?: BillingHome) {
    if (data) {
      this.patientBalance = data.patientBalance;
      this.accountBalance = data.accountBalance;
      this.lstBillingPayments = data.lstBillingPayments?.map(
        (item) => new LstBillingPaymentsModel(item)
      );
      this.lstBillingInvoice = data.lstBillingInvoice?.map(
        (item) => new LstBillingInvoiceModel(item)
      );
    }
  }

  static fromJson(json: { [key: string]: any }): BillingHomeModel {
    const model = new BillingHomeModel();
    model.patientBalance = json['patientBalance'];
    model.accountBalance = json['accountBalance'];
    if (json['lstBillingPayments'] != null) {
      model.lstBillingPayments = (json['lstBillingPayments'] as any[]).map(
        (v) => LstBillingPaymentsModel.fromJson(v)
      );
    }
    if (json['lstBillingInvoice'] != null) {
      model.lstBillingInvoice = (json['lstBillingInvoice'] as any[]).map(
        (v) => LstBillingInvoiceModel.fromJson(v)
      );
    }
    return model;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['patientBalance'] = this.patientBalance;
    data['accountBalance'] = this.accountBalance;
    if (this.lstBillingPayments != null) {
      data['lstBillingPayments'] = this.lstBillingPayments!.map((v) =>
        v.toJson()
      );
    }
    if (this.lstBillingInvoice != null) {
      data['lstBillingInvoice'] = this.lstBillingInvoice!.map((v) =>
        v.toJson()
      );
    }
    return data;
  }
}

export interface LstBillingPayments {
  paymentId?: number;
  paymentDate?: string;
  serviceDate?: string;
  superBillNo?: number;
  paymentAmount?: number;
  transactionType?: string;
  patientName?: string;
  paymentRow?: string;
  refNo?: string;
  locationName?: string;
}

export class LstBillingPaymentsModel implements LstBillingPayments {
  paymentId?: number;
  paymentDate?: string;
  serviceDate?: string;
  superBillNo?: number;
  paymentAmount?: number;
  transactionType?: string;
  patientName?: string;
  paymentRow?: string;
  refNo?: string;
  locationName?: string;

  constructor(data?: LstBillingPayments) {
    if (data) {
      this.paymentId = data.paymentId;
      this.paymentDate = data.paymentDate;
      this.serviceDate = data.serviceDate;
      this.superBillNo = data.superBillNo;
      this.paymentAmount = data.paymentAmount;
      this.transactionType = data.transactionType;
      this.patientName = data.patientName;
      this.paymentRow = data.paymentRow;
      this.refNo = data.refNo;
      this.locationName = data.locationName;
    }
  }

  static fromJson(json: { [key: string]: any }): LstBillingPaymentsModel {
    const model = new LstBillingPaymentsModel();
    model.paymentId = json['paymentId'];
    model.paymentDate = json['paymentDate'];
    model.serviceDate = json['serviceDate'];
    model.superBillNo = json['superBillNo'];
    model.paymentAmount = json['paymentAmount'];
    model.transactionType = json['transactionType'];
    model.patientName = json['patientName'];
    model.paymentRow = json['paymentRow'];
    model.refNo = json['refNo'];
    model.locationName = json['locationName'];
    return model;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['paymentId'] = this.paymentId;
    data['paymentDate'] = this.paymentDate;
    data['serviceDate'] = this.serviceDate;
    data['superBillNo'] = this.superBillNo;
    data['paymentAmount'] = this.paymentAmount;
    data['transactionType'] = this.transactionType;
    data['patientName'] = this.patientName;
    data['paymentRow'] = this.paymentRow;
    data['refNo'] = this.refNo;
    data['locationName'] = this.locationName;
    return data;
  }
}

export interface LstBillingInvoice {
  ledgerId?: number;
  serviceDate?: string;
  charges?: number;
  patientName?: string;
  invoiceRow?: string;
}

export class LstBillingInvoiceModel implements LstBillingInvoice {
  ledgerId?: number;
  serviceDate?: string;
  charges?: number;
  patientName?: string;
  invoiceRow?: string;

  constructor(data?: LstBillingInvoice) {
    if (data) {
      this.ledgerId = data.ledgerId;
      this.serviceDate = data.serviceDate;
      this.charges = data.charges;
      this.patientName = data.patientName;
      this.invoiceRow = data.invoiceRow;
    }
  }

  static fromJson(json: { [key: string]: any }): LstBillingInvoiceModel {
    const model = new LstBillingInvoiceModel();
    model.ledgerId = json['ledgerId'];
    model.serviceDate = json['serviceDate'];
    model.charges = json['charges'];
    model.patientName = json['patientName'];
    model.invoiceRow = json['invoiceRow'];
    return model;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['ledgerId'] = this.ledgerId;
    data['serviceDate'] = this.serviceDate;
    data['charges'] = this.charges;
    data['patientName'] = this.patientName;
    data['invoiceRow'] = this.invoiceRow;
    return data;
  }
}

export interface InvoiceDetail {
  superBillNo?: number;
  serviceDate?: string;
  patientName?: string;
  providerName?: string;
  insurancePaid?: number;
  insuranceAdjusted?: number;
  insuranceBalance?: number;
  patientRefund?: number;
  patientCredits?: number;
  patientAppliedAmount?: number;
  transactionType?: string;
  refNo?: string;
  dueBalanceDate?: string;
  dueBalance?: number;
  totalAmountWithTax?: number;
  lstLineItems?: LstLineItems[];
}

export class InvoiceDetailModel implements InvoiceDetail {
  superBillNo?: number;
  serviceDate?: string;
  patientName?: string;
  providerName?: string;
  insurancePaid?: number;
  insuranceAdjusted?: number;
  insuranceBalance?: number;
  patientRefund?: number;
  patientCredits?: number;
  patientAppliedAmount?: number;
  transactionType?: string;
  refNo?: string;
  dueBalanceDate?: string;
  dueBalance?: number;
  totalAmountWithTax?: number;
  lstLineItems?: LstLineItemsModel[];

  constructor(data?: InvoiceDetail) {
    if (data) {
      this.superBillNo = data.superBillNo;
      this.serviceDate = data.serviceDate;
      this.patientName = data.patientName;
      this.providerName = data.providerName;
      this.insurancePaid = data.insurancePaid;
      this.insuranceAdjusted = data.insuranceAdjusted;
      this.insuranceBalance = data.insuranceBalance;
      this.patientRefund = data.patientRefund;
      this.patientCredits = data.patientCredits;
      this.patientAppliedAmount = data.patientAppliedAmount;
      this.transactionType = data.transactionType;
      this.refNo = data.refNo;
      this.dueBalanceDate = data.dueBalanceDate;
      this.dueBalance = data.dueBalance;
      this.totalAmountWithTax = data.totalAmountWithTax;
      this.lstLineItems = data.lstLineItems?.map(
        (item) => new LstLineItemsModel(item)
      );
    }
  }

  static fromJson(json: { [key: string]: any }): InvoiceDetailModel {
    const model = new InvoiceDetailModel();
    model.superBillNo = json['superBillNo'];
    model.serviceDate = json['serviceDate'];
    model.patientName = json['patientName'];
    model.providerName = json['providerName'];
    model.insurancePaid = json['insurancePaid'];
    model.insuranceAdjusted = json['insuranceAdjusted'];
    model.insuranceBalance = json['insuranceBalance'];
    model.patientRefund = json['patientRefund'];
    model.patientCredits = json['patientCredits'];
    model.patientAppliedAmount = json['patientAppliedAmount'];
    model.transactionType = json['transactionType'];
    model.refNo = json['refNo'];
    model.dueBalanceDate = json['dueBalanceDate'];
    model.dueBalance = json['dueBalance'];
    model.totalAmountWithTax = json['totalAmountWithTax'];
    if (json['lstLineItems'] != null) {
      model.lstLineItems = (json['lstLineItems'] as any[]).map((v) =>
        LstLineItemsModel.fromJson(v)
      );
    }
    return model;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['superBillNo'] = this.superBillNo;
    data['serviceDate'] = this.serviceDate;
    data['patientName'] = this.patientName;
    data['providerName'] = this.providerName;
    data['insurancePaid'] = this.insurancePaid;
    data['insuranceAdjusted'] = this.insuranceAdjusted;
    data['insuranceBalance'] = this.insuranceBalance;
    data['patientRefund'] = this.patientRefund;
    data['patientCredits'] = this.patientCredits;
    data['patientAppliedAmount'] = this.patientAppliedAmount;
    data['transactionType'] = this.transactionType;
    data['refNo'] = this.refNo;
    data['dueBalanceDate'] = this.dueBalanceDate;
    data['dueBalance'] = this.dueBalance;
    data['totalAmountWithTax'] = this.totalAmountWithTax;
    if (this.lstLineItems != null) {
      data['lstLineItems'] = this.lstLineItems!.map((v) => v.toJson());
    }
    return data;
  }
}

export interface LstLineItems {
  lineItemId?: number;
  codeDesc?: string;
  procedureCode?: string;
  quantity?: number;
  totalAmountWithTax?: number;
}

export class LstLineItemsModel implements LstLineItems {
  lineItemId?: number;
  codeDesc?: string;
  procedureCode?: string;
  quantity?: number;
  totalAmountWithTax?: number;

  constructor(data?: LstLineItems) {
    if (data) {
      this.lineItemId = data.lineItemId;
      this.codeDesc = data.codeDesc;
      this.procedureCode = data.procedureCode;
      this.quantity = data.quantity;
      this.totalAmountWithTax = data.totalAmountWithTax;
    }
  }

  static fromJson(json: { [key: string]: any }): LstLineItemsModel {
    const model = new LstLineItemsModel();
    model.lineItemId = json['lineItemId'];
    model.codeDesc = json['codeDesc'];
    model.procedureCode = json['procedureCode'];
    model.quantity = json['quantity'];
    model.totalAmountWithTax = json['totalAmountWithTax'];
    return model;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['lineItemId'] = this.lineItemId;
    data['codeDesc'] = this.codeDesc;
    data['procedureCode'] = this.procedureCode;
    data['quantity'] = this.quantity;
    data['totalAmountWithTax'] = this.totalAmountWithTax;
    return data;
  }
}