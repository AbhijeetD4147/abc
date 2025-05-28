export interface Insurance {
  welcomeformInsuranceDataID?: number;
  patientNumber?: string;
  insuranceCompanyName?: string;
  noLongerUse?: boolean;
  noInsuranceCard?: boolean;
  notes?: string;
  base64bitInsCardFront?: string;
  base64bitInsCardBack?: string;
  patientRelationshipToInsured?: string;
  insuredId?: string;
  insuredFirstName?: string;
  insuredLastName?: string;
  insuredMiddleName?: string;
  insuredSuffix?: string;
  insuredDOB?: string;
  insuredGender?: string;
  addedOn?: string;
  description?: string;
  reviewedDate?: string;
  isProcessed?: boolean;
  ptCustomerId?: number;
  customerInsuranceCompanyRelationID?: number;
  selfPay?: boolean;
  selfPaySince?: string;
  isSelfPayObject?: boolean;
}

export class InsuranceModel implements Insurance {
  welcomeformInsuranceDataID?: number;
  patientNumber?: string;
  insuranceCompanyName?: string;
  noLongerUse?: boolean;
  noInsuranceCard?: boolean;
  notes?: string;
  base64bitInsCardFront?: string;
  base64bitInsCardBack?: string;
  patientRelationshipToInsured?: string;
  insuredId?: string;
  insuredFirstName?: string;
  insuredLastName?: string;
  insuredMiddleName?: string;
  insuredSuffix?: string;
  insuredDOB?: string;
  insuredGender?: string;
  addedOn?: string;
  description?: string;
  reviewedDate?: string;
  isProcessed?: boolean;
  ptCustomerId?: number;
  customerInsuranceCompanyRelationID?: number;
  selfPay?: boolean;
  selfPaySince?: string;
  isSelfPayObject?: boolean;

  constructor({
    welcomeformInsuranceDataID = 0,
    patientNumber,
    insuranceCompanyName = '',
    noLongerUse = false,
    noInsuranceCard = false,
    notes = '',
    base64bitInsCardFront = '',
    base64bitInsCardBack = '',
    patientRelationshipToInsured = 'Select',
    insuredId = '',
    insuredFirstName = '',
    insuredLastName = '',
    insuredMiddleName = '',
    insuredSuffix = '',
    insuredDOB = '',
    insuredGender = '',
    addedOn = '',
    description = '',
    reviewedDate = '',
    isProcessed = false,
    ptCustomerId = 0,
    customerInsuranceCompanyRelationID = 0,
    selfPay = false,
    selfPaySince = '2021-11-02T07:51:11.820Z',
    isSelfPayObject = false,
  }: Insurance) {
    this.welcomeformInsuranceDataID = welcomeformInsuranceDataID;
    this.patientNumber = patientNumber;
    this.insuranceCompanyName = insuranceCompanyName;
    this.noLongerUse = noLongerUse;
    this.noInsuranceCard = noInsuranceCard;
    this.notes = notes;
    this.base64bitInsCardFront = base64bitInsCardFront;
    this.base64bitInsCardBack = base64bitInsCardBack;
    this.patientRelationshipToInsured = patientRelationshipToInsured;
    this.insuredId = insuredId;
    this.insuredFirstName = insuredFirstName;
    this.insuredLastName = insuredLastName;
    this.insuredMiddleName = insuredMiddleName;
    this.insuredSuffix = insuredSuffix;
    this.insuredDOB = insuredDOB;
    this.insuredGender = insuredGender;
    this.addedOn = addedOn;
    this.description = description;
    this.reviewedDate = reviewedDate;
    this.isProcessed = isProcessed;
    this.ptCustomerId = ptCustomerId;
    this.customerInsuranceCompanyRelationID = customerInsuranceCompanyRelationID;
    this.selfPay = selfPay;
    this.selfPaySince = selfPaySince;
    this.isSelfPayObject = isSelfPayObject;
  }

