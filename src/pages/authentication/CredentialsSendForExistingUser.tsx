import React, { useState, useEffect } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import Footer from "../../components/ui/Footer";
import { Button, Icon } from "@ketan_nimase/ui";
import { toast } from 'react-toastify';
import { AuthenticationService } from '../../services/authentication/UserService';
import { ResetLinkSendRequestModel } from '../../model/patient_portal/ResetLinkSendRequestModel';

interface PageProps {
    logoUrl: string;
    companyName: string;
    recoveryType?: 'username' | 'password';
}

const theme = await getTheme();

const CredentialsSendForExistingUser: React.FC<PageProps> = ({ recoveryType = 'username' }) => {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [isResending, setIsResending] = useState(false);

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
        return recoveryType === 'username' ? 'Recover your Username' : 'Recover your account';
    };

    const getSuccessMessage = () => {
        return recoveryType === 'username'
            ? 'We have sent a verification email with your username.'
            : 'We have sent a verification email with password reset instructions.';
    };

    return (
        <div className="flex min-h-screen w-screen">
            {/* Left Panel */}
            <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10 relative">
                <img
                    src={
                        GlobalParams.LOGO
                            ? `data:image/jpeg;base64,${GlobalParams.LOGO}`
                            : ''
                    }
                    alt="Company Logo"
                    className="w-90 h-30 inline-block align-middle"
                />
                <div className="absolute bottom-5 left-5 text-xs text-gray-400">
                    <Footer />
                </div>
            </div>

            {/* Right Panel */}
            <div
                className="w-1/2 flex flex-col justify-center items-center p-10"
                style={{ backgroundColor: theme.BGColor, color: theme.secondaryTextColor }}
            >
                <div className="w-full max-w-md">
                    {/* Lock Icon - Centered */}
                    <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
                            <Icon
                                name="lock"
                                height="40px"
                                width="40px"
                                colorVariant="light"
                                stroke
                            />
                        </div>
                    </div>

                    {/* Dynamic Title */}
                    <h1 className="text-3xl font-light text-center mb-6 text-white">
                        {getTitle()}
                    </h1>

                    {/* Success Message - Left Aligned */}
                    <p className="text-lg text-white mb-8 text-left">
                        {getSuccessMessage()}
                    </p>

                    {/* Didn't receive email section - Left Aligned */}
                    <div className="mb-2 text-left">
                        <p className="text-white mb-2">
                            Didn't receive the email yet?
                        </p>
                    </div>

                    {/* Timer and Resend Section - Left Aligned */}
                    <div className="mb-8 text-left">
                        {isTimerActive ? (
                            <div>
                                <p className="text-white mb-2">
                                    Check your spam folder or resend email in:
                                </p>
                                <p className="text-yellow-300 text-lg font-medium">
                                    {formatTime(timeLeft)}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-white mb-4">
                                    Check your spam folder or{' '}
                                    <button
                                        onClick={handleResendEmail}
                                        disabled={isResending}
                                        className="text-white mb-4 hover:no-underline disabled:opacity-50"
                                        style={{ backgroundColor: theme.BGColor }}
                                    >
                                        {isResending ? 'Sending...' : 'Resend Email'}
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Back to Login Button - Left Aligned */}
                    <div className="mt-8 text-left">
                        <Button
                            colorVariant="default"
                            onClick={() => window.history.back()}
                            className="px-8 py-2 rounded-lg border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Back to Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CredentialsSendForExistingUser;
