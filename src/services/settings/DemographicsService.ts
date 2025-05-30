import { DemographicModel, DropdownPersonalDetailModel, CountryModel, StateModel } from '../../model/settings/DemographicModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

export class DemographicsService {
    demographicsData?: DemographicModel[];
    updateDemographicsApiResponse?: string;
    deleteDemographicsAddressApiResponse?: string;
    titleModel: DropdownPersonalDetailModel[] = [];
    countryModelList: CountryModel[] = [];
    stateModelList: StateModel[] = [];
    customerData?: { [key: string]: string };

    maximum_Calling_API_1: number = 0;
    maximum_Calling_API_2: number = 0;
    maximum_Calling_API_3: number = 0;
    maximum_Calling_API_4: number = 0;
    maximum_Calling_API_5: number = 0;
    maximum_Calling_API_6: number = 0;
    response_Status_Code_API_1?: number;
    response_Status_Code_API_2?: number;
    response_Status_Code_API_3?: number;
    response_Status_Code_API_4?: number;
    response_Status_Code_API_5?: number;
    response_Status_Code_API_6?: number;

    private parseDropdownPersonalDetailModel(responseBody: string): DropdownPersonalDetailModel[] {
        try {
            const parsed = JSON.parse(responseBody);
            return parsed.map((json: any) => new DropdownPersonalDetailModel(json));
        } catch (error) {
            console.error('Error parsing dropdown personal detail model:', error);
            return [];
        }
    }

    private parseCountryModel(responseBody: string): CountryModel[] {
        try {
            const parsed = JSON.parse(responseBody);
            return parsed.map((json: any) => new CountryModel(json));
        } catch (error) {
            console.error('Error parsing country model:', error);
            return [];
        }
    }

    private parseStateModel(responseBody: string): StateModel[] {
        try {
            const parsed = JSON.parse(responseBody);
            return parsed.map((json: any) => new StateModel(json));
        } catch (error) {
            console.error('Error parsing state model:', error);
            return [];
        }
    }

    private parseDemographics(responseBody: string): DemographicModel[] {
        try {
            const parsed = JSON.parse(responseBody);
            return parsed.map((json: any) => new DemographicModel(json));
        } catch (error) {
            console.error('Error parsing demographics:', error);
            return [];
        }
    }

    async getDemographicsData(): Promise<void> {
        try {
            this.customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
            };

            const queryString = new URLSearchParams(this.customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/GetPatientDemographics';
            const requestUrl = url + '?' + queryString;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_1 = 205;
            } else if (response.status === 200) {
                this.demographicsData = this.parseDemographics(response.data);
                this.response_Status_Code_API_1 = response.status;
            } else {
                this.maximum_Calling_API_1 = this.maximum_Calling_API_1 + 1;
                if (this.maximum_Calling_API_1 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getDemographicsData();
                    } else {
                        setTimeout(async () => {
                            await this.getDemographicsData();
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_1 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }

    async getDropdownData(dropdownMenu?: string): Promise<void> {
        this.titleModel = [];
        try {
            if (dropdownMenu === "Title") {
                this.customerData = {
                    'PracticeName': GlobalParams.PRACTICE_NAME,
                    'ValueListName': 'Salutations',
                    'ValueListInternalName': 'Salutations',
                };
            } else {
                this.customerData = {
                    'PracticeName': GlobalParams.PRACTICE_NAME,
                    'ValueListName': 'suffix',
                    'ValueListInternalName': 'suffix',
                };
            }
            
            const queryString = new URLSearchParams(this.customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/GetValueListsForPatientPortal';
            const requestUrl = url + '?' + queryString;
            
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
    
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_2 = 205;
            } else if (response.status === 200) {
                this.titleModel = this.parseDropdownPersonalDetailModel(response.data);
                this.response_Status_Code_API_2 = response.status;
            } else {
                this.maximum_Calling_API_2 = this.maximum_Calling_API_2 + 1;
                if (this.maximum_Calling_API_2 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getDropdownData(dropdownMenu);
                    } else {
                        setTimeout(async () => {
                            await this.getDropdownData(dropdownMenu);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_2 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }

    async getCountryDropdownData(): Promise<void> {
        this.countryModelList = [];
        try {
            this.customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
            };
            
            const queryString = new URLSearchParams(this.customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/GetZipCodesCountries';
            const requestUrl = url + '?' + queryString;
            
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
    
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_3 = 205;
            } else if (response.status === 200) {
                this.countryModelList = this.parseCountryModel(response.data);
                this.response_Status_Code_API_3 = response.status;
            } else {
                this.maximum_Calling_API_3 = this.maximum_Calling_API_3 + 1;
                if (this.maximum_Calling_API_3 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getCountryDropdownData();
                    } else {
                        setTimeout(async () => {
                            await this.getCountryDropdownData();
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_3 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error ::', e);
        }
    }

    async getStateDropdownData(countryCodeValue?: string): Promise<void> {
        this.stateModelList = [];
        try {
            if (!countryCodeValue) {
                throw new Error('Country code value is required');
            }
            
            this.customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'CountryCode': countryCodeValue,
            };
            
            const queryString = new URLSearchParams(this.customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/GetZipCodesStates';
            const requestUrl = url + '?' + queryString;
            
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
    
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_4 = 205;
            } else if (response.status === 200) {
                this.stateModelList = this.parseStateModel(response.data);
                this.response_Status_Code_API_4 = response.status;
            } else {
                this.maximum_Calling_API_4 = this.maximum_Calling_API_4 + 1;
                if (this.maximum_Calling_API_4 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getStateDropdownData(countryCodeValue);
                    } else {
                        setTimeout(async () => {
                            await this.getStateDropdownData(countryCodeValue);
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

    async deleteDemographicsAddress(addressId: number): Promise<void> {
        try {
            this.customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'addressid': addressId.toString(),
            };
            
            const queryString = new URLSearchParams(this.customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/DeleteAddressForPatientDemographics';
            const requestUrl = url + '?' + queryString;
            
            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
            });
    
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_5 = 205;
            } else if (response.status === 200) {
                this.deleteDemographicsAddressApiResponse = response.data;
                this.response_Status_Code_API_5 = response.status;
            } else {
                this.maximum_Calling_API_5 = this.maximum_Calling_API_5 + 1;
                if (this.maximum_Calling_API_5 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.deleteDemographicsAddress(addressId);
                    } else {
                        setTimeout(async () => {
                            await this.deleteDemographicsAddress(addressId);
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

    async updateDemographicsData(demographicModel: any): Promise<void> {
        try {
            this.customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
                'CallFrom': 'PP',
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };
    
            const queryString = new URLSearchParams(this.customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/InsertUpdatePatientDemographics';
            const requestUrl = url + '?' + queryString;
    
            const response = await baseWebService.postWebAPI({
                dataModel: demographicModel,
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
    
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_6 = 205;
            } else if (response.status === 200) {
                this.updateDemographicsApiResponse = response.data;
                this.response_Status_Code_API_6 = response.status;
            } else {
                this.maximum_Calling_API_6 = this.maximum_Calling_API_6 + 1;
                if (this.maximum_Calling_API_6 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.updateDemographicsData(demographicModel);
                    } else {
                        setTimeout(async () => {
                            await this.updateDemographicsData(demographicModel);
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
}