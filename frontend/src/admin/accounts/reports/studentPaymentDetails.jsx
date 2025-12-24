import React, { useState } from "react";
import "../../../assets/styles/admin/accounts/reports/studentPaymentDetails.css";

const StudentPaymentDetails = () => {
  const [filters, setFilters] = useState({
    eduLevel: "Higher Secondary",
    department: "Science",
    class: "HSC-Science",
    section: "2nd year",
    session: "2024-2025",
  });

  const [showData, setShowData] = useState(false);

  // Sample student data
  const students = [
    {
      name: "Sharif Tahzeeb Al Adiat",
      studentId: "2414010030001",
      roll: "1202425033001",
      category: "-",
      payments: [1000, 1000, 1000, 1000, 500, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 11210],
      monthlyFee: 1000,
      totalUnpaid: 1200,
    },
    {
      name: "SAHIDUL ISLAM FAHIM",
      studentId: "2414010030002",
      roll: "1202425033002",
      category: "-",
      payments: [1000, 500, 0, 1000, 400, 0, 0, 1000, 1000, 1000, 0, 1000, 13560],
      monthlyFee: 1000,
      totalUnpaid: 4000,
    },
    {
      name: "MD. AFJAL HOSSAIN",
      studentId: "2414010030003",
      roll: "1202425033003",
      category: "-",
      payments: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21060],
      monthlyFee: 1000,
      totalUnpaid: 21060,
    },
  ];

  const months = [
    "June 2025", "July 2025", "August 2025", "September 2025", "October 2025",
    "November 2025", "December 2025", "January 2026", "February 2026", "March 2026",
    "April 2026", "May 2026", "June 2026"
  ];

  // Determine class based on monthly payment
  const getPaymentClass = (amount, monthlyFee) => {
    if (amount === 0) return "no-payment";          // Light Red
    if (amount < monthlyFee) return "partial-payment"; // Light Orange
    return "full-payment";                           // Light Green
  };

  return (
    <div className="student-payment-page">
      <h2>Student Payment Details</h2>

      {/* Filter Section */}
      <div className="filter-section">
        <select value={filters.eduLevel} onChange={e => setFilters({...filters, eduLevel: e.target.value})}>
          <option>Higher Secondary</option>
          <option>Secondary</option>
        </select>
        <select value={filters.department} onChange={e => setFilters({...filters, department: e.target.value})}>
          <option>Science</option>
          <option>Arts</option>
        </select>
        <select value={filters.class} onChange={e => setFilters({...filters, class: e.target.value})}>
          <option>HSC-Science</option>
          <option>HSC-Arts</option>
        </select>
        <select value={filters.section} onChange={e => setFilters({...filters, section: e.target.value})}>
          <option>2nd year</option>
          <option>1st year</option>
        </select>
        <select value={filters.session} onChange={e => setFilters({...filters, session: e.target.value})}>
          <option>2024-2025</option>
          <option>2023-2024</option>
        </select>
        <button onClick={() => setShowData(true)}>Show</button>
      </div>

      {/* Report Section */}
      {showData && (
        <div className="report-section">
          <div className="report-header">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h3>Mohammadpur Kendriya College</h3>
            <p>Student Payment Details</p>
            <p>
              Department: {filters.department}, Class: {filters.class}, Section: {filters.section}, Shift: Day, Session: {filters.session}
            </p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Roll</th>
                <th>Category</th>
                {months.map((month, idx) => <th key={idx}>{month}</th>)}
                <th>Total Paid</th>
                <th>Total Unpaid</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={idx}>
                  <td>{student.name}</td>
                  <td>{student.studentId}</td>
                  <td>{student.roll}</td>
                  <td>{student.category}</td>
                  {student.payments.map((amt, i) => (
                    <td key={i} className={getPaymentClass(amt, student.monthlyFee)}>
                      {amt}
                    </td>
                  ))}
                  <td>{student.payments.reduce((a, b) => a + b, 0)}</td>
                  <td>{student.totalUnpaid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentPaymentDetails;
