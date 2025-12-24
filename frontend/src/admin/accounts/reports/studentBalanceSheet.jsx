import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/studentBalanceSheet.css";

/* =========================================================
   COLUMN DEFINITIONS (SINGLE SOURCE OF TRUTH)
========================================================= */
const COLUMNS = [
  { key: "sl", label: "Sl" },
  { key: "studentName", label: "Student Name" },
  { key: "roll", label: "Roll" },

  { key: "examFee", label: "Examination Fee" },
  { key: "thesisFee", label: "Thesis and oral examination Fee" },
  { key: "tempCertFee", label: "Temporary Certificate and transcript Fee" },
  { key: "examCenterFee", label: "Examination Center Fee" },
  { key: "practicalFee", label: "Practical Fee" },
  { key: "serviceCharge", label: "Service Charge" },

  { key: "semesterFee", label: "Semester Fee" },
  { key: "protyononPotro", label: "প্রত্যয়ন পত্র" },
  { key: "testimonial", label: "Testimonial" },
  { key: "idCard", label: "ID CARD" },
  { key: "mobileFine", label: "Mobile Fine" },
  { key: "tuitionFee", label: "Tuition Fee" },
  { key: "reAdmissionFee", label: "Re-admission Fee" },
  { key: "absentFine", label: "Absent Fine" },
  { key: "ictFee", label: "ICT Fee" },
  { key: "collegePractical", label: "College Practical Fee (Yearly)" },
  { key: "miscIncome", label: "Miscellaneous Income" },
  { key: "labFee", label: "Lab Fee" },
  { key: "centerFee", label: "Center Fee" },

  { key: "electricity", label: "Electricity, Water & Gas" },
  { key: "library", label: "Library Charges" },
  { key: "benevolent", label: "Education Benevolent/Poor Fund" },

  { key: "sessionFee", label: "SESSION FEE" },
  { key: "semesterFee1", label: "Semester Fee-1" },
  { key: "semesterFee2", label: "Semester Fee-2" },
  { key: "semesterFee3", label: "Semester Fee-3" },

  { key: "extraDues", label: "Extra Dues" },

  { key: "totalCollectible", label: "Total Collectible Amount" },
  { key: "totalDiscount", label: "Total Discount" },
  { key: "totalCollected", label: "Total Collected" },
  { key: "totalDue", label: "Total Dues" },
];

/* =========================================================
   SAMPLE DATA (API READY STRUCTURE)
========================================================= */
const rows = [
  {
    sl: 1,
    studentName: "SAIFUL ISLAM",
    roll: "1202526033046",

    examFee: 0,
    thesisFee: 0,
    tempCertFee: 0,
    examCenterFee: 0,
    practicalFee: 0,
    serviceCharge: 0,

    semesterFee: 0,
    protyononPotro: 0,
    testimonial: 0,
    idCard: 0,
    mobileFine: 0,
    tuitionFee: 12000,
    reAdmissionFee: 0,
    absentFine: 0,
    ictFee: 0,
    collegePractical: 0,
    miscIncome: 0,
    labFee: 0,
    centerFee: 0,

    electricity: 100,
    library: 125,
    benevolent: 125,

    sessionFee: 1200,
    semesterFee1: 0,
    semesterFee2: 0,
    semesterFee3: 0,

    extraDues: 0,

    totalCollectible: 19500,
    totalDiscount: 0,
    totalCollected: 12500,
    totalDue: 7000,
  },
];

/* =========================================================
   COMPONENT
========================================================= */
const StudentBalanceSheet = () => {
  const [showReport, setShowReport] = useState(false);
  const printRef = useRef();

  const handlePrint = () => window.print();

  const handleExcel = () => {
    const excelData = rows.map(row => {
      const obj = {};
      COLUMNS.forEach(col => {
        obj[col.label] = row[col.key] ?? 0;
      });
      return obj;
    });

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Student Balance Sheet");
    XLSX.writeFile(wb, "Student_Balance_Sheet.xlsx");
  };

  return (
    <div className="student-balance-page">

      {!showReport && (
        <div className="filter-box">
          <h3>Student Balance Sheet</h3>

          <div className="filter-grid">
            <select><option>Higher Secondary</option></select>
            <select><option>Science</option></select>
            <select><option>HSC-Science</option></select>
            <select><option>1st Year</option></select>
            <select><option>2025-2026</option></select>
          </div>

          <button className="primary-btn" onClick={() => setShowReport(true)}>
            Load Balance Sheet
          </button>
        </div>
      )}

      {showReport && (
        <div ref={printRef}>

          <div className="report-header">
            <img src="/logo.png" alt="Logo" />
            <h2>Mohammadpur Kendriya College</h2>
            <h3>Student Payment Report</h3>
          </div>

          <div className="report-actions">
            <button onClick={handlePrint}>🖨 Print</button>
            <button onClick={handleExcel}>⬇ Excel</button>
          </div>

          <div className="table-scroll">
            <table className="balance-table">
              <thead>
                <tr>
                  {COLUMNS.map(col => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    {COLUMNS.map(col => (
                      <td key={col.key}>{row[col.key] ?? 0}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
};

export default StudentBalanceSheet;
