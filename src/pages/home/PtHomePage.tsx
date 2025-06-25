import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HomeDataModel } from '../../model/home/HomeModel';
import { getTheme } from '../../utils/ThemeSelection';
import HomeService from '../../services/home/HomeService';
import { GlobalParams } from '../../utils/GlobalParameters';
import MaximEyes from '../../assets/maximeyeslogo.png';
import { Loader, RdsFeatureList, Header, Button } from '@ketan_nimase/ui';

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
      <div className="flex justify-center items-center h-screen w-screen">
        <Loader loaderType="spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-screen md:flex-row">
      {/* Left section - Full width on mobile, 3/5 on desktop */}
      <div className="w-full md:w-3/5 p-3 md:p-8 flex flex-col text-[color:var(--primary-text-color)]">
        {/* Logo - Centered on mobile */}
        <div className="flex justify-center items-center mb-4">
  <img src={homePageData?.logoSrc || ''} alt={homePageData?.logoAlt || 'Logo'} className="w-22 h-22 md:w-26 md:h-29 mt-0" />
</div>

        {/* Company Name - Centered on mobile */}
        <Header
          className="text-3xl md:text-4xl font-regular justify-center text-center mb-2"
          colorVariant="dark"
          headerText={homePageData.companyName}
          size="h1"
        />

        {/* Portal Title - Centered on mobile */}
        <Header
          className="text-lg md:text-xl font-medium text-center mb-4"
          colorVariant="dark"
          headerText={homePageData.portalTitle}
          size="h1"
        />

        {/* Description - Centered on mobile, left-aligned on desktop */}
        <p className="text-center md:text-start max-w-full md:max-w-4xl mb-6 md:ml-10 text-sm md:text-md px-4 md:px-0"
          style={{ color: theme.quaternaryTextColor }}>
          {homePageData.description}
        </p>

        {/* Feature List - Centered on mobile */}
        <div className="flex justify-center md:justify-start">
          <RdsFeatureList
            columns={1}
            iconName="tick_circle"
            className="!border-0 !text-gray-600"
            itemList={homePageData.features}
            heading={''}
          />
        </div>

        {/* Tagline - Centered */}
        <p className="text-sm md:text-md mt-auto text-center px-4 md:px-0" style={{ color: theme.quaternaryTextColor }}>
          {homePageData.tagline}
        </p>

        {/* Footer - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-center gap-2 mt-4">
          <img src={MaximEyes} alt="Maximeyes Logo" className="h-16 w-auto" />
          <div className="text-xs text-center md:text-right mt-2 md:mt-12">
            &copy; 2025, First Insight Corporation. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right section - Full width on mobile, 2/5 on desktop */}
      <div
        className="w-full md:w-2/5 flex flex-col justify-center items-center p-6"
        style={{ color: theme.secondaryTextColor, backgroundColor: theme.BGColor }}
      >
        {/* Buttons - Side by side on all screens, smaller on mobile */}
        <div className="flex flex-row gap-2 md:gap-4 w-full max-w-md">
          <Button
            className="text-sm md:text-lg w-full px-2 md:px-4 py-2 md:py-3 border rounded focus:outline-none"
            onClick={() => handleNavigation('/signup')}
          >
            Create New Account
          </Button>
          <Button
            className="text-sm md:text-lg w-full px-2 md:px-4 py-2 md:py-3 border rounded focus:outline-none"
            onClick={() => handleNavigation('/login')}
          >
            Sign In
          </Button>
        </div>

        {/* Contact section - Reduced top margin on small screens */}
        <div className="text-center mt-3 md:mt-6 px-2" style={{ color: theme.secondaryTextColor }}>
          <p className="text-lg font-medium">Questions?</p>
          <p>
            Call our office at <strong>{homePageData.phoneNumber}</strong>
          </p>
        </div>


      </div>
      {/* Footer - Shown on mobile, hidden on desktop */}
      <div className="flex md:hidden flex-row items-center justify-between gap-3 mt-0 px-2 py-2 bg-white rounded-lg">
        <img src={MaximEyes} alt="Maximeyes Logo" className="h-8 w-auto" />
        <div className="text-xs text-center text-gray-600">
          &copy; 2025, First Insight Corporation. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PtHomePage;
