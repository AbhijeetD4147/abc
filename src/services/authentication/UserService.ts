// ... existing code ...

import axios from 'axios';
import { ApiPath } from '../../utils/constants'; // Assuming ApiPath is defined here
import { GlobalParams } from '../../utils/GlobalParameters'; // Assuming GlobalParams is defined here

import { UpdatePasswordResponseModel } from '../../model/authentication/password_response_model/UpdatePasswordResponseModel';
import { PatientAccountHistoryModel } from '../../model/authentication/PatientAccountHistoryModel';
import { InsertAuthorizedIndividualModel } from '../../model/authentication/InsertAuthorizedIndividualModel';
import { SwitchUserPortalPermissionModel } from '../../model/authentication/SwitchUserPortalPermissionModel';
import { AuthorizedIndividualTermsResponseModel, ExistingPatientTermsResponseModel, NewPatientTermsResponseModel } from '../../model/authentication/AcceptTermsResponseModel';
import { AuthTermsResponseModel, PatientTermsResponseModel } from '../../model/authentication/terms_and_conditions/TermsConditionPatientResonseModel';
import { UsernameSuggestionModel } from '../../model/authentication/UsernameSuggestionModel';
import { VendorDataResponseModel } from '../../model/authentication/VendorDataResponse';
import { AuthUserDetail } from '../../model/patient_portal/AuthorizedIndividualDetailResponseModel';
import { AuthorizedPatientResponse } from '../../model/patient_portal/AuthorizedPatientResponse';
import { ForgotPasswordGUIDVerificationResponseModel } from '../../model/patient_portal/ForgotPasswordGUIDVerificationResponseModel';
import { ForgotUpdatePasswordResponseModel } from '../../model/patient_portal/ForgotUpdatePasswordResponseModel';
import { UsernameGuidModel } from '../../model/patient_portal/ForgotUsernameGuidResponseModel';
import { LoginResponseModel } from '../../model/patient_portal/LoginResponseModel';
import { PatientAvailabilityResponseModel } from '../../model/patient_portal/PatientAvailabilityResponseModel';
import { ResetLinkSendResponse } from '../../model/patient_portal/ResetLinkSendResponse';
import { SaveUserResponse } from '../../model/patient_portal/SaveUserResponse';
import { VerifyOtpResponseModel } from '../../model/patient_portal/VerifyOtpResponseModel';
import { baseWebService } from '../../services/common/BaseWebService'; // Adjust path

export class AuthenticationService {
    
    loginHistory?: string;
    username?: string;
    ptCustomerId?: number;
    password?: string;
    isAuthDeleted: any; // Adjust type as needed based on your model
    captchaCode?: string;

    switchUsersDetailResponse?: SwitchUserPortalPermissionModel;

    authUserDetail?: AuthUserDetail;
    newPatientTermsResponseModel?: NewPatientTermsResponseModel;
    existingPatientTermsResponseModel?: ExistingPatientTermsResponseModel;
    authorizedIndividualTermsResponseModel?: AuthorizedIndividualTermsResponseModel;
    usernameSuggestionModel?: UsernameSuggestionModel;
    patientAccountHistoryModel?: PatientAccountHistoryModel;
    forgotUpdatePasswordResponseModel?: ForgotUpdatePasswordResponseModel;
    loginResponseModel?: LoginResponseModel;
    forgotPasswordGUIDVerificationResponseModel?: ForgotPasswordGUIDVerificationResponseModel;
    patientTermsResponseModel?: PatientTermsResponseModel;
    authTermsResponseModel?: AuthTermsResponseModel;
    authorizedPatientList?: AuthorizedPatientResponse[];
    updatePasswordResponseModel?: UpdatePasswordResponseModel;

    usernameGuidModel?: UsernameGuidModel;

    patientAvailabilityResponseModel?: PatientAvailabilityResponseModel;
    insertAuthorizedIndividualModel?: InsertAuthorizedIndividualModel;

    messageCount?: string;
    healthSummaryUnreadCount?: string;
    appointmentUnreadCount?: string;

    private _map: { [key: string]: any } = {};

    get map(): { [key: string]: any } {
        return this._map;
    }

    resetLinkForgotPasswordSendResponse?: ResetLinkSendResponse;
    resetLinkForgotUsernameSendResponse?: ResetLinkSendResponse;

    // var userId = "0"; // This looks like a commented-out variable, keeping it as a comment
    saveUserResponse?: SaveUserResponse;

    isSent: string = "false";

    patientName?: string;

    isAdded: any; // Adjust type as needed based on your model

    verifyOtpResponseModel?: VerifyOtpResponseModel;
    customerData?: { [key: string]: string };
    resendOtpResult: any; // Adjust type as needed based on your model
    dobAuthenticationResponse?: string;
    termsAcceptanceResponse?: string;
    authTermsAndConditionData?: string;

