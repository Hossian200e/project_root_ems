import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TeacherLayout({ theme, toggleTheme }) {
  return (
    <div className="teacher-dashboard">
      <Sidebar /> {/* Use imported Sidebar */}
      <div className="main-content">
        <Header theme={theme} toggleTheme={toggleTheme} /> {/* Use imported Header */}
        <div className="content">
          <Outlet /> {/* Render TeacherDashboard page here */}
        </div>
        <Footer /> {/* Use imported Footer */}
      </div>
    </div>
  );
}
