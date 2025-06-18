import React from 'react';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import DatePicker from '../../components/ui/DatePicker';
import { getTheme } from '../../utils/ThemeSelection';
import { GlobalParams } from '../../utils/GlobalParameters';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import { Info } from 'lucide-react';
import { AuthenticationService } from '../../services/authentication/UserService';

interface SignUpPageProps {
  title?: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  emailId?: string;
  userType?: string;
  authUserName?: string;
  authUserId?: string;
}

// Enhanced validation patterns
const phoneRegex = /^\(\d{3}\)[-.]?\d{3}[-.]?\d{4}$/;

const formSchema = z.object({
  legalFirstName: z.string().min(1, 'First Name is required!'),
  lastName: z.string().min(1, 'Last Name is required!'),
  countryCode: z.string().default('+1'),
  mobile: z.string()
    .regex(phoneRegex, 'Mobile format is invalid!')
    .min(1, 'Mobile number is required!'),
  email: z.string()
    .email('Email format is invalid!')
    .min(1, 'Email is required!'),
  dob: z.string()
    .min(1, 'DOB is required!')
    .refine((val) => {
      if (!val.trim()) return false;
      
      // Try multiple date formats
      const formats = ['MM/DD/YYYY', 'M/D/YYYY', 'MM/D/YYYY', 'M/DD/YYYY'];
      
      for (const format of formats) {
        const parsed = dayjs(val, format, true);
        if (parsed.isValid()) {
          return true;
        }
      }
      
      return false;
    }, {
      message: 'Please enter a valid date in MM/DD/YYYY format'
    })
});

type FormData = z.infer<typeof formSchema>;

