// ... existing code ...

export interface IHomeScreenRequestModel {
  header?: string;
  footer?: string;
  logo?: string;
  optionsList?: any[];
}

export class HomeScreenRequestModel implements IHomeScreenRequestModel {
  header?: string;
  footer?: string;
  logo?: string;
  optionsList?: any[];

  constructor({
    header,
    footer,
    logo,
    optionsList,
  }: IHomeScreenRequestModel) {
    this.header = header;
    this.footer = footer;
    this.logo = logo;
    this.optionsList = optionsList;
  }

  static fromJson(json: { [key: string]: any }): HomeScreenRequestModel {
    return new HomeScreenRequestModel({
      header: json['header'],
      footer: json['footer'],
      logo: json['logo'],
      optionsList: json['ptHomePageOptions'],
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['header'] = this.header;
    data['footer'] = this.footer;
    data['logo'] = this.logo;
    data['optionsList'] = this.optionsList;
    return data;
  }
}