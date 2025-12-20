import React, { useState } from "react";
import "../../assets/styles/admin/studentSetup/archiveStudents.css";

const ArchiveStudents = () => {
  const [filters, setFilters] = useState({
    shift: "Day",
    medium: "Bangla",
    eduLevel: "Higher Secondary",
    department: "Science",
    className: "HSC-Science",
    section: "1st Year",
    session: "2025-2026",
    roll: "",
    studentCode: "",
  });

  const [students, setStudents] = useState([
    {
      sl: 1,
      shift: "Day",
      medium: "Bangla",
      eduLevel: "Higher Secondary",
      department: "Science",
      className: "HSC-Science",
      section: "1st Year",
      session: "2025-2026",
      studentCode: "2210607239",
      name: "SAIFUL ISLAM",
      classRoll: "1202526033046",
      active: true,
    },
    {
      sl: 2,
      shift: "Morning",
      medium: "English",
      eduLevel: "Higher Secondary",
      department: "Science",
      className: "HSC-Science",
      section: "1st Year",
      session: "2025-2026",
      studentCode: "2210662472",
      name: "MD. NASIMUL ISLAM RADOAN",
      classRoll: "1202526033047",
      active: false,
    },
    // Add more students as needed
  ]);

  const [showTable, setShowTable] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  // Filter students based on all filters
  const filteredStudents = students.filter((s) => {
    return (
      s.shift === filters.shift &&
      s.medium === filters.medium &&
      s.eduLevel === filters.eduLevel &&
      s.department === filters.department &&
      s.className === filters.className &&
      s.section === filters.section &&
      s.session === filters.session &&
      (filters.roll === "" || s.classRoll.includes(filters.roll)) &&
      (filters.studentCode === "" || s.studentCode.includes(filters.studentCode))
    );
  });

  return (
    <div className="archive-students-page">
      <h2>Archive Students</h2>

      {/* Filters */}
      <div className="filters">
        <label>
          Shift:
          <select
            value={filters.shift}
            onChange={(e) => handleFilterChange("shift", e.target.value)}
          >
            <option>Day</option>
            <option>Morning</option>
          </select>
        </label>

        <label>
          Medium:
          <select
            value={filters.medium}
            onChange={(e) => handleFilterChange("medium", e.target.value)}
          >
            <option>Bangla</option>
            <option>English</option>
          </select>
        </label>

        <label>
          Edu. Level:
          <select
            value={filters.eduLevel}
            onChange={(e) => handleFilterChange("eduLevel", e.target.value)}
          >
            <option>Higher Secondary</option>
            <option>Secondary</option>
          </select>
        </label>

        <label>
          Department:
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange("department", e.target.value)}
          >
            <option>Science</option>
            <option>Arts</option>
          </select>
        </label>

        <label>
          Class:
          <select
            value={filters.className}
            onChange={(e) => handleFilterChange("className", e.target.value)}
          >
            <option>HSC-Science</option>
            <option>HSC-Arts</option>
          </select>
        </label>

        <label>
          Section:
          <select
            value={filters.section}
            onChange={(e) => handleFilterChange("section", e.target.value)}
          >
            <option>1st Year</option>
            <option>2nd Year</option>
          </select>
        </label>

        <label>
          Session:
          <select
            value={filters.session}
            onChange={(e) => handleFilterChange("session", e.target.value)}
          >
            <option>2025-2026</option>
            <option>2026-2027</option>
          </select>
        </label>

        <label>
          Roll:
          <input
            type="text"
            placeholder="Enter Roll"
            value={filters.roll}
            onChange={(e) => handleFilterChange("roll", e.target.value)}
          />
        </label>

        <label>
          Student Code:
          <input
            type="text"
            placeholder="Enter Student Code"
            value={filters.studentCode}
            onChange={(e) => handleFilterChange("studentCode", e.target.value)}
          />
        </label>

        <button className="view-btn" onClick={() => setShowTable(true)}>
          View
        </button>
      </div>

      {/* Student Table */}
      {showTable && (
        <div className="student-table">
          <table>
            <thead>
              <tr>
                <th>SL #</th>
                <th>Shift</th>
                <th>Medium</th>
                <th>Education Level</th>
                <th>Department</th>
                <th>Class Name</th>
                <th>Section</th>
                <th>Session</th>
                <th>Student Code</th>
                <th>Student Name</th>
                <th>Class Roll Number</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => (
                  <tr key={s.studentCode}>
                    <td>{s.sl}</td>
                    <td>{s.shift}</td>
                    <td>{s.medium}</td>
                    <td>{s.eduLevel}</td>
                    <td>{s.department}</td>
                    <td>{s.className}</td>
                    <td>{s.section}</td>
                    <td>{s.session}</td>
                    <td>{s.studentCode}</td>
                    <td>{s.name}</td>
                    <td>{s.classRoll}</td>
                    <td>{s.active ? "Yes" : "No"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" style={{ textAlign: "center" }}>
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ArchiveStudents;
