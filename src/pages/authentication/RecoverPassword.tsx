import React, { useState } from 'react';
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MaximEyes from '../../assets/maximeyeslogo.png';
import { Icon } from '@ketan_nimase/ui';

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
        <div className="d-flex align-items-center gap-2">
            <div className="d-flex align-items-center justify-content-center" style={{ width: '16px', height: '16px' }}>
                {met ? (
                    <svg className="text-success" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <div className="bg-white rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                )}
            </div>
            <span className={`small ${met ? 'text-success' : 'text-white'}`}>{children}</span>
        </div>
    );

    return (
        <div className="container-fluid vh-100 vw-100 p-0">
            <div className="row h-100 g-0">
                {/* Left Panel */}
                <div className="col-12 col-md-6 d-flex flex-column bg-white p-2 p-md-5">
                    {/* Centered Logo */}
                    <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                        <img
                            src={
                                GlobalParams.LOGO
                                    ? `data:image/jpeg;base64,${GlobalParams.LOGO}`
                                    : ''
                            }
                            alt="Company Logo"
                            className="img-fluid"
                            style={{ maxWidth: '240px', height: 'auto' }}
                        />
                    </div>

                    {/* Footer at Bottom */}
                    <div className="flex-shrink-0">
                        <div className="d-none d-md-flex justify-content-between align-items-center gap-2">
                            <img src={MaximEyes} alt="Maximeyes Logo" className="img-fluid" style={{ height: '64px', width: 'auto' }} />
                            <div className="text-end" style={{ fontSize: '0.75rem' }}>
                                &copy; 2025, First Insight Corporation. All rights reserved.
                            </div>
                        </div>
                        <div className="d-flex d-md-none align-items-center justify-content-between gap-3 px-2 py-2 bg-white rounded">
                            <img src={MaximEyes} alt="Maximeyes Logo" className="img-fluid" style={{ height: '32px', width: 'auto' }} />
                            <div className="text-center text-muted" style={{ fontSize: '0.75rem' }}>
                                &copy; 2025, First Insight Corporation. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div
                    className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center p-5"
                    style={{ backgroundColor: theme.BGColor, color: theme.secondaryTextColor }}
                >
                    <div className="w-100" style={{ maxWidth: '400px' }}>
                        {/* Icon and Title */}
                        <div className="text-center mb-4">
                             <div className="d-flex justify-content-center mb-4 position-relative">
                                <div
                                    className="border border-3 rounded-circle p-1 p-sm-2 p-lg-3 d-flex align-items-center justify-content-center"
                                >
                                    <Icon
                                        colorVariant="light"
                                        height="60px"
                                        isCursorPointer
                                        isbadge
                                        name="lock"
                                        stroke
                                        width="60px"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="fs-2 fw-light text-white mb-2">Reset Your Password</h1>
                                <p className="text-white-50 mb-0">Choose a new password to reset account.</p>
                            </div>
                        </div>

                        {/* Password Input Fields */}
                        <div className="mb-4">
                            <div className="position-relative mb-3">
                                <div className="position-absolute start-0 top-50 translate-middle-y ms-3" style={{ zIndex: 10 }}>
                                    <svg className="text-muted" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="form-control ps-5 pe-5 py-2"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        color: '#495057'
                                    }}
                                />
                                <div className="position-absolute end-0 top-50 translate-middle-y me-3" style={{ zIndex: 10 }}>
                                    <svg className="text-primary" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                {showPasswordError && (
                                    <div className="mt-1 bg-danger text-white small px-3 py-1 rounded">
                                        Password needs to follow criteria
                                    </div>
                                )}
                            </div>

                            <div className="position-relative">
                                <div className="position-absolute start-0 top-50 translate-middle-y ms-3" style={{ zIndex: 10 }}>
                                    <svg className="text-muted" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="form-control ps-5 pe-4 py-2"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        color: '#495057'
                                    }}
                                />
                                {showConfirmError && (
                                    <div className="mt-1 bg-danger text-white small px-3 py-1 rounded">
                                        Confirm Password does not match the Password
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Password Criteria */}
                        <div className="mb-4">
                            <h3 className="text-white fw-medium mb-2">Password Criteria</h3>
                            <div className="d-flex flex-column gap-1">
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
                        <div className="d-flex gap-3 pt-3">
                            <button
                                onClick={handleCancel}
                                className="btn btn-outline-light flex-fill py-2 px-4 fw-medium transition-all"
                                style={{ backgroundColor: 'transparent' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(173, 216, 230, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="btn btn-outline-light flex-fill py-2 px-4 fw-medium transition-all"
                                style={{ backgroundColor: 'transparent' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(173, 216, 230, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;
