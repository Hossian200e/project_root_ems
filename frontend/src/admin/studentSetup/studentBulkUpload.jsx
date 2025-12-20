import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../../assets/styles/admin/studentSetup/studentBulkUpload.css";

const StudentBulkUpload = () => {
  const [filters, setFilters] = useState({
    shift: "",
    medium: "",
    eduLevel: "",
    department: "",
    className: "",
  });

  const [file, setFile] = useState(null);

  /* ================= DUMMY OPTIONS ================= */
  const shifts = ["Day", "Morning", "Evening"];
  const mediums = ["Bangla", "English"];
  const eduLevels = ["Higher Secondary", "Secondary"];
  const departments = ["Science", "Humanities", "Business"];
  const classes = ["HSC-Science", "HSC-Humanities", "HSC-Business"];

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select an Excel file to upload!");
      return;
    }
    alert(`Uploading: ${file.name}\nFilters: ${JSON.stringify(filters)}`);
    // TODO: Add API upload logic here
  };

  /* ================= DOWNLOAD EXCEL ================= */
  const handleDownload = () => {
    const { shift, medium, eduLevel, department, className } = filters;

    if (!shift || !medium || !eduLevel || !department || !className) {
      alert("Please select all filters to download the Excel sheet.");
      return;
    }

    // Dummy data for Excel
    const data = Array.from({ length: 10 }, (_, i) => ({
      "Student Name": "",
      "Roll No": "",
      "Student Code": "",
      "Gender": "",
      "Religion": "",
      "Father Name": "",
      "Mother Name": "",
      "Contact No": "",
      Shift: shift,
      Medium: medium,
      "Edu Level": eduLevel,
      Department: department,
      Class: className,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, `Student_Bulk_${eduLevel}_${department}_${className}.xlsx`);
  };

  return (
    <div className="student-bulk-upload-page">

      {/* ================= BREADCRUMB ================= */}
      <div className="breadcrumb">
        <span>Dashboard</span> / 
        <span> Students Setup</span> / 
        <span className="active"> Student Bulk Upload</span>
      </div>

      <div className="page-header">
        <h2>Student Bulk Upload</h2>
      </div>

      {/* ================= BULK EXCEL SHEET GENERATE ================= */}
      <div className="bulk-excel-card">
        <h3>Bulk Student Excel Sheet Generate</h3>
        <div className="filter-grid">

          <div className="form-group">
            <label>Shift *</label>
            <select name="shift" value={filters.shift} onChange={handleChange}>
              <option value="">Select Shift</option>
              {shifts.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Medium *</label>
            <select name="medium" value={filters.medium} onChange={handleChange}>
              <option value="">Select Medium</option>
              {mediums.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Edu. Level *</label>
            <select name="eduLevel" value={filters.eduLevel} onChange={handleChange}>
              <option value="">Select Edu. Level</option>
              {eduLevels.map((e) => <option key={e}>{e}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Department *</label>
            <select name="department" value={filters.department} onChange={handleChange}>
              <option value="">Select Department</option>
              {departments.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Class *</label>
            <select name="className" value={filters.className} onChange={handleChange}>
              <option value="">Select Class</option>
              {classes.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

        </div>
        <button className="btn-download" onClick={handleDownload}>Download Excel Sheet</button>
      </div>

      {/* ================= BULK FILE UPLOAD ================= */}
      <div className="bulk-upload-card">
        <h3>Bulk School Student Upload</h3>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <span className="file-name">{file ? file.name : "No file chosen"}</span>
        <button className="btn-upload" onClick={handleUpload}>Upload Excel Sheet</button>
      </div>

    </div>
  );
};

export default StudentBulkUpload;
