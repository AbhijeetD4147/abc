import React, { useState, useEffect } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import Footer from "../../components/ui/Footer";
import { Button, Icon } from "@ketan_nimase/ui";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

        if (captchaInput !== captchaCode) {
            setCaptchaError('Captcha does not match');
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

            toast.success('Password recovery instructions have been sent to your registered email');

            // Reset form
            setUsername('');
            setCaptchaInput('');
            generateCaptcha();
            navigate('/credentials-sent');

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
                    {/* Header Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
                            <Icon
                                name="user"
                                height="40px"
                                width="40px"
                                colorVariant="light"
                                stroke
                            />
                            <div className="absolute ml-8 mt-8">
                                <Icon
                                    name="lock"
                                    height="20px"
                                    width="20px"
                                    colorVariant="light"
                                    stroke
                                />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-light text-center mb-2 text-white">
                        Recover your account
                    </h1>

                    {/* Subtitle */}
                    <div className=" justify-start text-center mb-5 text-white">
                        <p>We can help you reset your password.</p>
                        <p>Follow the instruction below.</p>
                    </div>

                    {/* Username Input */}
                    <div className="mb-3">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Icon
                                    name="user"
                                    height="20px"
                                    width="20px"
                                    colorVariant="dark"
                                    stroke
                                />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                onBlur={handleUsernameBlur}
                                placeholder="Username"
                                className={`w-full pl-10 pr-4 py-2 rounded-lg text-gray-900 placeholder-gray-600 border-2 ${usernameError ? 'border-red-600 bg-red-100' : 'border-gray-300 bg-white'
                                    } focus:outline-none focus:border-blue-500`}
                            />
                        </div>
                        {usernameError && (
                            <div className="bg-red-600 text-white px-4 py-2 rounded-b-lg -mt-1 text-sm font-medium">
                                {usernameError}
                            </div>
                        )}
                    </div>

                    {/* Captcha Section */}
                    <div className="mb-6">
                        {/* Captcha Display */}
                        <div className="flex items-center mb-4">
                            <div className="bg-white px-4 py-2 rounded border-2 border-gray-300 mr-4 font-mono text-lg font-bold text-gray-800 tracking-wider">
                                {captchaCode}
                            </div>
                            <button
                                type="button"
                                onClick={generateCaptcha}
                                className="text-white text-xl underline hover:no-underline"
                                style={{ backgroundColor: theme.BGColor }}
                            >
                                Refresh
                            </button>
                        </div>

                        {/* Captcha Input */}
                        <div>
                            <p className="text-white mb-2">Input symbols</p>
                            <input
                                type="text"
                                value={captchaInput}
                                onChange={handleCaptchaChange}
                                placeholder="Enter the symbols shown above"
                                className={`w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-600 border-2 ${captchaError ? 'border-red-600 bg-red-100' : 'border-gray-300 bg-white'
                                    } focus:outline-none focus:border-blue-500`}
                            />
                            {captchaError && (
                                <div className="bg-red-600 text-white px-4 py-2 rounded-b-lg -mt-1 text-sm font-medium">
                                    {captchaError}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                        <Button
                            colorVariant="default"
                            onClick={handleCancel}
                            className="flex-1 py-1 rounded-lg border-2 border-white text-xl text-white bg-transparent hover:bg-white hover:text-blue-600 transition-colors"
                            isDisabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorVariant="default"
                            onClick={handleSubmit}
                            className="flex-1 py-1 rounded-lg border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 transition-colors"
                            isDisabled={isLoading || !!usernameError || !!captchaError || !username || !captchaInput}
                        >
                            {isLoading ? 'Processing...' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
