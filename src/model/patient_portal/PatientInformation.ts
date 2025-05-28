// ... existing code ...

export class PatientInformation {
  firstName: string;
  lastName: string;
  countryCode: string;
  mobileNumber: string;
  email: string;
  dob: string;

  constructor(
    firstName: string,
    lastName: string,
    countryCode: string,
    mobileNumber: string,
    email: string,
    dob: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.countryCode = countryCode;
    this.mobileNumber = mobileNumber;
    this.email = email;
    this.dob = dob;
  }
}