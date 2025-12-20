import React, { useState } from "react";
import "../../../assets/styles/admin/accounts/configurations/createFeeCollectionTemplate.css";

const CreateFeeCollectionTemplate = () => {
  const [sessions, setSessions] = useState([
    "2025-2026",
    "2026-2027",
    "2027-2028",
  ]);
  const [selectedSession, setSelectedSession] = useState("");
  
  const [classList, setClassList] = useState([
    { id: 1, className: "HSC-Science", eduLevel: "Higher Secondary", department: "Science", medium: "Bangla", shift: "Day", selected: false },
    { id: 2, className: "HSC-Humanities", eduLevel: "Higher Secondary", department: "Humanities", medium: "Bangla", shift: "Day", selected: false },
    { id: 3, className: "HSC-Business Studies", eduLevel: "Higher Secondary", department: "B. Studies", medium: "Bangla", shift: "Day", selected: false },
    { id: 4, className: "Preliminary Masters", eduLevel: "Preliminary Masters", department: "Economics", medium: "Bangla", shift: "Day", selected: false },
    { id: 5, className: "Preliminary Masters", eduLevel: "Preliminary Masters", department: "Islamic History & Culture", medium: "Bangla", shift: "Day", selected: false },
  ]);

  const [transactionHeads, setTransactionHeads] = useState([
    { id: 1, title: "Examination Fee", type: "Irregular", qty: 0, payableMonths: 0, amount: 0 },
    { id: 2, title: "Primary Apply Fee", type: "Irregular", qty: 0, payableMonths: 0, amount: 0 },
    { id: 3, title: "Form Fill Up => Center Fee", type: "Irregular", qty: 0, payableMonths: 0, amount: 0 },
    { id: 4, title: "Form Fill Up => Exam Fee (5 paper × 700)", type: "Irregular", qty: 0, payableMonths: 0, amount: 0 },
    // Add more heads as needed...
  ]);

  const toggleClassSelection = (id) => {
    setClassList(
      classList.map((cls) => (cls.id === id ? { ...cls, selected: !cls.selected } : cls))
    );
  };

  const selectAllClasses = (checked) => {
    setClassList(classList.map((cls) => ({ ...cls, selected: checked })));
  };

  const handleTransactionChange = (id, field, value) => {
    setTransactionHeads(
      transactionHeads.map((head) => (head.id === id ? { ...head, [field]: value } : head))
    );
  };

  const totalAmount = transactionHeads.reduce((sum, head) => sum + Number(head.amount || 0), 0);

  return (
    <div className="create-fee-template-page">
      <div className="breadcrumb">Dashboard / Accounts / Fee Collection Templates / Create Fee Collection Template</div>

      <h2>Create Fee Collection Template</h2>

      {/* Session selection */}
      <div className="session-selection">
        <label>Session:</label>
        <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)}>
          <option value="">Select Session</option>
          {sessions.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Class selection */}
      <div className="class-selection">
        <h3>Class Name List</h3>
        <div className="class-controls">
          <button onClick={() => selectAllClasses(true)}>Select All</button>
          <button onClick={() => selectAllClasses(false)}>Clear Selection</button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Class Name</th>
                <th>Education Level</th>
                <th>Department</th>
                <th>Medium</th>
                <th>Shift</th>
              </tr>
            </thead>
            <tbody>
              {classList.map((cls) => (
                <tr key={cls.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={cls.selected}
                      onChange={() => toggleClassSelection(cls.id)}
                    />
                  </td>
                  <td>{cls.className}</td>
                  <td>{cls.eduLevel}</td>
                  <td>{cls.department}</td>
                  <td>{cls.medium}</td>
                  <td>{cls.shift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Heads Table */}
      <div className="transaction-heads">
        <h3>Transaction Heads</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Head Title</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Payable Months</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactionHeads.map((head) => (
                <tr key={head.id}>
                  <td>{head.title}</td>
                  <td>{head.type}</td>
                  <td>
                    <input
                      type="number"
                      value={head.qty}
                      onChange={(e) => handleTransactionChange(head.id, "qty", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={head.payableMonths}
                      onChange={(e) => handleTransactionChange(head.id, "payableMonths", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={head.amount}
                      onChange={(e) => handleTransactionChange(head.id, "amount", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
                <td>{totalAmount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateFeeCollectionTemplate;
