import React from 'react';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import DatePicker from '../../../components/ui/DatePicker';
import { getTheme } from '../../../utils/ThemeSelection';
import { GlobalParams } from '../../../utils/GlobalParameters';
import dayjs from 'dayjs';
import { Button, Header, Icon, Input, TextArea } from '@ketan_nimase/ui';
import { Navbar } from '../../../components/ui/Navbar';

interface SignUpPageProps {
    title?: string;
    firstName?: string;
    Last?: string;
    mobileNumber?: string;
    emailId?: string;
    userType?: string;
    authUserName?: string;
    authUserId?: string;
}

// Enhanced validation patterns
const phoneRegex = /^\(\d{3}\)[-.]?\d{3}[-.]?\d{4}$/;

const formSchema = z.object({
    First: z.string().min(1, 'First Name is required!'),
    Last: z.string().min(1, 'Last Name is required!'),
    countryCode: z.string().default('+1'),
    mobile: z.string()
        .regex(phoneRegex, 'Mobile format is invalid!')
        .min(1, 'Mobile number is required!'),
    Email: z.string()
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

const AddAuthorizedIndividual: React.FC<SignUpPageProps> = (props) => {
    const navigate = useNavigate();
    const [theme, setTheme] = React.useState<any>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    // Add these validation states
    const [fieldErrors, setFieldErrors] = React.useState({
        firstName: false,
        Last: false,
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
        if (!formData.First?.trim()) {
            console.log('First name validation failed: empty or undefined');
            setFieldErrors(prev => ({ ...prev, firstName: true }));
            isValid = false;
        } else {
            console.log('First name validation passed:', formData.First);
            setFieldErrors(prev => ({ ...prev, firstName: false }));
        }

        // Last Name validation
        if (!formData.Last?.trim()) {
            console.log('Last name validation failed: empty or undefined');
            setFieldErrors(prev => ({ ...prev, Last: true }));
            isValid = false;
        } else {
            console.log('Last name validation passed:', formData.Last);
            setFieldErrors(prev => ({ ...prev, Last: false }));
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
        if (!formData.Email?.trim()) {
            console.log('Email validation failed: empty or undefined');
            setFieldErrors(prev => ({ ...prev, email: true }));
            setEmailErrorText('Email is required');
            isValid = false;
        } else {
            console.log('Testing email format:', formData.Email);
            console.log('Email regex test result:', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email));
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
                console.log('Email validation failed: invalid format');
                setFieldErrors(prev => ({ ...prev, email: true }));
                setEmailErrorText('Please enter valid Email');
                isValid = false;
            } else {
                console.log('Email validation passed:', formData.Email);
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
            setValue('First', props.firstName || '');
            setValue('Last', props.Last || '');
            setValue('mobile', props.mobileNumber || '');
            setValue('Email', props.emailId || '');
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
    console.log('Component rendered, mobile value:', mobileController.field.value);
    
    const dobController = useController({ name: 'dob', control });


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




    return (
        <div className="flex flex-col items-center justify-start md:justify-center mt-2 min-h-screen w-screen px-4 bg-white">
            {/* Navbar */}
            <Navbar
                patientName={{ firstName: "Jeffery", lastName: "Stevenson" }}
            />

            {/* Header */}
            <div className=" flex justify-content-center text-center py-1 border border-bottom m-0 w-full">
                <Header
                    className="text-lg md:text-lg font-medium text-center"
                    colorVariant="dark"
                    headerText="Add Authorized Individual"
                    size="h3"
                />
                {/* Info Icon */}
                <div className="relative group ml-2 inline-block">
                    <div className="border-2 border-blue-500 rounded-full mt-1 ml-4 p-1 sm:p-1 lg:p-1 flex items-center justify-center hover:bg-blue-100 cursor-pointer">
                        <Icon
                            colorVariant="primary"
                            height="12px"
                            width="12px"
                            isCursorPointer
                            isbadge
                            name="info"
                            stroke
                            fill
                            tooltip
                            tooltipTitle="Add an authorized individual who can access your patient portal account"
                            tooltipPlacement="bottom"
                        />
                    </div>
                </div>
            </div>

            <form
                onSubmit={(e) => {
                    console.log('Form onSubmit triggered');
                }}
                className="bg-white w-full max-w-lg md:p-8 sm:p-6 p-4"
            >
                {/* First Name */}
                <div className="mb-0">
                    <Input
                        label
                        inputType="text"
                        placeholder="Legal First Name"
                        {...register('First')}
                        className="border-2 border-gray-500 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-gray-400"
                    // style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
                    />
                    {errors.First && <p className="text-red-500 text-xs mt-1">{errors.First.message}</p>}
                </div>

                {/* Last Name */}
                <div className="mb-0">
                    <Input
                        name='Last'
                        label
                        id="Last"
                        inputType="text"
                        placeholder="Last Name"
                        {...register('Last')}
                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    // style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
                    />
                    {errors.Last && <p className="text-red-500 text-xs mt-1">{errors.Last.message}</p>}
                </div>

                {/* Mobile */}
                <div className="mb-0">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <Input
                            name="mobile"
                            label
                            inputType="text"
                            value="+1"
                            readonly
                            className="border rounded sm:w-1/6 w-full py-2 px-1 text-gray-700 focus:outline-none focus:shadow-outline"                          // style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
                        />
                        <Input
                            id="mobile"
                            inputType="text"
                            placeholder="(000) 000-0000"
                            value={mobileController.field.value}
                            
                            onChange={(e) => {
                                console.log('=== onChange triggered ===');
                                console.log('Raw input value:', e.target.value);
                                console.log('Current field value:', mobileController.field.value);
                                
                                let rawValue = e.target.value.replace(/[^0-9]/g, '');
                                if (rawValue.length > 10) rawValue = rawValue.slice(0, 10);

                                let formattedValue = '';
                                if (rawValue.length === 0) {
                                    formattedValue = '';
                                } else if (rawValue.length <= 3) {
                                    formattedValue = `(${rawValue}`;
                                } else if (rawValue.length <= 6) {
                                    formattedValue = `(${rawValue.slice(0, 3)}) ${rawValue.slice(3)}`;
                                } else {
                                    formattedValue = `(${rawValue.slice(0, 3)}) ${rawValue.slice(3, 6)}-${rawValue.slice(6)}`;
                                }
                                
                                console.log('Formatted value:', formattedValue);
                                mobileController.field.onChange(formattedValue);
                            }}
                            onKeyDown={(e) => {
                                console.log('=== onKeyDown triggered ===');
                                console.log('Key pressed:', e.key);
                                console.log('Current field value:', mobileController.field.value);
                                console.log('Target value:', e.currentTarget.value);
                                
                                if (e.key === 'Backspace' && mobileController.field.value === '(') {
                                    console.log('Clearing field because value is "("');
                                    mobileController.field.onChange('');
                                    e.preventDefault();
                                } else if (e.key === 'Backspace') {
                                    console.log('Backspace pressed but not clearing (value is not "("))');
                                }
                            }}
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            name={''}
                        />
                    </div>
                </div>
                {/* Email */}
                <div className="mb-4">
                    <Input
                        name='Email'
                        label
                        id="Email"
                        inputType="text"
                        placeholder="Email"
                        {...register('Email')}
                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    // style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }}
                    />
                    {errors.Email && <p className="text-red-500 text-xs mt-1">{errors.Email.message}</p>}
                </div>

                {/* DOB */}
                <div className="mb-3">
                    <label htmlFor="dob" className="block text-md text-gray-700 font-medium mb-2" style={{ color: theme.textfieldLabelColor }}>
                        Set Expiration Date for the access
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
                <div className='m-0'>
                    <TextArea
                        label="Reason"
                        rows={3}
                        className='text-md font-medium text-gray-700'
                        showTitle placeholder={''} />
                </div>
            </form>
            {/* Submit Button */}
            <div className="mt-0 mb-2 pt-2 w-full">
                <div className="flex justify-center items-center p-3 bg-white border-t-2 border-gray-400 mx-10">
                    <Button
                        colorVariant="primary"
                        className="bg-blue-500 hover:bg-blue-700 text-white text-base md:text-xl font-medium py-2 px-10 md:px-20 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => {
                            console.log('Directly calling validatePatient');
                        }}
                    >
                        Proceed
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default AddAuthorizedIndividual;
