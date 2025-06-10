import React, { useState } from "react";
import { Navbar } from "../../../components/ui/Navbar";
import { FaCamera, FaFolderOpen, FaTrash, FaUserPlus } from "react-icons/fa";
import WarningPopup from "../../../components/ui/WarningPopup";

const PatientProfile: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState("Jeffery");
    const [lastName, setLastName] = useState("Stevenson");

    const [activeTab, setActiveTab] = useState<"photo" | "id">("photo");
    const [photoImage, setPhotoImage] = useState<string | null>(null);
    const [idImage, setIdImage] = useState<string | null>(null);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);


    // This is the image currently shown in the preview
    const currentImage = activeTab === "photo" ? photoImage : idImage;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target?.result as string;
                if (activeTab === "photo") {
                    setPhotoImage(imageData);
                } else {
                    setIdImage(imageData);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleDeleteConfirm = () => {
        deleteImage();          // Your existing delete function
        setShowConfirmPopup(false);
    };

    const deleteImage = () => {
        if (activeTab === "photo") {
            setPhotoImage(null);
        } else {
            setIdImage(null);
        }
    };

    return (

        <div className="h-screen w-screen">
            {showConfirmPopup && (
                <WarningPopup
                    message={`Are you sure you want to delete this image?`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setShowConfirmPopup(false)}
                />
            )}
            {/* Navbar */}
            <Navbar
                patientName={{ firstName: "Jeffery", lastName: "Stevenson" }}
                onNavigate={(route) => console.log("Navigate to:", route)}
            />

            {/* Header */}
            <div className="text-center py-3 border border-bottom m-0">
                <h2 className="m-0 text-xl">Profile</h2>
            </div>

            {/* Main Content */}
            <div className="flex min-h-screen w-screen">
                <div className="flex flex-1 w-screen">
                    {/* Left Section */}
                    <div className="w-1/2 flex flex-col justify-center items-center bg-blue-500 p-10 relative">
                        {/* Tab Headers */}
                        <div className="flex mb-0 ">
                            <div
                                className={`px-3 py-1 rounded-top fw-bold cursor-pointer ${activeTab === "photo"
                                    ? "bg-blue-500 text-white border border-white border-bottom-0 ms-2"
                                    : "text-white bg-blue-500"
                                    }`}
                                onClick={() => setActiveTab("photo")}
                            >
                                Photo
                            </div>
                            <div
                                className={`px-3 py-1 rounded-top cursor-pointer ${activeTab === "id"
                                    ? "bg-blue-500 text-white border border-white border-bottom-0 ms-2"
                                    : "text-white bg-blue-500"
                                    }`}
                                onClick={() => setActiveTab("id")}
                            >
                                ID/Driver's License
                            </div>
                        </div>

                        {/* Profile Image Box */}
                        <div
                            className="d-flex justify-content-center align-items-center mb-3 bg-blue-500 mt-0 p-2"
                            style={{
                                width: "223px",
                                height: "223px",
                                border: "2px solid white",
                                position: "relative",
                                borderRadius: "2%"
                            }}
                        >
                            {currentImage ? (
                                <>
                                    <img
                                        src={currentImage}
                                        alt="Profile"
                                        className="rounded"
                                        style={{ width: "100%", height: "100%", objectFit: "cover"}}
                                    />
                                </>
                            ) : (
                                <FaUserPlus size={48} color="ffffff" />
                            )}
                        </div>

                        {/* Icons */}
                        <div className="flex gap-4 mb-4">
                            {/* Upload from Files */}
                            <label
                                className="flex justify-center items-center "
                                style={{ width: "56px", height: "56px", cursor: "pointer" }}
                            >
                                <FaFolderOpen size={28} color="#ffffff" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    hidden
                                />
                            </label>

                            {/* Open Camera */}
                            <label
                                className="flex justify-center items-center "
                                style={{ width: "56px", height: "56px", cursor: "pointer" }}
                            >
                                <FaCamera size={28} color="#ffffff" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    onChange={handleImageChange}
                                    hidden
                                />
                            </label>

                            {/* Delete Image */}
                            <button
                                type="button"
                                className="flex justify-center items-center bg-transparent p-0"
                                style={{
                                    width: "56px",
                                    height: "56px",
                                    cursor: currentImage ? "pointer" : "not-allowed",
                                }}
                                onClick={() => currentImage && setShowConfirmPopup(true)}
                                disabled={!currentImage}
                            >
                                <FaTrash size={28} color={currentImage ? "#ffffff" : "#999999"} />
                            </button>
                        </div>

                        {/* Name Section */}
                        <div
                            className="bg-blue-500 text-white p-3 rounded position-relative"
                            style={{ width: "70%" }}
                        >
                            {/* Header Row */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <label className="form-label text-white mb-0">Name</label>
                                {editing ? (
                                    <button
                                        className="btn btn-link p-0 text-white"
                                        onClick={() => setEditing(false)}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-link p-0 pl-24 text-white bg-transparent focus-none"
                                        onClick={() => setEditing(true)}
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>

                            {/* Content */}
                            {editing ? (
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control mb-2 bg-blue-200 text-black py-2 px-3 fs-5"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="form-control bg-blue-200 text-dark py-2 px-3 fs-5"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className="mb-3">
                                    <p className="bg-blue-200 text-dark py-2 px-3 fs-5 mb-2">{firstName}</p>
                                    <p className="bg-blue-200 text-dark py-2 px-3 fs-5">{lastName}</p>
                                </div>
                            )}
                        </div>


                    </div>

                    {/* Right Section */}
                    <div className="w-50 bg-white p-5">
                        {/* Change Username */}
                        <div className="mb-4">
                            <a href="#" className="h5 d-block text-primary">
                                Change Username
                            </a>
                            <small className="text-muted">
                                Change your email address for login
                            </small>
                        </div>
                        <hr />

                        {/* Change Password */}
                        <div className="mb-4">
                            <a href="#" className="h5 d-block text-primary">
                                Change Password
                            </a>
                            <small className="text-muted">Last changed on: 07/21/2021</small>
                        </div>
                        <hr />

                        {/* Make Account Inactive */}
                        <div>
                            <a href="#" className="h5 text-danger">
                                Make My Account Inactive
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
