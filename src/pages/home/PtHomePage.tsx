import React, { useEffect } from 'react';
import { getTheme } from '../../utils/ThemeSelection';
import { useNavigate } from 'react-router-dom';

const theme = await getTheme();

const PtHomePage = ({
  
  features = [
    'Manage Appointments',
    'Pre Checkin and Sign policy documents',
    'View Medications and Prescriptions',
    'View Education Materials',
    'Manage Health Records',
    'Send Secure Messages',
    'Securely Pay Bills',
  ],
  companyName = 'Rose City Eyecare',
  portalTitle = 'Patient Portal',
  description = 'Online secure access to your medical information anytime, anywhere. A true time saver and all your data is one click away.',
  tagline = 'Simplifying your healthcare.',
  logoSrc = '/logo.png',
  logoAlt = 'Rose City Eyecare',
  phoneNumber = '555-123-4567',
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen">
      {/* Left section */}
      <div className="w-3/5 p-10 flex flex-col text-[color:var(--primary-text-color)]">
        <div className="flex justify-center items-center mb-4">
          <img src={logoSrc} alt={logoAlt} className="w-40" />
        </div>
        <h1 className="text-xl font-medium text-center mb-6" style={{ color: theme.primaryTextColor }}>{companyName}</h1>
        <h2 className="text-xl font-medium text-center mb-6 " style={{ color: theme.primaryTextColor }}>{portalTitle}</h2>

        <p className="text-start max-w-4xl mb-6 text-lg " style={{ color: theme.quaternaryTextColor }}>{description}</p>

        <ul className="text-md  space-y-2 mb-10 " style={{ color: theme.primaryTextColor }}>
          {features.map((item, i) => (
            <li key={i} className="flex items-center justify-start space-x-2 " style={{ color: theme.quaternaryTextColor }}>
              <span>✔️</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-md mt-auto text-center" style={{ color: theme.quaternaryTextColor }}>{tagline}</p>
        <div className="text-right mt-10 text-sm text-gray-500">
          ©2025, First Insight Corporation. All rights reserved.
        </div>
      </div>

      {/* Right section */}
      <div className="w-2/5  flex flex-col justify-center items-center " style={{ color: theme.secondaryTextColor, backgroundColor: theme.BGColor }}>
        <div className="flex mb-1 w-4/5 max-w-xl px-8 gap-x-6" >
          <button className=" w-2/3 px-6 py-3 border-rounded-full hover:bg-blue-200 hover:text-white focus:outline-none" style={{ backgroundColor: theme.BGColor, borderColor: theme.secondaryTextColor }} 
          onClick={() => navigate('/sign-up')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.ButtonHover;
          }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.BGColor;
            }}>
            Create New Account
          </button>
          <button className="flex-1 px-6 py-3  border border-rounded-full hover:bg-blue-200 hover:text-white focus:outline-none" style={{ backgroundColor: theme.BGColor, borderColor: theme.secondaryTextColor }} onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.ButtonHover;
          }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.BGColor;
            }}>
            Sign In
          </button>
        </div>

        {/* Contact section */}
        <div className="text-center mt-6 " style={{ color: theme.secondaryTextColor }}>
          <p className="text-lg font-medium">Questions?</p>
          <p>
            Call our office at <strong>{phoneNumber}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PtHomePage;
