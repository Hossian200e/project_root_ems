import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/admin/accounts/reports/admissionPaymentReport.css";

/* ================= SAMPLE DATA ================= */
const admissionEvents = [
  {
    sl: 1,
    id: 101,
    title: "Degree Admission | Session 2024–2025 (BA • BSS • BBS)",
    educationLevel: "Degree (Pass)",
    session: "2024-2025",
    status: "Active",
  },
  {
    sl: 2,
    id: 102,
    title:
      "Professional Programs Admission | Session 2024–2025 (BBA • CSE • THM)",
    educationLevel: "Professional",
    session: "2024-2025",
    status: "Active",
  },
  {
    sl: 3,
    id: 103,
    title: "Masters- Preliminary (Private)- 2022-2023",
    educationLevel: "Preliminary Masters (Private)",
    session: "2022-2023",
    status: "Active",
  },
  {
    sl: 4,
    id: 104,
    title: "Master's Preliminary 2022-2023",
    educationLevel: "Preliminary Masters",
    session: "2022-2023",
    status: "Inactive",
  },
];

const AdmissionPaymentReport = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredData = admissionEvents.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admission-report-page">
      {/* ================= HEADER ================= */}
      <div className="page-header">
        <h2>Admission Payment Report</h2>
        <p>Dashboard / Transaction Reports / Events / Event List</p>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="table-card">
        {/* CONTROLS */}
        <div className="table-controls">
          <div>
            Show
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            entries
          </div>

          <div>
            Search:
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search event"
            />
          </div>
        </div>

        {/* TABLE */}
        <table className="admission-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Education Level</th>
              <th>Session</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  Event was not found!
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.sl}</td>
                  <td>{item.title}</td>
                  <td>{item.educationLevel}</td>
                  <td>{item.session}</td>
                  <td>
                    <span
                      className={`status ${
                        item.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* ================= ACTION BUTTONS ================= */}
                  <td className="action-col">
                    <button
                      className="action-btn summary"
                      onClick={() =>
                        navigate(`/admissionPaymentReport/paymentSummary/${item.id}`)
                      }
                    >
                      Payment Summary
                    </button>

                    <button
                      className="action-btn transaction"
                      onClick={() =>
                        navigate(`/admissionPaymentReport/transactionHead/${item.id}`)
                      }
                    >
                      Transaction Head
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="table-footer">
          <span>Showing 1 to 10 of 12 entries</span>
          <div className="pagination">
            <button>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPaymentReport;
