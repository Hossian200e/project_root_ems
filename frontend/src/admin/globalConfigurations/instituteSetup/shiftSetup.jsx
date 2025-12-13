import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/shiftSetup.css";

const initialShifts = [
  { id: 1, campus: "Main Campus", shift_name: "Morning", identifier: "M", status: "Active" },
  { id: 2, campus: "Main Campus", shift_name: "Evening", identifier: "E", status: "Inactive" },
  { id: 3, campus: "City Campus", shift_name: "Morning", identifier: "M", status: "Active" },
];

const campuses = ["Main Campus", "City Campus"];

const ShiftSetup = () => {
  const [shiftList, setShiftList] = useState(initialShifts);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    campus: campuses[0],
    shift_name: "",
    identifier: "-",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.campus || !formData.shift_name) {
      alert("Campus and Shift Name are required!");
      return;
    }

    if (editId) {
      setShiftList((prev) =>
        prev.map((s) => (s.id === editId ? { ...s, ...formData } : s))
      );
      alert("Shift updated!");
    } else {
      const newShift = { ...formData, id: shiftList.length ? Math.max(...shiftList.map(s => s.id)) + 1 : 1 };
      setShiftList([...shiftList, newShift]);
      alert("Shift added!");
    }

    setFormData({ campus: campuses[0], shift_name: "", identifier: "-", status: "Active" });
    setEditId(null);
  };

  const handleEdit = (shift) => {
    setFormData({ ...shift });
    setEditId(shift.id);
  };

  const filteredShifts = shiftList.filter((shift) =>
    `${shift.campus} ${shift.shift_name} ${shift.identifier}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shift-setup-page">
      <div className="breadcrumb">
        <a href="#">Dashboard</a> <span>›</span>
        <a href="#">Shift Setup</a>
      </div>

      {/* FORM SECTION */}
      <div className="form-section">
        <h3>{editId ? "Edit Shift" : "Add Shift"}</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Campus Name<span className="required">*</span></label>
              <select name="campus" value={formData.campus} onChange={handleChange}>
                {campuses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Shift Name <span className="required">*</span></label>
              <input type="text" name="shift_name" value={formData.shift_name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Roll Identifier</label>
              <input type="text" name="identifier" value={formData.identifier} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group align-end">
              <button type="submit" className="btn">{editId ? "Update" : "Save"}</button>
            </div>
          </div>
        </form>
      </div>

      {/* SHIFT LIST SECTION */}
      <div className="list-section">
        <h3>Shift List</h3>
        <input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <table className="data-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Campus Name</th>
              <th>Shift Name</th>
              <th>Roll Identifier</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredShifts.length ? filteredShifts.map((shift, index) => (
              <tr key={shift.id}>
                <td>{index + 1}</td>
                <td>{shift.campus}</td>
                <td>{shift.shift_name}</td>
                <td>{shift.identifier}</td>
                <td>
                  <span className={`status status-${shift.status.toLowerCase()}`}>
                    {shift.status}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(shift)}>
                    <FaEdit />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No shifts found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="table-info">Showing {filteredShifts.length} entries</p>
      </div>
    </div>
  );
};

export default ShiftSetup;
