import { useState } from "react";
import { Home, Settings, X } from "lucide-react";

interface NavbarProps {
    patientName: {
        firstName: string;
        lastName: string;
    };
    onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ patientName, onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);

    const initials = `${patientName.firstName[0] ?? ""}${patientName.lastName[0] ?? ""}`.toUpperCase();

    const menuItems = [
        "Messages",
        "Appointments",
        "Policies & Consents forms",
        "Health Summary",
        "Eyewear & Rx",
        "Bills & Payments",
    ];

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

    return (
        <div className="w-full bg-blue-500  px-6 py-1 flex justify-between items-center">
            {/* Left: Home + Nav Buttons */}
            <div className="flex items-center space-x-1">
                <div
                    className="cursor-pointer hover:text-blue-600 transition"
                    onClick={() => onNavigate("dashboard")}
                >
                    <Home size={28} stroke="#ffffff" />
                </div>
                {menuItems.map((label) => (
                    <button
                        key={label}
                        onClick={() => onNavigate(label.toLowerCase().replace(/\s+/g, "-"))}
                        className="text-xs text-white bg-blue-500 hover:bg-blue-600 transition"
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Right: Settings + Avatar */}
            <div className="flex items-center space-x-4 relative">
                {/* FAB Menu */}
                <div className="relative">
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500  cursor-pointer transition-colors duration-200"
                    >
                        {isOpen ? (
                            <X size={24} stroke="#ffffff" strokeWidth={1.5} />
                        ) : (
                            <Settings size={24} stroke="#ffffff" strokeWidth={1.5} />
                        )}
                    </div>

                    {/* Dropdown */}
                    {isOpen && (
                        <ul className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded shadow-md z-50">
                            {fabItems.map(({ label, href }) => (
                                <li
                                    key={label}
                                    className="px-4 py-2 border border-gray-200 cursor-pointer whitespace-nowrap"
                                >
                                    <a
                                        href={href}
                                        className="block w-full text-black hover:text-blue-600 hover:bg-gray-100"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Patient Initials Avatar */}
                <div className="w-8 h-8 rounded-full bg-blue-500 border border-white text-white flex items-center justify-center font-semibold text-lg">
                    {initials}
                </div>
            </div>
        </div>
    );
};
