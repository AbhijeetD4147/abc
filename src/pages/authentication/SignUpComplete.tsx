import React, { useState } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { Button, Icon } from "@ketan_nimase/ui";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = await getTheme();

const ForgotPassword: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async () => {
        navigate('/login')
    };

    return (
        <div className="container-fluid vh-100 vw-100">
            <div className="row h-100">
                {/* Left Panel */}
                <div className="col-12 col-md-6 bg-white d-flex flex-column justify-content-center align-items-center p-3 p-md-5">
                    {/* Centered Content */}
                    <div className="d-flex flex-column align-items-center">
                        {/* Checkmark and Sign up completed text */}
                        <div className="d-flex flex-column align-items-center mb-4">
                            <Icon
                                colorVariant="dark"
                                height="100px"
                                isCursorPointer
                                isbadge
                                name="tick_circle"
                                stroke
                                width="100px"
                            />
                            <p className="h4 fw-normal text-secondary mt-3 mb-0">Sign up completed</p>
                        </div>

                        {/* Questions section */}
                        <div className="d-flex flex-column align-items-center mt-2">
                            <p className="h3 fw-bold text-secondary text-uppercase ls-1 mb-2" style={{ letterSpacing: '0.1em' }}>QUESTIONS?</p>
                            <a
                                href="tel:+1234567890"
                                className="h5 text-secondary text-decoration-underline"
                                style={{
                                    transition: 'color 0.3s ease',
                                    fontSize: '0.95rem'
                                }}
                                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#495057'}
                                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#6c757d'}
                            >
                                &lt;loc phone&gt;
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div
                    className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-3 p-md-5"
                    style={{ backgroundColor: theme.BGColor, color: theme.secondaryTextColor }}
                >
                    <div className="w-100" style={{ maxWidth: '400px' }}>
                        <div className="d-flex flex-column flex-sm-row gap-2">
                            <Button
                                colorVariant="default"
                                onClick={handleSubmit}
                                className="btn w-100 py-2 border border-white text-white bg-transparent"
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
