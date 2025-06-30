import React, { useState } from "react";
import { Button, Header, Signature } from "@ketan_nimase/ui";
import { Navbar } from "../../../components/ui/Navbar";
import { useNavigate } from "react-router-dom";
import { GlobalParams } from "../../../utils/GlobalParameters";
import 'bootstrap/dist/css/bootstrap.min.css';

const dummyText = `Are you sure you want to Opt-Out and make your account Inactive? \n By submitting this Opt-Out Form, you understand and agree to the following:\n \n 1. I UNDERSTAND that I will no longer have online access to my health record or providers.\n2. I UNDERSTAND that First Insight Vision does not effectuate my opting-out.\n3. I UNDERSTAND that federal and state laws allow health care providers to disclose much of my health information without my written permission when other hospitals, physicians, and health care providers need to treat me. My outside providers may need to retrieve my medical information electronically. Most medical records shared for continuation of care or transfer of care do not require my written authorization. By law, some information requires my written authorization, but certain medical records can be shared.\n4. I UNDERSTAND that in the future, if I want to change my opt-out decision, I need to send a written request of revocation.`;

const OptOut: React.FC = () => {
    const [accepted, setAccepted] = useState(false);
    const userName = { firstName: "Ketan", lastName: "Nimase" };
    const currentDate = new Date().toLocaleDateString("en-US");
    const navigate = useNavigate();

    // Simulate fetching and splitting backend text
    const textLines = dummyText.split("\n");
    return (
        <div className="min-vh-100 vw-100 d-flex flex-column align-items-center justify-content-center">
            <Navbar patientName={{ firstName: "Jeffery", lastName: "Stevenson" }} />
            <div className="d-flex w-100 justify-content-center text-center py-2 border-bottom m-0">
                <Header
                    className="fs-5 fs-md-4 fw-medium text-center"
                    colorVariant="dark"
                    headerText="Opt-Out"
                    size="h2"
                />
            </div>
            <div className="container" style={{maxWidth: '48rem'}}>
                <div className="px-3 mt-4 text-start" style={{fontSize: '0.875rem', lineHeight: '1.5'}}>
                    {textLines.map((line, index) => (
                        <p key={index} className="mb-2">{line}</p>
                    ))}
                </div>
            </div>
            {/* Signature */}
            <div className="mt-4">
                {/* I Accept Checkbox */}
                <div className="w-100 py-2 mt-3 d-flex align-items-center gap-2" style={{maxWidth: '48rem'}}>
                    <input
                        id="accept"
                        type="checkbox"
                        checked={accepted}
                        onChange={() => setAccepted(prev => !prev)}
                        className="form-check-input"
                        style={{width: '1rem', height: '1rem'}}
                    />
                    <label htmlFor="accept" className="form-check-label fw-medium" style={{fontSize: '0.875rem'}}>I Accept</label>
                </div>
                <p className="fw-medium mb-1" style={{fontSize: '0.875rem'}}>
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
            <div className="position-relative vw-100">
                {/* Buttons */}
                <div className="d-flex justify-content-center text-center mt-4 py-3 border-top gap-3" style={{borderTopWidth: '2px'}}>
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
                <p className="position-absolute bottom-0 start-0 text-muted" style={{fontSize: '0.75rem', margin: '0.5rem'}}>Version: {GlobalParams.Version}</p>
            </div>
        </div>
    );
};
export default OptOut;