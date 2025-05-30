import { OptOutModel } from '../../model/settings/OptOutModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

export class OptoutService {
  optOutModel?: OptOutModel;
  optOutResponse?: string;
  maximum_Calling_API_1: number = 0;
  response_Status_Code_API_1?: number;
  maximum_Calling_API_2: number = 0;
  response_Status_Code_API_2?: number;

 async getOptOutTermsText(): Promise<void> {
   try {
     const customerData: { [key: string]: string } = {
       'PracticeName': GlobalParams.PRACTICE_NAME,
       'PtCustomerId': GlobalParams.PT_CUSTOMER_ID,
     };
     const queryString = new URLSearchParams(customerData).toString();
     const url = ApiPath.baseApi + 'api/PatientPortal/GetOptOutText';
     const requestUrl = url + '?' + queryString;
     
     const response = await baseWebService.getWebAPI({
       requestUrl: requestUrl,
       token: GlobalParams.TOKEN,
       practiceName: GlobalParams.PRACTICE_NAME
     });

     if (response.status === 200 && response.data === "SESSION INVALID") {
       this.response_Status_Code_API_1 = 205;
     } else if (response.status === 200) {
       const responseText = response.data;
       this.optOutModel = OptOutModel.fromJson(JSON.parse(responseText));
       this.response_Status_Code_API_1 = response.status;
     } else {
       this.maximum_Calling_API_1 = this.maximum_Calling_API_1 + 1;
       if (this.maximum_Calling_API_1 < ApiPath.MaxAPICalling) {
         if (response.status === 401) {
           await AuthenticationService.generateToken();
           await this.getOptOutTermsText();
         } else {
           setTimeout(async () => {
             await this.getOptOutTermsText();
           }, 1000);
         }
       } else {
         this.response_Status_Code_API_1 = response.status;
       }
     }
   } catch (e) {
     console.error('caught error:', e);
   }
 }

 async makeMyAccountInactive(
   base64Signature: string, 
   optOutText: string, 
   patientName: string
 ): Promise<void> {
   try {
     const customerData: { [key: string]: string } = {
       'OptOutByUser': "0",
       'MaximeyesPatientNumber': GlobalParams.MAXIMEYES_PATIENT_NUMBER,
       'Signature': base64Signature,
       'OptOutText': optOutText,
       'OptOutDate': new Date().toString(),
       'PatientName': patientName,
     };
     const url = ApiPath.baseApi + `api/PatientPortal/OptOutFromPP?PracticeName=${GlobalParams.PRACTICE_NAME}`;
     const requestUrl = url;
     
     const response = await baseWebService.postWebAPI({
       requestUrl: requestUrl,
       dataModel: customerData,
       token: GlobalParams.TOKEN,
       practiceName: GlobalParams.PRACTICE_NAME
     });

     if (response.status === 200 && response.data === "SESSION INVALID") {
       this.response_Status_Code_API_2 = 205;
     } else if (response.status === 200) {
       this.optOutResponse = response.data;
       this.response_Status_Code_API_2 = response.status;
     } else {
       this.maximum_Calling_API_2 = this.maximum_Calling_API_2 + 1;
       if (this.maximum_Calling_API_2 < ApiPath.MaxAPICalling) {
         if (response.status === 401) {
           await AuthenticationService.generateToken();
           await this.makeMyAccountInactive(
             base64Signature, optOutText, patientName);
         } else {
           setTimeout(async () => {
             await this.makeMyAccountInactive(
               base64Signature, optOutText, patientName);
           }, 1000);
         }
       } else {
         this.response_Status_Code_API_2 = response.status;
       }
     }
   } catch (e) {
     console.error('caught error:', e);
   }
 }
}