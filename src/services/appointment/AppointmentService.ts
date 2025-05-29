import {
    LatestAppointmentModel,
    VisitSummaryModel,
    AppointmentPracticePersonModel,
    AppointmentReasonModel,
    LocationModel,
    AppointmentListModel,
    AppointmentBookingAllowModel,
    NewCompanyDataResponse,
    AppointmentDataPass,
    ExistingAppointmentData,
    ValidatePermissionForAppointment
} from '../../model/appointment/AppointmentModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';
import { format } from 'date-fns';

export class AppointmentService {
    latestAppointmentModel: LatestAppointmentModel | null = null;
    visitSummaryModel: VisitSummaryModel | null = null;
    practicePersonData: AppointmentPracticePersonModel[] = [];
    reasonData: AppointmentReasonModel[] = [];
    locationData: LocationModel[] = [];
    newCompanyDataResponse: NewCompanyDataResponse | null = null;
    datapass: AppointmentDataPass | null = null;
    slotResponse: string | null = null;
    isSlotAvailable: string | null = null;
    isAppointmentBooked: string | null = null;
    selectiveAppointmentList: AppointmentListModel[] | null = null;
    appointmentList: AppointmentListModel[] | null = null;
    cancelAppointmentResponse: string | null = null;
    confirmAppointmentResponse: string | null = null;
    markArrivedInMaxResponse: string | null = null;
    visitSummaryHeader: string = "";
    visitSummaryData: string = "";
    existingAppointmentData: ExistingAppointmentData | null = null;
    validatePermissionForAppointment: ValidatePermissionForAppointment | null = null;
    appointmentBookingAllowModel: AppointmentBookingAllowModel | null = null;

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

    response_Status_Code_API_1: number | null = null;
    response_Status_Code_API_2: number | null = null;
    response_Status_Code_API_3: number | null = null;
    response_Status_Code_API_4: number | null = null;
    response_Status_Code_API_5: number | null = null;
    response_Status_Code_API_6: number | null = null;
    response_Status_Code_API_7: number | null = null;
    response_Status_Code_API_8: number | null = null;
    response_Status_Code_API_9: number | null = null;
    response_Status_Code_API_10: number | null = null;
    response_Status_Code_API_11: number | null = null;
    response_Status_Code_API_12: number | null = null;
    response_Status_Code_API_13: number | null = null;
    response_Status_Code_API_14: number | null = null;
    response_Status_Code_API_15: number | null = null;
    response_Status_Code_API_16: number | null = null;
    response_Status_Code_API_17: number | null = null;

    static parsePracticePerson(responseBody: string): AppointmentPracticePersonModel[] {
        const parsed = JSON.parse(responseBody);
        return parsed.map((json: any) => AppointmentPracticePersonModel.fromJson(json));
    }

    static parseAppointmentList(responseBody: string): AppointmentListModel[] {
        const parsed = JSON.parse(responseBody);
        return parsed.map((json: any) => AppointmentListModel.fromJson(json));
    }

    static parsePracticeReason(responseBody: string): AppointmentReasonModel[] {
        const parsed = JSON.parse(responseBody);
        return parsed.map((json: any) => AppointmentReasonModel.fromJson(json));
    }

    static parse(responseBody: string): AppointmentBookingAllowModel[] {
        const parsed = JSON.parse(responseBody);
        return parsed.map((json: any) => AppointmentReasonModel.fromJson(json));
    }

