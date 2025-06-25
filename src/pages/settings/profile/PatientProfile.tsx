import React, { useState, useEffect } from "react";
import { Navbar } from "../../../components/ui/Navbar";
import { FaCamera, FaFolderOpen, FaTrash, FaUserPlus } from "react-icons/fa";
import WarningPopup from "../../../components/ui/WarningPopup";
import { Header, Icon } from "@ketan_nimase/ui";
import { ProfileService } from "../../../services/settings/ProfileService";
import { ProfileModel } from "../../../model/settings/ProfileModel";
import { GlobalParams } from "../../../utils/GlobalParameters";
import { ApiPath } from "../../../utils/constants";

const PatientProfile: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [lastChangePasswordDate, setLastChangePasswordDate] = useState("");

    const [activeTab, setActiveTab] = useState<"photo" | "id">("photo");
    const [photoImage, setPhotoImage] = useState<string | null>(null);
    const [idImage, setIdImage] = useState<string | null>(null);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [profileModel, setProfileModel] = useState<ProfileModel | null>(null);
    const [isNameChanged, setIsNameChanged] = useState(false);

    // This is the image currently shown in the preview
    const currentImage = activeTab === "photo" ? photoImage : idImage;

    // Initialize ProfileService
    const profileService = new ProfileService();

    // Fetch profile data on component mount
    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        setIsLoading(true);
        try {
            await profileService.getProfileDetail();
            if (profileService.profileResponseModel) {
                const model = profileService.profileResponseModel;
                setProfileModel(model);
                setFirstName(model.firstName || "");
                setLastName(model.lastName || "");
                setUserName(model.userName || "");
                setLastChangePasswordDate(model.lastChangePasswordDate || "");
                setPhotoImage(model.userProfilePhotoBase64 || null);
                setIdImage(model.userIdPhotoBase64 || null);
                
                // Update global parameters
                GlobalParams.USER_PROFILE_PHOTO_BASE64 = model.userProfilePhotoBase64 ? new TextEncoder().encode(model.userProfilePhotoBase64) : new Uint8Array();
                GlobalParams.USER_ID_PHOTO_BASE64 = model.userIdPhotoBase64 || "";
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert("File size should not exceed 2MB");
                return;
            }

            // Check file format
            const validFormats = ["image/jpeg", "image/png", "image/jpg"];
            if (!validFormats.includes(file.type)) {
                alert("Only JPG, JPEG, and PNG formats are allowed");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target?.result as string;
                if (activeTab === "photo") {
                    setPhotoImage(imageData);
                    updateProfilePhoto(imageData);
                } else {
                    setIdImage(imageData);
                    updateIdPhoto(imageData);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const updateProfilePhoto = async (base64Image: string) => {
        if (!profileModel) return;
        
        const updatedModel = new ProfileModel({
            ...profileModel,
            userProfilePhotoBase64: base64Image,
            isProfilePhotoUploading: true,
            contentType: "image/jpeg"
        });
        
        setProfileModel(updatedModel);
        await updatePatientDetail(updatedModel);
    };

    const updateIdPhoto = async (base64Image: string) => {
        if (!profileModel) return;
        
        const updatedModel = new ProfileModel({
            ...profileModel,
            userIdPhotoBase64: base64Image,
            isIdPhotoUploading: true,
            contentType: "image/jpeg"
        });
        
        setProfileModel(updatedModel);
        await updatePatientDetail(updatedModel);
    };

    const handleDeleteConfirm = () => {
        deleteImage();          
        setShowConfirmPopup(false);
    };

    const deleteImage = async () => {
        if (!profileModel) return;
        
        let updatedModel: ProfileModel;
        
        if (activeTab === "photo") {
            setPhotoImage(null);
            updatedModel = new ProfileModel({
                ...profileModel,
                userProfilePhotoBase64: "",
                isProfilePhotoDeleting: true
            });
        } else {
            setIdImage(null);
            updatedModel = new ProfileModel({
                ...profileModel,
                userIdPhotoBase64: "",
                isIdPhotoDeleting: true
            });
        }
        
        setProfileModel(updatedModel);
        await updatePatientDetail(updatedModel);
    };

    const handleSaveName = async () => {
        if (!profileModel) return;
        
        // Check for special characters
        if (checkForSpecialCharacters(firstName) || checkForSpecialCharacters(lastName)) {
            alert("Special characters are not allowed in name fields");
            return;
        }
        
        const updatedModel = new ProfileModel({
            ...profileModel,
            firstName: firstName,
            lastName: lastName,
            isNameChanged: true
        });
        
        setProfileModel(updatedModel);
        await updatePatientDetail(updatedModel);
        setEditing(false);
    };

    const checkForSpecialCharacters = (text: string): boolean => {
        const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return specialChars.test(text);
    };

    const updatePatientDetail = async (model: ProfileModel) => {
        try {
            await profileService.saveProfileDetail(model);
            if (profileService.response_Status_Code_API_2 === 200) {
                // Update global parameters
                GlobalParams.USER_PROFILE_PHOTO_BASE64 = model.userProfilePhotoBase64 ? new TextEncoder().encode(model.userProfilePhotoBase64) : new Uint8Array();
                GlobalParams.USER_ID_PHOTO_BASE64 = model.userIdPhotoBase64 || "";
                
                // Refresh data
                await fetchProfileData();
            }
        } catch (error) {
            console.error("Error updating profile:", error);
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
                patientName={{ firstName: firstName || "", lastName: lastName || "" }}
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
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
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
                                {ApiPath.isIDDriverLicenceEnabled && (
                                    <div
                                        className={`px-3 py-1 fw-bold cursor-pointer border-2 border-white rounded-top-2 ${activeTab === "id"
                                            ? "bg-blue-500 text-white"
                                            : "bg-blue-500 text-white opacity-75"
                                            }`}
                                        onClick={() => setActiveTab("id")}
                                    >
                                        ID/Driver's License
                                    </div>
                                )}
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
                                            onClick={handleSaveName}
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
                                <small className="text-lg text-muted">Last changed on: {lastChangePasswordDate || "N/A"}</small>
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
            )}
        </div>
    );
};

export default PatientProfile;
