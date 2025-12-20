import React, { useState } from "react";
import { FaPlus, FaFileExcel } from "react-icons/fa";
import "../../assets/styles/admin/studentSetup/studentCourseAdvising.css";

const StudentCourseAdvising = () => {
  const [activeTab, setActiveTab] = useState("individual"); // "individual" or "bulk"
  const [searchRoll, setSearchRoll] = useState("");
  const [filters, setFilters] = useState({
    eduLevel: "",
    department: "",
    className: "",
    section: "",
    session: "",
    student: "",
    excelFile: null,
  });

  const [individualCourses, setIndividualCourses] = useState({
    studentRoll: "",
    studentId: "",
    mainSubjects: ["Bangla", "English", "Physics", "Chemistry", "ICT"],
    mainChoosable: "Biology",
    additional: "Higher Mathematics",
  });

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    setFilters({ ...filters, excelFile: file });
    alert("Excel upload functionality coming soon!");
  };

  const handleExcelDownload = () => {
    alert("Excel download functionality coming soon!");
  };

  return (
    <div className="student-course-advising">
      <div className="header">
        <h2>Student Course Advising</h2>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "individual" ? "active" : ""}
          onClick={() => setActiveTab("individual")}
        >
          Individual Student Course Advising
        </button>
        <button
          className={activeTab === "bulk" ? "active" : ""}
          onClick={() => setActiveTab("bulk")}
        >
          Bulk/Single Student Course Advising
        </button>
      </div>

      {/* Individual Student Advising */}
      {activeTab === "individual" && (
        <div className="individual-advising">
          <div className="search-roll">
            <label>
              Student Roll / ID:
              <input
                type="text"
                value={searchRoll}
                onChange={(e) => setSearchRoll(e.target.value)}
                placeholder="Enter Student Roll / ID"
              />
            </label>
          </div>

          {searchRoll && (
            <div className="individual-course-details">
              <h3>Student Course Advising</h3>
              <p>
                <strong>Student Roll:</strong> {searchRoll}
              </p>
              <p>
                <strong>Student ID:</strong> Student ID
              </p>

              <div className="subjects">
                <div className="subject-group">
                  <label>Main (All 5 should be chosen)</label>
                  <ul>
                    {individualCourses.mainSubjects.map((sub, idx) => (
                      <li key={idx}>{sub}</li>
                    ))}
                  </ul>
                </div>

                <div className="subject-group">
                  <label>Main Choosable (Choose any one)</label>
                  <select
                    value={individualCourses.mainChoosable}
                    onChange={(e) =>
                      setIndividualCourses({
                        ...individualCourses,
                        mainChoosable: e.target.value,
                      })
                    }
                  >
                    <option value="Biology">Biology</option>
                    <option value="Higher Mathematics">Higher Mathematics</option>
                  </select>
                </div>

                <div className="subject-group">
                  <label>Additional (4th Subject) (Choose any one)</label>
                  <select
                    value={individualCourses.additional}
                    onChange={(e) =>
                      setIndividualCourses({
                        ...individualCourses,
                        additional: e.target.value,
                      })
                    }
                  >
                    <option value="Biology">Biology</option>
                    <option value="Higher Mathematics">Higher Mathematics</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bulk/Single Student Advising */}
      {activeTab === "bulk" && (
        <div className="bulk-advising">
          <div className="filters">
            <label>
              Edu. Level:
              <select
                value={filters.eduLevel}
                onChange={(e) =>
                  setFilters({ ...filters, eduLevel: e.target.value })
                }
              >
                <option value="">Select Edu. Level</option>
                <option value="Higher Secondary">Higher Secondary</option>
              </select>
            </label>

            <label>
              Department:
              <select
                value={filters.department}
                onChange={(e) =>
                  setFilters({ ...filters, department: e.target.value })
                }
              >
                <option value="">Select Department</option>
                <option value="Science">Science</option>
              </select>
            </label>

            <label>
              Class:
              <select
                value={filters.className}
                onChange={(e) =>
                  setFilters({ ...filters, className: e.target.value })
                }
              >
                <option value="">Select Class</option>
                <option value="HSC-Science">HSC-Science</option>
              </select>
            </label>

            <label>
              Section:
              <select
                value={filters.section}
                onChange={(e) =>
                  setFilters({ ...filters, section: e.target.value })
                }
              >
                <option value="">Select Section</option>
                <option value="1st Year">1st Year</option>
              </select>
            </label>

            <label>
              Session:
              <select
                value={filters.session}
                onChange={(e) =>
                  setFilters({ ...filters, session: e.target.value })
                }
              >
                <option value="">Select Session</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </label>

            <label>
              Student:
              <select
                value={filters.student}
                onChange={(e) =>
                  setFilters({ ...filters, student: e.target.value })
                }
              >
                <option value="">Select Student</option>
                <option value="[1202526033046] SAIFUL ISLAM">
                  [1202526033046] SAIFUL ISLAM
                </option>
              </select>
            </label>

            <div className="excel-actions">
              <label className="excel-upload">
                Excel File Upload
                <input type="file" onChange={handleExcelUpload} />
              </label>
              <button className="excel-download" onClick={handleExcelDownload}>
                <FaFileExcel /> Generate Excel
              </button>
            </div>
          </div>

          {/* Selected Student Course Advising */}
          {filters.student && (
            <div className="individual-course-details">
              <h3>Student Course Advising</h3>
              <p>
                <strong>Student Roll:</strong> 1202526033046
              </p>
              <p>
                <strong>Student ID:</strong> {filters.student}
              </p>

              <div className="subjects">
                <div className="subject-group">
                  <label>Main (All 5 should be chosen)</label>
                  <ul>
                    <li>Bangla</li>
                    <li>English</li>
                    <li>Physics</li>
                    <li>Chemistry</li>
                    <li>ICT</li>
                  </ul>
                </div>

                <div className="subject-group">
                  <label>Main Choosable (Choose any one)</label>
                  <select>
                    <option>Biology</option>
                    <option>Higher Mathematics</option>
                  </select>
                </div>

                <div className="subject-group">
                  <label>Additional (4th Subject) (Choose any one)</label>
                  <select>
                    <option>Biology</option>
                    <option>Higher Mathematics</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentCourseAdvising;
