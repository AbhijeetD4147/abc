import { InsuranceModel } from '../../model/settings/InsuranceModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

export class InsuranceService {
  saveInsuranceResponse?: string;
  insuranceArray?: string;
  insuranceData: InsuranceModel[] = [];

  constructor(options?: { insuranceArray?: string }) {
    this.insuranceArray = options?.insuranceArray;
  }

  maximum_Calling_API_1: number = 0;
  maximum_Calling_API_2: number = 0;
  response_Status_Code_API_1?: number;
  response_Status_Code_API_2?: number;

  parseInsurance(responseBody: string): InsuranceModel[] {
    const parsed = JSON.parse(responseBody);
    return parsed.map((json: any) => InsuranceModel.fromJson(json));
  }

  async getInsurance(): Promise<void> {
    try {
      const customerData: { [key: string]: string } = {
        'PracticeName': GlobalParams.PRACTICE_NAME,
        'PatientId': GlobalParams.PT_CUSTOMER_ID,
      };
      const queryString = new URLSearchParams(customerData).toString();
      const url = ApiPath.baseApi + 'api/Insurance/GetWelcomeFormInsuranceData';
      const requestUrl = url + '?' + queryString;
      const response = await baseWebService.getWebAPI({
        requestUrl: requestUrl,
        token: GlobalParams.TOKEN,
        practiceName: GlobalParams.PRACTICE_NAME
      });

      if (response.status === 200 && response.data === "SESSION INVALID") {
        this.response_Status_Code_API_1 = 205;
      } else if (response.status === 200) {
        const responseBody = response.data;
        this.insuranceData = this.parseInsurance(responseBody);
        this.response_Status_Code_API_1 = response.status;
      } else {
        this.maximum_Calling_API_1 = this.maximum_Calling_API_1 + 1;
        if (this.maximum_Calling_API_1 < ApiPath.MaxAPICalling) {
          if (response.status === 401) {
            await AuthenticationService.generateToken();
            await this.getInsurance();
          } else {
            setTimeout(async () => {
              await this.getInsurance();
            }, 1000);
          }
        } else {
          this.response_Status_Code_API_1 = response.status;
        }
      }
    } catch (e) {
      console.error('caught error insurance::', e);
    }
  }

  async addInsurance(): Promise<void> {
    try {
      let customerData: { [key: string]: string };

      if (ApiPath.isIntakeFormFlow) { // MBT 34434 Jagrut
        customerData = {
          'PracticeName': GlobalParams.PRACTICE_NAME,
          'CallFrom': "PP",
          'UserId': GlobalParams.USER_ID,
          'SwitchUserId': GlobalParams.SWITCH_USER_ID,
        };
      } else {
        customerData = {
          'PracticeName': GlobalParams.PRACTICE_NAME,
          'CallFrom': "PP",
          'UserId': GlobalParams.USER_ID,
          'SwitchUserId': GlobalParams.SWITCH_USER_ID,
          'callFromScreen': "UpdateInsurance",
        };
      }

      const queryString = new URLSearchParams(customerData).toString();
      const url = ApiPath.baseApi + 'api/Insurance/SyncInsurance';
      const requestUrl = url + '?' + queryString;
      const response = await baseWebService.postWebAPI({
        requestUrl: requestUrl,
        dataModel: JSON.parse(this.insuranceArray!),
        token: GlobalParams.TOKEN,
        practiceName: GlobalParams.PRACTICE_NAME
      });

      if (response.status === 200 && response.data === "SESSION INVALID") {
        this.response_Status_Code_API_2 = 205;
      } else if (response.status === 200) {
        this.saveInsuranceResponse = response.data;
        this.response_Status_Code_API_2 = response.status;
      } else {
        this.maximum_Calling_API_2 = this.maximum_Calling_API_2 + 1;
        if (this.maximum_Calling_API_2 < ApiPath.MaxAPICalling) {
          if (response.status === 401) {
            await AuthenticationService.generateToken();
            await this.addInsurance();
          } else {
            setTimeout(async () => {
              await this.addInsurance();
            }, 1000);
          }
        } else {
          this.response_Status_Code_API_2 = response.status;
        }
      }
    } catch (e) {
      console.error('caught error :', e);
    }
  }
}