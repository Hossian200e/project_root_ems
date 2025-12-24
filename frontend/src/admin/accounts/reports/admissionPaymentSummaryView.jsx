import React from "react";
import { useParams } from "react-router-dom";
import "../../../assets/styles/admin/accounts/reports/admissionPaymentSummaryView.css";

/* ================= SAMPLE DATA ================= */
const candidateData = [
  {
    sl: 1,
    studentCode: "2415730510015",
    name: "Imran Hossen",
    department: "Bachelor of Business Studies (BBS)",
    admissionRoll: "2025558",
    contact: "01762122765",
    regNo: "1815694339",
    roll: "4202425623015",
    session: "2024-2025",
    txnId: "",
    txnDate: "2025-11-16 12:48:58",
    amount: 8470,
  },
  {
    sl: 2,
    studentCode: "2415730510013",
    name: "Md. Ibrahim",
    department: "Bachelor of Business Studies (BBS)",
    admissionRoll: "4020960",
    contact: "01781421320",
    regNo: "1911307170",
    roll: "4202425623013",
    session: "2024-2025",
    txnId: "",
    txnDate: "2025-11-16 12:03:48",
    amount: 8470,
  },
  // Add remaining candidates...
];

/* ================= HELPERS ================= */
const formatMoney = (amount) =>
  Number(amount).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const totalAmount = candidateData.reduce((sum, row) => sum + row.amount, 0);

/* ================= COMPONENT ================= */
const AdmissionPaymentSummaryView = () => {
  const { id } = useParams(); // department or 'all' id

  return (
    <div className="admission-summary-view-page">
      {/* ================= HEADER ================= */}
      <div className="view-header">
        <img src="/profile.png" alt="Profile" className="profile-img" />
        <h2>Mohammadpur Kendriya College</h2>
        <p>College Code: 0</p>
        <h3>Degree Admission | Session 2024–2025 (BA • BSS • BBS)</h3>
        <p>Printing Date: {new Date().toLocaleDateString("en-GB")}</p>
      </div>

      {/* ================= TABLE ================= */}
      <div className="view-table-wrapper">
        <table className="view-table">
          <thead>
            <tr>
              <th>SL.</th>
              <th>Student Code</th>
              <th>Student Name</th>
              <th>Department</th>
              <th>Admission Roll</th>
              <th>Contact No</th>
              <th>Reg No</th>
              <th>Roll</th>
              <th>Session</th>
              <th>Txn.ID</th>
              <th>Txn.Date</th>
              <th>Amount (৳)</th>
            </tr>
          </thead>

          <tbody>
            {candidateData.length === 0 ? (
              <tr>
                <td colSpan="12" className="no-data">
                  Data was not found!
                </td>
              </tr>
            ) : (
              candidateData.map((row) => (
                <tr key={row.sl}>
                  <td>{row.sl}</td>
                  <td>{row.studentCode}</td>
                  <td>{row.name}</td>
                  <td>{row.department}</td>
                  <td>{row.admissionRoll}</td>
                  <td>{row.contact}</td>
                  <td>{row.regNo}</td>
                  <td>{row.roll}</td>
                  <td>{row.session}</td>
                  <td>{row.txnId}</td>
                  <td>{row.txnDate}</td>
                  <td className="amount">{formatMoney(row.amount)}</td>
                </tr>
              ))
            )}
          </tbody>

          <tfoot>
            <tr className="total-row">
              <td colSpan="11" className="total-label">
                Total Amount
              </td>
              <td className="amount">{formatMoney(totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AdmissionPaymentSummaryView;
