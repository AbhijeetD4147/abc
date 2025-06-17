import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock } from "react-icons/fa";
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import Footer from "../../components/ui/Footer";
import { Icon } from "@ketan_nimase/ui";

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
  console.log(GlobalParams.LOGO);
  console.log(GlobalParams.LOGO);
  return (


    <div className="flex min-h-screen w-screen">
      {/* Left Panel */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10 relative">
        <img
          src={
            GlobalParams.LOGO
              ? `data:image/jpeg;base64,${GlobalParams.LOGO}`
              : ''
          }
          alt="Company Logo"
          className="w-90 h-30 inline-block align-middle"
        />
        <div className="absolute bottom-5 left-5 text-xs text-gray-400">
          <Footer />
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
          <div className="mb-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Icon
                  name="user"
                  height="20px"
                  width="20px"
                  colorVariant="dark"
                  stroke
                />
              </div>
              <input
                type="text"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
                className={`w-full pl-10 pr-4 py-3 rounded-lg text-xl text-gray-900 placeholder-gray-600 border-2 ${
                  errors.username ? "bg-red-100 border-red-500" : ""
                }`}
                style={{
                  backgroundColor: theme.textfieldFilledColor,
                  borderColor: errors.username
                    ? "crimson"
                    : theme.textfieldDefaultBorderColor,
                }}
              />
            </div>
            {errors.username && (
              <div className="bg-red-600 text-white px-4 py-2 rounded-b-lg -mt-1 text-sm font-medium">
                {errors.username.message as string}
              </div>
            )}
          </div>

          <a href="/forgot-username" className="text-base underline mb-4" style={{ color: theme.secondaryTextColor }}>
            Forgot Username?
          </a>

          {/* Password Field */}
          <div className="mb-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Icon
                  name="lock"
                  height="20px"
                  width="20px"
                  colorVariant="dark"
                  stroke
                />
              </div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className={`w-full pl-10 pr-4 py-3 rounded-lg text-xl text-gray-900 placeholder-gray-600 border-2 ${
                  errors.password ? "bg-red-100 border-red-500" : ""
                }`}
                style={{
                  backgroundColor: theme.textfieldFilledColor,
                  borderColor: errors.password
                    ? "crimson"
                    : theme.textfieldDefaultBorderColor,
                }}
              />
            </div>
            {errors.password && (
              <div className="bg-red-600 text-white px-4 py-2 rounded-b-lg -mt-1 text-sm font-medium">
                {errors.password.message as string}
              </div>
            )}
          </div>

          <a href="/forgot-username" className="text-base underline mb-6" style={{ color: theme.secondaryTextColor }}>
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
