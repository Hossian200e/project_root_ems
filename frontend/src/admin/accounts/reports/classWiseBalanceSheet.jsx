import React, { useState } from "react";
import "../../../assets/styles/admin/accounts/reports/classWiseBalanceSheet.css";

/* ================= SAMPLE DATA (API READY) ================= */
const classWiseData = [
  {
    sl: 1,
    className: "CSE",
    department: "CSE",
    section: "4th Year",
    session: "2019-2020",
    totalCollectable: 1981500,
    totalDiscount: 0,
    totalCollected: 664400,
    totalDues: 1339550,
  },
  {
    sl: 2,
    className: "Bangla-(Honours)",
    department: "Bangla",
    section: "1st Year",
    session: "2019-2020",
    totalCollectable: 0,
    totalDiscount: 0,
    totalCollected: 0,
    totalDues: 0,
  },
  {
    sl: 3,
    className: "BBA",
    department: "BBA",
    section: "4th Year",
    session: "2019-2020",
    totalCollectable: 2630620,
    totalDiscount: 22000,
    totalCollected: 902450,
    totalDues: 1706170,
  },
];

/* ================= HELPER ================= */
const formatMoney = (amount) =>
  Number(amount).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/* ================= TOTAL CALCULATION ================= */
const totals = classWiseData.reduce(
  (acc, row) => {
    acc.collectable += row.totalCollectable;
    acc.discount += row.totalDiscount;
    acc.collected += row.totalCollected;
    acc.dues += row.totalDues;
    return acc;
  },
  { collectable: 0, discount: 0, collected: 0, dues: 0 }
);

/* ================= COMPONENT ================= */
const ClassWiseBalanceSheet = () => {
  const [session, setSession] = useState("");
  const [format, setFormat] = useState("Life Time");
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="class-wise-page">
      {/* ================= FILTER ================= */}
      {!showReport && (
        <div className="filter-card">
          <h3>Overall Balance Sheet</h3>

          <div className="filter-grid">
            <div>
              <label>Session</label>
              <select value={session} onChange={(e) => setSession(e.target.value)}>
                <option value="">Select Session</option>
                <option>2019-2020</option>
                <option>2020-2021</option>
                <option>2021-2022</option>
                <option>2022-2023</option>
                <option>2023-2024</option>
                <option>2024-2025</option>
                <option>2025-2026</option>
              </select>
            </div>

            <div>
              <label>Format</label>
              <select value={format} onChange={(e) => setFormat(e.target.value)}>
                <option>Life Time</option>
                <option>Session Wise</option>
              </select>
            </div>
          </div>

          <button className="primary-btn" onClick={() => setShowReport(true)}>
            Show Report
          </button>
        </div>
      )}

      {/* ================= REPORT ================= */}
      {showReport && (
        <>
          <div className="report-header">
            <img src="/logo.png" alt="College Logo" />
            <h2>Mohammadpur Kendriya College</h2>
            <h3>Class-wise Collection Report</h3>
          </div>

          <div className="table-wrapper">
            <table className="class-wise-table">
              <thead>
                <tr>
                  <th>#SL</th>
                  <th>Class Name</th>
                  <th>Department</th>
                  <th>Section</th>
                  <th>Session</th>
                  <th>Total Collectable</th>
                  <th>Total Discounts</th>
                  <th>Total Collected</th>
                  <th>Total Dues</th>
                </tr>
              </thead>

              <tbody>
                {classWiseData.map((row) => (
                  <tr key={row.sl}>
                    <td>{row.sl}</td>
                    <td>{row.className}</td>
                    <td>{row.department}</td>
                    <td>{row.section}</td>
                    <td>{row.session}</td>
                    <td className="amount">
                      {formatMoney(row.totalCollectable)}
                    </td>
                    <td className="amount">
                      {formatMoney(row.totalDiscount)}
                    </td>
                    <td className="amount collected">
                      {formatMoney(row.totalCollected)}
                    </td>
                    <td className="amount due">
                      {formatMoney(row.totalDues)}
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* ================= TOTAL ROW ================= */}
              <tfoot>
                <tr className="total-row">
                  <td colSpan="5">TOTAL</td>
                  <td className="amount">
                    {formatMoney(totals.collectable)}
                  </td>
                  <td className="amount">
                    {formatMoney(totals.discount)}
                  </td>
                  <td className="amount collected">
                    {formatMoney(totals.collected)}
                  </td>
                  <td className="amount due">
                    {formatMoney(totals.dues)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassWiseBalanceSheet;
