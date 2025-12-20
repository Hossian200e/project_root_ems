import React, { useState } from "react";
import "../../assets/styles/admin/teacherSetup/bulkTeacherUpdate.css";

const BulkTeacherUpdate = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to update.");
      return;
    }
    console.log("Updating teachers with file:", file);
    // Handle bulk update logic here
  };

  const handleDownloadTemplate = () => {
    // Example: download update template Excel
    const link = document.createElement("a");
    link.href = "/bulk_teacher_update_template.xlsx"; // Make sure file exists in public folder
    link.download = "bulk_teacher_update_template.xlsx";
    link.click();
  };

  return (
    <div className="bulk-teacher-update-container">
      <h2>Bulk Teacher Update</h2>

      <div className="bulk-teacher-actions">
        <button className="download-btn" onClick={handleDownloadTemplate}>
          Download Update Template
        </button>
      </div>

      <form className="bulk-teacher-form" onSubmit={handleUpload}>
        <div className="form-row">
          <label>Select Excel File</label>
          <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
        </div>
        <button type="submit" className="upload-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default BulkTeacherUpdate;
