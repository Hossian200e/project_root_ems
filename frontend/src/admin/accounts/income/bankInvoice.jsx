import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../../../assets/styles/admin/accounts/income/bankInvoice.css";

const BankInvoice = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  const {
    student,
    invoiceDate,
    feeRows,
    totalAmount,
    totalDiscount,
    grandTotal,
    paymentUpTo,
  } = state || {};

  const copies = ["Student Copy", "Bank Copy", "Office Copy", "Dept. Copy"];

  if (!student) return <p>No invoice data available.</p>;

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(invoiceRef.current, {
      callback: function (pdf) {
        pdf.save(`BankInvoice_${student?.id || "unknown"}.pdf`);
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
    <div className="bank-invoice-page">
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
              <p><strong>Invoice No.:</strong> INC-00013029</p>
              <p><strong>Student ID:</strong> {student.id}</p>
              <p><strong>Roll:</strong> {student.roll}</p>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Class:</strong> {student.className || "-"}</p>
              <p><strong>Section:</strong> {student.section || "-"}</p>
              <p><strong>Department:</strong> {student.department || "-"}</p>
              <p><strong>Medium:</strong> {student.medium || "-"}</p>
              <p><strong>Shift:</strong> {student.shift || "-"}</p>
              <p><strong>Payment Up To:</strong> {paymentUpTo || "-"}</p>
            </div>

            {/* Fee Table */}
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Transaction Head</th>
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Payment Amount</th>
                  <th>Discount</th>
                </tr>
              </thead>
              <tbody>
                {feeRows?.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.transactionHead || "Tuition Fee"}</td>
                    <td>{row.month}</td>
                    <td>{row.amount}</td>
                    <td>{row.amount}</td>
                    <td>{row.discount || 0}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3"><strong>Total</strong></td>
                  <td><strong>{totalAmount}</strong></td>
                  <td><strong>{totalAmount}</strong></td>
                  <td><strong>{totalDiscount}</strong></td>
                </tr>
                <tr>
                  <td colSpan="3"><strong>Grand Total</strong></td>
                  <td><strong>{grandTotal}</strong></td>
                  <td><strong>{grandTotal}</strong></td>
                  <td></td>
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

export default BankInvoice;
