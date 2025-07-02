import React, { useState } from 'react';
import { Icon, Button, Dropdown, DropdownList, Header } from '@ketan_nimase/ui';
import { useNavigate } from 'react-router-dom';

interface AuthUserLoginProps { }

const AuthUserLogin: React.FC<AuthUserLoginProps> = () => {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedValue, setSelectedValue] = useState('');
    const [lastChangePasswordDate, setLastChangePasswordDate] = useState("");

    const users = [
        { label: 'Jeffery Stevenson', value: 'jeffery' },
        { label: 'Jessica Stevens', value: 'jessica' },
        { label: 'Robert Johnson', value: 'robert' },

        // Add more users as needed
    ];
    const handleIndexChange = (index: number) => {
        setSelectedIndex(index);
        console.log('Selected item:', users[index]);
    };

    const handleSingleSelection = (event: React.MouseEvent<HTMLLIElement>, val: string) => {
        setSelectedValue(val);
        console.log('Selected:', val);
    };

    function handleProceed(): void {
        if (selectedValue) {
            navigate('/dashboard');
        }
    }

    return (
        <div className="flex h-screen w-full">
            {/* Left Section */}
            <div className="w-1/2 p-8 flex flex-col relative">
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
                        AS
                    </div>
                    <div className="ml-4">
                        <Header
                            className="fs-5 fs-md-4 fw-medium text-center"
                            colorVariant="dark"
                            headerText="Welcome"
                            size="h4"
                        />
                        <Header
                            className="fs-5 fs-md-4 fw-medium text-center"
                            colorVariant="dark"
                            headerText="Anna Stevenson"
                            size="h3"
                        />
                    </div>
                </div>
                <div className="absolute top-12 right-12">
                    <div className="transform rotate-90">
                        <Icon
                            name="upload_data"
                            height="30px"
                            width="30px"
                            stroke
                            colorVariant="primary"
                            opacity="0.9"
                        />
                    </div>
                </div>

                <div className="d-flex flex-column w-100 w-lg-50 bg-white ps-3 ps-lg-5 pt-3 pt-lg-5 align-items-center mt-3 mt-lg-5 ms-0 ms-lg-4">
                    {/* Change Username */}
                    <div className="p-2 w-100" style={{ maxWidth: '600px' }}>
                        <a href="/signup" className="h2 d-block text-black text-decoration-none mb-2">
                            Sign Up as a patient
                        </a>
                        <small className="fs-6 text-muted">
                            Plan your first visit to our office
                        </small>
                    </div>
                    <hr className="mt-0 mb-0 w-100" style={{ maxWidth: '600px' }} />

                    {/* Change Password */}
                    <div className="p-2 w-100" style={{ maxWidth: '600px' }}>
                        <a href="/update-password" className="h2 d-block text-black text-decoration-none mb-2">
                            Change Username
                        </a>
                    </div>
                    <hr className="mt-0 mb-0 w-100" style={{ maxWidth: '600px' }} />

                    {/* Make Account Inactive */}
                    <div className="pt-5 ps-2 pb-3 w-100" style={{ maxWidth: '600px' }}>
                        <a href="/opt-out" className="h2 d-block text-black text-decoration-none mb-2 text-danger">
                            Change Password
                        </a>
                        <small className="fs-6 text-muted">Last Changed: {lastChangePasswordDate || "N/A"}</small>
                    </div>
                </div>

                {/* <div className="space-y-3 items-center m-10">
                    <div className="p-4 border-b-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <Header
                            className="fs-5 fs-md-4 fw-medium text-center"
                            colorVariant="dark"
                            headerText="Sign Up as a patient"
                            size="h4"
                        />
                        <p className="text-gray-600 text-sm">Plan your first visit to our office</p>
                    </div>

                    <div className="p-4 border-b-2 mt-0 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <Header
                            className="fs-5 fs-md-4 fw-medium text-center"
                            colorVariant="dark"
                            headerText="Change Username"
                            size="h4"
                        />
                    </div>

                    <div className="p-4 mt-0 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <Header
                            className="fs-5 fs-md-4 fw-medium text-center"
                            colorVariant="dark"
                            headerText="Change Password"
                            size="h4"
                        />
                        <p className="text-gray-600 text-sm">Last Changed: 01/20/2024</p>
                    </div>
                </div> */}
            </div>

            {/* Right Section */}
            <div className="flex flex-col w-1/2 bg-blue-500 p-8 items-center justify-center text-white">
                <Header
                    className="fs-5 fs-md-4 mb-8 fw-medium text-center"
                    colorVariant="light"
                    headerText="View/ Manage Accounts"
                    size="h2"
                />
                <p className="mb-8 px-12 text-xl">
                    Manage health account shared with you. You can set appointments, send messages,
                    pay bills or review health summary and other aspects of healthcare.
                </p>

                <div className="space-y-4 w-2/3">
                    <DropdownList
                        icon='envelope'
                        listItems={users.map(user => ({
                            label: user.label,
                            val: user.value,
                            id: user.value,
                            path: ''
                        }))}
                        selectedIndex={handleIndexChange}
                        onClick={handleSingleSelection}
                        placeholder={selectedValue ? selectedValue : "Select User"}
                        className="bg-white text-black py-2 px-2 rounded-lg"
                    />
                    <Button
                        className="btn flex-fill px-2 px-md-3 py-2 py-md-2 border rounded w-full"
                        onClick={handleProceed}
                        isDisabled={!selectedValue}
                    >
                        Proceed
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AuthUserLogin;