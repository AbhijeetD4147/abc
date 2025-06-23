import React, { useState } from "react";
import { Navbar } from "../../../components/ui/Navbar";
import { FaCamera, FaFolderOpen, FaTrash, FaUserPlus } from "react-icons/fa";
import WarningPopup from "../../../components/ui/WarningPopup";
import { Header, Icon } from "@ketan_nimase/ui"

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
            />

            {/* Header */}
            <div className=" flex justify-content-center text-center py-2 border border-bottom m-0">
                <Header
                    className="text-lg md:text-xl font-medium text-center"
                    colorVariant="dark"
                    headerText="Profile"
                    size="h2"
                />
                {/* Info Icon */}
                <div className="relative group ml-2 inline-block">
                    <div className="border-2 border-blue-500 rounded-full mt-1 ml-4 p-1 sm:p-1 lg:p-1 flex items-center justify-center hover:bg-blue-100 cursor-pointer">
                        <Icon
                            colorVariant="primary"
                            height="12px"
                            width="12px"
                            isCursorPointer
                            isbadge
                            name="info"
                            stroke
                            fill
                            tooltip
                            tooltipTitle="Adding the ID/Driver's License will assist the practice in getting the bills and claims resolve faster."
                            tooltipPlacement="bottom"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex min-h-screen w-screen">
                <div className="flex flex-1 w-screen">
                    {/* Left Section */}
                    <div className="w-1/2 flex flex-col justify-center items-center bg-blue-500 p-5 relative">
                        {/* Tab Headers */}
                        <div className="flex mb-0">
                            <div
                                className={`px-3 py-1 fw-bold cursor-pointer border-2 border-white  rounded-top-2 ${activeTab === "photo"
                                    ? "bg-blue-500 text-white"
                                    : "bg-blue-500 text-white opacity-75"
                                    }`}
                                onClick={() => setActiveTab("photo")}
                            >
                                Photo
                            </div>
                            <div
                                className={`px-3 py-1 fw-bold cursor-pointer border-2 border-white rounded-top-2 ${activeTab === "id"
                                    ? "bg-blue-500 text-white"
                                    : "bg-blue-500 text-white opacity-75"
                                    }`}
                                onClick={() => setActiveTab("id")}
                            >
                                ID/Driver's License
                            </div>
                        </div>

                        {/* Profile Image Box */}
                        <div
                            className="d-flex justify-content-center align-items-center bg-blue-500 p-2 border-2 border-white border-top-0"
                            style={{
                                width: "256px",
                                height: "230px",
                                position: "relative",
                                borderRadius: "0 0 4px 4px", // Only bottom corners rounded
                            }}
                        >
                            {currentImage ? (
                                <img
                                    src={currentImage}
                                    alt="Profile"
                                    className="rounded"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ) : (
                                <Icon
                                    colorVariant="light"
                                    height="60px"
                                    isCursorPointer
                                    name="user"
                                    stroke
                                    width="60px"
                                />
                            )}
                        </div>


                        {/* Icons */}
                        <div className="flex gap-4 mb-1">
                            {/* Upload from Files */}
                            <label
                                className="flex justify-center items-center "
                                style={{ width: "56px", height: "56px", cursor: "pointer" }}
                            >
                                <Icon
                                    colorVariant="light"
                                    height="25px"
                                    isCursorPointer
                                    name="file"
                                    stroke
                                    width="25px"
                                />
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
                                <Icon
                                    colorVariant="light"
                                    height="25px"
                                    isCursorPointer
                                    name="camera"
                                    stroke
                                    width="25px"
                                />
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
                                <Icon
                                    colorVariant={currentImage ? "light" : "dark"}
                                    height="25px"
                                    isCursorPointer
                                    name="delete"
                                    stroke
                                    width="25px"
                                // disabled={!currentImage}
                                />
                            </button>
                        </div>

                        {/* Name Section */}
                        <div
                            className="bg-blue-500 text-white p-1 rounded position-relative"
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
                                    <p className="bg-blue-200 text-dark py-2 px-3 fs-5 mb-2 rounded">{firstName}</p>
                                    <p className="bg-blue-200 text-dark py-2 px-3 fs-5 rounded">{lastName}</p>
                                </div>
                            )}
                        </div>


                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col w-50 bg-white  pl-16 pt-10 align-item-center mt-20 ml-10">
                        {/* Change Username */}
                        <div className="hover:bg-gray-100 p-2 mr-40">
                            <a href="/update-username" className="text-3xl d-block text-black no-underline mb-2">
                                Change Username
                            </a>
                            <small className="text-lg text-muted">
                                Change your email address for login
                            </small>
                        </div>
                        <hr className="mt-0 mr-40 mb-0" />

                        {/* Change Password */}
                        <div className="hover:bg-gray-100 p-2 mr-40">
                            <a href="/update-password" className="text-3xl d-block text-black no-underline mb-2">
                                Change Password
                            </a>
                            <small className="text-lg text-muted">Last changed on: 07/21/2021</small>
                        </div>
                        <hr className="mt-0 mr-40 mb-0" />

                        {/* Make Account Inactive */}
                        <div className="hover:bg-gray-100 pt-3 pl-2 mr-40 pb-3">
                            <a href="/opt-out" className="text-3xl d-block text-black no-underline mb-2 text-danger">
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
