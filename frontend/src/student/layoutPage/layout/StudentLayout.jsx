import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function StudentLayout({ theme, toggleTheme }) {
  return (
    <div className="student-dashboard">
      {/* Use the imported Sidebar */}
      <Sidebar />

      <div className="main-content">
        {/* Use the imported Header with theme props */}
        <Header theme={theme} toggleTheme={toggleTheme} />

        <div className="content">
          <Outlet /> {/* Render StudentDashboard page here */}
        </div>

        {/* Use the imported Footer */}
        <Footer />
      </div>
    </div>
  );
}
