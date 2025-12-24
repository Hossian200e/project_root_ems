import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/totalCollectionReport.css";

const monthlyData = [
  {
    month: "August, 2025",
    manualQty: 3337,
    onlineQty: 0,
    manualAmount: 42006075,
    onlineAmount: 0,
  },
  {
    month: "September, 2025",
    manualQty: 4442,
    onlineQty: 0,
    manualAmount: 43851885,
    onlineAmount: 0,
  },
  {
    month: "October, 2025",
    manualQty: 1915,
    onlineQty: 0,
    manualAmount: 13361210,
    onlineAmount: 0,
  },
  {
    month: "November, 2025",
    manualQty: 2166,
    onlineQty: 0,
    manualAmount: 18436835,
    onlineAmount: 0,
  },
  {
    month: "December, 2025",
    manualQty: 1026,
    onlineQty: 0,
    manualAmount: 9861550,
    onlineAmount: 0,
  },
];

const MonthlyFeeReport = () => {
  const [reportType, setReportType] = useState("");
  const [year, setYear] = useState("2025");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const reportRef = useRef();

  const handlePrint = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(reportRef.current, {
      callback: (pdf) => pdf.save("Total_Collection_Report.pdf"),
      margin: [20, 20, 20, 20],
    });
  };

  const handleExcel = () => {
    const excelData = monthlyData.map((row) => ({
      Month: row.month,
      "Manual Qty": row.manualQty,
      "Online Qty": row.onlineQty,
      "Manual Amount": row.manualAmount,
      "Online Amount": row.onlineAmount,
      "Total Amount": row.manualAmount + row.onlineAmount,
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Total Collection");
    XLSX.writeFile(wb, "Total_Collection_Report.xlsx");
  };

  return (
    <div className="monthly-report-page">
      {/* ===== Search Section ===== */}
      <div className="search-card">
        <h3>Total Collection Report</h3>

        <div className="form-row">
          <div>
            <label>Select Report Type</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="">Select</option>
              <option value="yearly">Yearly</option>
              <option value="dateRange">Date Range</option>
            </select>
          </div>

          {reportType === "yearly" && (
            <>
              <div>
                <label>Select Year</label>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option>2025</option>
                  <option>2024</option>
                </select>
              </div>

              <div>
                <label>Select Month</label>
                <select>
                  <option>Select</option>
                </select>
              </div>
            </>
          )}

          {reportType === "dateRange" && (
            <>
              <div>
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div>
                <label>End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* ===== Result Section ===== */}
      <div className="report-card" ref={reportRef}>
        <div className="report-header">
          <img src="/logo.png" alt="Logo" />
          <h2>Mohammadpur Kendriya College</h2>
          <h3>Total Collection Report</h3>
          <p>{year}</p>
        </div>

        <div className="report-actions">
          <button onClick={handlePrint}>Print</button>
          <button onClick={handleExcel}>Download Excel</button>
        </div>

        <table>
          <thead>
            <tr>
              <th rowSpan="2">Month</th>
              <th colSpan="2">Quantity</th>
              <th colSpan="3">Amount</th>
            </tr>
            <tr>
              <th>Manual</th>
              <th>Online</th>
              <th>Manual</th>
              <th>Online</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((row, i) => (
              <tr key={i}>
                <td>{row.month}</td>
                <td>{row.manualQty}</td>
                <td>{row.onlineQty}</td>
                <td>{row.manualAmount.toFixed(2)}</td>
                <td>{row.onlineAmount.toFixed(2)}</td>
                <td>{(row.manualAmount + row.onlineAmount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyFeeReport;
