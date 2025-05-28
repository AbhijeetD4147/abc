import React, { createContext, useContext, useEffect, useState } from 'react';
import { type ThemeColors, getTheme, defaultThemeColors } from './ThemeSelection';

const ThemeContext = createContext<ThemeColors>(defaultThemeColors);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColors, setThemeColors] = useState<ThemeColors>(defaultThemeColors);

  useEffect(() => {
    const fetchTheme = async () => {
      const colors = await getTheme();
      setThemeColors(colors);
      
      // Set CSS variables globally
      const root = document.documentElement;
      Object.entries(colors).forEach(([key, value]) => {
        const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVarName, value);
      });
    };
    
    fetchTheme();
  }, []);

  return (
    <ThemeContext.Provider value={themeColors}>
      {children}
    </ThemeContext.Provider>
  );
};