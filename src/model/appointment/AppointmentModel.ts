// Interfaces
export interface LatestAppointment {
    appointmentDateTime?: string;
    appointmenttHeader?: string;
    appointmentReason?: string;
    isTelehealth?: boolean;
    isMarkArrivedButtonEnable?: boolean;
    isApptMarkedAsArrived?: boolean;
    unconfirmedApptCount?: string;
    messageUnreadCount?: string;
    healthSummaryUnreadCount?: string;
    appointmentId?: number;
    locationId?: number;
    locationName?: string;
    practicePersonName?: string;
    intakeLastUpdatedDate?: string;
    isIntakeFormSubmit?: boolean;
    isInsurancePageShow?: boolean;
}

export interface Location {
    logo?: string;
    name?: string;
    days?: Day[];
    address?: Address;
    maximeyesLocationId?: number;
}

export interface Day {
    name?: string;
    startTime?: string;
    endTime?: string;
}

export interface Address {
    line1?: string;
    line2?: string;
    state?: string;
    zipCode?: string;
    phone?: string;
    city?: string;
    fax?: string;
}

export interface AppointmentPracticePerson {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    practicePersonId?: number;
}

export interface AppointmentReason {
    createdBy?: number;
    reasonId?: number;
    reason?: any;
    isActive?: boolean;
    isEnabled?: boolean;
    isNewPatientAppt?: boolean;
}

export interface NewCompanyData {
    businessName?: string;
    locations?: Location[];
    customerNote?: string;
    practiceNote?: string;
    intakePageLandingText?: string;
    isCustomerhours?: boolean;
}

export interface AppointmentTimeSlot {
    resourceType?: string;
    appointmentType?: string;
    apptStartDateTime?: string;
    apptEndDateTime?: string;
    reasonIds?: string;
    reasonName?: string;
    resourceId?: number;
    resourceName?: string;
    providerName?: string;
    providerId?: number;
    locationId?: string;
    locationName?: string;
    appointmentId?: number;
}

export interface DayAndDate {
    year?: string;
    month?: string;
    day?: string;
    date?: string;
    slotTime?: SlotTime[];
}

export interface MonthData {
    year?: string;
    month?: string;
    dayAndDate?: DayAndDate[];
}

export interface SlotTime {
    day?: string;
    month?: string;
    year?: string;
    date?: string;
    time?: string;
    resourceType?: string;
    appointmentType?: string;
    apptStartDateTime?: string;
    apptEndDateTime?: string;
    reasonIds?: string;
    reasonName?: string;
    resourceId?: number;
    resourceName?: string;
    providerName?: string;
    providerId?: number;
    locationId?: string;
    locationName?: string;
    id?: number;
}

export interface AppointmentDataPass {
    locationId?: number;
    practicePersonId?: number;
    providerName?: string;
    reasonId?: number;
    reason?: string;
    slotTime?: SlotTime;
    reasonForVisit?: string;
    apptId?: number;
}

export interface AppointmentGeneralNotification {
    maxGeneralNotificationsId?: number;
    startTime?: string;
    endTime?: string;
    mondayActive?: boolean;
    tuesdayActive?: boolean;
    wednesdayActive?: boolean;
    thursdayActive?: boolean;
    fridayActive?: boolean;
    saturdayActive?: boolean;
    sundayActive?: boolean;
    schedulingHours?: number;
    dailyLimitHours?: number;
    cancelationHours?: number;
    isDeleted?: boolean;
    createDate?: string;
    createBy?: number;
    createProcess?: number;
    updateDate?: string;
    updateBy?: number;
    updateProcess?: number;
    isActive?: boolean;
}

export interface AppointmentList {
    patientScheduleId?: number;
    appointmentDate?: string;
    appointmentTime?: string;
    appointmentType?: string;
    practiceBussiness?: string;
    practiceLocation?: string;
    appointmentIsCancel?: boolean;
    appointmentIsConfirmed?: boolean;
    appointmentIsReschedule?: boolean;
    isTeleHealthVisit?: boolean;
    isVisitSummary?: boolean;
    totalRecords?: number;
    reason?: string;
    reasonId?: number;
    encounterId?: string;
    encounterDate?: string;
    encounterType?: string;
    encounterLocation?: string;
    encounterProvider?: string;
    isEncApptMatch?: boolean;
}

