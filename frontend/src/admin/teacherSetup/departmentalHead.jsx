import React, { useState, useEffect } from "react";
import "../../assets/styles/admin/teacherSetup/departmentalHead.css";

const DepartmentalHead = () => {
  // Sample departments and heads
  const [departments, setDepartments] = useState([
    { name: "Bachelor of Arts (B.A.)", head: "" },
    { name: "Bachelor of Business Studies (BBS)", head: "" },
    { name: "Bachelor of Science (B.Sc.)", head: "" },
    { name: "Bachelor of Social Science (B.S.S.)", head: "" },
    { name: "Economics", head: "" },
    { name: "Islamic History & Culture", head: "" },
    { name: "Accounting", head: "" },
    { name: "Management", head: "" },
    { name: "Bangla", head: "" },
    { name: "English", head: "" },
    { name: "Philosophy", head: "" },
    { name: "Islamic Studies", head: "" },
    { name: "Political Science", head: "" },
    { name: "Physics", head: "" },
    { name: "Chemistry", head: "" },
    { name: "Botany", head: "" },
    { name: "Zoology", head: "" },
    { name: "Psychology", head: "" },
    { name: "Mathematics", head: "" },
    { name: "Statistics", head: "" },
    { name: "Sociology", head: "" },
    { name: "Biology", head: "" },
    { name: "Production Management & Marketing", head: "" },
    { name: "Library & Information Science", head: "" },
    { name: "Finance & Banking", head: "" },
    { name: "Geography & Environment", head: "" },
    { name: "Marketing", head: "" },
    { name: "Social Work", head: "" },
    { name: "Home Economics", head: "" },
    { name: "Bangla", head: "" },
    { name: "English", head: "" },
  ]);

  return (
    <div className="departmental-head-container">
      <h2>Departmental Head</h2>
      <div className="table-wrapper">
        <table className="departmental-head-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Department Name</th>
              <th>Departmental Head</th>
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>No Departments Found!</td>
              </tr>
            ) : (
              departments.map((dept, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{dept.name}</td>
                  <td>{dept.head || "No Teacher Found!"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentalHead;
