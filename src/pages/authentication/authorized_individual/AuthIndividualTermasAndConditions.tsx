import React, { useState, useEffect, useRef } from 'react';
import { getTheme } from "../../../utils/ThemeSelection";
import { GlobalParams } from '../../../utils/GlobalParameters';
import { Button, Checkbox, Icon, Loader, Signature } from "@ketan_nimase/ui";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface PatientTermsAndConditionsProps {
    optedPatient: boolean;
}

const theme = await getTheme();

const AuthIndividualTermsAndConditions: React.FC<PatientTermsAndConditionsProps> = ({ optedPatient }) => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);

    // State variables
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [termsData, setTermsData] = useState('');
    const [patientName, setPatientName] = useState('');
    const [loading, setLoading] = useState(true);

    // Current date formatting
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    useEffect(() => {
        getTermsAndCondition();
        setupCanvas();
    }, []);

    const setupCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
            }
        }
    };

    const getTermsAndCondition = async () => {
        try {
            // TODO: Replace with actual API call
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Filler content - will be replaced with backend data
            setTermsData(`
                        This applies to the software and information services we offer through our cloud-based patient portal, 
                        web-enabled emails and text services sent as part of, in connection with, or relating to such software 
                        and information services. Maintaining your trust is important to us, and we strongly encourage you to read 
                        this Policy in full. You permit to obtain and store your medical information online. 
                        If you decline you cannot view your medical information and cannot interact with your providers through email
                         messages, appointment requests, and renewal requests.
                        You consent to receive communications from us electronically. We will communicate with you by e-mail, 
                        sms or by posting information on this site. You agree that all agreements, notices, 
                        disclosures and other communications that we provide you electronically satisfy any legal requirements 
                        that such communications be in writing.
                        Information You Submit or We Collect on Your Behalf: We collect information from you when you- when you 
                        request an appointment, or you send your doctors a secure message through our patient portal, 
                        or complete a form, Upload a document, image, or other data file on our Services.`);

            setPatientName('Sample Patient Name'); // Will be replaced with actual patient name from API
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
        }
    };

    const acceptPatientTerms = async (signature: string) => {
        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate successful response
            const response = 'true';

            if (response === 'true') {
                if (optedPatient) {
                    clearSignature();
                    setIsButtonClicked(false);
                    navigate('/dashboard'); // Navigate to dashboard
                } else {
                    clearSignature();
                    setIsButtonClicked(false);
                    navigate('/update-password'); // Navigate to password update
                }
            } else {
                setIsButtonClicked(false);
                toast.error('Something went wrong! Please try again later.');
            }
        } catch (error) {
            setIsButtonClicked(false);
            toast.error('An unexpected error has occurred. Please try again later. If the problem persists, call our office.');
        }
    };

    // Canvas drawing functions
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
            }
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                ctx.stroke();
                setHasSignature(true);
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setHasSignature(false);
            }
        }
    };

    const getSignatureData = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            return canvas.toDataURL('image/png');
        }
        return '';
    };

    const handleProceed = async () => {
        setIsButtonClicked(true);

        if (isTermsChecked) {
            if (hasSignature) {
                const signatureData = getSignatureData();
                await acceptPatientTerms(signatureData);
            } else {
                setIsButtonClicked(false);
                toast.warning('Please add your signature');
            }
        } else {
            setIsButtonClicked(false);
            toast.warning('Please accept Terms of Service');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen w-screen">
                <Loader loaderType="spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white w-screen">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4">
                <h1 className="text-xl font-medium text-center">Terms of Service</h1>
            </div>

            <div className="flex flex-col min-h-screen">
                {/* Terms Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="max-w-4xl mx-auto">
                        <p className=" text-sm leading-relaxed" style={{ color: theme.primaryTextColor }}>
                            {termsData}
                        </p>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="p-4 border-t" style={{ borderColor: theme.greyBorderColor }}>
                    <div className="max-w-md mx-auto space-y-4">
                        {/* I Accept Checkbox */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={isTermsChecked}
                                labelText="I Accept"
                                showText
                                onChange={(e) => setIsTermsChecked(e.target.checked)}
                                classes='text-lg'
                            />
                        </div>

                        {/* Patient Name and Date */}
                        <div className="text-lg" style={{ color: theme.primaryTextColor }}>
                            {patientName} | {currentDate}
                        </div>

                        {/* Signature Section */}
                        <div>
                            <Signature
                                height={200}
                                onEnd={() => { }}
                                penColor="#000000"
                                strokeWidth={2}
                                title="Signature"
                                width={370}
                                backgroundColor="white"
                            />
                        </div>

                        {/* Proceed Button */}
                        <div className="flex justify-center pt-4">
                            {isButtonClicked ? (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            ) : (
                                <Button
                                    colorVariant="primary"
                                    onClick={handleProceed}
                                    className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Proceed
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthIndividualTermsAndConditions;
