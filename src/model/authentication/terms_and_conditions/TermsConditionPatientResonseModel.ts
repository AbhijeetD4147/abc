// Interface for Patient Terms Response
export interface PatientTermsResponse {
    tncText?: string;
    patientName?: string;
}

// Interface for Auth Terms Response
export interface AuthTermsResponse {
    tnCText?: string;
    userName?: string;
}

// Model class for Patient Terms Response
export class PatientTermsResponseModel {
    static fromJson(json: any): PatientTermsResponse {
        return {
            tncText: json['tncText'],
            patientName: json['patientName']
        };
    }

    static toJson(response: PatientTermsResponse): Record<string, any> {
        return {
            tncText: response.tncText,
            patientName: response.patientName
        };
    }
}

// Model class for Auth Terms Response
export class AuthTermsResponseModel {
    static fromJson(json: any): AuthTermsResponse {
        return {
            tnCText: json['tnCText'],
            userName: json['userName']
        };
    }

    static toJson(response: AuthTermsResponse): Record<string, any> {
        return {
            tnCText: response.tnCText,
            userName: response.userName
        };
    }
}