    async getLatestAppointmentData(): Promise<void> {
        try {
            const customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID,
                'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/GetUnreadCountByUserId';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_1 = 205;
            } else if (response.status === 200) {
                this.latestAppointmentModel = await LatestAppointmentModel.fromJson(JSON.parse(response.data));
                this.response_Status_Code_API_1 = response.status;
            } else {
                this.maximum_Calling_API_1 = this.maximum_Calling_API_1 + 1;
                if (this.maximum_Calling_API_1 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getLatestAppointmentData();
                    } else {
                        setTimeout(async () => {
                            await this.getLatestAppointmentData();
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_1 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error:', e);
        }
    }

    async getAppointmentList(apptType: string): Promise<void> {
        try {
            const customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
                'ApptType': apptType,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PortalAppointment/GetApptDetailsForPatientPortal';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_2 = 205;
            } else if (response.status === 200) {
                this.appointmentList = await AppointmentService.parseAppointmentList(response.data);
                this.response_Status_Code_API_2 = response.status;
            } else {
                this.maximum_Calling_API_2 = this.maximum_Calling_API_2 + 1;
                if (this.maximum_Calling_API_2 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getAppointmentList(apptType);
                    } else {
                        setTimeout(async () => {
                            await this.getAppointmentList(apptType);
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

    async getPastAppointmentListByDates(
        startDate: string,
        endDate: string,
        pageNumber: number
    ): Promise<void> {
        try {
            const customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
                'ApptType': "Past",
                'PageNumber': pageNumber.toString(),
                'RecordsPerPage': '10',
                'StartDate': startDate,
                'EndDate': endDate,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PortalAppointment/GetApptDetailsForPatientPortal';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_3 = 205;
            } else if (response.status === 200) {
                this.selectiveAppointmentList = AppointmentService.parseAppointmentList(response.data);
                this.response_Status_Code_API_3 = response.status;
            } else {
                this.maximum_Calling_API_3 = this.maximum_Calling_API_3 + 1;
                if (this.maximum_Calling_API_3 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getPastAppointmentListByDates(startDate, endDate, pageNumber);
                    } else {
                        setTimeout(async () => {
                            await this.getPastAppointmentListByDates(startDate, endDate, pageNumber);
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

    async getAppointmentLocation(): Promise<void> {
        try {
            const customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                // 'Callfrom': 'PP'
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PracticeDetails/GetPractiseDetails';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_4 = 205;
            } else if (response.status === 200) {
                this.newCompanyDataResponse = NewCompanyDataResponse.fromJson(JSON.parse(response.data));
                this.locationData = this.newCompanyDataResponse?.locations || [];
                this.response_Status_Code_API_4 = response.status;
            } else {
                this.maximum_Calling_API_4 = this.maximum_Calling_API_4 + 1;
                if (this.maximum_Calling_API_4 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getAppointmentLocation();
                    } else {
                        setTimeout(async () => {
                            await this.getAppointmentLocation();
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

    async getPracticePerson(locationId: number): Promise<void> {
        try {
            const customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'LocationId': locationId.toString(),
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/Dropdown/GetPracticePerson';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_5 = 205;
            } else if (response.status === 200) {
                this.practicePersonData = AppointmentService.parsePracticePerson(response.data);
                this.response_Status_Code_API_5 = response.status;
            } else {
                this.maximum_Calling_API_5 = this.maximum_Calling_API_5 + 1;
                if (this.maximum_Calling_API_5 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getPracticePerson(locationId);
                    } else {
                        setTimeout(async () => {
                            await this.getPracticePerson(locationId);
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

    async getAppointmentReason(): Promise<void> {
        try {
            const customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/Dropdown/GetAppointmentReasonsList';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_6 = 205;
            } else if (response.status === 200) {
                this.reasonData = AppointmentService.parsePracticeReason(response.data);
                this.response_Status_Code_API_6 = response.status;
            } else {
                this.maximum_Calling_API_6 = this.maximum_Calling_API_6 + 1;
                if (this.maximum_Calling_API_6 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getAppointmentReason();
                    } else {
                        setTimeout(async () => {
                            await this.getAppointmentReason();
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_6 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }

    async cancelAppointment(appointmentId: number): Promise<void> {
        try {
            const customerData = {
                'appointmentId': appointmentId.toString(),
                'CallFrom': "PP",
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/Appointment/CancelAppointment';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
                dataModel: null
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_7 = 205;
            } else if (response.status === 200) {
                this.cancelAppointmentResponse = response.data;
                this.response_Status_Code_API_7 = response.status;
            } else {
                this.maximum_Calling_API_7 = this.maximum_Calling_API_7 + 1;
                if (this.maximum_Calling_API_7 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.cancelAppointment(appointmentId);
                    } else {
                        setTimeout(async () => {
                            await this.cancelAppointment(appointmentId);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_7 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }

    async validateRescheduleAppointmentPermission(appointmentId: number): Promise<void> {
        try {
            const customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'PatientScheduleId': appointmentId.toString(),
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PortalAppointment/ValidatePermissionForNewCancelRescheduleAppointment';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_8 = 205;
            } else if (response.status === 200) {
                this.validatePermissionForAppointment = ValidatePermissionForAppointment.fromJson(
                    JSON.parse(response.data)
                );
                this.response_Status_Code_API_8 = response.status;
            } else {
                this.maximum_Calling_API_8 = this.maximum_Calling_API_8 + 1;
                if (this.maximum_Calling_API_8 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.validateRescheduleAppointmentPermission(appointmentId);
                    } else {
                        setTimeout(async () => {
                            await this.validateRescheduleAppointmentPermission(appointmentId);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_8 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }

    async validateAppointmentForDailyCountLimit({
        isReschedule,
        appointmentId,
        appointmentDate
    }: {
        isReschedule?: boolean;
        appointmentId?: number;
        appointmentDate?: string;
    }): Promise<void> {
        try {
            let customerData: { [key: string]: string };

            if (isReschedule!) {
                customerData = {
                    'PracticeName': GlobalParams.PRACTICE_NAME,
                    'PatientScheduleId': appointmentId!.toString(),
                    'UserId': GlobalParams.USER_ID,
                    'SwitchUserId': GlobalParams.SWITCH_USER_ID,
                    'AppointmentDate': appointmentDate!,
                };
            } else {
                customerData = {
                    'PracticeName': GlobalParams.PRACTICE_NAME,
                    'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
                    'UserId': GlobalParams.USER_ID,
                    'SwitchUserId': GlobalParams.SWITCH_USER_ID,
                    'AppointmentDate': appointmentDate!,
                };
            }

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PortalAppointment/PtPortalValidateAppointmentForDailyLimitCount';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_9 = 205;
            } else if (response.status === 200) {
                this.validatePermissionForAppointment = ValidatePermissionForAppointment.fromJson(
                    JSON.parse(response.data)
                );
                this.response_Status_Code_API_9 = response.status;
            } else {
                this.maximum_Calling_API_9 = this.maximum_Calling_API_9 + 1;
                if (this.maximum_Calling_API_9 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.validateAppointmentForDailyCountLimit({
                            isReschedule: isReschedule,
                            appointmentId: appointmentId,
                            appointmentDate: appointmentDate,
                        });
                    } else {
                        setTimeout(async () => {
                            await this.validateAppointmentForDailyCountLimit({
                                isReschedule: isReschedule,
                                appointmentId: appointmentId,
                                appointmentDate: appointmentDate,
                            });
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_9 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }

    async updateAppointmentMarkArrivedInMax(appointmentId: number): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'PatientScheduleId': appointmentId.toString(),
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PortalAppointment/UpdateAppointmentMarkArrivedInMax';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
                dataModel: null
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_10 = 205;
            } else if (response.status === 200) {
                this.markArrivedInMaxResponse = response.data;
                this.response_Status_Code_API_10 = response.status;
            } else {
                this.maximum_Calling_API_10 = this.maximum_Calling_API_10 + 1;
                if (this.maximum_Calling_API_10 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.updateAppointmentMarkArrivedInMax(appointmentId);
                    } else {
                        setTimeout(async () => {
                            await this.updateAppointmentMarkArrivedInMax(appointmentId);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_10 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }

    async confirmAppointment(appointmentId: number): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'appointmentId': appointmentId.toString(),
                'CallFrom': "PP",
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/Appointment/ConfirmAppointment';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
                dataModel: null
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_11 = 205;
            } else if (response.status === 200) {
                this.confirmAppointmentResponse = response.data;
                this.response_Status_Code_API_11 = response.status;
            } else {
                this.maximum_Calling_API_11 = this.maximum_Calling_API_11 + 1;
                if (this.maximum_Calling_API_11 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.confirmAppointment(appointmentId);
                    } else {
                        setTimeout(async () => {
                            await this.confirmAppointment(appointmentId);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_11 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }

    async visitSummary(encounterId: string): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'EncounterId': encounterId,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/GetPatientSOC';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_12 = 205;
            } else if (response.status === 200) {
                this.visitSummaryModel = VisitSummaryModel.fromJson(
                    JSON.parse(response.data)
                );
                this.response_Status_Code_API_12 = response.status;
            } else {
                this.maximum_Calling_API_12 = this.maximum_Calling_API_12 + 1;
                if (this.maximum_Calling_API_12 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.visitSummary(encounterId);
                    } else {
                        setTimeout(async () => {
                            await this.visitSummary(encounterId);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_12 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }

    async getAppointmentDetailsByAppointmentId(id: number): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'PatientScheduleId': id.toString(),
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PortalAppointment/GetAppointmentByPatientScheduleID';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_13 = 205;
            } else if (response.status === 200) {
                this.existingAppointmentData = ExistingAppointmentData.fromJson(
                    JSON.parse(response.data)
                );
                this.response_Status_Code_API_13 = response.status;
            } else {
                this.maximum_Calling_API_13 = this.maximum_Calling_API_13 + 1;
                if (this.maximum_Calling_API_13 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getAppointmentDetailsByAppointmentId(id);
                    } else {
                        setTimeout(async () => {
                            await this.getAppointmentDetailsByAppointmentId(id);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_13 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }

    async checkSlotIsAvailableOrNot(slotId: number, dateAndTime: string): Promise<void> {
        try {
            const appointmentDate = dateAndTime.substring(0, 10);

            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'OpenSlotId': slotId.toString(),
                'AppointmentDate': appointmentDate,
                'CallFrom': "PP",
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/Appointment/AppointmentSlotIsBookedOrBlocked';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_14 = 205;
            } else if (response.status === 200) {
                this.isSlotAvailable = response.data;
                this.response_Status_Code_API_14 = response.status;
            } else {
                this.maximum_Calling_API_14 = this.maximum_Calling_API_14 + 1;
                if (this.maximum_Calling_API_14 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.checkSlotIsAvailableOrNot(slotId, dateAndTime);
                    } else {
                        setTimeout(async () => {
                            await this.checkSlotIsAvailableOrNot(slotId, dateAndTime);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_14 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error slot availability ::', e);
        }
    }

    async blockSlotForAppointment(slotId: string, dateAndTime: string): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'openslotid': slotId,
                'appointmentDate': dateAndTime,
                'callfrom': "PP",
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/Appointment/InsertOfficeHourWizardTemplateRealsvsOpenSlot';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
                dataModel: null
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_15 = 205;
            } else if (response.status === 200) {
                this.slotResponse = response.data;
                this.response_Status_Code_API_15 = response.status;
            } else {
                this.maximum_Calling_API_15 = this.maximum_Calling_API_15 + 1;
                if (this.maximum_Calling_API_15 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.blockSlotForAppointment(slotId, dateAndTime);
                    } else {
                        setTimeout(async () => {
                            await this.blockSlotForAppointment(slotId, dateAndTime);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_15 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error slot availability ::', e);
        }
    }

    async checkAppointmentBookingAllow(appointmentDataPass: AppointmentDataPass): Promise<void> {
        try {
            const newFormat = 'MM/dd/yyyy';

            const customerData = {
                "patientNumber": GlobalParams.MAXIMEYES_PATIENT_NUMBER,
                "appDate": format(
                    new Date(appointmentDataPass.slotTime!.apptStartDateTime!),
                    newFormat
                ),
                "callFrom": "PP",
                "apptScheduleId": appointmentDataPass.apptId === 0
                    ? ""
                    : appointmentDataPass.apptId!.toString(),
            };

            const url = ApiPath.baseApi +
                `api/Appointment/GetOnlineLimitAppointmentCount?Practice_Name=${GlobalParams.PRACTICE_NAME}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: customerData
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_16 = 205;
            } else if (response.status === 200) {
                this.appointmentBookingAllowModel =
                    AppointmentBookingAllowModel.fromJson(response.data);
                this.response_Status_Code_API_16 = response.status;
            } else {
                this.maximum_Calling_API_16 = this.maximum_Calling_API_16 + 1;
                if (this.maximum_Calling_API_16 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.checkAppointmentBookingAllow(appointmentDataPass);
                    } else {
                        setTimeout(async () => {
                            await this.checkAppointmentBookingAllow(appointmentDataPass);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_16 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error on appointment count ::', e);
        }
    }

    async appointmentBooking(appointmentDataPass: AppointmentDataPass): Promise<void> {
        try {
            const newFormat = 'MM/dd/yyyy';
            const customerData = {
                "OpenSlotId": appointmentDataPass.slotTime!.id,
                "ApptDate": format(
                    new Date(appointmentDataPass.slotTime!.apptStartDateTime!),
                    newFormat
                ),
                "ReasonId": appointmentDataPass.reasonId,
                "PatientNumber": GlobalParams.MAXIMEYES_PATIENT_NUMBER,
                "Notes": "",
                "ReasonofVisitDetails": appointmentDataPass.reasonForVisit,
                "ReschedulePatientScheduleId": appointmentDataPass.apptId,
                "callFrom": "PP",
                "UserId": GlobalParams.USER_ID,
                "SwitchUserId": GlobalParams.SWITCH_USER_ID,
                "LocationId": appointmentDataPass.locationId,
                "ResourceId": appointmentDataPass.slotTime!.providerId,
            };

            const url = ApiPath.baseApi + 'api/Appointment/OnlineScheduling';

            const response = await baseWebService.postWebAPI({
                requestUrl: url,
                dataModel: customerData
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_17 = 205;
            } else if (response.status === 200) {
                this.isAppointmentBooked = response.data;
                this.response_Status_Code_API_17 = response.status;
            } else {
                this.maximum_Calling_API_17 = this.maximum_Calling_API_17 + 1;
                if (this.maximum_Calling_API_17 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.appointmentBooking(appointmentDataPass);
                    } else {
                        setTimeout(async () => {
                            await this.appointmentBooking(appointmentDataPass);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_17 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error slot booking error ::', e);
        }
    }

    async addToWaitList(
        appointmentDataPass: AppointmentDataPass,
        selectedDate: string,
        note: string,
        timeList: Array<{ [key: string]: any }>
    ): Promise<void> {
        try {
            const bodyParam: { [key: string]: any } = {
                "patientWaitListId": "0",
                "userId": GlobalParams.USER_ID,
                "maximeyesPatientNumber": GlobalParams.MAXIMEYES_PATIENT_NUMBER,
                "locationId": appointmentDataPass.locationId!.toString(),
                "resourceId": appointmentDataPass.reasonId!.toString(),
                "reasonId": appointmentDataPass.reasonId!.toString(),
                "removeDateFromWaitList": selectedDate,
                "notes": note,
                "chiefComplaint": "",
                "lstWeekDaysAvailability": timeList,
            };

            const queryParams = { PracticeName: GlobalParams.PRACTICE_NAME };
            const queryString = new URLSearchParams(queryParams).toString();

            const url = ApiPath.baseApi + 'api/Appointment/InsertPatientPortalWaitListData';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
                dataModel: bodyParam,
            });

            if (response.status === 200) {
                // Success case - empty implementation as in original
            } else {
                // Error case - empty implementation as in original
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }
}