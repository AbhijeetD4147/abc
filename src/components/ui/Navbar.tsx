import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@ketan_nimase/ui"
import { GlobalParams } from "../../utils/GlobalParameters";


export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const initials = GlobalParams.USER_INITIAL;

    const menuItems = [
        { label: "Messages", href: "/messages" },
        { label: "Appointments", href: "/appointment" },
        { label: "Policies & Consents forms", href: "/policies-form" },
        { label: "Health Summary", href: "/health-summary" },
        { label: "Eyewear & Rx", href: "/" },
        { label: "Bills & Payments", href: "/" }
    ];

    const fabItems = [
        { label: "Profile", href: "/profile" },
        { label: "Update Demographics", href: "/update-demographics" },
        { label: "Update Insurance", href: "/update-insurance" },
        { label: "Communication Preferences", href: "/communication-preferences" },
        { label: "Authorized Individuals", href: "/authorized-individual" },
        { label: "Activity Log", href: "/activity-logs" },
        { label: "Opt-Out", href: "/opt-out" },
        { label: "Logout", href: "/logout" },
    ];
    const isActiveRoute = (href: string) => {
        if (href === "/") {
            return location.pathname === "/" || location.pathname === "/dashboard";
        }
        return location.pathname === href || location.pathname.startsWith(href + "/");
    };

    return (
        <div className="w-full bg-blue-500 py-0 pl-4 pr-4 flex justify-between items-center">
            {/* Left: Home + Nav Buttons */}
            <div className="flex items-center space-x-2">
                <div
                    className="cursor-pointer hover:text-blue-300 transition text-white mr-2 sm:mr-4 md:mr-8 lg:mr-16"
                    onClick={() => navigate("/dashboard")}
                >
                    <Icon
                        colorVariant="light"
                        height="24px"
                        isCursorPointer
                        name="new_home"
                        stroke
                        width="24px"
                    />
                </div>

                {/* Mobile Menu Button - visible on small and medium screens, smaller on medium */}
                <div className="lg:hidden relative">
                    <div
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-8 h-8 md:w-7 md:h-7 p-4 flex items-center justify-center rounded-full bg-transparent hover:bg-blue-600 cursor-pointer transition duration-200"
                    >
                        {isMobileMenuOpen ? (
                            <Icon
                                colorVariant="light"
                                height="18px"
                                isCursorPointer
                                name="cancel"
                                stroke
                                width="18px"
                            />
                        ) : (
                            <Icon
                                colorVariant="light"
                                height="18px"
                                isCursorPointer
                                name="list"
                                stroke
                                width="18px"
                            />
                        )}
                    </div>

                    {/* Mobile Dropdown Menu */}
                    {isMobileMenuOpen && (
                        <ul className="absolute left-0 top-12 min-w-max bg-white border border-gray-200 rounded shadow-md z-50">
                            {menuItems.map(({ label, href }) => (
                                <li
                                    key={label}
                                    className={`border-b last:border-b-0 border-gray-200 cursor-pointer ${isActiveRoute(href) ? "bg-red-500" : ""
                                        }`}
                                    onClick={() => {
                                        navigate(href);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <span className={`block px-3 py-2 text-sm font-normal no-underline transition-all duration-200 ${isActiveRoute(href)
                                        ? "text-red-600 bg-red-50 border-l-4 border-red-500"
                                        : "text-black hover:text-blue-500 hover:bg-gray-100"
                                        }`}>
                                        {label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Desktop Menu - hidden on small and medium screens */}
                <div className="hidden lg:flex py-0 m-0 items-center space-x-2">
                    {menuItems.map(({ label, href }) => (
                        <button
                            key={label}
                            onClick={() => navigate(href)}
                            className={`text-md xl:text-md text-white bg-blue-500 transition m-0 py-2 px-4 xl:py-3 xl:px-4 hover:bg-blue-600 whitespace-nowrap relative ${isActiveRoute(href) ? "border-b-2 border-red-500" : ""
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: Settings + Avatar */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 relative">
                {/* FAB Menu */}
                <div className="relative">
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-blue-100 cursor-pointer duration-200"
                    >
                        {isOpen ? (
                            <Icon
                                colorVariant="light"
                                height="20px"
                                isCursorPointer
                                name="cancel"
                                stroke
                                width="20px"
                            />
                        ) : (
                            <Icon
                                colorVariant="light"
                                height="24px"
                                isCursorPointer
                                name="settings"
                                stroke
                                width="24px"
                            />
                        )}
                    </div>

                    {isOpen && (
                        <ul className="absolute right-0 mt-2 min-w-max max-w-xs bg-white border border-gray-200 rounded shadow-md z-50">
                            {fabItems.map(({ label, href }) => (
                                <li
                                    key={label}
                                    className={`border-b last:border-b-0 border-gray-200 cursor-pointer ${isActiveRoute(href) ? "bg-red-50" : ""
                                        }`}
                                    onClick={() => navigate(href)}
                                >
                                    <span className={`block px-4 py-2 font-normal no-underline transition-all duration-200 ${isActiveRoute(href)
                                        ? "text-red-600 bg-red-50 border-l-4 border-red-500"
                                        : "text-black hover:text-blue-500 hover:bg-gray-100"
                                        }`}>
                                        {label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Patient Initials Avatar */}
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full cursor-pointer bg-blue-500 border border-white text-white flex items-center justify-center font-semibold text-sm md:text-base lg:text-lg"
                    onClick={() => navigate("/profile")}>
                    {initials}
                </div>
            </div>
        </div >
    );
};
