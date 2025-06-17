import React, { useState } from "react";
import { Input, Button, Icon } from "@ketan_nimase/ui"; // Adjust import as needed
import logo from "../../../assets/user_lock_logo.png";
import { Navbar } from "../../../components/ui/Navbar";

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

        <div className="h-screen w-screen flex flex-col items-center justify-center ">
            <Navbar
                patientName={{ firstName: "Jeffery", lastName: "Stevenson" }}
            />
            <div className=" flex w-screen justify-content-center text-center py-2 border-b border-bottom m-0">
                <h2 className="mb-0 p-2 text-3xl">Update Username</h2>
            </div>
            <img src={logo} alt="User Logo" className="w-16 h-24 w-24 mb-4 mt-4" />

            <p className="text-2xl mb-5 mt-2 font-medium">Your Username</p>
            <p className="text-xl mb-4 b-4">
                Your Username is : <strong>{currentUsername || "dynamic username"}</strong>
            </p>

            <div className="w-full max-w-4xl border-t pt-8">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                    {/* Left: Label + Input */}
                    <div className="flex-1">
                        <label className="block text-lg mb-2">Do you want to update your Username?</label>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e: any) => setUsername(e.target.value)}
                            onBlur={() => setTouched(true)}
                            error={showError ? "error" : undefined}
                            validationMsg={showError ? "Username is required" : ""}
                            name=""
                        />
                    </div>

                    {/* Right: Criteria List */}
                    <div className="flex-1">
                        <p className="text-lg font-semibold mb-2">Username Criteria</p>
                        <ul className="space-y-2">
                            <CriteriaItem met={isMinLength} text={usernameCriteria.minLength} />
                            <CriteriaItem met={isNoSpecialChars} text={usernameCriteria.noSpecialChars} />
                            <CriteriaItem met={isAlphaNumeric} text={usernameCriteria.alphaNumeric} />
                        </ul>
                    </div>
                </div>

                {/* Button: Centered Below */}
                <div className="mt-10 flex justify-center">
                    <Button
                        colorVariant="primary"
                        onClick={() => setTouched(true)}
                        isDisabled={!isValid || username.trim() === ""}
                    >
                        Change Username
                    </Button>
                </div>
            </div>


            <p className="absolute bottom-2 left-2 text-xs text-gray-500">Version: 1.0</p>
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

export default UpdateUsername;
