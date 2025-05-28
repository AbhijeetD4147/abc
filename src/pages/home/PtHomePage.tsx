import React, { useState, useEffect } from 'react';
import { getTheme, defaultThemeColors, type ThemeColors } from '../../utils/ThemeSelection';
import { useTheme } from '../../utils/ThemeProvider';

interface PtHomePageProps {
    features?: string[];
    companyName?: string;
    portalTitle?: string;
    description?: string;
    tagline?: string;
    logoSrc?: string;
    logoAlt?: string;
    phoneNumber?: string;
}

const PtHomePage: React.FC<PtHomePageProps> = ({
    features = [
        "Manage Appointments",
        "Pre Checkin and Sign policy documents",
        "View Medications and Prescriptions",
        "View Education Materials",
        "Manage Health Records",
        "Send Secure Messages",
        "Securely Pay Bills",
    ],
    companyName = "Rose City Eyecare",
    portalTitle = "Patient Portal",
    description = "Online secure access to your medical information anytime, anywhere. A true time saver and all your data is one click away.",
    tagline = "Simplifying your healthcare.",
    logoSrc = "/logo.png",
    logoAlt = "Rose City Eyecare",
    phoneNumber = "555-123-4567",
}) => {
    const theme = useTheme();


    return (
        <div className="flex h-screen w-screen" >
            {/* Left section */}
            <div className="w-1/2 p-10 flex flex-col justify-center items-center">
                <img
                    src={logoSrc}
                    alt={logoAlt}
                    className="w-40 mb-4"
                />
                <h1 className="text-2xl font-semibold text-center">{companyName}</h1>
                <h2 className="text-xl font-medium text-center mb-6">{portalTitle}</h2>

                <p className="text-center max-w-md mb-6">
                    {description}
                </p>

                <ul className="text-sm space-y-2 mb-10">
                    {features.map((item, i) => (
                        <li key={i} className="flex items-center space-x-2">
                            <span>✔️</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

                <p className="text-sm mt-auto">{tagline}</p>

                <div className="mt-10 text-xs text-gray-500">
                    ©2025, First Insight Corporation. All rights reserved.
                </div>
            </div>

            {/* Right section */}
            <div className="w-1/2 flex flex-col justify-center items-center" style={{ backgroundColor: theme.BGColor, color: theme.primaryTextColor }}>
                <div className="flex mb-6 w-full max-w-xl">
                    <button className="w-2/3 px-6 py-2 border border-[var(--color-onPrimary)] rounded-full hover:bg-[var(--color-onPrimary)] hover:text-[var(--color-primary)] transition mr-5">
                        Create New Account
                    </button>
                    <button className="w-1/3 px-6 py-2 border border-[var(--color-onPrimary)] rounded-full hover:bg-[var(--color-onPrimary)] hover:text-[var(--color-primary)] transition">
                        Sign In
                    </button>
                </div>

                <div className="text-center mt-6">
                    <p className="text-lg font-medium">Questions?</p>
                    <p>Call our office at <strong>{phoneNumber}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default PtHomePage;
