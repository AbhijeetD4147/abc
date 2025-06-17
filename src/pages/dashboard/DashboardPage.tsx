import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import WarningPopup from '../../components/ui/WarningPopup';
import {
  CalendarX2Icon,
  Settings,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@ketan_nimase/ui"

const menuItems = [
  {
    icon: <Icon
      backgroundShape="circle"
      backgroundShapeColor="primary"
      badgeColor="warning"
      badgeContent="10"
      badgePosition="top"
      badgeSize="medium"
      colorVariant="light"
      height="30px"
      isBackgroundShape
      isCursorPointer
      isbadge
      name="envelope"
      stroke
      width="30px"
    />, label: "Messages"
  },
  {
    icon: <Icon
      backgroundShape="circle"
      backgroundShapeColor="primary"
      badgeColor="warning"
      badgeContent="10"
      badgePosition="top"
      badgeSize="medium"
      colorVariant="light"
      height="30px"
      isBackgroundShape
      isCursorPointer
      isbadge
      name="calendar"
      stroke
      width="30px"
    />, label: "Appointments"
  },
  {
    icon: <Icon
      backgroundShape="circle"
      backgroundShapeColor="primary"
      badgeColor="warning"
      badgeContent="10"
      badgePosition="top"
      badgeSize="medium"
      colorVariant="light"
      height="30px"
      isBackgroundShape
      isCursorPointer
      isbadge
      name="file_data"
      stroke
      width="30px"
    />, label: "Policies & Consent Forms"
  },
  {
    icon: <Icon
      backgroundShape="circle"
      backgroundShapeColor="primary"
      badgeColor="warning"
      badgeContent="10"
      badgePosition="top"
      badgeSize="medium"
      colorVariant="light"
      height="30px"
      isBackgroundShape
      isCursorPointer
      isbadge
      name="forms"
      stroke
      width="30px"
    />, label: "Health Summary"
  },
  {
    icon: <Icon
      backgroundShape="circle"
      backgroundShapeColor="primary"
      badgeColor="warning"
      badgeContent="10"
      badgePosition="top"
      badgeSize="medium"
      colorVariant="light"
      height="30px"
      isBackgroundShape
      isCursorPointer
      isbadge
      name="eye"
      stroke
      width="30px"
    />, label: "Eyewear & Rx"
  },
  {
    icon: <Icon
      backgroundShape="circle"
      backgroundShapeColor="primary"
      badgeColor="warning"
      badgeContent="10"
      badgePosition="top"
      badgeSize="medium"
      colorVariant="light"
      height="30px"
      isBackgroundShape
      isCursorPointer
      isbadge
      name="dollar"
      stroke
      width="30px"
    />, label: "Bills & Payments"
  },

];

const DashboardPage: FC = () => {
  //fillers th=emp below
  const isIntakeFilled = true;
  const lastUpdated = "2025-06-08T14:05:00Z";

  const appointmentTime = "2025-06-10T06:05:00Z";
  const [disabled, setDisabled] = useState(true);

  //temp for the creation of logo
  const initials = `DN`.toUpperCase();

  useEffect(() => {
    const checkTime = () => {
      const now = dayjs();
      const appointment = dayjs(appointmentTime); // pass as prop
      const diff = appointment.diff(now, 'minute');
      setDisabled(diff > 30 || diff < 0); // only enable within 30 min before
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // every minute
    return () => clearInterval(interval);
  }, [appointmentTime]);

  const formattedTime = dayjs(appointmentTime).format("h:mm A on dddd, MMMM D, YYYY");

  //fillers end 

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const hasUpcomingAppointment = true;
  const navigate = useNavigate();

  const handleArrivalConfirm = () => {
    setHasArrived(true);
    setShowConfirmPopup(false);
  };

  const fabItems = [
    { label: "Profile", href: "/profile" },
    { label: "Update Demographics", href: "/update-demographics" },
    { label: "Update Insurance", href: "/update-insurance" },
    { label: "Communication Preferences", href: "/communication-preferences" },
    { label: "Authorized Individuals", href: "/authorized-individuals" },
    { label: "Activity Log", href: "/activity-log" },
    { label: "Opt-Out", href: "/opt-out" },
    { label: "Logout", href: "/logout" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen w-screen font-[Segoe UI]">
      {/* Navbar */}
      <div className="w-full bg-white px-10 py-1 border-b">
        <div className="flex justify-between items-center">
          {/* Logo + Company Name */}
          <div className="flex items-center gap-4">
            <img
              src="#"
              alt={'Logo'}
              className="w-[50px] h-[50px] object-contain"
            />
            <div className="text-2xl text-black font-normal">Dynamic Company Name</div>
          </div>

          {/* User Info + Menu */}
          <div className="flex items-center gap-4 relative">
            <div
              className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-[18px] font-bold cursor-pointer hover:bg-blue-600 transition"
              onClick={() => navigate("/profile")}
            >
              {initials}
            </div>

            <span className="text-[22px] font-normal">Dynamic Patient Name</span>

            {/* FAB Menu */}
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-blue-100 cursor-pointer transition-colors duration-200"
              >
                {isOpen ? (
                  <X size={30} stroke="#3556fd" strokeWidth={1} />
                ) : (
                  <Settings size={30} stroke="#3556fd" strokeWidth={1} />
                )}
              </div>

              {isOpen && (
                <ul className="absolute right-0 mt-2 min-w-max max-w-xs bg-white border border-gray-200 rounded shadow-md z-50">
                  {fabItems.map(({ label, href }) => (
                    <li key={label} className="border-b last:border-b-0 border-gray-200 cursor-pointer ">
                      <a
                        href={href}
                        className="block px-4 py-2 font-normal no-underline hover:text-blue-500 hover:bg-gray-100 text-black transition-all duration-200"
                      >
                        {label}
                      </a>

                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[50%] bg-blue-500 text-white flex flex-col justify-center items-center gap-4 px-16">
          <div className="grid grid-cols-3 gap-y-6 gap-x-1">
            {menuItems.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="border-2 rounded-full p-8 flex items-center justify-center hover:bg-blue-600">
                  {item.icon}
                </div>
                <p className="text-xl mt-3">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="w-[50%] bg-white p-10 flex flex-col justify-between">
          {hasUpcomingAppointment ? (
            <>
              {/* Upcoming Appointment */}
              {showConfirmPopup && (
                <WarningPopup
                  message={`Are you sure you want to mark yourself as arrived for your ${formattedTime} appointment with Dr. Smith?`}
                  onConfirm={handleArrivalConfirm}
                  onCancel={() => setShowConfirmPopup(false)}
                />
              )}

              {/* Upcoming Appointment */}
              <div className="mt-10">
                {!hasArrived ? (
                  <>
                    <h2 className="text-4xl font-normal mb-4 pt-20">You have an upcoming appointment</h2>
                    <p className="text-2xl font-normal text-gray-600">
                      {formattedTime}
                      <br />
                      Reason: Annual Checkup
                    </p>
                    <div className="flex gap-12 mt-10">
                      <div className="flex flex-col items-center cursor-pointer group">
                        <div className="w-18 h-18 flex items-center justify-center rounded-full p-3 group-hover:bg-blue-200 transition-colors">
                          <Icon
                            backgroundShape="circle"
                            backgroundShapeColor="#f5f5f5"
                            badgeColor="success"
                            colorVariant="dark"
                            height="50px"
                            isCursorPointer
                            name="calendar"
                            stroke
                            width="50px"
                          />
                        </div>
                        <span className="text-[25px] mt-2 text-blue-400">Cancel</span>
                      </div>
                      <div className="flex flex-col items-center cursor-pointer group">
                        <div className="w-18 h-18 flex items-center justify-center rounded-full p-3 group-hover:bg-blue-200 transition-colors">
                          <Icon
                            backgroundShape="circle"
                            backgroundShapeColor="#f5f5f5"
                            badgeColor="success"
                            colorVariant="dark"
                            height="50px"
                            isCursorPointer
                            name="refresh_sync"
                            stroke
                            width="50px"
                          />
                        </div>
                        <span className="text-[25px] mt-2 text-blue-500">Reschedule</span>
                      </div>
                      <div
                        className={`flex flex-col items-center group ${disabled ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                        onClick={() => !disabled && setShowConfirmPopup(true)}
                      >
                        <div className="w-18 h-18 flex items-center justify-center rounded-full p-3 group-hover:bg-blue-200 transition-colors">
                          <Icon
                            backgroundShape="circle"
                            backgroundShapeColor="#f5f5f5"
                            badgeColor="success"
                            colorVariant="dark"
                            height="50px"
                            isCursorPointer
                            name="location"
                            stroke
                            width="50px"
                            className={` ${disabled ? 'text-gray-400' : 'text-blue-500'}`} />
                        </div>
                        <span className={`text-[25px] mt-2 ${disabled ? 'text-gray-400' : 'text-blue-500'}`}>
                          Mark As Arrived
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-start justify-center pt-20 gap-6 mt-10">
                    {/* Icon + Label */}
                    <div className="flex flex-col items-center text-center min-w-[100px] mr-6">
                      <Icon
                        backgroundShape="circle"
                        backgroundShapeColor="#f5f5f5"
                        badgeColor="success"
                        colorVariant="success"
                        height="70px"
                        isCursorPointer
                        name="location"
                        stroke
                        width="70px"
                      />
                      <span className="text-[25px] text-green-500 mt-4">Arrived</span>
                    </div>

                    {/* Text Paragraph */}
                    <p className="text-xl text-gray-600 text-left max-w-sm leading-snug ">
                      You have arrived for your {dayjs(appointmentTime).format("h:mm A")} appointment with Dr. Smith. Someone will assist you shortly.
                    </p>
                  </div>

                )}
              </div>


              {/* Speed Up Section */}
              <div className="mt-1 border-t pt-6">
                {!isIntakeFilled ? (
                  // When intake is NOT filled
                  <>
                    <h3 className="text-3xl font-normal mb-2">Speed up your arrival</h3>
                    <p className="text-xl text-gray-600 mb-20">
                      Save time at the doctor's office by filling{" "}
                      <a href="#" className="text-blue-500 underline">
                        Intake Form
                      </a>
                    </p>
                  </>
                ) : (
                  // When intake IS filled
                  <>
                    <h3 className="text-3xl font-normal mb-2">Intake Form</h3>
                    <p className="text-xl text-gray-600">
                      Filled on{" "}
                      <span className="font-medium text-black">
                        {new Date(lastUpdated).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-xl text-gray-600 mb-20">
                      <a href="#" className="text-blue-500 underline">
                        View/Update Again
                      </a>
                    </p>
                  </>
                )}
              </div>
            </>
          ) : (
            // No Upcoming Appointment UI
            <div className="flex flex-col justify-center min-h-screen pl-24 -mt-10">
              <div className="flex flex-col items-center">
                <CalendarX2Icon className="w-24 h-24 text-gray-400 mb-6 stroke-1" />
                <p className="text-2xl text-gray-500 mb-6">No upcoming appointment</p>
                <button className="bg-blue-500 text-white text-lg px-20 py-2 rounded w-full max-w-sm hover:bg-blue-600 transition">
                  Request New Appointment
                </button>
              </div>
            </div>

          )}

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
