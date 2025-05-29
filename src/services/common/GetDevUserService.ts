import { ApiPath } from '../../utils/constants'; // Assuming ApiPath is in constants.ts

class GetDevUrlService {
  baseUrl: string | undefined;

  // Future<void> getUrl(
  //     String baseAddress, String appVersion, String practiceName) async {
  //   ApiPath.baseApi = " `https://patientportaldevapi.maximeyes.com/` ";
  // }

  getUrl(
    baseAddress: string,
    appVersion: string,
    practiceName: string
  ): void {
    ApiPath.baseApi = " `https://ptportalapiqa.maximeyes.com/` ";
  }

  // Future<void> getUrl(
  //     String baseAddress, String appVersion, String practiceName) async {
  //   ApiPath.baseApi = " `http://certptportalapi.maximeyes.com/` ";
  // }
}

export const getDevUrlService = new GetDevUrlService();