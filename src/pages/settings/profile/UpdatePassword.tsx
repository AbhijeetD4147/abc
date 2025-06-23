import React, { useState } from "react";
import { Input, Button, Icon, Header } from "@ketan_nimase/ui";
import logo from "../../../assets/user_lock_logo.png";
import { Navbar } from "../../../components/ui/Navbar";

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
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <Navbar patientName={{ firstName: "Jeffery", lastName: "Stevenson" }} />

            <div className="flex w-screen justify-center text-center py-2 border-b m-0">
                <Header
                    className="text-lg md:text-xl font-medium text-center"
                    colorVariant="dark"
                    headerText="Update Password"
                    size="h2"
                />
            </div>

            <img src={logo} alt="User Logo" className="w-26 h-24 mb-4 mt-4" />

            <p className="text-2xl mb-2 font-medium">Choose a new password to reset account</p>

            <div className="w-full max-w-4xl border-t pt-8">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    {/* Left: Inputs */}
                    <div className="flex-1">
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
                            className="p-0 bg-blue"
                            placeholder="Confirm Password"
                            inputType="password"
                            value={confirmPassword}
                            onChange={(e: any) => setConfirmPassword(e.target.value)}
                            name="Confirm Password"
                            label={true}
                        />
                    </div>

                    {/* Right: Criteria */}
                    <div className="flex-1">
                        <p className="text-lg font-semibold mb-2">Password Criteria</p>
                        <ul className="space-y-2 text-gray-500">
                            <CriteriaItem met={isMinLength} text={passwordCriteria.minLength} />
                            <CriteriaItem met={hasUppercase} text={passwordCriteria.uppercase} />
                            <CriteriaItem met={hasLowercase} text={passwordCriteria.lowercase} />
                            <CriteriaItem met={hasNumber} text={passwordCriteria.number} />
                            <CriteriaItem met={hasSpecialChar} text={passwordCriteria.specialChar} />
                        </ul>
                    </div>
                </div>
                <p className="mt-2 text-center text-md ">
                    We will send you a security code on your phone for additional verification.
                </p>
            </div>
            {/* Button: Centered Below */}
            <div className="flex w-screen justify-center text-center py-3 border-t-2 m-0">
                <Button
                    colorVariant="success"
                    onClick={() => setTouched(true)}
                    isDisabled={!isValid || password !== confirmPassword}
                >
                    Change Password
                </Button>

                <p className="absolute bottom-2 left-2 text-xs text-gray-500">Version: 1.0</p>
            </div>
        </div>
    );
};

const CriteriaItem: React.FC<{ met: boolean; text: string }> = ({ met, text }) => {
    return (
        <li className={`flex items-center gap-2 ${met ? "text-green-600" : "text-gray-700"}`}>
            {met ? (
                <Icon name="check" colorVariant="success" width="16" height="16" />
            ) : (
                <span className="w-2 h-2 mr-2 bg-black rounded-full inline-block"></span>
            )}
            <span>{text}</span>
        </li>
    );
};

export default UpdatePassword;
