import React from 'react';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from '../../components/ui/DatePicker';
import { getTheme } from '../../utils/ThemeSelection';
import dayjs from 'dayjs';

const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  const parts = [];

  if (digits.length > 0) parts.push('(' + digits.slice(0, 3));
  if (digits.length >= 4) parts[0] += ')';
  if (digits.length >= 4) parts.push(digits.slice(3, 6));
  if (digits.length >= 7) parts.push(digits.slice(6, 10));

  return parts.join(digits.length >= 7 ? '-' : ' ').trim();
}

function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  const parts = [];

  if (digits.length >= 2) parts.push(digits.slice(0, 2));
  if (digits.length >= 4) parts.push(digits.slice(2, 4));
  if (digits.length >= 5) parts.push(digits.slice(4, 8));

  return parts.join('/');
}

const formSchema = z.object({
  legalFirstName: z.string().min(1, 'First Name is required!'),
  lastName: z.string().min(1, 'Last Name is required!'),
  preferredName: z.string().optional(),

  mobile: z.string()
    .optional()
    .refine(val => !val || phoneRegex.test(val), {
      message: 'Mobile format is invalid!',
    }),

  email: z.string()
    .optional()
    .refine(val => !val || /^\S+@\S+\.\S+$/.test(val), {
      message: 'Email format is invalid!',
    }),

  dob: z.string().regex(dateRegex, 'DOB is required!'),
}).superRefine((data, ctx) => {
  const hasValidMobile = data.mobile && phoneRegex.test(data.mobile);
  const hasValidEmail = data.email && /^\S+@\S+\.\S+$/.test(data.email);

  if (!hasValidMobile && !hasValidEmail) {
    ctx.addIssue({
      path: ['mobile'],
      message: 'Either a valid email or mobile must be provided!',
      code: z.ZodIssueCode.custom,
    });
    ctx.addIssue({
      path: ['email'],
      message: 'Either a valid email or mobile must be provided!',
      code: z.ZodIssueCode.custom,
    });
  }
});

type FormData = z.infer<typeof formSchema>;

const SignUpPage: React.FC = () => {
  const [theme, setTheme] = React.useState<any>({});

  React.useEffect(() => {
    getTheme().then(setTheme);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const mobileController = useController({ name: 'mobile', control });
  const dobController = useController({ name: 'dob', control });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
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
          <label htmlFor="mobile" className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }}>
            Mobile
          </label>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value="+1"
              className="shadow appearance-none border rounded w-1/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
            />
            <input
              id="mobile"
              type="text"
              inputMode="numeric"
              placeholder="(000) 000-0000"
              value={formatPhoneNumber(mobileController.field.value || '')}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
                mobileController.field.onChange(raw);
              }}
              className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
              style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
            />
          </div>
          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register('email')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* DOB */}
        <div className="mb-3">
          <label htmlFor="dob" className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }}>
            DOB
          </label>
          {/* <input
            id="dob"
            type="text"
            inputMode="numeric"
            placeholder="MM/DD/YYYY"
            value={dobController.field.value || ''}
            onChange={(e) => {
              const formatted = formatDateInput(e.target.value);
              dobController.field.onChange(formatted);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
          /> */}
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
