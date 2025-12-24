import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../../../assets/styles/admin/accounts/income/otherIncomeInvoice.css";

const OtherIncomeInvoice = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  if (!state) return <p>No invoice data found.</p>;

  const {
    entries,
    invoiceDate,
    month,
    year,
    checkNo,
    checkDate,
    description,
    totalAmount,
  } = state;

  const copies = ["Student Copy", "Office Copy", "Bank Copy", "Dept. Copy"];

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(invoiceRef.current, {
      callback: function (pdf) {
        pdf.save(`OtherIncomeInvoice.pdf`);
      },
      margin: [20, 20, 20, 20],
      autoPaging: "text",
      x: 10,
      y: 10,
      width: 580,
    });
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="other-income-invoice-page">
      <div className="invoice-actions">
        <button onClick={handlePrint}>Print</button>
        <button onClick={handleDownload}>Download</button>
        <button onClick={handleBack}>Back</button>
      </div>

      <div className="invoice-columns" ref={invoiceRef}>
        {copies.map((copy, idx) => (
          <div key={idx} className="invoice-column">
            {/* Header */}
            <div className="invoice-header">
              <div className="logo">
                <img src="/logo.png" alt="Logo" style={{ width: "40px" }} />
              </div>
              <div className="college-name">Mohammadpur Kendriya College</div>
              <div className="copy-name">{copy}</div>
            </div>

            {/* Invoice Info */}
            <div className="invoice-meta">
              <p><strong>Invoice Date:</strong> {invoiceDate}</p>
              <p><strong>Month:</strong> {month}</p>
              <p><strong>Year:</strong> {year}</p>
              <p><strong>Check No:</strong> {checkNo || "-"}</p>
              <p><strong>Check Date:</strong> {checkDate || "-"}</p>
            </div>

            {/* Entries Table */}
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Transaction Head</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.transactionHead}</td>
                    <td>{entry.amount}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2"><strong>Total Amount</strong></td>
                  <td><strong>{totalAmount}</strong></td>
                </tr>
              </tbody>
            </table>

            {/* Description */}
            <div className="description">
              <strong>Purpose / Description:</strong>
              <p>{description}</p>
            </div>

            {/* Signatures */}
            <div className="signatures">
              <div>Prepared By</div>
              <div>Checked By</div>
              <div>Authorized By</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherIncomeInvoice;
