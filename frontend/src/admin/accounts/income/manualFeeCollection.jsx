import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/admin/accounts/income/manualFeeCollection.css";

const ManualFeeCollection = () => {
  const navigate = useNavigate();

  // Search states
  const [searchId, setSearchId] = useState("");
  const [searchRoll, setSearchRoll] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  // Fee states
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalWaiver, setTotalWaiver] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);

  const [paymentDate, setPaymentDate] = useState("2025-12-21");
  const [fromMonth, setFromMonth] = useState("2023-07");
  const [toMonth, setToMonth] = useState("2023-07");

  // Dummy student data
  const student = {
    img: "",
    name: "Md. Sojibul Islam",
    admissionDate: "",
    totalDue: 0,
    totalPaid: 5450,
    totalWaiver: 4000,
    studentId: "18374",
    studentCode: "1916560570030",
    roll: "2201920240110",
    className: "Finance & Banking (Honours)",
    section: "3rd Year",
    medium: "Bangla",
    department: "Finance & Banking",
    shift: "Day",
  };

  // Master monthly data
  const allMonthlyFees = [
    { monthValue: "2023-07", month: "July-2023", subtotal: 4000, totalWaiver: 1000 },
    { monthValue: "2023-08", month: "August-2023", subtotal: 3000, totalWaiver: 500 },
    { monthValue: "2023-09", month: "September-2023", subtotal: 3500, totalWaiver: 0 },
    { monthValue: "2023-10", month: "October-2023", subtotal: 2000, totalWaiver: 0 },
  ];

  const monthlyFees = [
    {
      month: "July-2023",
      formFillup: 3450,
      notPromoted: 2000,
      subtotal: 4000,
      totalWaiver: 5450,
      totalPayable: 5450,
      totalPaid: 5450,
    },
  ];

  const monthOptions = [
    { label: "July 2023", value: "2023-07" },
    { label: "August 2023", value: "2023-08" },
    { label: "September 2023", value: "2023-09" },
    { label: "October 2023", value: "2023-10" },
  ];

  // Auto calculate totals
  useEffect(() => {
    const filtered = allMonthlyFees.filter(
      (m) => m.monthValue >= fromMonth && m.monthValue <= toMonth
    );

    let total = 0;
    let waiver = 0;

    filtered.forEach((f) => {
      total += f.subtotal;
      waiver += f.totalWaiver;
    });

    setTotalAmount(total);
    setTotalWaiver(waiver);
    setPayableAmount(Math.max(total - waiver, 0));
  }, [fromMonth, toMonth]);

  const handleSearch = () => {
    if (!searchId && !searchRoll) {
      alert("Please enter Student ID or Roll");
      return;
    }
    setIsSearched(true);
  };

  // ✅ NAVIGATE TO PAYMENT PAGE
  const handlePayment = () => {
    navigate("/manualFeeCollection/makePayment", {
      state: {
        student,
        fromMonth,
        toMonth,
        paymentDate,
        totalAmount,
        totalWaiver,
        payableAmount,
      },
    });
  };

  return (
    <div className="manual-fee-page">
      <h2>Manual Fee Collection</h2>

      {/* Search Section */}
      <div className="search-student-box">
        <h3>Search Student</h3>
        <div className="search-row">
          <div>
            <label>Student ID</label>
            <input value={searchId} onChange={(e) => setSearchId(e.target.value)} />
          </div>
          <div>
            <label>Student Roll</label>
            <input value={searchRoll} onChange={(e) => setSearchRoll(e.target.value)} />
          </div>
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {isSearched && (
        <>
          {/* Student Information */}
          <div className="student-info three-column">
            <div className="student-img">
              {student.img ? <img src={student.img} alt="Student" /> : <div className="placeholder-img">No Image</div>}
            </div>

            <div className="vertical-line"></div>

            <div className="student-middle">
              <p><strong>Student Name:</strong> {student.name}</p>
              <p><strong>Admission Date:</strong> {student.admissionDate || "-"}</p>
              <p><strong>Total Due:</strong> {student.totalDue}</p>
              <p><strong>Total Paid:</strong> {student.totalPaid}</p>
              <p><strong>Total Waiver:</strong> {student.totalWaiver}</p>
            </div>

            <div className="vertical-line"></div>

            <div className="student-right">
              <p><strong>Student ID:</strong> {student.studentId}</p>
              <p><strong>Student Code:</strong> {student.studentCode}</p>
              <p><strong>Roll:</strong> {student.roll}</p>
              <p><strong>Class:</strong> {student.className}</p>
              <p><strong>Section:</strong> {student.section}</p>
              <p><strong>Medium:</strong> {student.medium}</p>
              <p><strong>Department:</strong> {student.department}</p>
              <p><strong>Shift:</strong> {student.shift}</p>
              <p>Template name : <b>Fee Collection Template</b></p>
            </div>
          </div>

          {/* Fee Summary */}
          <div className="fee-summary">
            <h3>Fee Collection Template</h3>

            <div className="fee-summary-row">
              <div>
                <label>From</label>
                <select value={fromMonth} onChange={(e) => setFromMonth(e.target.value)}>
                  {monthOptions.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>To</label>
                <select value={toMonth} onChange={(e) => setToMonth(e.target.value)}>
                  {monthOptions.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Payment Date</label>
                <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
              </div>

              <div>
                <label>Total Amount</label>
                <input type="number" value={totalAmount} disabled />
              </div>

              <div>
                <label>Total Waiver</label>
                <input type="number" value={totalWaiver} disabled />
              </div>

              <div>
                <label>Payable Amount</label>
                <input type="number" value={payableAmount} disabled />
              </div>

              <button className="make-payment-btn" onClick={handlePayment}>
                Make Payment
              </button>
            </div>
          </div>



            {/* Monthly Fees */}
          <div className="monthly-fees">
            <h3>Monthly Fees Informations</h3>
            <table>
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Month</th>
                  <th>Form Fill-up</th>
                  <th>Not Promoted Fee</th>
                  <th>Sub Total</th>
                  <th>Total Waiver</th>
                  <th>Total Payable</th>
                  <th>Total Paid</th>
                </tr>
              </thead>
              <tbody>
                {monthlyFees.map((fee, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{fee.month}</td>
                    <td>{fee.formFillup}</td>
                    <td>{fee.notPromoted}</td>
                    <td>{fee.subtotal}</td>
                    <td>{fee.totalWaiver}</td>
                    <td>{fee.totalPayable}</td>
                    <td>{fee.totalPaid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ManualFeeCollection;
