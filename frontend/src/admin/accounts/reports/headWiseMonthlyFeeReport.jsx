import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/headWiseMonthlyFeeReport.css";

/* ================= ALL FEE HEADS ================= */
const feeHeads = [
  "Examination Fee",
  "Primary Apply Fee",
  "Paper",
  "Incourse",
  "Center Fee",
  "Management Fee",
  "University Practical Fee",
  "Centre Practical Fee",
  "Online Fee & Service charge",
  "Exam Fee (5 paper × 700)",
  "Electricity, Water & Gas",
  "Library Charges",
  "Education Benevolent/Poor Fund",
  "Id Card Fee",
  "Cultural Activities & Student Counseling Fee",
  "Newspapers & Periodicals etc.",
  "College Development & Establishment Fee",
  "Student Welfare Fee/Academic Award",
  "Rover Scout Fee",
  "Sports Fee",
  "Environment & Cleaning",
  "Miscellaneous",
  "Religious & Social Work",
  "B.N.C.C/Girls Guide Fee",
  "Gratuity Fund for Teachers/Employees",
  "Land Tax",
  "Seminar, Symposium/Magazine Fee",
  "Internal Exam Fee",
  "Online Fee",
  "College Lab Fee",
  "Field Work, Viva, Voce & Industrial Visit (Pro)",
  "Registration Fee",
  "Semester Fee",
  "Form Fill Up Fee",
  "Testimonial",
  "TC Fee",
  "Computer Lab Fee",
  "Admission Fee",
  "Session Fee",
  "Tuition Fee",
  "ICT Fee",
  "Practical Fee",
  "University Exam Fee",
  "Service Charge",
  "ID Card",
  "Mobile Fine",
];

/* ================= SAMPLE STUDENT DATA ================= */
const students = [
  {
    name: "SAIFUL ISLAM",
    roll: "1202526033046",
    category: "",
    collectable: 1000,
    paid: 1000,
    due: 0,
    heads: {
      "Tuition Fee": 1000,
    },
  },
  {
    name: "MD. NASIMUL ISLAM RADOAN",
    roll: "1202526033047",
    category: "",
    collectable: 1000,
    paid: 1000,
    due: 0,
    heads: {
      "Tuition Fee": 1000,
    },
  },
];

const HeadWiseMonthlyFeeReport = () => {
  const reportRef = useRef();

  const [filters, setFilters] = useState({
    eduLevel: "",
    department: "",
    className: "",
    section: "",
    session: "",
    month: "",
    year: "",
    format: "",
  });

  /* ================= PRINT ================= */
  const handlePrint = () => {
    const doc = new jsPDF("l", "pt", "a4");
    doc.html(reportRef.current, {
      callback: (pdf) => pdf.save("Head_Wise_Monthly_Fee_Report.pdf"),
      margin: [20, 20, 20, 20],
      autoPaging: "text",
      html2canvas: { scale: 0.5 },
    });
  };

  /* ================= EXCEL ================= */
  const handleExcel = () => {
    const excelData = students.map((s, i) => {
      const row = {
        SL: i + 1,
        "Student Name": s.name,
        Roll: s.roll,
        "St. Category": s.category,
        "Total Collectable Amount": s.collectable,
        "Total Paid": s.paid,
        "Total Due": s.due,
      };

      feeHeads.forEach((h) => {
        row[h] = s.heads[h] || 0;
      });

      return row;
    });

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Head Wise Fee");
    XLSX.writeFile(wb, "Head_Wise_Monthly_Fee_Report.xlsx");
  };

  return (
    <div className="head-wise-page">
      {/* ================= FILTER SECTION ================= */}
      <div className="filter-card">
        {[
          ["Edu. Level", "eduLevel"],
          ["Department", "department"],
          ["Class", "className"],
          ["Section", "section"],
          ["Session", "session"],
          ["Month", "month"],
          ["Year", "year"],
        ].map(([label, key]) => (
          <div key={key}>
            <label>{label}</label>
            <select onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}>
              <option value="">Select</option>
            </select>
          </div>
        ))}

        {/* REPORT FORMAT TYPE */}
        <div>
          <label>Report Format Type</label>
          <select
            value={filters.format}
            onChange={(e) => setFilters({ ...filters, format: e.target.value })}
          >
            <option value="">Select</option>
            <option value="parent">Parent Head</option>
            <option value="child">Child Head</option>
          </select>
        </div>

        <button className="show-btn">Show Report</button>
      </div>

      {/* ================= REPORT ================= */}
      <div className="report-card" ref={reportRef}>
        <div className="report-header">
          <img src="/logo.png" alt="logo" />
          <div>
            <h2>Mohammadpur Kendriya College</h2>
            <h3>Student Payment Report</h3>
          </div>
        </div>

        <div className="meta-grid">
          <div><b>Campus:</b> Mohammadpur Kendriya College</div>
          <div><b>Shift:</b> Day</div>
          <div><b>Medium:</b> Bangla</div>
          <div><b>Class:</b> HSC-Science</div>
          <div><b>Section:</b> 1st Year</div>
          <div><b>Session:</b> 2025-2026</div>
          <div><b>Year:</b> 2025</div>
          <div><b>Month:</b> November</div>
          <div><b>Total Student:</b> 65</div>
        </div>

        <div className="action-buttons">
          <button onClick={handlePrint}>Print</button>
          <button onClick={handleExcel}>Download Excel</button>
        </div>

        {/* ================= TABLE ================= */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Student Name</th>
                <th>Roll</th>
                <th>St. Category</th>
                <th>Total Collectable</th>
                <th>Total Paid</th>
                <th>Total Due</th>
                {feeHeads.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.roll}</td>
                  <td>{s.category}</td>
                  <td>{s.collectable.toFixed(2)}</td>
                  <td>{s.paid.toFixed(2)}</td>
                  <td>{s.due.toFixed(2)}</td>
                  {feeHeads.map((h, j) => (
                    <td key={j}>{(s.heads[h] || 0).toFixed(2)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HeadWiseMonthlyFeeReport;
