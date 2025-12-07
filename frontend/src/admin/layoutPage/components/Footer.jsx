import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        padding: "10px",
        background: "#e5e7eb",
        textAlign: "center",
        fontSize: "14px",
      }}
    >
      © {new Date().getFullYear()} EMS Admin Panel. All Rights Reserved.
    </footer>
  );
};

export default Footer;
