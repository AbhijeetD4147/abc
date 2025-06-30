import React, { useState, useEffect } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import Footer from "../../components/ui/Footer";
import { Button, Icon } from "@ketan_nimase/ui";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthenticationService } from '../../services/authentication/UserService';
import { ResetLinkSendRequestModel } from '../../model/patient_portal/ResetLinkSendRequestModel';
import MaximEyes from '../../assets/maximeyeslogo.png';

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

                    // Store email in localStorage for the credentials-sent page
                    localStorage.setItem('recovery_email', email.trim());

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
        navigate('/login');
    };

    return (
        <div className="container-fluid d-flex flex-column min-vh-100 min-vw-100 p-0">
            <div className="row flex-grow-1 g-0">
                {/* Left Panel */}
                <div className="col-12 col-md-6 d-flex flex-column bg-white p-2 p-md-5">
                    {/* Centered Logo */}
                    <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                        <img
                            src={
                                GlobalParams.LOGO
                                    ? `data:image/jpeg;base64,${GlobalParams.LOGO}`
                                    : ''
                            }
                            alt="Company Logo"
                            className="img-fluid"
                            style={{ maxWidth: '240px', height: 'auto' }}
                        />
                    </div>

                    {/* Footer at Bottom */}
                    <div className="flex-shrink-0">
                        <div className="d-none d-md-flex justify-content-between align-items-center gap-2">
                            <img src={MaximEyes} alt="Maximeyes Logo" className="img-fluid" style={{ height: '64px', width: 'auto' }} />
                            <div className="text-end" style={{ fontSize: '0.75rem' }}>
                                &copy; 2025, First Insight Corporation. All rights reserved.
                            </div>
                        </div>
                        <div className="d-flex d-md-none align-items-center justify-content-between gap-3 px-2 py-2 bg-white rounded">
                            <img src={MaximEyes} alt="Maximeyes Logo" className="img-fluid" style={{ height: '32px', width: 'auto' }} />
                            <div className="text-center text-muted" style={{ fontSize: '0.75rem' }}>
                                &copy; 2025, First Insight Corporation. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div
                    className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-3 p-md-5"
                    style={{
                        backgroundColor: theme.BGColor,
                        color: theme.secondaryTextColor,
                    }}
                >
                    <div className="w-100" style={{ maxWidth: '400px' }}>
                        {/* Header Icon */}
                        <div className="d-flex justify-content-center mb-4 position-relative">
                            <div
                                className="border border-2 rounded-circle p-3 p-sm-4 p-lg-5 d-flex align-items-center justify-content-center"
                                style={{
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#0d6efd';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                <Icon
                                    colorVariant="light"
                                    disabled
                                    height="60px"
                                    isCursorPointer
                                    isbadge
                                    name="user"
                                    stroke
                                    width="60px"
                                />
                            </div>
                        </div>

                        {/* Title & Subtitle */}
                        <h1 className="h2 fw-light text-center mb-2 text-white">
                            Recover your Username
                        </h1>
                        <div className="text-center mb-4 text-white" style={{ fontSize: '0.875rem' }}>
                            <p className="mb-1">We can help you reset your Username.</p>
                            <p className="mb-0">Follow the instruction below.</p>
                        </div>

                        {/* Email Input */}
                        <div className="mb-3">
                            <div className="position-relative">
                                <div className="position-absolute top-50 start-0 translate-middle-y ps-3">
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
                                    className={`form-control ps-5 py-2 ${emailError ? 'border-danger bg-danger bg-opacity-10' : 'border-secondary'
                                        }`}
                                    style={{
                                        borderWidth: '2px',
                                        borderRadius: '0.5rem'
                                    }}
                                />
                            </div>
                            {emailError && (
                                <div className="bg-danger text-white px-3 py-2 mt-1 fw-medium" style={{
                                    fontSize: '0.875rem',
                                    borderRadius: '0 0 0.5rem 0.5rem'
                                }}>
                                    {emailError}
                                </div>
                            )}
                        </div>

                        {/* Captcha Section */}
                        <div className="mb-4">
                            <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                                <div className="bg-white px-3 py-2 border border-2 border-secondary rounded fw-bold text-dark" style={{
                                    fontFamily: 'monospace',
                                    fontSize: '1.125rem',
                                    letterSpacing: '0.1em'
                                }}>
                                    {captchaCode}
                                </div>
                                <button
                                    type="button"
                                    onClick={getCaptchaFromAPI}
                                    className="btn btn-link text-white text-decoration-underline p-0"
                                    style={{
                                        backgroundColor: 'transparent',
                                        fontSize: '1.25rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.classList.remove('text-decoration-underline');
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.classList.add('text-decoration-underline');
                                    }}
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
                                className={`form-control py-2 ${captchaError ? 'border-danger bg-danger ' : 'border-secondary'
                                    }`}
                                style={{
                                    borderWidth: '2px',
                                    borderRadius: '0.5rem'
                                }}
                            />
                            {captchaError && (
                                <div className="bg-danger text-white px-3 py-2 mt-1 fw-medium" style={{
                                    fontSize: '0.875rem',
                                    borderRadius: '0 0 0.5rem 0.5rem'
                                }}>
                                    {captchaError}
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="d-flex flex-column flex-sm-row gap-2">
                            <Button
                                colorVariant="default"
                                onClick={handleCancel}
                                className="btn btn-outline-light flex-fill py-2"
                                isDisabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorVariant="default"
                                onClick={handleSubmit}
                                className="btn btn-outline-light flex-fill py-2"
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
        </div>
    );
};

export default ForgotUsername;