  static fromJson(json: { [key: string]: any }): InsuranceModel {
    return new InsuranceModel({
      welcomeformInsuranceDataID: json['welcomeform_Insurace_Data_ID'] ?? 0,
      patientNumber: json['patientNumber'] ?? '',
      insuranceCompanyName: json['insurance_Company_Name'] ?? '',
      noLongerUse: json['no_longer_use'] ?? false,
      noInsuranceCard: json['no_insurance_card'] ?? false,
      notes: json['notes'] ?? '',
      base64bitInsCardFront: json['base64bitInsCardFront'] ?? '',
      base64bitInsCardBack: json['base64bitInsCardBack'] ?? '',
      patientRelationshipToInsured: json['patient_Relationship_To_Insured'] ?? 'Select',
      insuredId: json['insured_Id'] ?? '',
      insuredFirstName: json['insured_FIRST_Name'] ?? '',
      insuredLastName: json['insured_Last_Name'] ?? '',
      insuredMiddleName: json['insured_Middle_Name'] ?? '',
      insuredSuffix: json['insured_Suffix'] ?? '',
      insuredDOB: json['insured_DOB'] ?? '',
      insuredGender: json['insured_Gender'] ?? '',
      addedOn: json['addedOn'] ?? '',
      description: json['description'] ?? '',
      reviewedDate: json['reviewedDate'] ?? '',
      isProcessed: json['is_Processed'] ?? false,
      ptCustomerId: json['pt_customerID'] ?? 0,
      customerInsuranceCompanyRelationID: json['customeR_INS_COMPANY_REL_ID'] ?? 0,
      selfPay: json['selfPay'] ?? false,
      selfPaySince: json['selfPaySince'] ?? '2021-11-02T07:51:11.820Z',
      isSelfPayObject: json['isSelfPayObject'] ?? false,
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['welcomeform_Insurace_Data_ID'] = this.welcomeformInsuranceDataID;
    data['patientNumber'] = this.patientNumber;
    data['insurance_Company_Name'] = this.insuranceCompanyName;
    data['no_longer_use'] = this.noLongerUse;
    data['no_insurance_card'] = this.noInsuranceCard;
    data['notes'] = this.notes;
    data['base64bitInsCardFront'] = this.base64bitInsCardFront;
    data['base64bitInsCardBack'] = this.base64bitInsCardBack;
    data['patient_Relationship_To_Insured'] = this.patientRelationshipToInsured;
    data['insured_Id'] = this.insuredId;
    data['insured_FIRST_Name'] = this.insuredFirstName;
    data['insured_Last_Name'] = this.insuredLastName;
    data['insured_Middle_Name'] = this.insuredMiddleName;
    data['insured_Suffix'] = this.insuredSuffix;
    data['insured_DOB'] = this.insuredDOB;
    data['insured_Gender'] = this.insuredGender;
    data['addedOn'] = this.addedOn;
    data['description'] = this.description;
    data['reviewedDate'] = this.reviewedDate;
    data['is_Processed'] = this.isProcessed;
    data['pt_customerID'] = this.ptCustomerId;
    data['customeR_INS_COMPANY_REL_ID'] = this.customerInsuranceCompanyRelationID;
    data['selfPay'] = this.selfPay;
    data['selfPaySince'] = this.selfPaySince;
    data['isSelfPayObject'] = this.isSelfPayObject;
    return data;
  }
}

export interface UserInfoResponse {
  firstName?: string;
  lastName?: string;
  preferredName?: string;
  countryCode?: string;
  mobile?: string;
  email?: string;
  dob?: string;
  isExpired?: boolean;
  photo?: string;
  gender?: string;
  ptCustomerId?: number;
  locationID?: number;
  source?: string;
  selfPay?: boolean;
}

export class UserInfoResponseModel implements UserInfoResponse {
  firstName?: string;
  lastName?: string;
  preferredName?: string;
  countryCode?: string;
  mobile?: string;
  email?: string;
  dob?: string;
  isExpired?: boolean;
  photo?: string;
  gender?: string;
  ptCustomerId?: number;
  locationID?: number;
  source?: string;
  selfPay?: boolean;

  constructor({
    firstName,
    lastName,
    preferredName,
    countryCode,
    mobile,
    email,
    dob,
    isExpired,
    photo,
    gender,
    ptCustomerId,
    source,
    locationID,
    selfPay,
  }: UserInfoResponse) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.preferredName = preferredName;
    this.countryCode = countryCode;
    this.mobile = mobile;
    this.email = email;
    this.dob = dob;
    this.isExpired = isExpired;
    this.photo = photo;
    this.gender = gender;
    this.ptCustomerId = ptCustomerId;
    this.source = source;
    this.locationID = locationID;
    this.selfPay = selfPay;
  }

  static fromJson(json: { [key: string]: any }): UserInfoResponseModel {
    return new UserInfoResponseModel({
      firstName: json['firstName'] ?? '',
      lastName: json['lastName'] ?? '',
      preferredName: json['preferredName'] ?? '',
      countryCode: json['countryCode'] ?? '',
      mobile: json['mobile'] ?? '',
      email: json['email'] ?? '',
      dob: json['dob'] ?? '',
      isExpired: json['isExpired'] ?? true,
      photo: json['photo'] ?? '',
      gender: json['gender'] ?? '',
      ptCustomerId: json['ptCustomerId'] ?? 0,
      source: json['source'] ?? '',
      locationID: json['locationID'] ?? 0,
      selfPay: json['selfPay'] ?? false,
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['firstName'] = this.firstName ?? '';
    data['lastName'] = this.lastName ?? '';
    data['preferredName'] = this.preferredName ?? '';
    data['countryCode'] = this.countryCode ?? '';
    data['mobile'] = this.mobile ?? '';
    data['email'] = this.email ?? '';
    data['dob'] = this.dob ?? '';
    data['isExpired'] = this.isExpired ?? true;
    data['photo'] = this.photo ?? '';
    data['gender'] = this.gender ?? '';
    data['ptCustomerId'] = this.ptCustomerId ?? 0;
    data['source'] = this.source ?? '';
    data['locationID'] = this.locationID ?? 0;
    data['selfPay'] = this.selfPay ?? false;
    return data;
  }
}