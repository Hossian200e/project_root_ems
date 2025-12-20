import React, { useState } from "react";
import "../../assets/styles/admin/teacherSetup/bulkTeacherUpload.css";

const BulkTeacherUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    console.log("Uploading file:", file);
    // Handle file upload logic here
  };

  const handleDownloadTemplate = () => {
    // Example: download a sample Excel template
    const link = document.createElement("a");
    link.href = "/sample_teacher_template.xlsx"; // Make sure file exists in public folder
    link.download = "teacher_upload_template.xlsx";
    link.click();
  };

  return (
    <div className="bulk-teacher-container">
      <h2>Bulk Teacher Upload</h2>

      <div className="bulk-teacher-actions">
        <button className="download-btn" onClick={handleDownloadTemplate}>
          Download Template
        </button>
      </div>

      <form className="bulk-teacher-form" onSubmit={handleUpload}>
        <div className="form-row">
          <label>Select Excel File</label>
          <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
        </div>
        <button type="submit" className="upload-btn">
          Upload
        </button>
      </form>
    </div>
  );
};

export default BulkTeacherUpload;
