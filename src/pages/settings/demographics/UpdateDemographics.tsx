import React, { useState } from "react";
import { Navbar } from "../../../components/ui/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Checkbox, Dropdown, Header, Icon, Input } from "@ketan_nimase/ui";

const UpdateDemographics: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [suffix, setSuffix] = useState<string>('');
    const [preferredFirstName, setPreferredFirstName] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [phoneNumbers, setPhoneNumbers] = useState<Array<{ type: string; number: string; primary: boolean }>>([{ type: '', number: '', primary: false }]);
    const [primaryEmail, setPrimaryEmail] = useState<string>('');
    const [secondaryEmail, setSecondaryEmail] = useState<string>('');
    const [addresses, setAddresses] = useState<Array<{ address1: string; address2: string; address3: string; primary: boolean; city: string; state: string; zip: string; country: string }>>([{ address1: '', address2: '', address3: '', primary: false, city: '', state: '', zip: '', country: '' }]);

    const handleAddPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, { type: '', number: '', primary: false }]);
    };

    const handleRemovePhoneNumber = (index: number) => {
        const newPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
        setPhoneNumbers(newPhoneNumbers);
    };

    const handlePhoneChange = (index: number, field: string, value: string | boolean) => {
        const newPhoneNumbers = phoneNumbers.map((phone, i) => {
            if (i === index) {
                return { ...phone, [field]: value };
            }
            return phone;
        });
        setPhoneNumbers(newPhoneNumbers);
    };

    const handleAddAddress = () => {
        setAddresses([...addresses, { address1: '', address2: '', address3: '', primary: false, city: '', state: '', zip: '', country: '' }]);
    };

    const handleRemoveAddress = (index: number) => {
        const newAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(newAddresses);
    };

    const handleAddressChange = (index: number, field: string, value: string | boolean) => {
        const newAddresses = addresses.map((address, i) => {
            if (i === index) {
                return { ...address, [field]: value };
            }
            return address;
        });
        setAddresses(newAddresses);
    };


    return (
        <>
            <div className="min-h-screen w-screen flex flex-col items-center bg-white">
                <Navbar />
                <div className="w-full border-b text-center py-2 justify-center ">
                    <Header
                        className="py-1 text-lg md:text-xl font-normal justify-center text-center"
                        colorVariant="dark"
                        headerText="Update Demographics"
                        size="h3"
                    />
                </div>
                <div className="w-full max-w-4xl p-4">
                    {/* Name Section */}
                    <div className="mb-6 p-4 border rounded-lg shadow-sm">
                        <Header
                            className="py-1 text-lg md:text-xl font-normal"
                            colorVariant="dark"
                            headerText="Name"
                            size="h5"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <Input inputType="text" label name={"Title"} id="title" className="mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <Input inputType="text" label name={"First Name"} id="firstName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div>
                                <Input inputType="text" label name={"Middle"} id="middleName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                            </div>
                            <div>
                                <Input inputType="text" label name={"Last Name"} id="lastName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div>
                                <Input inputType="text" label name={"Suffix"} id="suffix" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={suffix} onChange={(e) => setSuffix(e.target.value)} />
                            </div>
                            <div>
                                <Input inputType="text" label name={"Preferred First Name"} id="preferredFirstName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={preferredFirstName} onChange={(e) => setPreferredFirstName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">DOB</label>
                                <input type="date" id="dob" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={dob} onChange={(e) => setDob(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Phone & Email Section */}
                    <div className="mb-6 p-4 border rounded-lg shadow-sm">


                        <div className="flex justify-between mb-2">
                            <Header
                                className=" text-lg md:text-xl font-normal"
                                colorVariant="dark"
                                headerText="Phone & Email"
                                size="h5"
                            />
                            <Icon
                                name="plus_circle"
                                height="30px"
                                width="30px"
                                colorVariant="primary"
                                stroke
                                onClick={handleAddPhoneNumber}
                            />
                        </div>
                        <div className="overflow-x-auto mb-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 border border">
                                    {phoneNumbers.map((phone, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-0 whitespace-nowrap">
                                                <select
                                                    className="mt-3 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                    value={phone.type}
                                                    onChange={(e) => handlePhoneChange(index, 'type', e.target.value)}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Mobile">Mobile</option>
                                                    <option value="Home">Home</option>
                                                    <option value="Work">Work</option>
                                                </select>
                                                {/* <Dropdown
                                                    colorVariant="info"
                                                    // style="outline"
                                                    iconStroke
                                                    id="1"
                                                    label="Select"
                                                    listItems={[
                                                        {
                                                            id: '1',
                                                            label: 'Mobile',
                                                            path: ''
                                                        },
                                                        {
                                                            id: '2',
                                                            label: 'Home',
                                                            path: ''
                                                        },
                                                        {
                                                            id: '3',
                                                            label: 'Work',
                                                            path: ''
                                                        }
                                                    ]}
                                                    showChevron
                                                    size="medium"
                                                    state="default" darkDropdown={false}/> */}
                                            </td>
                                            <td className="px-6 py-0 m-0 whitespace-nowrap">
                                                <Input inputType="text" name={""} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={phone.number} onChange={(e) => handlePhoneChange(index, 'number', e.target.value)} />
                                            </td>
                                            <td className="px-6 py-0 m-0  whitespace-nowrap text-center">
                                                <Checkbox
                                                    checked
                                                    labelText=""
                                                    showText
                                                />
                                            </td>
                                            <td className="px-6 py-0 m-0 whitespace-nowrap text-center">
                                                <Icon
                                                    name="delete"
                                                    height="20px"
                                                    width="20px"
                                                    colorVariant="primary"
                                                    stroke
                                                    onClick={() => handleRemovePhoneNumber(index)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Input inputType="email" label name={'Primary Email'} id="primaryEmail" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={primaryEmail} onChange={(e) => setPrimaryEmail(e.target.value)} />
                            </div>
                            <div>
                                <Input inputType="email" label name={'Secondary Email'} id="secondaryEmail" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={secondaryEmail} onChange={(e) => setSecondaryEmail(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="mb-6 p-4 border rounded-lg shadow-sm">
                        <div className="flex justify-between mb-2">
                            <Header
                                className=" text-lg md:text-xl font-normal"
                                colorVariant="dark"
                                headerText="Address"
                                size="h5"
                            />
                            <Icon
                                name="plus_circle"
                                height="30px"
                                width="30px"
                                colorVariant="primary"
                                stroke
                                onClick={handleAddAddress}
                            />
                        </div>
                        {addresses.map((address, index) => (
                            <div key={index} className="mb-4 p-3 border rounded-md bg-gray-50">
                                <div className="flex justify-end mb-2">
                                    <Icon
                                        name="delete"
                                        height="20px"
                                        width="20px"
                                        colorVariant="primary"
                                        stroke
                                        onClick={() => handleRemoveAddress(index)}
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-1">
                                    <div className="flex flex">
                                        <label htmlFor={`address1-${index}`} className="block text-sm font-medium text-gray-700 mr-4">Address {index +1}</label>
                                        <Checkbox
                                            checked
                                            labelText="Primary"
                                            showText
                                        />
                                    </div>
                                    <div>
                                        <Input inputType="text" name={""} id={`address1-${index}`} placeholder="Address Line 1" className="mt-0 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={address.address1} onChange={(e) => handleAddressChange(index, 'address1', e.target.value)} />
                                    </div>
                                    <div>
                                        <Input inputType="text" label name={"Address Line 2"} id={`address2-${index}`} placeholder="Address Line 2" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={address.address2} onChange={(e) => handleAddressChange(index, 'address2', e.target.value)} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div>
                                            <Input inputType="text" label name={"City"} id={`city-${index}`} placeholder="City" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={address.city} onChange={(e) => handleAddressChange(index, 'city', e.target.value)} />
                                        </div>
                                        <div>
                                            <Input inputType="text" label name={"State"} id={`state-${index}`} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={address.state} onChange={(e) => handleAddressChange(index, 'state', e.target.value)} />
                                        </div>
                                        <div>
                                            <Input inputType="text" label name={"Zip"} id={`zip-${index}`} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={address.zip} onChange={(e) => handleAddressChange(index, 'zip', e.target.value)} />
                                        </div>
                                        <div>
                                            <Input inputType="text" label name={"Country"} id={`country-${index}`} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={address.country} onChange={(e) => handleAddressChange(index, 'country', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button colorVariant="primary" className="px-6 py-2">Save Changes</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateDemographics;