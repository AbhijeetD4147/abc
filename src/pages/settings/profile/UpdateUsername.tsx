import React, { useState } from 'react';
import { Input, Button, Icon, Header } from "@ketan_nimase/ui"; // Adjust import as needed
import logo from "../../../assets/user_lock_logo.png";
import { Navbar } from "../../../components/ui/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

const usernameCriteria = {
    minLength: "At least 8 characters long",
    noSpecialChars: "No special characters (@, #, $, !...)",
    alphaNumeric: "Can be combination of Numbers and Alphabets",
};

const UpdateUsername: React.FC<{ currentUsername?: string }> = ({ currentUsername }) => {
    const [username, setUsername] = useState("");
    const [touched, setTouched] = useState(false);

    const isMinLength = username.length >= 8;
    const isAlphaNumeric = /^[a-zA-Z0-9]*$/.test(username);
    const isNoSpecialChars = /^[a-zA-Z0-9]*$/.test(username); // same test

    const isValid = isMinLength && isAlphaNumeric && isNoSpecialChars;
    const showError = touched && username.trim() === "";

    return (
        <div className="vh-100 vw-100 d-flex flex-column align-items-center justify-content-center">
            <Navbar
                patientName={{ firstName: "Jeffery", lastName: "Stevenson" }}
            />
            <div className="d-flex w-100 justify-content-center text-center py-2 border-bottom m-0">
                <Header
                    className="fs-5 fs-md-4 fw-medium text-center"
                    colorVariant="dark"
                    headerText="Update Username"
                    size="h2"
                />
            </div>
            <img src={logo} alt="User Logo" className="mb-3 mt-3" style={{ width: '7rem', height: '6rem' }} />

            <p className="h3 mb-4 mt-2 fw-medium">Your Username</p>
            <p className="h5 mb-4">
                Your Username is : <strong>{currentUsername || "dynamic username"}</strong>
            </p>

            <div className="w-100 border-top pt-4" style={{ maxWidth: '64rem' }}>
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                    {/* Left: Label + Input */}
                    <div className="flex-fill">
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e: any) => setUsername(e.target.value)}
                            onBlur={() => setTouched(true)}
                            error={showError ? "error" : undefined}
                            validationMsg={showError ? "Username is required" : ""}
                            label={true}
                            name="Do you want to update your Username?"
                        />
                    </div>

                    {/* Right: Criteria List */}
                    <div className="flex-fill">
                        <p className="fs-5 fw-semibold mb-2">Username Criteria</p>
                        <ul className="list-unstyled">
                            <CriteriaItem met={isMinLength} text={usernameCriteria.minLength} />
                            <CriteriaItem met={isNoSpecialChars} text={usernameCriteria.noSpecialChars} />
                            <CriteriaItem met={isAlphaNumeric} text={usernameCriteria.alphaNumeric} />
                        </ul>
                    </div>
                </div>

                {/* Button: Centered Below */}
                <div className="mt-5 d-flex justify-content-center">
                    <Button
                        colorVariant="primary"
                        onClick={() => setTouched(true)}
                        isDisabled={!isValid || username.trim() === ""}
                    >
                        Change Username
                    </Button>
                </div>
            </div>

            <p className="position-absolute bottom-0 start-0 m-2 small text-muted">Version: 1.0</p>
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

export default UpdateUsername;