    maximum_Calling_API_1: number = 0;
    maximum_Calling_API_2: number = 0;
    maximum_Calling_API_3: number = 0;
    maximum_Calling_API_4: number = 0;
    maximum_Calling_API_5: number = 0;
    maximum_Calling_API_6: number = 0;
    maximum_Calling_API_7: number = 0;
    maximum_Calling_API_8: number = 0;
    maximum_Calling_API_9: number = 0;
    maximum_Calling_API_10: number = 0;
    maximum_Calling_API_11: number = 0;
    maximum_Calling_API_12: number = 0;
    maximum_Calling_API_13: number = 0;
    maximum_Calling_API_14: number = 0;
    maximum_Calling_API_15: number = 0;
    maximum_Calling_API_16: number = 0;
    maximum_Calling_API_17: number = 0;
    maximum_Calling_API_18: number = 0;
    maximum_Calling_API_19: number = 0;
    maximum_Calling_API_20: number = 0;
    maximum_Calling_API_21: number = 0;
    maximum_Calling_API_22: number = 0;
    maximum_Calling_API_23: number = 0;
    maximum_Calling_API_24: number = 0;
    maximum_Calling_API_25: number = 0;
    maximum_Calling_API_26: number = 0;
    maximum_Calling_API_27: number = 0;
    maximum_Calling_API_28: number = 0;
    maximum_Calling_API_29: number = 0;
    maximum_Calling_API_30: number = 0;
    response_Status_Code_API_1?: number;
    response_Status_Code_API_2?: number;
    response_Status_Code_API_3?: number;
    response_Status_Code_API_4?: number;
    response_Status_Code_API_5?: number;
    response_Status_Code_API_6?: number;
    response_Status_Code_API_7?: number;
    response_Status_Code_API_8?: number;
    response_Status_Code_API_9?: number;
    response_Status_Code_API_10?: number;
    response_Status_Code_API_11?: number;
    response_Status_Code_API_12?: number;
    response_Status_Code_API_13?: number;
    response_Status_Code_API_14?: number;
    response_Status_Code_API_15?: number;
    response_Status_Code_API_16?: number;
    response_Status_Code_API_17?: number;
    response_Status_Code_API_18?: number;
    response_Status_Code_API_19?: number;
    response_Status_Code_API_20?: number;
    response_Status_Code_API_21?: number;
    response_Status_Code_API_22?: number;
    response_Status_Code_API_23?: number;
    response_Status_Code_API_24?: number;
    response_Status_Code_API_25?: number;
    response_Status_Code_API_26?: number;
    response_Status_Code_API_27?: number;
    response_Status_Code_API_28?: number;
    response_Status_Code_API_29?: number;
    response_Status_Code_API_30?: number;

    // To Check OTP Entered By User
    async checkOtp(
        userType: string,
        authId: string,
        otp: string,
        callFrom: string,
    ): Promise<void> {
        let customerData: { [key: string]: string } = {};

        if (userType === 'New_Patient_Account') {
            customerData = {
                PracticeName: GlobalParams.PRACTICE_NAME,
                OwnerId: GlobalParams.PT_CUSTOMER_ID,
                OwnerType: userType,
                OTP: otp,
            };
        } else if (userType === 'NEW_AUTH_INDIVIDUAL') {
            customerData = {
                PracticeName: GlobalParams.PRACTICE_NAME,
                OwnerId: authId,
                OwnerType: userType,
                OTP: otp,
            };
        } else {
            if (callFrom === 'SignUpAsPatient') {
                customerData = {
                    PracticeName: GlobalParams.PRACTICE_NAME,
                    UserId: GlobalParams.USER_ID,
                    OwnerType: userType,
                    OwnerId: GlobalParams.PT_CUSTOMER_ID,
                    OTP: otp,
                    CallFrom: 'SignUpAsPatient',
                };
            } else {
                customerData = {
                    PracticeName: GlobalParams.PRACTICE_NAME,
                    UserId: GlobalParams.USER_ID,
                    OwnerType: userType,
                    OwnerId: GlobalParams.PT_CUSTOMER_ID,
                    OTP: otp,
                };
            }
        }

        try {
            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/VerifyOTP';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === 'SESSION INVALID') {
                this.response_Status_Code_API_1 = 205;
            } else if (response.status === 200) {
                this.verifyOtpResponseModel = VerifyOtpResponseModel.fromJson(
                    response.data,
                );
                this.response_Status_Code_API_1 = response.status;
            } else {
                this.maximum_Calling_API_1 = this.maximum_Calling_API_1 + 1;
                if (this.maximum_Calling_API_1 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.checkOtp(userType, authId, otp, callFrom);
                    } else {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await this.checkOtp(userType, authId, otp, callFrom);
                    }
                } else {
                    this.response_Status_Code_API_1 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error : ', e);
        }
    }

