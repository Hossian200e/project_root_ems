import React, { useState } from "react";
import "../../../assets/styles/admin/accounts/configurations/accountClosing.css";

const AccountClosing = () => {
  const [accounts, setAccounts] = useState([
    { month: "January 2025", previousBalance: 15000, totalIncome: 8000, totalExpense: 5000 },
    { month: "February 2025", previousBalance: 18000, totalIncome: 12000, totalExpense: 7000 },
    { month: "March 2025", previousBalance: 23000, totalIncome: 9000, totalExpense: 4000 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 10 }, (_, i) => 2025 + i); // 2025 to 2034

  const calculateNet = (acc) => acc.previousBalance + acc.totalIncome - acc.totalExpense;

  const handleAddMonth = () => setShowModal(true);

  const handleSaveMonth = () => {
    if (!selectedMonth || !selectedYear) return alert("Please select month and year");
    const monthYear = `${selectedMonth} ${selectedYear}`;
    setAccounts([
      ...accounts,
      { month: monthYear, previousBalance: 0, totalIncome: 0, totalExpense: 0 },
    ]);
    setSelectedMonth("");
    setSelectedYear("");
    setShowModal(false);
  };

  const handleCancelMonth = () => {
    setSelectedMonth("");
    setSelectedYear("");
    setShowModal(false);
  };

  const handleCloseMonth = (month) => alert(`Account for ${month} has been closed (Demo).`);

  const handleExportCSV = () => {
    let csv = "Month,Previous Balance,Total Income,Total Expense,Net Balance\n";
    accounts.forEach((acc) => {
      csv += `${acc.month},${acc.previousBalance},${acc.totalIncome},${acc.totalExpense},${calculateNet(acc)}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "account_closing.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => window.print();

  const totals = accounts.reduce(
    (acc, curr) => {
      acc.previousBalance += curr.previousBalance;
      acc.totalIncome += curr.totalIncome;
      acc.totalExpense += curr.totalExpense;
      acc.netBalance += calculateNet(curr);
      return acc;
    },
    { previousBalance: 0, totalIncome: 0, totalExpense: 0, netBalance: 0 }
  );

  return (
    <div className="account-closing-page">
      <div className="breadcrumb">Dashboard / Accounts / Account Closing</div>

      <div className="page-header">
        <h2>Account Closing</h2>
        <div className="header-actions">
          <button className="add-btn" onClick={handleAddMonth}>+ Add New Month Closing</button>
          <button className="export-btn" onClick={handleExportCSV}>Export CSV</button>
          <button className="print-btn" onClick={handlePrint}>Print</button>
        </div>
      </div>

      {/* Modal-like month/year selector */}
      {showModal && (
        <div className="month-modal">
          <div className="month-modal-content">
            <h4>Closing account of a month</h4>
            <div className="month-year-select">
              <label>Month</label>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                <option value="">Select</option>
                {months.map((m, i) => <option key={i} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="month-year-select">
              <label>Year</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="">Select</option>
                {years.map((y, i) => <option key={i} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSaveMonth}>Save</button>
              <button className="cancel-btn" onClick={handleCancelMonth}>Cancel</button>
            </div>
            <div className="powered-text">Powered</div>
          </div>
        </div>
      )}

      <div className="account-table-card">
        <table className="account-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Previous Balance</th>
              <th>Total Income</th>
              <th>Total Expense</th>
              <th>Net Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc, index) => (
              <tr key={index}>
                <td>{acc.month}</td>
                <td>{acc.previousBalance.toFixed(2)}</td>
                <td>{acc.totalIncome.toFixed(2)}</td>
                <td>{acc.totalExpense.toFixed(2)}</td>
                <td>{calculateNet(acc).toFixed(2)}</td>
                <td>
                  <button className="close-btn" onClick={() => handleCloseMonth(acc.month)}>Close Month</button>
                </td>
              </tr>
            ))}
            <tr className="totals-row">
              <td><strong>Totals</strong></td>
              <td>{totals.previousBalance.toFixed(2)}</td>
              <td>{totals.totalIncome.toFixed(2)}</td>
              <td>{totals.totalExpense.toFixed(2)}</td>
              <td>{totals.netBalance.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountClosing;
