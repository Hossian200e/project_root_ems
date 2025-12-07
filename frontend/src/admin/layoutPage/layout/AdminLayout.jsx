import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-layout" style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      <div className="main-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
