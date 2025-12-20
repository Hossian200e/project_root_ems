import React, { useState } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "../../../assets/styles/admin/accounts/configurations/transactionTypes.css";

const TransactionTypes = () => {
  const [types, setTypes] = useState([
    { id: 1, title: "Income", status: "Active" },
    { id: 2, title: "Expense", status: "Active" },
    { id: 3, title: "Assets", status: "Active" },
    { id: 4, title: "Liabilities", status: "Active" },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    status: "Active",
  });

  const [mode, setMode] = useState(""); // add | edit | view
  const [showForm, setShowForm] = useState(false);

  /* ---------- Actions ---------- */

  const handleAdd = () => {
    setFormData({ id: null, title: "", status: "Active" });
    setMode("add");
    setShowForm(true);
  };

  const handleView = (item) => {
    setFormData(item);
    setMode("view");
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setMode("edit");
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction type?")) {
      setTypes(types.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert("Transaction Type Title is required");
      return;
    }

    if (mode === "add") {
      setTypes([
        ...types,
        {
          id: types.length + 1,
          title: formData.title,
          status: formData.status,
        },
      ]);
    }

    if (mode === "edit") {
      setTypes(
        types.map((item) =>
          item.id === formData.id ? formData : item
        )
      );
    }

    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setTypes(
      types.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  };

  /* ---------- UI ---------- */

  return (
    <div className="transaction-types-page">
      <div className="breadcrumb">
        Dashboard / Accounts / Transaction Types
      </div>

      <div className="page-header">
        <h2>Transaction Types</h2>
        <button className="add-btn" onClick={handleAdd}>
          <FaPlus /> Add Transaction Type
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction Type Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {types.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  <span
                    className={`status ${item.status.toLowerCase()}`}
                    onClick={() => toggleStatus(item.id)}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="action-btns">
                  <button
                    className="icon-btn view-btn"
                    title="View"
                    onClick={() => handleView(item)}
                  >
                    <FaEye />
                  </button>

                  <button
                    className="icon-btn edit-btn"
                    title="Edit"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="icon-btn delete-btn"
                    title="Delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Modal ---------- */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>
              {mode === "add" && "Add Transaction Type"}
              {mode === "edit" && "Edit Transaction Type"}
              {mode === "view" && "View Transaction Type"}
            </h3>

            <div className="form-group">
              <label>Transaction Type Title</label>
              <input
                type="text"
                value={formData.title}
                disabled={mode === "view"}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                disabled={mode === "view"}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowForm(false)}>
                Close
              </button>

              {mode !== "view" && (
                <button className="save-btn" onClick={handleSubmit}>
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTypes;
