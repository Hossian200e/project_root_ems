import React, { useState } from "react";
import "../../../assets/styles/admin/layoutPage/components/Sidebar.css";
const defaultLogo = "https://via.placeholder.com/100x100.png?text=Logo";

import { Link } from "react-router-dom";





const Sidebar = () => {
  const instituteName = localStorage.getItem("institute_name_en") || "Institute Name";
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleMenu = (key) => {
    setActiveMenu((prev) => (prev === key ? null : key));
    setActiveSubMenu(null); // close nested when switching
  };

  const toggleSubMenu = (key) => {
    setActiveSubMenu((prev) => (prev === key ? null : key));
  };

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
             <img 
          src={defaultLogo} 
          className="sidebar-logo"
        />
        <h3>{instituteName}</h3>
      </div>

      <div className="menu-heading">MAIN MENU</div>

      <nav>
        <ul>
          {/* SL 1 → User Management */}
          <li className={`dropdown ${activeMenu === "user" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("user")}>
              <i className="fa fa-users" /> User Management
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "user" && (
              <ul className="submenu">
                <li><Link to="/UserGroupList" className="menu-link">User Group List</Link></li>
                <li><Link to="/UserRoleGroupManagement" className="menu-link">User Role Group Management</Link></li>
              </ul>
            )}
          </li>

          {/* SL 2 → System Management */}
          <li className={`dropdown ${activeMenu === "system" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("system")}>
              <i className="fa fa-cogs" /> System Management
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "system" && (
              <ul className="submenu">
                <li><Link to="/task" className="menu-link">Task</Link></li>
                <li><Link to="/users" className="menu-link">Users</Link></li>
              </ul>
            )}
          </li>

          {/* SL 3 → Dashboard */}
          <li>
           <Link to="/AdminDashboard" className="menu-link"> 
           <i className="fa fa-home" /> Dashboard
           </Link>
         </li>

          {/* SL 4 → Global Configurations */}
          <li className={`dropdown ${activeMenu === "global" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("global")}>
              <i className="fa fa-globe" /> Global Configurations
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>

            {activeMenu === "global" && (
              <ul className="submenu">
                <li className={`dropdown ${activeSubMenu === "institute" ? "open" : ""}`}>
                  <div className="dropdown-label" onClick={() => toggleSubMenu("institute")}>
                    Institute Setup
                    <span className="arrow"><i className="fa fa-chevron-right" /></span>
                  </div>

                  {activeSubMenu === "institute" && (
                    <ul className="submenu sub-submenu">
                      <li><Link to="/ProfileSetup" className="menu-link">Profile Setup</Link></li>
                      <li><Link to="/CampusSetup" className="menu-link">Campus Setup</Link></li>
                      <li><Link to="/ShiftSetup" className="menu-link">Shift Setup</Link></li>
                      <li><Link to="/MediumSetup" className="menu-link">Medium Setup</Link></li>
                      <li><Link to="/EducationLevelSetup" className="menu-link">Education Level Setup</Link></li>
                      <li><Link to="/DepartmentsSetup" className="menu-link">Department Setup</Link></li>
                      
                      <li><Link to="/ClassSetup" className="menu-link">Class Setup</Link></li>
                      <li><Link to="/SectionSetup" className="menu-link">Section Setup</Link></li>
                      <li><Link to="/SubjectSetup" className="menu-link">Subject Setup</Link></li>
                      <li><Link to="/SessionSetup" className="menu-link">Session Setup</Link></li>
                      <li><Link to="/SubjectSubType" className="menu-link">Subject Sub Type</Link></li>
                      <li><Link to="/ClassSubjects" className="menu-link">Class Subjects </Link></li>
                      <li><Link to="/BackgroundUpload" className="menu-link">Background Upload  </Link></li>
                      <li><Link to="/designationSetup" className="menu-link">Designation Setup  </Link></li>
                      <li><Link to="/PaymentGatewayAPI" className="menu-link">Payment Gateway API  </Link></li>
                      <li><Link to="/GatewayChargeConfig" className="menu-link">Payment Gateway Charge  </Link></li>
                    </ul>
                  )}
                </li>
                <li><a href="#">Global Settings</a></li>
                <li><a href="#">Clear Cache</a></li>
              </ul>
            )}
          </li>


          {/* SL 4 → Accounts */}
          <li className={`dropdown ${activeMenu === "Accounts" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Accounts")}>
              <i className="fa fa-file-invoice" /> Accounts
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>

            {activeMenu === "Accounts" && (
              <ul className="submenu">
                <li className={`dropdown ${activeSubMenu === "Configurations" ? "open" : ""}`}>
                  <div className="dropdown-label" onClick={() => toggleSubMenu("Configurations")}>
                    Configurations
                    <span className="arrow"><i className="fa fa-chevron-right" /></span>
                  </div>

                  {activeSubMenu === "Configurations" && (
                    <ul className="submenu sub-submenu">
                      <li><a href="#">Transaction Type </a></li>
                      <li><a href="#">Transaction Head</a></li>
                      <li><a href="#">Fee Collection Template</a></li>
                      <li><a href="#">Invoice Config.</a></li>
                      <li><a href="#">Discount Config.</a></li>
                      <li><a href="#">Account Closing</a></li>
                      <li><a href="#">Fine</a></li>
                      <li><a href="#">Due (New)</a></li>
                    </ul>
                  )}
                </li>
   <li className={`dropdown ${activeSubMenu === "Income" ? "open" : ""}`}>
        <div className="dropdown-label" onClick={() => toggleSubMenu("Income")}>
           Collection
          <span className="arrow"><i className="fa fa-chevron-right" /></span>
        </div>

        {activeSubMenu === "Income" && (
          <ul className="submenu sub-submenu">
            <li><a href="#">Manual Fee Collection</a></li>
            <li><a href="#">Others Income</a></li>
            <li><a href="#">Unpaid Students</a></li>
            <li><a href="#">Extra Fee Collection</a></li>
            <li><a href="#">Bank Fee Collection</a></li>
            <li><a href="#">Manual Fee Payment List</a></li>
            <li><a href="#">Extra Fee Collection Request List</a></li>
          </ul>
        )}
      </li>

         <li className={`dropdown ${activeSubMenu === "Expenses" ? "open" : ""}`}>
        <div className="dropdown-label" onClick={() => toggleSubMenu("Expenses")}>
           Expenses
          <span className="arrow"><i className="fa fa-chevron-right" /></span>
        </div>

        {activeSubMenu === "Expenses" && (
          <ul className="submenu sub-submenu">
            <li><a href="#">Teachers Salary</a></li>
            <li><a href="#">Others Expenses</a></li>
          </ul>
        )}
      </li>

         <li className={`dropdown ${activeSubMenu === "Reports" ? "open" : ""}`}>
        <div className="dropdown-label" onClick={() => toggleSubMenu("Reports")}>
           Reports
          <span className="arrow"><i className="fa fa-chevron-right" /></span>
        </div>

        {activeSubMenu === "Reports" && (
          <ul className="submenu sub-submenu">
            <li><a href="#">Invoice List (New)</a></li>
            <li><a href="#">Total Collection Reports</a></li>
            <li><a href="#">Monthly Fee</a></li>
            <li><a href="#">Monthly Balance Sheet</a></li>
            <li><a href="#">Student Balance Sheet</a></li>
            <li><a href="#">Class Wise Balance Sheet</a></li>
            <li><a href="#">Admission Fee Student</a></li>
            <li><a href="#">Apply For Admission</a></li>
            <li><a href="#">Event Payment Summary</a></li>
            <li><a href="#">Transaction Summary Report</a></li>

          </ul>
        )}
      </li>      

              </ul>
              
            )}
          </li>          

          {/* SL 6 → Teacher & Staff */}
          <li className={`dropdown ${activeMenu === "teacher" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("teacher")}>
              <i className="fa fa-user-tie" /> Teacher & Staff
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "teacher" && (
              <ul className="submenu">
                <li><a href="#">Add Teacher</a></li>
                <li><a href="#">Teacher List</a></li>
              </ul>
            )}
          </li>

          {/* SL 7 → Student Setup */}
          <li className={`dropdown ${activeMenu === "student" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("student")}>
              <i className="fa fa-user-graduate" /> Student Setup
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "student" && (
              <ul className="submenu">
                <li><Link to="/AddSingleStudent" className="menu-link">Add Single Student</Link></li>
                <li><Link to="/StudentList" className="menu-link"> Students List</Link></li>
                <li><Link to="/StudentListPrint" className="menu-link"> Students List Print</Link></li>
                <li><Link to="/StudentBulkUpload" className="menu-link"> Student Bulk Upload</Link></li>
              </ul>
            )}
          </li>

          {/*SMS Setup */}
          <li className={`dropdown ${activeMenu === "sms" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("sms")}>
              <i className="fa fa-sms" /> SMS Setup
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "sms" && (
              <ul className="submenu">
                <li><a href="#">Sent SMS </a></li>
                <li><a href="#">SMS Reports</a></li>
                <li><a href="#">SMS API Configurations</a></li>
                <li><a href="#">SMS Template Setup</a></li>
                <li><a href="#">Student Bulk SMS </a></li>
                <li><a href="#">Teacdher Bulk SMS </a></li>
                <li><a href="#">Bulk SMS Mixed</a></li>
              </ul>
            )}
          </li>

          {/*Candidates */}
          <li className={`dropdown ${activeMenu === "candidates" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("candidates")}>
              <i className="fa fa-users" />Candidates
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "candidates" && (
              <ul className="submenu">
                <li><a href="#">Applicant List</a></li>
                <li><a href="#">Admissions Applicable Candidate(New)</a></li>
              </ul>
            )}
          </li>

          {/*calendar view */}
          <li className={`dropdown ${activeMenu === "calendar" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("calendar")}>
              <i className="fa fa-calendar" /> Calendar View
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "calendar" && (
              <ul className="submenu">
                <li><a href="#">Academic</a></li>
                <li><a href="#">Event</a></li>
              </ul>
            )}
          </li>

          {/*Class Routine*/}
          <li className={`dropdown ${activeMenu === "class_Routine" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("class_Routine")}>
              <i className="fa fa-table" /> Class Routine
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "class_Routine" && (
              <ul className="submenu">
                <li><a href="#">Class Preiod</a></li>
                <li><a href="#">Class Routine</a></li>
              </ul>
            )}
          </li>



          {/* SL 4 → Exam & Result */}
          <li className={`dropdown ${activeMenu === "Exam_Result" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Exam_Result")}>
              <i className="fa fa-graduation-cap" /> Exam & Result
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>

            {activeMenu === "Exam_Result" && (
              <ul className="submenu">
                <li className={`dropdown ${activeSubMenu === "Exam_Setup" ? "open" : ""}`}>
                  <div className="dropdown-label" onClick={() => toggleSubMenu("Exam_Setup")}>
                    Exam Setup
                    <span className="arrow"><i className="fa fa-chevron-right" /></span>
                  </div>

                  {activeSubMenu === "Exam_Setup" && (
                    <ul className="submenu sub-submenu">
                      <li><a href="#">Exam Teplate </a></li>
                      <li><a href="#">Exam List</a></li>
                      <li><a href="#">Sub Subject List</a></li>
                    </ul>
                  )}
                </li>
   <li className={`dropdown ${activeSubMenu === "Result_Setup" ? "open" : ""}`}>
        <div className="dropdown-label" onClick={() => toggleSubMenu("Result_Setup")}>
           Result Setup
          <span className="arrow"><i className="fa fa-chevron-right" /></span>
        </div>

        {activeSubMenu === "Result_Setup" && (
          <ul className="submenu sub-submenu">
            <li><a href="#">Pass Config.</a></li>
            <li><a href="#">Result Config.</a></li>
            <li><a href="#">Merite Config.</a></li>
            <li><a href="#">Grade Point</a></li>
          </ul>
        )}
      </li>

         <li className={`dropdown ${activeSubMenu === "Mark_Entry_System" ? "open" : ""}`}>
        <div className="dropdown-label" onClick={() => toggleSubMenu("Mark_Entry_System")}>
           Mark Entry System
          <span className="arrow"><i className="fa fa-chevron-right" /></span>
        </div>

        {activeSubMenu === "Mark_Entry_System" && (
          <ul className="submenu sub-submenu">
            <li><a href="#">Mark Entry</a></li>
            <li><a href="#">Mark Entry Format</a></li>
            <li><a href="#">Teachers Mark Entry</a></li>
          </ul>
        )}
      </li>

        <li className={`dropdown ${activeSubMenu === "Result_Process" ? "open" : ""}`}>
        <div className="dropdown-label" onClick={() => toggleSubMenu("Result_Process")}>
          Result Process
          <span className="arrow"><i className="fa fa-chevron-right" /></span>
        </div>

        {activeSubMenu === "Result_Process" && (
          <ul className="submenu sub-submenu">
            <li><a href="#">Process Result</a></li>
            <li><a href="#">Processed Exam List</a></li>
            <li><a href="#">Result Archive</a></li>
            <li><a href="#">Archive Result List</a></li>

          </ul>
        )}
      </li>      

         <li className={`dropdown ${activeSubMenu === "Reports" ? "open" : ""}`}>
        <div className="dropdown-label" onClick={() => toggleSubMenu("Reports")}>
           Expenses
          <span className="arrow"><i className="fa fa-chevron-right" /></span>
        </div>

        {activeSubMenu === "Reports" && (
          <ul className="submenu sub-submenu">
            <li><a href="#">Minimal Admit Card</a></li>
            <li><a href="#">Admit Card Overviwe</a></li>
            <li><a href="#">Marksheets</a></li>
            <li><a href="#">Result Summary</a></li>
            <li><a href="#">Combied Result </a></li>
            <li><a href="#">Subject Wise Result</a></li>
            <li><a href="#">Tabulation Sheet</a></li>
            <li><a href="#">Exam Mark View</a></li>
            <li><a href="#">Admid Card</a></li>

          </ul>
        )}
      </li>      

              </ul>
              
            )}
          </li>          



          {/*Lesson Plan*/}
          <li className={`dropdown ${activeMenu === "Lesson_Plan" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Lesson_Plan")}>
              <i className="fa fa-book-open" /> Lesson Plan
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "Lesson_Plan" && (
              <ul className="submenu">
                <li><a href="#">Plan</a></li>
                <li><a href="#">Reports</a></li>
              </ul>
            )}
          </li>  

          {/*Reports*/}
          <li className={`dropdown ${activeMenu === "Reports" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Reports")}>
              <i className="fa fa-chart-bar" /> Reports
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "Reports" && (
              <ul className="submenu">
                <li><a href="#">Attendance Reports</a></li>
                <li><a href="#">Subject Wise Student Att.</a></li>
                <li><a href="#">Student Taught List</a></li>
                <li><a href="#">Certificate Studise Print</a></li>
                <li><a href="#">SMS Sending Reports</a></li>
                <li><a href="#">Exam Seat Level List</a></li>
                <li><a href="#">Bus Student ID Card Print</a></li>
                <li><a href="#">Ekpay Transaction History Reports</a></li> 
              </ul>
            )}
          </li>  

          {/*Attendance*/}
          <li className={`dropdown ${activeMenu === "Attendance" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Attendance")}>
              <i className="fa fa-check-square" /> Attendance
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "Attendance" && (
              <ul className="submenu">
                <li><a href="#">Student Att. Time & Config.</a></li>
                <li><a href="#">Employee Att. Time & Config.</a></li>
                <li><a href="#">Student Manual Attendance</a></li>
                <li><a href="#">Special holiday Section</a></li>
              </ul>
            )}
          </li>  

          {/*Library*/}
          <li className={`dropdown ${activeMenu === "Library" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Library")}>
              <i className="fa fa-book" /> Library
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "Library" && (
              <ul className="submenu">
                <li><a href="#">Building Entry </a></li>
                <li><a href="#">Floor Entry</a></li>
                <li><a href="#">Block Entry</a></li>
                <li><a href="#">Book Shelf Entry</a></li>
                <li><a href="#">Book Shelf Cell Entry</a></li>
                <li><a href="#">Book Category Entry</a></li>
                <li><a href="#">Book Entry</a></li>
                <li><a href="#">Book Allocation</a></li>
              </ul>
            )}
          </li>     

          {/*Hostel*/}
          <li className={`dropdown ${activeMenu === "Hostel" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Hostel")}>
              <i className="fa fa-bed" /> Hostel
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "Hostel" && (
              <ul className="submenu">
                <li><a href="#">Room </a></li>
                <li><a href="#">Allocation</a></li>
              </ul>
            )}
          </li>       

          {/*Web Manager*/}
          <li className={`dropdown ${activeMenu === "Web_Manager" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Web_Manager")}>
              <i className="fa fa-globe" /> Web Manager
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "Web_Manager" && (
              <ul className="submenu">
                <li><a href="#">Page </a></li>
                <li><a href="#">News</a></li>
              </ul>
            )}
          </li>      

          {/*Certificates*/}
          <li className={`dropdown ${activeMenu === "Certificates" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Certificates")}>
              <i className="fa fa-certificate" /> Certificates
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "Certificates" && (
              <ul className="submenu">
                <li><a href="#">Transfer Certificate </a></li>
                <li><a href="#">Study Certificate</a></li>
                <li><a href="#">Manual Testimonial</a></li>
              </ul>
            )}
          </li> 

          {/*Settings*/}
          <li className={`dropdown ${activeMenu === "Settings" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Settings")}>
              <i className="fa fa-cog" /> Settings
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "Settings" && (
              <ul className="submenu">
                <li><a href="#">Payment Collection Config. </a></li>
                <li><a href="#">Admission Config.</a></li>
                <li><a href="#">Apply For Admission Config.</a></li>
                <li><a href="#">Admission Form Builder</a></li>
              </ul>
            )}
          </li>   


          {/*Leave Management*/}
          <li className={`dropdown ${activeMenu === "Leave_Management" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Leave_Management")}>
              <i className="fa fa-plane" /> Leave Management
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "Leave_Management" && (
              <ul className="submenu">
                <li><a href="#">Leave Requests </a></li>
                <li><a href="#">Approval</a></li>
                <li><a href="#">Leave Type</a></li>
                <li><a href="#">Leave Config.</a></li>
              </ul>
            )}
          </li> 

          {/*Download*/}
          <li className={`dropdown ${activeMenu === "Download" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Download")}>
              <i className="fa fa-download" /> Download
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "Download" && (
              <ul className="submenu">
                <li><a href="#">Reports</a></li>
                <li><a href="#">File</a></li>
              </ul>
            )}
          </li>   

          {/*Counseling*/}
          <li className={`dropdown ${activeMenu === "Counseling" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Counseling")}>
              <i className="fa fa-comments" /> Counseling
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "Counseling" && (
              <ul className="submenu">
                <li><a href="#">Sessions</a></li>
                <li><a href="#">Reports</a></li>
              </ul>
            )}
          </li>      


          {/*Certificate Management*/}
          <li className={`dropdown ${activeMenu === "Certificate_Management" ? "open" : ""}`}>
            <div className="dropdown-label" onClick={() => toggleMenu("Certificate_Management")}>
              <i className="fa fa-id-card" /> Certificate Management
              <span className="arrow"><i className="fa fa-chevron-right" /></span>
            </div>
            {activeMenu === "Certificate_Management" && (
              <ul className="submenu">
                <li><a href="#">Issue</a></li>
                <li><a href="#">Verify</a></li>
              </ul>
            )}
          </li>                                                                                                    

        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <p>Powered By: <b>ABC IT</b> ©2025</p>
      </div>
    </aside>
  );
};

export default Sidebar;
