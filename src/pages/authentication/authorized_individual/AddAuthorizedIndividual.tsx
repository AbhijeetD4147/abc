import React, { useState, useEffect } from 'react';
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

// const phoneRegex = /^\(\d{3}\)[-.]?\d{3}[-.]?\d{4}$/;
const phoneRegex = /^\(\d{3}\)\s?\d{3}[-.]?\d{4}$/;

const formSchema = z.object({
    First: z.string().min(1, 'First Name is required!'),
    Last: z.string().min(1, 'Last Name is required!'),
    countryCode: z.literal('+1'),
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
            const formats = ['MM/DD/YYYY', 'M/D/YYYY', 'MM/D/YYYY', 'M/DD/YYYY'];
            return formats.some((format) => dayjs(val, format, true).isValid());
        }, {
            message: 'Please enter a valid date in MM/DD/YYYY format'
        })
});

type FormData = z.infer<typeof formSchema>;

import { AuthenticationAuthUserService } from '../../../services/authentication/AuthUserService';
import { AuthenticationService } from '../../../services/authentication/UserService';
import { AddAuthorizedIndividualRequestModel } from '../../../model/authentication/AddAuthorizedIndividualRequestModel';
import { ValidatePatientForAddIndividualResponse } from '../../../model/patient_portal/ValidatePatientForAddIndividualResponse';

