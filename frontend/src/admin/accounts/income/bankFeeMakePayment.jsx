import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/admin/accounts/income/bankFeeMakePayment.css";

const BankFeeMakePayment = () => {
  const navigate = useNavigate();

  const [feeRows, setFeeRows] = useState([
    { id: 1, month: "January", amount: 1000, paymentAmount: 1000, discount: 0 },
    { id: 2, month: "February", amount: 1000, paymentAmount: 1000, discount: 0 },
    { id: 3, month: "March", amount: 1000, paymentAmount: 1000, discount: 0 },
    { id: 4, month: "April", amount: 1000, paymentAmount: 1000, discount: 0 },
    { id: 5, month: "May", amount: 1000, paymentAmount: 1000, discount: 0 },
    { id: 6, month: "June", amount: 1000, paymentAmount: 1000, discount: 0 },
  ]);

  // Remove row
  const handleRemoveRow = (id) => {
    setFeeRows(feeRows.filter((row) => row.id !== id));
  };

  // Update payment amount (editable)
  const handlePaymentChange = (id, value) => {
    setFeeRows(
      feeRows.map((row) =>
        row.id === id
          ? { ...row, paymentAmount: Number(value) }
          : row
      )
    );
  };

  // Totals
  const totalAmount = feeRows.reduce((sum, r) => sum + r.amount, 0);
  const totalPayment = feeRows.reduce((sum, r) => sum + r.paymentAmount, 0);
  const totalDiscount = feeRows.reduce((sum, r) => sum + r.discount, 0);
  const grandTotal = totalPayment - totalDiscount;

  // Navigate to Invoice Page
  const handleMakePayment = () => {
    navigate("/bankFeeCollection/incoice", {
      state: {
        feeRows,
        totalAmount,
        totalPayment,
        totalDiscount,
        grandTotal,
        student: {
          id: "2414020080238",
          name: "Tansir Khan Sajid",
          roll: "1202425022176",
        },
        invoiceDate: "12/22/25",
        paymentUpTo: "June - 2026",
      },
    });
  };

  return (
    <div className="bank-fee-page">
      <h2 className="page-title">Student Fee Collection</h2>

  {/* Student Information Card */}
<div className="student-info-card">
  <h3 className="card-title">Student Information</h3>

  <div className="student-info-grid">
    <div className="info-item">
      <span className="label">Invoice Date</span>
      <span className="value">12/22/25</span>
    </div>

    <div className="info-item">
      <span className="label">Student ID</span>
      <span className="value">2414020080238</span>
    </div>

    <div className="info-item">
      <span className="label">Student Name</span>
      <span className="value">Tansir Khan Sajid</span>
    </div>

    <div className="info-item">
      <span className="label">Student Roll</span>
      <span className="value">1202425022176</span>
    </div>

    <div className="info-item">
      <span className="label">Payment Up To</span>
      <span className="value">June - 2026</span>
    </div>
  </div>
</div>

      {/* Fee Table */}
      <div className="fee-table-container">
        <table className="fee-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction Head</th>
              <th>Amount</th>
              <th>Payment Amount</th>
              <th>Discount</th>
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
                <td>
                  <input
                    type="number"
                    value={row.paymentAmount}
                    onChange={(e) => handlePaymentChange(row.id, e.target.value)}
                  />
                </td>
                <td>{row.discount}</td>
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
              <td><strong>{totalPayment}</strong></td>
              <td><strong>{totalDiscount}</strong></td>
              <td>Tk</td>
              <td></td>
            </tr>

            <tr className="grand-total-row">
              <td colSpan="2"><strong>Grand Total (With Discount)</strong></td>
              <td><strong>{grandTotal}</strong></td>
              <td><strong>{grandTotal}</strong></td>
              <td></td>
              <td>Tk</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Make Payment Button */}
      <div className="payment-actions">
        <button className="make-payment-btn" onClick={handleMakePayment}>
           Payment
        </button>
      </div>
    </div>
  );
};

export default BankFeeMakePayment;
