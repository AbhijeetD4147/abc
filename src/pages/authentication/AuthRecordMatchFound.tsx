import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Icon } from '@ketan_nimase/ui';
import { Navbar } from '../../components/ui/Navbar';

const AuthRecordMatchFound: React.FC = () => {
    const navigate = useNavigate();

    const patientName = {
        firstName: 'John',
        lastName: 'Doe'
    };

    const handleHome = () => {
        navigate('/dashboard');
    };

    const handleTryAgain = () => {
        navigate('/signup');
    };

    const handleSendMessage = () => {
        navigate('/messages');
    };

    return (
        <div className="min-vh-100 bg-light min-vw-100">
            {/* Navbar */}
            <Navbar patientName={patientName} />

            {/* Header */}
            <div className="bg-white border-bottom py-4 ">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <Header
                                className="h4 fw-medium text-center mb-0"
                                colorVariant="dark"
                                headerText="Profile"
                                size="h2"
                            />
                            {/* Info Icon */}
                            <div className="position-relative d-inline-block ms-2">
                                <div className="border border-2 border-primary rounded-circle mt-1 ms-4 p-1 d-flex align-items-center justify-content-center"
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e3f2fd'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <Icon
                                        colorVariant="primary"
                                        height="12px"
                                        width="12px"
                                        isCursorPointer
                                        isbadge
                                        name="info"
                                        stroke
                                        fill
                                        tooltip
                                        tooltipTitle="Adding the ID/Driver's License will assist the practice in getting the bills and claims resolve faster."
                                        tooltipPlacement="bottom"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-fill">
                {/* Blue Warning Section */}
                <div className="bg-primary py-5 px-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-8 mx-auto text-center">
                                {/* Warning Triangle Icon */}
                                <div className="d-flex justify-content-center mb-3">
                                    <Icon
                                        colorVariant="light"
                                        height="100px"
                                        isCursorPointer={false}
                                        name="exclamation_triangle"
                                        stroke
                                        width="100px"
                                    />
                                </div>

                                {/* Title */}
                                <h2 className="h3 fw-semibold text-white mb-3">
                                    Record Match Found
                                </h2>

                                {/* Description */}
                                <p className="text-white fs-5 lh-base">
                                    We have found a similar matching record with us but with different details. Did you enter details correctly?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* White Questions Section */}
                <div className="bg-white py-4 px-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-8 mx-auto text-center">
                                {/* Questions Text */}
                                <h3 className="h5 fw-semibold text-dark mb-3">
                                    QUESTIONS?
                                </h3>

                                {/* Send Message Link */}
                                <button
                                    onClick={handleSendMessage}
                                    className="btn btn-link text-muted text-decoration-underline p-0 mb-4"
                                    style={{
                                        transition: 'color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#495057'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#6c757d'}
                                >
                                    Send us Message
                                </button>

                                {/* Action Buttons */}
                                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
                                    <Button
                                        colorVariant="primary"
                                        onClick={handleHome}
                                        className="px-4 py-2 bg-primary text-white rounded"
                                    >
                                        Home
                                    </Button>

                                    <Button
                                        colorVariant="primary"
                                        onClick={handleTryAgain}
                                        className="px-4 py-2 bg-primary text-white rounded"
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid px-0">
                            <p className="small text-muted mb-0">Version 1.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthRecordMatchFound;