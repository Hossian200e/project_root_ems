import React, { useState, useMemo } from "react";
import { FaEdit } from "react-icons/fa";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/campusSetup.css";

const initialCampuses = [
  {
    id: 1,
    name: "Magura Collectorate Collegiate School",
    code: "magura-collectorate-collegiate-school",
    status: "Active",
    reportDate: "2025-01-10",
  },
];

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function CampusSetup() {
  const [campuses, setCampuses] = useState(initialCampuses);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [search, setSearch] = useState("");
  const [entries] = useState(10);

  /* ---------------- FILTER ---------------- */
  const filteredCampuses = useMemo(() => {
    return campuses.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [campuses, search]);

  /* ---------------- SAVE EDIT WITH CONFIRM ---------------- */
  const handleSaveEditCampus = () => {
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this campus?"
    );

    if (!confirmUpdate) return;

    setCampuses((prev) =>
      prev.map((c) =>
        c.id === selectedCampus.id
          ? {
              ...selectedCampus,
              code: slugify(selectedCampus.name),
            }
          : c
      )
    );
    setSelectedCampus(null);
  };

  return (
    <div className="campus-setup-page">
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <a>Dashboard</a> <span>›</span>
        <a>Global Configuration</a> <span>›</span>
        Campus Setup
      </div>

      {/* HEADER + SEARCH */}
      <div className="table-controls">
        <div className="page-header">
          <h2>Campus List</h2>
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <table className="campus-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Campus Name</th>
            <th>Campus Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCampuses.slice(0, entries).map((c, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>{c.name}</td>
              <td>{c.code}</td>
              <td>
                <span
                  className={`status ${
                    c.status === "Active"
                      ? "status-active"
                      : "status-inactive"
                  }`}
                >
                  {c.status}
                </span>
              </td>
              <td>
                <button
                  className="btn-icon edit"
                  onClick={() => setSelectedCampus({ ...c })}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {selectedCampus && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Campus</h3>

            <label>Campus Name</label>
            <input
              type="text"
              value={selectedCampus.name}
              onChange={(e) =>
                setSelectedCampus({
                  ...selectedCampus,
                  name: e.target.value,
                })
              }
            />

            <label>Status</label>
            <select
              value={selectedCampus.status}
              onChange={(e) =>
                setSelectedCampus({
                  ...selectedCampus,
                  status: e.target.value,
                })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div className="modal-actions">
              <button onClick={() => setSelectedCampus(null)}>Close</button>
              <button className="btn save" onClick={handleSaveEditCampus}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
