import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import "../../../assets/styles/admin/accounts/reports/invoiceListDetails.css";

// Sample invoices with multiple entries for better demo
const sampleInvoices = [
  {
    id: 1,
    shift: "Day",
    studentName: "SHAH NEWAZ KHAN LISUN",
    invoiceNo: "INC-00013035",
    txnNo: "",
    studentID: "2514010030068",
    partner: "manual",
    purpose: "Accounts",
    eventName: "",
    date: "22-12-2025",
    prevClass: "HSC-Science",
    prevRoll: "1202526033051",
    currentClass: "HSC-Science",
    currentRoll: "1202526033051",
    section: "1st Year",
    roll: "1202526033051",
    regNo: "2210619562",
    amount: 2000,
    discount: 0,
    total: 2000,
  },
  {
    id: 2,
    shift: "Day",
    studentName: "Kawser Ahmed Emon",
    invoiceNo: "INC-00013031",
    txnNo: "",
    studentID: "2316110190091",
    partner: "manual",
    purpose: "Accounts",
    eventName: "",
    date: "22-12-2025",
    prevClass: "English-(Honours)",
    prevRoll: "2202324110096",
    currentClass: "English-(Honours)",
    currentRoll: "2202324110096",
    section: "2nd Year",
    roll: "2202324110096",
    regNo: "",
    amount: 11300,
    discount: 0,
    total: 11300,
  },
  {
    id: 3,
    shift: "Day",
    studentName: "SHAH NEWAZ KHAN LISUN",
    invoiceNo: "INC-00013036",
    txnNo: "",
    studentID: "2514010030068",
    partner: "manual",
    purpose: "Library Fee",
    eventName: "",
    date: "23-12-2025",
    prevClass: "HSC-Science",
    prevRoll: "1202526033051",
    currentClass: "HSC-Science",
    currentRoll: "1202526033051",
    section: "1st Year",
    roll: "1202526033051",
    regNo: "2210619562",
    amount: 500,
    discount: 0,
    total: 500,
  },
  {
    id: 4,
    shift: "Day",
    studentName: "Kawser Ahmed Emon",
    invoiceNo: "INC-00013032",
    txnNo: "",
    studentID: "2316110190091",
    partner: "manual",
    purpose: "Exam Fee",
    eventName: "",
    date: "23-12-2025",
    prevClass: "English-(Honours)",
    prevRoll: "2202324110096",
    currentClass: "English-(Honours)",
    currentRoll: "2202324110096",
    section: "2nd Year",
    roll: "2202324110096",
    regNo: "",
    amount: 2000,
    discount: 0,
    total: 2000,
  },
  {
    id: 5,
    shift: "Day",
    studentName: "Rafiq Islam",
    invoiceNo: "INC-00013033",
    txnNo: "",
    studentID: "2416110190077",
    partner: "manual",
    purpose: "Accounts",
    eventName: "",
    date: "22-12-2025",
    prevClass: "HSC-Arts",
    prevRoll: "2202324110055",
    currentClass: "HSC-Arts",
    currentRoll: "2202324110055",
    section: "2nd Year",
    roll: "2202324110055",
    regNo: "",
    amount: 8000,
    discount: 0,
    total: 8000,
  },
];

const InvoiceListDetails = () => {
  const [transactionType, setTransactionType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const invoiceRef = useRef();

  // Filter invoices by date
  const handleSearch = () => {
    const filtered = sampleInvoices.filter((inv) => {
      const invDate = new Date(inv.date.split("-").reverse().join("-"));
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return invDate >= from && invDate <= to;
    });
    setSearchResult(filtered);
  };

  // Print PDF
  const handlePrint = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(invoiceRef.current, {
      callback: function (pdf) {
        pdf.save("InvoiceListDetails.pdf");
      },
      margin: [20, 20, 20, 20],
      autoPaging: "text",
      x: 10,
      y: 10,
      width: 580,
    });
  };

  // Export to Excel
  const handleExcel = () => {
    const ws = XLSX.utils.json_to_sheet(searchResult);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "InvoiceListDetails");
    XLSX.writeFile(wb, "InvoiceListDetails.xlsx");
  };

  // View invoice
  const handleView = (invoice) => {
    alert(`Viewing Invoice: ${invoice.invoiceNo}\nStudent: ${invoice.studentName}\nTotal: ${invoice.total} TK`);
  };

  // Delete invoice
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      const updated = searchResult.filter((inv) => inv.id !== id);
      setSearchResult(updated);
    }
  };

  // Group by student
  const groupByStudent = (invoices) => {
    const grouped = {};
    invoices.forEach((inv) => {
      if (!grouped[inv.studentName]) grouped[inv.studentName] = [];
      grouped[inv.studentName].push(inv);
    });
    return grouped;
  };

  const groupedInvoices = groupByStudent(searchResult);

  return (
    <div className="invoice-list-details-page">
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


      {/* Results */}
      {searchResult.length > 0 && (
        <div className="results-section" ref={invoiceRef}>
          <div className="invoice-header">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h3>Mohammadpur Kendriya College</h3>
            <h4>Student wise Collection Summary</h4>
            <p>From {fromDate} to {toDate}</p>
          </div>

          <div className="actions">
            <button onClick={handlePrint}>Print</button>
            <button onClick={handleExcel}>Download Excel</button>
          </div>

          {Object.keys(groupedInvoices).map((student, idx) => {
            const invoices = groupedInvoices[student];
            const totalAmount = invoices.reduce((sum, inv) => sum + inv.total, 0);
            return (
              <div key={idx} className="student-group">
                <table>
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Shift</th>
                      <th>Student Name</th>
                      <th>Invoice No.</th>
                      <th>Txn No</th>
                      <th>Student ID</th>
                      <th>Transaction Partner</th>
                      <th>Transaction Purpose</th>
                      <th>Event Name</th>
                      <th>Date</th>
                      <th>Previous Class</th>
                      <th>Previous Roll</th>
                      <th>Current Class</th>
                      <th>Current Roll</th>
                      <th>Section</th>
                      <th>Roll</th>
                      <th>Registration Number</th>
                      <th>Amount</th>
                      <th>Discount</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{inv.shift}</td>
                        <td>{inv.studentName}</td>
                        <td>{inv.invoiceNo}</td>
                        <td>{inv.txnNo}</td>
                        <td>{inv.studentID}</td>
                        <td>{inv.partner}</td>
                        <td>{inv.purpose}</td>
                        <td>{inv.eventName}</td>
                        <td>{inv.date}</td>
                        <td>{inv.prevClass}</td>
                        <td>{inv.prevRoll}</td>
                        <td>{inv.currentClass}</td>
                        <td>{inv.currentRoll}</td>
                        <td>{inv.section}</td>
                        <td>{inv.roll}</td>
                        <td>{inv.regNo}</td>
                        <td>{inv.amount}</td>
                        <td>{inv.discount}</td>
                        <td>{inv.total}</td>
                        <td>
                          <button onClick={() => handleView(inv)}>View</button>
                          <button onClick={() => handleDelete(inv.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="21">
                        <strong>
                          Total Count: {invoices.length} | Total Amount: {totalAmount.toFixed(2)} TK
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}

          <div className="grand-total">
            <strong>
              Grand Total: {searchResult.reduce((sum, inv) => sum + inv.total, 0).toFixed(2)} TK
            </strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceListDetails;
