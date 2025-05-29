import type { ThemeColors } from "../utils/ThemeSelection";

export const setThemeCSSVariables = (theme: ThemeColors) => {
  const root = document.documentElement;

  Object.entries(theme).forEach(([key, value]) => {
    if (typeof value === "string" && value.trim() !== "") {
      const cssVarName = `--${camelToKebabCase(key)}`;
      root.style.setProperty(cssVarName, value);
    }
  });
};

const camelToKebabCase = (str: string): string =>
  str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
