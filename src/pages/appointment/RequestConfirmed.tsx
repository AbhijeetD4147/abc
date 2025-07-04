import { Button, Icon } from '@ketan_nimase/ui';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useAppointment } from '../../context/AppointmentContext';
// import { WebUrlGet } from '../../services/WebUrlGet';
// import { useMobile } from '@/hooks/use-mobile';

interface AppointmentRequest {
  appointment_id?: number;
  location_id?: number | null;
  provider_id?: number | null;
  reason_id?: number | null;
  appointment_date?: string;
  appointment_time?: string;
  patient_name?: string;
  email?: string;
  patient_details?: any;
}

const RequestConfirmedScreen = () => {
  // const { appointmentRequest, selectedProvider } = useAppointment();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Check if this is a reschedule operation
  const isReschedule = searchParams.get('reschedule') === 'true';
  const confirmationTitle = isReschedule ? 'Appointment Rescheduled' : 'Appointment Confirmed';


  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="w-full md:w-1/3 p-12 flex flex-col items-center justify-center py-16 px-8 text-white min-h-[340px]" style={{ backgroundColor: '#05afaf' }}>
        <div className="text-center max-w-md">
          <div className="mb-8">
            <Icon
              name="calendar"
              colorVariant="light"
              height="80px"
              isCursorPointer
              stroke
              width="80px"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-6">
            {confirmationTitle}
          </h2>
          {/* <p className="text-xl mb-4">Dr. {selectedProvider?.name || 'Doctor'}</p>
          <p className="text-lg mb-4">
            {appointmentRequest?.appointment_time || '00:00 AM'}{' '}
            {appointmentRequest?.appointment_date
              ? new Date(appointmentRequest.appointment_date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
              : 'Monday, January 01, 2001'}
          </p> */}
          <p className="text-lg">We will send you a confirmation message.</p>
        </div>
      </div>

      {/* Right Panel - 70% Width */}
      <div className="flex-1 flex flex-col justify-center px-5 md:px-0">
        <div className="max-w-xl mx-auto py-14 w-full flex flex-col items-center">
          <>
            <h2 className="text-2xl md:text-3xl font-normal text-black mb-7 mt-2 text-center">
              Complete Patient Intake Form
            </h2>
            <p className="text-base text-black mb-10 text-center">
              Save time at doctor's office by filling out questionaries.
            </p>
          </>
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center">

            <button
              onClick={() => navigate('/appointment')}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-16 rounded-md text-lg transition-colors duration-200"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestConfirmedScreen;
