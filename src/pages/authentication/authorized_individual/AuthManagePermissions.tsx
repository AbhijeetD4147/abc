import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Header, Loader } from '@ketan_nimase/ui';
import { Navbar } from '../../../components/ui/Navbar';
import DatePicker from '../../../components/ui/DatePicker';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationAuthUserService } from '../../../services/authentication/AuthUserService';
import { AuthorizedIndividualPermissionModel } from '../../../model/authentication/AuthorizedIndividualPermissionModel';
import { GlobalParams } from '../../../utils/GlobalParameters';

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
    
    const [individual, setIndividual] = useState<AuthorizedIndividual>({
        name: '',
        dob: '',
        phone: '',
        email: '',
        dateAdded: ''
    });

    const [permissions, setPermissions] = useState<AuthorizedIndividualPermissionModel | null>(null);
    
    const authUserService = new AuthenticationAuthUserService();

    useEffect(() => {
        if (authId) {
            fetchAuthPermissions();
        } else {
            setLoading(false);
            // Handle case when no authId is provided
            // Could redirect back or show an error
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
                    setExpiryDate(permissionData.expiryDate || '');
                    setIndividual({
                        name: permissionData.authName || '',
                        dob: permissionData.authDOB || '',
                        phone: permissionData.authMobile || '',
                        email: permissionData.authEmail || '',
                        dateAdded: permissionData.authUserCreatedDate || ''
                    });
                }
            } else {
                // Handle error
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
            
            const updated = new AuthorizedIndividualPermissionModel({...prev});
            switch(key) {
                case 'portalAccess':
                    updated.isPortalAccess = !updated.isPortalAccess;
                    break;
                case 'view':
                    updated.isView = !updated.isView;
                    // If view is disabled, disable download and transmit as well
                    if (!updated.isView) {
                        updated.isDownload = false;
                        updated.isTransmit = false;
                    }
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

    const handleDateChange = (date: string) => {
        setExpiryDate(date);
        if (permissions) {
            setPermissions(prev => {
                if (!prev) return prev;
                const updated = new AuthorizedIndividualPermissionModel({...prev});
                updated.expiryDate = date;
                return updated;
            });
        }
    };

    const handleSave = async () => {
        if (!permissions) return;
        
        setSaveLoading(true);
        try {
            // Create a new permissions object with authId and userId explicitly set
            const updatedPermissions = new AuthorizedIndividualPermissionModel({...permissions});
            updatedPermissions.authId = authId;
            updatedPermissions.userId = GlobalParams.USER_ID;
            
            await authUserService.saveAuthUserPermission(updatedPermissions.toJson());
            if (authUserService.response_Status_Code_API_4 === 200) {
                // Success, navigate back to list
                navigate('/authorized-individual');
            } else {
                // Handle error
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
                <Navbar />
                <Loader size="medium" />
            </div>
        );
    }

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
                                        disabled={!(permissions?.isView || false)}
                                    />
                                    <label>Download</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={permissions?.isTransmit || false}
                                        onChange={() => handlePermissionChange('transmit')}
                                        disabled={!(permissions?.isView || false)}
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
                    <Button 
                        className="px-5" 
                        style="outline" 
                        colorVariant="dark"
                        onClick={handleCancel}
                        disabled={saveLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="px-5" 
                        style="filled" 
                        colorVariant="primary"
                        onClick={handleSave}
                        disabled={saveLoading}
                    >
                        {saveLoading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AuthManagePermissions;