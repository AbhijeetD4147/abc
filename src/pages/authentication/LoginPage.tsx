import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import Footer from "../../components/ui/Footer";
import { Icon } from "@ketan_nimase/ui";
import { LoginModel } from "../../model/authentication/LoginModel";
import { AuthenticationService } from "../../services/authentication/UserService";
import { ApiPath } from "../../utils/constants";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import MaximEyes from '../../assets/maximeyeslogo.png';

interface SignInProps {
  logoUrl: string;
  companyName: string;
}

const theme = await getTheme();

const LoginPage: React.FC<SignInProps> = ({ logoUrl, companyName }) => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginAttempts, setLoginAttempts] = useState<number | null>(null);
  const [isAccountLocked, setIsAccountLocked] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user came from logout or session timeout
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const reason = searchParams.get('reason');
    const state = location.state;
    
    if (reason === 'logout' || reason === 'timeout' || state?.loggedOut) {
      setIsLoggedOut(true);
    }
  }, [location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBackToSignIn = () => {
    setIsAccountLocked(false);
    setLoginFailed(false);
    setErrorMessage("");
    setTimeRemaining(null);
    setIsLoggedOut(false);
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setLoginFailed(false);
      setErrorMessage("");
      setIsAccountLocked(false);

      // Create login model
      const loginModel = new LoginModel({
        userName: data.username,
        password: data.password,
        geoLocation: "",
        callFrom: "PORTAL"
      });

      // Call login API
      const authService = new AuthenticationService();
      await authService.login(loginModel.toJson());

      // Check response status
      if (authService.response_Status_Code_API_25 === 200) {
        const loginResponse = authService.loginResponseModel;

        // Handle different login scenarios
        if (loginResponse?.isAccountLocked) {
          setIsAccountLocked(true);
          setTimeRemaining(loginResponse.timeRemaining || 15);
          setLoginFailed(false);
        } else if (loginResponse?.loginStatus === 0) {
          // Invalid credentials
          setLoginFailed(true);
          setLoginAttempts(loginResponse.loginAttemptsleft || 0);
          const isValidUsername = !!loginResponse?.maximeyesPatientNumber;
          setValidUsername(isValidUsername);

          if (isValidUsername) {
            setErrorMessage(`For your safety, your account will be locked after ${loginResponse.loginAttemptsleft || 0} more failed sign in attempts.`);
          } else {
            setErrorMessage("The username or password entered is invalid.");
          }
        } else if (loginResponse?.loginStatus === 1) {
          // Successful login
          GlobalParams.USER_ID = loginResponse.userId?.toString() || "";
          GlobalParams.PT_CUSTOMER_ID = loginResponse.ptCustomerID?.toString() || "";
          GlobalParams.MAXIMEYES_PATIENT_NUMBER = loginResponse.maximeyesPatientNumber || "";
          GlobalParams.USER_TYPE = loginResponse.userType || "";
          GlobalParams.PATIENT_DOB = loginResponse.ptDOB || "";
          GlobalParams.SESSION_GUID = loginResponse.sessionGuid || "";
          GlobalParams.LOCATION_PHONE = loginResponse.locationPhone || "";
          ApiPath.isLogin = true;

          // Handle different login scenarios
          if (loginResponse.isOtpRequired) {
            navigate("/otp-verification", {
              state: {
                userType: "Patient",
                userId: loginResponse.userId,
                ptCustomerId: loginResponse.ptCustomerID
              }
            });
          } else if (!loginResponse.iS_DOB_VERIFIED) {
            navigate("/dob-verification");
          } else if (loginResponse.isOptedOut) {
            navigate("/opted-out");
          } else {
            navigate("/dashboard");
          }
        }
      } else if (authService.response_Status_Code_API_25 === 205) {
        setLoginFailed(true);
        setErrorMessage("Your session has expired. Please try again.");
      } else {
        setLoginFailed(true);
        setErrorMessage("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginFailed(true);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex flex-col bg-white p-2 md:p-10 relative flex-1">
        {/* Centered Logo */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={
              GlobalParams.LOGO
                ? `data:image/jpeg;base64,${GlobalParams.LOGO}`
                : ''
            }
            alt="Company Logo"
            className="w-60 max-w-full h-auto inline-block align-middle"
          />
        </div>
        
        {/* Footer at Bottom */}
        <div className="flex-shrink-0 m-0">
          <div className="hidden md:flex flex-col md:flex-row justify-between items-center gap-2">
            <img src={MaximEyes} alt="Maximeyes Logo" className="h-16 w-auto" />
            <div className="text-xs text-center md:text-right">
              &copy; 2025, First Insight Corporation. All rights reserved.
            </div>
          </div>
          <div className="flex md:hidden flex-row items-center justify-between gap-3 px-2 py-2 bg-white rounded-lg">
            <img src={MaximEyes} alt="Maximeyes Logo" className="h-8 w-auto" />
            <div className="text-xs text-center text-gray-600">
              &copy; 2025, First Insight Corporation. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10 flex-1"
        style={{ backgroundColor: theme.BGColor, color: theme.secondaryTextColor }}
      >
        {/* Logged Out Screen */}
        {isLoggedOut ? (
          <div className="flex flex-col w-full max-w-md text-center">
            {/* Lock Icon */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-white flex items-center justify-center">
                <Icon name="lock" height="40px" width="40px" colorVariant="light" stroke />
              </div>
            </div>

            {/* Logged Out Title */}
            <h2 className="text-2xl font-semibold text-white mb-4">Logged Out</h2>

            {/* Logged Out Message */}
            <p className="text-white mb-8 leading-relaxed">
              For your security, you have been logged out due to 20 minutes of inactivity. Sign In again.
            </p>

            {/* Username Field */}
            <div className="mb-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Icon name="user" height="20px" width="20px" colorVariant="dark" stroke />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-xl text-gray-900 placeholder-gray-600 border-2"
                  style={{
                    backgroundColor: theme.textfieldFilledColor,
                    borderColor: theme.textfieldDefaultBorderColor,
                  }}
                />
              </div>
            </div>

            <Link
              to="/forgot-username"
              className="text-base underline mb-4 text-left"
              style={{ color: theme.secondaryTextColor }}
            >
              Forgot Username?
            </Link>

            {/* Password Field */}
            <div className="mb-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Icon name="lock" height="20px" width="20px" colorVariant="dark" stroke />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-xl text-gray-900 placeholder-gray-600 border-2"
                  style={{
                    backgroundColor: theme.textfieldFilledColor,
                    borderColor: theme.textfieldDefaultBorderColor,
                  }}
                />
              </div>
            </div>

            <Link
              to="/forgot-password"
              className="text-base underline mb-6 text-left"
              style={{ color: theme.secondaryTextColor }}
            >
              Forgot Password?
            </Link>

            {/* Sign In Button */}
            <button
              onClick={handleBackToSignIn}
              className="w-full px-6 py-2 text-lg font-medium border rounded-full hover:bg-blue-200 hover:text-white transition duration-200"
              style={{
                backgroundColor: theme.BGColor,
                borderColor: theme.secondaryTextColor,
                color: theme.secondaryTextColor
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
          </div>
        ) : isAccountLocked ? (
          <div className="flex flex-col w-full max-w-md text-center">
            {/* Lock Icon */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-white flex items-center justify-center">
                <Icon name="lock" height="40px" width="40px" colorVariant="light" stroke />
              </div>
            </div>

            {/* Account Locked Title */}
            <h2 className="text-2xl font-semibold text-white mb-4">Account Locked</h2>

            {/* Account Locked Message */}
            <p className="text-white mb-6 leading-relaxed">
              Your account has been temporarily locked due to multiple failed sign in attempts.
            </p>

            <p className="text-white mb-8 leading-relaxed">
              You can unlock your account after {Math.ceil((timeRemaining || 0) / 60)} minutes from the time locked, by clicking forgot password link.
            </p>

            {/* Back to Sign In Button */}
            <button
              onClick={handleBackToSignIn}
              className="w-full px-6 py-3 text-lg font-medium border rounded-full hover:bg-blue-200 hover:text-white transition duration-200"
              style={{
                backgroundColor: 'transparent',
                borderColor: theme.secondaryTextColor,
                color: theme.secondaryTextColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.ButtonHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          /* Login Form */
          <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
            {/* Logo on top */}
            <div className="text-center mb-10">
              <img
                src={loginFailed ? "/signin-failed-logo.png" : "/profile-logo-white.png"}
                alt="Profile"
                className="w-24 h-24 mx-auto mb-6"
              />
              {loginFailed && (
                <h2 className="text-xl font-semibold text-white mb-2">Sign In attempt failed</h2>
              )}
            </div>

            {/* Error Message Lines Above Username */}
            {loginFailed && errorMessage && (
              <div className="mb-4">
                <p className="text-white text-center leading-relaxed">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Username Field */}
            <div className="mb-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Icon name="user" height="20px" width="20px" colorVariant="dark" stroke />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", { required: "Username is required" })}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg text-xl text-gray-900 placeholder-gray-600 border-2 ${errors.username ? "bg-red-100 border-red-500" : ""
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

            <Link
              to="/forgot-username"
              className="text-base underline mb-4"
              style={{ color: theme.secondaryTextColor }}
            >
              Forgot Username?
            </Link>

            {/* Password Field */}
            <div className="mb-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Icon name="lock" height="20px" width="20px" colorVariant="dark" stroke />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: "Password is required" })}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg text-xl text-gray-900 placeholder-gray-600 border-2 ${errors.password ? "bg-red-100 border-red-500" : ""
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

            <Link
              to="/forgot-password"
              className="text-base underline mb-6"
              style={{ color: theme.secondaryTextColor }}
            >
              Forgot Password?
            </Link>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-2 text-lg font-medium border rounded-full hover:bg-blue-200 hover:text-white transition duration-200 disabled:opacity-50"
              style={{
                backgroundColor: theme.BGColor,
                borderColor: theme.secondaryTextColor,
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = theme.ButtonHover;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.BGColor;
              }}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;