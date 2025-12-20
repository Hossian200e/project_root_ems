import React, { useState } from "react";
import * as XLSX from "xlsx";
import "../../assets/styles/admin/studentSetup/bulkStudentUpdate.css";

const BulkStudentUpdate = () => {
  const [filters, setFilters] = useState({
    eduLevel: "",
    department: "",
    className: "",
    section: "",
    session: "",
  });

  const [file, setFile] = useState(null);

  // Dummy student data based on filters
  const getStudentData = () => {
    return [
      {
        studentId: "S001",
        fullName: "John Doe",
        class: filters.className || "HSC-Science",
        section: filters.section || "1st Year",
        session: filters.session || "2025-2026",
        gender: "Male",
      },
      {
        studentId: "S002",
        fullName: "Jane Smith",
        class: filters.className || "HSC-Science",
        section: filters.section || "1st Year",
        session: filters.session || "2025-2026",
        gender: "Female",
      },
    ];
  };

  // Export Excel
  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(getStudentData());
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "Student_Update.xlsx");
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Read uploaded Excel
  const handleUploadExcel = () => {
    if (!file) return alert("Please select a file first");

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const updatedData = XLSX.utils.sheet_to_json(sheet);
      console.log("Uploaded Excel Data:", updatedData);
      alert("Excel uploaded successfully! Check console for data.");
      // TODO: send updatedData to backend API for updating students
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="bulk-student-update">
      <h2>Bulk Student Update</h2>

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
            <option value="HSC">HSC</option>
            <option value="SSC">SSC</option>
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
            <option value="Arts">Arts</option>
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
            <option value="HSC-Arts">HSC-Arts</option>
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
            <option value="2nd Year">2nd Year</option>
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
            <option value="">Select session</option>
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
          </select>
        </label>
      </div>

      <div className="buttons">
        <button onClick={handleDownloadExcel}>Download Excel</button>

        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button onClick={handleUploadExcel}>Upload Excel</button>
      </div>
    </div>
  );
};

export default BulkStudentUpdate;