    static async generateToken(): Promise<void> {
        try {
            const firstResponse = await axios.get(
                `${ApiPath.baseApi}GetWelcomeformParamForAuthenticate`,
                {
                    headers: {
                        "AccountId": GlobalParams.PRACTICE_NAME,
                        "SessionGuid": GlobalParams.SESSION_GUID
                    }
                }
            );

            if (firstResponse.status === 200) {
                const vendorInterfaceData = VendorDataResponseModel.fromJson(
                    firstResponse.data
                );

                const customerData = {
                    "vendorId": vendorInterfaceData.vendorId,
                    "vendorPassword": vendorInterfaceData.vendorPassword,
                    "accountId": vendorInterfaceData.accountId
                };

                const response = await axios.post(
                    `${ApiPath.baseApi}Authenticate`,
                    customerData,
                    {
                        headers: {
                            "content-type": "application/json",
                            "SessionGuid": GlobalParams.SESSION_GUID
                        }
                    }
                );

                GlobalParams.TOKEN = response.data;
            } else {
                console.log(`Request failed with status code: ${firstResponse.status}`);
            }
        } catch (error: any) {
            if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
                console.log("No internet Connection");
            } else {
                console.log(`caught error: ${error}`);
            }
        }
    }


    // To Get Terms And Condition Text
    async fetchTermsAndConditionData(): Promise<void> {
        try {
            const customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/GetTncText';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({ requestUrl });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_2 = 205;
            } else if (response.status === 200) {
                this.authTermsAndConditionData = response.data;
                this.response_Status_Code_API_2 = response.status;
            } else {
                this.maximum_Calling_API_2 = this.maximum_Calling_API_2 + 1;

                if (this.maximum_Calling_API_2 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.fetchTermsAndConditionData();
                    } else {
                        setTimeout(async () => {
                            await this.fetchTermsAndConditionData();
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_2 = response.status;
                }
            }
        } catch (error) {
            console.log(`caught error: ${error}`);
        }
    }

    // To Send Credentials on Email Id
    async sendCredentials(emailId: string, patientNumber: number): Promise<void> {
        const customerData: { [key: string]: string } = {
            'PracticeName': GlobalParams.PRACTICE_NAME,
            'EmailID': emailId,
            'PatientNumber': patientNumber.toString(),
        };

        try {
            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/SendCredentialsToPatient';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_3 = 205;
            } else if (response.status === 200) {
                this.isSent = response.data;
                this.response_Status_Code_API_3 = response.status;
            } else {
                this.maximum_Calling_API_3 = this.maximum_Calling_API_3 + 1;
                if (this.maximum_Calling_API_3 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.sendCredentials(emailId, patientNumber);
                    } else {
                        setTimeout(async () => {
                            await this.sendCredentials(emailId, patientNumber);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_3 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async createUser(saveUserRequestModel: any): Promise<void> {
        try {
            const url = ApiPath.baseApi +
                `api/Users/SaveUser?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: saveUserRequestModel,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_4 = 205;
            } else if (response.status === 200) {
                this.saveUserResponse = SaveUserResponse.fromJson(JSON.parse(response.data));
                this.response_Status_Code_API_4 = response.status;
            } else {
                this.maximum_Calling_API_4 = this.maximum_Calling_API_4 + 1;
                if (this.maximum_Calling_API_4 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.createUser(saveUserRequestModel);
                    } else {
                        setTimeout(async () => {
                            await this.createUser(saveUserRequestModel);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_4 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async resetLinkForForgotUserName(resetLinkSendRequestModel: any): Promise<void> {
        try {
            const url = ApiPath.baseApi +
                `api/Users/ResetLinkForForgotUserName?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: resetLinkSendRequestModel,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_5 = 205;
            } else if (response.status === 200) {
                this.resetLinkForgotUsernameSendResponse =
                    ResetLinkSendResponse.fromJson(response.data);
                this.response_Status_Code_API_5 = response.status;
            } else {
                this.maximum_Calling_API_5 = this.maximum_Calling_API_5 + 1;
                if (this.maximum_Calling_API_5 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.resetLinkForForgotUserName(resetLinkSendRequestModel);
                    } else {
                        setTimeout(async () => {
                            await this.resetLinkForForgotUserName(resetLinkSendRequestModel);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_5 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }
    async resetLinkForForgotPassword(resetPasswordLinkRequestModel: any): Promise<void> {
        try {
            const url = ApiPath.baseApi +
                `api/Users/ResetLinkForForgotPassword?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: resetPasswordLinkRequestModel,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_6 = 205;
            } else if (response.status === 200) {
                console.log('Response data type:', typeof response.data);
                console.log('Response data:', response.data);
                try {
                    // Check if response.data is already an object or needs parsing
                    const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                    console.log('Parsed response data:', responseData);
                    this.resetLinkForgotPasswordSendResponse =
                        ResetLinkSendResponse.fromJson(responseData);
                    this.response_Status_Code_API_6 = response.status;
                } catch (error) {
                    console.error('Error parsing response data:', error);
                    // Fallback handling
                    this.resetLinkForgotPasswordSendResponse = new ResetLinkSendResponse({
                        emailResponse: 'Success' // Set default success to allow navigation
                    });
                    this.response_Status_Code_API_6 = response.status;
                }
            } else {
                this.maximum_Calling_API_6 = this.maximum_Calling_API_6 + 1;
                if (this.maximum_Calling_API_6 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.resetLinkForForgotPassword(resetPasswordLinkRequestModel);
                    } else {
                        setTimeout(async () => {
                            await this.resetLinkForForgotPassword(resetPasswordLinkRequestModel);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_6 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async validatePatient(customerData: { [key: string]: any } | null): Promise<void> {
        try {
            const queryString = new URLSearchParams(customerData || {}).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/PatientPortalPatientValidate';
            const requestUrl = url + "?" + queryString;

            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
                dataModel: null,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_7 = 205;
            } else if (response.status === 200) {
                this.patientAvailabilityResponseModel =
                    PatientAvailabilityResponseModel.fromJson(JSON.parse(response.data));
                this.response_Status_Code_API_7 = response.status;
            } else {
                this.maximum_Calling_API_7 = this.maximum_Calling_API_7 + 1;
                if (this.maximum_Calling_API_7 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.validatePatient(customerData);
                    } else {
                        setTimeout(async () => {
                            await this.validatePatient(customerData);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_7 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }

    async verifyGuidForResetUsername(usernameModel: any): Promise<void> {
        try {
            const url = ApiPath.baseApi +
                `api/Users/ForgotUserNameGUIDVerification?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: usernameModel,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_8 = 205;
            } else if (response.status === 200) {
                this.usernameGuidModel =
                    UsernameGuidModel.fromJson(JSON.parse(response.data));
                this.response_Status_Code_API_8 = response.status;
            } else {
                this.maximum_Calling_API_8 = this.maximum_Calling_API_8 + 1;
                if (this.maximum_Calling_API_8 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.verifyGuidForResetUsername(usernameModel);
                    } else {
                        setTimeout(async () => {
                            await this.verifyGuidForResetUsername(usernameModel);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_8 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }

    async getAuthPatientList(): Promise<void> {
        const userId = GlobalParams.USER_ID;
        try {
            const customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'Userid': userId,
            };
            const url =
                ApiPath.baseApi + 'api/PatientPortal/GetAuthorizedIndividualByUserId';

            const queryString = new URLSearchParams(customerData).toString();

            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_9 = 205;
            } else if (response.status === 200) {
                this.authorizedPatientList = this.parseMessage(response.data);
                this.response_Status_Code_API_9 = response.status;
            } else {
                this.maximum_Calling_API_9 = this.maximum_Calling_API_9 + 1;
                if (this.maximum_Calling_API_9 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getAuthPatientList();
                    } else {
                        setTimeout(async () => {
                            await this.getAuthPatientList();
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_9 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error.. :', e);
        }
    }

    parseMessage(responseBody: string): AuthorizedPatientResponse[] {
        const parsed = JSON.parse(responseBody);
        return parsed.map((json: any) => AuthorizedPatientResponse.fromJson(json));
    }

    async verifyGuidForResetPassword(forgotUsernameGuidRequestModel: any): Promise<void> {
        try {
            const url = `${ApiPath.baseApi}api/Users/ForgotPasswordGUIDVerification?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: forgotUsernameGuidRequestModel,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_10 = 205;
            } else if (response.status === 200) {
                this.forgotPasswordGUIDVerificationResponseModel =
                    ForgotPasswordGUIDVerificationResponseModel.fromJson(
                        JSON.parse(response.data)
                    );
                this.response_Status_Code_API_10 = response.status;
            } else {
                this.maximum_Calling_API_10 = this.maximum_Calling_API_10 + 1;
                if (this.maximum_Calling_API_10 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.verifyGuidForResetPassword(forgotUsernameGuidRequestModel);
                    } else {
                        setTimeout(async () => {
                            await this.verifyGuidForResetPassword(forgotUsernameGuidRequestModel);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_10 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async getCaptcha(): Promise<void> {
        try {
            const customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = `${ApiPath.baseApi}api/PatientPortal/GetCaptcha`;
            const requestUrl = `${url}?${queryString}`;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_11 = 205;
            } else if (response.status === 200) {
                this.captchaCode = response.data;
                this.response_Status_Code_API_11 = response.status;
            } else {
                this.maximum_Calling_API_11 = this.maximum_Calling_API_11 + 1;
                if (this.maximum_Calling_API_11 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getCaptcha();
                    } else {
                        setTimeout(async () => {
                            await this.getCaptcha();
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_11 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async deleteAuthPatient(authId: number): Promise<void> {
        const userId = GlobalParams.USER_ID;
        try {
            const url = `${ApiPath.baseApi}api/PatientPortal/DeleteAuthorizedIndividual?PracticeName=${GlobalParams.PRACTICE_NAME}&AuthId=${authId}&UserId=${userId}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: null,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_12 = 205;
            } else if (response.status === 200) {
                this.isAuthDeleted = response.data;
                this.response_Status_Code_API_12 = response.status;
            } else {
                this.maximum_Calling_API_12 = this.maximum_Calling_API_12 + 1;
                if (this.maximum_Calling_API_12 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.deleteAuthPatient(authId);
                    } else {
                        setTimeout(async () => {
                            await this.deleteAuthPatient(authId);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_12 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async getUsernameSuggestion(
        currentUsername: string,
        userType: string,
        authId: number
    ): Promise<void> {
        try {
            let customerData: { [key: string]: string } = {};

            if (userType === 'Auth') {
                customerData = {
                    'PracticeName': GlobalParams.PRACTICE_NAME,
                    'UserName': currentUsername,
                    'UserType': userType,
                    'AuthId': authId.toString()
                };
            } else {
                customerData = {
                    'PracticeName': GlobalParams.PRACTICE_NAME,
                    'PtCustomerId': GlobalParams.PT_CUSTOMER_ID,
                    'UserName': currentUsername,
                    'UserType': userType,
                    'AuthId': '0'
                };
            }

            const queryString = new URLSearchParams(customerData).toString();
            const url = `${ApiPath.baseApi}api/PatientPortal/GetSuggestedUserName`;
            const requestUrl = `${url}?${queryString}`;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_13 = 205;
            } else if (response.status === 200) {
                this.usernameSuggestionModel = UsernameSuggestionModel.fromJson(
                    JSON.parse(response.data)
                );
                this.response_Status_Code_API_13 = response.status;
            } else {
                this.maximum_Calling_API_13 = this.maximum_Calling_API_13 + 1;
                if (this.maximum_Calling_API_13 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getUsernameSuggestion(currentUsername, userType, authId);
                    } else {
                        setTimeout(async () => {
                            await this.getUsernameSuggestion(currentUsername, userType, authId);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_13 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async addAuthPatient(
        customerData: { [key: string]: any },
        matchType: string
    ): Promise<void> {
        try {
            const url = `${ApiPath.baseApi}api/PatientPortal/InsertAuthorizedIndividual?PracticeName=${GlobalParams.PRACTICE_NAME}&MatchType=${matchType}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: customerData
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_14 = 205;
            } else if (response.status === 200) {
                this.insertAuthorizedIndividualModel =
                    InsertAuthorizedIndividualModel.fromJson(
                        JSON.parse(response.data)
                    );
                this.response_Status_Code_API_14 = response.status;
            } else {
                this.maximum_Calling_API_14 = this.maximum_Calling_API_14 + 1;
                if (this.maximum_Calling_API_14 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.addAuthPatient(customerData, matchType);
                    } else {
                        setTimeout(async () => {
                            await this.addAuthPatient(customerData, matchType);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_14 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }


    async acceptTermForAuthPatient(
        acceptTermsForAuthorizedIndividualRequestModel: any
    ): Promise<void> {
        try {
            const url = `${ApiPath.baseApi}api/PatientPortal/InsertTermsAndConditionsAuthorizedIndividual?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: acceptTermsForAuthorizedIndividualRequestModel
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_15 = 205;
            } else if (response.status === 200) {
                this.authorizedIndividualTermsResponseModel =
                    AuthorizedIndividualTermsResponseModel.fromJson(
                        JSON.parse(response.data)
                    );
                this.response_Status_Code_API_15 = response.status;
            } else {
                this.maximum_Calling_API_15 = this.maximum_Calling_API_15 + 1;
                if (this.maximum_Calling_API_15 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.acceptTermForAuthPatient(
                            acceptTermsForAuthorizedIndividualRequestModel
                        );
                    } else {
                        setTimeout(async () => {
                            await this.acceptTermForAuthPatient(
                                acceptTermsForAuthorizedIndividualRequestModel
                            );
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_15 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async acceptTermsForExistingPatient(
        existingPatientTermsRequestModel: any
    ): Promise<void> {
        try {
            const url = `${ApiPath.baseApi}api/PatientPortal/ExistingPatientSaveTermsAndConditions?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: existingPatientTermsRequestModel
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_16 = 205;
            } else if (response.status === 200) {
                this.existingPatientTermsResponseModel =
                    ExistingPatientTermsResponseModel.fromJson(
                        JSON.parse(response.data)
                    );
                this.response_Status_Code_API_16 = response.status;
            } else {
                this.maximum_Calling_API_16 = this.maximum_Calling_API_16 + 1;
                if (this.maximum_Calling_API_16 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.acceptTermsForExistingPatient(
                            existingPatientTermsRequestModel
                        );
                    } else {
                        setTimeout(async () => {
                            await this.acceptTermsForExistingPatient(
                                existingPatientTermsRequestModel
                            );
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_16 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }

    async getAuthUserDetail(): Promise<void> {
        // Assume authId as ptCustomerId When Loggedin User Type is Auth as in future if signup as a patient we directly change usertype

        const ptCustomerId = GlobalParams.PT_CUSTOMER_ID;
        try {
            this.customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'AuthId': ptCustomerId,
            };

            const queryString = new URLSearchParams(this.customerData).toString();

            const url = ApiPath.baseApi + 'api/PatientPortal/GetAuthIndividualDetailsById';

            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_17 = 205;
            } else if (response.status === 200) {
                this.authUserDetail = AuthUserDetail.fromJson(
                    JSON.parse(response.data)
                );
                this.response_Status_Code_API_17 = response.status;
            } else {
                this.maximum_Calling_API_17 = this.maximum_Calling_API_17 + 1;
                if (this.maximum_Calling_API_17 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getAuthUserDetail();
                    } else {
                        setTimeout(async () => {
                            await this.getAuthUserDetail();
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_17 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ==> ::', e);
        }
    }

    // ... existing code ...

    async acceptTermForNewPatient(
        newPatientTermsRequestModel: any
    ): Promise<void> {
        try {
            const url = `${ApiPath.baseApi}api/PatientPortal/CreatePatientPortalNewAccount?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: newPatientTermsRequestModel,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_18 = 205;
            } else if (response.status === 200) {
                this.newPatientTermsResponseModel =
                    NewPatientTermsResponseModel.fromJson(
                        JSON.parse(response.data)
                    );

                if (this.newPatientTermsResponseModel!.status! === true) {
                    // For the Flow of Auth => Sign Up As Patient
                    if (GlobalParams.USER_TYPE !== "Auth") {
                        GlobalParams.PT_CUSTOMER_ID =
                            this.newPatientTermsResponseModel?.ptCustomerid?.toString() ?? '';
                    }
                }
                this.response_Status_Code_API_18 = response.status;
            } else {
                this.maximum_Calling_API_18 = this.maximum_Calling_API_18 + 1;
                if (this.maximum_Calling_API_18 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.acceptTermForNewPatient(newPatientTermsRequestModel);
                    } else {
                        setTimeout(async () => {
                            await this.acceptTermForNewPatient(newPatientTermsRequestModel);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_18 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async acceptTermForAuthSignupAsPatient(
        newPatientTermsRequestModel: any
    ): Promise<void> {
        try {
            const url = `${ApiPath.baseApi}api/PatientPortal/CreatePatientPortalNewAccount?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: newPatientTermsRequestModel,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_19 = 205;
            } else if (response.status === 200) {
                this.newPatientTermsResponseModel =
                    NewPatientTermsResponseModel.fromJson(
                        JSON.parse(response.data)
                    );

                if (this.newPatientTermsResponseModel!.status === true) {
                    GlobalParams.PT_CUSTOMER_ID =
                        this.newPatientTermsResponseModel?.ptCustomerid?.toString() ?? '';
                }
                this.response_Status_Code_API_19 = response.status;
            } else {
                this.maximum_Calling_API_19 = this.maximum_Calling_API_19 + 1;
                if (this.maximum_Calling_API_19 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.acceptTermForAuthSignupAsPatient(newPatientTermsRequestModel);
                    } else {
                        setTimeout(async () => {
                            await this.acceptTermForAuthSignupAsPatient(
                                newPatientTermsRequestModel
                            );
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_19 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async getResendSignUpEmailForAuthUser(authId: string): Promise<void> {
        const userId = GlobalParams.USER_ID;

        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'AuthId': authId,
                'UserId': userId,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi +
                'api/PatientPortal/ResendSignUpEmailForAuthorizedIndividual';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_20 = 205;
            } else if (response.status === 200) {
                this.response_Status_Code_API_20 = response.status;
            } else {
                this.maximum_Calling_API_20 = this.maximum_Calling_API_20 + 1;
                if (this.maximum_Calling_API_20 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getResendSignUpEmailForAuthUser(authId);
                    } else {
                        setTimeout(async () => {
                            await this.getResendSignUpEmailForAuthUser(authId);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_20 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async getSwitchUserDetail(customerData: { [key: string]: any } | null): Promise<void> {
        const queryString = new URLSearchParams(customerData || {}).toString();

        const url = ApiPath.baseApi + 'api/PatientPortal/GetSwitchUsersDetails';
        const requestUrl = url + '?' + queryString;

        try {
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_21 = 205;
            } else if (response.status === 200) {
                this.switchUsersDetailResponse =
                    SwitchUserPortalPermissionModel.fromJson(
                        JSON.parse(response.data)
                    );
                this.response_Status_Code_API_21 = response.status;
            } else {
                this.maximum_Calling_API_21 = this.maximum_Calling_API_21 + 1;
                if (this.maximum_Calling_API_21 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getSwitchUserDetail(customerData);
                    } else {
                        setTimeout(async () => {
                            await this.getSwitchUserDetail(customerData);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_21 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ==> ::', e);
        }
    }


    async createAccountOld(loginModel: { [key: string]: any }): Promise<void> {
        try {
            GlobalParams.SWITCH_USER_ID = "0";
            const url = `${ApiPath.baseApi}api/Account/Login?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: loginModel,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_22 = 205;
            } else if (response.status === 200) {
                this.loginResponseModel =
                    LoginResponseModel.fromJson(JSON.parse(response.data));
                this.response_Status_Code_API_22 = response.status;

                if (this.loginResponseModel!.userId! > 0) {
                    GlobalParams.USER_ID = this.loginResponseModel?.userId?.toString() ?? '';
                    GlobalParams.USER_TYPE = this.loginResponseModel!.userType!;
                    GlobalParams.PT_CUSTOMER_ID =
                        this.loginResponseModel?.ptCustomerID?.toString() ?? '';

                    if (this.loginResponseModel!.userType === "Auth") {
                        GlobalParams.PT_CUSTOMER_ID_For_Audit_Log =
                            this.loginResponseModel?.ptCustomerID?.toString() ?? "0";
                        GlobalParams.isSettingIconMenuItemsAccess = false;

                        // Navigation would need to be handled differently in React/TypeScript
                        // Example: navigate('/auth-user-login');
                        // or using React Router's useNavigate hook
                    } else {
                        GlobalParams.PT_CUSTOMER_ID_For_Audit_Log = "0";
                    }
                }
            } else {
                this.maximum_Calling_API_22 = this.maximum_Calling_API_22 + 1;
                if (this.maximum_Calling_API_22 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.createAccountOld(loginModel);
                    } else {
                        setTimeout(async () => {
                            await this.createAccountOld(loginModel);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_22 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ==> ::', e);
        }
    }

    async checkPatientAccount(id: string): Promise<PatientAccountHistoryModel | null> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'PatientGuid': id,
            };
            const queryString = new URLSearchParams(customerData).toString();

            const url = `${ApiPath.baseApi}api/PatientPortal/CheckPatientIsUsedAccountOrNot`;
            const requestUrl = `${url}?${queryString}`;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_23 = 205;
                return null;
            } else if (response.status === 200) {
                this.patientAccountHistoryModel =
                    PatientAccountHistoryModel.fromJson(JSON.parse(response.data));
                    const model = PatientAccountHistoryModel.fromJson(JSON.parse(response.data));
                this.response_Status_Code_API_23 = response.status;
                return model;
            } else {
                this.maximum_Calling_API_23 = this.maximum_Calling_API_23 + 1;
                if (this.maximum_Calling_API_23 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.checkPatientAccount(id);
                    } else {
                        setTimeout(async () => {
                            await this.checkPatientAccount(id);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_23 = response.status;
                    return null;
                }
            }
        } catch (e) {
            console.error('caught error on appointment count ::', e);
            return null;
        }
    }


    async changePassword(passwordResetModel: any): Promise<void> {
        try {
            const url = `${ApiPath.baseApi}api/Users/ForgotPasswordForChangePassword?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                dataModel: passwordResetModel,
                requestUrl: url,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_24 = 205;
            } else if (response.status === 200) {
                this.forgotUpdatePasswordResponseModel =
                    ForgotUpdatePasswordResponseModel.fromJson(
                        JSON.parse(response.data));
                this.response_Status_Code_API_24 = response.status;
            } else {
                this.maximum_Calling_API_24 = this.maximum_Calling_API_24 + 1;
                if (this.maximum_Calling_API_24 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.changePassword(passwordResetModel);
                    } else {
                        setTimeout(async () => {
                            await this.changePassword(passwordResetModel);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_24 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async login(loginModel: { [key: string]: any }): Promise<void> {
        GlobalParams.SWITCH_USER_ID = "0";
        try {
            const url = `${ApiPath.baseApi}api/Account/Login?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: loginModel,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_25 = 205;
            } else if (response.status === 200) {
                this.loginResponseModel =
                    LoginResponseModel.fromJson(typeof response.data === 'string' ? JSON.parse(response.data) : response.data);
                this.response_Status_Code_API_25 = response.status;
            } else {
                this.maximum_Calling_API_25 = this.maximum_Calling_API_25 + 1;
                if (this.maximum_Calling_API_25 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.login(loginModel);
                    } else {
                        setTimeout(async () => {
                            await this.login(loginModel);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_25 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async resendOtp(userType: string, authId: string): Promise<void> {
        try {
            let customerData: { [key: string]: any };

            if (userType === 'New_Patient_Account') {
                customerData = {
                    'PracticeName': GlobalParams.PRACTICE_NAME,
                    'OwnerId': GlobalParams.PT_CUSTOMER_ID,
                    'OwnerType': userType,
                };
            } else if (userType === "NEW_AUTH_INDIVIDUAL") {
                customerData = {
                    'PracticeName': GlobalParams.PRACTICE_NAME,
                    'OwnerId': authId,
                    'OwnerType': userType,
                };
            } else {
                customerData = {
                    'PracticeName': GlobalParams.PRACTICE_NAME,
                    'UserId': GlobalParams.USER_ID,
                    'OwnerType': userType,
                    'OwnerId': GlobalParams.PT_CUSTOMER_ID,
                };
            }

            const queryString = new URLSearchParams(customerData).toString();
            const url = `${ApiPath.baseApi}api/PatientPortal/ResendOTP`;
            const requestUrl = `${url}?${queryString}`;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_26 = 205;
            } else if (response.status === 200) {
                this.resendOtpResult = response.data;
                this.response_Status_Code_API_26 = response.status;
            } else {
                this.maximum_Calling_API_26 = this.maximum_Calling_API_26 + 1;
                if (this.maximum_Calling_API_26 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.resendOtp(userType, authId);
                    } else {
                        setTimeout(async () => {
                            await this.resendOtp(userType, authId);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_26 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async verifyDOB(dob: string): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
                'DOB': dob,
                'PtCustomerId': GlobalParams.PT_CUSTOMER_ID,
            };

            const queryString = new URLSearchParams(customerData).toString();

            const url = `${ApiPath.baseApi}api/PatientPortal/VerifyPatientDOB`;
            const requestUrl = `${url}?${queryString}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
                dataModel: null,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_27 = 205;
            } else if (response.status === 200) {
                this.dobAuthenticationResponse = response.data;
                this.response_Status_Code_API_27 = response.status;
            } else {
                this.maximum_Calling_API_27 = this.maximum_Calling_API_27 + 1;
                if (this.maximum_Calling_API_27 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.verifyDOB(dob);
                    } else {
                        setTimeout(async () => {
                            await this.verifyDOB(dob);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_27 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error  ::', e);
        }
    }


    async acceptTermsAfterLoginForPatient(base64Signature: string, optedPatient: boolean): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'SourceFrom': optedPatient ? 'OptIn' : 'NewRecord',
                'Signature': base64Signature,
                'PtCustomerId': GlobalParams.PT_CUSTOMER_ID,
                'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
            };

            const url = `${ApiPath.baseApi}api/PatientPortal/AcceptTermsAndCondition?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: customerData
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_28 = 205;
            } else if (response.status === 200) {
                this.termsAcceptanceResponse = response.data;
                this.response_Status_Code_API_28 = response.status;
            } else {
                this.maximum_Calling_API_28 = this.maximum_Calling_API_28 + 1;
                if (this.maximum_Calling_API_28 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.acceptTermsAfterLoginForPatient(base64Signature, optedPatient);
                    } else {
                        setTimeout(async () => {
                            await this.acceptTermsAfterLoginForPatient(base64Signature, optedPatient);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_28 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error  ::', e);
        }
    }

    async fetchTermsAfterLogin(): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'PtCustomerId': GlobalParams.PT_CUSTOMER_ID,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = `${ApiPath.baseApi}api/PatientPortal/GetTNCTextAfterLogin`;
            const requestUrl = `${url}?${queryString}`;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_29 = 205;
            } else if (response.status === 200) {
                this.patientTermsResponseModel = PatientTermsResponseModel.fromJson(JSON.parse(response.data));
                this.response_Status_Code_API_29 = response.status;
            } else {
                this.maximum_Calling_API_29 = this.maximum_Calling_API_29 + 1;
                if (this.maximum_Calling_API_29 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.fetchTermsAfterLogin();
                    } else {
                        setTimeout(async () => {
                            await this.fetchTermsAfterLogin();
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_29 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async updatePassword(password: string): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID,
                'NewPassword': password
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = `${ApiPath.baseApi}api/Users/UpdatePatientPassword`;
            const requestUrl = `${url}?${queryString}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
                dataModel: {},

            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_30 = 205;
            } else if (response.status === 200) {
                this.updatePasswordResponseModel = UpdatePasswordResponseModel.fromJson(JSON.parse(response.data));
                this.response_Status_Code_API_30 = response.status;
            } else {
                this.maximum_Calling_API_30 = this.maximum_Calling_API_30 + 1;
                if (this.maximum_Calling_API_30 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.updatePassword(password);
                    } else {
                        setTimeout(async () => {
                            await this.updatePassword(password);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_30 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }

}
