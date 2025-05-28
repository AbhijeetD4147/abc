// Interface for the response data structure
export interface UpdatePasswordResponse {
    status?: string;
    text?: string;
}

// Model class with static methods for JSON conversion
export class UpdatePasswordResponseModel {
    static fromJson(json: any): UpdatePasswordResponse {
        return {
            status: json['status'],
            text: json['text']
        };
    }

    static toJson(response: UpdatePasswordResponse): Record<string, any> {
        return {
            status: response.status,
            text: response.text
        };
    }
}