import React, { useState } from "react";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/transactionSummaryReport.css";

/* ================= SAMPLE DATA ================= */
const sampleData = [
  { id: 1, transactions: 12903, amount: 126344085, commission: 0.0 },
  { id: 2, transactions: 8421, amount: 65432100, commission: 0.0 },
];

const TransactionSummaryReport = () => {
  const [transactionType, setTransactionType] = useState("");
  const [partner, setPartner] = useState("");
  const [fromDate, setFromDate] = useState("2025-07-28");
  const [toDate, setToDate] = useState("2025-12-24");
  const [data, setData] = useState([]);

  // Show filtered list (for demo, just display all sample data)
  const handleShow = () => {
    setData(sampleData);
  };

  // Download Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TransactionSummary");
    XLSX.writeFile(workbook, "TransactionSummary.xlsx");
  };

  // Print report
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="transaction-summary-page">
      {/* ================= FILTER SECTION ================= */}
      <div className="filter-section">
        <label>
          Transaction Type:
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
            <option value="">Select</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label>
          Transaction Partner:
          <select value={partner} onChange={(e) => setPartner(e.target.value)}>
            <option value="">Select</option>
            <option value="partner1">Partner 1</option>
            <option value="partner2">Partner 2</option>
          </select>
        </label>

        <label>
          From Date:
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </label>

        <label>
          To Date:
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </label>

        <button className="show-btn" onClick={handleShow}>
          Show
        </button>
      </div>

      {/* ================= REPORT SECTION ================= */}
      {data.length > 0 && (
        <div className="report-section">
          <div className="report-header">
            <img src="/profile.png" alt="Logo" className="report-logo" />
            <h2>Mohammadpur Kendriya College</h2>
            <h3>Transaction Summary</h3>
            <p>
              From Date: {new Date(fromDate).toLocaleDateString("en-GB")} | To Date:{" "}
              {new Date(toDate).toLocaleDateString("en-GB")}
            </p>
          </div>

          <div className="table-wrapper">
            <table className="summary-table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Number of Transactions</th>
                  <th>Amount (৳)</th>
                  <th>Commission (৳)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={row.id}>
                    <td className="center">{index + 1}</td>
                    <td className="center">{row.transactions}</td>
                    <td className="amount">{row.amount.toLocaleString("en-BD")}</td>
                    <td className="amount">{row.commission.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="action-buttons">
            <button className="print-btn" onClick={handlePrint}>
              Print
            </button>
            <button className="download-btn" onClick={handleDownloadExcel}>
              Download Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionSummaryReport;
