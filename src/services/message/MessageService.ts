import { MessageComposeModel, MessageListModel, MessageReplyModel, MessageThreadModel,MessageForwardModel } from '../../model/message/MessageModel';
import { AttachmentLimitResponseModel } from '../../model/message/AttachmentLimitResponseModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { GlobalParams } from '../../utils/GlobalParameters';

export class MessageService {
    messageListModel?: MessageListModel[];
    messageAttachmentBase64?: string;
    messageThreadModel?: MessageThreadModel[];

    url: string = "";
    messageReplyStatus: string = "false";
    messageDeleteStatus: string = "false";
    messageArchiveStatus: string = "false";
    messageForwardStatus: string = "false";
    messageComposeStatus: string = "false";
    attachmentLimit: string = "0";

    maximum_Calling_API_1: number = 0;
    maximum_Calling_API_2: number = 0;
    maximum_Calling_API_3: number = 0;
    maximum_Calling_API_4: number = 0;
    maximum_Calling_API_5: number = 0;
    maximum_Calling_API_6: number = 0;
    maximum_Calling_API_7: number = 0;
    maximum_Calling_API_8: number = 0;
    maximum_Calling_API_9: number = 0;
    maximum_Calling_API_10: number = 0;
    maximum_Calling_API_11: number = 0;

    response_Status_Code_API_1?: number;
    response_Status_Code_API_2?: number;
    response_Status_Code_API_3?: number;
    response_Status_Code_API_4?: number;
    response_Status_Code_API_5?: number;
    response_Status_Code_API_6?: number;
    response_Status_Code_API_7?: number;
    response_Status_Code_API_8?: number;
    response_Status_Code_API_9?: number;
    response_Status_Code_API_10?: number;
    response_Status_Code_API_11?: number;

    attachmentLimitResponse?: AttachmentLimitResponseModel;

    parseMessageThread(responseBody: string): MessageThreadModel[] {
        try {
            const parsed = JSON.parse(responseBody);
            return parsed.map((json: any) => MessageThreadModel.fromJson(json));
        } catch (e) {
            console.error('Error parsing message thread:', e);
            return [];
        }
    }

    parseMessageList(responseBody: string): MessageListModel[] {
        try {
            const parsed = JSON.parse(responseBody);
            return parsed.map((json: any) => MessageListModel.fromJson(json));
        } catch (e) {
            console.error('Error parsing message list:', e);
            return [];
        }
    }

    async getMessageList(pageNo: number, isInbox: boolean, isArchive: boolean): Promise<void> {
        try {
            // isInbox ? inbox msg : send messages
            
            let customerData: { [key: string]: string };
            let url: string;
            
            if (isArchive) {
              customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
                'PageNo': pageNo.toString(),
                'RecordsPerPage': '10',
              };
              url = ApiPath.baseApi + 'api/PatientPortal/GetPatientArchiveMessageList';
            } else {
              customerData = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
                'IsIncoming': isInbox.toString(),
                'PageNo': pageNo.toString(),
                'RecordsPerPage': '10',
              };
              url = ApiPath.baseApi + 'api/PatientPortal/GetPatientMessageList';
            }
            
            const queryString = new URLSearchParams(customerData).toString();
            const requestUrl = url + '?' + queryString;
            
