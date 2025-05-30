import { ModulePermissionModel } from '../../model/common/ModuleSettingsPermissionModel';
import { AuthenticationService } from '../authentication/UserService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';
import { baseWebService } from './BaseWebService';

class GetModulePermissionServices {
    modulePermissionModel?: ModulePermissionModel;
    maximum_Calling_API: number = 0;
    response_Status_Code_API?: number;

    async getModulePermission(): Promise<void> {
        try {
            const customerData: Record<string, string> = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
            };
            const url = `${ApiPath.baseApi}api/PatientPortal/GetPortalSettings`;
            const queryString = new URLSearchParams(customerData).toString();

            const requestUrl = `${url}?${queryString}`;

            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });

            


            if (response.status === 200) {
                const responseData = response.data;
                this.modulePermissionModel = ModulePermissionModel.fromJson(responseData);
                this.response_Status_Code_API = response.status;
            } else {
                this.maximum_Calling_API = this.maximum_Calling_API + 1;
                if (this.maximum_Calling_API < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getModulePermission();
                    } else {
                        setTimeout(async () => {
                            await this.getModulePermission();
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

export default GetModulePermissionServices;