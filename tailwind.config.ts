// import { Config } from "tailwindcss";
// import forms from "@tailwindcss/forms";
// import typography from "@tailwindcss/typography";

// const config: Config = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         // Text Colors
//         "primary-text-color": "var(--primary-text-color)",
//         "secondary-text-color": "var(--secondary-text-color)",
//         "tertiary-text-color": "var(--tertiary-text-color)",
//         "quaternary-text-color": "var(--quaternary-text-color)",
//         "quinary-text-color": "var(--quinary-text-color)",
//         "senary-text-color": "var(--senary-text-color)",
//         "septenary-text-color": "var(--septenary-text-color)",
//         "octonary-text-color": "var(--octonary-text-color)",
//         "nonary-text-color": "var(--nonary-text-color)",
//         "denary-text-color": "var(--denary-text-color)",

//         "list-tile-hover-color": "var(--list-tile-hover-color)",
//         "list-tile-default-color": "var(--list-tile-default-color)",
//         "list-tile-selected-color": "var(--list-tile-selected-color)",

//         "error-text-widgets": "var(--error-text-widgets)",
//         "grey-border-color": "var(--grey-border-color)",
//         "proceed-btn": "var(--proceed-btn)",
//         "bg-color": "var(--bg-color)",
//         "pending-alert-icon": "var(--pending-alert-icon)",
//         "success-screen-color": "var(--success-screen-color)",
//         "failure-screen-color": "var(--failure-screen-color)",
//         "alert-icon": "var(--alert-icon)",
//         "primary-action": "var(--primary-action)",
//         "value-selection1": "var(--value-selection1)",
//         "value-selection2": "var(--value-selection2)",
//         "button-hover": "var(--button-hover)",
//         "button-pressed": "var(--button-pressed)",
//         "button-disable": "var(--button-disable)",
//         "white-button-pressed-hover": "var(--white-button-pressed-hover)",
//         "white-button-hover": "var(--white-button-hover)",
//         "border-color": "var(--border-color)",
//         "otp-green-icon-color": "var(--otp-green-icon-color)",
//         "otp-red-icon-color": "var(--otp-red-icon-color)",
//         "message-sent-color": "var(--message-sent-color)",

//         // Primary Button
//         "primary-default-bg": "var(--primary-default-bg)",
//         "primary-hover-bg": "var(--primary-hover-bg)",
//         "primary-pressed-bg": "var(--primary-pressed-bg)",
//         "primary-disabled-bg": "var(--primary-disabled-bg)",
//         "primary-disabled-label": "var(--primary-disabled-label)",
//         "primary-default-label": "var(--primary-default-label)",

//         // Ghost Button 1
//         "ghost1-default-bg": "var(--ghost1-default-bg)",
//         "ghost1-hover-bg": "var(--ghost1-hover-bg)",
//         "ghost1-pressed-bg": "var(--ghost1-pressed-bg)",
//         "ghost1-disabled-bg": "var(--ghost1-disabled-bg)",
//         "ghost1-default-border": "var(--ghost1-default-border)",
//         "ghost1-disabled-border": "var(--ghost1-disabled-border)",
//         "ghost1-disabled-label": "var(--ghost1-disabled-label)",
//         "ghost1-default-label": "var(--ghost1-default-label)",

//         // Ghost Button 2
//         "ghost2-default-bg": "var(--ghost2-default-bg)",
//         "ghost2-hover-bg": "var(--ghost2-hover-bg)",
//         "ghost2-pressed-bg": "var(--ghost2-pressed-bg)",
//         "ghost2-border": "var(--ghost2-border)",
//         "ghost2-label": "var(--ghost2-label)",

//         // Secondary Button
//         "secondary-default-bg": "var(--secondary-default-bg)",
//         "secondary-hover-bg": "var(--secondary-hover-bg)",
//         "secondary-pressed-bg": "var(--secondary-pressed-bg)",
//         "secondary-disabled-bg": "var(--secondary-disabled-bg)",
//         "secondary-default-border": "var(--secondary-default-border)",
//         "secondary-pressed-border": "var(--secondary-pressed-border)",
//         "secondary-default-label": "var(--secondary-default-label)",
//         "secondary-disabled-label": "var(--secondary-disabled-label)",

//         // CTA Hyperlink Button
//         "cta-text-default": "var(--cta-text-default)",
//         "cta-text-hover": "var(--cta-text-hover)",
//         "cta-text-disabled": "var(--cta-text-disabled)",

