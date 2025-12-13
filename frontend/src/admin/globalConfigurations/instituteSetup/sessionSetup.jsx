import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/sessionSetup.css";

const SessionSetup = () => {
  // ---------------- Dummy Data ----------------
  const dummySessions = [
    { id: 1, name: "2025-2026", roll: "001", type: "Single Year", status: "Active" },
    { id: 2, name: "2024-2025", roll: "002", type: "Mixed Year", status: "Inactive" },
  ];

  // ---------------- States ----------------
  const [sessions, setSessions] = useState(dummySessions);
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    type: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ---------------- Handlers ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, roll, type, status } = formData;

    if (!name || !roll || !type || !status) {
      alert("Please fill all fields!");
      return;
    }

    const payload = {
      id: editId || sessions.length + 1,
      name,
      roll,
      type,
      status,
    };

    if (editId) {
      setSessions((prev) =>
        prev.map((s) => (s.id === editId ? payload : s))
      );
      alert(`Session "${name}" updated successfully!`);
    } else {
      setSessions((prev) => [...prev, payload]);
      alert(`Session "${name}" added successfully!`);
    }

    setFormData({ name: "", roll: "", type: "", status: "Active" });
    setEditId(null);
  };

  const handleEdit = (session) => {
    setFormData({
      name: session.name,
      roll: session.roll,
      type: session.type,
      status: session.status,
    });
    setEditId(session.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------------- Filter ----------------
  const filteredSessions = sessions.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ---------------- UI ----------------
  return (
    <div className="main-content">
      <div className="breadcrumb">
        <a>Dashboard</a> <span>›</span>
        <a>Global Configuration</a> <span>›</span>
        Session Setup
      </div>

      <h2>{editId ? "Edit Session" : "Add Session"}</h2>

      <form onSubmit={handleSubmit} className="form-row">
        <div className="form-group">
          <label>
            Session Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Session Name"
          />
        </div>

        <div className="form-group">
          <label>
            Roll Identifier <span className="required">*</span>
          </label>
          <input
            type="text"
            name="roll"
            value={formData.roll}
            onChange={handleChange}
            placeholder="Roll Identifier"
          />
        </div>

        <div className="form-group">
          <label>
            Session Type <span className="required">*</span>
          </label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="Single Year">Single Year</option>
            <option value="Mixed Year">Mixed Year</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Status <span className="required">*</span>
          </label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="form-group align-end">
          <button type="submit" className="btn">
            {editId ? "Update" : "Save"}
          </button>
        </div>
      </form>

      <h3>Session List</h3>

      <input
        type="text"
        placeholder="Search..."
        className="search-box"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <table className="data-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Session Name</th>
            <th>Roll Identifier</th>
            <th>Session Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredSessions.length ? (
            filteredSessions.map((s, index) => (
              <tr key={s.id}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.type}</td>
                <td>
                  <span
                    className={
                      s.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {s.status}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(s)}>
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SessionSetup;
