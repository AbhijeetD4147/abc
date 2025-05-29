
import React, { useEffect } from 'react';
import { setThemeCSSVariables } from './utils/setThemeCSSVariables';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PtHomePage from './pages/home/PtHomePage'
import { defaultThemeColors } from './utils/ThemeSelection';
import SignUpPage from './pages/authentication/SignUpPage';

function App() {
  useEffect(() => {
    setThemeCSSVariables(defaultThemeColors);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<PtHomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </Router>
  )
}

export default App

