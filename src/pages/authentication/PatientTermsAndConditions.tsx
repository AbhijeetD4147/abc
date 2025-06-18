import React, { useState, useEffect, useRef } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import { Button, Icon, Loader } from "@ketan_nimase/ui";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface PatientTermsAndConditionsProps {
    optedPatient: boolean;
}

const theme = await getTheme();

const PatientTermsAndConditions: React.FC<PatientTermsAndConditionsProps> = ({ optedPatient }) => {
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
            setTermsData(`PATIENT PORTAL TERMS OF SERVICE AND PRIVACY AGREEMENT

Effective Date: [Date will be provided by backend]

Welcome to our Patient Portal. By accessing and using this portal, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.

1. ACCEPTANCE OF TERMS
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

2. PRIVACY AND CONFIDENTIALITY
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.

3. USER RESPONSIBILITIES AND OBLIGATIONS
At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.

4. PERMITTED USE OF THE PORTAL
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.

5. TECHNICAL REQUIREMENTS AND SYSTEM ACCESS
Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Excepteur sint occaecat cupidatat non proident.

6. LIMITATION OF LIABILITY
Sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.

7. MODIFICATIONS TO TERMS
Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.

8. TERMINATION OF ACCESS
Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

9. GOVERNING LAW
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollitia animi, id est laborum.

10. CONTACT INFORMATION
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

By signing below, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and Privacy Agreement. You also confirm that you are authorized to accept these terms on behalf of the patient if you are acting as a legal guardian or authorized representative.

[Additional terms and conditions will be loaded from backend API]`);

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
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed" style={{ color: theme.primaryTextColor }}>
                            {termsData}
                        </pre>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="p-4 border-t" style={{ borderColor: theme.greyBorderColor }}>
                    <div className="max-w-md mx-auto space-y-4">
                        {/* I Accept Checkbox */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                checked={isTermsChecked}
                                onChange={(e) => setIsTermsChecked(e.target.checked)}
                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                            />
                            <label htmlFor="acceptTerms" className="text-lg" style={{ color: theme.primaryTextColor }}>
                                I Accept
                            </label>
                        </div>

                        {/* Patient Name and Date */}
                        <div className="text-lg" style={{ color: theme.primaryTextColor }}>
                            {patientName} | {currentDate}
                        </div>

                        {/* Signature Section */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg" style={{ color: theme.primaryTextColor }}>Signature</span>
                                <button
                                    onClick={clearSignature}
                                    className="p-2 rounded hover:bg-gray-200 transition-colors"
                                    title="Clear Signature"
                                >
                                    <Icon
                                        name="trash-2"
                                        height="20px"
                                        width="20px"
                                        colorVariant="dark"
                                    />
                                </button>
                            </div>

                            <canvas
                                ref={canvasRef}
                                width={400}
                                height={150}
                                className="border border-gray-300 rounded bg-white cursor-crosshair w-full"
                                style={{ maxWidth: '400px', height: '150px' }}
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
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

export default PatientTermsAndConditions;