const SignUpPage: React.FC<SignUpPageProps> = (props) => {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<any>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // Add these validation states
  const [fieldErrors, setFieldErrors] = React.useState({
    firstName: false,
    lastName: false,
    mobile: false,
    email: false,
    dob: false
  });
  const [dateFieldValidate, setDateFieldValidate] = React.useState(false);
  const [mobileNumberErrorText, setMobileNumberErrorText] = React.useState('');
  const [emailErrorText, setEmailErrorText] = React.useState('');

  // Enhanced field validation function
  const fieldValidation = () => {
    const formData = watch();
    let isValid = true;
    
    console.log('Field validation started with data:', formData);
    console.log('Initial validation state:', isValid);
  
    // First Name validation
    if (!formData.legalFirstName?.trim()) {
      console.log('First name validation failed: empty or undefined');
      setFieldErrors(prev => ({ ...prev, firstName: true }));
      isValid = false;
    } else {
      console.log('First name validation passed:', formData.legalFirstName);
      setFieldErrors(prev => ({ ...prev, firstName: false }));
    }
  
    // Last Name validation
    if (!formData.lastName?.trim()) {
      console.log('Last name validation failed: empty or undefined');
      setFieldErrors(prev => ({ ...prev, lastName: true }));
      isValid = false;
    } else {
      console.log('Last name validation passed:', formData.lastName);
      setFieldErrors(prev => ({ ...prev, lastName: false }));
    }
  
    // Mobile validation
    if (!formData.mobile?.trim()) {
      console.log('Mobile validation failed: empty or undefined');
      setFieldErrors(prev => ({ ...prev, mobile: true }));
      setMobileNumberErrorText('Mobile is required');
      isValid = false;
    } else {
      const formattedMobile = `(${formData.mobile.slice(0, 3)}) ${formData.mobile.slice(3, 6)}-${formData.mobile.slice(6)}`;
      console.log('Testing mobile format:', formattedMobile, 'against regex:', phoneRegex);
      console.log('Mobile regex test result:', phoneRegex.test(formattedMobile));
      if (!phoneRegex.test(formattedMobile)) {
        console.log('Mobile validation failed: invalid format');
        setFieldErrors(prev => ({ ...prev, mobile: true }));
        setMobileNumberErrorText('Please enter valid mobile number');
        isValid = false;
      } else {
        console.log('Mobile validation passed:', formattedMobile);
        setFieldErrors(prev => ({ ...prev, mobile: false }));
        setMobileNumberErrorText('');
      }
    }
  
    // Email validation
    if (!formData.email?.trim()) {
      console.log('Email validation failed: empty or undefined');
      setFieldErrors(prev => ({ ...prev, email: true }));
      setEmailErrorText('Email is required');
      isValid = false;
    } else {
      console.log('Testing email format:', formData.email);
      console.log('Email regex test result:', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email));
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        console.log('Email validation failed: invalid format');
        setFieldErrors(prev => ({ ...prev, email: true }));
        setEmailErrorText('Please enter valid Email');
        isValid = false;
      } else {
        console.log('Email validation passed:', formData.email);
        setFieldErrors(prev => ({ ...prev, email: false }));
        setEmailErrorText('');
      }
    }
  
    // DOB validation
    if (!formData.dob?.trim()) {
      console.log('DOB validation failed: empty or undefined');
      setFieldErrors(prev => ({ ...prev, dob: true }));
      isValid = false;
    } else {
      console.log('DOB value:', formData.dob, 'dateFieldValidate state:', dateFieldValidate);
      if (!dateFieldValidate) {
        console.log('DOB validation failed: dateFieldValidate is false');
        setFieldErrors(prev => ({ ...prev, dob: true }));
        isValid = false;
      } else {
        console.log('DOB validation passed:', formData.dob);
        setFieldErrors(prev => ({ ...prev, dob: false }));
      }
    }
  
    console.log('Final validation result:', isValid);
    return isValid;
  };

  React.useEffect(() => {
    getTheme().then(setTheme);

    // Pre-fill form if data is provided
    if (props.title === "Sign Up as Patient") {
      setValue('legalFirstName', props.firstName || '');
      setValue('lastName', props.lastName || '');
      setValue('mobile', props.mobileNumber || '');
      setValue('email', props.emailId || '');
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: '+1'
    }
  });

  const mobileController = useController({ name: 'mobile', control });
  const dobController = useController({ name: 'dob', control });

  // Field-level validation from sample code
  const validateField = (name: string, value: string) => {
    setFieldErrors(prev => ({
      ...prev,
      [name]: !value.trim()
    }));
  };

  const validateManualDob = (dateOfBirth: string) => {
    console.log('Validating DOB:', dateOfBirth);
    if (dateOfBirth.length !== 10) {
      console.log('DOB validation failed: incorrect length');
      setDateFieldValidate(false);
      return;
    }

    try {
      // Parse MM/DD/YYYY format
      const month = parseInt(dateOfBirth.substring(0, 2));
      const date = parseInt(dateOfBirth.substring(3, 5));
      const year = parseInt(dateOfBirth.substring(6, 10));

      console.log('Parsed DOB:', { month, date, year });
      
      const checkDate = dayjs(dateOfBirth, 'MM/DD/YYYY', true);
      const today = dayjs();

      const isLeapYear = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);

      let isValid = true;

      // Validation checks
      if (month < 1 || month > 12) {
        console.log('DOB validation failed: invalid month');
        isValid = false;
      } else if (date < 1 || date > 31) {
        console.log('DOB validation failed: invalid date');
        isValid = false;
      } else if (year < 1900) {
        console.log('DOB validation failed: year before 1900');
        isValid = false;
      } else if (date > 29 && month === 2) {
        console.log('DOB validation failed: invalid February date');
        isValid = false;
      } else if (date === 31 && [2, 4, 6, 9, 11].includes(month)) {
        console.log('DOB validation failed: invalid day for month');
        isValid = false;
      } else if (checkDate.isAfter(today)) {
        console.log('DOB validation failed: future date');
        isValid = false;
      } else if (!isLeapYear && month === 2 && date === 29) {
        console.log('DOB validation failed: February 29 in non-leap year');
        isValid = false;
      } else if (!checkDate.isValid()) {
        console.log('DOB validation failed: invalid date according to dayjs');
        isValid = false;
      }

      console.log('DOB validation result:', isValid);
      setDateFieldValidate(isValid);
    } catch (error) {
      console.error('DOB validation error:', error);
      setDateFieldValidate(false);
    }
};

  const onSubmit = (data: FormData) => {
    console.log('Form submission started with data:', data);
    console.log('Current field errors:', fieldErrors);
    console.log('Date field validate status:', dateFieldValidate);
    
    // Use the enhanced field validation
    if (fieldValidation()) {
      console.log('All validations passed, calling validatePatient');
      validatePatient(data);
    } else {
      console.log('Validation errors found, API not called');
      // Force form validation to show errors
      handleSubmit(() => {})();
    }
};
  
  const validatePatient = async (formData: FormData) => {
    try {
      console.log('validatePatient called with:', formData);
      setIsSubmitting(true);
  
      const patientValidateData = {
        PracticeName: GlobalParams.PRACTICE_NAME,
        FirstName: formData.legalFirstName.trim(),
        LastName: formData.lastName.trim(),
        Mobile: props.title === "Sign Up as Patient" 
          ? formData.mobile.trim() 
          : formData.countryCode + formData.mobile.trim(),
        Email: formData.email.trim(),
        DOB: formData.dob,
        AuthSignUpAsPatient: props.title === "Sign Up as Patient" ? "true" : "false"
      };
      
      console.log('Patient validate data:', patientValidateData);
  
      const authService = new AuthenticationService();
      console.log('Calling authService.validatePatient');
      await authService.validatePatient(patientValidateData);
      console.log('API response status:', authService.response_Status_Code_API_7);
      console.log('Patient availability model:', authService.patientAvailabilityResponseModel);
  
      // Handle response based on status code
      if (authService.response_Status_Code_API_7 === 200) {
        const patientAvailabilityModel = authService.patientAvailabilityResponseModel;
        console.log('API call successful, handling navigation');
  
        if (patientAvailabilityModel?.isExist) {
          console.log('Patient exists, navigating to match found page');
          navigate('/record-match-found', {  // Changed from '/patient-record-match-found'
            state: {
              email: formData.email,
              patientNumber: patientAvailabilityModel.patientNumber
            }
          });
        } else {
          console.log('Patient does not exist, checking account type');
          if (patientAvailabilityModel?.accountType === "AuthSignUpAsPatient") {
            console.log('Auth signup as patient, navigating to signup completed');
            navigate('/signup-completed');
          } else {
            console.log('Record not matched, navigating to record not match');
            navigate('/record-match-not-found');  // Changed from '/record-not-match'
          }
        }
      } else if (authService.response_Status_Code_API_7 !== 205) {
        // Only show error if it's not a 205 status code
        console.error('API error with status code:', authService.response_Status_Code_API_7);
        toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
      }
    } catch (error) {
      console.error('API call error:', error);
      toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-start md:justify-center mt-2 min-h-screen w-screen px-4 bg-white">
      <h1 className="text-2xl md:text-4xl font-regular mb-3 text-center" style={{ color: theme.primaryTextColor }}>
        Create New Account
      </h1>
  
      <form
        onSubmit={(e) => {
          console.log('Form onSubmit triggered');
          handleSubmit(onSubmit)(e);
        }}
        className="bg-white w-full max-w-lg md:p-8 sm:p-6 p-4"
      >
        {/* First Name */}
        <div className="mb-3">
          <label htmlFor="legalFirstName" className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }}>
            First
          </label>
          <input
            id="legalFirstName"
            type="text"
            placeholder="Legal First Name"
            {...register('legalFirstName')}
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
          />
          {errors.legalFirstName && <p className="text-red-500 text-xs mt-1">{errors.legalFirstName.message}</p>}
        </div>
  
        {/* Last Name */}
        <div className="mb-3">
          <label htmlFor="lastName" className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }}>
            Last
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            {...register('lastName')}
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
  
        {/* Mobile */}
        <div className="mb-3">
          <label htmlFor="mobile" className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }}>
            Mobile
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value="+1"
              readOnly
              className="border rounded sm:w-1/6 w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
            />
            <input
              id="mobile"
              type="text"
              inputMode="numeric"
              placeholder="(000) 000-0000"
              value={mobileController.field.value
                ? `(${mobileController.field.value.slice(0, 3)}) ${mobileController.field.value.slice(3, 6)}-${mobileController.field.value.slice(6)}`
                : ''}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
                mobileController.field.onChange(raw);
              }}
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
            />
            {/* Tooltip */}
            <div className="relative group inline-block">
              <div className="w-6 h-6 flex items-center justify-center border-2 border-blue-500 text-blue-500 rounded-full text-sm font-bold cursor-pointer">
                i
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[240px] bg-white border border-gray-300 text-gray-800 text-sm rounded px-3 py-2 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                pointer-events-none shadow-lg z-10">
                Enter a mobile phone number that is readily available to receive a security code for 2FA.
              </div>
            </div>
          </div>
        </div>
  
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }}>
            Email
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register('email')}
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
            />
            <div className="relative group inline-block">
              <div className="w-6 h-6 flex items-center justify-center border-2 border-blue-500 text-blue-500 rounded-full text-sm font-bold cursor-pointer hover:bg-blue-50 transition-colors">
                i
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[240px] bg-white border border-gray-300 text-gray-800 text-sm rounded px-3 py-2 shadow-lg z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-index-100">
                Use an email address you check regularly to receive important account messages.
                {/* Arrow pointing up */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-300"></div>
              </div>
            </div>
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
  
        {/* DOB */}
        <div className="mb-3">
          <label htmlFor="dob" className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }}>
            DOB
          </label>
          <DatePicker
            restrictDateSelection="before"
            value={dobController.field.value}
            onChangeRaw={(value: string) => {
              dobController.field.onChange(value);
              if (value.length === 10) {
                validateManualDob(value);
              } else {
                setDateFieldValidate(false);
              }
            }}
            onChange={(date: Date) => {
              const formatted = dayjs(date).format('MM/DD/YYYY');
              dobController.field.onChange(formatted);
              setDateFieldValidate(true);
            }}
            onError={(error: string | null) => {
              // Only log actual errors, not null values
              if (error) {
                console.log('Date validation error:', error);
                setFieldErrors(prev => ({
                  ...prev,
                  dob: true
                }));
                setDateFieldValidate(false);
              } else {
                setFieldErrors(prev => ({
                  ...prev,
                  dob: false
                }));
              }
            }}
            enhancedInput={true}
            error={!!errors.dob || fieldErrors.dob}
          />
          {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
        </div>
  
        {/* Info Text */}
        <p className="text-xs mb-2 text-gray-600" style={{ color: theme.textfieldLabelColor }}>
          We will send you a security code via your email or text.
        </p>
  
        {/* Submit Button */}
        <div className="mt-7 mb-7 border-t border-gray-400 pt-6 w-full">
          <div className="flex justify-center">
            <button
              type="button" 
              className="bg-blue-500 hover:bg-blue-700 text-white text-base md:text-xl font-medium py-2 px-10 md:px-14 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                console.log('Directly calling validatePatient');
                const formData = watch();
                validatePatient(formData);
              }}
            >
              Proceed
            </button>
          </div>
        </div>
      </form>
    </div>
  );  
};

export default SignUpPage;
