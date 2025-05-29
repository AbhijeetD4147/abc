import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { GlobalParams } from '../../utils/GlobalParameters';

class BaseWebService {
  async getWebAPI({
    requestUrl,
    token,
    practiceName,
  }: { requestUrl: string; token?: string; practiceName?: string }): Promise<AxiosResponse> {
    let response: AxiosResponse;
    try {
      response = await axios.get(requestUrl,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${GlobalParams.TOKEN}`,
            'AccountId': GlobalParams.PRACTICE_NAME,
            'SessionGuid': GlobalParams.SESSION_GUID,
          },
        }
      );
    } catch (e: any) {
      console.error("catch error =>", e.toString());
      throw e; // Re-throw the error after logging
    }
    return response;
  }

  async postWebAPI({
    requestUrl,
    dataModel,
    token,
    practiceName,
  }: { requestUrl: string; dataModel: any; token?: string; practiceName?: string }): Promise<AxiosResponse> {
    let response: AxiosResponse;
    try {
      response = await axios.post(requestUrl, JSON.stringify(dataModel),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${GlobalParams.TOKEN}`,
            'AccountId': GlobalParams.PRACTICE_NAME,
            'SessionGuid': GlobalParams.SESSION_GUID,
          },
        }
      );
    } catch (e: any) {
      console.error("catch error =>", e.toString());
      throw e; // Re-throw the error after logging
    }
    return response;
  }
}

export const baseWebService = new BaseWebService();