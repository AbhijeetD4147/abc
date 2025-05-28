export interface Orders {
  orderDate?: string;
  orderNumber?: string;
  orderCategory?: string;
  orderStatus?: string;
  isSelected?: boolean;
}

export class OrdersModel implements Orders {
  orderDate?: string;
  orderNumber?: string;
  orderCategory?: string;
  orderStatus?: string;
  isSelected: boolean;

  constructor({
    orderDate,
    orderNumber,
    orderCategory,
    orderStatus,
    isSelected = false,
  }: Orders) {
    this.orderDate = orderDate;
    this.orderNumber = orderNumber;
    this.orderCategory = orderCategory;
    this.orderStatus = orderStatus;
    this.isSelected = isSelected;
  }

  static fromJson(json: { [key: string]: any }): OrdersModel {
    return new OrdersModel({
      orderDate: json['orderDate'],
      orderNumber: json['orderNumber'],
      orderCategory: json['orderCategory'],
      orderStatus: json['orderStatus'],
      isSelected: json['isSelected'] ?? false,
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['orderDate'] = this.orderDate;
    data['orderNumber'] = this.orderNumber;
    data['orderCategory'] = this.orderCategory;
    data['orderStatus'] = this.orderStatus;
    data['isSelected'] = this.isSelected;
    return data;
  }
}

export interface Prescriptions {
  createdDate?: string;
  lensType?: string;
  purpose?: string;
  expireDate?: string;
  isSelected?: boolean;
}

export class PrescriptionsModel implements Prescriptions {
  createdDate?: string;
  lensType?: string;
  purpose?: string;
  expireDate?: string;
  isSelected: boolean;

  constructor({
    createdDate,
    lensType,
    purpose,
    expireDate,
    isSelected = false,
  }: Prescriptions) {
    this.createdDate = createdDate;
    this.lensType = lensType;
    this.purpose = purpose;
    this.expireDate = expireDate;
    this.isSelected = isSelected;
  }

  static fromJson(json: { [key: string]: any }): PrescriptionsModel {
    return new PrescriptionsModel({
      createdDate: json['createdDate'],
      lensType: json['lensType'],
      purpose: json['purpose'],
      expireDate: json['expireDate'],
      isSelected: json['isSelected'] ?? false,
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['createdDate'] = this.createdDate;
    data['lensType'] = this.lensType;
    data['purpose'] = this.purpose;
    data['expireDate'] = this.expireDate;
    data['isSelected'] = this.isSelected;
    return data;
  }
}

export interface EyewearHome {
  orders?: Orders[];
  prescriptions?: Prescriptions[];
}

export class EyewearHomeModel implements EyewearHome {
  orders?: OrdersModel[];
  prescriptions?: PrescriptionsModel[];

  constructor({ orders, prescriptions }: EyewearHome) {
    this.orders = orders as OrdersModel[];
    this.prescriptions = prescriptions as PrescriptionsModel[];
  }

  static fromJson(json: { [key: string]: any }): EyewearHomeModel {
    return new EyewearHomeModel({
      orders: json['orders']
        ? (json['orders'] as any[]).map((i) => OrdersModel.fromJson(i))
        : undefined,
      prescriptions: json['prescriptions']
        ? (json['prescriptions'] as any[]).map((i) =>
            PrescriptionsModel.fromJson(i)
          )
        : undefined,
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    if (this.orders) {
      data['orders'] = this.orders.map((v) => v.toJson());
    }
    if (this.prescriptions) {
      data['prescriptions'] = this.prescriptions.map((v) => v.toJson());
    }
    return data;
  }
}