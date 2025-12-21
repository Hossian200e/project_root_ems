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
import DesignationSetup from "./admin/globalConfigurations/instituteSetup/designationSetup";
import PaymentGatewayAPI from "./admin/globalConfigurations/instituteSetup/paymentGatewayAPI";
import PaymentGatewayCharge from "./admin/globalConfigurations/instituteSetup/paymentGatewayCharge";
import GlobalSettings from "./admin/globalConfigurations/globalSettings";



import AddSingleStudent from "./admin/studentSetup/addSingleStudent";
import StudentList from "./admin/studentSetup/studentList";
import StudentListPrint from "./admin/studentSetup/studentListPrint";
import StudentBulkUpload from "./admin/studentSetup/studentBulkUpload";
import StudentCategories from "./admin/studentSetup/studentCategories";
import StudentRollPrefix from "./admin/studentSetup/studentRollPrefix";
import StudentCourseAdvising from "./admin/studentSetup/studentCourseAdvising";
import BulkCourseAdvising from "./admin/studentSetup/bulkCourseAdvising";
import StudentCountReport from "./admin/studentSetup/studentCountReport";
import BulkStudentUpdate from "./admin/studentSetup/bulkStudentUpdate";
import StudentPromotion from "./admin/studentSetup/studentPromotion";
import StudentMigration from "./admin/studentSetup/studentMigration";
import ArchiveStudents from "./admin/studentSetup/archiveStudents";
import StudentDetailsList from "./admin/studentSetup/studentDetailsList";
import StudentImageDownload from "./admin/studentSetup/studentImageDownload";
import SubjectWiseStudents from "./admin/studentSetup/subjectWiseStudents";
import RemoveDuplicateStudents from "./admin/studentSetup/removeDuplicateStudents";
import StudentIDCard from "./admin/studentSetup/studentIDCard";
import StudentListWithCategoryWise from "./admin/studentSetup/studentListWithCategoryWise";
import StudentToughtList from "./admin/studentSetup/studentToughtList";
import ShowAllStudent from "./admin/studentSetup/showAllStudent";


import AddTeacher from "./admin/teacherSetup/addTeacher";
import BulkTeacherUpload from "./admin/teacherSetup/bulkTeacherUpload";
import BulkTeacherUpdate from "./admin/teacherSetup/bulkTeacherUpdate";
import TeacherList from "./admin/teacherSetup/teacherList";
import DepartmentalHead from "./admin/teacherSetup/departmentalHead";
import TeacherCourseAdvising from "./admin/teacherSetup/teacherCourseAdvising";
import UploadLectureSheet from "./admin/teacherSetup/uploadLectureSheet";
import TeacherListPrint from "./admin/teacherSetup/teacherListPrint";
import SectionTeacherAdvising from "./admin/teacherSetup/sectionTeacherAdvising";
import LessonPlan from "./admin/teacherSetup/lessonPlan";
import TeacherIDCard from "./admin/teacherSetup/teacherIDCard";
import ClassTeacherAccountantAllocation from "./admin/teacherSetup/classTeacherAccountantAllocation";


