import { HealthSummaryThreadModel, HealthSummaryListModel } from '../../model/health_summary/HealthSummaryModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

export class HealthSummaryService {
    private healthSummaryThreadModel: HealthSummaryThreadModel | null = null;
    private healthSummaryListModel: HealthSummaryListModel[] | null = null;
    private data: Record<string, any> = {};
    private url: string = "";
    private maximum_Calling_API_1: number = 0;
    private maximum_Calling_API_2: number = 0;
    private maximum_Calling_API_3: number = 0;
    private response_Status_Code_API_1: number | null = null;
    private response_Status_Code_API_2: number | null = null;
    private response_Status_Code_API_3: number | null = null;

    parseHealthSummaryList(responseBody: string): HealthSummaryListModel[] {
        const parsed = JSON.parse(responseBody);
        return parsed.map((json: any) => new HealthSummaryListModel(json));
    }

    async getHealthSummaryList(
        pageNo: number,
        fromDate: string,
        endDate: string
    ): Promise<void> {
        try {
            this.data = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'OwnerType': "Patient",
                'OwnerId': GlobalParams.USER_ID,
                'PageNo': pageNo.toString(),
                'RecordsPerPage': '10',
                'FromDate': fromDate,
                'EndDate': endDate,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };
            
            this.url = ApiPath.baseApi + 'api/PatientPortal/GetPatientHealthSummaryList';
            
            const queryString = new URLSearchParams(this.data).toString();
            const requestUrl = this.url + '?' + queryString;
            
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_1 = 205;
            } else if (response.status === 200) {
                this.healthSummaryListModel = this.parseHealthSummaryList(response.data);
                this.response_Status_Code_API_1 = response.status;
            } else {
                this.maximum_Calling_API_1 = this.maximum_Calling_API_1 + 1;
                if (this.maximum_Calling_API_1 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getHealthSummaryList(pageNo, fromDate, endDate);
                    } else {
                        setTimeout(async () => {
                            await this.getHealthSummaryList(pageNo, fromDate, endDate);
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

    async getHealthSummaryThread(id: number): Promise<void> {
        try {
            this.data = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'HealthSummaryId': id.toString(),
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };
            
            const queryString = new URLSearchParams(this.data).toString();
            
            this.url = ApiPath.baseApi + 'api/PatientPortal/GetPatientHealthSummaryById';
            const requestUrl = this.url + '?' + queryString;
            
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_2 = 205;
            } else if (response.status === 200) {
                this.healthSummaryThreadModel = new HealthSummaryThreadModel(JSON.parse(response.data));
                this.response_Status_Code_API_2 = response.status;
            } else {
                this.maximum_Calling_API_2 = this.maximum_Calling_API_2 + 1;
                if (this.maximum_Calling_API_2 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getHealthSummaryThread(id);
                    } else {
                        setTimeout(async () => {
                            await this.getHealthSummaryThread(id);
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

    async transmitHealthSummary(healthSummaryTransmitModel: any): Promise<void> {
        try {
            const customerData: Record<string, string> = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };
            
            const queryString = new URLSearchParams(customerData).toString();
            
            const url = ApiPath.baseApi + 'api/PatientPortal/ForwardPatientMessage';
            const requestUrl = url + '?' + queryString;
            
            const response = await baseWebService.postWebAPI({
                dataModel: healthSummaryTransmitModel,
                requestUrl: requestUrl,
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_3 = 205;
            } else if (response.status === 200) {
                this.response_Status_Code_API_3 = response.status;
            } else {
                this.maximum_Calling_API_3 = this.maximum_Calling_API_3 + 1;
                if (this.maximum_Calling_API_3 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.transmitHealthSummary(healthSummaryTransmitModel);
                    } else {
                        setTimeout(async () => {
                            await this.transmitHealthSummary(healthSummaryTransmitModel);
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
}