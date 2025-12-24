import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/monthlyFeeReport.css";

const manualPayments = [
  {
    paymentDate: "August, 2025",
    amount: 100,
    name: "MD. TANJIM KHAN",
    studentId: "2414030040167",
    roll: "1202425011175",
    className: "HSC- Humanities",
    section: "2nd Year",
    session: "2024-2025",
  },
  {
    paymentDate: "August, 2025",
    amount: 100,
    name: "Mahbubur Rahman",
    studentId: "2314030040001",
    roll: "1202324011281",
    className: "HSC- Humanities",
    section: "2nd Year",
    session: "2023-2024",
  },
  {
    paymentDate: "August, 2025",
    amount: 100,
    name: "Sahadat Hossain Adnan",
    studentId: "2314010030001",
    roll: "1202324033006",
    className: "HSC-Science",
    section: "2nd Year",
    session: "2023-2024",
  },
  {
    paymentDate: "August, 2025",
    amount: 19950,
    name: "FOZLE RABBY PRANTO",
    studentId: "192199990610052",
    roll: "7201920020053",
    className: "CSE",
    section: "4th Year",
    session: "2019-2020",
  },
];

const MonthlyFeeReport = () => {
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("August");
  const reportRef = useRef();

  const handlePrint = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(reportRef.current, {
      callback: (pdf) => pdf.save("Manual_Payment_List.pdf"),
      margin: [20, 20, 20, 20],
    });
  };

  const handleExcel = () => {
    const excelData = manualPayments.map((p) => ({
      "Payment Date": p.paymentDate,
      "Paid Amount": p.amount,
      "Student Name": p.name,
      "Student ID": p.studentId,
      "Student Roll": p.roll,
      Class: p.className,
      Section: p.section,
      Session: p.session,
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Manual Payment");
    XLSX.writeFile(wb, "Manual_Payment_List.xlsx");
  };

  return (
    <div className="monthly-fee-page">
      {/* ===== Filter Section ===== */}
      <div className="filter-card">
        <div>
          <label>Select Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>

        <div>
          <label>Select Month</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
        </div>
      </div>

      {/* ===== Report Section ===== */}
      <div className="report-card" ref={reportRef}>
        <div className="report-header">
          <img src="/logo.png" alt="Logo" />
          <h2>Mohammadpur Kendriya College</h2>
          <h3> Payment List</h3>
          <p>{month}, {year}</p>
        </div>

        <div className="action-buttons">
          <button onClick={handlePrint}>Print</button>
          <button onClick={handleExcel}>Download Excel</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Payment Date</th>
              <th>Paid Amount</th>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>Student Roll</th>
              <th>Class</th>
              <th>Section</th>
              <th>Session</th>
            </tr>
          </thead>
          <tbody>
            {manualPayments.map((p, i) => (
              <tr key={i}>
                <td>{p.paymentDate}</td>
                <td>{p.amount}</td>
                <td>{p.name}</td>
                <td>{p.studentId}</td>
                <td>{p.roll}</td>
                <td>{p.className}</td>
                <td>{p.section}</td>
                <td>{p.session}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyFeeReport;
