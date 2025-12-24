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
import StudentFineConfig  from "./admin/accounts/configurations/studentFineConfig";
import PreviousDue  from "./admin/accounts/configurations/previousDue";

import ManualFeeCollection  from "./admin/accounts/income/manualFeeCollection";
import ManualFeeMakePayment  from "./admin/accounts/income/manualFeeMakePayment";
import ManualInvoice  from "./admin/accounts/income/manualInvoice";
import BankFeeCollection  from "./admin/accounts/income/bankFeeCollection";
import BankFeeMakePayment  from "./admin/accounts/income/bankFeeMakePayment";
import BankInvoice  from "./admin/accounts/income/bankInvoice";
import OtherIncome  from "./admin/accounts/income/otherIncome";
import OtherIncomeInvoice   from "./admin/accounts/income/otherIncomeInvoice";
import ExtraFeeCollection   from "./admin/accounts/income/extraFeeCollection";
import ExtraFeeInvoice from "./admin/accounts/income/extraFeeInvoice";
import AddIncome from "./admin/accounts/income/addIncome";

import TeacherSalary from "./admin/accounts/expenses/teacherSalary";
import OtherExpenses from "./admin/accounts/expenses/otherExpenses";

import InvoiceList from "./admin/accounts/reports/invoiceList";
import InvoiceListDetails from "./admin/accounts/reports/invoiceListDetails";
import InvoiceListSameSection from "./admin/accounts/reports/invoiceListSameSection";
import TotalCollectionReport from "./admin/accounts/reports/totalCollectionReport";
import MonthlyFeeReport from "./admin/accounts/reports/monthlyFeeReport";
import ManualPaymentList from "./admin/accounts/reports/manualPaymentList";
import OnlinePaymentList from "./admin/accounts/reports/onlinePaymentList";
import HeadWiseMonthlyFeeReport from "./admin/accounts/reports/headWiseMonthlyFeeReport";
import MonthlyBalanceSheet from "./admin/accounts/reports/monthlyBalanceSheet";
import StudentBalanceSheet from "./admin/accounts/reports/studentBalanceSheet";
import ClassWiseBalanceSheet from "./admin/accounts/reports/classWiseBalanceSheet";
import AdmissionFeeReport from "./admin/accounts/reports/admissionFeeReport";
import FormFillupPaymentReport from "./admin/accounts/reports/formFillupPaymentReport";
import AdmissionPaymentReport from "./admin/accounts/reports/admissionPaymentReport";
import AdmissionPaymentSummary from "./admin/accounts/reports/admissionPaymentSummary";
import AdmissionPaymentTransactionHead from "./admin/accounts/reports/admissionPaymentTransactionHead";
import AdmissionPaymentSummaryView  from "./admin/accounts/reports/admissionPaymentSummaryView";
import AdmissionPaymentSummaryTotalView  from "./admin/accounts/reports/admissionPaymentSummaryTotalView";
import ApplyForAdmission  from "./admin/accounts/reports/applyForAdmission";
import EventPaymentSummary  from "./admin/accounts/reports/eventPaymentSummary";
import TransactionSummaryReport  from "./admin/accounts/reports/transactionSummaryReport";
import ClassWiseCategoryReport  from "./admin/accounts/reports/classWiseCategoryReport";
import PaidUnpaidReport  from "./admin/accounts/reports/paidUnpaidReport";
import StudentPaymentDetails  from "./admin/accounts/reports/studentPaymentDetails";
import StudentPaymentHistories  from "./admin/accounts/reports/studentPaymentHistories";
import StudentFeeDiscountReport  from "./admin/accounts/reports/studentFeeDiscountReport";
import PaidReport  from "./admin/accounts/reports/paidReport";
import UnpaidReport  from "./admin/accounts/reports/UnpaidReport";


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
          <Route path="/studentFineConfig" element={<StudentFineConfig />} />
          <Route path="/previousDue" element={<PreviousDue />} />

          <Route path="/manualFeeCollection" element={<ManualFeeCollection />} />
          <Route path="/manualFeeCollection/makePayment" element={<ManualFeeMakePayment />} />
          <Route path="/manualFeeCollection/incoice" element={<ManualInvoice />} />
          <Route path="/bankFeeCollection" element={<BankFeeCollection />} />
          <Route path="/bankFeeCollection/makePayment" element={<BankFeeMakePayment />} />
          <Route path="/bankFeeCollection/incoice" element={<BankInvoice />} />
          <Route path="/otherIncome" element={<OtherIncome />} />
          <Route path="/otherIncome/invoice" element={<OtherIncomeInvoice />} />
          <Route path="/extraFeeCollection" element={<ExtraFeeCollection />} />
          <Route path="/extraFeeCollection/incoice" element={<ExtraFeeInvoice />} />
          <Route path="/addIncome" element={<AddIncome />} />

          <Route path="/teacherSalary" element={<TeacherSalary />} />
          <Route path="/otherExpenses" element={<OtherExpenses />} />

          <Route path="/invoiceList" element={<InvoiceList />} />
          <Route path="/invoiceListDetails" element={<InvoiceListDetails />} />
          <Route path="/invoiceListSameSection" element={<InvoiceListSameSection />} />
          <Route path="/totalCollectionReport" element={<TotalCollectionReport />} />
          <Route path="/monthlyFeeReport" element={<MonthlyFeeReport />} />
          <Route path="/manualPaymentList" element={<ManualPaymentList />} />
          <Route path="/onlinePaymentList" element={<OnlinePaymentList />} />
          <Route path="/headWiseMonthlyFeeReport" element={<HeadWiseMonthlyFeeReport />} />
          <Route path="/monthlyBalanceSheet" element={<MonthlyBalanceSheet />} />
          <Route path="/studentBalanceSheet" element={<StudentBalanceSheet />} />
          <Route path="/classWiseBalanceSheet" element={<ClassWiseBalanceSheet />} />
          <Route path="/admissionFeeReport" element={<AdmissionFeeReport />} />
          <Route path="/formFillupPaymentReport" element={<FormFillupPaymentReport />} />
          <Route path="/admissionPaymentReport" element={<AdmissionPaymentReport />} />
          <Route path="/admissionPaymentReport/paymentSummary/:id" element={<AdmissionPaymentSummary />} />
          <Route path="/admissionPaymentReport/transactionHead/:id" element={<AdmissionPaymentTransactionHead />} />
          <Route path="/admissionPaymentReport/paymentSummary/view/:id" element={<AdmissionPaymentSummaryView />} />
          <Route path="/admissionPaymentReport/paymentSummary/totalview/:id" element={<AdmissionPaymentSummaryTotalView />} />
          <Route path="/applyForAdmission" element={<ApplyForAdmission />} />
          <Route path="/eventPaymentSummary" element={<EventPaymentSummary />} />
          <Route path="/transactionSummaryReport" element={<TransactionSummaryReport />} />
          <Route path="/classWiseCategoryReport" element={<ClassWiseCategoryReport />} />
          <Route path="/paidUnpaidReport" element={<PaidUnpaidReport />} />
          <Route path="/studentPaymentDetails" element={<StudentPaymentDetails />} />
          <Route path="/studentPaymentHistories" element={<StudentPaymentHistories />} />
          <Route path="/studentFeeDiscountReport" element={<StudentFeeDiscountReport />} />
          <Route path="/paidReport" element={<PaidReport />} />
          <Route path="/unpaidReport" element={<UnpaidReport />} />
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
