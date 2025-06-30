import React, { useState, useEffect } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import Footer from "../../components/ui/Footer";
import { Button, Icon } from "@ketan_nimase/ui";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthenticationService } from '../../services/authentication/UserService';
import MaximEyes from '../../assets/maximeyeslogo.png';
import { ResetLinkSendRequestModel } from '../../model/patient_portal/ResetLinkSendRequestModel';

interface PageProps {
    logoUrl: string;
    companyName: string;
    recoveryType?: 'username' | 'password' | 'userinfo';
}

const theme = await getTheme();

const CredentialsSendForExistingUser: React.FC<PageProps> = ({ recoveryType }) => {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [isResending, setIsResending] = useState(false);
    const navigate = useNavigate();

    // Timer effect
    useEffect(() => {
        if (!isTimerActive || timeLeft <= 0) {
            if (timeLeft <= 0) {
                setIsTimerActive(false);
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsTimerActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isTimerActive, timeLeft]);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')} : ${remainingSeconds.toString().padStart(2, '0')} minutes`;
    };

    // Handle resend email
    const handleResendEmail = async () => {
        setIsResending(true);

        try {
            // Create request model
            const resetLinkSendRequestModel = new ResetLinkSendRequestModel({
                userEmail: localStorage.getItem('recovery_email') || '',
                urlName: GlobalParams.PRACTICE_NAME
            });

            // Initialize AuthenticationService
            const authService = new AuthenticationService();

            // Call appropriate API based on recovery type
            if (recoveryType === 'username') {
                await authService.resetLinkForForgotUserName(resetLinkSendRequestModel);

                if (authService.response_Status_Code_API_5 === 200) {
                    toast.success('Username recovery email has been resent successfully');
                    // Reset timer
                    setTimeLeft(300);
                    setIsTimerActive(true);
                } else {
                    toast.error('Failed to resend email. Please try again.');
                }
            } else if (recoveryType === 'userinfo') {
                // For credentials recovery - you may need to add this method to AuthenticationService
                // await authService.resetLinkForForgotCredentials(resetLinkSendRequestModel);

                if (authService.response_Status_Code_API_7 === 200) {
                    toast.success('Credentials recovery email has been resent successfully');
                    // Reset timer
                    setTimeLeft(300);
                    setIsTimerActive(true);
                } else {
                    toast.error('Failed to resend email. Please try again.');
                }
            } else {
                // For password recovery
                await authService.resetLinkForForgotPassword(resetLinkSendRequestModel);

                if (authService.response_Status_Code_API_6 === 200) {
                    toast.success('Password recovery email has been resent successfully');
                    // Reset timer
                    setTimeLeft(300);
                    setIsTimerActive(true);
                } else {
                    toast.error('Failed to resend email. Please try again.');
                }
            }
        } catch (error) {
            toast.error('Failed to resend email. Please try again.');
        } finally {
            setIsResending(false);
        }
    };

    // Dynamic content based on recovery type
    const getTitle = () => {
        if (recoveryType === 'username') {
            return 'Recover your Username';
        } else if (recoveryType === 'userinfo') {
            return 'Your Credentials';
        } else {
            return 'Recover your account';
        }
    };

    const getSuccessMessage = () => {
        if (recoveryType === 'username') {
            return 'We have sent a verification email with your username.';
        } else if (recoveryType === 'userinfo') {
            return 'We have sent a verification email.';
        } else {
            return 'We have sent a verification email with password reset instructions.';
        }
    };

    return (
        <div className="container-fluid min-vh-100 min-vw-100 p-0">
            <div className="row g-0 min-vh-100">
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
                    className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-5"
                    style={{ backgroundColor: theme.BGColor, color: theme.secondaryTextColor }}
                >
                    <div className="w-100" style={{ maxWidth: '400px' }}>
                        {/* Lock Icon - Centered */}
                        <div className="d-flex justify-content-center mb-4">
                            <div className="border border-3 rounded-circle p-4 d-flex align-items-center justify-content-center">
                                <Icon
                                    colorVariant="light"
                                    height="60px"
                                    isbadge
                                    name="lock"
                                    stroke
                                    width="60px"
                                />
                            </div>
                        </div>

                        {/* Dynamic Title */}
                        <h1 className="h2 fw-light text-center mb-4 text-white">
                            {getTitle()}
                        </h1>

                        {/* Success Message - Left Aligned */}
                        <p className="fs-5 text-white mb-4 text-start">
                            {getSuccessMessage()}
                        </p>

                        {/* Didn't receive email section - Left Aligned */}
                        <div className="mb-2 text-start">
                            <p className="text-white mb-2">
                                Didn't receive the email yet?
                            </p>
                        </div>

                        {/* Timer and Resend Section - Left Aligned */}
                        <div className="mb-4 text-start">
                            {isTimerActive ? (
                                <div>
                                    <p className="text-white mb-2">
                                        Check your spam folder or resend email in:
                                    </p>
                                    <p className="text-warning fs-5 fw-medium">
                                        {formatTime(timeLeft)}
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-white mb-3">
                                        Check your spam folder or{' '}
                                        <button
                                            onClick={handleResendEmail}
                                            disabled={isResending}
                                            className="btn btn-link text-white p-0 text-decoration-none"
                                            style={{
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                opacity: isResending ? 0.5 : 1,
                                                transition: 'opacity 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isResending) {
                                                    e.currentTarget.style.textDecoration = 'underline';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.textDecoration = 'none';
                                            }}
                                        >
                                            {isResending ? 'Sending...' : 'Resend Email'}
                                        </button>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Back to Login Button - Left Aligned */}
                        <div className="mt-4 text-start">
                            <Button
                                colorVariant="default"
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 rounded border border-2 border-white text-white bg-transparent"
                            >
                                Back to Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CredentialsSendForExistingUser;
