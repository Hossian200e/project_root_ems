import React, { useState } from "react";
import { FaEye, FaFileExcel, FaPrint } from "react-icons/fa";
import * as XLSX from "xlsx";
import "../../assets/styles/admin/studentSetup/studentToughtList.css";

const StudentTaughtList = () => {
  // Sample student data
  const [students] = useState([
    {
      sl: 1,
      image: "/images/profile1.jpg",
      name: "Saiful Islam",
      father: "Md. Nuru Molla",
      mother: "Maksuda Akter",
      admissionDate: "09-09-2025",
      roll: "1202526033046",
      sscReg: "2210607239",
      sscYear: "2023-2024",
      sscBoard: "Dhaka Board",
      subjects: "Bangla (101,102) English (107,108) Physics (174,175) Chemistry (176,177) Biology (178) ICT (275) Higher Math (265,266)",
    },
    {
      sl: 2,
      image: "/images/profile2.jpg",
      name: "Md. Nasimul Islam Radoan",
      father: "Md. Zakir Hosen",
      mother: "Nasima Akter",
      admissionDate: "09-09-2025",
      roll: "1202526033047",
      sscReg: "2210662472",
      sscYear: "2023-2024",
      sscBoard: "Dhaka Board",
      subjects: "Bangla (101,102) English (107,108) Physics (174,175) Chemistry (176,177) Higher Math (265,266) ICT (275) Biology (178)",
    },
    // Add more students...
  ]);

  // Download Excel
  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students.map(s => ({
      "Sl.": s.sl,
      "Student Name": s.name,
      "Father's Name": s.father,
      "Mother's Name": s.mother,
      "Admission Date": s.admissionDate,
      "Class Roll": s.roll,
      "SSC Reg. No.": s.sscReg,
      "SSC Year": s.sscYear,
      "Board": s.sscBoard,
      "Subjects": s.subjects,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "StudentList");
    XLSX.writeFile(wb, "StudentTaughtList.xlsx");
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="student-taught-container">
      <div className="page-header">
        <h2>Student Taught List</h2>
        <div className="actions">
          <button onClick={handlePrint}>
            <FaPrint /> Print
          </button>
          <button onClick={handleDownloadExcel}>
            <FaFileExcel /> Download Excel
          </button>
        </div>
      </div>

      <div className="filters">
        <div>
          <label>Edu. Level</label>
          <select defaultValue="Higher Secondary">
            <option>Higher Secondary</option>
            <option>Secondary</option>
          </select>
        </div>
        <div>
          <label>Department</label>
          <select defaultValue="Science">
            <option>Science</option>
            <option>Arts</option>
            <option>Commerce</option>
          </select>
        </div>
        <div>
          <label>Class</label>
          <select defaultValue="HSC-Science">
            <option>HSC-Science</option>
          </select>
        </div>
        <div>
          <label>Section</label>
          <select defaultValue="1st Year">
            <option>1st Year</option>
          </select>
        </div>
        <div>
          <label>Session</label>
          <select defaultValue="2025-2026">
            <option>2025-2026</option>
          </select>
        </div>
      </div>

      <div className="college-info">
        <h3>Mohammadpur Kendriya College</h3>
        <p>EIIN: 108254 | Department: Science | Session: 2025-2026</p>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Sl.</th>
            <th>Student Image</th>
            <th>Student Name, Father's Name, Mother's Name</th>
            <th>Admission Date, Class Roll</th>
            <th>SSC/Eqv. Reg. No., Session</th>
            <th>SSC/Eqv. Exam Roll, Year of Passing & Board</th>
            <th>Subjects Studied with Code No.</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.sl}>
              <td>{student.sl}</td>
              <td>
                <img src={student.image} alt={student.name} className="student-img" />
              </td>
              <td>
                {student.name} <br />
                Father: {student.father} <br />
                Mother: {student.mother}
              </td>
              <td>
                {student.admissionDate} <br />
                {student.roll}
              </td>
              <td>
                {student.sscReg} <br />
                {student.sscYear}
              </td>
              <td>{student.sscBoard}</td>
              <td>{student.subjects}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTaughtList;
