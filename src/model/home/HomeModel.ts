export interface HomePageOptions {
  optionName?: string;
}

export class HomePageOptionsModel implements HomePageOptions {
  optionName?: string;

  constructor({ optionName }: HomePageOptions) {
    this.optionName = optionName;
  }

  static fromJson(json: { [key: string]: any }): HomePageOptionsModel {
    return new HomePageOptionsModel({
      optionName: json['optionName'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['optionName'] = this.optionName;
    return data;
  }
}

export interface PhoneNumbers {
  locationName?: string;
  phoneNumber?: string;
  isDefaultLocation?: boolean;
}

export class PhoneNumbersModel implements PhoneNumbers {
  locationName?: string;
  phoneNumber?: string;
  isDefaultLocation?: boolean;

  constructor({ locationName, phoneNumber, isDefaultLocation }: PhoneNumbers) {
    this.locationName = locationName;
    this.phoneNumber = phoneNumber;
    this.isDefaultLocation = isDefaultLocation;
  }

  static fromJson(json: { [key: string]: any }): PhoneNumbersModel {
    return new PhoneNumbersModel({
      locationName: json['locationName'],
      phoneNumber: json['phoneNumber'],
      isDefaultLocation: json['isDefaultLocation'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['locationName'] = this.locationName;
    data['phoneNumber'] = this.phoneNumber;
    data['isDefaultLocation'] = this.isDefaultLocation;
    return data;
  }
}

export interface HomeData {
  header?: string;
  footer?: string;
  practiceName?: string;
  logo?: string;
  ptHomePageOptions?: HomePageOptions[];
  ptHomePagePhoneNumbers?: PhoneNumbers[];
}

export class HomeDataModel implements HomeData {
  header?: string;
  footer?: string;
  practiceName?: string;
  logo?: string;
  ptHomePageOptions?: HomePageOptionsModel[];
  ptHomePagePhoneNumbers?: PhoneNumbersModel[];

  constructor({
    header,
    footer,
    practiceName,
    logo,
    ptHomePageOptions,
    ptHomePagePhoneNumbers,
  }: HomeData) {
    this.header = header;
    this.footer = footer;
    this.practiceName = practiceName;
    this.logo = logo;
    this.ptHomePageOptions = ptHomePageOptions?.map(
      (option) => new HomePageOptionsModel(option)
    );
    this.ptHomePagePhoneNumbers = ptHomePagePhoneNumbers?.map(
      (phoneNumber) => new PhoneNumbersModel(phoneNumber)
    );
  }

  static fromJson(json: { [key: string]: any }): HomeDataModel {
    return new HomeDataModel({
      header: json['header'],
      footer: json['footer'],
      practiceName: json['practiceName'],
      logo: json['logo'],
      ptHomePageOptions: json['ptHomePageOptions']
        ? (json['ptHomePageOptions'] as any[]).map((i) =>
            HomePageOptionsModel.fromJson(i)
          )
        : undefined,
      ptHomePagePhoneNumbers: json['ptHomePagePhoneNumbers']
        ? (json['ptHomePagePhoneNumbers'] as any[]).map((i) =>
            PhoneNumbersModel.fromJson(i)
          )
        : undefined,
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['header'] = this.header;
    data['footer'] = this.footer;
    data['practiceName'] = this.practiceName;
    data['logo'] = this.logo;
    if (this.ptHomePageOptions) {
      data['ptHomePageOptions'] = this.ptHomePageOptions.map((v) =>
        v.toJson()
      );
    }
    if (this.ptHomePagePhoneNumbers) {
      data['ptHomePagePhoneNumbers'] = this.ptHomePagePhoneNumbers.map((v) =>
        v.toJson()
      );
    }
    return data;
  }
}