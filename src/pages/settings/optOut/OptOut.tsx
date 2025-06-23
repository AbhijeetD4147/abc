import React, { useState } from "react";
import { Button, Header, Signature } from "@ketan_nimase/ui";
import { Navbar } from "../../../components/ui/Navbar";
import { useNavigate } from "react-router-dom";
import { GlobalParams } from "../../../utils/GlobalParameters";

const dummyText = `Are you sure you want to Opt-Out and make your account Inactive? \n By submitting this Opt-Out Form, you understand and agree to the following:\n \n 1. I UNDERSTAND that I will no longer have online access to my health record or providers.\n2. I UNDERSTAND that First Insight Vision does not effectuate my opting-out.\n3. I UNDERSTAND that federal and state laws allow health care providers to disclose much of my health information without my written permission when other hospitals, physicians, and health care providers need to treat me. My outside providers may need to retrieve my medical information electronically. Most medical records shared for continuation of care or transfer of care do not require my written authorization. By law, some information requires my written authorization, but certain medical records can be shared.\n4. I UNDERSTAND that in the future, if I want to change my opt-out decision, I need to send a written request of revocation.`;

const OptOut: React.FC = () => {
    const [accepted, setAccepted] = useState(false);
    const userName = { firstName: "Ketan", lastName: "Nimase" };
    const currentDate = new Date().toLocaleDateString("en-US");
    const navigate = useNavigate();

    // Simulate fetching and splitting backend text
    const textLines = dummyText.split("\n");
    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-center">
            <Navbar patientName={{ firstName: "Jeffery", lastName: "Stevenson" }} />
            <div className="flex w-screen justify-center text-center py-2 border-b m-0">
                <Header
                    className="text-lg md:text-xl font-medium text-center"
                    colorVariant="dark"
                    headerText="Opt-Out"
                    size="h2"
                />
            </div>
            <div className="max-w-4xl px-4 mt-6 text-left text-sm leading-6">
                {textLines.map((line, index) => (
                    <p key={index} className="mb-2">{line}</p>
                ))}
            </div>
            {/* Signature */}
            <div className="mt-4">
                {/* I Accept Checkbox */}
                <div className="w-full max-w-4xl py-2 mt-3 flex items-center gap-2">
                    <input
                        id="accept"
                        type="checkbox"
                        checked={accepted}
                        onChange={() => setAccepted(prev => !prev)}
                        className="w-4 h-4"
                    />
                    <label htmlFor="accept" className="text-sm font-medium">I Accept</label>
                </div>
                <p className="text-sm font-medium mb-1">
                    {userName.firstName} {userName.lastName} | {currentDate}
                </p>
                <Signature
                    height={200}
                    onEnd={() => { }}
                    penColor="#000000"
                    isMandatory={false}
                    strokeWidth={2}
                    title="Signature"
                    width={400}
                />
            </div>
            {/* Buttons */}
            <div className="relative w-screen">
                {/* Buttons */}
                <div className="flex justify-center text-center mt-4 py-3 border-t-2 gap-4">
                    <Button
                        colorVariant="primary"
                        isDisabled={!accepted}
                        onClick={() => alert("Opt-Out Submitted")}
                    >
                        Make my account inactive
                    </Button>
                    <Button
                        colorVariant="default"
                        onClick={() => navigate("/profile")}
                    >
                        Cancel
                    </Button>
                </div>
                <p className="absolute bottom-2 left-2 text-xs text-gray-500">Version: {GlobalParams.Version}</p>
            </div>
        </div>
    );
};
export default OptOut;