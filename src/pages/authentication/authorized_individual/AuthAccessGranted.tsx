import React from 'react';
import { Header, Icon } from '@ketan_nimase/ui';
import { Navbar } from '../../../components/ui/Navbar';

const AuthAccessGranted: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col w-screen">
            <Navbar />
            <div className="d-flex justify-content-center text-center py-2 border-bottom m-0">
                <Header
                    className="fs-5 fs-md-4text-center"
                    colorVariant="dark"
                    headerText="Add New Individual"
                    size="h2"
                />
                {/* Info Icon */}
                <div className="position-relative d-inline-block ms-2">
                    <div className="border border-2 border-primary rounded-circle mt-1 ms-4 p-1 d-flex align-items-center justify-content-center" style={{ cursor: 'pointer' }}>
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
                            tooltipTitle="Add an authorized individual who can access your patient portal account"
                            tooltipPlacement="bottom"
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex">
                {/* Left Panel - Blue background with access granted content */}
                <div className="w-1/3 bg-blue-500 p-8 flex flex-col items-center justify-center text-white">
                    <div className="mb-8 items-center justify-center text-center">
                        <Icon
                            name="tick_circle"
                            width="80px"
                            height="80px"
                            colorVariant="light"
                            stroke
                        />

                        <Header
                            className="fs-5 fs-md-4text-center mt-3"
                            colorVariant="light"
                            headerText="Access Granted"
                            size="h3"
                        />

                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-2/3 bg-white p-8 flex flex-col items-center justify-center text-center">
                    <p className="text-3xl mb-12 text-center">Anna Stevenson can now access your records!</p>

                    <div className="text-center">
                        <Header
                            className="fs-5 fs-md-4text-center mt-6"
                            colorVariant="dark"
                            headerText="QUESTIONS?"
                            size="h2"
                        />
                        <p className="text-xl mt-2">700.120.1510</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthAccessGranted;