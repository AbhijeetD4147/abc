
const PtHomePage: React.FC = () => {

    return (
        <div className="flex h-screen w-screen">
            {/* Left section */}
            <div className="w-1/2 p-10 flex flex-col justify-center items-center bg-white">
                <img
                    src="/logo.png"
                    alt="Rose City Eyecare"
                    className="w-40 mb-4"
                />
                <h1 className="text-2xl font-semibold text-center">Rose City Eyecare</h1>
                <h2 className="text-xl font-medium text-center mb-6">Patient Portal</h2>

                <p className="text-gray-600 text-center max-w-md mb-6">
                    Online secure access to your medical information anytime, anywhere.
                    A true time saver and all your data is one click away.
                </p>

                <ul className="text-gray-700 text-sm space-y-2 mb-10">
                    {[
                        "Manage Appointments",
                        "Pre Checkin and Sign policy documents",
                        "View Medications and Prescriptions",
                        "View Education Materials",
                        "Manage Health Records",
                        "Send Secure Messages",
                        "Securely Pay Bills",
                    ].map((item, i) => (
                        <li key={i} className="flex items-center space-x-2">
                            <span>✔️</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

                <p className="text-gray-600 text-sm mt-auto">Simplifying your healthcare.</p>

                <div className="mt-10 text-xs text-gray-500">
                    ©2025, First Insight Corporation. All rights reserved.
                </div>
            </div>

            {/* Right section */}
            <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center">
                <div className="flex space-x-7 mb-6 w-full max-w-xl">
                    <button className="flex-1 px-6 py-2 bg-blue-600 border border-white rounded-full hover:bg-white hover:text-blue-600 transition">
                        Create New Account
                    </button>
                    <button className="flex-1 px-6 py-2 bg-blue-600 border border-white rounded-full hover:bg-white hover:text-blue-600 transition">
                        Sign In
                    </button>
                </div>
                <div className="text-center mt-6">
                    <p className="text-lg font-medium">Questions?</p>
                    <p>Call our office at <strong>null</strong></p>
                </div>
            </div>
        </div>
    );
};
export default PtHomePage;