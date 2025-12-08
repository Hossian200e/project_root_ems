// src/teacher/layoutPage/components/Sidebar.jsx
import React from "react";

export default function Sidebar({ theme }) {
  return (
    <aside className={`sidebar ${theme}-mode`}>
      <div className="sidebar-header">
        <img src="https://i.ibb.co/2W8Q0vG/default-user.png" alt="Teacher" />
        <h3>Teacher Panel</h3>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/TeacherDashboard">Dashboard</a>
          </li>
          <li>
            <a href="/TeacherClasses">Classes</a>
          </li>
          <li>
            <a href="/TeacherProfile">Profile</a>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        &copy; 2025 <b>Teacher Portal</b>
      </div>
    </aside>
  );
}
