import React, { useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import "../../assets/styles/admin/studentSetup/bulkCourseAdvising.css";

const BulkCourseAdvising = () => {
  const [filters, setFilters] = useState({
    eduLevel: "",
    department: "",
    className: "",
    section: "",
    session: "",
    student: "",
  });

  const [subjects, setSubjects] = useState({
    main: ["Bangla", "English", "Physics", "Chemistry", "ICT"],
    mainChoosable: "Biology",
    additional: "Higher Mathematics",
  });

  // Excel Download
  const handleExcelDownload = () => {
    const data = [
      {
        "Edu. Level": filters.eduLevel,
        Department: filters.department,
        Class: filters.className,
        Section: filters.section,
        Session: filters.session,
        Student: filters.student,
        "Main Subjects": subjects.main.join(", "),
        "Main Choosable": subjects.mainChoosable,
        Additional: subjects.additional,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CourseAdvising");
    XLSX.writeFile(workbook, "StudentCourseAdvising.xlsx");
  };

  // Excel Upload
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      
      // Map Excel to filters and subjects
      if (data.length > 1) {
        const row = data[1]; // Assuming first row is header
        setFilters({
          eduLevel: row[0] || "",
          department: row[1] || "",
          className: row[2] || "",
          section: row[3] || "",
          session: row[4] || "",
          student: row[5] || "",
        });
        setSubjects({
          main: row[6] ? row[6].split(", ") : ["Bangla", "English", "Physics", "Chemistry", "ICT"],
          mainChoosable: row[7] || "Biology",
          additional: row[8] || "Higher Mathematics",
        });
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="bulk-course-advising">
      <div className="header">
        <h2>Bulk/Single Student Course Advising</h2>
      </div>

      {/* Filters */}
      <div className="filters">
        {[
          { label: "Edu. Level", value: filters.eduLevel, options: ["Higher Secondary"], key: "eduLevel" },
          { label: "Department", value: filters.department, options: ["Science"], key: "department" },
          { label: "Class", value: filters.className, options: ["HSC-Science"], key: "className" },
          { label: "Section", value: filters.section, options: ["1st Year"], key: "section" },
          { label: "Session", value: filters.session, options: ["2025-2026"], key: "session" },
          { label: "Student", value: filters.student, options: ["[1202526033046] SAIFUL ISLAM"], key: "student" },
        ].map((filter) => (
          <label key={filter.key}>
            {filter.label}:
            <select
              value={filter.value}
              onChange={(e) => setFilters({ ...filters, [filter.key]: e.target.value })}
            >
              <option value="">Select {filter.label}</option>
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>
        ))}

        <div className="excel-actions">
          <label className="excel-upload">
            Excel File Upload
            <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} />
          </label>
          <button className="excel-download" onClick={handleExcelDownload}>
            <FaFileExcel /> Generate Excel
          </button>
        </div>
      </div>

      {/* Selected Student Course Advising */}
      {filters.student && (
        <div className="course-advising">
          <h3>Student Course Advising</h3>
          <p><strong>Student Roll:</strong> 1202526033046</p>
          <p><strong>Student ID:</strong> {filters.student}</p>

          <div className="subjects">
            <div className="subject-group">
              <label>Main (All 5 should be chosen)</label>
              <ul>
                {subjects.main.map((sub, idx) => <li key={idx}>{sub}</li>)}
              </ul>
            </div>

            <div className="subject-group">
              <label>Main Choosable (Choose any one)</label>
              <select
                value={subjects.mainChoosable}
                onChange={(e) => setSubjects({ ...subjects, mainChoosable: e.target.value })}
              >
                <option>Biology</option>
                <option>Higher Mathematics</option>
              </select>
            </div>

            <div className="subject-group">
              <label>Additional (4th Subject) (Choose any one)</label>
              <select
                value={subjects.additional}
                onChange={(e) => setSubjects({ ...subjects, additional: e.target.value })}
              >
                <option>Biology</option>
                <option>Higher Mathematics</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkCourseAdvising;
