import React, { useState } from 'react';
import { Input, Button, Icon, Header } from "@ketan_nimase/ui";
import logo from "../../../assets/user_lock_logo.png";
import { Navbar } from "../../../components/ui/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

const passwordCriteria = {
    minLength: "At least 8 characters long",
    uppercase: "At least 1 uppercase letter (A, B, C...)",
    lowercase: "At least 1 lowercase letter (a, b, c...)",
    number: "At least 1 number (1, 2, 3...)",
    specialChar: "At least 1 special character/punctuation (%, @, #, ?...)",
};

const UpdatePassword: React.FC = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [touched, setTouched] = useState(false);

    const isMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    const isValid = isMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
    const showError = touched && password.trim() === "";

    return (
        <div className="vh-100 vw-100 d-flex flex-column align-items-center justify-content-center">
            <Navbar />

            <div className="d-flex w-100 justify-content-center text-center py-2 border-bottom m-0">
                <Header
                    className="fs-5 fs-md-4 fw-medium text-center"
                    colorVariant="dark"
                    headerText="Update Password"
                    size="h2"
                />
            </div>

            <img src={logo} alt="User Logo" className="mb-3 mt-3" style={{ width: '6.5rem', height: '6rem' }} />

            <p className="h3 mb-2 fw-medium">Choose a new password to reset account</p>

            <div className="w-100 border-top pt-4" style={{ maxWidth: '64rem' }}>
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                    {/* Left: Inputs */}
                    <div className="flex-fill">
                        <Input
                            placeholder="Password"
                            value={password}
                            inputType="password"
                            onChange={(e: any) => setPassword(e.target.value)}
                            onBlur={() => setTouched(true)}
                            error={showError ? "error" : undefined}
                            validationMsg={showError ? "Password is required" : ""}
                            name="New Password"
                            label={true}
                        />
                        {/* <Icon
                            colorVariant="primary"
                            height="50px"
                            isCursorPointer
                            name="info_circle"
                            tooltip
                            tooltipPlacement="bottom"
                            tooltipTitle="User Icon"
                            width="20px"
                        /> */}
                        <Input
                            placeholder="Confirm Password"
                            inputType="password"
                            value={confirmPassword}
                            onChange={(e: any) => setConfirmPassword(e.target.value)}
                            name="Confirm Password"
                            label={true}
                        />
                    </div>

                    {/* Right: Criteria */}
                    <div className="flex-fill">
                        <p className="fs-5 fw-semibold mb-2">Password Criteria</p>
                        <ul className="list-unstyled text-muted">
                            <CriteriaItem met={isMinLength} text={passwordCriteria.minLength} />
                            <CriteriaItem met={hasUppercase} text={passwordCriteria.uppercase} />
                            <CriteriaItem met={hasLowercase} text={passwordCriteria.lowercase} />
                            <CriteriaItem met={hasNumber} text={passwordCriteria.number} />
                            <CriteriaItem met={hasSpecialChar} text={passwordCriteria.specialChar} />
                        </ul>
                    </div>
                </div>
                <p className="mt-2 text-center">
                    We will send you a security code on your phone for additional verification.
                </p>
            </div>
            {/* Button: Centered Below */}
            <div className="d-flex w-100 justify-content-center text-center py-3 border-top border-2 m-0">
                <Button
                    colorVariant="success"
                    onClick={() => setTouched(true)}
                    isDisabled={!isValid || password !== confirmPassword}
                >
                    Change Password
                </Button>

                <p className="position-absolute bottom-0 start-0 m-2 small text-muted">Version: 1.0</p>
            </div>
        </div>
    );
};

const CriteriaItem: React.FC<{ met: boolean; text: string }> = ({ met, text }) => {
    return (
        <li className={`d-flex align-items-center gap-2 mb-2 ${met ? "text-success" : "text-dark"}`}>
            {met ? (
                <Icon name="check" colorVariant="success" width="16" height="16" />
            ) : (
                <span className="bg-dark rounded-circle d-inline-block me-2" style={{ width: '0.5rem', height: '0.5rem' }}></span>
            )}
            <span>{text}</span>
        </li>
    );
};

export default UpdatePassword;
