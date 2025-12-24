import React, { useState } from "react";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/classWiseCategoryReport.css";

/* ================= SAMPLE DATA ================= */
const sampleData = [
  {
    id: 1,
    className: "HSC- Humanities",
    "Examination Fee": 0,
    "Thesis and oral examination Fee": 0,
    "Temporary Certificate and transcript Fee": 0,
    "Tuition Fee": 489000,
    "ID CARD": 500,
    "Total Amount": 675360,
  },
  // You can add more rows for other classes
];

const ClassWiseCategoryReport = () => {
  const [fromDate, setFromDate] = useState("2025-10-01");
  const [toDate, setToDate] = useState("2025-12-24");
  const [session, setSession] = useState("2024-2025");
  const [selectedClass, setSelectedClass] = useState("HSC- Humanities");
  const [data, setData] = useState([]);

  const handleLoadBalanceSheet = () => {
    // For demo, just load sample data
    setData(sampleData);
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ClassWiseCategory");
    XLSX.writeFile(workbook, "ClassWiseCategoryReport.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  // Get all column headers dynamically
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="class-wise-page">
      {/* ================= FILTER SECTION ================= */}
      <div className="filter-section">
        <label>
          Report Type:
          <select>
            <option value="classCategory">Class Wise Category</option>
          </select>
        </label>

        <label>
          Start Date:
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </label>

        <label>
          End Date:
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </label>

        <label>
          Session:
          <select value={session} onChange={(e) => setSession(e.target.value)}>
            <option value="2024-2025">2024-2025</option>
          </select>
        </label>

        <label>
          Class:
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="HSC- Humanities">HSC- Humanities</option>
            <option value="HSC- Science">HSC- Science</option>
            <option value="HSC- Business">HSC- Business</option>
          </select>
        </label>

        <button className="show-btn" onClick={handleLoadBalanceSheet}>
          Load Balance Sheet
        </button>
      </div>

      {/* ================= REPORT SECTION ================= */}
      {data.length > 0 && (
        <div className="report-section">
          <div className="report-header">
            <img src="/profile.png" alt="Logo" className="report-logo" />
            <h2>Mohammadpur Kendriya College</h2>
            <h3>Class Wise Category Report</h3>
            <p>
              {new Date(fromDate).toLocaleDateString("en-GB")} To{" "}
              {new Date(toDate).toLocaleDateString("en-GB")}
            </p>
            <p>Class: {selectedClass}</p>
          </div>

          <div className="table-wrapper">
            <table className="category-table">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id}>
                    {columns.map((col) => (
                      <td key={col} className={typeof row[col] === "number" ? "amount" : ""}>
                        {typeof row[col] === "number" ? row[col].toLocaleString("en-BD") : row[col]}
                      </td>
                    ))}
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

export default ClassWiseCategoryReport;
