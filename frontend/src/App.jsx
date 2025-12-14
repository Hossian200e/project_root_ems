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

// Admin Pages
import UserGroupList from "./admin/userManagement/UserGroupList";
import UserRoleGroupManagement from "./admin/userManagement/UserRoleGroupManagement";
import Task from "./admin/systemManagement/task";
import Users from "./admin/systemManagement/users";
import ProfileSetup from "./admin/globalConfigurations/instituteSetup/profileSetup"; // <-- Added
import CampusSetup from "./admin/globalConfigurations/instituteSetup/campusSetup"; // <-- Added
import ShiftSetup from "./admin/globalConfigurations/instituteSetup/shiftSetup"; // <-- Added
import MediumSetup from "./admin/globalConfigurations/instituteSetup/mediumSetup"; // <-- Added
import EducationLevelSetup from "./admin/globalConfigurations/instituteSetup/educationLevelSetup"; // <-- Added
import DepartmentsSetup from "./admin/globalConfigurations/instituteSetup/departmentsSetup"; // <-- Added
import ClassSetup from "./admin/globalConfigurations/instituteSetup/classSetup"; // <-- Added
import SectionSetup from "./admin/globalConfigurations/instituteSetup/sectionSetup";
import SubjectSetup from "./admin/globalConfigurations/instituteSetup/subjectSetup";
import SessionSetup from "./admin/globalConfigurations/instituteSetup/sessionSetup";
import SubjectSubType from "./admin/globalConfigurations/instituteSetup/subjectSubType";
import ClassSubjects from "./admin/globalConfigurations/instituteSetup/classSubjects";
import BackgroundUpload from "./admin/globalConfigurations/instituteSetup/backgroundUpload";

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
          <Route path="/task" element={<Task />} />
          <Route path="/users" element={<Users />} />
          <Route path="/ProfileSetup" element={<ProfileSetup />} />  {/* <-- Added */}
          <Route path="/campusSetup" element={<CampusSetup />} /> 
          <Route path="/shiftSetup" element={<ShiftSetup />} /> 
          <Route path="/mediumSetup" element={<MediumSetup />} />
          <Route path="/educationLevelSetup" element={<EducationLevelSetup />} />
          <Route path="/departmentsSetup" element={<DepartmentsSetup />} />
          <Route path="/classSetup" element={<ClassSetup />} />
          <Route path="/sectionSetup" element={<SectionSetup />} />
          <Route path="/subjectSetup" element={<SubjectSetup />} />
          <Route path="/sessionSetup" element={<SessionSetup />} />
          <Route path="/subjectSubType" element={<SubjectSubType />} />
          <Route path="/classSubjects" element={<ClassSubjects />} />
          <Route path="/backgroundUpload" element={<BackgroundUpload />} />
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
