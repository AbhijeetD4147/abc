export interface IProfile {
  userInitial?: string;
  userProfilePhotoBase64?: string;
  userIdPhotoBase64?: string;
  firstName?: string;
  lastName?: string;
  lastChangePasswordDate?: string;
  userName?: string;
  isProfilePhotoUploading: boolean;
  isIdPhotoUploading: boolean;
  isProfilePhotoDeleting: boolean;
  isIdPhotoDeleting: boolean;
  contentType: string;
  isNameChanged: boolean;
}

export class ProfileModel implements IProfile {
  userInitial?: string;
  userProfilePhotoBase64?: string;
  userIdPhotoBase64?: string;
  firstName?: string;
  lastName?: string;
  lastChangePasswordDate?: string;
  userName?: string;
  isProfilePhotoUploading: boolean;
  isIdPhotoUploading: boolean;
  isProfilePhotoDeleting: boolean;
  isIdPhotoDeleting: boolean;
  contentType: string;
  isNameChanged: boolean;

  constructor({
    userInitial,
    userProfilePhotoBase64,
    userIdPhotoBase64,
    firstName,
    lastName,
    lastChangePasswordDate,
    userName,
    isProfilePhotoUploading = false,
    isIdPhotoUploading = false,
    isProfilePhotoDeleting = false,
    isIdPhotoDeleting = false,
    contentType = "",
    isNameChanged = false,
  }: IProfile) {
    this.userInitial = userInitial;
    this.userProfilePhotoBase64 = userProfilePhotoBase64;
    this.userIdPhotoBase64 = userIdPhotoBase64;
    this.firstName = firstName;
    this.lastName = lastName;
    this.lastChangePasswordDate = lastChangePasswordDate;
    this.userName = userName;
    this.isProfilePhotoUploading = isProfilePhotoUploading;
    this.isIdPhotoUploading = isIdPhotoUploading;
    this.isProfilePhotoDeleting = isProfilePhotoDeleting;
    this.isIdPhotoDeleting = isIdPhotoDeleting;
    this.contentType = contentType;
    this.isNameChanged = isNameChanged;
  }

  static fromJson(json: { [key: string]: any }): ProfileModel {
    return new ProfileModel({
      userInitial: json['userInitial'],
      userProfilePhotoBase64: json['userProfilePhotoBase64'],
      userIdPhotoBase64: json['userIdPhotoBase64'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      lastChangePasswordDate: json['lastChangePasswordDate'],
      userName: json['userName'],
      isProfilePhotoUploading: json['isProfilePhotoUploading'] ?? false,
      isIdPhotoUploading: json['isIdPhotoUploading'] ?? false,
      isProfilePhotoDeleting: json['isProfilePhotoDeleting'] ?? false,
      isIdPhotoDeleting: json['isIdPhotoDeleting'] ?? false,
      contentType: json['contentType'] ?? "",
      isNameChanged: json['isNameChanged'] ?? false,
    });
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data['userInitial'] = this.userInitial;
    data['userProfilePhotoBase64'] = this.userProfilePhotoBase64;
    data['userIdPhotoBase64'] = this.userIdPhotoBase64;
    data['firstName'] = this.firstName;
    data['lastName'] = this.lastName;
    data['lastChangePasswordDate'] = this.lastChangePasswordDate;
    data['userName'] = this.userName;
    data['isProfilePhotoUploading'] = this.isProfilePhotoUploading;
    data['isIdPhotoUploading'] = this.isIdPhotoUploading;
    data['isProfilePhotoDeleting'] = this.isProfilePhotoDeleting;
    data['isIdPhotoDeleting'] = this.isIdPhotoDeleting;
    data['contentType'] = this.contentType;
    data['isNameChanged'] = this.isNameChanged;
    return data;
  }
}