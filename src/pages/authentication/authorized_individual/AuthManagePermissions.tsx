import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Header, Loader } from '@ketan_nimase/ui';
import { Navbar } from '../../../components/ui/Navbar';
import DatePicker from '../../../components/ui/DatePicker';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationAuthUserService } from '../../../services/authentication/AuthUserService';
import { AuthorizedIndividualPermissionModel } from '../../../model/authentication/AuthorizedIndividualPermissionModel';
import { GlobalParams } from '../../../utils/GlobalParameters';
import { DateFormatter } from '../../../utils/DateFormatter';
import { AuthenticationService } from '../../../services/authentication/UserService';

interface AuthorizedIndividual {
    name: string;
    dob: string;
    phone: string;
    email: string;
    dateAdded: string;
}

const AuthManagePermissions: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const authId = location.state?.authId;
    const [loading, setLoading] = useState<boolean>(true);
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const [individual, setIndividual] = useState<AuthorizedIndividual>({
        name: '',
        dob: '',
        phone: '',
        email: '',
        dateAdded: ''
    });

    const [permissions, setPermissions] = useState<AuthorizedIndividualPermissionModel | null>(null);
    const [resendLoading, setResendLoading] = useState(false);


    const authUserService = new AuthenticationAuthUserService();
    const authService = new AuthenticationService();

    // Check if mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (authId) {
            fetchAuthPermissions();
        } else {
            setLoading(false);
            navigate('/auth-patient-list');
        }
    }, [authId]);

    const fetchAuthPermissions = async () => {
        setLoading(true);
        try {
            await authUserService.getAuthPermissionPatientInfo(authId);
            if (authUserService.response_Status_Code_API_3 === 200) {
                const permissionData = authUserService.authorizedIndividualPermissionResponse;
                if (permissionData) {
                    setPermissions(permissionData);
                    if (permissionData.expiryDate) {
                        const dateObj = new Date(permissionData.expiryDate);
                        const formattedDate = DateFormatter.formatDate(dateObj);
                        setExpiryDate(formattedDate);
                    } else {
                        setExpiryDate('');
                    }
                    setIndividual({
                        name: permissionData.authName || '',
                        dob: permissionData.authDOB || '',
                        phone: permissionData.authMobile || '',
                        email: permissionData.authEmail || '',
                        dateAdded: permissionData.authUserCreatedDate || ''
                    });
                }
            } else {
                console.error('Error fetching permissions');
            }
        } catch (error) {
            console.error('Error fetching permissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePermissionChange = (key: string) => {
        if (!permissions) return;

        setPermissions(prev => {
            if (!prev) return prev;

            const updated = new AuthorizedIndividualPermissionModel({ ...prev });
            switch (key) {
                case 'portalAccess':
                    updated.isPortalAccess = !updated.isPortalAccess;
                    break;
                case 'view':
                    updated.isView = !updated.isView;
                    break;
                case 'download':
                    updated.isDownload = !updated.isDownload;
                    break;
                case 'transmit':
                    updated.isTransmit = !updated.isTransmit;
                    break;
                case 'activityLog':
                    updated.isActivityLogAccess = !updated.isActivityLogAccess;
                    break;
            }
            return updated;
        });
    };

    const handleDateChange = (date: Date) => {
        const formattedDate = DateFormatter.formatDate(date);
        setExpiryDate(formattedDate);

        if (permissions) {
            setPermissions(prev => {
                if (!prev) return prev;
                const updated = new AuthorizedIndividualPermissionModel({ ...prev });
                updated.expiryDate = date.toISOString();
                return updated;
            });
        }
    };

    const handleSave = async () => {
        if (!permissions) return;

        setSaveLoading(true);
        try {
            const updatedPermissions = new AuthorizedIndividualPermissionModel({ ...permissions });
            updatedPermissions.authId = authId;
            updatedPermissions.userId = GlobalParams.USER_ID;

            await authUserService.saveAuthUserPermission(updatedPermissions.toJson());
            if (authUserService.response_Status_Code_API_4 === 200) {
                navigate('/authorized-individual');
            } else {
                console.error('Error saving permissions');
            }
        } catch (error) {
            console.error('Error saving permissions:', error);
        } finally {
            setSaveLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/authorized-individual');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col w-screen items-center justify-center">
                <Loader size="medium" />
            </div>
        );
    }
    const handleResendSignupEmail = async () => {
    if (!authId) return;

    setResendLoading(true);
    try {
        await authService.getResendSignUpEmailForAuthUser(authId);
        if (authService.response_Status_Code_API_20 === 200) {
            // navigate('/authorized-individual');
        } else {
            console.error('Error resending signup email');
        }
    } catch (error) {
        console.error('Error resending signup email:', error);
    } finally {
        setResendLoading(false);
    }
};

    // Mobile View Component
    const MobileView = () => (
        <div className="min-h-screen flex flex-col w-screen bg-gray-50">
            <Navbar />
            <div className="flex items-center justify-center py-3 bg-white border-b">
                <button
                    onClick={handleCancel}
                    className="absolute left-4 text-lg font-medium text-gray-600"
                >
                    ←
                </button>
                <Header
                    className="text-lg font-semibold"
                    colorVariant="dark"
                    headerText="Permissions"
                    size="h2"
                />
            </div>

            <div className="flex-1 px-4 py-4 space-y-4">
                {/* Authorized Individual Info */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <Header
                        className="text-base font-semibold mb-3"
                        colorVariant="dark"
                        headerText="Authorized Individual"
                        size="h3"
                    />
                    <div className="space-y-2 text-sm">
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-700">Name:</span>
                            <span className="text-gray-900">{individual.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-700">DOB:</span>
                            <span className="text-gray-900">{individual.dob}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-700">Phone:</span>
                            <span className="text-gray-900">{individual.phone}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-700">Email:</span>
                            <span className="text-gray-900">{individual.email}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-700">Date Added:</span>
                            <span className="text-red-500 font-medium">{individual.dateAdded}</span>
                        </div>
                    </div>
                </div>

                {/* Portal Access */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <Header
                        className="text-base font-semibold mb-3"
                        colorVariant="dark"
                        headerText="Portal Access"
                        size="h3"
                    />
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={permissions?.isPortalAccess || false}
                                onChange={() => handlePermissionChange('portalAccess')}
                            />
                            <label className="text-sm font-medium">Enable Access</label>
                        </div>
                        <div className="space-y-2">
                            <span className="text-sm font-medium text-gray-700">Expiration Date</span>
                            <DatePicker
                                value={expiryDate}
                                onChange={handleDateChange}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Health Summary Permissions */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <Header
                        className="text-base font-semibold mb-3"
                        colorVariant="dark"
                        headerText="Permissions for Health Summary"
                        size="h3"
                    />
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={permissions?.isView || false}
                                onChange={() => handlePermissionChange('view')}
                            />
                            <label className="text-sm font-medium">View</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={permissions?.isDownload || false}
                                onChange={() => handlePermissionChange('download')}
                                isDisabled={!(permissions?.isView || false)}
                            />
                            <label className="text-sm font-medium">Download</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={permissions?.isTransmit || false}
                                onChange={() => handlePermissionChange('transmit')}
                                isDisabled={!(permissions?.isView || false)}
                            />
                            <label className="text-sm font-medium">Transmit/Share</label>
                        </div>
                    </div>
                </div>

                {/* Activity Log Permission */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <Header
                        className="text-base font-semibold mb-3"
                        colorVariant="dark"
                        headerText="Permission for Activity Log"
                        size="h3"
                    />
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            checked={permissions?.isActivityLogAccess || false}
                            onChange={() => handlePermissionChange('activityLog')}
                        />
                        <label className="text-sm font-medium">View Patient Activity Log</label>
                    </div>
                </div>
            </div>

            {/* Action Buttons - Fixed at bottom */}
            <div className="bg-white border-t p-4 space-y-3">
                {individual.dateAdded === "Pending" && (
                    <Button
                        className="w-full py-3 text-sm font-medium"
                        style="outline"
                        colorVariant="primary"
                        onClick={handleResendSignupEmail}
                        isDisabled={resendLoading} // Enable this to prevent multiple clicks
                    >
                        {resendLoading ? 'Resending...' : 'Resend Signup Email'}
                    </Button>
                )}
                <Button
                    className="w-full py-3 text-sm font-medium"
                    style="filled"
                    colorVariant="primary"
                    onClick={handleSave}
                    isDisabled={saveLoading}
                >
                    {saveLoading ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </div>
    );

    // Desktop View Component
    const DesktopView = () => (
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
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={permissions?.isPortalAccess || false}
                                            onChange={() => handlePermissionChange('portalAccess')}
                                        />
                                        <label>Enable Access</label>
                                    </div>
                                </div>
                                <span className="font-medium">Expiration Date</span>
                                <DatePicker
                                    value={expiryDate}
                                    onChange={handleDateChange}
                                />
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
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={permissions?.isView || false}
                                        onChange={() => handlePermissionChange('view')}
                                    />
                                    <label>View</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={permissions?.isDownload || false}
                                        onChange={() => handlePermissionChange('download')}
                                        isDisabled={!(permissions?.isView || false)}
                                    />
                                    <label>Download</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={permissions?.isTransmit || false}
                                        onChange={() => handlePermissionChange('transmit')}
                                        isDisabled={!(permissions?.isView || false)}
                                    />
                                    <label>Transmit/Share</label>
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
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    checked={permissions?.isActivityLogAccess || false}
                                    onChange={() => handlePermissionChange('activityLog')}
                                />
                                <label>View Patient Activity Log</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Centered at the bottom */}
                <div className="flex justify-center space-x-4 border-t-2 pt-4">
                    {individual.dateAdded === "Pending" && (
                        <Button
                            className="px-5"
                            style="outline"
                            colorVariant="primary"
                            onClick={handleResendSignupEmail}
                            isDisabled={resendLoading}
                        >
                            {resendLoading ? 'Sending...' : 'Resend Signup Email'}
                        </Button>
                    )}
                    <Button
                        className="px-5"
                        style="outline"
                        colorVariant="dark"
                        onClick={handleCancel}
                        isDisabled={saveLoading || resendLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="px-5"
                        style="filled"
                        colorVariant="primary"
                        onClick={handleSave}
                        isDisabled={saveLoading || resendLoading}
                    >
                        {saveLoading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );

    return isMobile ? <MobileView /> : <DesktopView />;
};

export default AuthManagePermissions;

