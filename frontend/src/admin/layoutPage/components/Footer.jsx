import React from "react";
import "../../../assets/styles/admin/layoutPage/components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} EMS Admin Panel. All Rights Reserved.
    </footer>
  );
};

export default Footer;
