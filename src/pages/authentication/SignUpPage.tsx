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
  const [fieldErrors, setFieldErrors] = React.useState({
    firstName: false,
    lastName: false,
    mobile: false,
    email: false,
    dob: false
  });

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

  const validatePatient = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
  
      const patientValidateData = {
        PracticeName: GlobalParams.PRACTICE_NAME,
        FirstName: formData.legalFirstName.trim(),
        LastName: formData.lastName.trim(),
        Mobile: formData.countryCode + formData.mobile.trim(),
        Email: formData.email.trim(),
        DOB: formData.dob,
        AuthSignUpAsPatient: props.title === "Sign Up as Patient" ? "true" : "false"
      };
  
      // Use AuthenticationService instead of direct fetch
      const authService = new AuthenticationService();
      await authService.validatePatient(patientValidateData);
  
      // Check response status
      if (authService.response_Status_Code_API_7 === 205) {
        return;
      }
  
      if (authService.response_Status_Code_API_7 !== 200) {
        throw new Error('Network response was not ok');
      }
  
      // Handle the response
      const patientAvailabilityModel = authService.patientAvailabilityResponseModel;
  
      if (patientAvailabilityModel?.isExist) {
        navigate('/patient-record-match-found', {
          state: {
            email: formData.email,
            patientNumber: patientAvailabilityModel.patientNumber
          }
        });
      } else {
        if (patientAvailabilityModel?.accountType === "AuthSignUpAsPatient") {
          navigate('/signup-completed');
        } else {
          navigate('/record-not-match');
        }
      }
    } catch (error) {
      toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data: FormData) => {
    // Validate all fields before submission
    Object.keys(data).forEach(key => {
      validateField(key, data[key as keyof FormData]);
    });

    if (!Object.values(fieldErrors).some(error => error)) {
      validatePatient(data);
      // Remove the direct navigation to dashboard as it should be handled by validatePatient
      // navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start md:justify-center mt-2 min-h-screen w-screen px-4 bg-white">
      <h1 className="text-2xl md:text-4xl font-regular mb-3 text-center" style={{ color: theme.primaryTextColor }}>
        Create New Account
      </h1>
  
      <form
        onSubmit={handleSubmit(onSubmit)}
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
            }}
            onChange={(date: Date) => {
              const formatted = dayjs(date).format('MM/DD/YYYY');
              dobController.field.onChange(formatted);
            }}
            onError={(error: string | null) => {
              // Handle date validation errors if needed
              console.log('Date validation error:', error);
            }}
            enhancedInput={true}
            error={!!errors.dob}
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
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white text-base md:text-xl font-medium py-2 px-10 md:px-14 rounded focus:outline-none focus:shadow-outline"
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
