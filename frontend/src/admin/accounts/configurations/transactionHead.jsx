import React, { useState } from "react";
import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import "../../../assets/styles/admin/accounts/configurations/transactionHead.css";

const TransactionHead = () => {
  const [heads, setHeads] = useState([
    { id: 1, title: "Examination Fee", parent: "", hasChild: "No", headType: "Student", ordering: 1 },
    { id: 2, title: "Primary Apply Fee", parent: "", hasChild: "No", headType: "Student", ordering: 1 },
    { id: 3, title: "Form Fill Up", parent: "", hasChild: "No", headType: "Student", ordering: 1 },
    { id: 4, title: "---------- Center Fee", parent: "", hasChild: "No", headType: "Student", ordering: 99 },
  ]);

  const emptyForm = {
    id: null,
    title: "",
    parent: "",
    hasChild: "No",
    headType: "Student",
    ordering: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("add");

  const openAdd = () => {
    setMode("add");
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openView = (item) => {
    setMode("view");
    setFormData(item);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setMode("edit");
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Transaction Head?")) {
      setHeads(heads.filter((h) => h.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.ordering) {
      alert("Title and Ordering are required");
      return;
    }

    if (mode === "add") {
      setHeads([...heads, { ...formData, id: Date.now() }]);
    }

    if (mode === "edit") {
      setHeads(heads.map((h) => (h.id === formData.id ? formData : h)));
    }

    setShowForm(false);
  };

  return (
    <div className="transaction-head-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">Dashboard / Accounts / Transaction Heads</div>

      {/* Header */}
      <div className="page-header">
        <h2>Transaction Heads</h2>
        <button className="add-btn" onClick={openAdd} title="Add">
          <FaPlus /> Add Transaction Head
        </button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction Head Title</th>
              <th>Head Type</th>
              <th>Has Children</th>
              <th>Ordering</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {heads.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.headType}</td>
                <td>{item.hasChild}</td>
                <td>{item.ordering}</td>
                <td className="action-btns">
                  <button className="icon-btn view" title="View" onClick={() => openView(item)}>
                    <FaEye />
                  </button>
                  <button className="icon-btn edit" title="Edit" onClick={() => openEdit(item)}>
                    <FaEdit />
                  </button>
                  <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(item.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>
                {mode === "add" && "Add Transaction Head"}
                {mode === "edit" && "Edit Transaction Head"}
                {mode === "view" && "View Transaction Head"}
              </h3>
              <button className="icon-btn close" onClick={() => setShowForm(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Transaction Head Title</label>
                <input
                  type="text"
                  value={formData.title}
                  disabled={mode === "view"}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Parent Head</label>
                <select
                  value={formData.parent}
                  disabled={mode === "view"}
                  onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                >
                  <option value="">Select Parent Head</option>
                  {heads.map((h) => (
                    <option key={h.id} value={h.title}>{h.title}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Has Child</label>
                  <select
                    value={formData.hasChild}
                    disabled={mode === "view"}
                    onChange={(e) => setFormData({ ...formData, hasChild: e.target.value })}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Head Type</label>
                  <select
                    value={formData.headType}
                    disabled={mode === "view"}
                    onChange={(e) => setFormData({ ...formData, headType: e.target.value })}
                  >
                    <option value="Student">Student</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Ordering</label>
                <input
                  type="number"
                  value={formData.ordering}
                  disabled={mode === "view"}
                  onChange={(e) => setFormData({ ...formData, ordering: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="icon-btn secondary" onClick={() => setShowForm(false)}>
                <FaTimes /> Close
              </button>
              {mode !== "view" && (
                <button className="icon-btn primary" onClick={handleSubmit}>
                  <FaSave /> Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHead;
