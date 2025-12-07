import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "250px",
        background: "#1f2937",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "#fff", marginBottom: "20px" }}>Admin Panel</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/admin/dashboard" style={{ color: "#fff" }}>Dashboard</Link></li>
        <li><Link to="/admin/students" style={{ color: "#fff" }}>Students</Link></li>
        <li><Link to="/admin/teachers" style={{ color: "#fff" }}>Teachers</Link></li>
        <li><Link to="/admin/settings" style={{ color: "#fff" }}>Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
