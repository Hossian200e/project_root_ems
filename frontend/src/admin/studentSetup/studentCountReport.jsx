import React, { useState } from "react";
import "../../assets/styles/admin/studentSetup/studentCountReport.css";

const StudentCountReport = () => {
  const [filters, setFilters] = useState({
    session: "2025-2026",
    className: "HSC-Science",
  });

  const [showReport, setShowReport] = useState(false);

  const detailedData = [
    {
      shift: "Day",
      version: "Bangla",
      class: "HSC-Science",
      group: "Science",
      section: "1st Year",
      boys: 36,
      girls: 29,
      total: 65,
    },
    {
      shift: "Day",
      version: "Bangla",
      class: "HSC-Science",
      group: "Science",
      section: "1st Year (A)",
      boys: 45,
      girls: 0,
      total: 45,
    },
  ];

  const summaryData = [
    {
      shiftVersion: "BM-DS",
      boys: 81,
      girls: 29,
      total: 110,
    },
  ];

  // Calculate totals
  const totalBoys = detailedData.reduce((sum, row) => sum + row.boys, 0);
  const totalGirls = detailedData.reduce((sum, row) => sum + row.girls, 0);
  const grandTotal = detailedData.reduce((sum, row) => sum + row.total, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="student-count-report">


      {/* Filters */}
      <div className="filters">
        <label>
          Session:
          <select
            value={filters.session}
            onChange={(e) =>
              setFilters({ ...filters, session: e.target.value })
            }
          >
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
          </select>
        </label>

        <label>
          Class:
          <select
            value={filters.className}
            onChange={(e) =>
              setFilters({ ...filters, className: e.target.value })
            }
          >
            <option value="HSC-Science">HSC-Science</option>
            <option value="HSC-Arts">HSC-Arts</option>
          </select>
        </label>

        <button className="show-btn" onClick={() => setShowReport(true)}>
          Show
        </button>

        {showReport && (
          <button className="print-btn" onClick={handlePrint}>
            Print
          </button>
        )}
      </div>
      {/* Header */}
      <div className="report-header">
        <img
          src="https://via.placeholder.com/80"
          alt="College Logo"
          className="logo"
        />
        <h2>Mohammadpur Kendriya College</h2>
        <h3>Student Summary Report</h3>
      </div>
      {/* Conditional Rendering of Report */}
      {showReport && (
        <div className="report-content">
          {/* Detailed Table */}
          <div className="report-table">
            <h4>Students Summary ({filters.className})</h4>
            <table>
              <thead>
                <tr>
                  <th>Shift</th>
                  <th>Version</th>
                  <th>Class</th>
                  <th>Group</th>
                  <th>Section</th>
                  <th>Boys</th>
                  <th>Girls</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {detailedData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.shift}</td>
                    <td>{row.version}</td>
                    <td>{row.class}</td>
                    <td>{row.group}</td>
                    <td>{row.section}</td>
                    <td>{row.boys}</td>
                    <td>{row.girls}</td>
                    <td>{row.total}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="5">Total for ({detailedData[0].shift}-{detailedData[0].version})</td>
                  <td>{totalBoys}</td>
                  <td>{totalGirls}</td>
                  <td>{grandTotal}</td>
                </tr>
                <tr className="grand-total-row">
                  <td colSpan="5">G. Total</td>
                  <td>{totalBoys}</td>
                  <td>{totalGirls}</td>
                  <td>{grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Table */}
          <div className="report-table">
            <h4>Students Summary ({filters.className})</h4>
            <table>
              <thead>
                <tr>
                  <th>Shift & Version</th>
                  <th>Boys</th>
                  <th>Girls</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {summaryData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.shiftVersion}</td>
                    <td>{row.boys}</td>
                    <td>{row.girls}</td>
                    <td>{row.total}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td>Total</td>
                  <td>{totalBoys}</td>
                  <td>{totalGirls}</td>
                  <td>{grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCountReport;
