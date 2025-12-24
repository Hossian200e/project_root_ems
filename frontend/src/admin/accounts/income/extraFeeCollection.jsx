import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/admin/accounts/income/extraFeeCollection.css";

const ExtraFeeCollection = () => {
  const navigate = useNavigate();

  // Part 1: Search filters
  const [studentID, setStudentID] = useState("");
  const [studentRoll, setStudentRoll] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  // Part 2: Student info
const [student, setStudent] = useState({
  code: "2414020080238",
  name: "Tansir Khan Sajid",
  roll: "23",
  className: "12th Grade",
  section: "A",
  department: "Science",
  medium: "English",
  shift: "Morning",
  invoiceDate: "2025-12-22",
  paymentUpTo: "December 2025"
});


  // Part 3: Transaction entries
  const [entries, setEntries] = useState([{ transactionHead: "", amount: "" }]);

  // Part 4: Extra fee info
  const [cause, setCause] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total amount whenever entries change
  useEffect(() => {
    const total = entries.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    setTotalAmount(total);
  }, [entries]);

  const handleEntryChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const handleAddEntry = () => {
    setEntries([...entries, { transactionHead: "", amount: "" }]);
  };

  const handleRemoveEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  // Search button click
  const handleSearch = () => {
    // In real app, fetch student data by ID/roll
    setIsSearched(true);
  };

  // Generate Invoice
  const handleGenerateInvoice = () => {
    const invoiceData = {
      student,
      entries,
      totalAmount,
      cause,
    };
    navigate("/extraFeeCollection/incoice", { state: invoiceData });
  };

  return (
    <div className="extra-fee-page">
      <h2>Extra Fee Collection</h2>

      {/* Part 1: Filters */}
      <label>Student ID</label>
      <div className="filter-section">
        <input
          type="text"
          placeholder="Student ID"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
        />
        <label>Student Roll</label>
        <input
          type="text"
          placeholder="Student Roll"
          value={studentRoll}
          onChange={(e) => setStudentRoll(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {isSearched && (
        <>
          {/* Part 2: Student Info */}
<div className="student-info">
  <div className="info-row">
    <div className="info-column">
      <p><strong>Student Code:</strong> {student.code}</p>
      <p><strong>Roll:</strong> {student.roll || "N/A"}</p>
      <p><strong>Class:</strong> {student.className || "N/A"}</p>
      <p><strong>Section:</strong> {student.section || "N/A"}</p>
    </div>
    <div className="info-column">
      <p><strong>Student Name:</strong> {student.name}</p>
      <p><strong>Department:</strong> {student.department || "N/A"}</p>
      <p><strong>Medium:</strong> {student.medium || "N/A"}</p>
      <p><strong>Shift:</strong> {student.shift || "N/A"}</p>
    </div>
  </div>
  <div className="info-row">
    <p><strong>Invoice Date:</strong> {student.invoiceDate}</p>
    <p><strong>Payment Up To:</strong> {student.paymentUpTo || "N/A"}</p>
  </div>
</div>


          {/* Part 3: Transaction Head & Amount */}
          <div className="transaction-section">
            {entries.map((entry, index) => (
              <div className="form-row" key={index}>
                <div className="form-group">
                  <label>Transaction Head</label>
                  <select
                    value={entry.transactionHead}
                    onChange={(e) =>
                      handleEntryChange(index, "transactionHead", e.target.value)
                    }
                  >
                    <option value="">Select Transaction Head</option>
                    <option value="Library Fee">Library Fee</option>
                    <option value="Lab Fee">Lab Fee</option>
                    <option value="ID Card Fee">ID Card Fee</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    value={entry.amount}
                    onChange={(e) =>
                      handleEntryChange(index, "amount", e.target.value)
                    }
                  />
                </div>

                {entries.length > 1 && (
                  <div className="form-group remove-btn-container">
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemoveEntry(index)}
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button type="button" className="add-btn" onClick={handleAddEntry}>
              Add More
            </button>
          </div>

          {/* Part 4: Total Amount & Cause */}
          <div className="extra-fee-info">
            <div className="form-group">
              <label>Total Amount</label>
              <input type="number" value={totalAmount} readOnly />
            </div>

            <div className="form-group">
              <label>Cause of ID Card Re-issue</label>
              <select value={cause} onChange={(e) => setCause(e.target.value)}>
                <option value="">Select Cause</option>
                <option value="Lost">Lost</option>
                <option value="Damaged">Damaged</option>
                <option value="Old ID">Old ID</option>
              </select>
            </div>

            <button className="mark-paid-btn">Mark As Paid</button>
          </div>

          {/* Part 5: Invoice Generate */}
          <div className="form-actions">
            <button className="invoice-generate-btn" onClick={handleGenerateInvoice}>
              Generate Invoice
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExtraFeeCollection;