            const response = await baseWebService.getWebAPI({
              requestUrl: requestUrl,
              token: GlobalParams.TOKEN,
              practiceName: GlobalParams.PRACTICE_NAME
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
              this.response_Status_Code_API_1 = 205;
            } else if (response.status === 200) {
              this.messageListModel = this.parseMessageList(response.data);
              this.response_Status_Code_API_1 = response.status;
            } else {
              this.maximum_Calling_API_1 = this.maximum_Calling_API_1 + 1;
              if (this.maximum_Calling_API_1 < ApiPath.MaxAPICalling) {
                if (response.status === 401) {
                  await AuthenticationService.generateToken();
                  await this.getMessageList(pageNo, isInbox, isArchive);
                } else {
                  setTimeout(async () => {
                    await this.getMessageList(pageNo, isInbox, isArchive);
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

    async getSearchMessages(pageNo: number, searchText: string): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
                'SearchText': searchText,
                'PageNo': pageNo.toString(),
                'RecordsPerPage': '10',
            };
            
            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/GetPatientMessageListBySearchText';
            const requestUrl = url + '?' + queryString;
            
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_2 = 205;
            } else if (response.status === 200) {
                this.messageListModel = this.parseMessageList(response.data);
                this.response_Status_Code_API_2 = response.status;
            } else {
                this.maximum_Calling_API_2 = this.maximum_Calling_API_2 + 1;
                if (this.maximum_Calling_API_2 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getSearchMessages(pageNo, searchText);
                    } else {
                        setTimeout(async () => {
                            await this.getSearchMessages(pageNo, searchText);
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

    async getUnreadMessageList(pageNo: number): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
                'PageNo': pageNo.toString(),
                'RecordsPerPage': '10',
            };
            
            this.url = ApiPath.baseApi + 'api/PatientPortal/GetPatientUnreadMessageList';
            
            const queryString = new URLSearchParams(customerData).toString();
            const requestUrl = this.url + '?' + queryString;
            
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_3 = 205;
            } else if (response.status === 200) {
                this.messageListModel = this.parseMessageList(response.data);
                this.response_Status_Code_API_3 = response.status;
            } else {
                this.maximum_Calling_API_3 = this.maximum_Calling_API_3 + 1;
                if (this.maximum_Calling_API_3 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getUnreadMessageList(pageNo);
                    } else {
                        setTimeout(async () => {
                            await this.getUnreadMessageList(pageNo);
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

    async getMessageThread(messageId: string, messageType: string): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'MessageId': messageId,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
                'MessageType': messageType,
                'IsRead': "true",
            };
            
            this.url = ApiPath.baseApi + 'api/PatientPortal/GetPatientMessageByIDForAllTypes';
            
            const queryString = new URLSearchParams(customerData).toString();
            const requestUrl = this.url + '?' + queryString;
            
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_4 = 205;
            } else if (response.status === 200) {
                this.messageThreadModel = this.parseMessageThread(response.data);
                this.response_Status_Code_API_4 = response.status;
            } else {
                this.maximum_Calling_API_4 = this.maximum_Calling_API_4 + 1;
                if (this.maximum_Calling_API_4 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getMessageThread(messageId, messageType);
                    } else {
                        setTimeout(async () => {
                            await this.getMessageThread(messageId, messageType);
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

    async replyEmail(messageReplyModel: MessageReplyModel): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };
            
            const queryString = new URLSearchParams(customerData).toString();
            
            const url = ApiPath.baseApi + 'api/PatientPortal/SendPatientMessage';
            const requestUrl = url + '?' + queryString;
            
            const response = await baseWebService.postWebAPI({
                dataModel: messageReplyModel,
                requestUrl: requestUrl
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_5 = 205;
            } else if (response.status === 200) {
                this.messageReplyStatus = response.data;
                this.response_Status_Code_API_5 = response.status;
            } else {
                this.maximum_Calling_API_5 = this.maximum_Calling_API_5 + 1;
                if (this.maximum_Calling_API_5 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.replyEmail(messageReplyModel);
                    } else {
                        setTimeout(async () => {
                            await this.replyEmail(messageReplyModel);
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

    async composeEmail(messageComposeModel: MessageComposeModel): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/SendPatientMessage';

            const requestUrl = url + '?' + queryString;
            const response = await baseWebService.postWebAPI({
                dataModel: messageComposeModel,
                requestUrl: requestUrl,
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_9 = 205;
            } else if (response.status === 200) {
                this.messageComposeStatus = response.data;
                this.response_Status_Code_API_9 = response.status;
            } else {
                this.maximum_Calling_API_9 = this.maximum_Calling_API_9 + 1;
                if (this.maximum_Calling_API_9 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.composeEmail(messageComposeModel);
                    } else {
                        setTimeout(async () => {
                            await this.composeEmail(messageComposeModel);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_9 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error:', e);
        }
    }

    async deleteMessage(messageIds: string, isArchive: boolean): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'MessageId': messageIds,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };
            
            if (isArchive) {
                this.url = ApiPath.baseApi + 'api/PatientPortal/DeletePatientMessageArchive';
            } else {
                this.url = ApiPath.baseApi + 'api/PatientPortal/DeletePatientMessage';
            }
            
            const queryString = new URLSearchParams(customerData).toString();
            
            const requestUrl = this.url + '?' + queryString;
            
            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_6 = 205;
            } else if (response.status === 200) {
                this.messageDeleteStatus = response.data;
                this.response_Status_Code_API_6 = response.status;
            } else {
                this.maximum_Calling_API_6 = this.maximum_Calling_API_6 + 1;
                if (this.maximum_Calling_API_6 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.deleteMessage(messageIds, isArchive);
                    } else {
                        setTimeout(async () => {
                            await this.deleteMessage(messageIds, isArchive);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_6 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }

    async archiveMessage(messageIds: string, isArchive: boolean): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'MessageId': messageIds,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
                'IsArchive': isArchive.toString(),
            };
            
            this.url = ApiPath.baseApi + 'api/PatientPortal/PatientMessageArchiveAndUnArchive';
            
            const queryString = new URLSearchParams(customerData).toString();
            
            const requestUrl = this.url + '?' + queryString;
            
            const response = await baseWebService.postWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_7 = 205;
            } else if (response.status === 200) {
                this.messageArchiveStatus = response.data;
                this.response_Status_Code_API_7 = response.status;
            } else {
                this.maximum_Calling_API_7 = this.maximum_Calling_API_7 + 1;
                if (this.maximum_Calling_API_7 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.archiveMessage(messageIds, isArchive);
                    } else {
                        setTimeout(async () => {
                            await this.archiveMessage(messageIds, isArchive);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_7 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }

    async forwardEmail(messageForwardModel: MessageForwardModel): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };
            
            const queryString = new URLSearchParams(customerData).toString();
            
            const url = ApiPath.baseApi + 'api/PatientPortal/ForwardPatientMessage';
            const requestUrl = url + '?' + queryString;
            
            const response = await baseWebService.postWebAPI({
                dataModel: messageForwardModel,
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_8 = 205;
            } else if (response.status === 200) {
                this.messageForwardStatus = response.data;
                this.response_Status_Code_API_8 = response.status;
            } else {
                this.maximum_Calling_API_8 = this.maximum_Calling_API_8 + 1;
                if (this.maximum_Calling_API_8 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.forwardEmail(messageForwardModel);
                    } else {
                        setTimeout(async () => {
                            await this.forwardEmail(messageForwardModel);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_8 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error :', e);
        }
    }

    async getAttachmentLimit(): Promise<AttachmentLimitResponseModel | undefined> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
            };

            const queryString = new URLSearchParams(customerData).toString();
            const url = ApiPath.baseApi + 'api/PatientPortal/AttachmentSendLimit';
            const requestUrl = url + '?' + queryString;
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME
            });

            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_10 = 205;
            } else if (response.status === 200) {
                this.attachmentLimitResponse = AttachmentLimitResponseModel.fromJson(
                    JSON.parse(response.data)
                );
                this.attachmentLimit = this.attachmentLimitResponse.attachmentLimit!;
                this.response_Status_Code_API_10 = response.status;
            } else {
                this.maximum_Calling_API_10 = this.maximum_Calling_API_10 + 1;
                if (this.maximum_Calling_API_10 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        return await this.getAttachmentLimit();
                    } else {
                        return new Promise((resolve) => {
                            setTimeout(async () => {
                                resolve(await this.getAttachmentLimit());
                            }, 1000);
                        });
                    }
                } else {
                    this.response_Status_Code_API_10 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error:', e);
        }
        return this.attachmentLimitResponse;
    }

    async getMessageAttachmentById(attachmentId: number): Promise<void> {
        try {
            const customerData: { [key: string]: string } = {
                'PracticeName': GlobalParams.PRACTICE_NAME,
                'UserId': GlobalParams.USER_ID,
                'SwitchUserId': GlobalParams.SWITCH_USER_ID,
                'AttachmentId': attachmentId.toString(),
            };
            this.url = ApiPath.baseApi + 'api/PatientPortal/DownloadMessageAttachment';

            const queryString = new URLSearchParams(customerData).toString();

            const requestUrl = this.url + '?' + queryString;
            const response = await baseWebService.getWebAPI({
                requestUrl: requestUrl,
                token: GlobalParams.TOKEN,
                practiceName: GlobalParams.PRACTICE_NAME,
            });
            
            if (response.status === 200 && response.data === "SESSION INVALID") {
                this.response_Status_Code_API_11 = 205;
            } else if (response.status === 200) {
                this.messageAttachmentBase64 = response.data;
                this.response_Status_Code_API_11 = response.status;
            } else {
                this.maximum_Calling_API_11 = this.maximum_Calling_API_11 + 1;
                if (this.maximum_Calling_API_11 < ApiPath.MaxAPICalling) {
                    if (response.status === 401) {
                        await AuthenticationService.generateToken();
                        await this.getMessageAttachmentById(attachmentId);
                    } else {
                        setTimeout(async () => {
                            await this.getMessageAttachmentById(attachmentId);
                        }, 1000);
                    }
                } else {
                    this.response_Status_Code_API_11 = response.status;
                }
            }
        } catch (e) {
            console.error('caught error:', e);
        }
    }
}