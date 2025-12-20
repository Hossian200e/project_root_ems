import React from "react";
import "../../assets/styles/admin/studentSetup/subjectWiseStudents.css";

const SubjectWiseStudents = () => {
  const students = [
    {
      sl: 1,
      name: "YEASIN ARAFAT SHAIKH",
      father: "Md. Lutfar Rahman Shaikh",
      roll: "1202526033081",
      className: "HSC-Science",
      section: "1st Year",
      session: "2025-2026",
      contact: "01681426125",
      gender: "Male",
    },
    {
      sl: 2,
      name: "SANJIDA AKTER",
      father: "SAIFUL ISLAM",
      roll: "1202526033528",
      className: "HSC-Science",
      section: "1st Year",
      session: "2025-2026",
      contact: "01799436725",
      gender: "Female",
    },
    // 👉 You can continue adding all students here
  ];

  return (
    <div className="subject-wise-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Dashboard / Subject Wise Students
      </div>

      {/* Filters */}
      <div className="filter-card">
        <div className="filter-group">
          <label>Edu. Level</label>
          <input value="Higher Secondary" readOnly />
        </div>

        <div className="filter-group">
          <label>Department</label>
          <input value="Science" readOnly />
        </div>

        <div className="filter-group">
          <label>Class</label>
          <input value="HSC-Science" readOnly />
        </div>

        <div className="filter-group">
          <label>Section</label>
          <input value="1st Year" readOnly />
        </div>

        <div className="filter-group">
          <label>Session</label>
          <input value="2025-2026" readOnly />
        </div>

        <div className="filter-group">
          <label>Subject</label>
          <input value="Bangla" readOnly />
        </div>
      </div>

      {/* Header */}
      <div className="college-header">
        <h2>Mohammadpur Kendriya College</h2>
        <p>
          <strong>Subject Name :</strong> Bangla
        </p>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Student Name</th>
              <th>Father Name</th>
              <th>Roll</th>
              <th>Class Name</th>
              <th>Section</th>
              <th>Session</th>
              <th>Contact Number</th>
              <th>Gender</th>
            </tr>
          </thead>

          <tbody>
            {students.map((stu) => (
              <tr key={stu.sl}>
                <td>{stu.sl}</td>
                <td>{stu.name}</td>
                <td>{stu.father}</td>
                <td>{stu.roll}</td>
                <td>{stu.className}</td>
                <td>{stu.section}</td>
                <td>{stu.session}</td>
                <td>{stu.contact}</td>
                <td>{stu.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectWiseStudents;
