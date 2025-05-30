import { ActivityLogModel, ActivityActionOptionModel } from '../../model/settings/ActivityLogModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

export class ActivityLogService {
  activityLogData: ActivityLogModel[] = [];
  actionOptions: ActivityActionOptionModel[] = [];
  selectedActionData?: string;
  result: any;
  updateAuditLogsResponse: any;

  maximum_Calling_API_1: number = 0;
  maximum_Calling_API_2: number = 0;
  maximum_Calling_API_3: number = 0;
  maximum_Calling_API_4: number = 0;
  maximum_Calling_API_5: number = 0;
  response_Status_Code_API_1?: number;
  response_Status_Code_API_2?: number;
  response_Status_Code_API_3?: number;
  response_Status_Code_API_4?: number;
  response_Status_Code_API_5?: number;

  async getActivityLog(
    pageNo: number,
    actionName: string,
    fromDate: string,
    endDate: string,
    isDateAndTimeInAscending: boolean,
    isUserInAscending: boolean,
    isActionInAscending: boolean,
    order: string,
    device: string
  ): Promise<void> {
    try {
      let customerData: { [key: string]: string };
  
      if (device === "Mobile") {
        customerData = {
          'PracticeName': GlobalParams.PRACTICE_NAME,
          'UserId': GlobalParams.USER_ID,
          'ActionName': actionName,
          'FromDate': fromDate,
          'EndDate': endDate,
          'PageNo': pageNo.toString(),
          'RecordsPerPage': "10",
          'SwitchUserId': GlobalParams.SWITCH_USER_ID,
          'Device': "Mobile",
          'AuthId': GlobalParams.PT_CUSTOMER_ID_For_Audit_Log,
          'DataOrder': order,
        };
      } else {
        customerData = {
          'PracticeName': GlobalParams.PRACTICE_NAME,
          'UserId': GlobalParams.USER_ID,
          'ActionName': actionName,
          'FromDate': fromDate,
          'EndDate': endDate,
          'PageNo': pageNo.toString(),
          'RecordsPerPage': "10",
          'SwitchUserId': GlobalParams.SWITCH_USER_ID,
          'Device': "Web",
          'AuthId': GlobalParams.PT_CUSTOMER_ID_For_Audit_Log,
          'DataOrder': order,
          'IsDateAndTimeInAscending': isDateAndTimeInAscending.toString(),
          'IsUserInAscending': isUserInAscending.toString(),
          'IsActionInAscending': isActionInAscending.toString(),
        };
      }
  
      const queryString = new URLSearchParams(customerData).toString();
  
      const url = ApiPath.baseApi + 'api/PatientPortal/GetActivityLog';
      const requestUrl = url + '?' + queryString;
      const response = await baseWebService.getWebAPI({
        requestUrl: requestUrl,
        token: GlobalParams.TOKEN,
        practiceName: GlobalParams.PRACTICE_NAME
      });
  
      if (response.status === 200 && response.data === "SESSION INVALID") {
        this.response_Status_Code_API_1 = 205;
      } else if (response.status === 200) {
        this.result = response.data;
        const data = JSON.parse(this.result);
        this.activityLogData = data.map((item: any) => ActivityLogModel.fromJson(item));
        this.response_Status_Code_API_1 = response.status;
      } else {
        this.maximum_Calling_API_1 = this.maximum_Calling_API_1 + 1;
        if (this.maximum_Calling_API_1 < ApiPath.MaxAPICalling) {
          if (response.status === 401) {
            await AuthenticationService.generateToken();
            await this.getActivityLog(
              pageNo,
              actionName,
              fromDate,
              endDate,
              isDateAndTimeInAscending,
              isUserInAscending,
              isActionInAscending,
              order,
              device
            );
          } else {
            setTimeout(async () => {
              await this.getActivityLog(
                pageNo,
                actionName,
                fromDate,
                endDate,
                isDateAndTimeInAscending,
                isUserInAscending,
                isActionInAscending,
                order,
                device
              );
            }, 1000);
          }
        } else {
          this.response_Status_Code_API_1 = response.status;
        }
      }
    } catch (e) {
      console.error('caught error :', e);
    }
  }

