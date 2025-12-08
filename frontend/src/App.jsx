import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./auth/login";
import AdminLayout from "./admin/layoutPage/layout/AdminLayout";

// Dashboard Pages
import AdminDashboard from "./admin/dashboard/AdminDashboard";
import StudentDashboard from "./admin/dashboard/StudentDashboard";
import TeacherDashboard from "./admin/dashboard/TeacherDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login → No Layout */}
        <Route path="/" element={<Login />} />

        {/* Pages Inside Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/StudentDashboard" element={<StudentDashboard />} />
          <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
