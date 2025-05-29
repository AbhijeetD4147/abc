import { BillingHomeModel, InvoiceDetailModel, LstBillingInvoiceModel, LstBillingPaymentsModel } from '../../model/billing/BillingHomeModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

export class BillingService {
    billingHomeModel?: BillingHomeModel;
    invoiceDetailModel?: InvoiceDetailModel;
    invoiceList?: LstBillingInvoiceModel[];
    paymentList?: LstBillingPaymentsModel[];
    maximum_Calling_API_1: number = 0;
    maximum_Calling_API_2: number = 0;
    maximum_Calling_API_3: number = 0;
    maximum_Calling_API_4: number = 0;
    response_Status_Code_API_1?: number;
    response_Status_Code_API_2?: number;
    response_Status_Code_API_3?: number;
    response_Status_Code_API_4?: number;

    static parseInvoiceList(responseBody: string): LstBillingInvoiceModel[] {
        const parsed = JSON.parse(responseBody);
        return parsed.map((json: any) => LstBillingInvoiceModel.fromJson(json));
    }

    static parsePaymentList(responseBody: string): LstBillingPaymentsModel[] {
        const parsed = JSON.parse(responseBody);
        return parsed.map((json: any) => LstBillingPaymentsModel.fromJson(json));
    }

    async getHomeData(): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
            };
    
            const queryParams = new URLSearchParams(customerData);
            const queryString = queryParams.toString();
            const url = ApiPath.baseApi + 'api/BillingPortal/GetBillingHomePageData';
            const requestUrl = url + '?' + queryString;
    
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
    
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_1 = 205;
            } else if (response.status === 200) {
                this.response_Status_Code_API_1 = response.status;
                this.billingHomeModel = BillingHomeModel.fromJson(response.data);
            } else {
                this.maximum_Calling_API_1 = this.maximum_Calling_API_1 + 1;
                if (this.maximum_Calling_API_1 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getHomeData();
                    } else {
                        setTimeout(async () => {
                            await this.getHomeData();
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

    async getInvoiceList(pageValue: string): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
                'PageNo': pageValue,
                'RecordsPerPage': "10",
                'StartDate': new Date(2023, 0, 1).toLocaleDateString('en-US'),
                'EndDate': new Date().toLocaleDateString('en-US'),
            };
    
            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/BillingPortal/GetPatientAllInvoices';
    
            const requestUrl = url + '?' + queryString;
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
    
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_2 = 205;
            } else if (response.status === 200) {
                this.response_Status_Code_API_2 = response.status;
                const responseBody = response.data;
                this.invoiceList = BillingService.parseInvoiceList(responseBody);
            } else {
                this.maximum_Calling_API_2 = this.maximum_Calling_API_2 + 1;
                if (this.maximum_Calling_API_2 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getInvoiceList(pageValue);
                    } else {
                        setTimeout(async () => {
                            await this.getInvoiceList(pageValue);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_2 = response.status;
                }
            }
        } catch (e) {
            console.log('caught error:', e);
        }
    }

    async getPaymentList(pageValue: string): Promise<void> {
        try {
            const customerData: Record<string, string> = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
                'PageNo': pageValue,
                'RecordsPerPage': "10",
                'StartDate': new Date(2023, 0, 1).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
                'EndDate': new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
            };
    
            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/BillingPortal/GetPatientAllPayments';
            const requestUrl = `${url}?${queryString}`;
    
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
    
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_3 = 205;
            } else if (response.status === 200) {
                this.response_Status_Code_API_3 = response.status;
                this.paymentList = BillingService.parsePaymentList(response.data);
            } else {
                this.maximum_Calling_API_3 = this.maximum_Calling_API_3 + 1;
                if (this.maximum_Calling_API_3 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getPaymentList(pageValue);
                    } else {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await this.getPaymentList(pageValue);
                    }
                } else {
                    this.response_Status_Code_API_3 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }

    async getInvoiceDetailsByInvoiceId(ledgerId: string): Promise<void> {
        try {
            const customerData: Record<string, string> = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
                'InvoiceDate': new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
                'LedgerId': ledgerId
            };
    
            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/BillingPortal/GetPatientInvoiceDetailsById';
            const requestUrl = `${url}?${queryString}`;
    
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
    
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_4 = 205;
            } else if (response.status === 200) {
                this.response_Status_Code_API_4 = response.status;
                this.invoiceDetailModel = new InvoiceDetailModel(JSON.parse(response.data));
            } else {
                this.maximum_Calling_API_4 = this.maximum_Calling_API_4 + 1;
                if (this.maximum_Calling_API_4 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getInvoiceDetailsByInvoiceId(ledgerId);
                    } else {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await this.getInvoiceDetailsByInvoiceId(ledgerId);
                    }
                } else {
                    this.response_Status_Code_API_4 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }
}