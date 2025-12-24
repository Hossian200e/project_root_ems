import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/formFillupPaymentReport.css";

/* ================= SAMPLE DATA ================= */
const paymentData = [
  {
    sl: 1,
    studentName: "Abu Rayhan",
    studentId: "2116570580006",
    className: "BBA",
    exam: "Honours Final",
    session: "2023-2024",
    amount: 3500,
    date: "12-Dec-2025",
  },
  {
    sl: 2,
    studentName: "Sadia Akter",
    studentId: "2116570580007",
    className: "CSE",
    exam: "Honours 2nd Year",
    session: "2023-2024",
    amount: 3000,
    date: "12-Dec-2025",
  },
  {
    sl: 3,
    studentName: "Rafi Hasan",
    studentId: "2116570580008",
    className: "Bangla",
    exam: "Honours 1st Year",
    session: "2023-2024",
    amount: 2800,
    date: "13-Dec-2025",
  },
];

/* ================= HELPERS ================= */
const formatMoney = (amount) =>
  Number(amount).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const totalAmount = paymentData.reduce((sum, row) => sum + row.amount, 0);

/* ================= COMPONENT ================= */
const FormFillupPaymentReport = () => {
  const [session, setSession] = useState("");
  const [exam, setExam] = useState("");
  const [showReport, setShowReport] = useState(false);
  const printRef = useRef();

  /* ================= PRINT ================= */
  const handlePrint = () => {
    window.print();
  };

  /* ================= EXCEL ================= */
  const handleExcelDownload = () => {
    const excelData = paymentData.map((row) => ({
      SL: row.sl,
      "Student Name": row.studentName,
      "Student ID": row.studentId,
      Class: row.className,
      Exam: row.exam,
      Session: row.session,
      "Payment Date": row.date,
      Amount: row.amount,
    }));

    excelData.push({
      SL: "",
      "Student Name": "",
      "Student ID": "",
      Class: "",
      Exam: "",
      Session: "",
      "Payment Date": "TOTAL",
      Amount: totalAmount,
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Form Fill-up Payment Report"
    );

    XLSX.writeFile(workbook, "Form_Fillup_Payment_Report.xlsx");
  };

  return (
    <div className="form-fillup-page">
      {/* ================= FILTER ================= */}
      {!showReport && (
        <div className="filter-card">
          <h3>Form Fill-up Payment Report</h3>

          <div className="filter-grid">
            <div>
              <label>Session</label>
              <select value={session} onChange={(e) => setSession(e.target.value)}>
                <option value="">Select Session</option>
                <option>2021-2022</option>
                <option>2022-2023</option>
                <option>2023-2024</option>
                <option>2024-2025</option>
              </select>
            </div>

            <div>
              <label>Exam</label>
              <select value={exam} onChange={(e) => setExam(e.target.value)}>
                <option value="">Select Exam</option>
                <option>Honours 1st Year</option>
                <option>Honours 2nd Year</option>
                <option>Honours Final</option>
              </select>
            </div>
          </div>

          <button className="primary-btn" onClick={() => setShowReport(true)}>
            Show Report
          </button>
        </div>
      )}

      {/* ================= REPORT ================= */}
      {showReport && (
        <div ref={printRef}>
          {/* HEADER */}
          <div className="report-header">
            <img src="/logo.png" alt="College Logo" />
            <h2>Mohammadpur Kendriya College</h2>
            <h3>Form Fill-up Payment Report</h3>
          </div>

          {/* ACTIONS */}
          <div className="report-actions">
            <button onClick={handlePrint}>🖨 Print</button>
            <button onClick={handleExcelDownload}>⬇ Excel</button>
          </div>

          {/* TABLE */}
          <div className="table-wrapper">
            <table className="payment-table">
              <thead>
                <tr>
                  <th>#SL</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Class</th>
                  <th>Exam</th>
                  <th>Session</th>
                  <th>Payment Date</th>
                  <th>Amount (৳)</th>
                </tr>
              </thead>

              <tbody>
                {paymentData.map((row) => (
                  <tr key={row.sl}>
                    <td>{row.sl}</td>
                    <td>{row.studentName}</td>
                    <td>{row.studentId}</td>
                    <td>{row.className}</td>
                    <td>{row.exam}</td>
                    <td>{row.session}</td>
                    <td>{row.date}</td>
                    <td className="amount">
                      {formatMoney(row.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="total-row">
                  <td colSpan="7">TOTAL COLLECTION</td>
                  <td className="amount">
                    {formatMoney(totalAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormFillupPaymentReport;
