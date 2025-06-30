import React, { useState, useEffect } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import Footer from "../../components/ui/Footer";
import { Button, Icon } from "@ketan_nimase/ui";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthenticationService } from '../../services/authentication/UserService';
import { ResetPasswordLinkRequestModel } from '../../model/patient_portal/ResetPasswordLinkRequestModel';
import MaximEyes from '../../assets/maximeyeslogo.png';
import { ForgotPasswordGUIDVerificationResponseModel } from '../../model/patient_portal/ForgotPasswordGUIDVerificationResponseModel';
import { ForgotUpdatePasswordResponseModel } from '../../model/patient_portal/ForgotUpdatePasswordResponseModel';

interface PageProps {
    logoUrl: string;
    companyName: string;
}

const theme = await getTheme();

const ForgotPassword: React.FC<PageProps> = () => {
    const [username, setUsername] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaCode, setCaptchaCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    const navigate = useNavigate();

    // Replace client-side captcha generation with API call
    const generateCaptcha = async () => {
        try {
            setIsLoading(true);
            // Create instance of AuthenticationService
            const authService = new AuthenticationService();
            await authService.getCaptcha();

            if (authService.response_Status_Code_API_11 === 200) {
                setCaptchaCode(authService.captchaCode || '');
                setCaptchaInput('');
                setCaptchaError('');
            } else {
                toast.error('Failed to generate captcha. Please try again.');
            }
        } catch (error) {
            console.error('Error generating captcha:', error);
            toast.error('Failed to generate captcha. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Initialize captcha on component mount
    useEffect(() => {
        generateCaptcha();
    }, []);

    // Username validation
    const validateUsername = (username: string) => {
        // Basic username validation - adjust as needed
        return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
    };

    // Handle username input change
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);

        // Clear error when user starts typing
        if (value.length > 0) {
            if (!validateUsername(value)) {
                setUsernameError('Please enter valid Username');
            } else {
                setUsernameError('');
            }
        } else {
            // Clear error when field is empty during typing
            setUsernameError('');
        }
    };

    const handleUsernameBlur = () => {
        if (!username || username.trim() === '') {
            setUsernameError('Username required');
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        // Validate username
        if (!username || username.trim() === '') {
            setUsernameError('Username required');
            return;
        }

        if (!validateUsername(username)) {
            setUsernameError('Please enter valid Username');
            return;
        }

        // Validate captcha
        if (!captchaInput) {
            setCaptchaError('Please enter the captcha');
            return;
        }

        if (captchaInput !== captchaCode.trim()) {
            setCaptchaError('Captcha does not match');
            return;
        }

        setIsLoading(true);

        try {
            // Create instance of AuthenticationService
            const authService = new AuthenticationService();

            // Create request model
            const resetPasswordLinkRequestModel = new ResetPasswordLinkRequestModel({
                userName: username,
                urlName: GlobalParams.PRACTICE_NAME
            });

            // Call API to send reset link
            await authService.resetLinkForForgotPassword(resetPasswordLinkRequestModel);

            if (authService.response_Status_Code_API_6 === 200) {
                const response = authService.resetLinkForgotPasswordSendResponse;
                console.log('API response:', response);
                console.log('Email response:', response?.emailResponse);

                if (response?.emailResponse === 'Mail Sent Successfully.' || response?.emailResponse === 'Success') {
                    toast.success('Password recovery instructions have been sent to your registered email');
                    console.log('Navigating to /password-reset-sent');
                    navigate('/password-reset-sent');
                } else if (response?.isAccountLocked) {
                    toast.error(`Your account is locked. Please try again after ${response.timeRemaining} minutes.`);
                } else {
                    toast.error('Failed to send recovery instructions. Please try again.');
                }
            } else {
                toast.error('Failed to send recovery instructions. Please try again.');
            }

            // Reset form
            setUsername('');
            setCaptchaInput('');
            generateCaptcha();

        } catch (error) {
            console.error('Error sending reset link:', error);
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

        if (value && value !== captchaCode.trim()) {
            setCaptchaError('Captcha does not match');
        } else {
            setCaptchaError('');
        }
    };

    // Handle cancel
    const handleCancel = () => {
        navigate('/login');
    };


    // Add this method to handle password update
    const updatePassword = async (password: string, confirmPassword: string) => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            const authService = new AuthenticationService();
            const passwordResetModel = {
                guid: GlobalParams.SESSION_GUID,
                password: password
            };

            await authService.changePassword(passwordResetModel);

            if (authService.response_Status_Code_API_24 === 200) {
                const response = authService.forgotUpdatePasswordResponseModel;

                if (response?.status === "Success") {
                    toast.success("Password updated successfully");
                    navigate("/login");
                } else {
                    toast.error(response?.text || "Failed to update password. Please try again.");
                }
            } else {
                toast.error("Failed to update password. Please try again.");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("Failed to update password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Add state for flow control
    const [currentFlow, setCurrentFlow] = useState("flowOne"); // flowOne, flowTwo, flowThree, flowFour
    const [locationPhone, setLocationPhone] = useState("");



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
                    style={{ backgroundColor: theme.BGColor, color: theme.secondaryTextColor }}
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
                                    height="60px"
                                    isCursorPointer
                                    isbadge
                                    name="user"
                                    stroke
                                    width="60px"
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="h2 fw-light text-center mb-2 text-white">
                            Recover your account
                        </h1>

                        {/* Subtitle */}
                        <div className="text-center mb-4 text-white" style={{ fontSize: '0.875rem' }}>
                            <p className="mb-1">We can help you reset your password.</p>
                            <p className="mb-0">Follow the instruction below.</p>
                        </div>

                        {/* Username Input */}
                        <div className="mb-3">
                            <div className="position-relative">
                                <div className="position-absolute top-50 start-0 translate-middle-y ps-3">
                                    <Icon name="user" height="20px" width="20px" colorVariant="dark" stroke />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    onBlur={handleUsernameBlur}
                                    placeholder="Username"
                                    className={`form-control ps-5 py-2 ${usernameError ? 'border-danger bg-danger bg-opacity-10' : 'border-secondary'
                                        }`}
                                    style={{
                                        borderWidth: '2px',
                                        borderRadius: '0.5rem'
                                    }}
                                />
                            </div>
                            {usernameError && (
                                <div className="bg-danger text-white px-3 py-2 mt-1 fw-medium" style={{
                                    fontSize: '0.875rem',
                                    borderRadius: '0 0 0.5rem 0.5rem'
                                }}>
                                    {usernameError}
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
                                    onClick={generateCaptcha}
                                    className="btn btn-link text-white text-decoration-underline p-0"
                                    style={{
                                        backgroundColor: 'transparent',
                                        fontSize: '1rem'
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
                                className={`form-control py-2 ${captchaError ? 'border-danger bg-danger bg-opacity-10' : 'border-secondary'
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

                        {/* Action Buttons */}
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
                                    isLoading || !!usernameError || !!captchaError || !username || !captchaInput
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

export default ForgotPassword;
