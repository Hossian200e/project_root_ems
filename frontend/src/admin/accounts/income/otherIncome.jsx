import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/admin/accounts/income/otherIncome.css";

const OtherIncome = () => {
  const navigate = useNavigate();

  const [entries, setEntries] = useState([{ transactionHead: "", amount: "" }]);
  const [invoiceDate, setInvoiceDate] = useState("2025-12-22");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [checkNo, setCheckNo] = useState("");
  const [checkDate, setCheckDate] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = entries.reduce(
      (sum, entry) => sum + Number(entry.amount || 0),
      0
    );
    setTotalAmount(total);
  }, [entries]);

  const handleEntryChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const handleAddEntry = () => {
    setEntries([...entries, { transactionHead: "", amount: "" }]);
  };

  const handleRemoveEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      entries,
      invoiceDate,
      month,
      year,
      checkNo,
      checkDate,
      file,
      description,
      totalAmount,
    };
    console.log("Other Income Submitted:", data);

    // Navigate to Invoice page with state
    navigate("/otherIncome/invoice", { state: data });
  };

  return (
    <div className="other-income-page">
      <h2>Other Income</h2>

      {/* Part 1: Transaction Head & Amount */}
      <div className="part-one">
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
                <option value="Donation">Donation</option>
                <option value="Service">Service</option>
                <option value="Miscellaneous">Miscellaneous</option>
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
                placeholder="Enter amount"
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

        <div className="form-actions">
          <button type="button" onClick={handleAddEntry} className="add-btn">
            Add More
          </button>
        </div>
      </div>

      {/* Part 2: Invoice Details & Pay Now */}
      <form className="part-two" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Invoice Date</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Month</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">Select</option>
              {[
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
              ].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Year</label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Select</option>
              {Array.from({ length: 5 }, (_, i) => 2021 + i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Check No</label>
            <input
              type="text"
              value={checkNo}
              onChange={(e) => setCheckNo(e.target.value)}
              placeholder="Enter check number"
            />
          </div>

          <div className="form-group">
            <label>Check Date</label>
            <input
              type="date"
              value={checkDate}
              onChange={(e) => setCheckDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>File</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Purpose / Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter purpose or description"
            />
          </div>

          <div className="form-group">
            <label>Total Amount</label>
            <input type="number" value={totalAmount} readOnly />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="pay-now-btn">Pay Now</button>
        </div>
      </form>
    </div>
  );
};

export default OtherIncome;
