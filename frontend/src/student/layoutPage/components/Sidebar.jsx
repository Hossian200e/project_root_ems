// src/student/layoutPage/components/Sidebar.jsx
import React from "react";

export default function Sidebar({ theme }) {
  return (
    <aside className={`sidebar ${theme}-mode`}>
      <div className="sidebar-header">
        <img src="https://i.ibb.co/2W8Q0vG/default-user.png" alt="Student" />
        <h3>Student Panel</h3>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/StudentDashboard">Dashboard</a>
          </li>
          <li>
            <a href="/StudentCourses">Courses</a>
          </li>
          <li>
            <a href="/StudentProfile">Profile</a>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        &copy; 2025 <b>Student Portal</b>
      </div>
    </aside>
  );
}
