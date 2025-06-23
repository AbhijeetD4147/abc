import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../../components/ui/Navbar';
import { Button, Header, Icon } from '@ketan_nimase/ui';

interface PoliciesFormProps {
    formName?: string;
    formURL?: string;
    formStatus?: string;
    formBase64?: string;
}

interface LocationState {
    formName?: string;
    formURL?: string;
    formStatus?: string;
    formBase64?: string;
}

export const PoliciesForm: React.FC<PoliciesFormProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;

    const formName = state?.formName || 'Policies & Consent Forms';
    const formURL = state?.formURL || '';
    const formStatus = state?.formStatus || 'Pending';
    const formBase64 = state?.formBase64 || '';

    // Sample patient data - replace with actual data from your auth context
    const patientName = {
        firstName: 'John',
        lastName: 'Doe'
    };

    const downloadFile = (base64File: string, fileName: string) => {
        try {
            // Convert base64 to blob
            const byteCharacters = atob(base64File);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen">
            {/* Navbar */}
            <Navbar patientName={patientName} />

            {/* Main Content */}
            <div className="bg-white">
                {/* Header Section */}
                <div className="bg-white px-4 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        {/* Back Button */}
                        <Button
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >
                            <Icon
                                colorVariant="dark"
                                height="20px"
                                isCursorPointer
                                name="arrow_back_ios_new"
                                stroke
                                width="20px"
                            />
                        </Button>

                        {/* Form Title */}
                        <Header
                            className="font-bold text-gray-900 justify-center text-center flex-1"
                            colorVariant="dark"
                            headerText={formName}
                            size="h2"
                        />

                        {/* Download Button - Only visible if form is accepted */}
                        <div className="w-10 h-10 flex items-center justify-center">
                            {formStatus === 'Accepted' && formBase64 && (
                                <Button
                                    onClick={() => downloadFile(formBase64, formName)}
                                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                    label="Download PDF"
                                >
                                    <Icon
                                        colorVariant="dark"
                                        height="20px"
                                        isCursorPointer
                                        name="download"
                                        stroke
                                        width="20px"
                                    />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-7xl mx-auto">
                    {formURL ? (
                        <iframe
                            src={formURL}
                            className="w-full h-screen border-0"
                            title={formName}
                            onError={() => console.error('Failed to load form')}
                        >
                            <div className="flex items-center justify-center h-64 text-gray-500">
                                <p>Something Went Wrong!</p>
                            </div>
                        </iframe>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-gray-500">
                            <div className="text-center">
                                <Icon
                                    colorVariant="dark"
                                    height="48px"
                                    name="description"
                                    stroke
                                    width="48px"
                                    className="mx-auto mb-4 opacity-50"
                                />
                                <p className="text-lg">No form URL provided</p>
                                <p className="text-sm mt-2">Please contact support if this issue persists.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PoliciesForm;