export interface VisitSummary {
    visitSummaryData?: string;
    visitSummaryDate?: string;
    visitSummaryAttachment?: VisitSummaryAttachment[];
}

export interface VisitSummaryAttachment {
    attachmentId?: number;
    attachmentType?: string;
    attachmentBase64FileContent?: string;
    attachmentFileName?: string;
    attachmentFileSize?: number;
}

export interface ExistingAppointmentData {
    locationId?: number;
    locationPhoneNumber?: string;
    locationName?: string;
    practicePersonId?: number;
    practicePersonName?: string;
    reasonId?: number;
    reasonName?: string;
    reasonForVisit?: string;
    slotTime?: string;
    slotDay?: string;
    slotDate?: string;
    slotYear?: string;
}

// Model Classes
export class DayAndDateModel {
    static fromJson(json: any): DayAndDate {
        return {
            year: json.year,
            month: json.month,
            day: json.day,
            date: json.date,
            slotTime: json.slotTime ? json.slotTime.map((s: any) => SlotTimeModel.fromJson(s)) : undefined
        };
    }
}

export class MonthDataModel {
    static fromJson(json: any): MonthData {
        return {
            year: json.year,
            month: json.month,
            dayAndDate: json.dayAndDate ? json.dayAndDate.map((d: any) => DayAndDateModel.fromJson(d)) : undefined
        };
    }
}

export class SlotTimeModel {
    static fromJson(json: any): SlotTime {
        return {
            day: json.day,
            month: json.month,
            year: json.year,
            date: json.date,
            time: json.time,
            resourceType: json.resourceType,
            appointmentType: json.appointmentType,
            apptStartDateTime: json.apptStartDateTime,
            apptEndDateTime: json.apptEndDateTime,
            reasonIds: json.reasonIds,
            reasonName: json.reasonName,
            resourceId: json.resourceId,
            resourceName: json.resourceName,
            providerName: json.providerName,
            providerId: json.providerId,
            locationId: json.locationId,
            locationName: json.locationName,
            id: json.id
        };
    }
}

export class AppointmentGeneralNotificationModel {
    static fromJson(json: any): AppointmentGeneralNotification {
        return {
            maxGeneralNotificationsId: json.maX_GENERAL_NOTIFICATIONS_ID,
            startTime: json.starT_TIME,
            endTime: json.enD_TIME,
            mondayActive: json.mondaY_ACTIVE,
            tuesdayActive: json.tuesdaY_ACTIVE,
            wednesdayActive: json.wednesdaY_ACTIVE,
            thursdayActive: json.thursdaY_ACTIVE,
            fridayActive: json.fridaY_ACTIVE,
            saturdayActive: json.saturdaY_ACTIVE,
            sundayActive: json.sundaY_ACTIVE,
            schedulingHours: json.schedulinG_HOURS,
            dailyLimitHours: json.dailY_LIMIT_HOURS,
            cancelationHours: json.cancelatioN_HOURS,
            isDeleted: json.iS_DELETED,
            createDate: json.creatE_DATE,
            createBy: json.creatE_BY,
            createProcess: json.creatE_PROCESS,
            updateDate: json.updatE_DATE,
            updateBy: json.updatE_BY,
            updateProcess: json.updatE_PROCESS,
            isActive: json.iS_ACTIVE
        };
    }
}

export class AppointmentListModel {
    static fromJson(json: any): AppointmentList {
        return {
            patientScheduleId: json.patientScheduleId,
            appointmentDate: json.appointmentDate,
            appointmentTime: json.appointmentTime,
            appointmentType: json.appointmentType,
            practiceBussiness: json.practiceBussiness,
            practiceLocation: json.practiceLocation,
            appointmentIsCancel: json.appointmentIsCancel,
            appointmentIsConfirmed: json.appointmentIsConfirmed,
            appointmentIsReschedule: json.appointmentIsReschedule,
            isTeleHealthVisit: json.isTeleHealthVisit ?? false,
            isVisitSummary: json.visitSummary,
            totalRecords: json.totalRecords,
            reason: json.reason,
            reasonId: json.reasonId,
            encounterId: json.encounterId,
            encounterDate: json.encounterDate,
            encounterType: json.encounterType,
            encounterLocation: json.encounterLocation,
            encounterProvider: json.encounterProvider,
            isEncApptMatch: json.isEncApptMatch
        };
    }
}

export class VisitSummaryModel {
    static fromJson(json: any): VisitSummary {
        return {
            visitSummaryData: json.summaryData,
            visitSummaryDate: json.sDate,
            visitSummaryAttachment: json.healthSummaryAttachement
                ? json.healthSummaryAttachement.map((a: any) => VisitSummaryAttachmentModel.fromJson(a))
                : undefined
        };
    }
}

export class VisitSummaryAttachmentModel {
    static fromJson(json: any): VisitSummaryAttachment {
        return {
            attachmentId: json.attachmentId,
            attachmentType: json.attachmentType,
            attachmentBase64FileContent: json.attachmentBase64FileContent ?? "",
            attachmentFileName: json.attachmentFileName,
            attachmentFileSize: json.attachmentFileSize
        };
    }
}

export class ExistingAppointmentDataModel {
    static fromJson(json: any): ExistingAppointmentData {
        return {
            locationId: json.locationId,
            locationPhoneNumber: json.locationPhoneNumber,
            locationName: json.locationName,
            practicePersonId: json.practicePersonId,
            practicePersonName: json.practicePersonName,
            reasonId: json.reasonId,
            reasonName: json.reasonName,
            reasonForVisit: json.reasonForVisit,
            slotTime: json.slotTime,
            slotDay: json.slotDay,
            slotDate: json.slotDate,
            slotYear: json.slotYear
        };
    }
}

// Model Classes
export class AppointmentModel {
    static fromJson(json: any): LatestAppointment {
        return {
            appointmentDateTime: json.apptDateTime,
            appointmenttHeader: json.apptHeader,
            appointmentReason: json.apptReason,
            isTelehealth: json.isTelehealth ?? false,
            isMarkArrivedButtonEnable: json.isMarkArrivedButtonEnable,
            isApptMarkedAsArrived: json.isApptMarkedAsArrived,
            unconfirmedApptCount: json.unconfirmedApptCount,
            messageUnreadCount: json.messageUnreadCount,
            healthSummaryUnreadCount: json.healthSummaryUnreadCount,
            appointmentId: json.appointmentId,
            locationId: json.locationId,
            locationName: json.locationName,
            practicePersonName: json.practicePersonName,
            intakeLastUpdatedDate: json.intakeLastUpdatedDate,
            isIntakeFormSubmit: json.isIntakeFormSubmit,
            isInsurancePageShow: json.isInsurancePageShow
        };
    }

    static toJson(appointment: LatestAppointment): Record<string, any> {
        return {
            apptDateTime: appointment.appointmentDateTime,
            apptHeader: appointment.appointmenttHeader,
            apptReason: appointment.appointmentReason,
            isTelehealth: appointment.isTelehealth,
            isMarkArrivedButtonEnable: appointment.isMarkArrivedButtonEnable,
            isApptMarkedAsArrived: appointment.isApptMarkedAsArrived,
            unconfirmedApptCount: appointment.unconfirmedApptCount,
            messageUnreadCount: appointment.messageUnreadCount,
            healthSummaryUnreadCount: appointment.healthSummaryUnreadCount,
            appointmentId: appointment.appointmentId,
            locationId: appointment.locationId,
            locationName: appointment.locationName,
            practicePersonName: appointment.practicePersonName,
            intakeLastUpdatedDate: appointment.intakeLastUpdatedDate,
            isIntakeFormSubmit: appointment.isIntakeFormSubmit,
            isInsurancePageShow: appointment.isInsurancePageShow
        };
    }
}

export class LocationModel {
    static fromJson(json: any): Location {
        return {
            logo: json.logo,
            name: json.name,
            days: json.days ? json.days.map((d: any) => DayModel.fromJson(d)) : undefined,
            address: json.address ? AddressModel.fromJson(json.address) : undefined,
            maximeyesLocationId: json.maximeyesLocationId
        };
    }

    static toJson(location: Location): Record<string, any> {
        return {
            logo: location.logo,
            name: location.name,
            days: location.days?.map(d => DayModel.toJson(d)),
            address: location.address ? AddressModel.toJson(location.address) : undefined,
            maximeyesLocationId: location.maximeyesLocationId
        };
    }
}

export class DayModel {
    static fromJson(json: any): Day {
        return {
            name: json.name,
            startTime: json.startTime,
            endTime: json.endTime || ""
        };
    }

    static toJson(day: Day): Record<string, any> {
        return {
            name: day.name,
            startTime: day.startTime,
            endTime: day.endTime || ""
        };
    }
}

