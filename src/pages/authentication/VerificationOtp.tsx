import { Icon } from '@ketan_nimase/ui';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    const [resendTimer, setResendTimer] = useState(300);
    const [loading, setLoading] = useState(false);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state as LocationState;


    const handleProceed = async () => {
        // console.log("Proceed button clicked", otp);
        const otpValue = otp.join('');
        if (otpValue.length !== 4) {
            toast("Please enter a valid 4-digit code");
            return;
        }
    };

    const handleResendOtp = async () => {
        try {
            setIsResendDisabled(true);
            setResendTimer(300);

            // Add your resend OTP logic here
            // For example:
            // await resendOtpService.resend();

            toast("A new security code has been sent to your phone/email");
        } catch (error) {
            console.error("Error resending code:", error);
            toast("Failed to resend security code");
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
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Panel - Teal Background */}
            <div className="flex-1 md:flex-none md:w-3/5 h-1/4 md:h-auto bg-teal-500 p-6 md:p-12 flex flex-col items-center justify-center text-white" style={{ backgroundColor: '#05afaf' }}>
                <div className="text-center">
                    <div className="mb-6">
                        <Icon
                            name="message_bubble"
                            height="90px"
                            width="90px"
                            colorVariant="light"
                            stroke
                        />
                    </div>
                    <h2 className="text-xl md:text-4xl font-demibold mb-6">Security Code Sent</h2>
                </div>
            </div>

            {/* Right Panel - White Background */}
            <div className="flex-3 md:flex-none md:w-2/3 h-3/4 md:h-auto bg-white p-6 md:p-12 flex flex-col items-center justify-center">
                <div className="max-w-xl w-full">
                    <h2 className="text-2xl md:text-2xl font-semibold mb-6">
                        Enter security code received on your Phone/Email
                    </h2>

                    <div className="flex gap-2 md:gap-4 mb-8">
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
                                className={`w-16 h-12 md:w-16 md:h-16 mr-4 text-center text-xl md:text-2xl border-2 rounded-md focus:outline-none ${digit
                                    ? 'border-green-500 focus:border-green-600'
                                    : 'border-gray-300 focus:border-blue-500'
                                    }`}
                                disabled={loading}
                            />
                        ))}
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                        If you did not receive a code click resend to try again. If you are still not receiving a code via
                        your text or message please{' '}
                        <a
                            href="/"
                            className="underline text-blue-500 hover:text-blue-600"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/');
                            }}
                        >
                            call our office
                        </a>{' '}
                        as your contact information may not be up to date.
                    </p>

                    <div className="flex gap-2 md:gap-4">
                        <button
                            disabled={isResendDisabled || loading}
                            onClick={handleResendOtp}
                            className={`px-6 py-2 md:px-10 md:py-2 ${isResendDisabled || loading
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-gray-200 hover:bg-gray-300'
                                } text-gray-700 rounded`}
                        >
                            {resendTimer > 0
                                ? `Resend in ${Math.floor(resendTimer / 60)}:${(resendTimer % 60)
                                    .toString()
                                    .padStart(2, '0')}`
                                : 'Resend Code'}
                        </button>
                        <button
                            onClick={handleProceed}
                            disabled={loading || otp.join('').length !== 4}
                            className="px-10 py-2 md:px-10 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                        >
                            {loading ? 'Verifying...' : 'Proceed'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
