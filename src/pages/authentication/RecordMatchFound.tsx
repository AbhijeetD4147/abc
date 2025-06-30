import React, { useState } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import checkMark from '../../assets/check-mark.png';
import { Button } from '@ketan_nimase/ui';
import { AuthenticationService } from '../../services/authentication/UserService';
import { GlobalParams } from '../../utils/GlobalParameters';

interface RecordMatchFoundProps {
    email?: string;
    patientNumber?: number;
}

interface LocationState {
    email: string;
    patientNumber: number;
}

const theme = await getTheme();

const RecordMatchFound: React.FC<RecordMatchFoundProps> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSending, setIsSending] = useState(false);

    // Get email and patientNumber from location state if available, otherwise use props
    const state = location.state as LocationState;
    const email = state?.email || props.email || "";
    const patientNumber = state?.patientNumber || props.patientNumber || 0;

    const sendCredentials = async () => {
        setIsSending(true);
        try {
            // Create an instance of AuthenticationService
            const authService = new AuthenticationService();

            // Call the sendCredentials API
            await authService.sendCredentials(email, patientNumber);

            // Check response status
            if (authService.response_Status_Code_API_3 === 200) {
                // If successful, navigate to credentials-sent page
                if (String(authService.isSent).toLowerCase() === "true") {
                    navigate('/credentials-sent', {
                        state: {
                            email,
                            patientNumber
                        }
                    });
                }
            } else if (authService.response_Status_Code_API_3 !== 205) {
                // If error (not session invalid)
                toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
            }
        } catch (error) {
            console.error('Error sending credentials:', error);
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
                        <p className="small text-muted mb-0">
                            {GlobalParams.Version}
                        </p>
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