import React, { useState } from 'react';
import { Button, Checkbox, Header } from '@ketan_nimase/ui';
import { Navbar } from '../../../components/ui/Navbar';
import DatePicker from '../../../components/ui/DatePicker';

interface AuthorizedIndividual {
    name: string;
    dob: string;
    phone: string;
    email: string;
    dateAdded: string;
}

const AuthManagePermissions: React.FC = () => {
    const [individual] = useState<AuthorizedIndividual>({
        name: 'Anna Stevenson',
        dob: '1*/0*/19*5',
        phone: '80* 92* 1*41',
        email: 'An**@g*a*l.com',
        dateAdded: '07/06/2022'
    });

    const [permissions, setPermissions] = useState({
        portalAccess: true,
        view: true,
        download: true,
        transmit: true,
        activityLog: false
    });

    const handlePermissionChange = (key: keyof typeof permissions) => {
        setPermissions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="min-h-screen flex flex-col w-screen">
            <Navbar />
            <div className="d-flex justify-content-center text-center py-2 border-bottom m-0">
                <Header
                    className="fs-5 fs-md-4text-center"
                    colorVariant="dark"
                    headerText="Permissions"
                    size="h2"
                />
            </div>
            <div className="flex-1 container mx-auto px-4 py-8">
                <div className="flex gap-8 mb-8">
                    {/* Left Column - Authorized Individual Info */}
                    <div className="w-1/2">
                        <div className="bg-white p-6 items-center justify-center flex flex-col">
                            <Header
                                className="fs-5 fs-md-4text-center"
                                colorVariant="dark"
                                headerText="Authorized Individual"
                                size="h2"
                            />
                            <div className="space-y-2 justify-start">
                                <p><span className="font-medium ">Name:</span> {individual.name}</p>
                                <p><span className="font-medium ">DOB:</span> {individual.dob}</p>
                                <p><span className="font-medium ">Phone:</span> {individual.phone}</p>
                                <p><span className="font-medium ">Email:</span> {individual.email}</p>
                                <p><span className="font-medium ">Date Added:</span> {individual.dateAdded}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Permissions */}
                    <div className="w-1/2 space-y-3">
                        {/* Portal Access */}
                        <div className="bg-white p-3">
                            <Header
                                className="fs-5 fs-md-4text-center"
                                colorVariant="dark"
                                headerText="Portal Access"
                                size="h4"
                            />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        checked={permissions.portalAccess}
                                        onChange={() => handlePermissionChange('portalAccess')}
                                    />
                                    <span className="font-medium">Enable Access</span>
                                </div>
                                <span className="font-medium">Expiration Date</span>
                                <DatePicker />
                            </div>
                        </div>

                        {/* Health Summary Permissions */}
                        <div className="bg-white p-3">
                            <Header
                                className="fs-5 fs-md-4text-center"
                                colorVariant="dark"
                                headerText="Permissions for Health Summary"
                                size="h4"
                            />
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        checked={permissions.view}
                                        onChange={() => handlePermissionChange('view')}
                                    />
                                    <span>View</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        checked={permissions.download}
                                        onChange={() => handlePermissionChange('download')}
                                    />
                                    <span>Download</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        checked={permissions.transmit}
                                        onChange={() => handlePermissionChange('transmit')}
                                    />
                                    <span>Transmit/Share</span>
                                </div>
                            </div>
                        </div>

                        {/* Activity Log Permission */}
                        <div className="bg-white p-3">
                            <Header
                                className="fs-5 fs-md-4text-center"
                                colorVariant="dark"
                                headerText="Permission for Activity Log"
                                size="h4"
                            />
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    checked={permissions.activityLog}
                                    onChange={() => handlePermissionChange('activityLog')}
                                />
                                <span>View Patient Activity Log</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Centered at the bottom */}
                <div className="flex justify-center space-x-4 border-t-2 pt-4">
                    <Button className="px-5" style="outline" colorVariant="dark">Cancel</Button>
                    <Button className="px-5" style="filled" colorVariant="primary">Save</Button>
                </div>
            </div>
        </div>
    );
};

export default AuthManagePermissions;