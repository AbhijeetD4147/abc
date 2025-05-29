import { AppointmentTimeSlotModel} from '../../model/appointment/AppointmentModel';
import type { DayAndDate, MonthData,SlotTime } from '../../model/appointment/AppointmentModel';
import { AuthenticationService } from '../authentication/UserService';
import { baseWebService } from '../common/BaseWebService';
import { ApiPath } from '../../utils/constants';
import { format } from 'date-fns';

export class AppointmentSlotService {
  // Date format patterns using date-fns format strings
  private dateFormat = "yyyy-MM-dd'T'HH:mm:ss";
  private newFormat = "MMM d, yyyy|hh:mm a";
  private onlyTime = "h:mm a";
  private onlyDate = "MMM d";
  private onlyMonth = "MMMM";
  private onlyDayName = "EEEE";
  private onlyYear = "yyyy";

  // Data arrays
  slotData: AppointmentTimeSlotModel[] = [];
  monthData: MonthData[] = [];
  dayAndDate: DayAndDate[] = [];
  slotTime: SlotTime[] = [];

  finalMonthData: MonthData[] = [];
  finalDayDatesData: DayAndDate[] = [];

  isSlotAvailable: string = "0";

  maximum_Calling_API: number = 0;
  response_Status_Code_API: number | null = null;

  static parseSlot(responseBody: string): AppointmentTimeSlotModel[] {
    const parsed: any[] = JSON.parse(responseBody);
    return parsed.map((json: any) => AppointmentTimeSlotModel.fromJson(json));
  }

  async getAppointmentSlot(
    locationId: string,
    reasonId: string,
    resourceId: string,
    startDate: string,
    endDate: string
  ): Promise<void> {
    try {
      const customerData = {
        fromDate: startDate,
        toDate: endDate,
        locationIds: locationId,
        appointmentTypeIds: '',
        reasonIds: reasonId,
        resourceIds: resourceId,
        pageNo: '0',
        pageSize: '0',
        isOpenSlotsOnly: true,
        callfrom: 'PP',
      };

      const url = ApiPath.baseApi + 'api/Appointment/GetOpenSlot';
      const response = await baseWebService.postWebAPI({
        requestUrl: url,
        dataModel: customerData,
      });

      if (response.status === 200 && response.data === 'SESSION INVALID') {
        this.response_Status_Code_API = 205;
      } else if (response.status === 200) {
        this.response_Status_Code_API = response.status;
        this.slotData = AppointmentSlotService.parseSlot(response.data);
        this.isSlotAvailable = '1';
        await this.modifyData(this.slotData);
      } else if (response.status === 204) {
        this.isSlotAvailable = '2';
        this.response_Status_Code_API = response.status;
      } else {
        this.maximum_Calling_API = this.maximum_Calling_API + 1;
        if (this.maximum_Calling_API < ApiPath.MaxAPICalling) {
          if (response.status === 401) {
            await AuthenticationService.generateToken();
            await this.getAppointmentSlot(
              locationId,
              reasonId,
              resourceId,
              startDate,
              endDate
            );
          } else {
            setTimeout(async () => {
              await this.getAppointmentSlot(
                locationId,
                reasonId,
                resourceId,
                startDate,
                endDate
              );
            }, 1000);
          }
        } else {
          this.response_Status_Code_API = response.status;
        }
      }
    } catch (e) {
      console.error('caught error ::', e);
    }
  }



