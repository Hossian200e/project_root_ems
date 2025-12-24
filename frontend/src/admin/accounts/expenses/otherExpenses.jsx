import React, { useState } from "react";
import "../../../assets/styles/admin/accounts/expenses/otherExpenses.css";

const initialExpenses = [
  {
    id: 1,
    invoiceNo: "EXP-001",
    partner: "Stationery Supplier",
    purpose: "Stationery Purchase",
    accountant: "Md. Hossain",
    date: "2025-12-01",
    amount: 5000,
  },
  {
    id: 2,
    invoiceNo: "EXP-002",
    partner: "Electricity Board",
    purpose: "Monthly Bill",
    accountant: "Md. Hossain",
    date: "2025-12-05",
    amount: 12000,
  },
  // Add more dummy expenses if needed
];

const OtherExpenses = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [search, setSearch] = useState("");

  const handleAddExpense = () => {
    alert("Redirect to Add New Expense Form");
    // You can navigate to a form page or open a modal
  };

  const filteredExpenses = expenses.filter(
    (exp) =>
      exp.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      exp.partner.toLowerCase().includes(search.toLowerCase()) ||
      exp.purpose.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="other-expenses-page">
      <h2>Other Expense List</h2>

      <div className="top-actions">
        <button className="add-expense-btn" onClick={handleAddExpense}>
          Add New Expense
        </button>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Invoice No</th>
            <th>Transaction Partner</th>
            <th>Transaction Purpose</th>
            <th>Accountant</th>
            <th>Invoice Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan="8">Loading...</td>
            </tr>
          ) : (
            filteredExpenses.map((exp, index) => (
              <tr key={exp.id}>
                <td>{index + 1}</td>
                <td>{exp.invoiceNo}</td>
                <td>{exp.partner}</td>
                <td>{exp.purpose}</td>
                <td>{exp.accountant}</td>
                <td>{exp.date}</td>
                <td>{exp.amount}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <span>10 entries per page</span>
      </div>
    </div>
  );
};

export default OtherExpenses;
