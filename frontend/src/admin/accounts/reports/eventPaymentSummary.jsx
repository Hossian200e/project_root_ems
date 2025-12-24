import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/eventPaymentSummary.css";

/* ================= SAMPLE DATA ================= */
const sampleData = [
  { id: 1, event: "Admission Test - BBS", totalCandidate: 19, totalAmount: 160930 },
  { id: 2, event: "Admission Test - BA", totalCandidate: 44, totalAmount: 372680 },
  { id: 3, event: "Admission Test - BSS", totalCandidate: 21, totalAmount: 177870 },
];

/* ================= HELPERS ================= */
const formatMoney = (amount) =>
  Number(amount).toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const EventPaymentSummary = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [data, setData] = useState(sampleData); // Initially show all data

  // Show filtered list based on selected event
  const handleShowList = () => {
    if (selectedEvent === "") {
      setData(sampleData); // show all if no selection
    } else {
      const filtered = sampleData.filter((row) => row.event === selectedEvent);
      setData(filtered);
    }
  };

  // Download Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "EventPaymentSummary");
    XLSX.writeFile(workbook, "EventPaymentSummary.xlsx");
  };

  // View action (for now, just alert)
  const handleView = (row) => {
    alert(`Viewing details for: ${row.event}`);
  };

  return (
    <div className="event-payment-page">
      {/* ================= FILTER ================= */}
      <div className="filter-section">
        <label>
          Select Event:
          <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
            <option value="">All Events</option>
            {sampleData.map((row) => (
              <option key={row.id} value={row.event}>
                {row.event}
              </option>
            ))}
          </select>
        </label>

        <button className="show-btn" onClick={handleShowList}>
          Show List
        </button>
      </div>

      {/* ================= TABLE ================= */}
      {data.length > 0 && (
        <div className="table-wrapper">
          <table className="payment-summary-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Total Candidate</th>
                <th>Total Amount (৳)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.event}</td>
                  <td className="center">{row.totalCandidate}</td>
                  <td className="amount">{formatMoney(row.totalAmount)}</td>
                  <td className="center">
                    <button className="view-btn" onClick={() => handleView(row)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* TOTAL ROW */}
            <tfoot>
              <tr className="total-row">
                <td>Total</td>
                <td className="center">{data.reduce((sum, r) => sum + r.totalCandidate, 0)}</td>
                <td className="amount">{formatMoney(data.reduce((sum, r) => sum + r.totalAmount, 0))}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>

          <div className="download-section">
            <button className="download-btn" onClick={handleDownloadExcel}>
              Download Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPaymentSummary;
