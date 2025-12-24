import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../../../assets/styles/admin/accounts/income/manualInvoice.css";

const ManualInvoice = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  const {
    student,
    invoiceDate,
    feeRows,
    totalAmount,
    totalWaiver,
    grandTotal,
  } = state || {};

  const copies = ["Student Copy", "Bank Copy", "Office Copy", "Dept. Copy"];

  if (!student) return <p>No invoice data available.</p>;

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(invoiceRef.current, {
      callback: function (pdf) {
        pdf.save(`Invoice_${student?.id || "unknown"}.pdf`);
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
    <div className="manual-invoice-page">
      <div className="invoice-actions">
        <button onClick={handlePrint}>Print</button>
        <button onClick={handleDownload}>Invoice Download</button>
        <button onClick={handleBack}>Back</button>
      </div>

      <div className="invoice-columns" ref={invoiceRef}>
        {copies.map((copy, idx) => (
          <div key={idx} className="invoice-column">
            {/* Header */}
            <div className="invoice-header">
              <div className="logo">
                <img
                  src="/logo.png"
                  alt="Logo"
                  style={{ width: "40px" }}
                />
              </div>
              <div className="college-name">Mohammadpur Kendriya College</div>
              <div className="copy-name">{copy}</div>
            </div>

            {/* Student Info */}
            <div className="invoice-meta">
              <p><strong>Invoice No.:</strong> INC-00013029</p>
              <p><strong>Student ID:</strong> {student.id}</p>
              <p><strong>Date:</strong> {invoiceDate}</p>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Department:</strong> {student.department || "-"}</p>
              <p><strong>Class:</strong> {student.className || "-"}</p>
              <p><strong>Section:</strong> {student.section || "-"}</p>
              <p><strong>Roll:</strong> {student.roll || "-"}</p>
              <p><strong>Shift:</strong> {student.shift || "-"}</p>
              <p><strong>Medium:</strong> {student.medium || "-"}</p>
              <p><strong>Phone:</strong> {student.phone || "-"}</p>
            </div>

            {/* Fee Table */}
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Transaction Head</th>
                  <th>Month</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {feeRows?.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.transactionHead || "Tuition Fee"}</td>
                    <td>{row.month}</td>
                    <td>{row.amount} /=</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3"><strong>Total Amount</strong></td>
                  <td><strong>{totalAmount} /=</strong></td>
                </tr>
                <tr>
                  <td colSpan="3"><strong>Total Discount</strong></td>
                  <td><strong>{totalWaiver} /=</strong></td>
                </tr>
                <tr>
                  <td colSpan="3"><strong>Grand Total</strong></td>
                  <td><strong>{grandTotal} /=</strong></td>
                </tr>
              </tbody>
            </table>

            {/* Signatures */}
            <div className="signatures">
              <div>Student's Sign</div>
              <div>Office's Sign</div>
              <div>Bank's Sign</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManualInvoice;
