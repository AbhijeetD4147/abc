export interface Address {
  randomNumberId?: number;
  id: number;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  zipCode: string;
  city: string;
  isPrimary: boolean;
  isActive: boolean;
}

export class AddressModel implements Address {
  randomNumberId?: number;
  id: number;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  zipCode: string;
  city: string;
  isPrimary: boolean;
  isActive: boolean;

  constructor({
    randomNumberId,
    id = 0,
    addressLine1 = '',
    addressLine2 = '',
    country = 'Select',
    state = 'Select',
    zipCode = '',
    city = '',
    isPrimary = false,
    isActive = true,
  }: Address) {
    this.randomNumberId = randomNumberId;
    this.id = id;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.country = country;
    this.state = state;
    this.zipCode = zipCode;
    this.city = city;
    this.isPrimary = isPrimary;
    this.isActive = isActive;
  }

  static fromJson(json: { [key: string]: any }): AddressModel {
    return new AddressModel({
      id: json['id'] ?? 0,
      addressLine1: json['addressLine1'] ?? '',
      addressLine2: json['addressLine2'] ?? '',
      country: json['country'] ?? 'Select',
      state: json['state'] ?? 'Select',
      zipCode: json['zipCode'] ?? '',
      city: json['city'] ?? '',
      isPrimary: json['isPrimary'] ?? false,
      isActive: json['isActive'] ?? true,
      randomNumberId: json['randomNumberId'] ?? 0,
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'randomNumberId': this.randomNumberId,
      'id': this.id,
      'addressLine1': this.addressLine1,
      'addressLine2': this.addressLine2,
      'country': this.country,
      'state': this.state,
      'zipCode': this.zipCode,
      'city': this.city,
      'isPrimary': this.isPrimary,
      'isActive': this.isActive,
    };
  }
}

export interface Email {
  id?: number;
  emailAddress?: string;
  isPrimary?: boolean;
  isActive?: boolean;
}

export class EmailModel implements Email {
  id?: number;
  emailAddress?: string;
  isPrimary?: boolean;
  isActive?: boolean;

  constructor({
    id = 0,
    emailAddress,
    isPrimary,
    isActive,
  }: Email) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.isPrimary = isPrimary;
    this.isActive = isActive;
  }

  static fromJson(json: { [key: string]: any }): EmailModel {
    return new EmailModel({
      id: json['id'] ?? 0,
      emailAddress: json['emailAddress'] ?? '',
      isPrimary: json['isPrimary'] ?? false,
      isActive: json['isActive'] ?? false,
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'id': this.id,
      'emailAddress': this.emailAddress,
      'isPrimary': this.isPrimary,
      'isActive': this.isActive,
    };
  }
}

export interface DropdownPersonalDetail {
  valueListItem?: string;
}

export class DropdownPersonalDetailModel implements DropdownPersonalDetail {
  valueListItem?: string;

  constructor({ valueListItem }: DropdownPersonalDetail) {
    this.valueListItem = valueListItem;
  }

  static fromJson(json: { [key: string]: any }): DropdownPersonalDetailModel {
    return new DropdownPersonalDetailModel({
      valueListItem: json['valueListItem'] ?? '',
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'valueListItem': this.valueListItem,
    };
  }
}

export interface Country {
  countryName?: string;
  countryCode?: string;
}

export class CountryModel implements Country {
  countryName?: string;
  countryCode?: string;

  constructor({ countryName, countryCode }: Country) {
    this.countryName = countryName;
    this.countryCode = countryCode;
  }

  static fromJson(json: { [key: string]: any }): CountryModel {
    return new CountryModel({
      countryName: json['countryName'] ?? '',
      countryCode: json['countryCode'] ?? '',
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'countryName': this.countryName,
      'countryCode': this.countryCode,
    };
  }
}

export interface State {
  id: number;
  name: string;
  code: string;
}

export class StateModel implements State {
  id: number;
  name: string;
  code: string;

  constructor({ id, name, code }: State) {
    this.id = id;
    this.name = name;
    this.code = code;
  }

