import React, { useState, useRef } from "react";
import "../../../assets/styles/admin/accounts/reports/studentPaymentHistories.css";

const StudentPaymentHistories = () => {
  const [showReport, setShowReport] = useState(false);
  const [viewPayment, setViewPayment] = useState(null);
  const printRef = useRef();

  const payments = [
    {
      invoice: "INC-00008412",
      mode: "Manual",
      txnId: "",
      date: "19-10-2025 10:21:00 AM",
      amount: 3000,
    },
    {
      invoice: "INC-00000495",
      mode: "Manual",
      txnId: "",
      date: "20-08-2025 10:13:00 AM",
      amount: 8210,
    },
  ];

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open("", "", "width=900,height=650");
    win.document.write(`
      <html>
        <head>
          <title>Student Payment History</title>
        </head>
        <body>${content}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="payment-history-page">
      <h2>Student Payment Histories</h2>

      {/* ================= FILTER SECTION ================= */}
      <div className="filter-box">
        <input placeholder="Student Name (English)" />
        <input placeholder="Student ID" defaultValue="2414010030001" />
        <input placeholder="Class Roll" />
        <select>
          <option>Select Class</option>
          <option>HSC-Science</option>
        </select>
        <select>
          <option>Select Session</option>
          <option>2024-2025</option>
        </select>
        <select>
          <option>Select Payment Mode</option>
          <option>Manual</option>
          <option>bKash</option>
        </select>
        <input placeholder="Invoice No." />
        <input placeholder="Father's Name" />
        <input placeholder="Father's Contact No" />

        <button onClick={() => setShowReport(true)}>Show</button>
      </div>

      {/* ================= REPORT SECTION ================= */}
      {showReport && (
        <div className="report-box">
          <div className="print-btn-area">
            <button onClick={handlePrint}>Print</button>
          </div>

          <div ref={printRef}>
            <div className="report-header">
              <img src="/logo.png" alt="Logo" />
              <h3>Mohammadpur Kendriya College</h3>
              <p>Fee Payment Details Report</p>
            </div>

            <div className="student-info">
              <strong>Sharif Tahzeeb Al Adiat</strong>
              <p>
                ID: 2414010030001 | Roll: 1202425033001 | Shift: Day | Medium:
                Bangla | Group: Science | Class: HSC-Science | Section: 2nd year
              </p>
              <p>Current Session: 2024-2025</p>
              <p className="due-amount">
                Total Due Amount : <span>6000</span>
              </p>
              <p className="report-time">
                Report Generation Date & Time : 24-Dec-2025 09:28 PM
              </p>
            </div>

            <table className="history-table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Invoice No.</th>
                  <th>Payment Mode</th>
                  <th>Txn. ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{p.invoice}</td>
                    <td>{p.mode}</td>
                    <td>{p.txnId || "-"}</td>
                    <td>{p.date}</td>
                    <td>{p.amount}</td>
                    <td>{p.amount.toFixed(2)}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => setViewPayment(p)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="5">Total</td>
                  <td>{totalAmount}</td>
                  <td>{totalAmount.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}
      {viewPayment && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Payment Details</h3>

            <p><strong>Invoice No:</strong> {viewPayment.invoice}</p>
            <p><strong>Payment Mode:</strong> {viewPayment.mode}</p>
            <p><strong>Transaction ID:</strong> {viewPayment.txnId || "-"}</p>
            <p><strong>Date:</strong> {viewPayment.date}</p>
            <p><strong>Amount:</strong> {viewPayment.amount}</p>

            <button onClick={() => setViewPayment(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPaymentHistories;
