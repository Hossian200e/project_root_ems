import React, { useState } from "react";
import "../../assets/styles/admin/teacherSetup/teacherListPrint.css";

const TeacherListPrint = () => {
  const [teachers] = useState([
    {
      name: "Md. Nazrul Islam",
      designation: "Assistant Teacher",
      code: "E000216",
      indexNo: "",
      dob: "1973-09-11",
      mobile: "01537633780",
      department: "N/A",
      eduLevel: "N/A",
      shift: "Day",
      subjects: "N/A",
    },
    {
      name: "Marufa",
      designation: "Assistant Teacher",
      code: "E000217",
      indexNo: "",
      dob: "1997-02-12",
      mobile: "01953288101",
      department: "N/A",
      eduLevel: "N/A",
      shift: "Day",
      subjects: "N/A",
    },
    {
      name: "Sazia Laizu",
      designation: "Assistant Teacher",
      code: "E000218",
      indexNo: "",
      dob: "1970-01-01",
      mobile: "01915649018",
      department: "N/A",
      eduLevel: "N/A",
      shift: "Day",
      subjects: "N/A",
    },
    // Add all other teachers similarly
  ]);

  return (
    <div className="teacher-list-print-container">
      <h2>Mohammadpur Kendriya College</h2>
      <h3>Teacher List</h3>

      <table className="teacher-list-table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Teacher Code</th>
            <th>Index No</th>
            <th>Date of Birth</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Edu. Level</th>
            <th>Shift</th>
            <th>Subjects</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{t.name}</td>
              <td>{t.designation}</td>
              <td>{t.code}</td>
              <td>{t.indexNo || "-"}</td>
              <td>{t.dob || "-"}</td>
              <td>{t.mobile || "-"}</td>
              <td>{t.department}</td>
              <td>{t.eduLevel}</td>
              <td>{t.shift}</td>
              <td>{t.subjects}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherListPrint;
