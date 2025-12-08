import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./auth/login";
import AdminLayout from "./admin/layoutPage/layout/AdminLayout";

// Dashboard Pages
import AdminDashboard from "./admin/dashboard/AdminDashboard";
import StudentDashboard from "./admin/dashboard/StudentDashboard";
import TeacherDashboard from "./admin/dashboard/TeacherDashboard";

function App() {
  // 🌙 Light/Dark Mode State
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

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

        {/* Admin area + theme injection */}
        <Route
          element={
            <AdminLayout
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        >
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/StudentDashboard" element={<StudentDashboard />} />
          <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
