import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/admin/accounts/configurations/feeCollectionTemplate.css";

const FeeCollectionTemplate = () => {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([
    {
      id: 1,
      campus: "Mohammadpur Kendriya College",
      shift: "Day",
      medium: "Bangla",
      className: "HSC-Science",
      eduLevel: "Higher Secondary",
      department: "Science",
      session: "2025-2026",
    },
    {
      id: 2,
      campus: "Mohammadpur Kendriya College",
      shift: "Day",
      medium: "Bangla",
      className: "HSC-Humanities",
      eduLevel: "Higher Secondary",
      department: "Humanities",
      session: "2025-2026",
    },
    // More templates...
  ]);

  const [search, setSearch] = useState("");

  const sessions = ["2025-2026", "2026-2027", "2027-2028"]; // Dropdown options

const handleCreateNew = () => {
  navigate("/feeCollectionTemplate/create");
};


  const handleSessionChange = (id, value) => {
    setTemplates(
      templates.map((t) => (t.id === id ? { ...t, session: value } : t))
    );
  };

  const filteredTemplates = templates.filter(
    (t) =>
      t.campus.toLowerCase().includes(search.toLowerCase()) ||
      t.className.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fee-collection-template-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Dashboard / Accounts / Fee Collection Templates
      </div>

      {/* Header */}
      <div className="page-header">
        <h2>Fee Collection Template List</h2>
        <button className="create-btn" onClick={handleCreateNew}>
          + Create New
        </button>
      </div>

      {/* Controls */}
      <div className="table-controls">
        <div className="entries">
          Show{" "}
          <select>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>{" "}
          entries
        </div>
        <div className="filters">
          <div className="search-box">
            Search:{" "}
            <input
              type="text"
              value={search}
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Campus</th>
              <th>Shift</th>
              <th>Medium</th>
              <th>Class</th>
              <th>Edu.Level</th>
              <th>Department</th>
              <th>Session</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTemplates.map((t, index) => (
              <tr key={t.id}>
                <td>{index + 1}</td>
                <td>{t.campus}</td>
                <td>{t.shift}</td>
                <td>{t.medium}</td>
                <td>{t.className}</td>
                <td>{t.eduLevel}</td>
                <td>{t.department}</td>
                <td>
                  <select
                    value={t.session}
                    onChange={(e) => handleSessionChange(t.id, e.target.value)}
                  >
                    {sessions.map((s, i) => (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="action-btns">
<button
  className="icon-btn view"
  onClick={() => navigate("/feeCollectionTemplate/template")}
>
  Templets
</button>

                  <button
                    className="icon-btn edit"
                    onClick={() =>
                      navigate("/feeCollectionTemplate/allocations")
                    }
                  >
                    Allocations
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span>
          Showing 1 to {filteredTemplates.length} of {templates.length} entries
        </span>
        <div className="page-links">
          <button>‹</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>›</button>
        </div>
      </div>
    </div>
  );
};

export default FeeCollectionTemplate;
