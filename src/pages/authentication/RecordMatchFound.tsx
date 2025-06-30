import React, { useState } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import checkMark from '../../assets/check-mark.png';
import { Button } from '@ketan_nimase/ui';

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
        <div className="container-fluid vh-100 vw-100 p-0">
            <div className="row h-100 g-0">
                {/* Left Panel */}
                <div
                    className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center p-4 p-lg-5 position-relative"
                    style={{ backgroundColor: theme.textfieldFilledColor }}
                >
                    <div className="text-center">
                        <h2
                            className="fs-5 fw-normal mb-4"
                            style={{ color: theme.primaryTextColor }}
                        >
                            Did you forget your login credentials?
                        </h2>

                        {isSending ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <Button
                                onClick={sendCredentials}
                                className="btn btn-outline-dark px-5 py-2 transition-all"
                            >
                                Send me credentials
                            </Button>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="position-absolute bottom-0 start-0 p-3">
                        <p className="small text-muted mb-0">version 1.0</p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="col-12 col-lg-8 d-flex flex-column justify-content-center align-items-center p-4 p-lg-5">
                    <div className="text-center" style={{ maxWidth: '400px' }}>
                        <div className="d-flex justify-content-center mb-4">
                            <img src={checkMark} alt="Check" className="img-fluid" style={{ width: '80px', height: '80px' }} />
                        </div>

                        <h1
                            className="fs-2 mb-3"
                            style={{ color: theme.primaryTextColor }}
                        >
                            Record match found
                        </h1>

                        <div className="mb-4">
                            <p className="fs-5 mb-2" style={{ color: theme.primaryTextColor }}>
                                We have found a matching record with us.
                            </p>
                            <p className="fs-6 mb-0" style={{ color: theme.primaryTextColor }}>
                                Please Sign In using your password
                            </p>
                        </div>

                        <Button
                            onClick={handleSignIn}
                            className="btn btn-primary px-5 py-2 fs-5 transition-all"
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordMatchFound;