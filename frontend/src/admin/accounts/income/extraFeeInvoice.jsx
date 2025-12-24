import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../../../assets/styles/admin/accounts/income/extraFeeInvoice.css";

const ExtraFeeInvoice = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  const { student, entries, totalAmount, cause, invoiceDate } = state || {};
  const copies = ["Student Copy", "Office Copy", "Dept. Copy"];

  if (!student) return <p>No invoice data available.</p>;

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(invoiceRef.current, {
      callback: (pdf) => {
        pdf.save(`ExtraFeeInvoice_${student?.code || "unknown"}.pdf`);
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
    <div className="extra-fee-invoice-page">
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

            {/* Student Info */}
            <div className="invoice-meta">
              <p><strong>Invoice No.:</strong> EXF-{student.code}</p>
              <p><strong>Student Code:</strong> {student.code}</p>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Roll:</strong> {student.roll || "-"}</p>
              <p><strong>Class:</strong> {student.className || "-"}</p>
              <p><strong>Section:</strong> {student.section || "-"}</p>
              <p><strong>Department:</strong> {student.department || "-"}</p>
              <p><strong>Medium:</strong> {student.medium || "-"}</p>
              <p><strong>Shift:</strong> {student.shift || "-"}</p>
              <p><strong>Invoice Date:</strong> {invoiceDate}</p>
              <p><strong>Cause:</strong> {cause || "-"}</p>
            </div>

            {/* Fee Table */}
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Transaction Head</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {entries?.map((entry, index) => (
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

            {/* Signatures */}
            <div className="signatures">
              <div>Student's Sign</div>
              <div>Office's Sign</div>
              <div>Authority Sign</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraFeeInvoice;
