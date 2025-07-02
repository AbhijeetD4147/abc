import React, { useState, useEffect } from "react";
import { Navbar } from "../../../components/ui/Navbar";
import { FaCamera, FaFolderOpen, FaTrash, FaUserPlus } from "react-icons/fa";
import WarningPopup from "../../../components/ui/WarningPopup";
import { Header, Icon, Loader } from "@ketan_nimase/ui";
import { ProfileService } from "../../../services/settings/ProfileService";
import { ProfileModel } from "../../../model/settings/ProfileModel";
import { GlobalParams } from "../../../utils/GlobalParameters";
import { ApiPath } from "../../../utils/constants";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="vh-100 vw-100">
            {showConfirmPopup && (
                <WarningPopup
                    message={`Are you sure you want to delete this image?`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setShowConfirmPopup(false)}
                />
            )}
            {/* Navbar */}
            <Navbar />

            {/* Header */}
            <div className="d-flex justify-content-center text-center py-2 border-bottom m-0">
                <Header
                    className="fs-5 fs-md-4 fw-medium text-center"
                    colorVariant="dark"
                    headerText="Profile"
                    size="h2"
                />
                {/* Info Icon */}
                <div className="position-relative d-inline-block ms-2">
                    <div className="border border-2 border-primary rounded-circle mt-1 ms-4 p-1 d-flex align-items-center justify-content-center" style={{ cursor: 'pointer' }}>
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
                <div className="flex justify-center items-center h-screen w-screen">
                    <Loader loaderType="spin" />
                </div>
            ) : (
                <div className="min-vh-100 min-vw-100">
                    <div className="d-flex flex-column flex-lg-row min-vh-100 min-vw-100">
                        {/* Left Section */}
                        <div className="w-100 w-lg-100 d-flex flex-column justify-content-center align-items-center bg-primary p-4 position-relative">
                            {/* Tab Headers */}
                            <div className="d-flex mb-0">
                                <div
                                    className={`px-3 py-1 fw-bold border border-2 border-white rounded-top-2 ${activeTab === "photo"
                                            ? "bg-primary text-white"
                                            : "bg-primary text-white opacity-75"
                                        }`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setActiveTab("photo")}
                                >
                                    Photo
                                </div>
                                {ApiPath.isIDDriverLicenceEnabled && (
                                    <div
                                        className={`px-3 py-1 fw-bold border border-2 border-white rounded-top-2 ${activeTab === "id"
                                                ? "bg-primary text-white"
                                                : "bg-primary text-white opacity-75"
                                            }`}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setActiveTab("id")}
                                    >
                                        ID/Driver's License
                                    </div>
                                )}
                            </div>

                            {/* Profile Image Box */}
                            <div
                                className="d-flex justify-content-center align-items-center bg-primary p-2 border border-2 border-white border-top-0"
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
                            <div className="d-flex gap-3 mb-1">
                                {/* Upload from Files */}
                                <label
                                    className="d-flex justify-content-center align-items-center"
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
                                    className="d-flex justify-content-center align-items-center"
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
                                    className="d-flex justify-content-center align-items-center bg-transparent p-0 border-0"
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
                                className="bg-primary text-white p-1 rounded position-relative"
                                style={{ width: "70%" }}
                            >
                                {/* Header Row */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <label className="form-label text-white mb-0">Name</label>
                                    {editing ? (
                                        <button
                                            className="btn btn-link p-0 text-white text-decoration-none"
                                            onClick={handleSaveName}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-link p-0 text-white text-decoration-none bg-transparent"
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
                                            className="form-control mb-2 text-dark py-2 px-3 fs-5"
                                            style={{ backgroundColor: '#bfdbfe' }}
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control text-dark py-2 px-3 fs-5"
                                            style={{ backgroundColor: '#bfdbfe' }}
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <div className="mb-3">
                                        <p className="text-dark py-2 px-3 fs-5 mb-2 rounded" style={{ backgroundColor: '#bfdbfe' }}>{firstName}</p>
                                        <p className="text-dark py-2 px-3 fs-5 rounded" style={{ backgroundColor: '#bfdbfe' }}>{lastName}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="d-flex flex-column w-100 w-lg-50 bg-white ps-3 ps-lg-5 pt-3 pt-lg-5 align-items-center mt-3 mt-lg-5 ms-0 ms-lg-4">
                            {/* Change Username */}
                            <div className="p-2 w-100" style={{ maxWidth: '600px' }}>
                                <a href="/update-username" className="h2 d-block text-black text-decoration-none mb-2">
                                    Change Username
                                </a>
                                <small className="fs-6 text-muted">
                                    Change your email address for login
                                </small>
                            </div>
                            <hr className="mt-0 mb-0 w-100" style={{ maxWidth: '600px' }} />

                            {/* Change Password */}
                            <div className="p-2 w-100" style={{ maxWidth: '600px' }}>
                                <a href="/update-password" className="h2 d-block text-black text-decoration-none mb-2">
                                    Change Password
                                </a>
                                <small className="fs-6 text-muted">Last changed on: {lastChangePasswordDate || "N/A"}</small>
                            </div>
                            <hr className="mt-0 mb-0 w-100" style={{ maxWidth: '600px' }} />

                            {/* Make Account Inactive */}
                            <div className="pt-3 ps-2 pb-3 w-100" style={{ maxWidth: '600px' }}>
                                <a href="/opt-out" className="h2 d-block text-black text-decoration-none mb-2 text-danger">
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