import TransactionTypes from "./admin/accounts/configurations/transactionTypes";
import TransactionHead from "./admin/accounts/configurations/transactionHead";
import FeeCollectionTemplate from "./admin/accounts/configurations/feeCollectionTemplate";
import CreateFeeCollectionTemplate from "./admin/accounts/configurations/createFeeCollectionTemplate";
import FeeCollectionTemplateList from "./admin/accounts/configurations/feeCollectionTemplateList";
import FeeCollectionTemplateAllocations from "./admin/accounts/configurations/feeCollectionTemplateAllocations";
import InvoiceConfigurationAllocate from "./admin/accounts/configurations/invoiceConfigurationAllocate";
import InvoiceConfiguration from "./admin/accounts/configurations/invoiceConfiguration";
import DiscountConfig from "./admin/accounts/configurations/discountConfig";
import AddDiscount  from "./admin/accounts/configurations/addDiscount";
import AccountClosing  from "./admin/accounts/configurations/accountClosing";


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
          <Route path="/designationSetup" element={<DesignationSetup />} />
          <Route path="/paymentGatewayAPI" element={<PaymentGatewayAPI />} />
          <Route path="/paymentGatewayCharge" element={<PaymentGatewayCharge />} />
          <Route path="/globalSettings" element={<GlobalSettings />} />



          <Route path="/addSingleStudent" element={<AddSingleStudent />} />
          <Route path="/studentList" element={<StudentList />} />
          <Route path="/studentListPrint" element={<StudentListPrint />} />
          <Route path="/studentBulkUpload" element={<StudentBulkUpload />} />
          <Route path="/studentCategories" element={<StudentCategories />} />
          <Route path="/studentRollPrefix" element={<StudentRollPrefix />} />
          <Route path="/studentCourseAdvising" element={<StudentCourseAdvising />} />
          <Route path="/bulkCourseAdvising" element={<BulkCourseAdvising />} />
          <Route path="/studentCountReport" element={<StudentCountReport />} />
          <Route path="/bulkStudentUpdate" element={<BulkStudentUpdate />} />
          <Route path="/studentPromotion" element={<StudentPromotion />} />
          <Route path="/studentMigration" element={<StudentMigration />} />
          <Route path="/archiveStudents" element={<ArchiveStudents />} />
          <Route path="/studentDetailsList" element={<StudentDetailsList />} />
          <Route path="/studentImageDownload" element={<StudentImageDownload />} />
          <Route path="/subjectWiseStudents" element={<SubjectWiseStudents />} />
          <Route path="/removeDuplicateStudents" element={<RemoveDuplicateStudents />} />
          <Route path="/studentIDCard" element={<StudentIDCard />} />
          <Route path="/studentListWithCategoryWise" element={<StudentListWithCategoryWise />} />
          <Route path="/studentToughtList" element={<StudentToughtList />} />
          <Route path="/showAllStudent" element={<ShowAllStudent />} />


          <Route path="/addTeacher" element={<AddTeacher />} />
          <Route path="/bulkTeacherUpload" element={<BulkTeacherUpload />} />
          <Route path="/bulkTeacherUpdate" element={<BulkTeacherUpdate />} />
          <Route path="/teacherList" element={<TeacherList />} />
          <Route path="/departmentalHead" element={<DepartmentalHead />} />
          <Route path="/teacherCourseAdvising" element={<TeacherCourseAdvising />} />
          <Route path="/uploadLectureSheet" element={<UploadLectureSheet />} />
          <Route path="/teacherListPrint" element={<TeacherListPrint />} />
          <Route path="/sectionTeacherAdvising" element={<SectionTeacherAdvising />} />
          <Route path="/lessonPlan" element={<LessonPlan />} />
          <Route path="/teacherIDCard" element={<TeacherIDCard />} />
          <Route path="/classTeacherAccountantAllocation" element={<ClassTeacherAccountantAllocation />} />


          <Route path="/transactionTypes"element={<TransactionTypes />}/>
          <Route path="/transactionHead"element={<TransactionHead />}/>
          <Route path="/feeCollectionTemplate"element={<FeeCollectionTemplate />}/>
          <Route path="/feeCollectionTemplate/create" element={<CreateFeeCollectionTemplate />} />
          <Route path="/feeCollectionTemplate/template" element={<FeeCollectionTemplateList />} />
          <Route path="/feeCollectionTemplate/allocations" element={<FeeCollectionTemplateAllocations />} />
          <Route path="/feeCollectionTemplate/allocate" element={<InvoiceConfigurationAllocate />} />
          <Route path="/invoiceConfiguration" element={<InvoiceConfiguration />} />
          <Route path="/discountConfig" element={<DiscountConfig />} />
          <Route path="/discountConfig/addDiscount" element={<AddDiscount />} />
          <Route path="/accountClosing" element={<AccountClosing />} />


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
