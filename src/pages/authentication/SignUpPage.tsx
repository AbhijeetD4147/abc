import React from 'react';
import { getTheme } from '../../utils/ThemeSelection';
import DatePicker from '../../components/ui/DatePicker';
import dayjs from 'dayjs';


const theme = await getTheme();
const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-1 min-h-screen w-screen bg-white">
      <h1 className="text-4xl font-regular mb-1" style={{ color: theme.primaryTextColor }}>Create New Account</h1>
      <form className="bg-white p-8 w-full max-w-lg">
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }} htmlFor="firstName">
            First
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }} id="firstName" type="text" placeholder="Legal First Name" />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }} htmlFor="lastName">
            Last
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }} id="lastName" type="text" placeholder="Last Name" />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }} htmlFor="mobile">
            Mobile
          </label>
          <div className="flex items-center">
            <input
              id="countryCode"
              type="text"
              value="+1"
              readOnly
              className="shadow appearance-none border rounded w-1/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{
                backgroundColor: theme.textfieldFilledColor,
                borderColor: theme.textfieldDefaultBorderColor,
              }}
            />

            <input className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2" style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }} id="mobile" type="text" placeholder="(000) 000-0000" />
            <div className="relative group ml-2">
              <div className="w-6 h-6 flex items-center justify-center border-2 border-blue-500 text-blue-500 rounded-full text-sm font-bold cursor-pointer">
                i
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs bg-white border border-black text-grey-800 text-sm rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Enter a mobile phone number that is readily available to you to receive a security code for 2-factor verification. Important messages regarding your account will be sent on this number
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }} htmlFor="email">
            Email
          </label>
          <div className="flex items-center">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{ backgroundColor: theme.textfieldFilledColor, borderColor: theme.textfieldDefaultBorderColor }} id="email" type="email" placeholder="Email" />
            <div className="relative group ml-2">
              <div className="w-6 h-6 flex items-center justify-center border-2 border-blue-500 text-blue-500 rounded-full text-sm font-bold cursor-pointer">
                i
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs bg-white border border-black text-grey-800 text-sm rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Enter an email address that you use frequently for communication and check ofthen for messages. Important communication regarding your account will be sent on this email address
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-2" style={{ color: theme.textfieldLabelColor }} htmlFor="dob">
            DOB
          </label>
          <DatePicker

            restrictDateSelection="after"
            onChange={(date: Date) => {
              const formatted = dayjs(date).format("MM/DD/YYYY");
            }}
          // className={ 'border-red-500 bg-red-100' : ''}
          />
        </div>
        <p className="text-xs mb-2" style={{ color: theme.textfieldLabelColor }}>We will send you a security code via your email or text.</p>
      </form>
      <div className="mt-7 mb-7 border-t border-gray-400 pt-6 w-5/6">
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-xl text-white font-regular py-2 px-14 rounded focus:outline-none focus:shadow-outline"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;