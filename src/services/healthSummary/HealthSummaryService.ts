import { HealthSummaryThreadModel, HealthSummaryListModel } from '../../model/health_summary/HealthSummaryModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';
import { HealthSummaryXMLParser, ParsedHealthSummary } from '../../utils/HealthSummaryXMLParser';

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
        try {
            // Log the response for debugging
            console.log('Response body:', responseBody);
            
            // Handle both string and object responses
            const parsed = typeof responseBody === 'string' ? JSON.parse(responseBody) : responseBody;
            
            // Ensure we're working with an array
            const dataArray = Array.isArray(parsed) ? parsed : [parsed];
            
            // Map to model objects
            return dataArray.map((json: any) => new HealthSummaryListModel(json));
        } catch (error) {
            console.error('Error parsing health summary list:', error);
            return [];
        }
    }

    async getHealthSummaryList(
        pageNo: number,
        fromDate: string,
        endDate: string
    ): Promise<HealthSummaryListModel[] | null> {
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
            
            console.log('Requesting URL:', requestUrl); // Add for debugging
            
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
            
            console.log('Response status:', response.status); // Add for debugging
            console.log('Response data:', response.data); // Add for debugging
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_1 = 205;
                return null;
            } else if (response.status === 200) {
                const list = this.parseHealthSummaryList(response.data);
                this.healthSummaryListModel = list;
                this.response_Status_Code_API_1 = response.status;
                return list;
            } else {
                this.maximum_Calling_API_1 = this.maximum_Calling_API_1 + 1;
                if (this.maximum_Calling_API_1 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        return await this.getHealthSummaryList(pageNo, fromDate, endDate);
                    } else {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        return await this.getHealthSummaryList(pageNo, fromDate, endDate);
                    }
                } else {
                    this.response_Status_Code_API_1 = response.status;
                    return null;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
            return null;
        }
    }

    /**
     * Parse the XML content from summaryData field
     * @param summaryData - XML/HTML content from backend
     * @returns Parsed health summary object
     */
    parseHealthSummaryXML(summaryData: string): ParsedHealthSummary | null {
        return HealthSummaryXMLParser.parseHealthSummaryXML(summaryData);
    }

    /**
     * Get formatted plain text from XML content
     * @param summaryData - XML/HTML content from backend
     * @returns Plain text content
     */
    getPlainTextSummary(summaryData: string): string {
        return HealthSummaryXMLParser.extractPlainText(summaryData);
    }

    async getHealthSummaryThread(id: number): Promise<HealthSummaryThreadModel | null> {
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
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_2 = 205;
                return null;
            } else if (response.status === 200) {
                // Use fromJson() method instead of constructor to handle the API typo
                const threadModel = HealthSummaryThreadModel.fromJson(response.data);
                
                // Parse the XML content if available
                if (threadModel.summaryData) {
                    const parsedSummary = this.parseHealthSummaryXML(threadModel.summaryData);
                    // You can store the parsed data in the model or use it separately
                    console.log('Parsed health summary:', parsedSummary);
                }
                
                this.healthSummaryThreadModel = threadModel;
                this.response_Status_Code_API_2 = response.status;
                return threadModel;
            } else {
                this.maximum_Calling_API_2 = this.maximum_Calling_API_2 + 1;
                if (this.maximum_Calling_API_2 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        return await this.getHealthSummaryThread(id);
                    } else {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        return await this.getHealthSummaryThread(id);
                    }
                } else {
                    this.response_Status_Code_API_2 = response.status;
                    return null;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
            return null;
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