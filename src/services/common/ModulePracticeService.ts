import { ModulePermissionByPracticeModel } from '../../model/common/ModulePermissionModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from './BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

class GetModulePermissionByPracticeServices {
    private modulePermissionByPracticeModel?: ModulePermissionByPracticeModel;
    private maximum_Calling_API: number = 0;
    private response_Status_Code_API?: number;

    async getModulePermission(): Promise<void> {
        try {
            const customerData: Record<string, string> = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
            };
            const url = `${ApiPath.baseApi}IsUrlExist`;
            const queryString = new URLSearchParams(customerData).toString();

            const requestUrl = `${url}?${queryString}`;
            const response = await  baseWebService.postWebAPI({
                requestUrl: requestUrl,
                dataModel: null,
            });

            if (response.status === 200) {
                const responseData = response.data;
                this.modulePermissionByPracticeModel = 
                    ModulePermissionByPracticeModel.fromJson(responseData);
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

    // Getter methods for accessing private properties
    getModulePermissionByPracticeModel(): ModulePermissionByPracticeModel | undefined {
        return this.modulePermissionByPracticeModel;
    }

    getResponse_Status_Code_API(): number | undefined {
        return this.response_Status_Code_API;
    }

    getMaximum_Calling_API(): number {
        return this.maximum_Calling_API;
    }
}

export default GetModulePermissionByPracticeServices;