export class AddressModel {
    static fromJson(json: any): Address {
        return {
            line1: json.line1 || "",
            line2: json.line2 || "",
            state: json.state || "",
            zipCode: json.zipCode || "",
            phone: json.phone || "",
            city: json.city || "",
            fax: json.fax || ""
        };
    }

    static toJson(address: Address): Record<string, any> {
        return {
            line1: address.line1 || "",
            line2: address.line2 || "",
            state: address.state || "",
            zipCode: address.zipCode || "",
            phone: address.phone || "",
            city: address.city || "",
            fax: address.fax || ""
        };
    }
}

export class AppointmentPracticePersonModel {
    static fromJson(json: any): AppointmentPracticePerson {
        return {
            firstName: json.firsT_NAME || "",
            lastName: json.lasT_NAME || "",
            middleName: json.middlE_NAME || "",
            practicePersonId: json.practicE_PERSON_ID || ""
        };
    }

    static toJson(person: AppointmentPracticePerson): Record<string, any> {
        return {
            firsT_NAME: person.firstName || "",
            lasT_NAME: person.lastName || "",
            middlE_NAME: person.middleName || "",
            practicE_PERSON_ID: person.practicePersonId || ""
        };
    }
}

export class AppointmentReasonModel {
    static fromJson(json: any): AppointmentReason {
        return {
            createdBy: json.createdBy,
            reasonId: json.reasonID,
            reason: json.reasonName,
            isActive: json.isActive,
            isEnabled: json.isEnabled,
            isNewPatientAppt: json.isNewPatientAppt
        };
    }

    static toJson(reason: AppointmentReason): Record<string, any> {
        return {
            createdBy: reason.createdBy,
            reasonID: reason.reasonId,
            reasonName: reason.reason,
            isActive: reason.isActive,
            isEnabled: reason.isEnabled,
            isNewPatientAppt: reason.isNewPatientAppt
        };
    }
}

export class NewCompanyDataModel {
    static fromJson(json: any): NewCompanyData {
        return {
            businessName: json.businessName,
            locations: json.locations ? json.locations.map((l: any) => LocationModel.fromJson(l)) : undefined,
            customerNote: json.customerNote || "",
            practiceNote: json.PracticeNote || "",
            intakePageLandingText: json.intakePageLandingText || "",
            isCustomerhours: json.isCustomerhours || false
        };
    }

    static toJson(data: NewCompanyData): Record<string, any> {
        return {
            businessName: data.businessName,
            locations: data.locations?.map(l => LocationModel.toJson(l)),
            customerNote: data.customerNote || "",
            PracticeNote: data.practiceNote || "",
            intakePageLandingText: data.intakePageLandingText || "",
            isCustomerhours: data.isCustomerhours || false
        };
    }
}

export class AppointmentTimeSlotModel {
    static fromJson(json: any): AppointmentTimeSlot {
        return {
            resourceType: json.resourceType || "",
            appointmentType: json.appointmentType || "",
            apptStartDateTime: json.apptStartDateTime || "",
            apptEndDateTime: json.apptEndDateTime || "",
            reasonIds: json.reasonIds || "",
            reasonName: json.reasonName || "",
            resourceId: json.resourceId || "",
            resourceName: json.resourceName || "",
            providerName: json.providerName || "",
            providerId: json.providerId || "",
            locationId: json.locationId || "",
            locationName: json.locationName || "",
            appointmentId: json.appointmentId || ""
        };
    }

    static toJson(slot: AppointmentTimeSlot): Record<string, any> {
        return {
            resourceType: slot.resourceType || "",
            appointmentType: slot.appointmentType || "",
            apptStartDateTime: slot.apptStartDateTime || "",
            apptEndDateTime: slot.apptEndDateTime || "",
            reasonIds: slot.reasonIds || "",
            reasonName: slot.reasonName || "",
            resourceId: slot.resourceId || "",
            resourceName: slot.resourceName || "",
            providerName: slot.providerName || "",
            providerId: slot.providerId || "",
            locationId: slot.locationId || "",
            locationName: slot.locationName || "",
            appointmentId: slot.appointmentId || ""
        };
    }
}

export interface ValidatePermissionForAppointment {
    access?: boolean;
    response?: string;
}

export interface AppointmentBookingAllow {
    ptScheduleId?: string;
    customerId?: string;
    latestAppointmentDate?: string;
    isAllow?: string;
    isCancelRescheduleAllow?: string;
}

