import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/ui/Navbar';
import { Button, Icon } from '@ketan_nimase/ui';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AppointmentList } from '../../model/appointment/AppointmentModel';
import WarningPopup from '../../components/ui/WarningPopup';
import dayjs from 'dayjs';

interface AppointmentPageProps {
    patientName?: {
        firstName: string;
        lastName: string;
    };
}

const AppointmentPage: React.FC<AppointmentPageProps> = ({
    patientName = { firstName: 'John', lastName: 'Doe' }
}) => {
    const navigate = useNavigate();
    const [pastAppointments, setPastAppointments] = useState<AppointmentList[]>([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentList[]>([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [filteredPastAppointments, setFilteredPastAppointments] = useState<AppointmentList[]>([]);

    // Warning popup states
    const [showWarningPopup, setShowWarningPopup] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [warningAction, setWarningAction] = useState<'cancel' | 'reschedule' | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentList | null>(null);

    // Mock data - replace with actual API calls
    useEffect(() => {
        const mockAppointments: AppointmentList[] = [
            {
                patientScheduleId: 1,
                appointmentDate: '06/15/2025',
                appointmentTime: '02:50 PM',
                reason: 'First Insight Vision',
                practiceLocation: 'Patient Portal',
                appointmentIsConfirmed: true,
                appointmentIsCancel: false
            },
            {
                patientScheduleId: 2,
                appointmentDate: '06/10/2025',
                appointmentTime: '10:30 AM',
                reason: 'Regular Checkup',
                practiceLocation: 'Main Clinic',
                appointmentIsConfirmed: true,
                appointmentIsCancel: false
            },
            {
                patientScheduleId: 3,
                appointmentDate: '06/25/2025',
                appointmentTime: '03:15 PM',
                reason: 'Follow-up Visit',
                practiceLocation: 'Patient Portal',
                appointmentIsConfirmed: true,
                appointmentIsCancel: false
            }
        ];

        const currentDate = dayjs();
        const past = mockAppointments.filter(apt =>
            dayjs(apt.appointmentDate, 'MM/DD/YYYY').isBefore(currentDate, 'day')
        );
        const upcoming = mockAppointments.filter(apt =>
            dayjs(apt.appointmentDate, 'MM/DD/YYYY').isAfter(currentDate, 'day') ||
            dayjs(apt.appointmentDate, 'MM/DD/YYYY').isSame(currentDate, 'day')
        );

        setPastAppointments(past);
        setUpcomingAppointments(upcoming);
        setFilteredPastAppointments(past);
    }, []);

    // Filter past appointments based on selected date range
    useEffect(() => {
        if (startDate && endDate) {
            const filtered = pastAppointments.filter(apt => {
                const aptDate = dayjs(apt.appointmentDate, 'MM/DD/YYYY');
                const start = dayjs(startDate);
                const end = dayjs(endDate);
                return aptDate.isAfter(start, 'day') && aptDate.isBefore(end, 'day') || aptDate.isSame(start, 'day') || aptDate.isSame(end, 'day');
            });
            setFilteredPastAppointments(filtered);
        } else if (startDate) {
            const filtered = pastAppointments.filter(apt => {
                const aptDate = dayjs(apt.appointmentDate, 'MM/DD/YYYY');
                const start = dayjs(startDate);
                return aptDate.isAfter(start, 'day') || aptDate.isSame(start, 'day');
            });
            setFilteredPastAppointments(filtered);
        } else {
            setFilteredPastAppointments(pastAppointments);
        }
    }, [startDate, endDate, pastAppointments]);

    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleRequestNewAppointment = () => {
        navigate('/request-appointment');
    };

    const handleCalendarClick = () => {
        setShowCalendar(!showCalendar);
    };

    const clearDateFilter = () => {
        setStartDate(null);
        setEndDate(null);
    };

    // Handle cancel appointment
    const handleCancelClick = (appointment: AppointmentList) => {
        setSelectedAppointment(appointment);
        setWarningAction('cancel');
        setWarningMessage(`Are you sure you want to cancel your appointment on ${appointment.appointmentDate} at ${appointment.appointmentTime}?`);
        setShowWarningPopup(true);
    };

    // Handle reschedule appointment
    const handleRescheduleClick = (appointment: AppointmentList) => {
        setSelectedAppointment(appointment);
        setWarningAction('reschedule');
        setWarningMessage(`Are you sure you want to reschedule your appointment on ${appointment.appointmentDate} at ${appointment.appointmentTime}?`);
        setShowWarningPopup(true);
    };

    // Handle warning popup confirmation
    const handleWarningConfirm = () => {
        if (warningAction === 'cancel' && selectedAppointment) {
            // Handle cancel logic here - API call to cancel appointment
            console.log('Cancelling appointment:', selectedAppointment.patientScheduleId);
            // You can add API call here to cancel the appointment
            // After successful cancellation, you might want to refresh the appointments list
        } else if (warningAction === 'reschedule' && selectedAppointment) {
            // Navigate to reschedule page or show reschedule modal
            console.log('Rescheduling appointment:', selectedAppointment.patientScheduleId);
            navigate(`/appointment/reschedule/${selectedAppointment.patientScheduleId}`);
        }

        // Reset popup state
        setShowWarningPopup(false);
        setWarningAction(null);
        setSelectedAppointment(null);
        setWarningMessage('');
    };

    // Handle warning popup cancellation
    const handleWarningCancel = () => {
        setShowWarningPopup(false);
        setWarningAction(null);
        setSelectedAppointment(null);
        setWarningMessage('');
    };

    const renderPastAppointmentItem = (appointment: AppointmentList, index: number) => (
        <div key={appointment.patientScheduleId || index} className="mb-4 p-4 bg-transparent  border-b border-gray-700">
            <div className="text-sm text-gray-600 mb-2">
                {appointment.appointmentDate} | {appointment.appointmentTime} | {appointment.practiceLocation}
            </div>
            <div className="font-medium text-gray-800">
                {appointment.reason}
            </div>
            <div className="text-xs text-green-600 mt-1">
                Status: {appointment.appointmentIsConfirmed ? 'Confirmed' : 'Pending'}
            </div>
        </div>
    );

    const renderUpcomingAppointmentItem = (appointment: AppointmentList, index: number) => (
        <div key={appointment.patientScheduleId || index} className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="font-medium text-blue-800">
                        {appointment.appointmentDate} | {appointment.appointmentTime} | {appointment.practiceLocation}
                    </div>
                    <div className="text-blue-600 mt-1">
                        {appointment.reason}
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                        Status: {appointment.appointmentIsConfirmed ? 'Confirmed' : 'Pending'}
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        style="outline"
                        size="sm"
                        className="text-xs px-3 py-1"
                        onClick={() => handleCancelClick(appointment)}
                    >
                        Cancel
                    </Button>
                    <Button
                        style="outline"
                        size="sm"
                        className="text-xs px-3 py-1"
                        onClick={() => handleRescheduleClick(appointment)}
                    >
                        Reschedule
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen w-screen flex flex-col">
            <Navbar patientName={patientName} />

            {/* Custom CSS for white theme */}
            <style>{`
                .react-datepicker {
                    background-color: white !important;
                    border: 1px solid #e5e7eb !important;
                    border-radius: 8px !important;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
                }
                .react-datepicker__header {
                    background-color: white !important;
                    border-bottom: 1px solid #e5e7eb !important;
                    border-radius: 8px 8px 0 0 !important;
                }
                .react-datepicker__current-month {
                    color: #374151 !important;
                    font-weight: 600 !important;
                }
                .react-datepicker__day-name {
                    color: #6b7280 !important;
                    font-weight: 500 !important;
                }
                .react-datepicker__day {
                    color: #374151 !important;
                    background-color: white !important;
                }
                .react-datepicker__day:hover {
                    background-color: #f3f4f6 !important;
                    border-radius: 4px !important;
                }
                .react-datepicker__day--selected {
                    background-color: #3b82f6 !important;
                    color: white !important;
                    border-radius: 4px !important;
                }
                .react-datepicker__day--in-selecting-range {
                    background-color: #dbeafe !important;
                    color: #1d4ed8 !important;
                    border-radius: 4px !important;
                }
                .react-datepicker__day--in-range {
                    background-color: #dbeafe !important;
                    color: #1d4ed8 !important;
                    border-radius: 4px !important;
                }
                .react-datepicker__day--range-start,
                .react-datepicker__day--range-end {
                    background-color: #3b82f6 !important;
                    color: white !important;
                    border-radius: 4px !important;
                }
                .react-datepicker__navigation {
                    top: 13px !important;
                }
                .react-datepicker__navigation--previous {
                    border-right-color: #6b7280 !important;
                }
                .react-datepicker__navigation--next {
                    border-left-color: #6b7280 !important;
                }
                .react-datepicker__navigation:hover *::before {
                    border-color: #374151 !important;
                }
            `}</style>

            <div className="flex flex-1">
                {/* Left Column - Past Appointments (2/5 width) */}
                <div className="w-1/4 border-r border-black bg-gray-200 flex flex-col">
                    <div className="border-b border-gray-200">
                        <div className="flex items-center p-3 justify-between mb-4">
                            <h1 className="text-4xl font-semibold text-gray-800 flex items-center gap-2">
                                Past Appointments
                            </h1>

                            {/* Calendar Filter */}
                            <div className="relative">
                                <button
                                    onClick={handleCalendarClick}
                                    className="p-2 rounded-lg bg-gray-200 border border-gray-300 hover:bg-gray-300 transition-colors"
                                    title="Filter by date range"
                                >
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </button>

                                {showCalendar && (
                                    <div className="absolute top-12 right-0 z-10">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={onChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsRange
                                            inline
                                            calendarClassName="bg-white"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {(startDate || endDate) && (
                            <>
                                <div className="text-sm text-blue-600 mb-2 px-3">
                                    {startDate && endDate
                                        ? `Showing appointments from ${dayjs(startDate).format('MMM DD, YYYY')} to ${dayjs(endDate).format('MMM DD, YYYY')}`
                                        : startDate
                                            ? `Showing appointments from ${dayjs(startDate).format('MMM DD, YYYY')}`
                                            : ''
                                    }

                                </div>
                                <button
                                    onClick={clearDateFilter}
                                    className="text-sm bg-gray-200 hover:text-blue-800"
                                >
                                    Clear filter
                                </button>
                            </>
                        )}
                    </div>

                    <div className="p-0">
                        {filteredPastAppointments.length > 0 ? (
                            <div className="space-y-4 p-0 border-b ">
                                {filteredPastAppointments.map((appointment, index) =>
                                    renderPastAppointmentItem(appointment, index)
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <svg className="w-30 h-30 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-500">
                                    {(startDate || endDate) ? 'No appointments found for selected period' : 'No past appointments'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Upcoming Appointments (3/5 width) */}
                <div className="w-3/4 flex-1 bg-gray-50 flex flex-col">
                    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-center">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            Upcoming Appointments
                            <div className="ml-3 border-1 border-blue-500 rounded-full p-1 sm:p-5 lg:p-2 flex items-center justify-center hover:border-blue-800 cursor-pointer">
                                <Icon
                                    badgePosition="top"
                                    colorVariant="primary"
                                    height="15px"
                                    isCursorPointer
                                    name="plus"
                                    stroke
                                    width="15px"
                                    onClick={handleRequestNewAppointment}
                                />
                            </div>
                        </h2>
                    </div>

                    <div className="p-6">
                        {upcomingAppointments.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingAppointments.map((appointment, index) =>
                                    renderUpcomingAppointmentItem(appointment, index)
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-700 mb-2">No upcoming appointments</h3>
                                <p className="text-gray-500 mb-6">Schedule your next appointment to stay on top of your health.</p>
                                <Button
                                    onClick={handleRequestNewAppointment}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Request New Appointment
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Warning Popup */}
            {showWarningPopup && (
                <WarningPopup
                    message={warningMessage}
                    onConfirm={handleWarningConfirm}
                    onCancel={handleWarningCancel}
                    iconName={warningAction === 'cancel' ? 'exclamation_triangle' : 'calendar'}
                    confirmText={warningAction === 'cancel' ? 'Yes, Cancel' : 'Yes, Reschedule'}
                    cancelText="No, Keep Appointment"
                    confirmColor={warningAction === 'cancel' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}
                    cancelColor="bg-gray-500 text-white"
                />
            )}
        </div>
    );
};

export default AppointmentPage;