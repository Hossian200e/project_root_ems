import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/admin/accounts/income/manualFeeMakePayment.css";

const ManualFeeMakePayment = () => {
  const navigate = useNavigate();

  const [feeRows, setFeeRows] = useState([
    { id: 1, month: "January", amount: 1000, waiver: 0 },
    { id: 2, month: "February", amount: 1000, waiver: 0 },
    { id: 3, month: "March", amount: 1000, waiver: 0 },
    { id: 4, month: "April", amount: 1000, waiver: 0 },
    { id: 5, month: "May", amount: 1000, waiver: 0 },
    { id: 6, month: "June", amount: 1000, waiver: 0 },
  ]);

  // Remove row
  const handleRemoveRow = (id) => {
    setFeeRows(feeRows.filter((row) => row.id !== id));
  };

  // Totals
  const totalAmount = feeRows.reduce((sum, r) => sum + r.amount, 0);
  const totalWaiver = feeRows.reduce((sum, r) => sum + r.waiver, 0);
  const grandTotal = totalAmount - totalWaiver;

  // ✅ Navigate to Manual Invoice page
  const handleMakePayment = () => {
    navigate("/manualFeeCollection/incoice", {
      state: {
        feeRows,
        totalAmount,
        totalWaiver,
        grandTotal,
        student: {
          id: "2414020080238",
          name: "Tansir Khan Sajid",
        },
        invoiceDate: "2025-12-22",
        paymentUpTo: "June-2026",
      },
    });
  };

  return (
    <div className="make-payment-page">
      <h2 className="page-title">Student Fee Collection</h2>

      {/* Student Info */}
      <div className="invoice-info row-wise">
        <div className="info-row">
          <span>Invoice Date</span>
          <span>2025-12-22</span>
        </div>

        <div className="info-row">
          <span>Student ID</span>
          <span>2414020080238</span>
        </div>

        <div className="info-row">
          <span>Student Name</span>
          <span>Tansir Khan Sajid</span>
        </div>

        <div className="info-row">
          <span>Payment Up To</span>
          <span>June-2026</span>
        </div>
      </div>

      {/* Fee Table */}
      <table className="fee-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction Head</th>
            <th>Amount</th>
            <th>Waiver</th>
            <th>Currency</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {feeRows.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>Tuition Fee, {row.month}, 2026</td>
              <td>{row.amount}</td>
              <td>{row.waiver}</td>
              <td>Tk</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveRow(row.id)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}

          <tr className="total-row">
            <td colSpan="2"><strong>Total</strong></td>
            <td><strong>{totalAmount}</strong></td>
            <td><strong>{totalWaiver}</strong></td>
            <td><strong>Tk</strong></td>
            <td></td>
          </tr>

          <tr className="grand-total-row">
            <td colSpan="2"><strong>Grand Total (With Discount)</strong></td>
            <td><strong>{grandTotal}</strong></td>
            <td></td>
            <td><strong>Tk</strong></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* Actions */}
      <div className="payment-actions">
        <label className="sms-checkbox">
          <input type="checkbox" />
          SEND SMS
        </label>

        <button
          className="make-payment-btn"
          onClick={handleMakePayment}
        >
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default ManualFeeMakePayment;