const AddAuthorizedIndividual: React.FC<SignUpPageProps> = (props) => {
    const [value,] = useState('');
    const navigate = useNavigate();
    const [theme, setTheme] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [reason, setReason] = useState('');

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            First: '',
            Last: '',
            countryCode: '+1',
            mobile: '',
            Email: '',
            dob: ''
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const firstController = useController({ name: 'First', control });
    const lastController = useController({ name: 'Last', control });
    const emailController = useController({ name: 'Email', control });
    const mobileController = useController({ name: 'mobile', control });
    const dobController = useController({ name: 'dob', control });
    const countryCodeController = useController({ name: 'countryCode', control });

    useEffect(() => {
        getTheme().then(setTheme);
        if (props.title === "Sign Up as Patient") {
            setValue('First', props.firstName || '');
            setValue('Last', props.Last || '');
            setValue('mobile', props.mobileNumber || '');
            setValue('Email', props.emailId || '');
        }
    }, []);

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const authService = new AuthenticationAuthUserService();
            const userService = new AuthenticationService();

            const authPatientValidateData = {
                PracticeName: GlobalParams.PRACTICE_NAME,
                FirstName: data.First.trim(),
                LastName: data.Last.trim(),
                Mobile: data.mobile.trim(),
                Email: data.Email.trim(),
                UserId: GlobalParams.USER_ID
            };

            await authService.validateAuthPatient(authPatientValidateData);

            if (authService.response_Status_Code_API_1 === 200) {
                const validateResponse = authService.validatePatientForAddIndividualResponse;

                const addIndividualRequest = new AddAuthorizedIndividualRequestModel({
                    firstName: data.First.trim(),
                    lastName: data.Last.trim(),
                    mobile: data.mobile.trim(),
                    email: data.Email.trim(),
                    locationId: 0,
                    userId: Number(GlobalParams.USER_ID),
                    ptCustomerId: validateResponse?.ptCustomerId || 0,
                    expiryDate: data.dob,
                    reason: reason
                });

                if (validateResponse?.isExist) {
                    if (GlobalParams.MAXIMEYES_PATIENT_NUMBER === validateResponse.patientNumber) {
                        // Show error toast
                        console.error('You cannot add yourself as Authorized User!');
                    } else if (validateResponse.matchType === "AuthAlreadyAdded") {
                        // Show warning toast
                        console.warn('Authorized User already exists!');
                    } else if (validateResponse.matchType === "AccountExist") {
                        navigate('/auth-individual-record-match-found', {
                            state: {
                                responseData: validateResponse,
                                accessData: addIndividualRequest
                            }
                        });
                    } else if (validateResponse.patientNumber === "" &&
                        (validateResponse.matchType === "ExistingAuthPartialMatch" ||
                            validateResponse.matchType === "ExistingPatientPartialMatch")) {
                        navigate('/auth-individual-record-match-found', {
                            state: {
                                responseData: validateResponse,
                                accessData: addIndividualRequest,
                                alertMsg: "We have found a similar matching record\nwith us but with different details. Did you\nenter details correctly?"
                            }
                        });
                    } else {
                        navigate('/auth-individual-record-match-found', {
                            state: {
                                responseData: validateResponse,
                                accessData: addIndividualRequest,
                                alertMsg: "We have found a matching record with us."
                            }
                        });
                    }
                }
                else if (!validateResponse.isExist) {
                    await userService.addAuthPatient(addIndividualRequest, validateResponse.matchType);
                    const insertResponse = userService.insertAuthorizedIndividualModel;
                    if (insertResponse?.insertStatus) {
                        navigate('/auth-access-granted', {
                            state: {
                                locationPhone: insertResponse.locationPhone,
                                firstName: data.First.trim(),
                                lastName: data.Last.trim()
                            }
                        });
                    } else {
                        console.error('An unexpected error occurred. Please try again later.');
                    }
                }
                else if (userService.response_Status_Code_API_14 !== 205) {
                    console.error('An unexpected error occurred. Please try again later.');
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start md:justify-center mt-2 min-h-screen w-screen px-4 bg-white">
            <Navbar />
            <div className="flex justify-content-center text-center py-1 border border-bottom m-0 w-full">
                <Header
                    className="text-lg md:text-lg font-medium text-center"
                    colorVariant="dark"
                    headerText="Add Authorized Individual"
                    size="h3"
                />
                <div className="relative group ml-2 inline-block">
                    <div className="border-2 border-blue-500 rounded-full mt-1 ml-4 p-1 flex items-center justify-center hover:bg-blue-100 cursor-pointer">
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

            <form onSubmit={handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Prevent Enter from submitting the form
                    }
                }}
                className="bg-white w-full max-w-lg md:p-8 sm:p-6 p-4">
                {/* First Name */}
                <div className="mb-0">
                    <Input
                        inputType="text"
                        label
                        placeholder="Legal First Name"
                        value={firstController.field.value}
                        onChange={firstController.field.onChange}
                        className="border-2 border-gray-500 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-gray-400" name={"First name"} />
                    {errors.First && <p className="text-red-500 text-xs mt-1">{errors.First.message}</p>}
                </div>

                {/* Last Name */}
                <div className="mb-0">
                    <Input
                        label
                        name='Last Name'
                        inputType="text"
                        placeholder="Last Name"
                        value={lastController.field.value}
                        onChange={lastController.field.onChange}
                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    />
                    {errors.Last && <p className="text-red-500 text-xs mt-1">{errors.Last.message}</p>}
                </div>

                {/* Mobile */}
                <div className="mb-0">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <Input
                            label
                            name='Mobile Number'
                            value={countryCodeController.field.value}
                            readonly
                            className="border rounded sm:w-1/6 w-full py-2 px-1 text-gray-700 focus:outline-none focus:shadow-outline"
                        />
                        <Input
                            label
                            name=''
                            inputType="text"
                            placeholder="(000) 000-0000"
                            value={mobileController.field.value}
                            onChange={(e) => {
                                let raw = e.target.value.replace(/[^0-9]/g, '');
                                if (raw.length > 10) raw = raw.slice(0, 10);
                                let formatted = '';
                                if (raw.length <= 3) formatted = `(${raw}`;
                                else if (raw.length <= 6) formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
                                else formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6)}`;
                                mobileController.field.onChange(formatted);
                            }}
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <Input
                        label
                        name='Email'
                        inputType="text"
                        placeholder="Email"
                        value={emailController.field.value}
                        onChange={emailController.field.onChange}
                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    />
                    {errors.Email && <p className="text-red-500 text-xs mt-1">{errors.Email.message}</p>}
                </div>

                {/* DOB */}
                <div className="mb-3">
                    <label className="block text-md text-gray-700 font-medium mb-2" style={{ color: theme.textfieldLabelColor }}>
                        Set Expiration Date for the access
                    </label>
                    <DatePicker
                        restrictDateSelection="after"
                        value={dobController.field.value}
                        onChange={(date: Date) => {
                            const formatted = dayjs(date).format('MM/DD/YYYY');
                            dobController.field.onChange(formatted);
                        }}
                        onChangeRaw={(value: string) => dobController.field.onChange(value)}
                        error={!!errors.dob}
                        enhancedInput={true}

                    />
                    {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
                </div>

                {/* Reason */}
                <div className='m-0'>

                    <TextArea
                        label="Reason"
                        rows={3}
                        className='text-md font-medium text-gray-700'
                        showTitle
                        placeholder=""
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />

                    {/* <Button
                        type='submit'
                        colorVariant="primary"
                        className="bg-blue-500 hover:bg-blue-700 text-white text-base md:text-xl font-medium py-2 px-10 md:px-20 rounded focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Proceed'}
                    </Button> */}
                </div>

                <div className="mt-0 mb-2 pt-2 w-full">
                    <div className="flex justify-center items-center p-3 bg-white border-t-2 border-gray-400 mx-10">
                        <Button
                            type='submit'
                            colorVariant="primary"
                            className="bg-blue-500 hover:bg-blue-700 text-white text-base md:text-xl font-medium py-2 px-10 md:px-20 rounded focus:outline-none focus:shadow-outline"
                        >
                            Proceed
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddAuthorizedIndividual;
