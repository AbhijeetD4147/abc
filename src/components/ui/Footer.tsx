import React from "react";
import logo from "../../assets/maximeyeslogo.png"; // Replace with actual path

const css = {
    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2px 3px",
        backgroundColor: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontSize: 12,
        color: "#333",
    },
    footerLeft: {
        display: "flex",
        alignItems: "center",
    },
    footerLogo: {
        height: 35,
        marginRight: 3,
    },
    footerVersion: {
        color: "#888",
    },
};

const Footer: React.FC = () => {
    return (
        <footer style={css.footer}>
            <div style={css.footerLeft}>
                <img src={logo} alt="Maximeyes Logo" style={css.footerLogo} />
                <span style={css.footerVersion}>v1.0.0</span>
            </div>
            <div className="ml-80">
                &copy; 2025, First Insight Corporation. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
