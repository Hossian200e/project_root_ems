import React, { useState } from "react";
import "../../../assets/styles/admin/accounts/configurations/accountClosing.css";

const AccountClosing = () => {
  // Dummy account closing data
  const [accounts, setAccounts] = useState([
    {
      month: "January 2025",
      previousBalance: 15000,
      totalIncome: 8000,
      totalExpense: 5000,
    },
    {
      month: "February 2025",
      previousBalance: 18000,
      totalIncome: 12000,
      totalExpense: 7000,
    },
    {
      month: "March 2025",
      previousBalance: 23000,
      totalIncome: 9000,
      totalExpense: 4000,
    },
  ]);

  // Calculate net balance
  const calculateNet = (acc) =>
    acc.previousBalance + acc.totalIncome - acc.totalExpense;

  // Add new month
  const handleAddMonth = () => {
    const month = prompt("Enter month (e.g., April 2025):");
    if (month) {
      setAccounts([
        ...accounts,
        {
          month,
          previousBalance: 0,
          totalIncome: 0,
          totalExpense: 0,
        },
      ]);
    }
  };

  // Close month
  const handleCloseMonth = (month) => {
    alert(`Account for ${month} has been closed (Demo).`);
  };

  // Export CSV
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

  // Print table
  const handlePrint = () => {
    window.print();
  };

  // Totals
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
      <div className="breadcrumb">
        Dashboard / Accounts / Account Closing
      </div>

      <div className="page-header">
        <h2>Account Closing</h2>
        <div className="header-actions">
          <button className="add-btn" onClick={handleAddMonth}>
            + Add New Month Closing
          </button>
          <button className="export-btn" onClick={handleExportCSV}>
            Export CSV
          </button>
          <button className="print-btn" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>

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
                  <button
                    className="close-btn"
                    onClick={() => handleCloseMonth(acc.month)}
                  >
                    Close Month
                  </button>
                </td>
              </tr>
            ))}

            {/* Totals Row */}
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
