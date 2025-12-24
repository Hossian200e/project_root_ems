import React, { useState, useMemo, useRef } from "react";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/studentFeeDiscountReport.css";

/* ================= SAMPLE DATA ================= */
const discountData = [
  {
    id: 1,
    studentId: "2216280240034",
    roll: "2202223280028",
    name: "Sabrina Hassan Mira",
    photo: "/avatar.png",
    session: "2022-2023",
    eduLevel: "Honours",
    department: "Chemistry",
    className: "Chemistry-(Honours)",
    section: "A",
    year: "3rd Year",
    amount: 22800,
    date: "2025-09-17 16:03",
    remarks: "Principal",
    stage: "Approved",
    status: "Active",
  },
  {
    id: 2,
    studentId: "2216340270029",
    roll: "2202223340031",
    name: "Sumaya Hossain Rimi",
    photo: "/avatar.png",
    session: "2022-2023",
    eduLevel: "Honours",
    department: "Psychology",
    className: "Psychology-(Honours)",
    section: "B",
    year: "3rd Year",
    amount: 22800,
    date: "2025-09-10 15:51",
    remarks: "Nurul Alom",
    stage: "Approved",
    status: "Active",
  },
  {
    id: 3,
    studentId: "2116250160097",
    roll: "2202122250061",
    name: "Tamanna",
    photo: "/avatar.png",
    session: "2021-2022",
    eduLevel: "Honours",
    department: "Accounting",
    className: "Accounting-(Honours)",
    section: "A",
    year: "3rd Year",
    amount: 21300,
    date: "2025-11-13 11:29",
    remarks: "Staff",
    stage: "Approved",
    status: "Active",
  },
];

const StudentFeeDiscountReport = () => {
  const printRef = useRef();

  const [filters, setFilters] = useState({
    eduLevel: "",
    department: "",
    className: "",
    section: "",
    session: "",
    studentId: "",
    roll: "",
    stage: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 25;

  /* ================= FILTER LOGIC ================= */
  const filteredData = useMemo(() => {
    return discountData.filter((d) => {
      const date = new Date(d.date);
      return (
        (!filters.eduLevel || d.eduLevel === filters.eduLevel) &&
        (!filters.department || d.department === filters.department) &&
        (!filters.className || d.className === filters.className) &&
        (!filters.section || d.section === filters.section) &&
        (!filters.session || d.session === filters.session) &&
        (!filters.stage || d.stage === filters.stage) &&
        (!filters.status || d.status === filters.status) &&
        (!filters.studentId || d.studentId.includes(filters.studentId)) &&
        (!filters.roll || d.roll.includes(filters.roll)) &&
        (!filters.startDate || date >= new Date(filters.startDate)) &&
        (!filters.endDate || date <= new Date(filters.endDate)) &&
        (search === "" ||
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.studentId.includes(search))
      );
    });
  }, [filters, search]);

  /* ================= SUMMARY ================= */
  const totalStudents = filteredData.length;
  const totalAmount = filteredData.reduce((s, d) => s + d.amount, 0);

  /* ================= PAGINATION ================= */
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  /* ================= PRINT ================= */
  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open("", "", "width=1000,height=650");
    win.document.write(`
      <html>
        <head>
          <title>Student Fee Discount Report</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 6px; font-size: 13px; }
            th { background: #f0f0f0; }
          </style>
        </head>
        <body>
          <h2 style="text-align:center;">Student Fee Discount Report</h2>
          ${content}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  /* ================= EXCEL DOWNLOAD ================= */
  const handleExcelDownload = () => {
    const excelData = filteredData.map((d, i) => ({
      SL: i + 1,
      "Student ID": d.studentId,
      Roll: d.roll,
      Name: d.name,
      Session: d.session,
      Class: d.className,
      Year: d.year,
      Amount: d.amount,
      Date: d.date,
      Remarks: d.remarks,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Discount Report");

    XLSX.writeFile(workbook, "Student_Fee_Discount_Report.xlsx");
  };

  return (
    <div className="discount-page">
      <h2>Student Fee Discounts</h2>

      {/* ================= FILTER PANEL ================= */}
      <div className="filter-panel">
        <select onChange={(e) => setFilters({ ...filters, eduLevel: e.target.value })}>
          <option value="">Select Edu. Level</option>
          <option>Honours</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
          <option value="">Select Department</option>
          <option>Chemistry</option>
          <option>Psychology</option>
          <option>Accounting</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, className: e.target.value })}>
          <option value="">Select Class</option>
          <option>Chemistry-(Honours)</option>
          <option>Psychology-(Honours)</option>
          <option>Accounting-(Honours)</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, section: e.target.value })}>
          <option value="">Select Section</option>
          <option>A</option>
          <option>B</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, session: e.target.value })}>
          <option value="">Select Session</option>
          <option>2022-2023</option>
          <option>2021-2022</option>
        </select>

        <input placeholder="Student Code" onChange={(e) => setFilters({ ...filters, studentId: e.target.value })} />
        <input placeholder="Student Roll" onChange={(e) => setFilters({ ...filters, roll: e.target.value })} />

        <input type="date" onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
        <input type="date" onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />

        <select onChange={(e) => setFilters({ ...filters, stage: e.target.value })}>
          <option value="">Select Stage</option>
          <option>Approved</option>
          <option>Pending</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">Select Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button>Show</button>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="summary-box">
        <div>
          <h4>Total Students</h4>
          <p>{totalStudents}</p>
        </div>
        <div>
          <h4>Total Amount</h4>
          <p>{totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="report-actions">
        <button onClick={handlePrint}>Print</button>
        <button onClick={handleExcelDownload}>Download Excel</button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="table-section" ref={printRef}>
        <div className="table-top">
          <select>
            <option>25</option>
            <option>50</option>
          </select>
          <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Student ID</th>
              <th>Roll</th>
              <th>Student Name</th>
              <th>Profile Picture</th>
              <th>Session</th>
              <th>Class</th>
              <th>Year</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((d, i) => (
              <tr key={d.id}>
                <td>{i + 1}</td>
                <td>{d.studentId}</td>
                <td>{d.roll}</td>
                <td>{d.name}</td>
                <td>
                  <img src={d.photo} alt="profile" className="profile-pic" />
                </td>
                <td>{d.session}</td>
                <td>{d.className}</td>
                <td>{d.year}</td>
                <td>{d.amount.toLocaleString()}</td>
                <td>{d.date}</td>
                <td>{d.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentFeeDiscountReport;
