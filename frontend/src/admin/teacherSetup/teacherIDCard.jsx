import React, { useState } from "react";
import "../../assets/styles/admin/teacherSetup/teacherIDCard.css";

const TeacherIDCard = () => {
  const [filters, setFilters] = useState({
    teacherCode: "",
    printingType: "onlyDownload",
    formatType: "withBackground",
  });

  const [teachers] = useState([
    {
      code: "E000001",
      name: "Kumud Ranjan Biswas",
      designation: "Assistant Teacher",
      dob: "1970-01-01",
      mobile: "01700000000",
      department: "Science",
      eduLevel: "Higher Secondary",
      shift: "Day",
      subjects: ["Bangla", "Physics", "Chemistry"],
      photo: "", // empty uses default
    },
    {
      code: "E000002",
      name: "Md. Farhad Hossain",
      designation: "Assistant Teacher",
      dob: "1970-01-01",
      mobile: "01721367110",
      department: "Arts",
      eduLevel: "Higher Secondary",
      shift: "Day",
      subjects: ["English", "History"],
      photo: "https://via.placeholder.com/100", 
    },
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredTeachers = teachers.filter(
    (t) => filters.teacherCode === "" || t.code === filters.teacherCode
  );

  const handleDownload = (teacher) => {
    alert(`Downloading ID Card for ${teacher.name}`);
  };

  const handlePrint = (teacher) => {
    alert(`Printing ID Card for ${teacher.name}`);
  };

  return (
    <div className="teacher-id-container">
      <h2>Teacher ID Cards</h2>

      <div className="filters">
        <label>Teacher Name *</label>
        <select
          name="teacherCode"
          value={filters.teacherCode}
          onChange={handleFilterChange}
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t.code} value={t.code}>
              {t.code}-{t.name}
            </option>
          ))}
        </select>

        <label>Printing Type</label>
        <select
          name="printingType"
          value={filters.printingType}
          onChange={handleFilterChange}
        >
          <option value="onlyDownload">Only Download</option>
          <option value="printAndDownload">Print & Download</option>
        </select>

        <label>Format Type</label>
        <select
          name="formatType"
          value={filters.formatType}
          onChange={handleFilterChange}
        >
          <option value="withBackground">With Background Image</option>
          <option value="withoutBackground">Without Background</option>
        </select>
      </div>

      <div className="id-card-list">
        {filteredTeachers.length === 0 ? (
          <p style={{ textAlign: "center" }}>No teacher selected</p>
        ) : (
          filteredTeachers.map((teacher) => (
            <div key={teacher.code} className="id-card-wrapper">
              
              {/* Front Side */}
              <div className={`id-card front ${filters.formatType}`}>
                <div className="id-header">
                  <img
                    src="https://via.placeholder.com/50x50?text=Logo"
                    alt="School Logo"
                    className="school-logo"
                  />
                  <h4>Mohammadpur Kendriya College</h4>
                </div>
                <div className="id-card-photo">
                  <img
                    src={teacher.photo || "https://via.placeholder.com/100?text=Photo"}
                    alt={teacher.name}
                  />
                </div>
                <h3>{teacher.name}</h3>
                <p><strong>Designation:</strong> {teacher.designation}</p>
                <p><strong>Teacher Code:</strong> {teacher.code}</p>
                <p><strong>Department:</strong> {teacher.department}</p>
                <div className="id-footer">Edu. Level: {teacher.eduLevel} | Shift: {teacher.shift}</div>
              </div>

              {/* Back Side */}
              <div className={`id-card back ${filters.formatType}`}>
                <div className="id-header-back">Teacher Details</div>
                <p><strong>Date of Birth:</strong> {teacher.dob}</p>
                <p><strong>Mobile:</strong> {teacher.mobile}</p>
                <p><strong>Subjects:</strong> {teacher.subjects.join(", ")}</p>
                <div className="qr-placeholder">QR CODE</div>
                <div className="id-footer-back">Mohammadpur Kendriya College</div>
              </div>

              {/* Actions */}
              <div className="id-card-actions">
                {filters.printingType === "onlyDownload" && (
                  <button className="action-btn" onClick={() => handleDownload(teacher)}>Download</button>
                )}
                {filters.printingType === "printAndDownload" && (
                  <>
                    <button className="action-btn" onClick={() => handlePrint(teacher)}>Print</button>
                    <button className="action-btn" onClick={() => handleDownload(teacher)}>Download</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherIDCard;
