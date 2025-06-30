import React, { useState } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Loader } from '@ketan_nimase/ui';

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
        <div className="container-fluid vh-100 vw-100 p-0">
            <div className="row h-100 g-0">
                {/* Left Panel */}
                <div
                    className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center p-4 p-lg-5 position-relative"
                    style={{ backgroundColor: '#FF6B6B' }}
                >
                    <div className="text-center">
                        <div className="d-flex justify-content-center mb-4">
                            <Icon name="exclamation_circle" height="60px" width="60px" colorVariant="light" stroke />
                        </div>
                        <h2 className="fs-5 fw-normal text-white mb-4">
                            No Match is found
                        </h2>
                    </div>

                    <div className="position-absolute bottom-0 start-0 p-3">
                        <p className="small text-white opacity-75 mb-0">Version 1.0</p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="col-12 col-lg-8 d-flex flex-column justify-content-center align-items-start p-4 p-lg-5">
                    <div className="mx-auto mx-lg-0 ms-lg-4" style={{ maxWidth: '400px' }}>
                        <div className="mb-4">
                            <p className="fs-5 lh-base mb-3" style={{ color: theme.primaryTextColor }}>
                                Make sure you have entered the correct credentials.
                            </p>
                            <p className="fs-5 lh-base mb-0" style={{ color: theme.primaryTextColor }}>
                                Please contact practice for more information.
                            </p>
                        </div>

                        <Button
                            onClick={handleTryAgain}
                            isDisabled={isLoading}
                            className="btn btn-primary w-100 w-sm-auto px-4 py-2 fs-5 transition-all"
                        >
                            {isLoading ? (
                                <div className="d-flex justify-content-center align-items-center">
                                    <Loader loaderType="spin" />
                                </div>
                            ) : (
                                'Try Again'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordMatchNotFound;