import { FC } from "react";
import {
  CalendarDaysIcon,
  FileTextIcon,
  MessageCircleIcon,
  ClipboardIcon,
  EyeIcon,
  DollarSignIcon,
  MapPinIcon,
  CalendarX2Icon,
  RefreshCcwIcon,
} from "lucide-react";

const menuItems = [
  { icon: <MessageCircleIcon className="w-8 h-8" />, label: "Messages" },
  { icon: <CalendarDaysIcon className="w-8 h-8" />, label: "Appointments" },
  { icon: <FileTextIcon className="w-8 h-8" />, label: "Policies & Consent Forms" },
  { icon: <ClipboardIcon className="w-8 h-8" />, label: "Health Summary" },
  { icon: <EyeIcon className="w-8 h-8" />, label: "Eyewear & Rx" },
  { icon: <DollarSignIcon className="w-8 h-8" />, label: "Bills & Payments" },
];

const DashboardPage: FC = () => {
  return (
    <div className="flex h-screen font-[Segoe UI]">
      {/* Sidebar */}
      <div className="w-[45%] bg-[#0078D7] text-white flex flex-col justify-center items-center gap-10 px-10">
        <div className="grid grid-cols-3 gap-y-10 gap-x-5">
          {menuItems.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="border-2 rounded-full p-5 flex items-center justify-center">
                {item.icon}
              </div>
              <p className="text-[30px] mt-3">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="w-[55%] bg-white p-10 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <div className="text-[35px] text-black font-normal">Rose City Eyecare</div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-[18px] font-bold">
              JS
            </div>
            <span className="text-[22px] font-normal">Jeffery Stevenson</span>
            <div className="w-6 h-6 rounded-full border border-gray-400" />
          </div>
        </div>

        {/* Upcoming Appointment */}
        <div className="mt-10">
          <h3 className="text-[40px] font-normal mb-2">You have an upcoming appointment</h3>
          <p className="text-[25px] font-normal text-gray-600">
            8:00 AM on Friday, July 30, 2021
            <br />
            Reason: Annual Checkup
          </p>
          <div className="flex gap-10 mt-6">
            <div className="flex flex-col items-center">
              <CalendarX2Icon className="w-10 h-10 text-blue-400" />
              <span className="text-[25px] mt-2 text-blue-400">Cancel</span>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCcwIcon className="w-10 h-10 text-blue-400" />
              <span className="text-[25px] mt-2 text-blue-400">Reschedule</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPinIcon className="w-10 h-10 text-blue-400" />
              <span className="text-[25px] mt-2 text-blue-400">Mark As Arrived</span>
            </div>
          </div>
        </div>

        {/* Speed Up Section */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-[40px] font-normal mb-2">Speed up your arrival</h3>
          <p className="text-[25px] text-gray-600">
            Save time at the doctor’s office by filling{" "}
            <a href="#" className="text-blue-500 underline">
              Intake Form
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
