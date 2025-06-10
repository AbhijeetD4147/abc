// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
// import 'react-toastify/dist/ReactToastify.css';

import { ApiPath } from "./utils/constants";
import { AuthenticationService } from "./services/authentication/UserService";
import { GlobalParams } from "./utils/GlobalParameters";
import GetUrlService from "./services/common/GetUserService";
import GetModulePermissionServices from "./services/common/ModuleServices";
import PtHomePage from "./pages/home/PtHomePage";
import LoginPage from "./pages/authentication/LoginPage";
import SignUpPage from "./pages/authentication/SignUpPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PatientProfile from "./pages/settings/profile/PatientProfile";

function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const initApp = async () => {
      try {
        let practiceName = "";
        let queryParams = new URLSearchParams(window.location.search);
        let path = window.location.pathname;

        if (window.location.hostname !== "localhost") {
          practiceName = path.split("/").pop() || "";
        } else {
          practiceName = "ptportal278"; // dev fallback
        }

        GlobalParams.PRACTICE_NAME = practiceName;

        if (practiceName) {
          const subDomain = "apptbookingqa1";
          await new GetUrlService().getUrl(subDomain, "1", practiceName);
          await AuthenticationService.generateToken();
        }

        let queryType = "";
        let firstQuery = "";
        let guid = "";
        let ptCustomerId: number | null = null;
        let username = "";

        if (queryParams.toString()) {
          const values = Array.from(queryParams.values());
          firstQuery = values[0];
          if (values.length > 1) {
            queryType = values[1];
            guid = values[0];

            if (queryType === "MatchFound") {
              const authService = new AuthenticationService();
              const patientAccount = await authService.checkPatientAccount(guid);
              queryType = patientAccount?.loginHistory;
              ptCustomerId = patientAccount.ptCustomerId;
              username = patientAccount.username || "";

              // Assign the retrieved ptCustomerId to GlobalParams.PT_CUSTOMER_ID
              if (ptCustomerId !== null) {
                GlobalParams.PT_CUSTOMER_ID = ptCustomerId.toString();
              }
            }
          }
        }

        const modulePerms = new GetModulePermissionServices();
        await modulePerms.getModulePermission();

        if (modulePerms.response_Status_Code_API === 200) {
          Object.assign(ApiPath, modulePerms.modulePermissionModel);
        }
        // const themeSelection = new ThemeSelection(); // You might need to import ThemeSelection
        // await themeSelection.getTheme();

        const route = decideInitialRoute(queryType);
        setInitialRoute(route);
      } catch (error) {
        console.error("App init error", error);
      }
    };

    initApp();
  }, []);

  const decideInitialRoute = (queryType: string): string => {
    if (!GlobalParams.PRACTICE_NAME) return "/";
    if (!window.location.search) return ApiPath.isLogin ? "/dashboard" : "/";
    switch (queryType) {
      case "forgotusername":
        return "/forgotUsername";
      case "forgotpassword":
        return "/forgotPassword";
      case "PAST ACCESS":
        return "/createPasswordForExistingUser";
      case "NEVER ACCESS":
        return "/termsForRegisterForExistingUser";
      case "loginauthorization":
        return "/authterms";
      default:
        return "/invalidLinkScreen";
    }
  };

  if (!initialRoute) return <div>Loading...</div>;

  return (
    <Router>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <Routes>
        <Route path="/" element={<PtHomePage />} />
        <Route path="/home" element={<PtHomePage />} />
        <Route path="/login" element={<LoginPage logoUrl={GlobalParams.LOGO} companyName={GlobalParams.COMPANY_NAME} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboarduis" element={<DashboardPage />} />
        <Route path="/profile" element={<PatientProfile />} />
        {/*<Route path="/forgotPassword" element={<ForgotPasswordScreen />} />
        <Route path="/forgotUsername" element={<ForgotUsernameScreen />} />
        <Route path="/authterms" element={<AuthTermsAndConditionScreen />} />
        <Route path="/invalidLinkScreen" element={<InvalidLinkScreen />} /> */}
        <Route path="*" element={<Navigate to={initialRoute} />} />
      </Routes>
    </Router>
  );
}

export default App;
