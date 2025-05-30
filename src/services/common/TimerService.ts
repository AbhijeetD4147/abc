import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from './BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

class SessionTimerUpdateService {
    maximum_Calling_API: number = 0;
    response_Status_Code_API?: number;
    sessionActive?: string;

    async updateSessionTime(): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'SessionGuid': GlobalParams.SESSION_GUID
            };
            
            const url = `${ApiPath.baseApi}api/PatientPortal/UpdateSessionStatus`;
            const queryString = new URLSearchParams(customerData).toString();
            const requestUrl = `${url}?${queryString}`;

            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
                dataModel: {},
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200) {
                this.sessionActive = response.data;
                this.response_Status_Code_API = response.status;
            } else {
                this.maximum_Calling_API = this.maximum_Calling_API + 1;
                if (this.maximum_Calling_API < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.updateSessionTime();
                    } else {
                        setTimeout(async () => {
                            await this.updateSessionTime();
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

export default SessionTimerUpdateService;