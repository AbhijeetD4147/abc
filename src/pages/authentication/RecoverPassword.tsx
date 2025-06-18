import React, { useState } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import Footer from "../../components/ui/Footer";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface PageProps {
    logoUrl: string;
    companyName: string;
}

interface PasswordCriteria {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
}

const theme = await getTheme();

const RecoverPassword: React.FC<PageProps> = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [showConfirmError, setShowConfirmError] = useState(false);
    const [criteria, setCriteria] = useState<PasswordCriteria>({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false
    });

    const validatePassword = (pwd: string) => {
        const newCriteria = {
            minLength: pwd.length >= 8,
            hasUppercase: /[A-Z]/.test(pwd),
            hasLowercase: /[a-z]/.test(pwd),
            hasNumber: /[0-9]/.test(pwd),
            hasSpecialChar: /[%@#?!]/.test(pwd)
        };
        setCriteria(newCriteria);

        // Show error if password doesn't meet all criteria and field is not empty
        const allCriteriaMet = Object.values(newCriteria).every(criterion => criterion);
        setShowPasswordError(pwd.length > 0 && !allCriteriaMet);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);

        // Check confirm password match if confirm field has value
        if (confirmPassword.length > 0) {
            setShowConfirmError(newPassword !== confirmPassword);
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        // Show error if passwords don't match and field is not empty
        setShowConfirmError(newConfirmPassword.length > 0 && password !== newConfirmPassword);
    };

    const handleCancel = () => {
        navigate('/login');
    };

    const handleConfirm = () => {
        const allCriteriaMet = Object.values(criteria).every(criterion => criterion);

        if (!allCriteriaMet) {
            setShowPasswordError(true);
            toast.error('Please meet all password criteria');
            return;
        }

        if (password !== confirmPassword) {
            setShowConfirmError(true);
            toast.error('Passwords do not match');
            return;
        }

        // Handle password reset logic here
        toast.success('Password reset successfully');
        navigate('/login');
    };

    const CriteriaItem = ({ met, children }: { met: boolean; children: React.ReactNode }) => (
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex items-center justify-center">
                {met ? (
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
            </div>
            <span className={`text-sm ${met ? 'text-green-400' : 'text-white'}`}>{children}</span>
        </div>
    );

    return (
        <div className="flex min-h-screen w-screen">
            {/* Left Panel */}
            <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10 relative">
                <img
                    src={
                        GlobalParams.LOGO
                            ? `data:image/jpeg;base64,${GlobalParams.LOGO}`
                            : ''
                    }
                    alt="Company Logo"
                    className="w-90 h-30 inline-block align-middle"
                />
                <div className="absolute bottom-5 left-5 text-xs text-gray-400">
                    <Footer />
                </div>
            </div>

            {/* Right Panel */}
            <div
                className="w-1/2 flex flex-col justify-center items-center p-10"
                style={{ backgroundColor: theme.BGColor, color: theme.secondaryTextColor }}
            >
                <div className="w-full max-w-md space-y-6">
                    {/* Icon and Title */}
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-20 h-20 rounded-full border-2 border-white flex items-center justify-center relative">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-light text-white">Reset Your Password</h1>
                            <p className="text-white/80 mt-2">Choose a new password to reset account.</p>
                        </div>
                    </div>

                    {/* Password Input Fields */}
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute left-3 top-3 z-10">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full pl-10 pr-10 py-2 bg-white/90 border border-white/30 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <div className="absolute right-3 top-3 z-10">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            {showPasswordError && (
                                <div className="mt-1 bg-red-600 text-white text-sm px-3 py-1 rounded">
                                    Password needs to follow criteria
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <div className="absolute left-3 top-3 z-10">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className="w-full pl-10 pr-4 py-2 bg-white/90 border border-white/30 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            {showConfirmError && (
                                <div className="mt-1 bg-red-600 text-white text-sm px-3 py-1 rounded">
                                    Confirm Password does not match the Password
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Password Criteria */}
                    <div className="space-y-2">
                        <h3 className="text-white font-medium">Password Criteria</h3>
                        <div className="space-y-1">
                            <CriteriaItem met={criteria.minLength}>
                                At least 8 characters long (longer password are more secure)
                            </CriteriaItem>
                            <CriteriaItem met={criteria.hasUppercase}>
                                At least 1 uppercase letter (A, B, C...)
                            </CriteriaItem>
                            <CriteriaItem met={criteria.hasLowercase}>
                                At least 1 lowercase letter (a, b, c...)
                            </CriteriaItem>
                            <CriteriaItem met={criteria.hasNumber}>
                                At least 1 number (1, 2, 3...)
                            </CriteriaItem>
                            <CriteriaItem met={criteria.hasSpecialChar}>
                                At least 1 special character/punctuation (%, @, #, ?...)
                            </CriteriaItem>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleCancel}
                            className="flex-1 py-1 px-6 border-2 border-white text-white rounded-md hover:bg-blue-300 transition-colors font-medium"
                            style={{ backgroundColor: 'transparent' }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 py-1 px-6 border-2 border-white text-white rounded-md hover:bg-blue-300 transition-colors font-medium"
                            style={{ backgroundColor: 'transparent' }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;