  static fromJson(json: { [key: string]: any }): StateModel {
    return new StateModel({
      id: json['id'] ?? 0,
      name: json['name'] ?? '',
      code: json['code'] ?? '',
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'id': this.id,
      'name': this.name,
      'code': this.code,
    };
  }
}

export interface PhoneNumber {
  id?: number;
  randomNumberId?: number;
  title?: string;
  number?: string;
  isPrimary?: boolean;
  isActive?: boolean;
}

export class PhoneNumberModel implements PhoneNumber {
  id?: number;
  randomNumberId?: number;
  title?: string;
  number?: string;
  isPrimary?: boolean;
  isActive?: boolean;

  constructor({
    id = 0,
    randomNumberId,
    title,
    number,
    isPrimary,
    isActive = true,
  }: PhoneNumber) {
    this.id = id;
    this.randomNumberId = randomNumberId;
    this.title = title;
    this.number = number;
    this.isPrimary = isPrimary;
    this.isActive = isActive;
  }

  static fromJson(json: { [key: string]: any }): PhoneNumberModel {
    return new PhoneNumberModel({
      id: json['id'] ?? 0,
      randomNumberId: json['randomNumberId'] ?? 0,
      title: json['title'] ?? '',
      number: json['number'] ?? '',
      isPrimary: json['isPrimary'] ?? false,
      isActive: json['isActive'] ?? true,
    });
  }

  toJson(): { [key: string]: any } {
    return {
      'id': this.id,
      'randomNumberId': this.randomNumberId,
      'title': this.title,
      'number': this.number,
      'isPrimary': this.isPrimary,
      'isActive': this.isActive,
    };
  }
}

export interface Demographic {
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  prefferedFirstName?: string;
  dateOfBirth?: string;
  email?: EmailModel[];
  phoneNumber?: PhoneNumberModel[];
  address?: AddressModel[];
}

export class DemographicModel implements Demographic {
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  prefferedFirstName?: string;
  dateOfBirth?: string;
  email?: EmailModel[];
  phoneNumber?: PhoneNumberModel[];
  address?: AddressModel[];

  constructor({
    title,
    firstName,
    middleName,
    lastName,
    suffix,
    prefferedFirstName,
    dateOfBirth,
    email,
    phoneNumber,
    address,
  }: Demographic) {
    this.title = title;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.suffix = suffix;
    this.prefferedFirstName = prefferedFirstName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }

  static fromJson(json: { [key: string]: any }): DemographicModel {
    return new DemographicModel({
      title: json['title'] ?? '',
      firstName: json['firstName'] ?? '',
      middleName: json['middleName'] ?? '',
      lastName: json['lastName'] ?? '',
      suffix: json['suffix'] ?? '',
      prefferedFirstName: json['prefferedFirstName'] ?? '',
      dateOfBirth: json['dateOfBirth'] ?? '',
      email: json['email'] != null
        ? (json['email'] as any[]).map((i) => EmailModel.fromJson(i))
        : undefined,
      phoneNumber: json['phoneNumber'] != null
        ? (json['phoneNumber'] as any[]).map((i) => PhoneNumberModel.fromJson(i))
        : undefined,
      address: json['address'] != null
        ? (json['address'] as any[]).map((i) => AddressModel.fromJson(i))
        : undefined,
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['title'] = this.title;
    data['firstName'] = this.firstName;
    data['middleName'] = this.middleName;
    data['lastName'] = this.lastName;
    data['suffix'] = this.suffix;
    data['prefferedFirstName'] = this.prefferedFirstName;
    data['dateOfBirth'] = this.dateOfBirth;
    if (this.email != null) {
      data['email'] = this.email!.map((v) => v.toJson());
    }
    if (this.phoneNumber != null) {
      data['phoneNumber'] = this.phoneNumber!.map((v) => v.toJson());
    }
    if (this.address != null) {
      data['address'] = this.address!.map((v) => v.toJson());
    }
    return data;
  }
}