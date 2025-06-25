import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getTheme } from "../../utils/ThemeSelection";
import { GlobalParams } from '../../utils/GlobalParameters';
import Footer from "../../components/ui/Footer";
import { Icon } from "@ketan_nimase/ui";
import { LoginModel } from "../../model/authentication/LoginModel";
import { AuthenticationService } from "../../services/authentication/UserService";
import { ApiPath } from "../../utils/constants";
import { useNavigate, Link } from 'react-router-dom';
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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setLoginFailed(false);
      setErrorMessage("");

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

        // Update login attempts and account status
        if (loginResponse?.loginAttemptsleft !== undefined) {
          setLoginAttempts(loginResponse.loginAttemptsleft);
        }
        
        if (loginResponse?.isAccountLocked) {
          setIsAccountLocked(true);
        }
        
        // Check if username is valid (has maximeyesPatientNumber)
        if (loginResponse?.maximeyesPatientNumber) {
          setValidUsername(true);
        }

        // Update login attempts and account status
        if (loginResponse?.loginAttemptsleft !== undefined) {
          setLoginAttempts(loginResponse.loginAttemptsleft);
        }
        
        if (loginResponse?.isAccountLocked) {
          setIsAccountLocked(true);
        }
        
        // Check if username is valid (has maximeyesPatientNumber)
        if (loginResponse?.maximeyesPatientNumber) {
          setValidUsername(true);
        }

        // Handle different login scenarios
        if (loginResponse?.isAccountLocked) {
          setLoginFailed(true);
          console.log(`Your account has been locked. Please try again after ${loginResponse.timeRemaining} minutes.`);
          setErrorMessage(`Your account has been locked. Please try again after ${loginResponse.timeRemaining} minutes.`);
        } else if (loginResponse?.loginStatus === 0) {
          setLoginFailed(true);
          setErrorMessage(`Invalid username or password. ${loginResponse.loginAttemptsleft} attempts remaining.`);
        } else if (loginResponse?.loginStatus === 1) {
          // Successful login
          // Set global parameters
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
            // Navigate to OTP verification page with required state
            navigate("/otp-verification", {
              state: {
                userType: "Patient",
                userId: loginResponse.userId,
                ptCustomerId: loginResponse.ptCustomerID
              }
            });
          } else if (!loginResponse.iS_DOB_VERIFIED) {
            // Navigate to DOB verification page
            navigate("/dob-verification");
          } else if (loginResponse.isOptedOut) {
            // Navigate to opted-out page
            navigate("/opted-out");
          } else {
            // Navigate to dashboard
            navigate("/dashboard");
          }
        }
      } else if (authService.response_Status_Code_API_25 === 205) {
        // Session invalid
        setLoginFailed(true);
        setErrorMessage("Your session has expired. Please try again.");
      } else {
        // Other errors
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
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-6 md:p-10 relative">
        <img
          src={
            GlobalParams.LOGO
              ? `data:image/jpeg;base64,${GlobalParams.LOGO}`
              : ''
          }
          alt="Company Logo"
          className="w-60 max-w-full h-auto inline-block align-middle"
        />
        <div className="absolute bottom-3 left-3 text-xs text-gray-400">
          <Footer />
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10"
        style={{ backgroundColor: theme.BGColor, color: theme.secondaryTextColor }}
      >
        <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
          {/* Logo on top */}
          <div className="text-center mb-10">
            <img
              src={loginFailed ? "/signin-failed-logo.png" : "/profile-logo-white.png"}
              alt="Profile"
              className="w-24 h-24 mx-auto mb-6"
            />
          </div>

          {/* Error Message */}
          {loginFailed && (
            <p className="text-md text-white font-regular mb-4">
              The username or password entered is invalid.
            </p>
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
                className={`w-full pl-10 pr-4 py-2 rounded-lg text-xl text-gray-900 placeholder-gray-600 border-2 ${errors.password ? "bg-red-100 border-red-500" : ""}`}
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
            className="w-full px-6 py-2 text-lg font-medium border rounded-full hover:bg-blue-200 hover:text-white transition duration-200"
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
