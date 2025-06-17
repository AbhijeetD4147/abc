import React, { useState } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@ketan_nimase/ui';

interface RecordMatchNotFoundProps {
    onTryAgain?: () => void;
}

const theme = await getTheme();

const RecordMatchNotFound: React.FC<RecordMatchNotFoundProps> = ({ onTryAgain }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleTryAgain = async () => {
        setIsLoading(true);
        try {
            if (onTryAgain) {
                onTryAgain();
            } else {
                navigate('/signup');
            }
        } catch (error) {
            toast.error('An unexpected error has occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen w-screen">
            {/* Left Panel */}
            <div
                className="w-full md:w-1/3 flex flex-col justify-center items-center p-8 md:p-10 relative"
                style={{ backgroundColor: '#FF6B6B' }}
            >
                <div className="text-center space-y-4">
                    <div className="flex justify-center mb-8">
                        <Icon name="exclamation_circle" height="60px" width="60px" colorVariant="light" stroke />
                    </div>
                    <h2 className="text-lg font-normal text-white mb-6">
                        No Match is found
                    </h2>
                </div>

                <div className="absolute bottom-3 left-3 text-xs text-white opacity-75">
                    <p>Version 1.0</p>
                </div>
            </div>

            {/* Divider (hidden on small screens) */}
            <div
                className="hidden md:block w-px"
                style={{ backgroundColor: theme.greyBorderColor }}
            ></div>

            {/* Right Panel */}
            <div className="w-full md:w-2/3 flex flex-col justify-center items-start p-8 md:p-10">
                <div className="max-w-md mx-auto md:ml-8 space-y-6">
                    <div className="space-y-4">
                        <p className="text-lg leading-relaxed" style={{ color: theme.primaryTextColor }}>
                            Make sure you have entered the correct credentials.
                        </p>
                        <p className="text-lg leading-relaxed" style={{ color: theme.primaryTextColor }}>
                            Please contact practice for more information.
                        </p>
                    </div>

                    <button
                        onClick={handleTryAgain}
                        disabled={isLoading}
                        className="w-full sm:w-auto px-8 py-2 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: theme.BGColor }}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Loading...</span>
                            </div>
                        ) : (
                            'Try Again'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecordMatchNotFound;