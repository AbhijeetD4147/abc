import React, { useState } from "react";
import { Navbar } from "../../../components/ui/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Header, Icon } from "@ketan_nimase/ui";

const AuthPatientList: React.FC = () => {
    const logs = [
        { name: "Auth 1", expiry: "06/12/2025" },
        { name: "Auth 2", expiry: "06/12/2025" },
        { name: "Auth 3", expiry: "06/12/2025" },
    ];



    return (
        <>

            <div className="min-h-screen w-screen flex flex-col items-center bg-white">
                <Navbar patientName={{ firstName: "Jeffery", lastName: "Stevenson" }} />
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
                                name="plus"
                                stroke
                                fill
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-gray-300 rounded overflow-hidden">
                        <table className="min-w-full text-sm border-collapse">
                            <thead className="bg-gray-300 text-gray-800">
                                <tr>
                                    <th className="border px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="border px-4 py-2 text-left font-semibold">Expires</th>
                                    <th className="border px-2 py-2 text-center font-semibold"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length > 0 ? (
                                    logs.map((log, idx) => (
                                        <tr key={idx} className="even:bg-white odd:bg-gray-100">
                                            <td className="border px-4 py-2">{log.name}</td>
                                            <td className="border px-4 py-2">{log.expiry}</td>
                                            <td className="border px-2 py-2 justify-center items-center"><Icon
                                                colorVariant="dark"
                                                height="25px"
                                                isCursorPointer
                                                name="delete"
                                                stroke
                                                width="25px"
                                            /></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center text-gray-500 py-4">
                                            No activity logs found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {/* <div className="flex justify-center items-center mt-4 gap-2 text-gray-600">
                        <button
                            className="text-xl"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        >
                            «
                        </button>
                        <button
                            className="text-xl"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            ‹
                        </button>
                        <span className="text-sm px-2 py-1 rounded bg-gray-200">{currentPage}</span>
                        <button
                            className="text-xl text-blue-600"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            ›
                        </button>
                        <button
                            className="text-xl text-blue-600"
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            »
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default AuthPatientList;