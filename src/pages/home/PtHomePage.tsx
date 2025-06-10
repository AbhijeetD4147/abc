import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HomeDataModel } from '../../model/home/HomeModel';
import { getTheme } from '../../utils/ThemeSelection';
import HomeService from '../../services/home/HomeService';
import { GlobalParams } from '../../utils/GlobalParameters';
import checkMark from '../../assets/check-mark.png';
import MaximEyes from '../../assets/maximeyeslogo.png';

interface ThemeData {
  primaryTextColor: string;
  secondaryTextColor: string;
  quaternaryTextColor: string;
  BGColor: string;
  ButtonHover: string;
}

interface HomePageData {
  logoSrc: string;
  logoAlt: string;
  companyName: string;
  portalTitle: string;
  description: string;
  features: string[];
  tagline: string;
  phoneNumber: string;
}

const PtHomePage: React.FC = () => {
  // State Management
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<ThemeData | null>(null);
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Initialize theme data
  const initializeTheme = useCallback(async () => {
    try {
      const themeData = await getTheme();
      setTheme(themeData);
    } catch (error) {
      console.error('Error loading theme:', error);
      // Set default theme or handle error
      setTheme({
        primaryTextColor: '#000000',
        secondaryTextColor: '#666666',
        quaternaryTextColor: '#888888',
        BGColor: '#ffffff',
        ButtonHover: '#e0e0e0'
      });
    }
  }, []);

  // Process home data and extract required information
  const processHomeData = useCallback((homeDataList: HomeDataModel[]): HomePageData | null => {
    if (!homeDataList || homeDataList.length === 0) {
      return null;
    }

    const firstHomeData = homeDataList[0];
    let phoneNumber = '';

    // Find default location phone number
    for (const homeDataItem of homeDataList) {
      if (homeDataItem.ptHomePagePhoneNumbers) {
        for (const phoneNumberItem of homeDataItem.ptHomePagePhoneNumbers) {
          if (phoneNumberItem.isDefaultLocation) {
            phoneNumber = phoneNumberItem.phoneNumber || '';
            break;
          }
        }
        if (phoneNumber) break;
      }
    }

    return {
      logoSrc: firstHomeData.logo
        ? `data:image/jpeg;base64,${firstHomeData.logo}`
        : '',

      logoAlt: 'Company Logo',
      companyName: firstHomeData.practiceName || 'Company Name',
      description: firstHomeData.header || 'Welcome to our patient portal',
      features: firstHomeData.ptHomePageOptions?.map(option => option.optionName) || [
        'View medical records',
        'Schedule appointments',
        'Message your doctor',
        'View test results'
      ],
      tagline: firstHomeData.footer || 'Your health, our priority',
      phoneNumber: phoneNumber || '(555) 123-4567',
      portalTitle: '',

    };
  }, []);

  // Fetch home data from API
  const fetchHomeData = useCallback(async (): Promise<void> => {
    try {
      const homeService = new HomeService();
      await homeService.getHomeData('Home');

      if (homeService.response_Status_Code_API === 200) {
        const homeData = homeService.homeDataModel;
        if (homeData && homeData.length > 0) {
          const processedData = processHomeData(homeData);
          GlobalParams.LOGO = homeData[0].logo;
          GlobalParams.COMPANY_NAME = homeData[0].practiceName;
          if (processedData) {
            setHomePageData(processedData);
            setError(null);
          } else {
            throw new Error('Failed to process home data');
          }
        } else {
          throw new Error('No home data received');
        }
      } else if (homeService.response_Status_Code_API !== 205) {
        throw new Error(`API returned status code: ${homeService.response_Status_Code_API}`);
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
      const errorMessage = 'An unexpected error has occurred. Please try again later. If the problem persists, call our office.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    }
  }, [processHomeData]);

  // Show toast notification
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'warning') => {
    toast[type](message);
  }, []);

  // Handle navigation with validation
  const handleNavigation = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  // Handle button hover effects
  const handleButtonHover = useCallback((e: React.MouseEvent<HTMLButtonElement>, isHover: boolean) => {
    if (!theme) return;

    const button = e.currentTarget;
    button.style.backgroundColor = isHover ? theme.ButtonHover : theme.BGColor;
  }, [theme]);

  // Main initialization effect
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        // Check if customer ID is empty and redirect if necessary
        // if (GlobalParams.PT_CUSTOMER_ID === '') {
        //   navigate('/');
        //   return;
        // }

        // Initialize theme and fetch data concurrently
        await Promise.all([
          console.log('Initializing theme...'),
          initializeTheme(),

          fetchHomeData()
        ]);

      } catch (error) {
        console.error('Error during initialization:', error);
        setError('Failed to initialize the page');
      } finally {
        setLoading(false);
      }
    };

    initializeComponent();
  }, [navigate, fetchHomeData, initializeTheme]); // Added initializeTheme to dependency array

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  // if (error  || !homePageData) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="text-center">
  //         <p className="text-red-500 mb-4">{error || 'Failed to load page data'}</p>
  //         <button 
  //           onClick={() => window.location.reload()} 
  //           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  //         >
  //           Retry
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // Main UI (unchanged)
  return (
    <div className="flex h-screen w-screen">
      {/* Left section */}
      <div className="w-3/5 p-3 ml-0  flex flex-col text-[color:var(--primary-text-color)]">
        <div className="flex justify-center items-center mb-1">
          <img src={homePageData?.logoSrc || ''} alt={homePageData?.logoAlt || 'Logo'} className="w-26 h-29 mt-0" />
        </div>
        <h1 className="text-4xl font-regular text-center mb-3" style={{ color: theme.primaryTextColor }}>
          {homePageData.companyName}
        </h1>
        <h2 className="text-xl font-medium text-center mb-3" style={{ color: theme.primaryTextColor }}>
          {homePageData.portalTitle}
        </h2>

        <p className="text-start max-w-4xl mb-6 ml-10 text-md" style={{ color: theme.quaternaryTextColor }}>
          {homePageData.description}
        </p>

        <ul className="text-sm space-y-2 mb-5 ml-11" style={{ color: theme.primaryTextColor }}>
          {homePageData.features.map((item, i) => (
            <li key={i} className="flex items-center justify-start space-x-3" style={{ color: theme.quaternaryTextColor }}>
              <span>
                <img src={checkMark} alt="Logo" style={{ width: '20px', height: '20px' }} />
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-md mt-auto text-center" style={{ color: theme.quaternaryTextColor }}>
          {homePageData.tagline}
        </p>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 0px",
          fontFamily: "Arial, sans-serif",
          color: "#333",
        }}>
          <div style={{
            display: "flex"
          }}>
            <img src={MaximEyes} alt="Maximeyes Logo" className='m-0 h-30 w-60' />
          </div>
          <div className='text-xs mt-12' style={{ textAlign: 'right' }}>
            &copy; 2025, First Insight Corporation. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right section */}
      <div
        className="w-2/5 flex flex-col justify-center items-center"
        style={{ color: theme.secondaryTextColor, backgroundColor: theme.BGColor }}
      >
        <div className="flex mb-1 w-4/5 max-w-xl px-8 gap-x-6">
          <button 
            className="w-2/3 px-6 py-3 border-rounded-full focus:outline-none" 
            style={{ backgroundColor: theme.BGColor, borderColor: theme.secondaryTextColor }}
            onClick={() => handleNavigation('/signup')}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            Create New Account
          </button>
          <button 
            className="flex-1 px-6 py-3 border border-rounded-full focus:outline-none" 
            style={{ backgroundColor: theme.BGColor, borderColor: theme.secondaryTextColor }}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            onClick={() => handleNavigation('/login')}
          >
            Sign In
          </button>
        </div>

        {/* Contact section */}
        <div className="text-center mt-6" style={{ color: theme.secondaryTextColor }}>
          <p className="text-lg font-medium">Questions?</p>
          <p>
            Call our office at <strong>{homePageData.phoneNumber}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PtHomePage;
