import React, { useState } from "react";
import { Navbar } from "../../components/ui/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ActivityLogs: React.FC = () => {
    const logs = [
        { datetime: "06/12/2025 09:11:03 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/12/2025 04:56:45 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/12/2025 04:11:32 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/11/2025 09:04:06 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/11/2025 05:52:02 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/11/2025 04:51:42 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/11/2025 04:27:55 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/10/2025 11:32:44 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/10/2025 11:16:01 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/10/2025 10:39:58 AM", user: "Ketan Nimase", action: "Login" },
    ];

    const ITEMS_PER_PAGE = 5;
        const [startDate, setStartDate] = useState<Date | null>(new Date("2025-06-06"));
        const [endDate, setEndDate] = useState<Date | null>(new Date("2025-06-12"));
        const [currentPage, setCurrentPage] = useState(1);
        const [actionFilter, setActionFilter] = useState("All");
    
        const filteredLogs = logs.filter((log) => {
            const logDate = new Date(log.datetime);
            const inDateRange = (!startDate || logDate >= startDate) && (!endDate || logDate <= endDate);
            const matchesAction = actionFilter === "All" || log.action === actionFilter;
            return inDateRange && matchesAction;
        });
    
        const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
        const paginatedLogs = filteredLogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    
        const handleDateChange = (dates: [Date | null, Date | null]) => {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
            setCurrentPage(1); // reset to first page
        };
    
        return (
            <div className="min-h-screen w-screen flex flex-col items-center bg-white">
                <Navbar patientName={{ firstName: "Jeffery", lastName: "Stevenson" }} />
                <div className="w-full border-b text-center py-3">
                    <h2 className="text-3xl font-semibold">Activity Logs</h2>
                </div>
    
                <div className="w-full max-w-6xl px-6 mt-6">
                    {/* Filters */}
                    <div className="flex justify-center gap-6 mb-4">
                        <div>
                            <label className="block text-md text-gray-700 mb-1">Date</label>
                            <DatePicker
                                selected={startDate}
                                onChange={handleDateChange}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                dateFormat="MM/dd/yyyy"
                                className="border rounded px-3 py-2 text-sm w-[250px]"
                                placeholderText="Select date range"
                            />
                        </div>
                        <div>
                            <label className="block  text-sm text-gray-700 mb-1">Action</label>
                            <select
                                className="border rounded px-3 py-2 mt-1 text-sm w-[400px]"
                                value={actionFilter}
                                onChange={(e) => {
                                    setActionFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option>All</option>
                                <option>Login</option>
                                <option>Logout</option>
                            </select>
                        </div>
                    </div>
    
                    {/* Table */}
                    <div className="border border-gray-300 rounded overflow-hidden">
                        <table className="min-w-full text-sm border-collapse">
                            <thead className="bg-gray-300 text-gray-800">
                                <tr>
                                    <th className="border px-4 py-2 text-left font-semibold">Date & Time</th>
                                    <th className="border px-4 py-2 text-left font-semibold">User</th>
                                    <th className="border px-4 py-2 text-left font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedLogs.length > 0 ? (
                                    paginatedLogs.map((log, idx) => (
                                        <tr key={idx} className="even:bg-white odd:bg-gray-100">
                                            <td className="border px-4 py-2">{log.datetime}</td>
                                            <td className="border px-4 py-2">{log.user}</td>
                                            <td className="border px-4 py-2">{log.action}</td>
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
                    <div className="flex justify-center items-center mt-4 gap-2 text-gray-600">
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
                    </div>
                </div>
            </div>
        );
    };
    
    export default ActivityLogs;