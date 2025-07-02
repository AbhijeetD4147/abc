import React, { useState } from "react";
import { Navbar } from "../../components/ui/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "@ketan_nimase/ui";

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
        { datetime: "06/11/2025 09:04:06 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/11/2025 05:52:02 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/11/2025 04:51:42 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/11/2025 04:27:55 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/10/2025 11:32:44 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/10/2025 11:16:01 AM", user: "Ketan Nimase", action: "Login" },
        { datetime: "06/10/2025 10:39:58 AM", user: "Ketan Nimase", action: "Login" },
    ];

    const ITEMS_PER_PAGE = 10;
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
        <>
            <style>{`
                    .react-datepicker-popper {
                        z-index: 9999 !important;
                    }
                    .react-datepicker {
                        background-color: white !important;
                        border: 1px solid #e5e7eb !important;
                        border-radius: 8px !important;
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
                    }
                    .react-datepicker__header {
                        background-color: #f9fafb !important;
                        border-bottom: 1px solid #e5e7eb !important;
                    }
                    .react-datepicker__current-month {
                        color: #374151 !important;
                        font-weight: 600 !important;
                    }
                    .react-datepicker__day-name {
                        color: #6b7280 !important;
                    }
                    .react-datepicker__day {
                        color: #374151 !important;
                    }
                    .react-datepicker__day:hover {
                        background-color: #f3f4f6 !important;
                    }
                    .react-datepicker__day--selected {
                        background-color: #3b82f6 !important;
                        color: white !important;
                    }
                    .react-datepicker__day--in-range {
                        background-color: #dbeafe !important;
                        color: #1d4ed8 !important;
                    }
                    .react-datepicker__day--range-start,
                    .react-datepicker__day--range-end {
                        background-color: #3b82f6 !important;
                        color: white !important;
                    }
                `}</style>
            <div className="min-vh-100 vw-100 d-flex flex-column align-items-center bg-white">
                <Navbar />
                <div className="w-100 border-bottom text-center py-3">
                    <h2 className="display-6 fw-semibold">Activity Logs</h2>
                </div>

                <div className="w-100 px-4 mt-4" style={{ maxWidth: '72rem' }}>
                    {/* Filters */}
                    <div className="d-flex justify-content-center gap-4 mb-4">
                        <div>
                            <label className="form-label text-muted mb-1">Date</label>
                            <DatePicker
                                selected={startDate}
                                onChange={handleDateChange}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                dateFormat="MM/dd/yyyy"
                                className="form-control"
                                placeholderText="Select date range"
                                withPortal
                                portalId="date-picker-portal"
                                popperClassName="react-datepicker-popper"
                                calendarClassName="react-datepicker-calendar"
                                showPopperArrow={false}
                            />
                        </div>
                        <div>
                            <label className="form-label text-muted mb-1">Action</label>
                            <select
                                className="form-select"
                                style={{ width: '400px', fontSize: '0.875rem' }}
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
                    <div className="border border-secondary rounded overflow-hidden">
                        <table className="table table-bordered table-striped mb-0" style={{ fontSize: '0.875rem' }}>
                            <thead className="table-secondary">
                                <tr>
                                    <th className="fw-semibold">Date & Time</th>
                                    <th className="fw-semibold">User</th>
                                    <th className="fw-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedLogs.length > 0 ? (
                                    paginatedLogs.map((log, idx) => (
                                        <tr key={idx}>
                                            <td>{log.datetime}</td>
                                            <td>{log.user}</td>
                                            <td>{log.action}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center text-muted py-4">
                                            No activity logs found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center align-items-center mt-4 gap-2 text-muted">
                        <Button
                            className="btn btn-light btn-lg"
                            onClick={() => setCurrentPage(1)}
                            isDisabled={currentPage === 1}
                        >
                            «
                        </Button>
                        <Button
                            className="btn btn-light btn-lg"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            isDisabled={currentPage === 1}
                        >
                            ‹
                        </Button>
                        <span className="badge bg-light text-dark px-3 py-2">{currentPage}</span>
                        <Button
                            className="btn btn-light btn-lg"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            isDisabled={currentPage === totalPages}
                        >
                            ›
                        </Button>
                        <Button
                            className="btn btn-light btn-lg"
                            onClick={() => setCurrentPage(totalPages)}
                            isDisabled={currentPage === totalPages}
                        >
                            »
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActivityLogs;