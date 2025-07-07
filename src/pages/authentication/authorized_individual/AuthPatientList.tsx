import React, { useState, useEffect } from "react";
import { Navbar } from "../../../components/ui/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import { Header, Icon, Loader } from "@ketan_nimase/ui";
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from "../../../services/authentication/UserService";
import { AuthorizedPatientResponse } from "../../../model/patient_portal/AuthorizedPatientResponse";

const AuthPatientList: React.FC = () => {
    const [authPatients, setAuthPatients] = useState<AuthorizedPatientResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [selectedAuthId, setSelectedAuthId] = useState<number | null>(null);
    
    const navigate = useNavigate();
    const authenticationService = new AuthenticationService();

    // Fetch authorized patients on component mount
    useEffect(() => {
        fetchAuthPatients();
    }, []);

    // Function to fetch authorized patients
    const fetchAuthPatients = async () => {
        setLoading(true);
        try {
            const response = await authenticationService.getAuthPatientList();
            if (response && Array.isArray(response)) {
                setAuthPatients(response);
            } else {
                setAuthPatients([]);
            }
        } catch (error) {
            console.error('Error fetching authorized patients:', error);
            setAuthPatients([]);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle delete confirmation
    const handleDeleteConfirm = (authId: number) => {
        setSelectedAuthId(authId);
        setShowDeleteConfirm(true);
    };

    // Function to delete authorized patient
    const deleteAuthIndividualUser = async () => {
        if (!selectedAuthId) return;
        
        setDeleteLoading(true);
        try {
            await authenticationService.deleteAuthPatient(selectedAuthId);
            // Refresh the list after successful deletion
            await fetchAuthPatients();
            // Close the confirmation dialog
            setShowDeleteConfirm(false);
            setSelectedAuthId(null);
        } catch (error) {
            console.error('Error deleting authorized patient:', error);
        } finally {
            setDeleteLoading(false);
        }
    };

    function handleAddAuthIndividual(event: React.MouseEvent<HTMLElement>): void {
        navigate('/add-authorized-individual');
    }

    return (
        <>
            <div className="min-h-screen w-screen flex flex-col items-center bg-white">
                <Navbar />
                <div className="w-full border-b text-center py-2 justify-center ">
                    <Header
                        className="py-2 text-lg md:text-xl font-normal justify-center text-center"
                        colorVariant="dark"
                        headerText="Authorized Individuals"
                        size="h2"
                    />
                    <p className="text-md px-5 text-center text-gray-500">
                        Authorized Individuals will have full access to your Patient Portal account.
                        They can view health record, send message to your provider, make payments or
                        schedule appointment on your behalf. Invite only whom you trust.</p>
                </div>

                <div className="w-full max-w-6xl px-6 mt-6">
                    {/* Labels */}
                    <div className="relative flex justify-between items-center gap-6 mb-2 px-2">
                        <div>
                            <Header
                                className="py-0 m-0 text-lg md:text-xl font-normal"
                                colorVariant="dark"
                                headerText="Access to My Portal"
                                size="h4"
                            />
                        </div>
                        <div className="border-2 border-blue-500 rounded-full p-0 sm:p-1 lg:p-0 flex items-center justify-center hover:bg-blue-100 cursor-pointer w-6 h-6">
                            <Icon
                                colorVariant="primary"
                                height="14px"
                                width="14px"
                                isCursorPointer
                                onClick={handleAddAuthIndividual}
                                name="plus"
                                stroke
                                fill
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-gray-300 rounded overflow-hidden">
                        {loading ? (
                            <div className="flex justify-center items-center py-10">
                                <Loader size="medium" />
                            </div>
                        ) : (
                            <table className="min-w-full text-sm border-collapse">
                                <thead className="bg-gray-300 text-gray-800">
                                    <tr>
                                        <th className="border px-4 py-2 text-left font-semibold">Name</th>
                                        <th className="border px-4 py-2 text-left font-semibold">Expires</th>
                                        <th className="border px-2 py-2 text-center font-semibold"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {authPatients.length > 0 ? (
                                        authPatients.map((patient) => (
                                            <tr key={patient.authId} className={`even:bg-white odd:bg-gray-100 ${patient.isExpired ? 'text-red-500' : ''}`}>
                                                <td className="border px-4 py-2">{patient.authName}</td>
                                                <td className="border px-4 py-2">{patient.expiryDate}</td>
                                                <td className="border px-2 py-2 flex justify-center items-center">
                                                    <Icon
                                                        colorVariant="dark"
                                                        height="25px"
                                                        isCursorPointer
                                                        name="delete"
                                                        stroke
                                                        width="25px"
                                                        onClick={() => handleDeleteConfirm(patient.authId || 0)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="text-center text-gray-500 py-4">
                                                No authorized individuals found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="mb-6">Are you sure you want to remove this authorized individual?</p>
                        <div className="flex justify-end space-x-3">
                            <button 
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={deleteLoading}
                            >
                                Cancel
                            </button>
                            <button 
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
                                onClick={deleteAuthIndividualUser}
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? (
                                    <>
                                        <Loader size="small" />
                                        Deleting...
                                    </>
                                ) : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AuthPatientList;