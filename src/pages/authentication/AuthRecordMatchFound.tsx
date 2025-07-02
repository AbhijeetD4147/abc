import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Icon } from '@ketan_nimase/ui';
import { Navbar } from '../../components/ui/Navbar';

const AuthRecordMatchFound: React.FC = () => {
    const navigate = useNavigate();
    // This state will determine which UI to display
    // 'partial' for 3/4 match, 'full' for full match
    const [matchStatus, setMatchStatus] = useState<'partial' | 'full'>('partial');

    const patientData = {
        name: 'Anna Stevenson',
        dob: '1*/0*/19X5',
        phone: '80*-92*-1*41',
        email: 'An**@g**il.com',
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

    const handleGrantAccess = () => {
        // Logic to grant access
        console.log('Access Granted!');
        // navigate('/access-granted'); // Example navigation
    };

    return (
        <div className="min-vh-100 bg-light min-vw-100">
            {/* Navbar */}
            <Navbar />

            {/* Header */}
            <div className="bg-white border-bottom py-4 ">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <Header
                                className="h4 fw-medium text-center mb-0"
                                colorVariant="dark"
                                headerText="Add New Individual"
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
                {matchStatus === 'partial' ? (
                    <>
                        {/* Blue Warning Section - Partial Match */}
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

                        {/* White Questions Section - Partial Match */}
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
                    </>
                ) : (
                    <>
                        {/* Blue Section - Full Match */}
                        <div className="bg-primary py-5 px-3 text-white text-center">
                            <div className="container">
                                <div className="d-flex justify-content-center mb-4">
                                    <Icon
                                        name="tick_circle"
                                        height="100px"
                                        width="100px"
                                        colorVariant="light"
                                        stroke
                                    />
                                </div>
                                <h2 className="h3 fw-semibold mb-3">Record match found</h2>
                                <p className="fs-5 lh-base mb-4">We have found a matching record with us.</p>
                                <div className="text-start d-inline-block">
                                    <p className="mb-2">Name: <span className="fw-bold">{patientData.name}</span></p>
                                    <p className="mb-2">DOB: <span className="fw-bold">{patientData.dob}</span></p>
                                    <p className="mb-2">Phone: <span className="fw-bold">{patientData.phone}</span></p>
                                    <p className="mb-0">Email: <span className="fw-bold">{patientData.email}</span></p>
                                </div>
                            </div>
                        </div>

                        {/* White Section - Grant Access */}
                        <div className="bg-white py-5 px-3 text-center">
                            <div className="container">
                                <h3 className="h5 fw-semibold mb-4">Do you want to grant access to {patientData.name}?</h3>
                                <Button
                                    colorVariant="primary"
                                    onClick={handleGrantAccess}
                                    className="px-5 py-2"
                                >
                                    Grant Access
                                </Button>
                            </div>
                        </div>
                        <div className="container-fluid px-0">
                            <p className="small text-muted mb-0">Version 1.0</p>
                        </div>
                    </>
                )}
            </div>

            {/* Temporary button to toggle match status for testing */}
            <div className="p-3 text-center">
                <Button onClick={() => setMatchStatus(matchStatus === 'partial' ? 'full' : 'partial')}>
                    Toggle Match Status (for testing)
                </Button>
            </div>
        </div>
    );
};

export default AuthRecordMatchFound;