import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/styles/admin/accounts/reports/admissionPaymentSummary.css";

/* ================= SAMPLE DATA ================= */
const summaryData = [
  {
    id: 1,
    department: "Bachelor of Business Studies (BBS)",
    totalCandidate: 19,
    totalAmount: 160930,
  },
  {
    id: 2,
    department: "Bachelor of Arts (B.A.)",
    totalCandidate: 44,
    totalAmount: 372680,
  },
  {
    id: 3,
    department: "Bachelor of Social Science (B.S.S)",
    totalCandidate: 21,
    totalAmount: 177870,
  },
];

/* ================= HELPERS ================= */
const formatMoney = (amount) =>
  Number(amount).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const totalCandidate = summaryData.reduce(
  (sum, row) => sum + row.totalCandidate,
  0
);
const totalAmount = summaryData.reduce(
  (sum, row) => sum + row.totalAmount,
  0
);

/* ================= COMPONENT ================= */
const AdmissionPaymentSummary = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // admission event id

  return (
    <div className="admission-summary-page">
      {/* ================= HEADER ================= */}
      <div className="summary-header">
        <img src="/profile.png" alt="Profile" className="profile-img" />
        <h2>Mohammadpur Kendriya College</h2>
        <p>College Code: N/A</p>
        <h3>Degree Admission | Session 2024–2025 (BA • BSS • BBS)</h3>
      </div>

      {/* ================= TABLE ================= */}
      <div className="summary-table-wrapper">
        <table className="summary-table">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Total Candidate</th>
              <th>Total Amount (৳)</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {summaryData.map((row) => (
              <tr key={row.id}>
                <td>{row.department}</td>
                <td className="center">{row.totalCandidate}</td>
                <td className="amount">{formatMoney(row.totalAmount)}</td>
                <td className="center">
                  <button
                    className="view-btn"
                    title="View Details"
                    onClick={() =>
                      navigate(
                        `/admissionPaymentReport/paymentSummary/view/${row.id}`
                      )
                    }
                  >
                    👁
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          {/* ================= TOTAL ROW ================= */}
          <tfoot>
            <tr className="total-row">
              <td>Total</td>
              <td className="center">{totalCandidate}</td>
              <td className="amount">{formatMoney(totalAmount)}</td>
              <td className="center">
                <button
                  className="view-btn total-view"
                  title="View All Details"
                  onClick={() =>
                    navigate(`/admissionPaymentReport/paymentSummary/totalview/${id}`)
                  }
                >
                  👁
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AdmissionPaymentSummary;