  async updateAuditLogForlogout(): Promise<void> {
    try {
      const customerData: { [key: string]: string } = {
        'PracticeName': GlobalParams.PRACTICE_NAME,
        'UserId': GlobalParams.USER_ID,
        'SwitchUserId': GlobalParams.SWITCH_USER_ID,
      };
  
      const queryString = new URLSearchParams(customerData).toString();
      const url = ApiPath.baseApi + 'api/Account/LogOut';
      const requestUrl = url + '?' + queryString;
      const response = await baseWebService.postWebAPI({ requestUrl: requestUrl });
  
      if (response.status === 200 && response.data === "SESSION INVALID") {
        this.response_Status_Code_API_2 = 205;
      } else if (response.status === 200) {
        this.updateAuditLogsResponse = response.data;
        this.response_Status_Code_API_2 = response.status;
      } else {
        this.maximum_Calling_API_2 = this.maximum_Calling_API_2 + 1;
        if (this.maximum_Calling_API_2 < ApiPath.MaxAPICalling) {
          if (response.status === 401) {
            await AuthenticationService.generateToken();
            await this.updateAuditLogForlogout();
          } else {
            setTimeout(async () => {
              await this.updateAuditLogForlogout();
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

  async updateAuditLogForHealthSummary(
    action: string,
    healthSummaryId: number,
    emailId: string
  ): Promise<void> {
    try {
      let customerData: { [key: string]: string };
      if (emailId.trim() !== '') {
        customerData = {
          'PracticeName': GlobalParams.PRACTICE_NAME,
          'UserId': GlobalParams.USER_ID,
          'SwitchUserId': GlobalParams.SWITCH_USER_ID,
          'Action': action,
          'HealthSummaryId': healthSummaryId.toString(),
          'ReceiverEmailId': emailId,
        };
      } else {
        customerData = {
          'PracticeName': GlobalParams.PRACTICE_NAME,
          'UserId': GlobalParams.USER_ID,
          'SwitchUserId': GlobalParams.SWITCH_USER_ID,
          'Action': action,
          'HealthSummaryId': healthSummaryId.toString(),
        };
      }
  
      const queryString = new URLSearchParams(customerData).toString();
      const url = ApiPath.baseApi + 'api/PatientPortal/InsertHealthSummaryActionLogs';
      const requestUrl = url + '?' + queryString;
      const response = await baseWebService.postWebAPI({
        requestUrl: requestUrl,
      });
  
      if (response.status === 200 && response.data === "SESSION INVALID") {
        this.response_Status_Code_API_3 = 205;
      } else if (response.status === 200) {
        this.updateAuditLogsResponse = response.data;
        this.response_Status_Code_API_3 = response.status;
      } else {
        this.maximum_Calling_API_3 = this.maximum_Calling_API_3 + 1;
        if (this.maximum_Calling_API_3 < ApiPath.MaxAPICalling) {
          if (response.status === 401) {
            await AuthenticationService.generateToken();
            await this.updateAuditLogForHealthSummary(
              action,
              healthSummaryId,
              emailId
            );
          } else {
            setTimeout(async () => {
              await this.updateAuditLogForHealthSummary(
                action,
                healthSummaryId,
                emailId
              );
            }, 1000);
          }
        } else {
          this.response_Status_Code_API_3 = response.status;
        }
      }
    } catch (e) {
      console.error('caught error :', e);
    }
  }

  async fetchActionData(): Promise<void> {
    try {
      const customerData: { [key: string]: string } = {
        'PracticeName': GlobalParams.PRACTICE_NAME,
      };
  
      const queryString = new URLSearchParams(customerData).toString();
      const url = ApiPath.baseApi + 'api/PatientPortal/GetAuditLogModules';
      const requestUrl = url + '?' + queryString;
      const response = await baseWebService.getWebAPI({
        requestUrl: requestUrl,
        token: GlobalParams.TOKEN,
        practiceName: GlobalParams.PRACTICE_NAME
      });
  
      if (response.status === 200 && response.data === "SESSION INVALID") {
        this.response_Status_Code_API_4 = 205;
      } else if (response.status === 200) {
        const json = JSON.parse(response.data);
        this.actionOptions = json.map((item: any) => 
          ActivityActionOptionModel.fromJson(item)
        );
        this.response_Status_Code_API_4 = response.status;
      } else {
        this.maximum_Calling_API_4 = this.maximum_Calling_API_4 + 1;
        if (this.maximum_Calling_API_4 < ApiPath.MaxAPICalling) {
          if (response.status === 401) {
            await AuthenticationService.generateToken();
            await this.fetchActionData();
          } else {
            setTimeout(async () => {
              await this.fetchActionData();
            }, 1000);
          }
        } else {
          this.response_Status_Code_API_4 = response.status;
        }
      }
    } catch (e) {
      console.error('caught error :', e);
    }
  }

  async updateAuditLogForVisitSummary(
    action: string,
    visitSummaryDate: string,
    emailId: string
  ): Promise<void> {
    try {
      let customerData: { [key: string]: string };
      if (emailId.trim() !== '') {
        customerData = {
          'PracticeName': GlobalParams.PRACTICE_NAME,
          'UserId': GlobalParams.USER_ID,
          'SwitchUserId': GlobalParams.SWITCH_USER_ID,
          'Action': action,
          'socDate': visitSummaryDate,
          'ReceiverEmailId': emailId,
        };
      } else {
        customerData = {
          'PracticeName': GlobalParams.PRACTICE_NAME,
          'UserId': GlobalParams.USER_ID,
          'SwitchUserId': GlobalParams.SWITCH_USER_ID,
          'Action': action,
          'socDate': visitSummaryDate,
        };
      }
  
      const queryString = new URLSearchParams(customerData).toString();
      const url = ApiPath.baseApi + 'api/PatientPortal/InsertVisitSummaryActionLogs';
      const requestUrl = url + '?' + queryString;
      const response = await baseWebService.postWebAPI({
        requestUrl: requestUrl,
      });
  
      if (response.status === 200 && response.data === "SESSION INVALID") {
        this.response_Status_Code_API_5 = 205;
      } else if (response.status === 200) {
        this.updateAuditLogsResponse = response.data;
        this.response_Status_Code_API_5 = response.status;
      } else {
        this.maximum_Calling_API_5 = this.maximum_Calling_API_5 + 1;
        if (this.maximum_Calling_API_5 < ApiPath.MaxAPICalling) {
          if (response.status === 401) {
            await AuthenticationService.generateToken();
            await this.updateAuditLogForVisitSummary(
              action,
              visitSummaryDate,
              emailId
            );
          } else {
            setTimeout(async () => {
              await this.updateAuditLogForVisitSummary(
                action,
                visitSummaryDate,
                emailId
              );
            }, 1000);
          }
        } else {
          this.response_Status_Code_API_5 = response.status;
        }
      }
    } catch (e) {
      console.error('caught error :', e);
    }
  }
}