  async modifyData(slotData: AppointmentTimeSlotModel[]): Promise<void> {
    this.finalMonthData = [];
    this.finalDayDatesData = [];
    this.monthData = [];
    this.dayAndDate = [];

    for (const appointmentModel of slotData) {
      this.addSlot(
        appointmentModel.apptStartDateTime!,
        appointmentModel.resourceType!,
        appointmentModel.appointmentType!,
        appointmentModel.apptStartDateTime!,
        appointmentModel.apptEndDateTime!,
        appointmentModel.reasonIds!,
        appointmentModel.reasonName!,
        appointmentModel.resourceId!,
        appointmentModel.resourceName!,
        appointmentModel.providerName!,
        appointmentModel.providerId!,
        appointmentModel.locationId!,
        appointmentModel.locationName!,
        appointmentModel.appointmentId!,
      );
      this.addDayAndDate(appointmentModel.apptStartDateTime!);
      this.addMonth(appointmentModel.apptStartDateTime!);
    }

    const finalMonths = new Set(this.monthData.map((e) => e.month));
    this.monthData = this.monthData.filter((x) => finalMonths.has(x.month));

    const finalDates = new Set(this.dayAndDate.map((e) => e.date));
    this.dayAndDate = this.dayAndDate.filter((x) => finalDates.has(x.date));

    for (const dayDate of this.dayAndDate) {
      const newSlotTimes: SlotTime[] = [];
      for (const slots of this.slotTime) {
        if (
          dayDate.year === slots.year &&
          dayDate.month === slots.month &&
          dayDate.date === slots.date
        ) {
          newSlotTimes.push(slots);
        }
      }
      this.finalDayDatesData.push({ year: dayDate.year, month: dayDate.month, day: dayDate.day, date: dayDate.date, slotTime: newSlotTimes });
    }

    for (const allMonths of this.monthData) {
      const datesList: DayAndDate[] = [];
      for (const dayDate of this.finalDayDatesData) {
        if (allMonths.month === dayDate.month && allMonths.year === dayDate.year) {
          datesList.push(dayDate);
        }
      }
      this.finalMonthData.push({ year: allMonths.year, month: allMonths.month, dayAndDate: datesList });
    }
  }

  addDayAndDate(timeToConvert: string): void {
    const dateTime = new Date(timeToConvert);
    const month = format(dateTime, this.onlyMonth);
    const date = format(dateTime, this.onlyDate);
    const day = format(dateTime, this.onlyDayName);
    const year = format(dateTime, this.onlyYear);
    const newDate = { year, month, day, date, slotTime: this.slotTime };

    if (this.dayAndDate.length > 0) {
      // Assuming DayAndDate has a custom equality check or you want to compare by a unique identifier
      // For simplicity, this example assumes a basic check or that newDate is unique if not already present
      const exists = this.dayAndDate.some(d => d.year === newDate.year && d.month === newDate.month && d.date === newDate.date);
      if (!exists) {
        this.dayAndDate.push({ year, month, day, date, slotTime: this.slotTime });
      }
    } else {
      this.dayAndDate.push({ year, month, day, date, slotTime: this.slotTime });
    }
  }

  addMonth(timeToConvert: string): void {
    const dateTime = new Date(timeToConvert);
    const year = format(dateTime, this.onlyYear);
    const month = format(dateTime, this.onlyMonth);
    this.monthData.push({ year, month });
  }

  addSlot(
    timeToConvert: string,
    resourceType: string,
    appointmentType: string,
    apptStartDateTime: string,
    apptEndDateTime: string,
    reasonIds: string,
    reasonName: string,
    resourceId: number,
    resourceName: string,
    providerName: string,
    providerId: number,
    locationId: string,
    locationName: string,
    appointmentId: number,
  ): void {
    const dateTime = new Date(timeToConvert);
    const year = format(dateTime, this.onlyYear);
    const month = format(dateTime, this.onlyMonth);
    const date = format(dateTime, this.onlyDate);
    const time = format(dateTime, this.onlyTime);
    const day = format(dateTime, this.onlyDayName);

    this.slotTime.push(
      ({
        day: day,
        month: month,
        year: year,
        date: date,
        time: time,
        resourceType: resourceType,
        appointmentType: appointmentType,
        apptStartDateTime: apptStartDateTime,
        apptEndDateTime: apptEndDateTime,
        reasonIds: reasonIds,
        reasonName: reasonName,
        resourceId: resourceId,
        resourceName: resourceName,
        providerName: providerName,
        providerId: providerId,
        locationId: locationId,
        locationName: locationName,
        id: appointmentId,
      }),
    );
  }

}