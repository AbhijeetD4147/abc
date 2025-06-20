import { Button, TextArea } from '@ketan_nimase/ui';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAppointment } from '../../context/AppointmentContext';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { format } from 'date-fns';
// import LoadingBar from '@/components/appointment/LoadingBar';
// import { toast } from '@/hooks/use-toast';
// import { ApiPaths } from '@/utils/constantApiPaths';
// import { WebUrlGet } from '@/services/WebUrlGet';
// import { AppointmentOnlineSchedulingService } from '@/services/AppointmentOnlineSchedulingService';
// import { ValidateUser } from '@/services/ValidateUser';

const VisitDetails: React.FC = () => {
  const navigate = useNavigate();
  // const { selectedProvider, appointmentRequest, selectedReason, setAppointmentRequest } = useAppointment();
  const [visitDetails, setVisitDetails] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleBack = () => {
    navigate('/select-time');
  };

  // const rescheduleId = localStorage.getItem('patientscheduleid') || '';

  // const handleProceed = () => {
  //   // console.log("handle proceed pressed");
  //   localStorage.setItem('visitDetails', visitDetails);
  //   setAppointmentRequest(prev => ({
  //     ...prev,
  //     visit_details: visitDetails
  //   }));
  //   if(rescheduleId != ''){
  //     // console.log("On submit pressed");
  //     onSubmit();
  //   }else{
  //     navigate('/verify-patient');
  //   }
  // };

  // const onSubmit = async () => {
  //   // console.log("On submit started");
  //   setIsSubmitting(true);

  //   const firstName = localStorage.getItem('firstName');
  //   const lastName = localStorage.getItem('lastName');
  //   const dob = localStorage.getItem('dob');
  //   const mobile = localStorage.getItem('mobile');
  //   const email = localStorage.getItem('email');
  //   const preferredName = localStorage.getItem('preferredName');

  //   try {
  //     const formattedDob = dob ? format(new Date(dob), 'MM/dd/yyyy') : '';

  //     // Add this console log
  //     // console.log('ApiPaths flags:', {
  //     //   isApptBooking: ApiPaths.isApptBooking,
  //     //   isPatientIntake: ApiPaths.isPatientIntake
  //     // });

  //     //tempory
  //     ApiPaths.isApptBooking = true;

  //     if (ApiPaths.isApptBooking) {
  //       const apptStartDateTime = localStorage.getItem('apptStartDateTime');
  //       // console.log('Appt start date time:', apptStartDateTime);

  //       const appointmentService = new AppointmentOnlineSchedulingService();
  //       const bookingResult = await appointmentService.bookAppointment({
  //         firstName: firstName,
  //         lastName: lastName,
  //         preferredName: preferredName,
  //         mobileNumber: mobile,
  //         email: email,
  //         dob: formattedDob,
  //         slotTime: {
  //           appointmentId: localStorage.getItem('appointmentId') || '',
  //           apptStartDateTime: apptStartDateTime
  //         },
  //         reasonId: parseInt(localStorage.getItem('reasonId') || '0'),
  //         Notes: localStorage.getItem('notes') || '',
  //         reasonofVisit: localStorage.getItem('reasonOfVisit') || '',
  //         PracticePersonID: parseInt(localStorage.getItem('practicePersonId') || '0'),
  //         locationId: parseInt(localStorage.getItem('locationId') || '0'),
  //         apptId: rescheduleId ? parseInt(rescheduleId) : undefined
  //       });

  //       // Check for slot unavailability
  //       if (bookingResult.getResponseStatusCode() === 400) {
  //         toast({
  //           title: 'Slot Unavailable',
  //           description: 'The selected appointment slot is no longer available. Please select another time.',
  //           variant: 'destructive'
  //         });
  //         navigate('/select-slot');
  //         return;
  //       }

  //       // Check for cancellation restrictions
  //       if (bookingResult.getAppointmentBookedStatus()?.includes('Cancellation Restriction')) {
  //         toast({
  //           title: 'Cancellation Restriction',
  //           description: 'There is a cancellation restriction on this appointment. Please contact the office.',
  //           variant: 'destructive'
  //         });
  //         return;
  //       }

  //       if (bookingResult.getResponseStatusCode() === 200) {
  //         // Check if forms need to be filled
  //         const webUrlGet = new WebUrlGet({
  //           formType: 'hippa_form,billing_form,consent_form,welcome_form',
  //           patientNumber: localStorage.getItem('ptCusomterID') || '',
  //           locationId: localStorage.getItem('locationId') || '',
  //           IsFromOffice: 'false',
  //         });

  //         await webUrlGet.getUrl({
  //           formType: 'hippa_form,billing_form,consent_form,welcome_form',
  //           patientNumber: localStorage.getItem('ptCusomterID') || '',
  //           locationId: localStorage.getItem('locationId') || '',
  //           IsFromOffice: 'false'
  //         });

  //         if (webUrlGet.formArray.length === 0 &&
  //           ApiPaths.isInsurancePageShow.toLowerCase() === 'false') {
  //           ApiPaths.isFormsUptoDate = true;
  //         } else {
  //           ApiPaths.isFormsUptoDate = false;
  //         }

  //         navigate('/request-confirm?reschedule=true');
  //       } else {
  //         toast({
  //           title: 'Error',
  //           description: bookingResult.getAppointmentBookedStatus() || 'Something went wrong',
  //           variant: 'destructive'
  //         });
  //       }
  //     } else if (ApiPaths.isPatientIntake) {
  //       // Handle patient intake forms
  //       const webUrlGet = new WebUrlGet({
  //         formType: 'hippa_form,billing_form,consent_form',
  //         patientNumber: localStorage.getItem('ptCusomterID') || '',
  //         locationId: localStorage.getItem('locationId') || '',
  //         IsFromOffice: 'false'
  //       });

  //       await webUrlGet.getUrl({
  //         formType: 'hippa_form,billing_form,consent_form',
  //         patientNumber: localStorage.getItem('ptCusomterID') || '',
  //         locationId: localStorage.getItem('locationId') || '',
  //         IsFromOffice: 'false'
  //       });

  //       if (webUrlGet.formArray.length > 0) {
  //         navigate('/forms', { state: { forms: webUrlGet.formArray } });
  //       } else if (ApiPaths.isInsurancePageShow.toLowerCase() === 'true') {
  //         navigate('/insurance');
  //       } else {
  //         await handleWelcomeForm();
  //       }
  //     } else {
  //       toast({
  //         title: 'Module Disabled',
  //         description: 'Module is disabled by practice.',
  //         variant: 'destructive'
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Submit error:', error);
  //     toast({
  //       title: 'Error',
  //       description: error.message || 'Something went wrong',
  //       variant: 'destructive'
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const handleWelcomeForm = async () => {
  //   const webUrlGet = new WebUrlGet({
  //     formType: 'welcome_form',
  //     patientNumber: localStorage.getItem('ptCusomterID') || '',
  //     locationId: localStorage.getItem('locationId') || '',
  //     IsFromOffice: 'false'
  //   });

  //   await webUrlGet.getUrl({
  //     formType: 'welcome_form',
  //     patientNumber: localStorage.getItem('ptCusomterID') || '',
  //     locationId: localStorage.getItem('locationId') || '',
  //     IsFromOffice: 'false'
  //   });

  //   if (webUrlGet.formArray.length === 0) {
  //     ApiPaths.isFormsUptoDate = true;
  //     navigate('/intake-form-submit');
  //   } else {
  //     navigate('/forms/new', { state: { forms: webUrlGet.formArray } });
  //   }
  // };

  // const [isChecking, setIsChecking] = React.useState(true);
  // const [checkCount, setCheckCount] = React.useState(0);

  // React.useEffect(() => {
  //   if (
  //     !selectedProvider ||
  //     !selectedReason ||
  //     !appointmentRequest?.appointment_date ||
  //     !appointmentRequest?.appointment_time
  //   ) {
  //     if (checkCount < 10) { // Wait up to 10 x 100ms = 1s
  //       const timeout = setTimeout(() => {
  //         setCheckCount(c => c + 1);
  //       }, 100);
  //       return () => clearTimeout(timeout);
  //     } else {
  //       navigate('/appointment');
  //     }
  //   } else {
  //     setIsChecking(false);
  //   }
  // }, [selectedProvider, selectedReason, appointmentRequest.appointment_date, appointmentRequest.appointment_time, navigate, checkCount]);

  // if (isChecking) {
  //   return <LoadingBar message="Loading appointment details..." />;
  // }

  return (
    <>
      {/* {isSubmitting && <LoadingBar message="Processing your appointment..." />} */}
      <div className="min-h-screen bg-white flex flex-col w-screen">
        <div className="w-full bg-blue-500 p-6 text-white">
          <h1 className="text-[35px] font-regular text-center mb-2">Request Appointment</h1>
          {/* <h2 className="text-center font-semibold text-[25px]">
            Dr. {selectedProvider?.name} | {selectedReason.name ? "Select Reason" : ""} | {appointmentRequest.appointment_date && appointmentRequest.appointment_time ? format(new Date(`${appointmentRequest.appointment_date} ${appointmentRequest.appointment_time}`), 'hh:mm a EEEE, MMMM dd, yyyy') : ""}
          </h2> */}
        </div>

        <div className="flex-grow p-8 max-w-4xl mx-auto w-full">
          <div className="relative p-6 rounded-lg">
            {/* <h3 className="text-[77px] font-regular mb-4 text-[#5c5c5c]">Reason for Visit</h3> */}
            {/* <Textarea
              value={visitDetails}
              onChange={(e) => {
                const words = e.target.value.split(/\s+/).filter(Boolean);
                if (words.length <= 200) {
                  setVisitDetails(e.target.value);
                }
              }}
              placeholder="Please describe your reason for visit..."
              className="min-h-[200px] resize-none overflow-auto bg-gray-100"
              style={{
                height: 'calc(1.5em * 13)',
                maxHeight: 'calc(1.5em * 25)',
                minHeight: 'calc(1.5em * 4)',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
              disabled={isSubmitting}
            /> */}
            <TextArea
              label="Reason for visit?"
              placeholder="Enter Description"
              rows={10}
              showTitle
              onChange={(e) => {
                const words = e.target.value.split(/\s+/).filter(Boolean);
                if (words.length <= 200) {
                  setVisitDetails(e.target.value);
                }
              }}
              className="min-h-[200px] resize-none overflow-auto color-gray-500 bg-white"
              // style={{
              //   height: 'calc(1.5em * 13)',
              //   maxHeight: 'calc(1.5em * 25)',
              //   minHeight: 'calc(1.5em * 4)',
              // }}
              onKeyDown={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
          </div>
        </div>

        <div className="flex justify-center p-4 border-t max-w-4xl mx-auto w-full">
          <Button
            onClick={handleBack}
            style="outline"
            className="text-[22px] font-semibold m-2"
            isDisabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            // onClick={handleProceed}
            style="outline"
            className="text-[22px] font-semibold m-2 px-10"
            isDisabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Proceed'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default VisitDetails;
