import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/monthlyBalanceSheet.css";

/* ================= SAMPLE BALANCE DATA ================= */
const balanceData = [
  {
    group: "SESSION FEE",
    items: [
      { head: "Electricity, Water & Gas", previous: 0, income: 44050, balance: 44050, expenditure: 0, net: 44050 },
      { head: "Library Charges", previous: 875, income: 0, balance: 875, expenditure: 0, net: 875 },
      { head: "Education Benevolent/Poor Fund", previous: 875, income: 0, balance: 875, expenditure: 0, net: 875 },
    ],
  },
  {
    group: "SEMESTER FEE",
    items: [
      { head: "Semester Fee-1", previous: 0, income: 99500, balance: 99500, expenditure: 0, net: 99500 },
      { head: "Semester Fee-2", previous: 0, income: 0, balance: 0, expenditure: 0, net: 0 },
    ],
  },
];

const MonthlyBalanceSheet = () => {
  const reportRef = useRef();

  /* ================= PRINT ================= */
  const handlePrint = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(reportRef.current, {
      callback: (pdf) => pdf.save("Monthly_Balance_Sheet.pdf"),
      margin: [20, 20, 20, 20],
      autoPaging: "text",
      html2canvas: { scale: 0.8 },
    });
  };

  /* ================= EXCEL ================= */
  const handleExcel = () => {
    const excelData = balanceData.flatMap((group) =>
      group.items.map((row) => ({
        Group: group.group,
        "Transaction Head": row.head,
        "Previous Balance": row.previous,
        Income: row.income,
        Balance: row.balance,
        Expenditure: row.expenditure,
        "Net Balance": row.net,
      }))
    );

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Balance Sheet");
    XLSX.writeFile(wb, "Monthly_Balance_Sheet.xlsx");
  };

  return (
    <div className="monthly-balance-page">
      {/* ================= FILTER ================= */}
      <div className="filter-card">
        <div>
          <label>Year *</label>
          <select>
            <option>2025</option>
          </select>
        </div>
        <div>
          <label>Month</label>
          <select>
            <option>December</option>
          </select>
        </div>
        <button className="show-btn">Show Balance</button>
      </div>

      {/* ================= REPORT ================= */}
      <div className="report-card" ref={reportRef}>
        <div className="report-header">
          <img src="/logo.png" alt="logo" />
          <div>
            <h2>Mohammadpur Kendriya College</h2>
            <h3>Balance Sheet: December, 2025</h3>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={handlePrint}>Print</button>
          <button onClick={handleExcel}>Download Excel</button>
        </div>

        {/* ================= TABLE ================= */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Transaction Head</th>
                <th>Previous Balance</th>
                <th>Income</th>
                <th>Balance</th>
                <th>Expenditure</th>
                <th>Net Balance</th>
              </tr>
            </thead>
            <tbody>
              {balanceData.map((group, i) => {
                const parentTotals = {
                  previous: group.items.reduce((sum, item) => sum + item.previous, 0),
                  income: group.items.reduce((sum, item) => sum + item.income, 0),
                  balance: group.items.reduce((sum, item) => sum + item.balance, 0),
                  expenditure: group.items.reduce((sum, item) => sum + item.expenditure, 0),
                  net: group.items.reduce((sum, item) => sum + item.net, 0),
                };

                return (
                  <tr key={i}>
                    <td className="transaction-head-cell">
                      <div className="parent-child-container">
                        <span className="parent-name">{group.group}</span>
                        <div className="child-items">
                          {group.items.map((item, j) => (
                            <div className="child-name" key={j}>{item.head}</div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td>{parentTotals.previous.toLocaleString()}</td>
                    <td>{parentTotals.income.toLocaleString()}</td>
                    <td>{parentTotals.balance.toLocaleString()}</td>
                    <td>{parentTotals.expenditure.toLocaleString()}</td>
                    <td>{parentTotals.net.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBalanceSheet;
