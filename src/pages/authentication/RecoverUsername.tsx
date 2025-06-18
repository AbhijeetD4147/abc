import React, { useState, useEffect } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import Footer from "../../components/ui/Footer";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@ketan_nimase/ui';

interface PageProps {
    logoUrl: string;
    companyName: string;
}

const theme = await getTheme();

const RecoverUsername: React.FC<PageProps> = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Simulate API call to fetch username
    useEffect(() => {
        const fetchUsername = async () => {
            setIsLoading(true);
            try {
                // TODO: Replace with actual API call
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

                // Simulated API response
                const apiResponse = {
                    success: true,
                    username: 'KetNim1016'
                };

                if (apiResponse.success) {
                    setUsername(apiResponse.username);
                } else {
                    toast.error('Failed to retrieve username');
                }
            } catch (error) {
                toast.error('An error occurred while fetching username');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsername();
    }, []);

    const handleSignIn = () => {
        navigate('/login');
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
                <div className="text-center space-y-8 max-w-md">
                    {/* User Profile Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center bg-transparent">
                            {/* User icon with lock */}
                            <div className="relative">
                                <svg
                                    className="w-12 h-12 text-white"
                                    fill="none"
                                    stroke="white"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                {/* Lock icon */}
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 text-blue-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Your Username Heading */}
                    <h1 className="text-3xl font-normal text-white mb-6">
                        Your Username
                    </h1>

                    {/* Username Display */}
                    <div className="space-y-4 mb-8">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-screen w-screen">
                                <Loader loaderType="spin" />
                            </div>
                        ) : (
                            <>
                                <p className="text-lg text-white">
                                    Your username is <span className="text-yellow-300 font-medium">{username}</span>
                                </p>
                                <p className="text-lg text-white leading-relaxed">
                                    You can change your username once you
                                </p>
                                <p className="text-lg text-white">
                                    Sign In.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Sign In Button */}
                    <button
                        onClick={handleSignIn}
                        disabled={isLoading}
                        className="w-full max-w-sm px-10 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: 'transparent' }}
                    >
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecoverUsername;
