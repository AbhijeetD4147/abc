import React, { useState, useEffect } from 'react';
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
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container-fluid d-flex flex-column flex-md-row" style={{ minHeight: '100vh', minWidth: '100vw' }}>
      {/* Left Panel */}
      <div className="col-12 col-md-6 d-flex flex-column bg-white p-2 p-md-5 position-relative">
        {/* Centered Logo */}
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <img
            src={
              GlobalParams.LOGO
                ? `data:image/jpeg;base64,${GlobalParams.LOGO}`
                : ''
            }
            alt="Company Logo"
            className="img-fluid"
            style={{ width: '15rem', maxWidth: '100%', height: 'auto' }}
          />
        </div>
        
        {/* Footer at Bottom */}
        <div className="flex-shrink-0 m-0">
          <div className="d-none d-md-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <img src={MaximEyes} alt="Maximeyes Logo" className="" style={{ height: '3rem', width: 'auto' }} />
            <div className="small text-center text-md-end">
              &copy; 2025, First Insight Corporation. All rights reserved.
            </div>
          </div>
          <div className="d-flex d-md-none flex-row align-items-center justify-content-between gap-3 px-2 py-2 bg-white rounded">
            <img src={MaximEyes} alt="Maximeyes Logo" className="" style={{ height: '4rem', width: 'auto' }} />
            <div className="small text-center text-muted">
              &copy; 2025, First Insight Corporation. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-3 p-md-5"
        style={{ backgroundColor: theme.BGColor, color: theme.secondaryTextColor }}
      >
        {/* Logged Out Screen */}
        {isLoggedOut ? (
          <div className="d-flex flex-column w-100 text-center" style={{ maxWidth: '28rem' }}>
            {/* Lock Icon */}
            <div className="text-center mb-4">
              <div 
                className="mx-auto mb-4 rounded-circle border border-4 border-white d-flex align-items-center justify-content-center"
                style={{ width: '6rem', height: '6rem' }}
              >
                <Icon name="lock" height="40px" width="40px" colorVariant="light" stroke />
              </div>
            </div>

            {/* Logged Out Title */}
            <h2 className="h4 fw-semibold text-white mb-3">Logged Out</h2>

            {/* Logged Out Message */}
            <p className="text-white mb-4 lh-base">
              For your security, you have been logged out due to 20 minutes of inactivity. Sign In again.
            </p>

            {/* Username Field */}
            <div className="mb-2">
              <div className="position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y ps-3 pe-none" style={{ zIndex: 10 }}>
                  <Icon name="user" height="20px" width="20px" colorVariant="dark" stroke />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control form-control-lg ps-5 pe-4 py-2 rounded-3 fs-5 border-2"
                  style={{
                    backgroundColor: theme.textfieldFilledColor,
                    borderColor: theme.textfieldDefaultBorderColor,
                    color: '#6c757d'
                  }}
                />
              </div>
            </div>

            <Link
              to="/forgot-username"
              className="text-decoration-underline mb-3 text-start"
              style={{ color: theme.secondaryTextColor }}
            >
              Forgot Username?
            </Link>

            {/* Password Field */}
            <div className="mb-2">
              <div className="position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y ps-3 pe-none" style={{ zIndex: 10 }}>
                  <Icon name="lock" height="20px" width="20px" colorVariant="dark" stroke />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control form-control-lg ps-5 pe-4 py-2 rounded-3 fs-5 border-2"
                  style={{
                    backgroundColor: theme.textfieldFilledColor,
                    borderColor: theme.textfieldDefaultBorderColor,
                    color: '#6c757d'
                  }}
                />
              </div>
            </div>

            <Link
              to="/forgot-password"
              className="text-decoration-underline mb-4 text-start"
              style={{ color: theme.secondaryTextColor }}
            >
              Forgot Password?
            </Link>

            {/* Sign In Button */}
            <button
              onClick={handleBackToSignIn}
              className="btn w-100 px-4 py-2 fs-5 fw-medium border rounded-pill"
              style={{
                backgroundColor: theme.BGColor,
                borderColor: theme.secondaryTextColor,
                color: theme.secondaryTextColor,
                transition: 'background-color 0.2s'
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
          <div className="d-flex flex-column w-100 text-center" style={{ maxWidth: '28rem' }}>
            {/* Lock Icon */}
            <div className="text-center mb-4">
              <div 
                className="mx-auto mb-4 rounded-circle border border-4 border-white d-flex align-items-center justify-content-center"
                style={{ width: '6rem', height: '6rem' }}
              >
                <Icon name="lock" height="40px" width="40px" colorVariant="light" stroke />
              </div>
            </div>

            {/* Account Locked Title */}
            <h2 className="h4 fw-semibold text-white mb-3">Account Locked</h2>

            {/* Account Locked Message */}
            <p className="text-white mb-3 lh-base">
              Your account has been temporarily locked due to multiple failed sign in attempts.
            </p>

            <p className="text-white mb-4 lh-base">
              You can unlock your account after {Math.ceil((timeRemaining || 0) / 60)} minutes from the time locked, by clicking forgot password link.
            </p>

            {/* Back to Sign In Button */}
            <button
              onClick={handleBackToSignIn}
              className="btn w-100 px-4 py-3 fs-5 fw-medium border rounded-pill"
              style={{
                backgroundColor: 'transparent',
                borderColor: theme.secondaryTextColor,
                color: theme.secondaryTextColor,
                transition: 'background-color 0.2s'
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
          <form className="d-flex flex-column w-100" style={{ maxWidth: '28rem' }} onSubmit={handleSubmit(onSubmit)}>
            {/* Logo on top */}
            <div className="text-center mb-5">
              <img
                src={loginFailed ? "/signin-failed-logo.png" : "/profile-logo-white.png"}
                alt="Profile"
                className="mx-auto mb-4"
                style={{ width: '6rem', height: '6rem' }}
              />
              {loginFailed && (
                <h2 className="h5 fw-semibold text-white mb-2">Sign In attempt failed</h2>
              )}
            </div>

            {/* Error Message Lines Above Username */}
            {loginFailed && errorMessage && (
              <div className="mb-3">
                <p className="text-white text-center lh-base">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Username Field */}
            <div className="mb-2">
              <div className="position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y ps-3 pe-none" style={{ zIndex: 10 }}>
                  <Icon name="user" height="20px" width="20px" colorVariant="dark" stroke />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", { required: "Username is required" })}
                  className={`form-control form-control-lg ps-5 pe-4 py-2 rounded-3 fs-5 border-2 ${
                    errors.username ? "bg-danger-subtle border-danger" : ""
                  }`}
                  style={{
                    backgroundColor: theme.textfieldFilledColor,
                    borderColor: errors.username
                      ? "crimson"
                      : theme.textfieldDefaultBorderColor,
                    color: '#6c757d'
                  }}
                />
              </div>
              {errors.username && (
                <div className="bg-danger text-white px-3 py-2 rounded-bottom mt-0 small fw-medium" style={{ marginTop: '-1px' }}>
                  {errors.username.message as string}
                </div>
              )}
            </div>

            <Link
              to="/forgot-username"
              className="text-decoration-underline mb-3"
              style={{ color: theme.secondaryTextColor }}
            >
              Forgot Username?
            </Link>

            {/* Password Field */}
            <div className="mb-2">
              <div className="position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y ps-3 pe-none" style={{ zIndex: 10 }}>
                  <Icon name="lock" height="20px" width="20px" colorVariant="dark" stroke />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: "Password is required" })}
                  className={`form-control form-control-lg ps-5 pe-4 py-2 rounded-3 fs-5 border-2 ${
                    errors.password ? "bg-danger-subtle border-danger" : ""
                  }`}
                  style={{
                    backgroundColor: theme.textfieldFilledColor,
                    borderColor: errors.password
                      ? "crimson"
                      : theme.textfieldDefaultBorderColor,
                    color: '#6c757d'
                  }}
                />
              </div>
              {errors.password && (
                <div className="bg-danger text-white px-3 py-2 rounded-bottom mt-0 small fw-medium" style={{ marginTop: '-1px' }}>
                  {errors.password.message as string}
                </div>
              )}
            </div>

            <Link
              to="/forgot-password"
              className="text-decoration-underline mb-4"
              style={{ color: theme.secondaryTextColor }}
            >
              Forgot Password?
            </Link>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn w-100 px-4 py-2 fs-5 fw-medium border rounded-pill disabled:opacity-50"
              style={{
                backgroundColor: theme.BGColor,
                borderColor: theme.secondaryTextColor,
                color: theme.secondaryTextColor,
                transition: 'background-color 0.2s',
                opacity: isLoading ? 0.5 : 1
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