export interface WaitListSlotTime {
    day: string;
    startTime?: string;
    endTime?: string;
    isEnable: boolean;
    isSelected: boolean;
    isStartTimeValidate: boolean;
    isEndTimeValidate: boolean;
}

export interface VisitSummaryTransmit {
    ptcustomerId?: number;
    toEmail?: string;
    isActive?: boolean;
    messageSubject?: string;
    messageText?: string;
    messageDateTime?: string;
    messageStatus?: string;
    isDirectMessage?: boolean;
    kno2Id?: string;
    isCustomer?: boolean;
    isIncoming?: boolean;
    isFavourite?: boolean;
    isReplied?: boolean;
    parentMessageId?: number;
    ptPracticePersonId?: number;
    userId?: number;
    switchUserId?: number;
    visitSummaryAttachmentList?: VisitSummaryAttachment[];
}

export class ValidatePermissionForAppointmentModel {
    static fromJson(json: any): ValidatePermissionForAppointment {
        return {
            access: json.access,
            response: json.response
        };
    }

    static toJson(permission: ValidatePermissionForAppointment): Record<string, any> {
        return {
            access: permission.access,
            response: permission.response
        };
    }
}

export class AppointmentBookingAllowModel {
    static fromJson(json: any): AppointmentBookingAllow {
        return {
            ptScheduleId: json.ptScheduleId,
            customerId: json.customerId,
            latestAppointmentDate: json.latestAppointmentDate,
            isAllow: json.isAllow,
            isCancelRescheduleAllow: json.isCancelRescheduleAllow
        };
    }

    static toJson(booking: AppointmentBookingAllow): Record<string, any> {
        return {
            ptScheduleId: booking.ptScheduleId,
            customerId: booking.customerId,
            latestAppointmentDate: booking.latestAppointmentDate,
            isAllow: booking.isAllow,
            isCancelRescheduleAllow: booking.isCancelRescheduleAllow
        };
    }
}

export class WaitListSlotTimeModel {
    static create(day: string = ""): WaitListSlotTime {
        return {
            day,
            startTime: "",
            endTime: "",
            isEnable: true,
            isSelected: false,
            isStartTimeValidate: true,
            isEndTimeValidate: true
        };
    }
}

export class VisitSummaryTransmitModel {
    static fromJson(json: any): VisitSummaryTransmit {
        return {
            ptcustomerId: json.ptcustomerId,
            toEmail: json.toEmail,
            isActive: json.isActive,
            messageSubject: json.messageSubject,
            messageText: json.messageText,
            messageDateTime: json.messageDateTime,
            messageStatus: json.messageStatus,
            isDirectMessage: json.isDirectMessage,
            kno2Id: json.kno2Id,
            isCustomer: json.isCustomer,
            isIncoming: json.isIncoming,
            isFavourite: json.isFavourite,
            isReplied: json.isReplied,
            parentMessageId: json.parentMessageId,
            ptPracticePersonId: json.ptPracticePersonId,
            userId: json.userId,
            switchUserId: json.switchUserId,
            visitSummaryAttachmentList: json.ptMessageAttachment
                ? json.ptMessageAttachment.map((a: any) => VisitSummaryAttachmentModel.fromJson(a))
                : undefined
        };
    }

    static toJson(transmit: VisitSummaryTransmit): Record<string, any> {
        const data: Record<string, any> = {
            ptcustomerId: transmit.ptcustomerId,
            toEmail: transmit.toEmail,
            isActive: transmit.isActive,
            messageSubject: transmit.messageSubject,
            messageText: transmit.messageText,
            messageDateTime: transmit.messageDateTime,
            messageStatus: transmit.messageStatus,
            isDirectMessage: transmit.isDirectMessage,
            kno2Id: transmit.kno2Id,
            isCustomer: transmit.isCustomer,
            isIncoming: transmit.isIncoming,
            isFavourite: transmit.isFavourite,
            isReplied: transmit.isReplied,
            parentMessageId: transmit.parentMessageId,
            ptPracticePersonId: transmit.ptPracticePersonId,
            userId: transmit.userId,
            switchUserId: transmit.switchUserId
        };

        if (transmit.visitSummaryAttachmentList) {
            data.ptMessageAttachment = transmit.visitSummaryAttachmentList.map(a => VisitSummaryAttachmentModel.fromJson(a));
        }

        return data;
    }
}