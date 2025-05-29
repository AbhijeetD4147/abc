import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

class GetUrlService {
    private baseUrl?: string;

    async getUrl(
        baseAddress: string,
        appVersion: string,
        practiceName: string
    ): Promise<void> {
        try {
            const customerData: Record<string, string> = {
                'baseAddress': baseAddress,
                'appversion': appVersion,
                'PracticeAccountId': practiceName,
            };
            const queryString = new URLSearchParams(customerData).toString();

            const url = ApiPath.FirstAPI;

            const requestUrl = `${url}?${queryString}`;

            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    'SessionGuid': GlobalParams.SESSION_GUID,
                },
            });

            this.baseUrl = await response.text();

            const urlValues = this.baseUrl.split(':');
            this.baseUrl = urlValues[0] + urlValues[1];
            if (urlValues.length > 2) {
                ApiPath.maximeyesNumber = urlValues[2];
            } else {
                ApiPath.maximeyesNumber = this.baseUrl.substring(
                    this.baseUrl.lastIndexOf(':') + 1,
                    this.baseUrl.length
                );
            }

            this.baseUrl = this.baseUrl.replace(/^https/, 'https:');

            if (this.baseUrl.endsWith('/')) {
                ApiPath.baseApi = this.baseUrl;
            } else {
                ApiPath.baseApi = this.baseUrl + '/';
            }
        } catch (e) {
            console.error(`caught error : ${e}`);
        }
    }
}

export default GetUrlService;