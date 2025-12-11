import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth
import Login from "./auth/login";

// Layouts
import AdminLayout from "./admin/layoutPage/layout/AdminLayout";
import StudentLayout from "./student/layoutPage/layout/StudentLayout";
import TeacherLayout from "./teacher/layoutPage/layout/TeacherLayout";

// Dashboard Pages
import AdminDashboard from "./admin/dashboard/AdminDashboard";
import StudentDashboard from "./student/dashboard/StudentDashboard";
import TeacherDashboard from "./teacher/dashboard/TeacherDashboard";


//Admin Page.............
import UserGroupList from "./admin/userManagement/UserGroupList";
import UserRoleGroupManagement from "./admin/userManagement/UserRoleGroupManagement";


function App() {
  // 🌙 Light/Dark Mode State
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        {/* Login page without layout */}
        <Route path="/" element={<Login />} />

        {/* Admin routes */}
        <Route
          element={<AdminLayout theme={theme} toggleTheme={toggleTheme} />}
        >
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/UserGroupList" element={<UserGroupList />} />
          <Route path="/UserRoleGroupManagement" element={<UserRoleGroupManagement />} />
        </Route>

        {/* Student routes */}
        <Route
          element={<StudentLayout theme={theme} toggleTheme={toggleTheme} />}
        >
          <Route path="/StudentDashboard" element={<StudentDashboard />} />
        </Route>

        {/* Teacher routes */}
        <Route
          element={<TeacherLayout theme={theme} toggleTheme={toggleTheme} />}
        >
          <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
