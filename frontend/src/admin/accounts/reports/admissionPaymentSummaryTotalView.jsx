import React from "react";
import "../../../assets/styles/admin/accounts/reports/admissionPaymentSummaryTotalView.css";

/* ================= SAMPLE DATA ================= */
const candidatesData = [
  {
    sl: 1,
    studentCode: "2415710450039",
    studentName: "Nahid Hasan Ripon",
    department: "Bachelor of Arts (B.A.)",
    admissionRoll: "2000072",
    contact: "01345188508",
    regNo: "1715560063",
    roll: "4202425612539",
    session: "2024-2025",
    txnId: "",
    txnDate: "2025-11-16 14:55:35",
    amount: 8470,
  },
  {
    sl: 2,
    studentCode: "2415710450009",
    studentName: "Sayed Jalal",
    department: "Bachelor of Arts (B.A.)",
    admissionRoll: "2004871",
    contact: "01961664482",
    regNo: "2600925731",
    roll: "4202425612509",
    session: "2024-2025",
    txnId: "",
    txnDate: "2025-11-10 12:30:25",
    amount: 8470,
  },
  // Add remaining candidates here...
];

/* ================= HELPERS ================= */
const formatMoney = (amount) =>
  Number(amount).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const totalAmount = candidatesData.reduce((sum, row) => sum + row.amount, 0);

/* ================= COMPONENT ================= */
const AdmissionPaymentSummaryTotalView = () => {
  const printingDate = new Date().toLocaleDateString("en-GB");

  return (
    <div className="summary-total-page">
      {/* ================= HEADER ================= */}
      <div className="summary-header">
        <img src="/profile.png" alt="Profile" className="profile-img" />
        <h2>Mohammadpur Kendriya College</h2>
        <p>College Code: 0</p>
        <h3>Degree Admission | Session 2024–2025 (BA • BSS • BBS)</h3>
        <p>Printing Date : {printingDate}</p>
      </div>

      {/* ================= TABLE ================= */}
      <div className="summary-table-wrapper">
        <table className="summary-table">
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
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {candidatesData.map((row) => (
              <tr key={row.sl}>
                <td>{row.sl}</td>
                <td>{row.studentCode}</td>
                <td>{row.studentName}</td>
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
            ))}
          </tbody>

          {/* ================= TOTAL ROW ================= */}
          <tfoot>
            <tr className="total-row">
              <td colSpan={11} style={{ textAlign: "right", fontWeight: "bold" }}>
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

export default AdmissionPaymentSummaryTotalView;
