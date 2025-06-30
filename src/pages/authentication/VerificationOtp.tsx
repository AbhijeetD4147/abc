import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Header, Icon } from '@ketan_nimase/ui';
import { AuthenticationService } from "../../services/authentication/UserService";
import 'bootstrap/dist/css/bootstrap.min.css';

interface LocationState {
    locationId?: string;
    practiceName?: string;
    firstName?: string;
    lastName?: string;
    preferredName?: string;
    countryCode?: string;
    mobile?: string;
    email?: string;
    dob?: string;
    isExpired?: boolean;
    photo?: string;
    gender?: string;
    ptCustomerId?: number;
    locationID?: number;
    source?: string;
    selfPay?: boolean;
    patientscheduleid?: number;
    [key: string]: any; // Keep this if there might be other properties
}

const OTPVerification: React.FC = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [resendTimer, setResendTimer] = useState(90); // Changed from 300 to 90
    const [loading, setLoading] = useState(false);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state as LocationState;
    const authService = new AuthenticationService();

    const handleProceed = async () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 4) {
            toast.error("Please enter a valid 4-digit code");
            return;
        }

        try {
            setLoading(true);

            // Determine the user type based on available data
            let userType = "Patient";
            let authId = "";
            let callFrom = "";

            // If this is coming from a specific flow, adjust the userType
            if (userData?.source === "new_auth") {
                userType = "NEW_AUTH_INDIVIDUAL";
                authId = userData.authId || "";
            } else if (userData?.source === "auth") {
                userType = "Auth";
            }

            // Call the checkOtp API
            await authService.checkOtp(userType, authId, otpValue, callFrom);

            if (authService.response_Status_Code_API_1 === 200) {
                const verifyOtpResponseModel = authService.verifyOtpResponseModel;

                if (verifyOtpResponseModel?.status) {
                    // OTP verification successful
                    toast.success("OTP verified successfully");

                    // Navigate based on the user type
                    if (userType === "NEW_AUTH_INDIVIDUAL") {
                        navigate("/create-credentials", { state: userData });
                    } else if (userType === "Auth") {
                        navigate("/auth-user-login", { state: userData });
                    } else {
                        // Default navigation for Patient
                        navigate("/dashboard");
                    }
                } else {
                    // OTP verification failed
                    toast.error(verifyOtpResponseModel?.otpMessage || "Invalid OTP. Please try again.");
                }
            } else if (authService.response_Status_Code_API_1 === 205) {
                // Session invalid
                toast.error("Your session has expired. Please login again.");
                navigate("/");
            } else {
                // Other error
                toast.error("Failed to verify OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error("An error occurred while verifying OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            setIsResendDisabled(true);
            setResendTimer(300);

            // Determine the user type based on available data
            let userType = "Patient";
            let authId = "";

            // If this is coming from a specific flow, adjust the userType
            if (userData?.source === "new_auth") {
                userType = "NEW_AUTH_INDIVIDUAL";
                authId = userData.authId || "";
            } else if (userData?.source === "auth") {
                userType = "Auth";
            }

            // Call the resendOtp API
            await authService.resendOtp(userType, authId);

            if (authService.response_Status_Code_API_26 === 200) {
                const result = authService.resendOtpResult;
                if (result === "true" || result === true) {
                    toast.success("A new security code has been sent to your phone/email");
                } else {
                    toast.error("Failed to resend security code");
                }
            } else if (authService.response_Status_Code_API_26 === 205) {
                // Session invalid
                toast.error("Your session has expired. Please login again.");
                navigate("/");
            } else {
                // Other error
                toast.error("Failed to resend security code. Please try again.");
            }
        } catch (error) {
            console.error("Error resending code:", error);
            toast.error("Failed to resend security code");
            setIsResendDisabled(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 3) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    // Add this new function for handling paste events
    const handlePaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pastedData = event.clipboardData.getData('text');

        // Remove any non-digit characters and limit to 4 digits
        const digits = pastedData.replace(/\D/g, '').slice(0, 4);

        if (digits.length > 0) {
            const newOtp = [...otp];

            // Fill the OTP array starting from the current index
            for (let i = 0; i < digits.length && (index + i) < 4; i++) {
                newOtp[index + i] = digits[i];
            }

            setOtp(newOtp);

            // Focus on the next empty field or the last field
            const nextIndex = Math.min(index + digits.length, 3);
            const nextInput = document.getElementById(`otp-${nextIndex}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            if (!otp[index] && index > 0) {
                const prevInput = document.getElementById(`otp-${index - 1}`);
                prevInput?.focus();
            }
        } else if (event.key === 'Enter') {
            handleProceed();
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev <= 1) {
                        setIsResendDisabled(false);
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    return (
        <div className="vh-100 vw-100 d-flex flex-column flex-md-row">
            {/* Left Panel - Teal Background */}
            <div className="flex-fill flex-md-grow-0 col-md-4 h-100 h-md-auto d-flex flex-column align-items-center justify-content-center text-white p-3 p-md-5" style={{ backgroundColor: '#05afaf' }}>
                <div className="text-center">
                    <div className="mb-4">
                        <Icon
                            name="message_bubble"
                            height="90px"
                            width="90px"
                            colorVariant="light"
                            stroke
                        />
                    </div>
                    <h2 className="h1 h-md-1 fw-semibold mb-4">Security Code Sent</h2>
                </div>
            </div>

            {/* Right Panel - White Background */}
            <div className="flex-fill flex-md-grow-0 col-md-8 h-100 h-md-auto bg-white d-flex flex-column align-items-center justify-content-center p-3 p-md-5">
                <div className="w-100" style={{ maxWidth: '36rem' }}>
                    <Header
                        className="h-md-3 fw-semibold mb-4"
                        colorVariant="dark"
                        headerText="Enter security code received on your Phone/Email"
                        size="h2"
                    />

                    <div className="d-flex gap-2 gap-md-3 mb-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={(e) => handlePaste(index, e)}
                                className={`form-control text-center fs-4 fs-md-3 border-2 rounded me-2 ${digit
                                    ? 'border-success'
                                    : 'border-secondary'
                                    }`}
                                style={{
                                    width: '4rem',
                                    height: '3rem',
                                    fontSize: '1.25rem'
                                }}
                                disabled={loading}
                            />
                        ))}
                    </div>
                    <p className="fs-5 text-muted mb-4">
                        If you did not receive a code click resend to try again. If you are still not receiving a code via
                        your text or message please{' '}
                        <a
                            href="/"
                            className="text-decoration-underline text-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/');
                            }}
                        >
                            call our office
                        </a>{' '}
                        as your contact information may not be up to date.
                    </p>

                    <div className="d-flex gap-2 gap-md-3">
                        <Button
                            isDisabled={isResendDisabled || loading}
                            onClick={handleResendOtp}
                            className={`btn px-3 px-md-4 py-2 ${isResendDisabled || loading
                                ? 'btn-outline disabled'
                                : 'btn-outline-secondary'
                                }`}
                        >
                            {resendTimer > 0
                                ? `Resend in ${Math.floor(resendTimer / 60)}:${(resendTimer % 60)
                                    .toString()
                                    .padStart(2, '0')}`
                                : 'Resend Code'}
                        </Button>
                        <Button 
                            onClick={handleProceed}
                            isDisabled={loading || otp.join('').length !== 4}
                            className="btn btn-primary px-4 py-2"
                        >
                            {loading ? 'Verifying...' : 'Proceed'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
