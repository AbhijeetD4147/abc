import { AuthGuidResponseModel } from '../../model/patient_portal/AuthGuidResponseModel';
import { AuthorizedIndividualPermissionModel } from '../../model/authentication/AuthorizedIndividualPermissionModel';
import { SwitchUserDetailModel } from '../../model/authentication/SwitchUserDetailModel';
import { ValidatePatientForAddIndividualResponse } from '../../model/patient_portal/ValidatePatientForAddIndividualResponse';
import { AuthenticationService } from './UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

export class AuthenticationAuthUserService {
    isAuthUserPermissionUpdate: any;
    authGuidResponseModel: AuthGuidResponseModel | null = null;
    authorizedIndividualPermissionResponse: AuthorizedIndividualPermissionModel | null = null;
    getSwitchUserByIdModel: SwitchUserDetailModel[] = [];
    validatePatientForAddIndividualResponse: ValidatePatientForAddIndividualResponse | null = null;

    maximum_Calling_API_1: number = 0;
    maximum_Calling_API_2: number = 0;
    maximum_Calling_API_3: number = 0;
    maximum_Calling_API_4: number = 0;
    maximum_Calling_API_5: number = 0;

    response_Status_Code_API_1: number | null = null;
    response_Status_Code_API_2: number | null = null;
    response_Status_Code_API_3: number | null = null;
    response_Status_Code_API_4: number | null = null;
    response_Status_Code_API_5: number | null = null;

    // Add your methods here...

    static parsePracticePerson(responseBody: any): SwitchUserDetailModel[] {
        // Check if responseBody is already an object or array
        const parsed = typeof responseBody === 'string' ? JSON.parse(responseBody) : responseBody;
        return Array.isArray(parsed) ? parsed.map((json: any) => SwitchUserDetailModel.fromJson(json)) : [];
    }

    async validateAuthPatient(customerData: { [key: string]: any }): Promise<void> {
        try {
            const queryString = new URLSearchParams(customerData).toString();
            const url = `${ApiPath.baseApi}api/PatientPortal/ValidateAuthorizedIndividual`;
            const requestUrl = `${url}?${queryString}`;
    
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
    
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_1 = 205;
            } else if (response.status === 200) {
                // Fix: Check if response.data is already an object
                const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                this.validatePatientForAddIndividualResponse =
                    await ValidatePatientForAddIndividualResponse.fromJson(responseData);
                this.response_Status_Code_API_1 = response.status;
            } else {
                this.maximum_Calling_API_1 = this.maximum_Calling_API_1 + 1;
                if (this.maximum_Calling_API_1 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.validateAuthPatient(customerData);
                    } else {
                        setTimeout(async () => {
                            await this.validateAuthPatient(customerData);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_1 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async getSwitchUsers(): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = `${ApiPath.baseApi}api/PatientPortal/GetSwitchUsersByUserId`;
            const requestUrl = `${url}?${queryString}`;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_2 = 205;
            } else if (response.status === 200) {
                this.getSwitchUserByIdModel = await AuthenticationAuthUserService.parsePracticePerson(response.data);
                this.response_Status_Code_API_2 = response.status;
            } else {
                this.maximum_Calling_API_2 = this.maximum_Calling_API_2 + 1;
                if (this.maximum_Calling_API_2 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getSwitchUsers();
                    } else {
                        setTimeout(async () => {
                            await this.getSwitchUsers();
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_2 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }


    async getAuthPermissionPatientInfo(authId: string): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'Userid': GlobalParams.USER_ID,
                'AuthId': authId
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = `${ApiPath.baseApi}api/PatientPortal/GetAuthorizedIndividualPermission`;
            const requestUrl = `${url}?${queryString}`;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_3 = 205;
            } else if (response.status === 200) {
                this.authorizedIndividualPermissionResponse =
                    await AuthorizedIndividualPermissionModel.fromJson(JSON.parse(response.data));
                this.response_Status_Code_API_3 = response.status;
            } else {
                this.maximum_Calling_API_3 = this.maximum_Calling_API_3 + 1;
                if (this.maximum_Calling_API_3 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getAuthPermissionPatientInfo(authId);
                    } else {
                        setTimeout(async () => {
                            await this.getAuthPermissionPatientInfo(authId);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_3 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ==> ::', e);
        }
    }


    async saveAuthUserPermission(customerData: { [key: string]: any }): Promise<void> {
        try {
            const requestUrl = `${ApiPath.baseApi}api/PatientPortal/SaveAuthorizedIndividualPErmission?PracticeName=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
                dataModel: customerData
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_4 = 205;
            } else if (response.status === 200) {
                this.isAuthUserPermissionUpdate = response.data;
                this.response_Status_Code_API_4 = response.status;
            } else {
                this.maximum_Calling_API_4 = this.maximum_Calling_API_4 + 1;
                if (this.maximum_Calling_API_4 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.saveAuthUserPermission(customerData);
                    } else {
                        setTimeout(async () => {
                            await this.saveAuthUserPermission(customerData);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_4 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }


    async getAuthPatientInfo(guid: string): Promise<void> {
        const validatePatientData: { [key: string]: string } = {
            'PracticeName': GlobalParams.PRACTICE_NAME,
            'AuthGuid': guid
        };

        try {
            const queryString = new URLSearchParams(validatePatientData).toString();
            const url = `${ApiPath.baseApi}api/PatientPortal/ValidateAuthLoginLink`;
            const requestUrl = `${url}?${queryString}`;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_5 = 205;
            } else if (response.status === 200) {
                this.authGuidResponseModel =
                    await AuthGuidResponseModel.fromJson(JSON.parse(response.data));
                this.response_Status_Code_API_5 = response.status;
            } else {
                this.maximum_Calling_API_5 = this.maximum_Calling_API_5 + 1;
                if (this.maximum_Calling_API_5 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getAuthPatientInfo(guid);
                    } else {
                        setTimeout(async () => {
                            await this.getAuthPatientInfo(guid);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_5 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }


}