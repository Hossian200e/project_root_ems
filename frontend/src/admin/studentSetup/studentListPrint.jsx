import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../../assets/styles/admin/studentSetup/studentListPrint.css";

const StudentListPrint = () => {
  /* ================= FILTER STATE ================= */
  const [filters, setFilters] = useState({
    shift: "",
    medium: "",
    eduLevel: "",
    department: "",
    className: "",
    section: "",
    session: "",
    gender: "",
    religion: "",
  });

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  /* ================= DUMMY OPTIONS ================= */
  const shifts = ["Day", "Morning", "Evening"];
  const mediums = ["Bangla", "English"];
  const eduLevels = ["Higher Secondary"];
  const departments = ["Science", "Humanities", "Business"];
  const classes = ["HSC-Science", "HSC-Humanities", "HSC-Business"];
  const sections = ["1st Year", "2nd Year"];
  const sessions = ["2025-2026", "2024-2025"];
  const genders = ["Male", "Female"];
  const religions = ["Islam", "Hinduism", "Christianity", "Buddhism"];

  /* ================= DUMMY STUDENT DATA ================= */
  const studentData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    shift: shifts[i % 3],
    medium: mediums[i % 2],
    image: "Logo",
    studentCode: `25140100300${i + 6}`,
    name: `Student ${i + 1}`,
    gender: genders[i % 2],
    religion: religions[i % 4],
    roll: 1000 + i,
    admRoll: 2000 + i,
    category: "General",
    regNo: 2210000000 + i,
    gpa: (4 + (i % 5) * 0.06).toFixed(2),
    fatherName: `Father ${i + 1}`,
    fatherIncome: ((i + 1) * 50000).toFixed(2),
    motherName: `Mother ${i + 1}`,
    guardianContact: `017100000${i}`,
    studentContact: `018200000${i}`,
    eduLevel: eduLevels[0],
    department: departments[i % 3],
    className: classes[i % 3],
    section: sections[i % 2],
    session: sessions[i % 2],
  }));

  useEffect(() => {
    setStudents(studentData);
    setFilteredStudents(studentData);
  }, []);

  /* ================= FILTER HANDLER ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= FILTER LOGIC ================= */
  useEffect(() => {
    const result = students.filter((s) => {
      return (
        (!filters.shift || s.shift === filters.shift) &&
        (!filters.medium || s.medium === filters.medium) &&
        (!filters.eduLevel || s.eduLevel === filters.eduLevel) &&
        (!filters.department || s.department === filters.department) &&
        (!filters.className || s.className === filters.className) &&
        (!filters.section || s.section === filters.section) &&
        (!filters.session || s.session === filters.session) &&
        (!filters.gender || s.gender === filters.gender) &&
        (!filters.religion || s.religion === filters.religion)
      );
    });
    setFilteredStudents(result);
  }, [filters, students]);

  /* ================= PRINT ================= */
  const handlePrint = () => {
    window.print();
  };

  /* ================= EXPORT EXCEL ================= */
  const handleDownloadExcel = () => {
    // Prepare data for Excel
    const exportData = filteredStudents.map((s, i) => ({
      SL: i + 1,
      Shift: s.shift,
      Medium: s.medium,
      "Student Code": s.studentCode,
      Name: s.name,
      Gender: s.gender,
      Religion: s.religion,
      Roll: s.roll,
      "Adm Roll": s.admRoll,
      Category: s.category,
      "Registration No.": s.regNo,
      "GPA/Class": s.gpa,
      "Father Name": s.fatherName,
      "Father Income": s.fatherIncome,
      "Mother Name": s.motherName,
      "Guardian Contact": s.guardianContact,
      "Student Contact": s.studentContact,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "StudentList.xlsx");
  };

  return (
    <div className="student-list-print-page">

      {/* ================= BREADCRUMB ================= */}
      <div className="breadcrumb">
        <span>Dashboard</span> / 
        <span> Students Setup</span> / 
        <span className="active"> Student List Print</span>
      </div>

      <div className="page-header">
        <h2>Student List Print</h2>
        <div className="header-buttons">
          <button className="btn-print" onClick={handlePrint}>🖨 Print</button>
          <button className="btn-download" onClick={handleDownloadExcel}>📥 Download Excel</button>
        </div>
      </div>

      {/* ================= FILTER FORM ================= */}
      <div className="print-filter-card">
        <div className="filter-grid">

          <div className="form-group">
            <label>Shift</label>
            <select name="shift" value={filters.shift} onChange={handleChange}>
              <option value="">Select Shift</option>
              {shifts.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Medium</label>
            <select name="medium" value={filters.medium} onChange={handleChange}>
              <option value="">Select Medium</option>
              {mediums.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Edu. Level</label>
            <select name="eduLevel" value={filters.eduLevel} onChange={handleChange}>
              <option value="">Select Edu. Level</option>
              {eduLevels.map((e) => <option key={e}>{e}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <select name="department" value={filters.department} onChange={handleChange}>
              <option value="">Select Department</option>
              {departments.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Class</label>
            <select name="className" value={filters.className} onChange={handleChange}>
              <option value="">Select Class</option>
              {classes.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Section</label>
            <select name="section" value={filters.section} onChange={handleChange}>
              <option value="">Select Section</option>
              {sections.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Session</label>
            <select name="session" value={filters.session} onChange={handleChange}>
              <option value="">Select Session</option>
              {sessions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={filters.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              {genders.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Religion</label>
            <select name="religion" value={filters.religion} onChange={handleChange}>
              <option value="">Select Religion</option>
              {religions.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

        </div>
      </div>

      {/* ================= COLLEGE INFO ================= */}
      <div className="college-info">
        <p><strong>College:</strong> Mohammadpur Kendriya College</p>
        <p><strong>Shift:</strong> {filters.shift || "Day"}, <strong>Medium:</strong> {filters.medium || "Bangla"}</p>
        <p><strong>Class:</strong> {filters.className || "HSC-Science"}, <strong>Section:</strong> {filters.section || "1st Year"}, <strong>Department:</strong> {filters.department || "Science"}</p>
        <p><strong>Session:</strong> {filters.session || "2025-2026"}</p>
      </div>

      {/* ================= TABLE ================= */}
      <div className="print-table-wrapper">
        <table className="print-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Shift</th>
              <th>Medium</th>
              <th>Std.Code</th>
              <th>Student Name</th>
              <th>Gender</th>
              <th>Religion</th>
              <th>Roll</th>
              <th>Adm.Roll</th>
              <th>Category</th>
              <th>Registration No.</th>
              <th>G.P.A/Class</th>
              <th>Father Name</th>
              <th>Father Income</th>
              <th>Mother Name</th>
              <th>Guardian Contact</th>
              <th>Std Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.shift}</td>
                <td>{s.medium}</td>
                <td>{s.studentCode}</td>
                <td>{s.name}</td>
                <td>{s.gender}</td>
                <td>{s.religion}</td>
                <td>{s.roll}</td>
                <td>{s.admRoll}</td>
                <td>{s.category}</td>
                <td>{s.regNo}</td>
                <td>{s.gpa}</td>
                <td>{s.fatherName}</td>
                <td>{s.fatherIncome}</td>
                <td>{s.motherName}</td>
                <td>{s.guardianContact}</td>
                <td>{s.studentContact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentListPrint;
