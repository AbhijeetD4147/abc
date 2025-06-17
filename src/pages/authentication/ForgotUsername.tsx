import React, { useState, useEffect } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import Footer from "../../components/ui/Footer";
import { Button, Icon } from "@ketan_nimase/ui";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthenticationService } from '../../services/authentication/UserService';
import { ResetLinkSendRequestModel } from '../../model/patient_portal/ResetLinkSendRequestModel';

interface PageProps {
    logoUrl: string;
    companyName: string;
}

const theme = await getTheme();


// Update your component to use the logoUrl prop
const ForgotUsername: React.FC<PageProps> = ({ logoUrl, companyName }) => {
    const [email, setEmail] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaCode, setCaptchaCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    const navigate = useNavigate();

    // Generate random captcha
    const generateCaptcha = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaCode(result);
        setCaptchaInput('');
        setCaptchaError('');
    };

    // Get captcha from API
    const getCaptchaFromAPI = async () => {
        try {
            // Initialize AuthenticationService
            const authService = new AuthenticationService();

            // Call API to get captcha
            await authService.getCaptcha();

            if (authService.response_Status_Code_API_11 === 200) {
                setCaptchaCode(authService.captchaCode || '');
                setCaptchaInput('');
                setCaptchaError('');
            } else if (authService.response_Status_Code_API_11 !== 205) {
                toast.error('An unexpected error has occurred. Please try again later.');
                // Fallback to client-side captcha generation
                generateCaptcha();
            }
        } catch (error) {
            console.error('Error getting captcha:', error);
            // Fallback to client-side captcha generation
            generateCaptcha();
        }
    };

    // Initialize captcha on component mount
    useEffect(() => {
        getCaptchaFromAPI();
    }, []);

    // Email validation
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle email input change
    // Update the handleEmailChange function (around line 40-50)
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        // Clear error when user starts typing
        if (value.length > 0) {
            if (!validateEmail(value)) {
                setEmailError('Please enter valid Email');
            } else {
                setEmailError('');
            }
        } else {
            // Clear error when field is empty during typing
            setEmailError('');
        }
    };

    const handleEmailBlur = () => {
        if (!email || email.trim() === '') {
            setEmailError('Email ID required');
        }
    };

    // Update the handleSubmit function validation (around line 60-80)
    const handleSubmit = async () => {
        // Validate email
        if (!email || email.trim() === '') {
            setEmailError('Email ID required');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Please enter valid Email');
            return;
        }

        // Validate captcha
        if (!captchaInput) {
            setCaptchaError('Please enter the captcha');
            return;
        }

        if (captchaInput !== captchaCode) {
            setCaptchaError('Captcha does not match');
            return;
        }

        setIsLoading(true);

        try {
            // Create request model
            const resetLinkSendRequestModel = new ResetLinkSendRequestModel({
                userEmail: email.trim(),
                urlName: GlobalParams.PRACTICE_NAME
            });

            // Initialize AuthenticationService
            const authService = new AuthenticationService();

            // Call API
            await authService.resetLinkForForgotUserName(resetLinkSendRequestModel);

            // Check response status
            if (authService.response_Status_Code_API_5 === 200) {
                const response = authService.resetLinkForgotUsernameSendResponse;

                if (response && response.userId && response.userId > 0) {
                    toast.success('Username recovery instructions have been sent to your email');

                    // Reset form
                    setEmail('');
                    setCaptchaInput('');
                    generateCaptcha();
                    navigate('/credentials-sent');
                } else {
                    toast.error('Failed to send recovery instructions. Please try again.');
                    generateCaptcha(); // Refresh captcha on error
                }
            } else if (authService.response_Status_Code_API_5 === 205) {
                // Session invalid
                toast.error('Your session has expired. Please try again.');
                generateCaptcha();
            } else {
                toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
                generateCaptcha();
            }
        } catch (error) {
            toast.error('Failed to send recovery instructions. Please try again.');
            generateCaptcha(); // Refresh captcha on error
        } finally {
            setIsLoading(false);
        }
    };

    // Handle captcha input change
    const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCaptchaInput(value);

        if (value && value !== captchaCode) {
            setCaptchaError('Captcha does not match');
        } else {
            setCaptchaError('');
        }
    };

    // Handle cancel
    const handleCancel = () => {
        // TODO: Navigate back to login page
        window.history.back();
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen w-screen">
            {/* Left Panel */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-6 md:p-10 relative">
                <img
                    src={
                        logoUrl || GlobalParams.LOGO
                            ? `data:image/jpeg;base64,${logoUrl || GlobalParams.LOGO}`
                            : ''
                    }
                    alt="Company Logo"
                    className="w-40 h-auto mb-4"
                />
                <div className="absolute bottom-3 left-3 text-xs text-gray-400">
                    <Footer />
                </div>
            </div>

            {/* Right Panel */}
            <div
                className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10"
                style={{
                    backgroundColor: theme.BGColor,
                    color: theme.secondaryTextColor,
                }}
            >
                <div className="w-full max-w-md">
                    {/* Header Icon */}
                    <div className="flex justify-center mb-8 relative">
                        <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
                            <Icon
                                name="user"
                                height="40px"
                                width="40px"
                                colorVariant="light"
                                stroke
                            />
                        </div>
                        <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
                            <Icon
                                name="lock"
                                height="20px"
                                width="20px"
                                colorVariant="light"
                                stroke
                            />
                        </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h1 className="text-3xl font-light text-center mb-2 text-white">
                        Recover your Username
                    </h1>
                    <div className="text-center mb-5 text-white text-sm">
                        <p>We can help you reset your Username.</p>
                        <p>Follow the instruction below.</p>
                    </div>

                    {/* Email Input */}
                    <div className="mb-3">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 pb-2 flex items-center pointer-events-none">
                                <Icon
                                    name="user"
                                    height="20px"
                                    width="20px"
                                    colorVariant="dark"
                                    stroke
                                />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={handleEmailBlur}
                                placeholder="Your Email Address"
                                className={`w-full pl-10 pr-4 py-2 rounded-lg text-gray-900 placeholder-gray-600 border-2 ${emailError
                                    ? 'border-red-600 bg-red-100'
                                    : 'border-gray-300 bg-white'
                                    } focus:outline-none focus:border-blue-500`}
                            />
                        </div>
                        {emailError && (
                            <div className="bg-red-600 text-white px-4 py-2 rounded-b-lg -mt-1 text-sm font-medium">
                                {emailError}
                            </div>
                        )}
                    </div>

                    {/* Captcha Section */}
                    <div className="mb-6">
                        <div className="flex items-center mb-4 flex-wrap gap-2">
                            <div className="bg-white px-4 py-2 rounded border-2 border-gray-300 font-mono text-lg font-bold text-gray-800 tracking-wider">
                                {captchaCode}
                            </div>
                            <button
                                type="button"
                                onClick={getCaptchaFromAPI}
                                className="text-white text-xl underline hover:no-underline"
                                style={{ backgroundColor: theme.BGColor }}
                            >
                                Refresh
                            </button>
                        </div>

                        <p className="text-white mb-2">Input symbols</p>
                        <input
                            type="text"
                            value={captchaInput}
                            onChange={handleCaptchaChange}
                            placeholder="Enter the symbols shown above"
                            className={`w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-600 border-2 ${captchaError
                                ? 'border-red-600 bg-red-100'
                                : 'border-gray-300 bg-white'
                                } focus:outline-none focus:border-blue-500`}
                        />
                        {captchaError && (
                            <div className="bg-red-600 text-white px-4 py-2 rounded-b-lg -mt-1 text-sm font-medium">
                                {captchaError}
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                        <Button
                            colorVariant="default"
                            onClick={handleCancel}
                            className="w-full sm:flex-1 py-2 rounded-lg border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 transition-colors"
                            isDisabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorVariant="default"
                            onClick={handleSubmit}
                            className="w-full sm:flex-1 py-2 rounded-lg border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 transition-colors"
                            isDisabled={
                                isLoading || !!emailError || !!captchaError || !email || !captchaInput
                            }
                        >
                            {isLoading ? 'Processing...' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotUsername;
