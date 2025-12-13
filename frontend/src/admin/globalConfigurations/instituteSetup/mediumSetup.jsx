import React, { useState, useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/mediumSetup.css";

const MediumSetup = () => {
  // Dummy Shifts
  const initialShifts = [
    { id: 1, shift_name: "Morning", status: "Active" },
    { id: 2, shift_name: "Evening", status: "Active" },
    { id: 3, shift_name: "Night", status: "Inactive" },
  ];

  // Dummy Mediums
  const initialMediums = [
    { id: 1, shift_id: 1, shift_name: "Morning", name: "Bangla", identifier: "B", status: "Active" },
    { id: 2, shift_id: 1, shift_name: "Morning", name: "English", identifier: "E", status: "Active" },
    { id: 3, shift_id: 2, shift_name: "Evening", name: "English", identifier: "E", status: "Inactive" },
  ];

  const [shiftId, setShiftId] = useState("");
  const [mediumName, setMediumName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");
  const [mediums, setMediums] = useState(initialMediums);
  const [shifts] = useState(initialShifts.filter((s) => s.status === "Active"));
  const [editingId, setEditingId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // Handle Add or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shiftId || !mediumName.trim() || !identifier.trim()) {
      alert("All fields with * must be filled!");
      return;
    }

    const selectedShift = shifts.find((s) => s.id === parseInt(shiftId));

    if (editingId) {
      setMediums((prev) =>
        prev.map((m) =>
          m.id === editingId
            ? { ...m, shift_id: shiftId, shift_name: selectedShift.shift_name, name: mediumName, identifier, status }
            : m
        )
      );
      alert("Medium updated!");
    } else {
      const newMedium = {
        id: mediums.length ? Math.max(...mediums.map((m) => m.id)) + 1 : 1,
        shift_id: shiftId,
        shift_name: selectedShift.shift_name,
        name: mediumName,
        identifier,
        status,
      };
      setMediums([...mediums, newMedium]);
      alert("Medium added!");
    }

    setShiftId("");
    setMediumName("");
    setIdentifier("");
    setStatus("Active");
    setEditingId(null);
  };

  // Handle Edit
  const handleEdit = (medium) => {
    setShiftId(medium.shift_id);
    setMediumName(medium.name);
    setIdentifier(medium.identifier);
    setStatus(medium.status);
    setEditingId(medium.id);
  };

  const filteredMediums = mediums.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.shift_name.toLowerCase().includes(search.toLowerCase()) ||
    m.identifier.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="main-content">
      <div className="breadcrumb">
        <a href="#">Dashboard</a> <span>›</span>
        <a href="#">Global Configuration</a> <span>›</span>
        Medium Setup
      </div>

      {/* Form Section */}
      <section className="form-section">
        <h3>{editingId ? "Edit Medium" : "Add Medium"}</h3>
        <form className="form-row" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Shift Name <span className="required">*</span></label>
            <select value={shiftId} onChange={(e) => setShiftId(e.target.value)}>
              <option value="">Select Shift</option>
              {shifts.map((shift) => (
                <option key={shift.id} value={shift.id}>{shift.shift_name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Medium Name <span className="required">*</span></label>
            <input type="text" placeholder="Medium Name" value={mediumName} onChange={(e) => setMediumName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Roll Identifier <span className="required">*</span></label>
            <input type="text" placeholder="Roll Identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group align-end">
            <button type="submit" className="btn">{editingId ? "Update" : "Save"}</button>
          </div>
        </form>
      </section>

      {/* Professional Search */}
      <section className="table-section">
        <h3>Medium List</h3>
        <div className="search-wrapper" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search medium..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); }}
            className="search-input"
          />
          {showDropdown && search && (
            <ul className="search-dropdown">
              {filteredMediums.length ? (
                filteredMediums.map((m) => (
                  <li key={m.id} onClick={() => { setSearch(m.name); setShowDropdown(false); }}>
                    <strong>{m.name}</strong> - {m.shift_name} ({m.identifier})
                  </li>
                ))
              ) : (
                <li className="no-result">No results found</li>
              )}
            </ul>
          )}
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Campus Name</th>
              <th>Shift Name</th>
              <th>Medium Name</th>
              <th>Roll Identifier</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMediums.length > 0 ? filteredMediums.map((m, index) => (
              <tr key={m.id}>
                <td>{index + 1}</td>
                <th></th>
                <td>{m.shift_name}</td>
                <td>{m.name}</td>
                <td>{m.identifier}</td>
                <td>
                  <span className={`status-${m.status.toLowerCase()}`}>{m.status}</span>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(m)}>
                    <FaEdit />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No records found</td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="table-info">Showing {filteredMediums.length} entries</p>
      </section>
    </div>
  );
};

export default MediumSetup;