//         "outline-tooltip-color": "var(--outline-tooltip-color)",
//         "table-header-color": "var(--table-header-color)",
//         "table-border-color": "var(--table-border-color)",
//         "table-bg-color": "var(--table-bg-color)",

//         "mobile-appbar-color": "var(--mobile-appbar-color)",
//         "auth-user-hover": "var(--auth-user-hover)",
//         "auth-user-clicked": "var(--auth-user-clicked)",
//         "auth-user-divider": "var(--auth-user-divider)",

//         // Message Screen
//         "message-panel-divider": "var(--message-panel-divider)",
//         "message-attachment-divider": "var(--message-attachment-divider)",
//         "latest-message-bg": "var(--latest-message-bg)",
//         "message-thread-border": "var(--message-thread-border)",
//         "message-subject-divider": "var(--message-subject-divider)",
//         "attachment-border": "var(--attachment-border)",
//         "attachment-bg": "var(--attachment-bg)",
//         "attachment-bg-hover": "var(--attachment-bg-hover)",
//         "search-message-highlight": "var(--search-message-highlight)",

//         // Pagination
//         "page-icon-default": "var(--page-icon-default)",
//         "page-icon-hover": "var(--page-icon-hover)",
//         "page-number-bg": "var(--page-number-bg)",

//         // Icon Button
//         "icon-default-primary": "var(--icon-default-primary)",
//         "icon-default-secondary": "var(--icon-default-secondary)",
//         "icon-default-tertiary": "var(--icon-default-tertiary)",
//         "icon-default-quaternary": "var(--icon-default-quaternary)",
//         "icon-default-quinary": "var(--icon-default-quinary)",

//         "icon-pressed-primary": "var(--icon-pressed-primary)",
//         "icon-pressed-secondary": "var(--icon-pressed-secondary)",
//         "icon-pressed-tertiary": "var(--icon-pressed-tertiary)",
//         "icon-pressed-quaternary": "var(--icon-pressed-quaternary)",

//         "icon-hover-primary": "var(--icon-hover-primary)",
//         "icon-hover-secondary": "var(--icon-hover-secondary)",
//         "icon-hover-tertiary": "var(--icon-hover-tertiary)",
//         "icon-hover-quaternary": "var(--icon-hover-quaternary)",

//         // TextField
//         "textfield-error-border": "var(--textfield-error-border)",
//         "textfield-default-border": "var(--textfield-default-border)",
//         "textfield-focused-border": "var(--textfield-focused-border)",
//         "textfield-error-text": "var(--textfield-error-text)",
//         "textfield-error-filled": "var(--textfield-error-filled)",
//         "textfield-filled": "var(--textfield-filled)",
//         "textfield-hint-text": "var(--textfield-hint-text)",
//         "textfield-label": "var(--textfield-label)",
//         "textfield-non-editing-filled": "var(--textfield-non-editing-filled)",
//         "textfield-inline-color": "var(--textfield-inline-color)",

//         // NavBar
//         "menu-yellow-strip": "var(--menu-yellow-strip)",
//         "menu-tab-hover": "var(--menu-tab-hover)",

//         // Appointment
//         "appointment-bg": "var(--appointment-bg)",
//         "appointment-cancel-bg": "var(--appointment-cancel-bg)",
//         "appointment-status-confirm": "var(--appointment-status-confirm)",
//         "appointment-status-pending": "var(--appointment-status-pending)",
//         "chip-selected-bg": "var(--chip-selected-bg)",
//         "chip-selected-border": "var(--chip-selected-border)",
//         "appointment-confirmed-bg": "var(--appointment-confirmed-bg)",

//         // Common
//         "link-hover-black": "var(--link-hover-black)",
//         "link-hover-white": "var(--link-hover-white)",
//         "link-hover-blue": "var(--link-hover-blue)",
//         "divider-primary": "var(--divider-primary)",
//         "divider-secondary": "var(--divider-secondary)",
//         "divider-tertiary": "var(--divider-tertiary)",
//         "text-label-secondary": "var(--text-label-secondary)",
//         "popup-success": "var(--popup-success)",
//         "popup-info": "var(--popup-info)",
//         "popup-critical": "var(--popup-critical)",
//         "popup-warning": "var(--popup-warning)",

//         "menu-hover-color": "var(--menu-hover-color)",
//         "password-criteria-met": "var(--password-criteria-met)",
//       },
//     },
//   },
//   plugins: [forms, typography],
// };

// export default config;


import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/forms')
  ],
} satisfies Config
