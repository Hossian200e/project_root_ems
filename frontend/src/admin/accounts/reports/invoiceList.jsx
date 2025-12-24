import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/invoiceList.css";

const sampleInvoices = [
  {
    id: 1,
    studentName: "Abu Rayhan",
    invoiceNo: "INC-00013029",
    txnNo: "",
    studentID: "2116570580006",
    partner: "manual",
    purpose: "Accounts",
    date: "22-12-2025",
    shift: "Day",
    medium: "Bangla",
    department: "Geography & Environment",
    prevClass: "Geography & Environment (Honours)",
    currentClass: "Geography & Environment (Honours)",
    section: "1st Year",
    accountant: "Abeg",
    phone: "01647384398",
    roll: "2202122320027",
    regNo: "",
    amount: 17350,
    discount: 0,
    total: 17350,
  },
  {
    id: 2,
    studentName: "Sijan",
    invoiceNo: "INC-00013030",
    txnNo: "",
    studentID: "2316260170107",
    partner: "manual",
    purpose: "Accounts",
    date: "22-12-2025",
    shift: "Day",
    medium: "Bangla",
    department: "Management",
    prevClass: "Management (Honours)",
    currentClass: "Management (Honours)",
    section: "2nd Year",
    accountant: "bank_user 2",
    phone: "01799799419",
    roll: "2202324260107",
    regNo: "",
    amount: 11300,
    discount: 0,
    total: 11300,
  },
  // Add more sample data as needed
];

const InvoiceList = () => {
  const [transactionType, setTransactionType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const invoiceRef = useRef();

  const handleSearch = () => {
    const filtered = sampleInvoices.filter((inv) => {
      const invDate = new Date(inv.date.split("-").reverse().join("-"));
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return invDate >= from && invDate <= to;
    });
    setSearchResult(filtered);
  };

  const handlePrint = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(invoiceRef.current, {
      callback: function (pdf) {
        pdf.save("InvoiceList.pdf");
      },
      margin: [20, 20, 20, 20],
      autoPaging: "text",
      x: 10,
      y: 10,
      width: 580,
    });
  };

  const handleExcel = () => {
    const ws = XLSX.utils.json_to_sheet(searchResult);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "InvoiceList");
    XLSX.writeFile(wb, "InvoiceList.xlsx");
  };

  const handleView = (id) => {
    alert(`View invoice ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setSearchResult(searchResult.filter((inv) => inv.id !== id));
    }
  };

  return (
    <div className="invoice-list-page">
      <h2>Invoice List</h2>

      {/* Part 1: Filters */}
      <div className="filter-section">
        <div className="form-group">
          <label>Transaction Type *</label>
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
            <option value="">Select Transaction Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          {!transactionType && <span className="error">This field is required.</span>}
        </div>

        <div className="form-group">
          <label>From Date *</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          {!fromDate && <span className="error">This field is required.</span>}
        </div>

        <div className="form-group">
          <label>To Date *</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          {!toDate && <span className="error">This field is required.</span>}
        </div>

        <div className="form-group">
          <label>Transaction Partner</label>
          <select>
            <option>Select</option>
          </select>
        </div>

        <div className="form-group">
          <label>Edu. Level</label>
          <select>
            <option>Select Edu. Level</option>
          </select>
        </div>

        <div className="form-group">
          <label>Department</label>
          <select>
            <option>Select Department</option>
          </select>
        </div>

        <div className="form-group">
          <label>Class</label>
          <select>
            <option>Select Class</option>
          </select>
        </div>

        <div className="form-group">
          <label>Section</label>
          <select>
            <option>Select Section</option>
          </select>
        </div>

        <div className="form-group">
          <label>Transaction Purpose</label>
          <select>
            <option>Select Transaction Purpose</option>
          </select>
        </div>

        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>

      {/* Part 2: Search Results */}
      {searchResult.length > 0 && (
        <div className="results-section" ref={invoiceRef}>
          <div className="invoice-header">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h3>Mohammadpur Kendriya College</h3>
            <h4>Income Report</h4>
            <p>From {fromDate} to {toDate}</p>
          </div>

          <div className="actions">
            <button onClick={handlePrint}>Print</button>
            <button onClick={handleExcel}>Download Excel</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Student Name</th>
                <th>Invoice No.</th>
                <th>Txn No</th>
                <th>Student ID</th>
                <th>Transaction Partner</th>
                <th>Transaction Purpose</th>
                <th>Date</th>
                <th>Shift</th>
                <th>Medium</th>
                <th>Dept./Group</th>
                <th>Previous Class</th>
                <th>Current Class</th>
                <th>Section</th>
                <th>Accountant</th>
                <th>Phone</th>
                <th>Roll</th>
                <th>Registration Number</th>
                <th>Amount</th>
                <th>Discount</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((inv, index) => (
                <tr key={inv.id}>
                  <td>{index + 1}</td>
                  <td>{inv.studentName}</td>
                  <td>{inv.invoiceNo}</td>
                  <td>{inv.txnNo}</td>
                  <td>{inv.studentID}</td>
                  <td>{inv.partner}</td>
                  <td>{inv.purpose}</td>
                  <td>{inv.date}</td>
                  <td>{inv.shift}</td>
                  <td>{inv.medium}</td>
                  <td>{inv.department}</td>
                  <td>{inv.prevClass}</td>
                  <td>{inv.currentClass}</td>
                  <td>{inv.section}</td>
                  <td>{inv.accountant}</td>
                  <td>{inv.phone}</td>
                  <td>{inv.roll}</td>
                  <td>{inv.regNo}</td>
                  <td>{inv.amount}</td>
                  <td>{inv.discount}</td>
                  <td>{inv.total}</td>
                  <td>
                    <button className="view-btn" onClick={() => handleView(inv.id)}>View</button>
                    <button className="delete-btn" onClick={() => handleDelete(inv.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="20"><strong>Total</strong></td>
                <td>{searchResult.reduce((sum, inv) => sum + inv.amount, 0)}</td>
                <td>{searchResult.reduce((sum, inv) => sum + inv.discount, 0)}</td>
                <td>{searchResult.reduce((sum, inv) => sum + inv.total, 0)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
