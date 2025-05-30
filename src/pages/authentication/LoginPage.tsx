import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock } from "react-icons/fa";
import { getTheme } from "../../utils/ThemeSelection";

interface SignInProps {
  logoUrl: string;
  companyName: string;
}

const theme = await getTheme();

const LoginPage: React.FC<SignInProps> = ({ logoUrl, companyName }) => {
  const [loginFailed, setLoginFailed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // Simulate sign-in logic
    const isAuthenticated = data.username === "admin" && data.password === "1234";

    if (!isAuthenticated) {
      setLoginFailed(true);
    } else {
      setLoginFailed(false);
      // redirect or do something
    }
  };

  return (
    <div className="flex min-h-screen w-screen">
      {/* Left Panel */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10 relative">
        <img src={logoUrl} alt="Company Logo" className="w-32 h-32 mb-4" />
        <h1 className="text-3xl font-bold text-red-600">{companyName}</h1>
        <p className="text-gray-600 mt-2">City Eyecare</p>
        <div className="absolute bottom-5 left-5 text-xs text-gray-400">
          <div className="text-right mt-10 text-sm text-gray-500">
            ©2025, First Insight Corporation. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="w-1/2 flex flex-col justify-center items-center p-10"
        style={{ backgroundColor: theme.BGColor, color: theme.secondaryTextColor }}
      >
        <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center mb-10">
            <img
              src={loginFailed ? "/signin-failed-logo.png" : "/profile-logo-white.png"}
              alt="Profile"
              className="w-28 h-28 mx-auto mb-6"
            />

          </div>

          {/* Username Field */}
          {loginFailed && (
              <p className="text-md text-white font-regular mb-4">
                The username or password entered is invalid.
              </p>
            )}
          <div className="relative mb-2">
            
            <FaUser className="absolute left-4 top-4 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className={`pl-12 pr-4 py-3 shadow appearance-none border rounded w-full text-lg w-full border text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? "bg-red-100 border-red-500" : ""
                }`}
              style={{
                backgroundColor: theme.textfieldFilledColor,
                borderColor: errors.username
                  ? "crimson"
                  : theme.textfieldDefaultBorderColor,
              }}
            />
            {errors.username && (
              <p className="text-sm text-white bg-red-700 px-3 py-1 rounded mt-1">
                {errors.username.message as string}
              </p>
            )}
          </div>

          <a href="#" className="text-base underline mb-4" style={{ color: theme.secondaryTextColor }}>
            Forgot Username?
          </a>

          {/* Password Field */}
          <div className="relative mb-2">
            <FaLock className="absolute left-4 top-4 text-gray-500 text-lg" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className={`pl-12 pr-4 py-3 shadow appearance-none border rounded w-full text-lg w-full border text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? "bg-red-100 border-red-500" : ""
                }`}
              style={{
                backgroundColor: theme.textfieldFilledColor,
                borderColor: errors.password
                  ? "crimson"
                  : theme.textfieldDefaultBorderColor,
              }}
            />
            {errors.password && (
              <p className="text-sm text-white bg-red-700 px-3 py-1 rounded mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <a href="#" className="text-base underline mb-6" style={{ color: theme.secondaryTextColor }}>
            Forgot Password?
          </a>

          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-medium border rounded-full hover:bg-blue-200 hover:text-white transition duration-200"
            style={{
              backgroundColor: theme.BGColor,
              borderColor: theme.secondaryTextColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.ButtonHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.BGColor;
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
