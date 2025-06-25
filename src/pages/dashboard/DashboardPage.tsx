import { FC, useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import WarningPopup from '../../components/ui/WarningPopup';
import { toast } from "react-toastify";
import {
  CalendarX2Icon,
  Settings,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Icon, Loader } from "@ketan_nimase/ui";
import { AppointmentService } from "../../services/appointment/AppointmentService";
import HomeService from "../../services/home/HomeService";
// Change this import
import GetModulePermissionServices from "../../services/common/ModuleServices";
// Add this import
import GetModulePermissionByPracticeServices from "../../services/common/ModulePracticeService";
import { ModulePermissionByPracticeModel } from "../../model/common/ModulePermissionModel";
import { AuthenticationAuthUserService } from "../../services/authentication/AuthUserService";
import { GlobalParams } from "../../utils/GlobalParameters";
import { ApiPath } from "../../utils/constants";
import React from "react";



const DashboardPage: FC = () => {

  // State variables for API data
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAppointmentData, setLoadingAppointmentData] = useState<boolean>(false);
  const [logo, setLogo] = useState<string>("");
  const [userName, setUserName] = useState<string>(""); // Add this line for user name
  const [userInitials, setUserInitials] = useState<string>("DN"); // Add this line for user initials
  const [hasUpcomingAppointment, setHasUpcomingAppointment] = useState<boolean>(false);
  const [appointmentData, setAppointmentData] = useState({
    appointmentDateTime: "",
    appointmentHeader: "",
    appointmentReason: "",
    appointmentId: 0,
    isTelehealth: false,
    isMarkArrivedButtonEnable: false,
    isAppointmentMarkedAsArrived: false,
    practicePersonName: "",
    messageUnreadCount: "0",
    appointmentUnreadCount: "0",
    healthSummaryUnreadCount: "0",
  });
  const [intakeData, setIntakeData] = useState({
    isIntakeFormSubmit: false,
    intakeLastUpdatedDate: "",
  });

  // Existing state variables
  const [disabled, setDisabled] = useState(true);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Create service instances
  const appointmentService = new AppointmentService();
  const homeService = new HomeService();
  // Use both services
  const modulePermissionServices = new GetModulePermissionServices();
  const modulePermissionByPracticeServices = new GetModulePermissionByPracticeServices();
  const authUserService = new AuthenticationAuthUserService();
  const hasBadgeCondition = appointmentData.appointmentUnreadCount &&
    appointmentData.appointmentUnreadCount !== "0" &&
    parseInt(appointmentData.appointmentUnreadCount) > 0;
  const menuItems = [
    {
      icon: <Icon
        colorVariant="light"
        height="60px"
        isCursorPointer
        name="envelope"
        stroke
        width="60px"
        onClick={() => {
          navigate('/messages')
        }}
        {...(appointmentData.messageUnreadCount &&
          appointmentData.messageUnreadCount !== "0" &&
          parseInt(appointmentData.messageUnreadCount) > 0
          ? {
            isbadge: true,
            badgeContent: appointmentData.messageUnreadCount,
            badgeColor: "warning",
            badgePosition: "top"
          } : {})}
      />, label: "Messages"
    },
    {
      icon: <Icon
        colorVariant="light"
        height="60px"
        isCursorPointer
        name="calendar"
        stroke
        width="60px"
        onClick={() => {
          navigate('/appointment')
        }}
        {...(appointmentData.appointmentUnreadCount &&
          appointmentData.appointmentUnreadCount !== "0" &&
          parseInt(appointmentData.appointmentUnreadCount) > 0
          ? {
            isbadge: true,
            badgeContent: appointmentData.appointmentUnreadCount,
            badgeColor: "warning",
            badgePosition: "top"
          } : {})}
      />, label: "Appointments"
    },
    {
      icon: <Icon
        colorVariant="light"
        height="60px"
        isCursorPointer
        name="file_data"
        stroke
        width="60px"
        onClick={() => {
          navigate('/policies-form')
        }}
      />, label: "Policies & Consent Forms"
    },
    {
      icon: <Icon
        colorVariant="light"
        height="60px"
        isCursorPointer
        name="forms"
        stroke
        width="60px"
        onClick={() => {
          navigate('/health-summary')
        }}
        {...(appointmentData.healthSummaryUnreadCount &&
          appointmentData.healthSummaryUnreadCount !== "0" &&
          parseInt(appointmentData.healthSummaryUnreadCount) > 0
          ? {
            isbadge: true,
            badgeContent: appointmentData.healthSummaryUnreadCount,
            badgeColor: "warning",
            badgePosition: "top"
          } : {})}
      />, label: "Health Summary"
    },
    {
      icon: <Icon
        colorVariant="light"
        height="60px"
        isCursorPointer
        name="eye"
        stroke
        width="60px"
        onClick={() => {
          navigate('/')
        }}
      />, label: "Eyewear & Rx"
    },
    {
      icon: <Icon
        colorVariant="light"
        height="60px"
        isCursorPointer
        name="dollar"
        stroke
        width="60px"
        onClick={() => {
          navigate('/')
        }}
      />, label: "Bills & Payments"
    },
  ];

  // Function to get module permissions from IsUrlExist API
  const getModulePermission = useCallback(async () => {
    try {
      setLoading(true);

      // First call IsUrlExist API
      await modulePermissionByPracticeServices.getModulePermission();
      if (modulePermissionByPracticeServices.getResponse_Status_Code_API() === 200) {
        const response = modulePermissionByPracticeServices.getModulePermissionByPracticeModel();
        if (response && response.exist) {
          // Update ApiPath with module permissions
          ApiPath.isIntakeModuleEnabled = response.isIntakeModuleEnabled || false;
          // Other module permissions can be set here as needed
        }

        // Proceed to get switch users list
        await getSwitchUsers();
      } else {
        if (modulePermissionByPracticeServices.getResponse_Status_Code_API() !== 205) {
          setLoading(false);
          toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
        }
      }
    } catch (error) {
      console.error("Error fetching module permissions:", error);
      toast.error('An unexpected error has occurred. Please try again later.');
      setLoading(false);
    }
  }, []);

  // Function to get logo
  const getLogo = useCallback(async () => {
    try {
      await homeService.getHomeData("Other");
      if (homeService.response_Status_Code_API === 200) {
        const homeDataList = homeService.homeDataModel;
        if (homeDataList && homeDataList.length > 0 && homeDataList[0].logo) {
          setLogo(homeDataList[0].logo);
          GlobalParams.LOGO = homeDataList[0].logo;
        }
      } else {
        if (homeService.response_Status_Code_API !== 205) {
          setLoading(false);
          toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
        }
      }
    } catch (error) {
      console.error("Error fetching logo:", error);
      toast.error('An unexpected error has occurred. Please try again later.');
      setLoading(false);
    }
  }, []); // No dependencies

  // Function to get latest appointment data
  const getLatestAppointment = useCallback(async () => {
    try {
      setLoading(true);
      setLoadingAppointmentData(true);

      await appointmentService.getLatestAppointmentData();
      if (appointmentService.response_Status_Code_API_1 === 200) {
        const latestAppointment = appointmentService.latestAppointmentModel;

        if (latestAppointment) {
          setAppointmentData({
            appointmentDateTime: latestAppointment.appointmentDateTime || "",
            appointmentHeader: latestAppointment.appointmentHeader || "", // Note the double 't'
            appointmentReason: latestAppointment.appointmentReason || "",
            appointmentId: latestAppointment.appointmentId || 0,
            isTelehealth: latestAppointment.isTelehealth || false,
            isMarkArrivedButtonEnable: latestAppointment.isMarkArrivedButtonEnable || false,
            isAppointmentMarkedAsArrived: latestAppointment.isApptMarkedAsArrived || false,
            practicePersonName: latestAppointment.practicePersonName || "",
            messageUnreadCount: latestAppointment.messageUnreadCount || "0",
            appointmentUnreadCount: latestAppointment.unconfirmedApptCount || "0",
            healthSummaryUnreadCount: latestAppointment.healthSummaryUnreadCount || "0",
          });

          setIntakeData({
            isIntakeFormSubmit: latestAppointment.isIntakeFormSubmit || false,
            intakeLastUpdatedDate: latestAppointment.intakeLastUpdatedDate || "",
          });

          ApiPath.isInsuranceScreenShowEnable = latestAppointment.isInsurancePageShow || false;
          setHasUpcomingAppointment(latestAppointment.appointmentId ? true : false);
          setHasArrived(latestAppointment.isApptMarkedAsArrived || false);
        }

        setLoadingAppointmentData(false);
        setLoading(false);
      } else {
        if (appointmentService.response_Status_Code_API_1 !== 205) {
          setLoading(false);
          setLoadingAppointmentData(false);
          toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
        }
      }
    } catch (error) {
      console.error("Error fetching appointment data:", error);
      toast.error('An unexpected error has occurred. Please try again later.');
      setLoading(false);
      setLoadingAppointmentData(false);
    }
  }, []); // No dependencies

  // Function to mark appointment as arrived
  const markAppointmentAsArrive = async () => {
    try {
      setLoading(true);
      await appointmentService.updateAppointmentMarkArrivedInMax(appointmentData.appointmentId);
      if (appointmentService.response_Status_Code_API_10 === 200) {
        setHasArrived(true);
        setShowConfirmPopup(false);
      } else {
        if (appointmentService.response_Status_Code_API_10 !== 205) {
          setLoading(false);
          toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error marking appointment as arrived:", error);
      toast.error('An unexpected error has occurred. Please try again later.');
      setLoading(false);
    }
  };

  // Function to cancel appointment
  const cancelAppointment = async () => {
    try {
      setLoading(true);
      await appointmentService.cancelAppointment(appointmentData.appointmentId);

      if (appointmentService.response_Status_Code_API_7 === 200) {
        const response = appointmentService.cancelAppointmentResponse;
        if (response !== "Appointment updated successfully.") {
          toast.warning(response || "Could not cancel appointment");
        } else {
          toast.success("Appointment cancelled successfully");
          // Refresh appointment data
          await getLatestAppointment();
        }
      } else {
        if (appointmentService.response_Status_Code_API_7 !== 205) {
          toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error('An unexpected error has occurred. Please try again later.');
      setLoading(false);
    }
  };

  // Function to get reschedule appointment permission
  const getRescheduleAppointmentPermission = async () => {
    try {
      setLoading(true);
      await appointmentService.validateRescheduleAppointmentPermission(appointmentData.appointmentId);

      if (appointmentService.response_Status_Code_API_8 === 200) {
        const result = appointmentService.validatePermissionForAppointment;
        if (result && result.access) {
          // Navigate to reschedule page
          navigate("/request-appointment", {
            state: { appointmentId: appointmentData.appointmentId }
          });
        } else {
          toast.warning(result?.response || "You don't have permission to reschedule this appointment");
        }
      } else {
        if (appointmentService.response_Status_Code_API_8 !== 205) {
          toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error checking reschedule permission:", error);
      toast.error('An unexpected error has occurred. Please try again later.');
      setLoading(false);
    }
  };

  // Function to get switch users
  const getSwitchUsers = useCallback(async () => {
    try {
      await authUserService.getSwitchUsers();
      if (authUserService.response_Status_Code_API_2 === 200) {
        // Process switch users data
        const switchUsers = authUserService.getSwitchUserByIdModel;
        if (switchUsers && switchUsers.length > 0) {
          // Get the current user's data
          const currentUser = switchUsers.find(user => user.userId === Number(GlobalParams.USER_ID));
          if (currentUser) {
            // Set user name and initials
            if (currentUser.userName) {
              setUserName(currentUser.userName);
              GlobalParams.USER_INITIAL = currentUser.userInitials || "";
            }
            if (currentUser.userInitials) {
              setUserInitials(currentUser.userInitials);
            }
          }
        }

        // Then proceed to get appointment data
        await getLatestAppointment();
      } else {
        if (authUserService.response_Status_Code_API_2 !== 205) {
          setLoading(false);
          toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
        }
      }
    } catch (error) {
      console.error("Error fetching switch users:", error);
      toast.error('An unexpected error has occurred. Please try again later.');
      setLoading(false);
    }
  }, []);

  // Function to get module permissions
  // const getModulePermission = useCallback(async () => {
  //   try {
  //     setLoading(true);

  //     await modulePermissionServices.getModulePermission();
  //     if (modulePermissionServices.response_Status_Code_API === 200) {
  //       // Cast to the correct type
  //       const response = modulePermissionServices.modulePermissionModel as unknown as ModulePermissionByPracticeModel;
  //       if (response) {
  //         // Update ApiPath with module permissions
  //         ApiPath.isIntakeModuleEnabled = response.isIntakeModuleEnabled || false;
  //         // Other module permissions can be set here as needed
  //       }

  //       // Proceed to get switch users list
  //       await getSwitchUsers();
  //     } else {
  //       if (modulePermissionServices.response_Status_Code_API !== 205) {
  //         setLoading(false);
  //         toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching module permissions:", error);
  //     toast.error('An unexpected error has occurred. Please try again later.');
  //     setLoading(false);
  //   }
  // }, []);


  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      await getModulePermission();
    };

    initializeData();
  }, []); // Remove dependencies to ensure it only runs once on mount

  // Check if appointment is within 30 minutes to enable "Mark as Arrived" button
  useEffect(() => {
    const checkTime = () => {
      if (!appointmentData.appointmentDateTime) return;

      const now = dayjs();
      const appointment = dayjs(appointmentData.appointmentDateTime);
      const diff = appointment.diff(now, 'minute');
      setDisabled(diff > 30 || diff < 0 || !appointmentData.isMarkArrivedButtonEnable);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // every minute
    return () => clearInterval(interval);
  }, [appointmentData.appointmentDateTime, appointmentData.isMarkArrivedButtonEnable]);

  // Format appointment time for display
  const formattedTime = appointmentData.appointmentDateTime ?
    dayjs(appointmentData.appointmentDateTime).format("h:mm A on dddd, MMMM D, YYYY") : "";

  // Handle arrival confirmation
  const handleArrivalConfirm = () => {
    markAppointmentAsArrive();
  };

  // FAB menu items
  const fabItems = [
    { label: "Profile", href: "/profile" },
    { label: "Update Demographics", href: "/update-demographics" },
    { label: "Update Insurance", href: "/update-insurance" },
    { label: "Communication Preferences", href: "/communication-preferences" },
    { label: "Authorized Individuals", href: "/authorized-individuals" },
    { label: "Activity Log", href: "/activity-logs" },
    { label: "Opt-Out", href: "/opt-out" },
    { label: "Logout", href: "/logout" },
  ];
  const navigationPaths = [
    '/messages',
    '/appointment', 
    '/policies-form',
    '/health-summary',
    '/eyewear-rx',
    '/bills-payments'
  ];

  return (
    <div className="flex flex-col h-screen w-screen font-[Segoe UI]">
      {/* Navbar */}
      <div className="w-full bg-white px-4 sm:px-6 lg:px-10 py-2 border-b">
        <div className="flex justify-between items-center">
          {/* Logo + Company Name */}
          <div className="flex items-center gap-2 sm:gap-4">
            <img
              src={GlobalParams.LOGO ? `data:image/jpeg;base64,${GlobalParams.LOGO}` : '#'}
              alt={'Logo'}
              className="w-12 h-12 sm:w-14 sm:h-14 m-0 object-contain"
            />
            <div className="text-lg sm:text-xl lg:text-2xl text-black font-normal hidden sm:block">
              {GlobalParams.COMPANY_NAME}
            </div>
          </div>

          {/* User Info + Menu */}
          <div className="flex items-center gap-2 sm:gap-4 relative">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm sm:text-[18px] font-bold cursor-pointer hover:bg-blue-600 transition"
              onClick={() => navigate("/profile")}
            >
              {userInitials}
            </div>

            <span className="text-base sm:text-lg lg:text-[22px] font-normal hidden sm:block">{userName || "Dynamic Patient Name"}</span>

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
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <Loader loaderType="spin" />
        </div>
      ) : (
        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-[50%] bg-blue-500 text-white flex flex-col justify-center items-center gap-4 px-4 sm:px-8 lg:px-16 py-8 lg:py-0">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-1">
              {menuItems.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div 
                    className="border-2 rounded-full p-4 sm:p-6 lg:p-8 flex items-center justify-center hover:bg-blue-600 cursor-pointer"
                    onClick={() => navigate(navigationPaths[idx])}
                  >
                    {React.cloneElement(item.icon, {
                      ...((() => {
                        const count = idx === 0 ? appointmentData.messageUnreadCount :
                          idx === 1 ? appointmentData.appointmentUnreadCount :
                            idx === 3 ? appointmentData.healthSummaryUnreadCount : "0";
                        return count && count !== "0" && parseInt(count) > 0 ? {
                          isbadge: true,
                          badgeContent: count,
                          badgeColor: "warning",
                          badgePosition: "top"
                        } : {};
                      }))()
                    })}
                  </div>
                  <p className="text-base sm:text-lg lg:text-xl mt-2 lg:mt-3">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-[50%] bg-white p-4 sm:p-6 lg:p-10 flex flex-col justify-between">
            {hasUpcomingAppointment ? (
              <>
                {/* Upcoming Appointment */}
                {showConfirmPopup && (
                  <WarningPopup
                    message={`Are you sure you want to mark yourself as arrived for your ${formattedTime} appointment with ${appointmentData.practicePersonName}?`}
                    onConfirm={handleArrivalConfirm}
                    onCancel={() => setShowConfirmPopup(false)}
                  />
                )}

                {/* Upcoming Appointment */}
                <div className="mt-4 sm:mt-6 lg:mt-10">
                  {!hasArrived ? (
                    <>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal mb-4 pt-8 sm:pt-12 lg:pt-20">{appointmentData.appointmentHeader || "You have an upcoming appointment"}</h2>
                      <p className="text-lg sm:text-xl lg:text-2xl font-normal text-gray-600">
                        {formattedTime}
                        <br />
                        Reason: {appointmentData.appointmentReason || "Annual Checkup"}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 mt-6 sm:mt-8 lg:mt-10">
                        <div className="flex flex-col items-center cursor-pointer group" onClick={cancelAppointment}>
                          <div className="w-18 h-18 flex items-center justify-center rounded-full p-3 group-hover:bg-blue-200 transition-colors">
                            <Icon
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
                        <div className="flex flex-col items-center cursor-pointer group" onClick={getRescheduleAppointmentPermission}>
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
                        You have arrived for your {dayjs(appointmentData.appointmentDateTime).format("h:mm A")} appointment with {appointmentData.practicePersonName}. Someone will assist you shortly.
                      </p>
                    </div>
                  )}
                </div>

                {/* Speed Up Section */}
                <div className="mt-1 border-t pt-6">
                  {!intakeData.isIntakeFormSubmit ? (
                    // When intake is NOT filled
                    <>
                      <h3 className="text-3xl font-normal mb-2">Speed up your arrival</h3>
                      <p className="text-xl text-gray-600 mb-20">
                        Save time at the doctor's office by filling{" "}
                        <a href="/intake-form" className="text-blue-500 underline">
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
                          {intakeData.intakeLastUpdatedDate ? new Date(intakeData.intakeLastUpdatedDate).toLocaleDateString() : ""}
                        </span>
                      </p>
                      <p className="text-xl text-gray-600 mb-20">
                        <a href="/intake-form" className="text-blue-500 underline">
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
                  <button
                    className="bg-blue-500 text-white text-lg px-20 py-2 rounded w-full max-w-sm hover:bg-blue-600 transition"
                    onClick={() => navigate("/request-appointment")}
                  >
                    Request New Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;