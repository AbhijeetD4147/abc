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

// Enhanced validation patterns from sample code
const phoneRegex = /^\(\d{3}\)[-.]?\d{3}[-.]?\d{4}$/;
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

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
  dob: z.string().regex(dateRegex, 'DOB is required!')
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

      const response = await fetch(`${process.env.VITE_API_BASE_URL}/api/PatientPortal/ValidatePatient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GlobalParams.TOKEN}`,
        },
        body: JSON.stringify(patientValidateData)
      });

      // Handle specific response status codes
      if (response.status === 205) {
        return;
      }

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.isExist) {
        navigate('/patient-record-match-found', {
          state: {
            email: formData.email,
            patientNumber: data.patientNumber
          }
        });
      } else {
        if (data.accountType === "AuthSignUpAsPatient") {
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
    }
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center mt-1 min-h-screen w-screen bg-white">
      <h1 className="text-4xl font-regular mb-1" style={{ color: theme.primaryTextColor }}>
        Create New Account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 w-full max-w-lg">
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }} htmlFor="mobile">
            Mobile
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value="+1"
              readOnly
              className="shadow appearance-none border rounded w-1/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{
                backgroundColor: theme.textfieldFilledColor,
                borderColor: theme.textfieldDefaultBorderColor,
              }}
            />

            <input id="mobile"
              type="text"
              inputMode="numeric"
              placeholder="(000) 000-0000"
              value={mobileController.field.value ? `(${mobileController.field.value.slice(0, 3)}) ${mobileController.field.value.slice(3, 6)}-${mobileController.field.value.slice(6)}` : ''}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
                mobileController.field.onChange(raw);
              }}
              className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
              style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
            />
            <div className="relative group ml-2">
              <div className="w-6 h-6 flex items-center justify-center border-2 border-blue-500 text-blue-500 rounded-full text-sm font-bold cursor-pointer">
                i
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs bg-white border border-black text-grey-800 text-sm rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Enter a mobile phone number that is readily available to you to receive a security code for 2-factor verification. Important messages regarding your account will be sent on this number
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }} htmlFor="email">
            Email
          </label>
          <div className="flex items-center">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
              id="email"
              type="email"
              placeholder="Email"
              {...register('email')}
            />
            <div className="relative group ml-2">
              <div className="w-6 h-6 flex items-center justify-center border-2 border-blue-500 text-blue-500 rounded-full text-sm font-bold cursor-pointer">
                i
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs bg-white border border-black text-grey-800 text-sm rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Enter an email address that you use frequently for communication and check ofthen for messages. Important communication regarding your account will be sent on this email address
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
            restrictDateSelection="after"
            value={dobController.field.value}
            onChange={(date: Date) => {
              const formatted = dayjs(date).format('MM/DD/YYYY');
              dobController.field.onChange(formatted);
            }}
            enhancedInput={true}
          />
          {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
        </div>

        <p className="text-xs mb-2" style={{ color: theme.textfieldLabelColor }}>
          We will send you a security code via your email or text.
        </p>

        <div className="mt-7 mb-7 border-t border-gray-400 pt-6 w-5/6">
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-xl text-white font-regular py-2 px-14 rounded focus:outline-none focus:shadow-outline">
              Proceed
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
