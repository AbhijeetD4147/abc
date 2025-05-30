import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';
import { AuthenticationService } from '../authentication/UserService';
import { PoliciesAndConsentFormListModel } from '../../model/settings/PoliciesAndConsentFormsModel';

export class PoliciesAndConsentFormsService {
  policiesAndConsentForms: PoliciesAndConsentFormListModel[] = [];
  maximum_Calling_API: number = 0;
  response_Status_Code_API?: number;

  

  async getFormList(): Promise<void> {
    try {
      const customerData: { [key: string]: string } = {
        'welcomeformAccountID': GlobalParams.PRACTICE_NAME,
        'PtCustomerId': GlobalParams.PT_CUSTOMER_ID,
        'maximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
      };

      const queryString = new URLSearchParams(customerData).toString();

      const url = ApiPath.baseApi + 'api/PatientPortal/GetPolicyAndConsentFormsList';
      const requestUrl = url + '?' + queryString;

      const response = await baseWebService.getWebAPI({
        requestUrl: requestUrl,
        token: GlobalParams.TOKEN,
        practiceName: GlobalParams.PRACTICE_NAME
      });

      if (response.status === 200 && response.data === "SESSION INVALID") {
        this.response_Status_Code_API = 205;
      } else if (response.status === 200) {
        const data = JSON.parse(response.data);
        this.policiesAndConsentForms = (data as any[])
          .map((item: any) => PoliciesAndConsentFormListModel.fromJson(item));
        this.response_Status_Code_API = response.status;
      } else {
        this.maximum_Calling_API = this.maximum_Calling_API + 1;
        if (this.maximum_Calling_API < ApiPath.MaxAPICalling) {
          if (response.status === 401) {
            await AuthenticationService.generateToken();
            await this.getFormList();
          } else {
            setTimeout(async () => {
              await this.getFormList();
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