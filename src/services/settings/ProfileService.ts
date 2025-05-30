import { ProfileModel } from '../../model/settings/ProfileModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

export class ProfileService {
  profileResponseModel?: ProfileModel;
  maximum_Calling_API_1: number = 0;
  maximum_Calling_API_2: number = 0;
  response_Status_Code_API_1?: number;
  response_Status_Code_API_2?: number;
  customerData?: { [key: string]: string } = {};
  profileResponse: string = "";

  async getProfileDetail(): Promise<void> {
    try {
      if (GlobalParams.USER_TYPE === "Patient") {
        this.customerData = {
          'PracticeName': GlobalParams.PRACTICE_NAME,
          'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
        };
      } else {
        this.customerData = {
          'PracticeName': GlobalParams.PRACTICE_NAME,
          'UserId': GlobalParams.PT_CUSTOMER_ID,
        };
      }
  
      const queryString = new URLSearchParams(this.customerData as { [key: string]: string }).toString();
      const url = ApiPath.baseApi + 'api/PatientPortal/getPatientProfileDetail';
      const requestUrl = url + '?' + queryString;
      
      const response = await baseWebService.getWebAPI({
        requestUrl: requestUrl,
        token: GlobalParams.TOKEN,
        practiceName: GlobalParams.PRACTICE_NAME
      });
      
      if (response.status === 200 && response.data === "SESSION INVALID") {
        this.response_Status_Code_API_1 = 205;
      } else if (response.status === 200) {
        this.profileResponseModel = ProfileModel.fromJson(JSON.parse(response.data));
        this.response_Status_Code_API_1 = response.status;
      } else {
        this.maximum_Calling_API_1 = this.maximum_Calling_API_1 + 1;
        if (this.maximum_Calling_API_1 < ApiPath.MaxAPICalling) {
          if (response.status === 401) {
            await AuthenticationService.generateToken();
            await this.getProfileDetail();
          } else {
            setTimeout(async () => {
              await this.getProfileDetail();
            }, 1000);
          }
        } else {
          this.response_Status_Code_API_1 = response.status;
        }
      }
    } catch (e) {
      console.error('caught error is :', e);
    }
  }

  async saveProfileDetail(profileModel: ProfileModel): Promise<void> {
    try {
      if (GlobalParams.USER_TYPE === "Patient") {
        this.customerData = {
          'PracticeName': GlobalParams.PRACTICE_NAME,
          'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
          'UserId': GlobalParams.USER_ID,
        };
      } else {
        this.customerData = {
          'PracticeName': GlobalParams.PRACTICE_NAME,
          'UserId': GlobalParams.USER_ID,
        };
      }
  
      const queryString = new URLSearchParams(this.customerData as { [key: string]: string }).toString();
      const url = ApiPath.baseApi + 'api/PatientPortal/InsertPatientProfileDetail';
      const requestUrl = url + '?' + queryString;
      
      const response = await baseWebService.postWebAPI({
        requestUrl: requestUrl,
        dataModel: profileModel,
        token: GlobalParams.TOKEN,
        practiceName: GlobalParams.PRACTICE_NAME
      });
      
      if (response.status === 200 && response.data === "SESSION INVALID") {
        this.response_Status_Code_API_2 = 205;
      } else if (response.status === 200) {
        this.profileResponse = response.data;
        this.response_Status_Code_API_2 = response.status;
      } else {
        this.maximum_Calling_API_2 = this.maximum_Calling_API_2 + 1;
        if (this.maximum_Calling_API_2 < ApiPath.MaxAPICalling) {
          if (response.status === 401) {
            await AuthenticationService.generateToken();
            await this.saveProfileDetail(profileModel);
          } else {
            setTimeout(async () => {
              await this.saveProfileDetail(profileModel);
            }, 1000);
          }
        } else {
          this.response_Status_Code_API_2 = response.status;
        }
      }
    } catch (e) {
      console.error('caught error is :', e);
    }
  }
}