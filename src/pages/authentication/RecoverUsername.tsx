import React, { useState, useEffect } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import MaximEyes from '../../assets/maximeyeslogo.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Loader } from '@ketan_nimase/ui';

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
        <div className="container-fluid vh-100 vw-100 p-0">
            <div className="row h-100 g-0">
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
                    className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center p-5"
                    style={{ backgroundColor: theme.BGColor, color: theme.secondaryTextColor }}
                >
                    <div className="text-center" style={{ maxWidth: '400px' }}>
                        {/* User Profile Icon */}
                        <div className="d-flex justify-content-center mb-4">

                            <div className="d-flex justify-content-center mb-4 position-relative">
                                <div
                                    className="border border-2 rounded-circle p-3 p-sm-4 p-lg-5 d-flex align-items-center justify-content-center"
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
                        </div>

                        {/* Your Username Heading */}
                        <h1 className="fs-1 fw-normal text-white mb-4">
                            Your Username
                        </h1>

                        {/* Username Display */}
                        <div className="mb-4">
                            {isLoading ? (
                                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                                    <Loader loaderType="spin" />
                                </div>
                            ) : (
                                <div>
                                    <p className="fs-5 text-white mb-3">
                                        Your username is <span className="text-warning fw-medium">{username}</span>
                                    </p>
                                    <p className="fs-5 text-white lh-base mb-2">
                                        You can change your username once you
                                    </p>
                                    <p className="fs-5 text-white mb-0">
                                        Sign In.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Sign In Button */}
                        <Button
                            onClick={handleSignIn}
                            isDisabled={isLoading}
                            className="btn btn-outline-light w-100 px-5 py-2 fs-5 fw-medium transition-all"
                        >
                            {isLoading ? 'Loading...' : 'Sign In'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecoverUsername;
