import { UserInfoResponseModel } from '../../model/settings/InsuranceModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

export class GetUserDetailServices {
  userInfoResponseModel: UserInfoResponseModel | null = null;
  maximum_Calling_API: number = 0;
  response_Status_Code_API: number | null = null;

  async getUserInfo(): Promise<void> {
    try {
      const customerData: { [key: string]: string } = {
        'PracticeName': GlobalParams.PRACTICE_NAME,
        'PatientId': GlobalParams.PT_CUSTOMER_ID,
        'CallFrom': "PP",
        'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
      };
      
      const queryString = new URLSearchParams(customerData).toString();
      const url = ApiPath.baseApi + 'api/Home/getpatientdetails';
      const requestUrl = url + '?' + queryString;
      
      const response = await baseWebService.getWebAPI({
        requestUrl: requestUrl,
        token: GlobalParams.TOKEN,
        practiceName: GlobalParams.PRACTICE_NAME
      });

      if (response.status === 200 && response.data === "SESSION INVALID") {
        this.response_Status_Code_API = 205;
      } else if (response.status === 200) {
        this.userInfoResponseModel = UserInfoResponseModel.fromJson(JSON.parse(response.data));
        this.response_Status_Code_API = response.status;
      } else {
        this.maximum_Calling_API = this.maximum_Calling_API + 1;
        if (this.maximum_Calling_API < ApiPath.MaxAPICalling) {
          if (response.status === 401) {
            await AuthenticationService.generateToken();
            await this.getUserInfo();
          } else {
            setTimeout(async () => {
              await this.getUserInfo();
            }, 1000);
          }
        } else {
          this.response_Status_Code_API = response.status;
        }
      }
    } catch (e) {
      console.error('caught error :', e);
    }
  }
}