import React, { useState } from "react";
import { Navbar } from "../../../components/ui/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Checkbox, DropdownList, Header, Icon, Input, } from "@ketan_nimase/ui";

/**
 * UpdateDemographics – now with lightweight client‑side validation.
 *
 * Fields validated
 *  • First Name – required, letters/spaces/‐/ʼ only
 *  • Last  Name – required, letters/spaces/‐/ʼ only
 *  • DOB – required
 *  • Phone Number Type – required for every row
 *  • Primary Email – if provided, must be in RFC‑like pattern
 *  • All name fields – no special characters
 */
const nameRegex = /^[A-Za-z\s'-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ErrorMap = Record<string, string>;

type Phone = { type: string; number: string; primary: boolean };

type Address = {
    address1: string;
    address2: string;
    address3: string;
    primary: boolean;
    city: string;
    state: string;
    zip: string;
    country: string;
};

const UpdateDemographics: React.FC = () => {
    // ───────────────────────────────────────── state
    const [title, setTitle] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [suffix, setSuffix] = useState<string>("");
    const [preferredFirstName, setPreferredFirstName] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [phoneNumbers, setPhoneNumbers] = useState<Phone[]>([
        { type: "", number: "", primary: false },
    ]);
    const [primaryEmail, setPrimaryEmail] = useState<string>("");
    const [secondaryEmail, setSecondaryEmail] = useState<string>("");
    const [addresses, setAddresses] = useState<Address[]>([
        {
            address1: "",
            address2: "",
            address3: "",
            primary: false,
            city: "",
            state: "",
            zip: "",
            country: "",
        },
    ]);
    const [errors, setErrors] = useState<ErrorMap>({});

    // ────────────────────────── handlers
    const handleAddPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, { type: "", number: "", primary: false }]);
    };

    const handleRemovePhoneNumber = (index: number) => {
        const newPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
        setPhoneNumbers(newPhoneNumbers);
    };

    // const handlePhoneChange = (
    //     index: number,
    //     field: keyof Phone,
    //     value: string | boolean,
    // ) => {
    //     const newPhoneNumbers = phoneNumbers.map((phone, i) =>
    //         i === index ? { ...phone, [field]: value } : phone,
    //     );
    //     setPhoneNumbers(newPhoneNumbers);
    // };

    const handleAddAddress = () => {
        setAddresses([
            ...addresses,
            {
                address1: "",
                address2: "",
                address3: "",
                primary: false,
                city: "",
                state: "",
                zip: "",
                country: "",
            },
        ]);
    };

    const handleRemoveAddress = (index: number) => {
        const newAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(newAddresses);
    };

    // const handleAddressChange = (
    //     index: number,
    //     field: keyof Address,
    //     value: string | boolean,
    // ) => {
    //     const newAddresses = addresses.map((address, i) =>
    //         i === index ? { ...address, [field]: value } : address,
    //     );
    //     setAddresses(newAddresses);
    // };

    // Enhanced validation function
    const validate = (): ErrorMap => {
        const validationErrors: ErrorMap = {};

        // Title validation
        if (!title.trim()) validationErrors.title = "Title is required";

        // Required + pattern checks for first/last names
        if (!firstName.trim()) validationErrors.firstName = "First name is required";
        else if (!nameRegex.test(firstName.trim()))
            validationErrors.firstName = "Special characters not allowed";

        if (!lastName.trim()) validationErrors.lastName = "Last name is required";
        else if (!nameRegex.test(lastName.trim()))
            validationErrors.lastName = "Special characters not allowed";

        // Other name fields pattern validation
        [
            { value: middleName, key: "middleName" },
            { value: suffix, key: "suffix" },
            { value: preferredFirstName, key: "preferredFirstName" },
        ].forEach(({ value, key }) => {
            if (value && !nameRegex.test(value.trim()))
                validationErrors[key] = "Special characters not allowed";
        });

        // DOB validation
        if (!dob) validationErrors.dob = "Date of birth required";

        // Phone validation - both type and number required
        phoneNumbers.forEach((phone, index) => {
            if (!phone.type && !phone.number) {
                validationErrors[`phoneType_${index}`] = "Type and Number is required";
            } else {
                if (!phone.type) validationErrors[`phoneType_${index}`] = "Phone type required";
                if (!phone.number) validationErrors[`phoneNumber_${index}`] = "Phone number required";
                else if (phone.number && !/^[\d\s\-\(\)\+]+$/.test(phone.number)) {
                    validationErrors[`phoneNumber_${index}`] = "Invalid phone number format";
                }
            }
        });

        // Email validation
        if (primaryEmail && !emailRegex.test(primaryEmail))
            validationErrors.primaryEmail = "Enter valid email";

        if (secondaryEmail && !emailRegex.test(secondaryEmail))
            validationErrors.secondaryEmail = "Enter valid email";

        // Address validation
        addresses.forEach((address, index) => {
            if (!address.address1.trim()) {
                validationErrors[`address1_${index}`] = "Address is required";
            }
            if (!address.city.trim()) {
                validationErrors[`city_${index}`] = "City is required";
            }
            if (!address.state.trim()) {
                validationErrors[`state_${index}`] = "State is required";
            }
            if (!address.zip.trim()) {
                validationErrors[`zip_${index}`] = "ZIP code is required";
            } else if (!/^\d{5}(-\d{4})?$/.test(address.zip)) {
                validationErrors[`zip_${index}`] = "Invalid ZIP code format";
            }
        });

        return validationErrors;
    };

    // Enhanced input change handlers with real-time validation clearing
    const handleInputChange = (field: string, value: string, setter: (value: string) => void) => {
        setter(value);
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // const handleTitleSelection = (event: React.MouseEvent<HTMLLIElement>, val: string) => {
    //     setTitle(val);
    //     if (errors.title) {
    //         setErrors(prev => ({ ...prev, title: '' }));
    //     }
    // };

    // const handleSuffixSelection = (event: React.MouseEvent<HTMLLIElement>, val: string) => {
    //     setSuffix(val);
    //     if (errors.suffix) {
    //         setErrors(prev => ({ ...prev, suffix: '' }));
    //     }
    // };

    // Enhanced phone change handler
    const handlePhoneChange = (
        index: number,
        field: keyof Phone,
        value: string | boolean,
    ) => {
        const newPhoneNumbers = phoneNumbers.map((phone, i) =>
            i === index ? { ...phone, [field]: value } : phone,
        );
        setPhoneNumbers(newPhoneNumbers);

        // Clear related errors
        if (field === 'type' && errors[`phoneType_${index}`]) {
            setErrors(prev => ({ ...prev, [`phoneType_${index}`]: '' }));
        }
        if (field === 'number' && errors[`phoneNumber_${index}`]) {
            setErrors(prev => ({ ...prev, [`phoneNumber_${index}`]: '' }));
        }
    };

    // Enhanced address change handler
    const handleAddressChange = (
        index: number,
        field: keyof Address,
        value: string | boolean,
    ) => {
        const newAddresses = addresses.map((address, i) =>
            i === index ? { ...address, [field]: value } : address,
        );
        setAddresses(newAddresses);

        // Clear related errors
        if (typeof value === 'string' && errors[`${field}_${index}`]) {
            setErrors(prev => ({ ...prev, [`${field}_${index}`]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length === 0) {
            // ✅ form is valid – proceed with API call
            console.log({
                title,
                firstName,
                middleName,
                lastName,
                suffix,
                preferredFirstName,
                dob,
                phoneNumbers,
                primaryEmail,
                secondaryEmail,
                addresses,
            });
            alert("Form is valid – hook up API here 👌");
        }
    };
    const titleItems = [
        { label: "Mobile", val: "mobile" },
        { label: "Home", val: "home" },
        { label: "Work", val: "work" }
    ];
    const suffixItems = [
        { label: "Jr", val: "jr" },
        { label: "Sr", val: "sr" },
        { label: "Mr", val: "mr" },
        { label: "Mrs", val: "mrs" },
        { label: "Ms", val: "ms" },
        { label: "Dr", val: "dr" },
        { label: "Prof", val: "prof" }
    ];
    const handleTitleSelection = (event: React.MouseEvent<HTMLLIElement>, val: string) => {
        setTitle(val);
        if (errors.title) {
            setErrors(prev => ({ ...prev, title: '' }));
        }
    };

    const handleSuffixSelection = (event: React.MouseEvent<HTMLLIElement>, val: string) => {
        setSuffix(val);
        if (errors.suffix) {
            setErrors(prev => ({ ...prev, suffix: '' }));
        }
    };
    const handleChange = (field: string, value: string) => {
        { (e) => setTitle(e.target.value) }
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSelection = (event: React.MouseEvent<HTMLLIElement>, val: string) => {
        handleChange('relationship', val)
    };

    // helper to read error keys
    const err = (key: string) => errors[key];

    // ────────────────────────────────────────── UI
    return (
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

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                noValidate
                className="w-full max-w-4xl p-2"
            >
                {/* ─────────── Name Section */}
                <div className="mb-3 p-2">
                    <Header
                        className="py-1 text-lg md:text-xl font-normal"
                        colorVariant="dark"
                        headerText="Name"
                        size="h5"
                    />
                    <div className="grid grid-cols-1 gap-1">
                        <div className="grid grid-cols-5 gap-1">
                            <div className="mt-4">
                                <DropdownList
                                    borderDropdown
                                    isPlaceholder
                                    onClick={handleTitleSelection}
                                    showSelectedOption
                                    listItems={titleItems}
                                    placeholder="Select"
                                    // selectedValue={title}
                                    className={errors.title ? "border-red-500" : ""}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <Input
                                    inputType="text"
                                    id="firstName"
                                    placeholder="First Name"
                                    className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        }`}
                                    value={firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value, setFirstName)}
                                    name=""
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <Input
                                    inputType="text"
                                    id="middleName"
                                    placeholder="Middle"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    value={middleName}
                                    onChange={(e) => setMiddleName(e.target.value)} name={""} />
                                {err("middleName") && (
                                    <p className="text-red-500 text-xs mt-1">{err("middleName")}</p>
                                )}
                            </div>

                            <div >
                                <Input
                                    inputType="text"
                                    id="lastName"
                                    placeholder="Last Name"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} name={""} />
                                {err("lastName") && (
                                    <p className="text-red-500 text-xs mt-1">{err("lastName")}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-1 mt-1">
                            <div className="mt-4">
                                <DropdownList
                                    borderDropdown
                                    isPlaceholder
                                    onClick={handleSuffixSelection}
                                    showSelectedOption
                                    listItems={suffixItems}
                                    placeholder="Suffix"
                                    className="border-0"
                                // selectedValue={suffix}
                                />
                                {err("suffix") && (
                                    <p className="text-red-500 text-xs mt-1">{err("suffix")}</p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <Input
                                    inputType="text"
                                    id="preferredFirstName"
                                    placeholder="Preferred First Name"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    value={preferredFirstName}
                                    onChange={(e) => setPreferredFirstName(e.target.value)} name={""} />
                                {err("preferredFirstName") && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {err("preferredFirstName")}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Input
                                    inputType="date"
                                    id="dob"
                                    placeholder="DOB"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)} name={""} />
                                {err("dob") && (
                                    <p className="text-red-500 text-xs mt-1">{err("dob")}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phone & Email Section - Fixed table layout */}
                <div className="mb-3 p-2">
                    <div className="flex justify-between mb-1">
                        <Header
                            className="text-lg md:text-xl font-normal"
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
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Primary
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200 border">
                                {phoneNumbers.map((phone, index) => (
                                    <React.Fragment key={index}>
                                        <tr key={index}>
                                            <td className="px-6 py-0 whitespace-nowrap">
                                                <select
                                                    className={`block w-full mt-2 mb-0 border rounded-md shadow-sm p-2 ${err(`phoneType_${index}`) ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                    value={phone.type}
                                                    onChange={(e) =>
                                                        handlePhoneChange(index, "type", e.target.value)
                                                    }
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Mobile">Mobile</option>
                                                    <option value="Home">Home</option>
                                                    <option value="Work">Work</option>
                                                </select>
                                            </td>

                                            <td className="px-6 py-0 whitespace-nowrap">
                                                <Input
                                                    inputType="text"
                                                    placeholder="Enter Text"
                                                    className={`block w-full border rounded-md shadow-sm p-2 ${err(`phoneNumber_${index}`) ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                    value={phone.number}
                                                    onChange={(e) => handlePhoneChange(index, "number", e.target.value)} name={""} />
                                            </td>

                                            <td className="px-6 py-0 whitespace-nowrap text-center">
                                                <Checkbox
                                                    checked={phone.primary}
                                                    onChange={(e) =>
                                                        handlePhoneChange(index, "primary", e.target.checked)
                                                    }
                                                    labelText=""
                                                    showText
                                                />
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-center align-top">
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

                                        {(err(`phoneType_${index}`) || err(`phoneNumber_${index}`)) && (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-1 bg-red-50">
                                                    <p className="text-red-500 text-sm">
                                                        {err(`phoneType_${index}`) || err(`phoneNumber_${index}`)}
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Emails */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <Input
                                inputType="email"
                                label
                                name="Primary Email"
                                id="primaryEmail"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                value={primaryEmail}
                                onChange={(e) => setPrimaryEmail(e.target.value)}
                            />
                            {err("primaryEmail") && (
                                <p className="text-red-500 text-xs mt-1">{err("primaryEmail")}</p>
                            )}
                        </div>

                        <div>
                            <Input
                                inputType="email"
                                label
                                name="Secondary Email"
                                id="secondaryEmail"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                value={secondaryEmail}
                                onChange={(e) => setSecondaryEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* ─────────── Address Section – unchanged (no specific validation requested) */}
                <div className="mb-3 p-4">
                    <div className="flex justify-between mb-0">
                        <Header
                            className="text-lg md:text-xl font-normal"
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
                        <div key={index} className="mb-4 p-3 bg-white">
                            <div className="flex justify-between mb-1">
                                <div className="flex items-center">
                                    <label
                                        htmlFor={`address1-${index}`}
                                        className="block text-lg font-medium text-gray-700 mr-6"
                                    >
                                        Address {index + 1}
                                    </label>
                                    <Checkbox
                                        checked={address.primary}
                                        onChange={(e) =>
                                            handleAddressChange(index, "primary", e.target.checked)
                                        }
                                        labelText="Primary"
                                        showText
                                    />
                                </div>
                                <Icon
                                    name="delete"
                                    height="20px"
                                    width="20px"
                                    colorVariant="primary"
                                    stroke
                                    onClick={() => handleRemoveAddress(index)}
                                />
                            </div>

                            {/* Address lines */}
                            <div className="grid grid-cols-1 gap-1">
                                <div>
                                    <Input
                                        inputType="text"
                                        id={`address1-${index}`}
                                        placeholder="Address Line 1"
                                        className={`mt-0 block w-full border rounded-md shadow-sm p-2 ${errors[`address1_${index}`] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            }`}
                                        value={address.address1}
                                        onChange={(e) => handleAddressChange(index, "address1", e.target.value)}
                                        name=""
                                    />
                                    {errors[`address1_${index}`] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[`address1_${index}`]}</p>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        inputType="text"
                                        name="Address Line 2"
                                        id={`address2-${index}`}
                                        placeholder="Address Line 2"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        value={address.address2}
                                        onChange={(e) =>
                                            handleAddressChange(index, "address2", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <Input
                                            inputType="text"
                                            name="City"
                                            id={`city-${index}`}
                                            placeholder="City"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            value={address.city}
                                            onChange={(e) =>
                                                handleAddressChange(index, "city", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            inputType="text"
                                            name="State"
                                            id={`state-${index}`}
                                            placeholder="State"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            value={address.state}
                                            onChange={(e) =>
                                                handleAddressChange(index, "state", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            inputType="text"
                                            name="Zip"
                                            id={`zip-${index}`}
                                            placeholder="Zip"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            value={address.zip}
                                            onChange={(e) =>
                                                handleAddressChange(index, "zip", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            inputType="text"
                                            name="Country"
                                            id={`country-${index}`}
                                            placeholder="Country"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            value={address.country}
                                            onChange={(e) =>
                                                handleAddressChange(index, "country", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ─────────── Submit */}
                <div className="mt-0 mb-4 border-top pt-4 w-100" style={{ borderColor: "#6c757d" }}>
                    <div className="d-flex justify-content-center">
                        <Button
                            colorVariant="primary"
                            className="fs-5 px-5 py-1 border rounded"
                            type="submit"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default UpdateDemographics;
