import { HomeDataModel } from '../../model/home/HomeModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

class HomeService {
    homeDataModel?: HomeDataModel[];
    maximum_Calling_API: number = 0;
    response_Status_Code_API?: number;

    async getHomeData(pageName: string): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'CallFrom': pageName,
            };
            
            const queryString = new URLSearchParams(customerData).toString();
            const url = `${ApiPath.baseApi}api/PatientPortal/PatientPortalHomePageOptionsList`;
            const requestUrl = `${url}?${queryString}`;
            
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200) {
                this.response_Status_Code_API = response.status;
                const responseBody = response.data;
                this.homeDataModel = this.parse(responseBody);
                if (this.homeDataModel && this.homeDataModel.length > 0 && this.homeDataModel[0].logo) {
                    GlobalParams.LOGO = this.homeDataModel[0].logo;
                }
            } else {
                this.maximum_Calling_API = this.maximum_Calling_API + 1;
                if (this.maximum_Calling_API < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getHomeData(pageName);
                    } else {
                        setTimeout(async () => {
                            await this.getHomeData(pageName);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API = response.status;
                }
            }
        } catch (e) {
            console.error(`caught error : ${e}`);
        }
    }

    parse(responseBody: any): HomeDataModel[] {
        const parsed = responseBody;
        return parsed.map((json: any) => new HomeDataModel(json));
    }
}

export default HomeService;