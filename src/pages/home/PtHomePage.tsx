import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HomeDataModel } from '../../model/home/HomeModel';
import { getTheme } from '../../utils/ThemeSelection';
import HomeService from '../../services/home/HomeService';
import { GlobalParams } from '../../utils/GlobalParameters';
import MaximEyes from '../../assets/maximeyeslogo.png';
import { Loader, RdsFeatureList, Header, Button } from '@ketan_nimase/ui';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
        <Loader loaderType="spin" />
      </div>
    );
  }

  return (
    <div className="container-fluid d-flex flex-column flex-md-row min-vh-100 min-vw-100 p-0">
      {/* Left section - Full width on mobile, 60% on desktop */}
      <div className="col-12 col-md-7 col-lg-8 p-2 p-md-3 d-flex flex-column" style={{ color: theme?.primaryTextColor }}>
        {/* Logo - Centered on mobile */}
        <div className="d-flex justify-content-center align-items-center mb-4">
          <img
            src={homePageData?.logoSrc || ''}
            alt={homePageData?.logoAlt || 'Logo'}
            className="img-fluid"
            style={{ width: '200px', height: '130px', maxWidth: '290px', maxHeight: '250px' }}
          />
        </div>

        {/* Company Name - Centered on mobile */}
        <Header
          className="display-4 fw-normal justify-center text-center mb-1"
          colorVariant="dark"
          headerText={homePageData?.companyName || ''}
          size="h1"
        />

        {/* Portal Title - Centered on mobile */}
        <Header
          className="h4 fw-medium text-center mb-2"
          colorVariant="dark"
          headerText={homePageData?.portalTitle || ''}
          size="h1"
        />

        {/* Description - Centered on mobile, left-aligned on desktop */}
        <p
          className="text-center text-lg-start mb-4 px-2 px-md-0 ms-md-5"
          style={{
            color: theme?.quaternaryTextColor,
            fontSize: '1.0rem',
            maxWidth: '100%'
          }}
        >
          {homePageData?.description}
        </p>

        {/* Feature List - Centered on mobile */}
        <div className="d-flex justify-content-center ml-12 justify-content-sm-start">
          <RdsFeatureList
            columns={1}
            iconName="tick_circle"
            className=" border-none text-gray-600"
            itemList={homePageData?.features || []}
            heading={''}
          />
        </div>

        {/* Tagline - Centered */}
        <p
          className="mt-auto text-center px-3 px-md-0 sm-mt-2"
          style={{
            color: theme?.quaternaryTextColor,
            fontSize: '1.0rem'
          }}
        >
          {homePageData?.tagline}
        </p>

        {/* Footer - Hidden on mobile, shown on desktop */}
        <div className="d-none d-md-flex flex-column flex-md-row justify-content-between align-items-center gap-2 mt-4">
          <img src={MaximEyes} alt="Maximeyes Logo" className="img-fluid" style={{ height: '64px', width: 'auto' }} />
          <div className="text-end mt-2 mt-md-3" style={{ fontSize: '0.9rem' }}>
            &copy; 2025, First Insight Corporation. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right section - Full width on mobile, 40% on desktop */}
      <div
        className="col-12 col-md-5 col-lg-4 d-flex flex-column justify-content-center align-items-center p-4"
        style={{ color: theme?.secondaryTextColor, backgroundColor: theme?.BGColor }}
      >
        {/* Buttons - Side by side on all screens, smaller on mobile */}
        <div className="d-flex flex-row gap-2 gap-md-3 w-100" style={{ maxWidth: '400px' }}>
          <Button
            className="btn flex-fill px-2 px-md-3 py-2 py-md-3 border rounded"
            onClick={() => handleNavigation('/signup')}
          >
            Create New Account
          </Button>
          <Button
            className="btn flex-fill px-2 px-md-3 py-2 py-md-3 border rounded"
            onClick={() => handleNavigation('/login')}
          >
            Sign In
          </Button>
        </div>

        {/* Contact section - Reduced top margin on small screens */}
        <div className="text-center mt-3 mt-md-4 px-2" style={{ color: theme?.secondaryTextColor }}>
          <p className="h5 fw-medium mb-2">Questions?</p>
          <p className="mb-0">
            Call our office at <strong>{homePageData?.phoneNumber}</strong>
          </p>
        </div>
      </div>

      {/* Footer - Shown on mobile, hidden on desktop */}
      <div className="d-flex d-md-none flex-row align-items-center justify-content-between gap-3 mt-0 px-2 py-2 bg-white rounded">
        <img src={MaximEyes} alt="Maximeyes Logo" className="img-fluid" style={{ height: '32px', width: 'auto' }} />
        <div className="text-center text-muted" style={{ fontSize: '0.75rem' }}>
          &copy; 2025, First Insight Corporation. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PtHomePage;
