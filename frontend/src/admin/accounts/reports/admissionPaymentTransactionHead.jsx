import React, { useState } from "react";
import "../../../assets/styles/admin/accounts/reports/admissionPaymentSummaryView.css";

/* ================= SAMPLE DATA ================= */
const paymentListData = [
  {
    sl: 1,
    studentName: "Abu Rayhan",
    admissionRoll: "2116570580006",
    department: "BBS",
    gt: 3500,
  },
  {
    sl: 2,
    studentName: "Sadia Akter",
    admissionRoll: "2116570580007",
    department: "BBS",
    gt: 3000,
  },
  {
    sl: 3,
    studentName: "Rafi Hasan",
    admissionRoll: "2116570580008",
    department: "BA",
    gt: 4000,
  },
];

/* ================= HELPER ================= */
const formatMoney = (amount) =>
  Number(amount).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const AdmissionPaymentSummaryView = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [department, setDepartment] = useState("");
  const [search, setSearch] = useState("");

  const filteredData = paymentListData.filter(
    (item) =>
      (!department || item.department === department) &&
      item.studentName.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = filteredData.reduce((sum, item) => sum + item.gt, 0);

  return (
    <div className="admission-summary-view-page">
      {/* ================= HEADER ================= */}
      <div className="page-header">
        <h2>Head Wise Details</h2>
        <p>Dashboard / Transaction Reports / Head Wise Details</p>
        <h3>Degree Admission | Session 2024–2025 (BA• BSS • BBS)</h3>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="filter-card">
        <div className="filter-grid">
          <div>
            <label>Date From</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label>Date To</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <label>Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="BBS">BBS</option>
              <option value="BA">BA</option>
              <option value="BSS">BSS</option>
            </select>
          </div>
          <div>
            <label>Search</label>
            <input
              type="text"
              placeholder="Search student"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="summary-card">
        <img src="/logo.png" alt="Profile" />
        <div className="summary-info">
          <h2>Mohammadpur Kendriya College</h2>
          <h3>Income Report</h3>
          <p>Total Amount: {formatMoney(totalAmount)}</p>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="table-wrapper">
        <table className="payment-summary-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Student Name</th>
              <th>Admission Roll</th>
              <th>Dept.</th>
              <th>GT</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  Data was not found!
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.sl}>
                  <td>{row.sl}</td>
                  <td>{row.studentName}</td>
                  <td>{row.admissionRoll}</td>
                  <td>{row.department}</td>
                  <td className="amount">{formatMoney(row.gt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmissionPaymentSummaryView;
