import React, { useState } from "react";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/campusSetup.css";

const initialCampuses = [
  { id: 1, name: "Main Campus", code: "MC001", status: "Active" },
  { id: 2, name: "City Campus", code: "CC002", status: "Inactive" },
];

export default function CampusSetup() {
  const [campuses, setCampuses] = useState(initialCampuses);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCampusName, setNewCampusName] = useState("");

  // ADD
  const handleAddCampus = () => {
    setNewCampusName("");
    setShowAddModal(true);
  };

  const handleSaveNewCampus = () => {
    if (!newCampusName.trim()) {
      alert("Please enter campus name");
      return;
    }
    const newId = campuses.length ? Math.max(...campuses.map(c => c.id)) + 1 : 1;
    setCampuses([
      ...campuses,
      { id: newId, name: newCampusName, code: `C${String(newId).padStart(3,"0")}`, status: "Active" }
    ]);
    setShowAddModal(false);
  };

  // EDIT
  const handleEditCampus = (campus) => {
    setSelectedCampus(campus);
    setEditMode(true);
  };

  const handleSaveEditCampus = () => {
    if (!selectedCampus.name.trim()) {
      alert("Campus name cannot be empty");
      return;
    }
    setCampuses(prev => prev.map(c => c.id === selectedCampus.id ? selectedCampus : c));
    setSelectedCampus(null);
  };

  // STATUS TOGGLE
  const handleStatusToggle = (campus) => {
    setCampuses(prev => prev.map(c => c.id === campus.id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c));
  };

  return (
    <div className="campus-setup-page">
      <div className="page-header">
        <div className="breadcrumb">
          <a href="#">Dashboard</a> <span>›</span>
          <a href="#">Global Configuration</a> <span>›</span>
          Campus Setup
        </div>
        <button className="btn-add" onClick={handleAddCampus}>
          + Add Campus
        </button>
      </div>

      <div className="table-wrapper">
        <table className="campus-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Campus Name</th>
              <th>Campus Code</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campuses.map((campus, index) => (
              <tr key={campus.id}>
                <td>{index + 1}</td>
                <td>{campus.name}</td>
                <td>{campus.code}</td>
                <td>
                  <span
                    className={`status ${campus.status === "Active" ? "status-active" : "status-inactive"}`}
                    onClick={() => handleStatusToggle(campus)}
                  >
                    {campus.status}
                  </span>
                </td>
                <td>
                  <button className="btn-icon edit" onClick={() => handleEditCampus(campus)}>✎</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add New Campus</h3>
            <label>Campus Name</label>
            <input type="text" value={newCampusName} onChange={e => setNewCampusName(e.target.value)} />
            <div className="modal-actions">
              <button className="btn cancel" onClick={() => setShowAddModal(false)}>Close</button>
              <button className="btn save" onClick={handleSaveNewCampus}>Add Campus</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {selectedCampus && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Campus</h3>
            <label>Campus Name</label>
            <input type="text" value={selectedCampus.name} onChange={e => setSelectedCampus({...selectedCampus, name: e.target.value})} />
            <div className="modal-actions">
              <button className="btn cancel" onClick={() => setSelectedCampus(null)}>Close</button>
              <button className="btn save" onClick={handleSaveEditCampus}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
