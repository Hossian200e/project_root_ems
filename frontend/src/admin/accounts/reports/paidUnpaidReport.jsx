import React, { useState } from "react";
import "../../../assets/styles/admin/accounts/reports/paidUnpaidReport.css";

const sampleStudents = [
  {
    id: 1,
    name: "Sharif Tahzeeb Al Adiat",
    roll: "1202425033001",
    class: "HSC-Science (Bangla)",
    section: "2nd year",
    session: "2024-2025",
    status: "Unpaid",
    paid: 11210,
    due: 12000,
  },
  {
    id: 26,
    name: "Tahsin Ahmed",
    roll: "1202425033032",
    class: "HSC-Science (Bangla)",
    section: "2nd year",
    session: "2024-2025",
    status: "Paid",
    paid: 24620,
    due: 0,
  },
  {
    id: 161,
    name: "Yaminur Hossain Sajjad",
    roll: "1202425033186",
    class: "HSC-Science (Bangla)",
    section: "2nd year",
    session: "2024-2025",
    status: "Paid",
    paid: 23620,
    due: 0,
  },
  // Add more student objects here
];

const PaidUnpaidReport = () => {
  const [filters, setFilters] = useState({
    eduLevel: "Higher Secondary",
    department: "Science",
    className: "HSC-Science",
    section: "2nd year",
    session: "2024-2025",
  });

  const [showList, setShowList] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredStudents = sampleStudents.filter(
    (s) =>
      s.class.includes(filters.className) &&
      s.section === filters.section &&
      s.session === filters.session
  );

  return (
    <div className="paid-unpaid-report-page">
      <h2>Paid / Unpaid List</h2>

      <div className="filters">
        <label>
          Edu. Level
          <select name="eduLevel" value={filters.eduLevel} onChange={handleChange}>
            <option>Higher Secondary</option>
            <option>Secondary</option>
          </select>
        </label>
        <label>
          Department
          <select name="department" value={filters.department} onChange={handleChange}>
            <option>Science</option>
            <option>Arts</option>
            <option>Commerce</option>
          </select>
        </label>
        <label>
          Class
          <select name="className" value={filters.className} onChange={handleChange}>
            <option>HSC-Science</option>
            <option>HSC-Arts</option>
            <option>HSC-Commerce</option>
          </select>
        </label>
        <label>
          Section
          <select name="section" value={filters.section} onChange={handleChange}>
            <option>1st year</option>
            <option>2nd year</option>
          </select>
        </label>
        <label>
          Session
          <select name="session" value={filters.session} onChange={handleChange}>
            <option>2024-2025</option>
            <option>2025-2026</option>
          </select>
        </label>

        <button onClick={() => setShowList(true)}>Show</button>
      </div>

      {showList && (
        <div className="report-table">
          <div className="report-header">
            <div className="logo">[Logo Here]</div>
            <h3>Mohammadpur Kendriya College</h3>
            <p>Paid / Unpaid List</p>
            <p>Report Date: {new Date().toLocaleString()}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Sl</th>
                <th>Student Name</th>
                <th>Roll</th>
                <th>Class</th>
                <th>Section</th>
                <th>Session</th>
                <th>Payment Status</th>
                <th>Paid Amount</th>
                <th>Due Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>{student.class}</td>
                  <td>{student.section}</td>
                  <td>{student.session}</td>
                  <td className={student.status === "Paid" ? "paid" : "unpaid"}>
                    {student.status}
                  </td>
                  <td>{student.paid.toLocaleString()}</td>
                  <td>{student.due.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaidUnpaidReport;
