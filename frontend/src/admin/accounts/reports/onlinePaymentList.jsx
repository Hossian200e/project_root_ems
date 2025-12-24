import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/onlinePaymentList.css";

const onlinePayments = [
  {
    paymentDate: "August, 2025",
    amount: 500,
    name: "Arif Hossain",
    studentId: "24150010011",
    roll: "120245001001",
    className: "HSC-Science",
    section: "1st Year",
    session: "2024-2025",
    txnId: "TXN983746",
  },
];

const OnlinePaymentList = () => {
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("August");
  const reportRef = useRef();

  const handlePrint = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(reportRef.current, {
      callback: (pdf) => pdf.save("Online_Payment_List.pdf"),
      margin: [20, 20, 20, 20],
    });
  };

  const handleExcel = () => {
    const ws = XLSX.utils.json_to_sheet(onlinePayments);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Online Payments");
    XLSX.writeFile(wb, "Online_Payment_List.xlsx");
  };

  return (
    <div className="monthly-fee-page">
      {/* Filters */}
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
            <option>August</option>
            <option>September</option>
          </select>
        </div>
      </div>

      {/* Report */}
      <div className="report-card" ref={reportRef}>
        <div className="report-header">
          <img src="/logo.png" alt="Logo" />
          <h2>Mohammadpur Kendriya College</h2>
          <h3>Online Payment List</h3>
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
              <th>Txn ID</th>
            </tr>
          </thead>
          <tbody>
            {onlinePayments.map((p, i) => (
              <tr key={i}>
                <td>{p.paymentDate}</td>
                <td>{p.amount}</td>
                <td>{p.name}</td>
                <td>{p.studentId}</td>
                <td>{p.roll}</td>
                <td>{p.className}</td>
                <td>{p.section}</td>
                <td>{p.session}</td>
                <td>{p.txnId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnlinePaymentList;
