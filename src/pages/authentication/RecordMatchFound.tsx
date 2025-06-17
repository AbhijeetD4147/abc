import React, { useState } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import checkMark from '../../assets/check-mark.png';

interface RecordMatchFoundProps {
    email: string;
    patientNumber: number;
}

const theme = await getTheme();

const RecordMatchFound: React.FC<RecordMatchFoundProps> = ({ email, patientNumber }) => {
    const navigate = useNavigate();
    const [isSending, setIsSending] = useState(false);

    const sendCredentials = async () => {
        setIsSending(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const isSent = 'true';

            if (isSent === 'true') {
                navigate('/credentials-sent', {
                    state: { email, patientNumber }
                });
            }
        } catch (error) {
            toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
        } finally {
            setIsSending(false);
        }
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen w-screen">
            {/* Left Panel */}
            <div
                className="w-full md:w-1/3 flex flex-col justify-center items-center p-8 md:p-10 relative"
                style={{ backgroundColor: theme.textfieldFilledColor }}
            >
                <div className="text-center space-y-4">
                    <h2
                        className="text-lg font-normal"
                        style={{ color: theme.primaryTextColor }}
                    >
                        Did you forget your login credentials?
                    </h2>

                    {isSending ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <button
                            onClick={sendCredentials}
                            className="px-12 py-2 border border-black rounded transition-colors hover:bg-gray-50"
                            style={{
                                color: theme.primaryTextColor,
                                backgroundColor: theme.textfieldFilledColor
                            }}
                        >
                            Send me credentials
                        </button>
                    )}
                </div>

                {/* Footer */}
                <div className="absolute bottom-3 left-3 text-xs text-gray-500">
                    <p>version 1.0</p>
                </div>
            </div>

            {/* Divider (hidden on small screens) */}
            <div
                className="hidden md:block w-px"
                style={{ backgroundColor: theme.greyBorderColor }}
            ></div>

            {/* Right Panel */}
            <div className="w-full md:w-2/3 flex flex-col justify-center items-center p-8 md:p-10">
                <div className="text-center space-y-6 max-w-md">
                    <div className="flex justify-center mb-6">
                        <img src={checkMark} alt="Check" className="w-20 h-20" />
                    </div>

                    <h1
                        className="text-2xl mb-2"
                        style={{ color: theme.primaryTextColor }}
                    >
                        Record match found
                    </h1>

                    <div className="space-y-1 mb-6">
                        <p className="text-lg" style={{ color: theme.primaryTextColor }}>
                            We have found a matching record with us.
                        </p>
                        <p className="text-base" style={{ color: theme.primaryTextColor }}>
                            Please Sign In using your password
                        </p>
                    </div>

                    <button
                        onClick={handleSignIn}
                        className="px-14 py-2 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
                        style={{ backgroundColor: theme.BGColor }}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecordMatchFound;