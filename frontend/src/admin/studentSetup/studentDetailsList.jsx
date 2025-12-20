import React, { useState } from "react";
import * as XLSX from "xlsx";
import "../../assets/styles/admin/studentSetup/studentDetailsList.css";

const StudentDetailsList = () => {
  const [filters, setFilters] = useState({
    shift: "Day",
    medium: "Bangla",
    eduLevel: "Higher Secondary",
    department: "Science",
    className: "HSC-Science",
    section: "1st Year",
    session: "2025-2026",
    studentCategory: "",
    gender: "",
  });

  const [students] = useState([
    {
      sl: 1,
      shift: "Day",
      medium: "Bangla",
      eduLevel: "Higher Secondary",
      department: "Science",
      className: "HSC-Science",
      section: "1st Year",
      session: "2025-2026",
      studentCategory: "N/A",
      gender: "Male",
      studentCode: "2514010030063",
      name: "Saiful Islam",
      nameBn: "সাইফুল ইসলাম",
      fatherName: "Md. Nuru Molla",
      fatherPhone: "01728189861",
      motherName: "Maksuda Akter",
      motherPhone: "01862569282",
      dob: "12-08-2009",
      birthCertNo: "",
      religion: "Islam",
      roll: "1202526033046",
      gdMobileNo: "01728189861",
      presentAddress: "374, South Paikpara",
      permanentAddress: "Baborali Mollarkandi",
      bloodGroup: "O+",
      fatherNid: "",
      motherNid: "",
      fatherIncome: "50000.00",
      fatherOcc: "Private Service",
      sscRegNo: "2210607239",
      sscBoard: "Dhaka Board",
      sscRoll: "142947",
      sscGpa: "4.28",
      hscRegNo: "",
      hscBoard: "",
      hscRoll: "",
      hscGpa: "",
    },
  ]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredStudents = students.filter((s) => {
    return (
      (!filters.shift || s.shift === filters.shift) &&
      (!filters.medium || s.medium === filters.medium) &&
      (!filters.eduLevel || s.eduLevel === filters.eduLevel) &&
      (!filters.department || s.department === filters.department) &&
      (!filters.className || s.className === filters.className) &&
      (!filters.section || s.section === filters.section) &&
      (!filters.session || s.session === filters.session) &&
      (!filters.studentCategory || s.studentCategory === filters.studentCategory) &&
      (!filters.gender || s.gender === filters.gender)
    );
  });

  const handlePrint = () => window.print();

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredStudents);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "StudentDetails.xlsx");
  };

  return (
    <div className="student-details-page">
      <h2>Student Details List</h2>

      {/* Filters */}
      <div className="filters">
        {["shift", "medium", "eduLevel", "department", "className", "section", "session"].map((f) => (
          <label key={f}>
            {f.replace(/([A-Z])/g, " $1")}:
            <input
              value={filters[f]}
              onChange={(e) => handleFilterChange(f, e.target.value)}
            />
          </label>
        ))}

        <label>
          Gender:
          <select value={filters.gender} onChange={(e) => handleFilterChange("gender", e.target.value)}>
            <option value="">All</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>

        <button onClick={handlePrint}>Print</button>
        <button onClick={handleDownloadExcel}>Download Excel</button>
      </div>

      {/* Table */}
      <div className="student-table">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Shift</th>
              <th>Medium</th>
              <th>Edu Level</th>
              <th>Department</th>
              <th>Class</th>
              <th>Section</th>
              <th>Session</th>
              <th>Student Code</th>
              <th>Name</th>
              <th>Name (BN)</th>
              <th>Category</th>
              <th>Father</th>
              <th>Father Phone</th>
              <th>Mother</th>
              <th>Mother Phone</th>
              <th>DOB</th>
              <th>Religion</th>
              <th>Roll</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.studentCode}>
                <td>{s.sl}</td>
                <td>{s.shift}</td>
                <td>{s.medium}</td>
                <td>{s.eduLevel}</td>
                <td>{s.department}</td>
                <td>{s.className}</td>
                <td>{s.section}</td>
                <td>{s.session}</td>
                <td>{s.studentCode}</td>
                <td>{s.name}</td>
                <td>{s.nameBn}</td>
                <td>{s.studentCategory}</td>
                <td>{s.fatherName}</td>
                <td>{s.fatherPhone}</td>
                <td>{s.motherName}</td>
                <td>{s.motherPhone}</td>
                <td>{s.dob}</td>
                <td>{s.religion}</td>
                <td>{s.roll}</td>
                <td>{s.presentAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetailsList;
