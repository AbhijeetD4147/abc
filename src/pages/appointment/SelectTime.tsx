import React, { useState, useEffect, useCallback } from 'react';
import { format, addDays, isBefore, startOfToday } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import CalendarDateRangePicker from '../../components/ui/CalendarDateRangePicker';
import { Button } from '@ketan_nimase/ui';
import { Navbar } from '../../components/ui/Navbar';

interface AppointmentTimeSlotModel {
  appointmentId: number;
  apptStartDateTime: string;
  apptEndDateTime: string;
  reasonIds: string;
  reasonName: string;
  resourceId: number;
  resourceName: string;
  providerName: string;
  providerId: number;
  locationId: string;
  locationName: string;
  resourceType: string;
  appointmentType: string;
}

interface SlotTime {
  day: string;
  year: string;
  month: string;
  date: string;
  time: string;
  resourceType: string;
  appointmentType: string;
  apptStartDateTime: string;
  apptEndDateTime: string;
  reasonIds: string;
  reasonName: string;
  resourceId: number;
  resourceName: string;
  providerName: string;
  providerId: number;
  locationId: string;
  locationName: string;
  appointmentId: number;
}

interface SelectedTimeSlot {
  date: string;
  slotId: number;
}

const SelectTime: React.FC = () => {
  const navigate = useNavigate();
  // const { appointmentRequest, setAppointmentRequest, selectedProvider, setSelectedLocation, setSelectedProvider, setSelectedReason, selectedReason, selectedLocation } = ();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [slotData, setSlotData] = useState<AppointmentTimeSlotModel[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AppointmentTimeSlotModel | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [slotsIsAvailable, setSlotsIsAvailable] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentDataPass, setAppointmentDataPass] = useState();
  const today = startOfToday();


  const [dateRange, setDateRange] = useState(() => {
    const start = today;
    const end = addDays(start, 6); // Show 7 days including today
    return { start, end };
  });
  // console.log('Reason:', selectedReason);

  const filterDate = (date: Date) => {
    return !isBefore(date, today);
  };

  const groupSlotsByDate = () => {
    const grouped: { [key: string]: AppointmentTimeSlotModel[] } = {};
    slotData.forEach(slot => {
      const date = format(new Date(slot.apptStartDateTime), 'yyyy-MM-dd');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(slot);
    });
    return grouped;
  };

  const isSlotBooked = (slot: AppointmentTimeSlotModel | null) => {
    if (!slot || !slot.apptStartDateTime) return false;
    const slotDate = new Date(slot.apptStartDateTime);
    return isBefore(slotDate, today);
  };

  // const getSlotData = useCallback(async () => {
  //   try {
  //     setIsLoading(true);
  //     // const appointmentSlotService = new AppointmentSlotService();

  //     if (!appointmentRequest.location_id || !appointmentRequest.reason_id || !appointmentRequest.provider_id) {
  //       return;
  //     }

  //     await appointmentSlotService.getAppointmentSlot(
  //       appointmentRequest.location_id?.toString() ?? '',
  //       appointmentRequest.reason_id?.toString() ?? '',
  //       appointmentRequest.provider_id?.toString() ?? '',
  //       format(dateRange.start, 'yyyy-MM-dd'),
  //       format(dateRange.end, 'yyyy-MM-dd')
  //     );

  //     if (appointmentSlotService.getResponseStatusCode() === 200 ||
  //       appointmentSlotService.getResponseStatusCode() === 204) {
  //       setSlotData(appointmentSlotService.getSlotData());
  //       setSlotsIsAvailable(appointmentSlotService.getIsSlotAvailable());
  //     } else {
  //       setShowAlert(true);
  //       setTimeout(() => {
  //         setShowAlert(false);
  //       }, 10000);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching slot data:', error);
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //     }, 10000);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [appointmentRequest, dateRange]);

  // useEffect(() => {
  //   if (!appointmentRequest.location_id && !appointmentRequest.provider_id && !appointmentRequest.reason_id) {
  //     const locationId = localStorage.getItem('locationId');
  //     const providerId = localStorage.getItem('PracticePersonID');
  //     const reasonID = localStorage.getItem('reasonID');
  //     const reasonForVisit = localStorage.getItem('reasonForVisit');

  //     if (locationId && providerId && reasonID) {
  //       setAppointmentRequest(prev => ({
  //         ...prev,
  //         location_id: Number(locationId),
  //         provider_id: Number(providerId),
  //         reason_id: Number(reasonID),
  //       }));
  //     }
  //   }
  //   getSlotData();
  // }, [getSlotData]);

  // const rescheduleAppointment = async (customerId: string, ptScheduleId: string) => {
  //   try {
  //     setIsLoading(true);
  //     const appointmentByCustomerIdService = new AppointmentByCustomerIdService();
  //     await appointmentByCustomerIdService.getappointmentByCustomerIdService(customerId, ptScheduleId);

  //     if (appointmentByCustomerIdService.getResponseStatusCode() === 200) {
  //       const existingApptData = appointmentByCustomerIdService.getExistingApptData();
  //       if (existingApptData) {
  //         setAppointmentDataPass(prev => ({
  //           ...prev,
  //           apptId: existingApptData.identifier[0].value,
  //           reasonID: parseInt(existingApptData.reasonId.toString()),
  //           locationId: parseInt(existingApptData.participant[2].actor.url.split("/")[1]),
  //           practicePersonId: parseInt(existingApptData.participant[3].actor.url.split("/")[1]),
  //           reasonOfVisit: existingApptData.chiefComplaint
  //         }));

  //         navigate('/request-appointment', { state: appointmentDataPass });
  //       }
  //     } else {
  //       setShowAlert(true);
  //       setTimeout(() => {
  //         setShowAlert(false);
  //       }, 10000);
  //     }
  //   } catch (error) {
  //     console.error('Error rescheduling appointment:', error);
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //     }, 10000);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  // const checkTimeSlotAvailability = async (slot: AppointmentTimeSlotModel) => {
  //   // Use the slot passed as an argument, not selectedSlot state
  //   if (!slot) return;

  //   try {
  //     setIsLoading(true);
  //     const appointmentSlotIsBookedOrBlocked = new AppointmentSlotIsBookedOrBlocked();

  //     await appointmentSlotIsBookedOrBlocked.getAppointmentSlotAvailableConfirmation(
  //       slot.appointmentId.toString(),
  //       slot.apptStartDateTime
  //     );

  //     if (appointmentSlotIsBookedOrBlocked.getResponseStatusCode() === 200) {
  //       const response = appointmentSlotIsBookedOrBlocked.getApiResponse();
  //       if (response === "Slot is available") {
  //         const checkSlotAvailability = new CheckSlotAvailability();
  //         await checkSlotAvailability.blockSlotForAppointment(
  //           slot.appointmentId.toString(),
  //           slot.apptStartDateTime
  //         );
  //         if (checkSlotAvailability.getResponseStatusCode() === 200) {
  //           // console.log("In if block");
  //           const slotResponse = checkSlotAvailability.getSlotResponse();
  //           if (slotResponse.split(":")[0] === "1") {
  //             // Store appointmentId and apptStartDateTime in localStorage
  //             localStorage.setItem("appointmentId", slot.appointmentId.toString());
  //             // console.log("Appointment ID:", slot.appointmentId);
  //             localStorage.setItem("apptStartDateTime", slot.apptStartDateTime);

  //             const slotTime: SlotTime = {
  //               day: format(new Date(slot.apptStartDateTime), 'EEEE'),
  //               year: format(new Date(slot.apptStartDateTime), 'yyyy'),
  //               month: format(new Date(slot.apptStartDateTime), 'MMMM'),
  //               date: format(new Date(slot.apptStartDateTime), 'MMM d'),
  //               time: format(new Date(slot.apptStartDateTime), 'h:mm a'),
  //               resourceType: slot.resourceType,
  //               appointmentType: slot.appointmentType,
  //               apptStartDateTime: slot.apptStartDateTime,
  //               apptEndDateTime: slot.apptEndDateTime,
  //               reasonIds: slot.reasonIds,
  //               reasonName: slot.reasonName,
  //               resourceId: slot.resourceId,
  //               resourceName: slot.resourceName,
  //               providerName: slot.providerName,
  //               providerId: slot.providerId,
  //               locationId: slot.locationId,
  //               locationName: slot.locationName,
  //               appointmentId: slot.appointmentId
  //             };

  //             // Create the updated appointmentDataPass object locally
  //             const updatedAppointmentDataPass = {
  //               ...appointmentDataPass,
  //               slotTime: slotTime
  //             };

  //             // Update the state
  //             setAppointmentDataPass(updatedAppointmentDataPass);

  //             // console.log("userAndCompanyInfo being passed:", updatedAppointmentDataPass);

  //             // Use the local updated object, not the state
  //             const appointmentBookingService = new AppointmentBookingService();
  //             const id = localStorage.getItem("patientscheduleid");
  //             // console.log("id:", id);
  //             if (id != null &&
  //               ApiPaths.maximEyesNumber != "0.26.4.0" &&
  //               ApiPaths.maximEyesNumber != "0.26.6.0") {
  //               await appointmentBookingService.checkAppointmentBookingAllow(updatedAppointmentDataPass, 3);
  //             }
  //             if (appointmentBookingService.getResponseStatusCodeAPI2() === 200) {
  //               const responseModel = appointmentBookingService.getAppointmentBookingAllowModel();

  //               // Case 1: Both booking and reschedule not allowed
  //               if (responseModel.isAllow.toLowerCase() === "false" &&
  //                 responseModel.isCancelRescheduleAllow.toLowerCase() === "false") {
  //                 // console.log("Case 1 trigger");
  //                 toast({
  //                   title: "Booking Not Available",
  //                   description: `Your appointment cannot be rescheduled online. Please call the office directly ${updatedAppointmentDataPass.locationMobile}`,
  //                   variant: "destructive"
  //                 });
  //                 navigate('/appointment');
  //                 return;
  //               } else if (responseModel.isAllow.toLowerCase() === "false" && // Case 2: Booking not allowed but reschedule allowed with existing appointment
  //                 responseModel.isCancelRescheduleAllow.toLowerCase() === "true" &&
  //                 responseModel.latestAppointmentDate) {

  //                 // console.log("Case 2 trigger");

  //                 const confirmed = window.confirm(
  //                   `It looks like you already have an appointment booked on ${responseModel.latestAppointmentDate}. Are you wanting to reschedule?`
  //                 );

  //                 if (confirmed) {
  //                   const appointmentByCustomerIdService = new AppointmentByCustomerIdService();
  //                   await appointmentByCustomerIdService.getappointmentByCustomerIdService(
  //                     responseModel.customerId,
  //                     responseModel.ptScheduleId
  //                   );

  //                   if (appointmentByCustomerIdService.getResponseStatusCode() === 200) {
  //                     const existingApptData = appointmentByCustomerIdService.getExistingApptData();
  //                     const updatedDataPass = {
  //                       ...updatedAppointmentDataPass,
  //                       apptId: existingApptData.identifier[0].value,
  //                       reasonId: parseInt(existingApptData.reasonId.toString()),
  //                       locationId: parseInt(existingApptData.participant[2].actor.url.split("/")[1]),
  //                       PracticePersonID: parseInt(existingApptData.participant[3].actor.url.split("/")[1]),
  //                       reasonofVisit: existingApptData.chiefComplaint
  //                     };
  //                     navigate('/request-appointment', { state: updatedDataPass });
  //                   } else {
  //                     setShowAlert(true);
  //                     setTimeout(() => setShowAlert(false), 10000);
  //                   }
  //                 } else {
  //                   toast({
  //                     title: "Booking Not Available",
  //                     description: `This appointment is not available for online booking. Please call our office so our staff can assist you in finding an appointment time ${updatedAppointmentDataPass.locationMobile}`,
  //                     variant: "destructive"
  //                   });
  //                   navigate('/appointment');
  //                 }
  //                 return;
  //               }
  //               // console.log("Case 3 trigger");
  //               // Case 3: Booking allowed - proceed to next step
  //               navigate('/visit-details', { state: updatedAppointmentDataPass });

  //             } else {
  //               setShowAlert(true);
  //               setTimeout(() => setShowAlert(false), 10000);
  //             }

  //           } else {
  //             toast({
  //               title: "Error",
  //               description: slotResponse.split(":")[1],
  //               variant: "destructive"
  //             });
  //           }
  //         } else {
  //           setShowAlert(true);
  //           setTimeout(() => {
  //             setShowAlert(false);
  //           }, 10000);
  //         }
  //       } else {
  //         toast({
  //           title: "Slot Not Available",
  //           description: response,
  //           variant: "destructive"
  //         });
  //         getSlotData();
  //       }
  //     } else {
  //       setShowAlert(true);
  //       setTimeout(() => {
  //         setShowAlert(false);
  //       }, 10000);
  //     }
  //   } catch (error) {
  //     console.log('Error checking slot availability:', error);
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //     }, 10000);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const [selectedTimeSlot, setSelectedTimeSlot] = useState<SelectedTimeSlot | null>(null);

  // const handleSlotSelection = (slot: AppointmentTimeSlotModel, e: React.MouseEvent) => {
  //   e.preventDefault(); // Prevent default form submission
  //   const slotDate = new Date(slot.apptStartDateTime);
  //   if (isBefore(slotDate, today)) return;

  //   const dateStr = format(slotDate, 'yyyy-MM-dd');
  //   setSelectedTimeSlot({
  //     date: dateStr,
  //     slotId: slot.appointmentId
  //   });

  //   setSelectedSlot(slot);
  //   setSelectedDate(slotDate);
  //   setSelectedTime(format(slotDate, 'HH:mm'));

  //   setAppointmentRequest(prev => ({
  //     ...prev,
  //     appointment_date: dateStr,
  //     appointment_time: format(slotDate, 'HH:mm')
  //   }));
  //   checkTimeSlotAvailability(slot);
  // };

  // const handleProceed = () => {
  //   const customerId = localStorage.getItem('ptCustomerIDForBook');
  //   const patientscheduleid = localStorage.getItem('patientscheduleid');
  //   if (!selectedDate || !selectedTime || !selectedSlot) return;
  //   localStorage.setItem("appointmentSlot", selectedSlot.appointmentId.toString());
  //   // console.log("appointmentSlot", selectedSlot.appointmentId);
  //   setAppointmentRequest(prev => ({
  //     ...prev,
  //     appointment_date: format(selectedDate, 'yyyy-MM-dd'),
  //     appointment_time: selectedTime
  //   }));
  //   // Use a short timeout to ensure state is updated before navigation
  //   setTimeout(() => {
  //     navigate("/visit-details");
  //   }, 0);
  // };

  const handleBack = () => {
    navigate("/request-appointment");
  };

  // Generate days of the week for the current date range
  const generateDaysOfWeek = () => {
    const days = [];
    let currentDate = dateRange.start;
    const endDate = dateRange.end;

    while (currentDate <= endDate) {
      days.push({
        date: currentDate,
        dayName: format(currentDate, 'EEEE'),
        dayNumber: format(currentDate, 'dd'),
        month: format(currentDate, 'MMM'),
        fullDate: format(currentDate, 'yyyy-MM-dd')
      });
      currentDate = addDays(currentDate, 1);
    }

    return days;
  };

  const daysOfWeek = generateDaysOfWeek();
  const groupedSlots = groupSlotsByDate();

  // // Update date range when calendar selection changes
  // const handleDateRangeChange = (range: { start: Date; end: Date }) => {
  //   setDateRange(range);
  // };

  // const reasonName = selectedReason ? selectedReason.name : 'No reason selected';

  return (
    <div className="min-h-screen h-screen w-full bg-white flex flex-col overflow-hidden w-screen">
      <Navbar />
      {/* Header */}
      <div className="bg-white py-3 md:py-6 text-center px-4 border-b border-black">
       <h3 className="text-3xl">Request Appointment</h3>
        {/* <p className="text-white mt-1 text-xs md:text-sm lg:text-base">
           Dr. {selectedProvider?.name || 'Select Provider'} | {reasonName || 'Select Reason'}
        </p> */}
      </div>

      {/* Calendar + Slots */}
      <div className="flex flex-col md:flex-row justify-start items-start gap-4 md:gap-8= p-4 md:p-8 lg:p-12 flex-1 overflow-auto">
        {/* Calendar Section */}
        <div className="bg-white rounded-lg p-1 w-full md:w-auto md:sticky md:top-0" style={{ minWidth: 200 }}>
          <CalendarDateRangePicker
            onChange={(range) => setDateRange(range)}
            value={dateRange}
            restrictPastDates={true}
          />
        </div>

        {/* Time Slots Section */}
        <div className="flex-1 w-full overflow-x-auto">
          {showAlert && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 md:px-6 py-3 md:py-4 rounded mb-4 w-full text-sm md:text-base">
              An error occurred while fetching appointment slots. Please try again later.
            </div>
          )}


          {/* {isLoading && <LoadingBar />} */}
          <div className="flex gap-4 md:gap-8 lg:gap-14 justify-start overflow-x-auto pb-4 w-full">
            {daysOfWeek.map((day) => {
              const slots = groupedSlots[day.fullDate] || [];
              return (
                <div key={day.fullDate} className="flex flex-col items-center min-w-[140px] md:min-w-[160px]">
                  <span className="text-gray-700 font-semibold text-base md:text-lg lg:text-xl">
                    {day.dayName}
                  </span>
                  <span className="text-blue-500 font-medium text-sm md:text-md mb-3 md:mb-5">
                    {day.month} {day.dayNumber}
                  </span>
                  <div className="flex flex-col gap-3 w-full">
                    {slots.length === 0 ? (
                      <span className="text-gray-400 text-sm md:text-md text-center h-[48px] md:h-[56px] flex items-center justify-center">No slots</span>
                    ) : (
                      slots.map((slot) => {
                        const slotDate = new Date(slot.apptStartDateTime);
                        // const isSelected =
                        //   selectedTimeSlot?.date === day.fullDate &&
                        //   selectedTimeSlot?.slotId === slot.appointmentId;
                        return (
                          <button
                            key={slot.appointmentId}
                            // onClick={(e) => handleSlotSelection(slot, e)}
                            disabled={isSlotBooked(slot)}
                            className={`w-full h-[48px] md:h-[56px] px-4 md:px-6 text-sm md:text-base rounded-lg border transition-colors flex items-center justify-center ${isSlotBooked(slot)
                              // ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              // : isSelected
                              //   ? 'bg-blue-500 text-white'
                              //   : 'bg-white text-gray-700 hover:bg-blue-50 border-gray-300'
                              }`}
                          >
                            {format(slotDate, 'hh:mm a')}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Footer Buttons */}
      <div className="border-t mt-auto py-3 md:py-4 flex flex-col md:flex-row justify-center gap-3 md:gap-10 items-center px-4 md:px-10">
        <button className="w-full md:w-auto bg-grey-500 min-w-[150px] md:min-w-[200px] px-6 md:px-10 py-2 text-black border border-grey-800 text-sm md:text-base" 
        onClick={handleBack}
        > Back</button>

        <Button
          className="w-full md:w-auto min-w-[150px] md:min-w-[200px] lg:min-w-[500px] px-6 md:px-10 py-2 bg-blue-500 text-sm md:text-base"
          // onClick={handleProceed}
          isDisabled={!selectedSlot || isLoading}
        >
          {isLoading ? 'Loading...' : 'Proceed'}
        </Button>
      </div>
    </div>
  );
  };

export default SelectTime;
