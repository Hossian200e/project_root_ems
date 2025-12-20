import React, { useState } from "react";
import "../../assets/styles/admin/studentSetup/studentIDCard.css";

const StudentIDCard = () => {
  const [filters, setFilters] = useState({
    eduLevel: "",
    department: "",
    className: "",
    section: "",
    session: "",
    studentName: "",
    rollFrom: "",
    rollTo: "",
    backPartType: "No",
    subjectCodeType: "No",
    addressType: "No",
  });

  const [students, setStudents] = useState([]);
  const [showCards, setShowCards] = useState(false);

  const dummyStudents = [
    {
      roll: "001",
      name: "Md. Hossain",
      fatherName: "Abdul Hossain",
      className: "HSC-Science",
      section: "1st Year",
      session: "2025-2026",
      eduLevel: "Higher Secondary",
      department: "Science",
      address: "Mohammadpur, Dhaka",
      subjectCode: "101",
    },
    {
      roll: "002",
      name: "Yeasin Arafat",
      fatherName: "Md. Shaikh",
      className: "HSC-Science",
      section: "1st Year",
      session: "2025-2026",
      eduLevel: "Higher Secondary",
      department: "Science",
      address: "Mirpur, Dhaka",
      subjectCode: "102",
    },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleShow = () => {
    const filtered = dummyStudents.filter((student) => {
      return (
        (!filters.studentName || student.name.includes(filters.studentName)) &&
        (!filters.rollFrom || parseInt(student.roll) >= parseInt(filters.rollFrom)) &&
        (!filters.rollTo || parseInt(student.roll) <= parseInt(filters.rollTo))
      );
    });
    setStudents(filtered);
    setShowCards(true);
  };

  return (
    <div className="student-idcard-container">
      <h2>Student ID Card</h2>

      <div className="filters">
        {[
          { label: "Edu. Level", name: "eduLevel", options: ["Higher Secondary"] },
          { label: "Department", name: "department", options: ["Science"] },
          { label: "Class", name: "className", options: ["HSC-Science"] },
          { label: "Section", name: "section", options: ["1st Year"] },
          { label: "Session", name: "session", options: ["2025-2026"] },
          { label: "Student Name", name: "studentName", input: true },
          { label: "Roll From", name: "rollFrom", input: true, type: "number" },
          { label: "Roll To", name: "rollTo", input: true, type: "number" },
          { label: "Back Part Type", name: "backPartType", options: ["No", "Yes"] },
          { label: "Subject Code Type", name: "subjectCodeType", options: ["No", "Yes"] },
          { label: "Address Type", name: "addressType", options: ["No", "Yes"] },
        ].map((f, idx) => (
          <div className="filter-group" key={idx}>
            <label>{f.label}</label>
            {f.input ? (
              <input
                type={f.type || "text"}
                placeholder={f.label}
                name={f.name}
                onChange={handleFilterChange}
              />
            ) : (
              <select name={f.name} onChange={handleFilterChange}>
                <option value="">Select {f.label}</option>
                {f.options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <div className="filter-group">
          <button onClick={handleShow}>Show</button>
        </div>
      </div>

      {showCards && (
        <div className="id-cards">
          {students.length === 0 && <p style={{ textAlign: "center" }}>No students found</p>}
          {students.map((student) => (
            <div className="id-card-double" key={student.roll}>
              {/* Front Side */}
              <div className="card-front">
                <h3>{student.name}</h3>
                <p>Roll: {student.roll}</p>
                <p>Father's Name: {student.fatherName}</p>
                <p>Class: {student.className}</p>
                <p>Section: {student.section}</p>
                <p>Session: {student.session}</p>
              </div>

              {/* Back Side */}
              <div className="card-back">
                {filters.subjectCodeType === "Yes" && <p>Subject Code: {student.subjectCode}</p>}
                {filters.addressType === "Yes" && <p>Address: {student.address}</p>}
                {filters.backPartType === "Yes" && <p>Back Part Info</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentIDCard;
