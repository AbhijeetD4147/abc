import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

class WebUrlGet {
    formType: string;
    maximeyesLocationId: any;
    formArray: string[] = [];
    maximum_Calling_API: number = 0;
    response_Status_Code_API?: number;

    constructor(formType: string, maximeyesLocationId: any) {
        this.formType = formType;
        this.maximeyesLocationId = maximeyesLocationId;
    }

    async getUrl(): Promise<void> {
        try {
            const hipaaCustomerData: { [key: string]: string } = {
                'welcomeformAccountID': GlobalParams.PRACTICE_NAME,
                'ptCusomterID': GlobalParams.PT_CUSTOMER_ID,
                'formType': this.formType,
                'MaximeyesLocationID': this.maximeyesLocationId.toString(),
            };
            
            ApiPath.isIntakeFormFlow = true;
            const queryString = new URLSearchParams(hipaaCustomerData).toString();
            const url = `${ApiPath.baseApi}api/Home/getPatientWelcomeform`;
            const requestUrl = `${url}?${queryString}`;
            
            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl
            });

            if (response.status === 200) {
                const responseBody = response.data;
                if (responseBody === "SESSION INVALID") {
                    this.response_Status_Code_API = 205;
                } else {
                    const forms = responseBody;
                    const newFormsList = forms.substring(1, forms.length - 1);
                    if (newFormsList.length === 0) {
                        this.formArray = [];
                    } else {
                        this.formArray = newFormsList.split(",");
                    }
                    this.response_Status_Code_API = response.status;
                }
            } else {
                this.maximum_Calling_API = this.maximum_Calling_API + 1;
                if (this.maximum_Calling_API < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getUrl();
                    } else {
                        setTimeout(async () => {
                            await this.getUrl();
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API = response.status;
                }
            }
        } catch (e) {
            console.error(`caught error :: ${e}`);
        }
    }
}

export default WebUrlGet;