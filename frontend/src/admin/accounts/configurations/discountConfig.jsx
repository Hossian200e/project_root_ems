import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/admin/accounts/configurations/discountConfig.css";

const DiscountConfig = () => {
  const navigate = useNavigate();

  const [session, setSession] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Dummy student discount data
  const studentDiscounts = [
    {
      id: 1,
      name: "Md. Sojibul Islam",
      studentId: "1916560570030",
      roll: "2201920240110",
      className: "Finance & Banking (Honours)",
      section: "3rd Year",
      session: "2019-2020",
      quantity: 1,
      totalAmount: 4000,
      status: "approved",
      transactions: [
        {
          sl: 1,
          duration: "Jul, 2023",
          head: "Not promoted (Jan-Jun) Tuition Fee",
          amount: 4000,
          date: "23 Nov, 2025",
          stage: "Approved",
          remarks: "Sommukh sarir july joddah (Principal)",
          status: "Paid",
        },
      ],
    },
    {
      id: 2,
      name: "MD. HOSEN MUNSHI",
      studentId: "2514020080188",
      roll: "1202526022145",
      className: "HSC-Business studies",
      section: "1st Year",
      session: "2025-2026",
      quantity: 6,
      totalAmount: 6000,
      status: "approved",
      transactions: [
        {
          sl: 1,
          duration: "Jul, 2025",
          head: "Tuition Fee",
          amount: 6000,
          date: "01 Dec, 2025",
          stage: "Approved",
          remarks: "Paid by Bank",
          status: "Paid",
        },
      ],
    },
  ];

  // Filtered data
  const filteredData = studentDiscounts.filter(
    (student) =>
      (session === "" || student.session === session) &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.includes(searchTerm) ||
        student.roll.includes(searchTerm))
  );

  // View modal
  const handleView = (student) => {
    setModalData(student);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="discount-config-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Dashboard / Accounts / Student Fee Discounts
      </div>

      {/* Page Header */}
      <div className="page-header">
        <h2>Student Fee Discounts</h2>
        <button
          className="add-discount-btn"
          onClick={() => navigate("/discountConfig/addDiscount")}
        >
          Add Discount
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <label htmlFor="session">Select Session:</label>
        <select
          id="session"
          value={session}
          onChange={(e) => setSession(e.target.value)}
        >
          <option value="">All Sessions</option>
          <option value="2019-2020">2019-2020</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2024-2025">2024-2025</option>
          <option value="2025-2026">2025-2026</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Table */}
      <div className="discount-table">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>Roll</th>
              <th>Class</th>
              <th>Section</th>
              <th>Session</th>
              <th>Qt</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.studentId}</td>
                <td>{student.roll}</td>
                <td>{student.className}</td>
                <td>{student.section}</td>
                <td>{student.session}</td>
                <td>{student.quantity}</td>
                <td>{student.totalAmount}</td>
                <td>{student.status}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleView(student)}
                  >
                    👁️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        Showing 1 to {filteredData.length} of 205 entries
      </div>

      {/* View Modal */}
      {modalOpen && modalData && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{modalData.name} - Transactions</h3>

            <table className="transaction-table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Duration</th>
                  <th>Transaction Head</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Stage</th>
                  <th>Remarks</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {modalData.transactions.map((tran) => (
                  <tr key={tran.sl}>
                    <td>{tran.sl}</td>
                    <td>{tran.duration}</td>
                    <td>{tran.head}</td>
                    <td>{tran.amount}</td>
                    <td>{tran.date}</td>
                    <td>{tran.stage}</td>
                    <td>{tran.remarks}</td>
                    <td>{tran.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="total-amount">
              Total Amount: {modalData.totalAmount}
            </div>

            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountConfig;
