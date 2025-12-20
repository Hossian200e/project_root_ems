import React, { useState } from "react";
import "../../assets/styles/admin/teacherSetup/uploadLectureSheet.css";

const UploadLectureSheet = () => {
  const [filters, setFilters] = useState({
    eduLevel: "",
    department: "",
    className: "",
    section: "",
    session: "",
  });

  const [lectureSheets, setLectureSheets] = useState([
    {
      campus: "Mohammadpur Kendriya College",
      shift: "Day",
      medium: "Bangla",
      eduLevel: "Higher Secondary",
      department: "Science",
      className: "HSC-Science",
      section: "1st Year",
      session: "2025-2026",
      file: null,
    },
    {
      campus: "Mohammadpur Kendriya College",
      shift: "Day",
      medium: "Bangla",
      eduLevel: "Higher Secondary",
      department: "Science",
      className: "HSC-Science",
      section: "2nd Year",
      session: "2025-2026",
      file: null,
    },
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredSheets = lectureSheets.filter(
    (sheet) =>
      (filters.eduLevel === "" || sheet.eduLevel === filters.eduLevel) &&
      (filters.department === "" || sheet.department === filters.department) &&
      (filters.className === "" || sheet.className === filters.className) &&
      (filters.section === "" || sheet.section === filters.section) &&
      (filters.session === "" || sheet.session === filters.session)
  );

  const handleFileUpload = (index, event) => {
    const file = event.target.files[0];
    setLectureSheets((prev) => {
      const newSheets = [...prev];
      newSheets[index].file = file;
      return newSheets;
    });
  };

  const handleView = (sheet) => {
    if (!sheet.file) {
      alert("No file uploaded for this lecture sheet.");
      return;
    }
    alert(`Viewing uploaded file: ${sheet.file.name}`);
  };

  const handleAddLectureSheet = () => {
    setLectureSheets((prev) => [
      ...prev,
      {
        campus: "Mohammadpur Kendriya College",
        shift: "Day",
        medium: "Bangla",
        eduLevel: "",
        department: "",
        className: "",
        section: "",
        session: "",
        file: null,
      },
    ]);
  };

  return (
    <div className="lecture-sheet-container">
      <h2>Lecture Sheet</h2>

      <div className="lecture-sheet-filters">
        <label>Edu. Level</label>
        <select name="eduLevel" value={filters.eduLevel} onChange={handleFilterChange}>
          <option value="">Select Edu Level</option>
          <option value="Higher Secondary">Higher Secondary</option>
          <option value="Graduate">Graduate</option>
        </select>

        <label>Department</label>
        <select name="department" value={filters.department} onChange={handleFilterChange}>
          <option value="">Select Department</option>
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
          <option value="Commerce">Commerce</option>
          <option value="Business">Business</option>
        </select>

        <label>Class</label>
        <select name="className" value={filters.className} onChange={handleFilterChange}>
          <option value="">Select Class</option>
          <option value="HSC-Science">HSC-Science</option>
          <option value="HSC-Arts">HSC-Arts</option>
          <option value="HSC-Commerce">HSC-Commerce</option>
        </select>

        <label>Section</label>
        <select name="section" value={filters.section} onChange={handleFilterChange}>
          <option value="">Select Section</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
        </select>

        <label>Session</label>
        <select name="session" value={filters.session} onChange={handleFilterChange}>
          <option value="">Select Session</option>
          <option value="2025-2026">2025-2026</option>
          <option value="2024-2025">2024-2025</option>
        </select>
      </div>

      <button className="add-btn" onClick={handleAddLectureSheet}>
        Add Lecture Sheet
      </button>

      <div className="lecture-sheet-list">
        <h3>Lecture Sheet List</h3>
        <p><strong>Campus:</strong> Mohammadpur Kendriya College</p>

        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Campus</th>
              <th>Shift</th>
              <th>Medium</th>
              <th>Edu. Level</th>
              <th>Department</th>
              <th>Class</th>
              <th>Section</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSheets.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>No records found</td>
              </tr>
            ) : (
              filteredSheets.map((sheet, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{sheet.campus}</td>
                  <td>{sheet.shift}</td>
                  <td>{sheet.medium}</td>
                  <td>{sheet.eduLevel || <i>Not selected</i>}</td>
                  <td>{sheet.department || <i>Not selected</i>}</td>
                  <td>{sheet.className || <i>Not selected</i>}</td>
                  <td>{sheet.section || <i>Not selected</i>}</td>
                  <td>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id={`upload-${index}`}
                      onChange={(e) => handleFileUpload(index, e)}
                    />
                    <label htmlFor={`upload-${index}`} className="action-btn upload">
                      Upload
                    </label>
                    <button className="action-btn view" onClick={() => handleView(sheet)}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadLectureSheet;
