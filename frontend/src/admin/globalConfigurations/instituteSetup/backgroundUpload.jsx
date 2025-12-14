import React, { useState } from "react";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/backgroundUpload.css";
import { FaEdit, FaPlus } from "react-icons/fa";

/* ================= CONFIG ================= */
const dualSideTypes = [
  "Student ID Card",
  "Teacher ID Card",
  "Guardian ID Card",
  "Non Bus ID Card",
  "Bus ID Card",
];

const backgroundTypes = [
  "Student ID Card",
  "Teacher ID Card",
  "Guardian ID Card",
  "Non Bus ID Card",
  "Bus ID Card",
  "Admit Card",
  "Marksheet",
  "Testimonial",
  "Transfer Certificate (TC)",
  "Certificate of Studies",
  "PDF Design",
  "Invoice Design",
  "Tabulation Sheet",
  "Prottoyon Potro",
];

const BackgroundUpload = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [backgrounds, setBackgrounds] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    format: "",
    type: "",
    session: "",
    layout: "",
    frontImage: "",
    backImage: "",
  });

  /* ================= SEARCH ================= */
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    setFiltered(
      backgrounds.filter(
        (b) =>
          b.type.toLowerCase().includes(value) ||
          b.format.toLowerCase().includes(value)
      )
    );
  };

  /* ================= FORM CHANGE ================= */
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.format || !formData.type || !formData.layout || !formData.frontImage) {
      alert("Please fill all required fields.");
      return;
    }

    if (dualSideTypes.includes(formData.type) && !formData.backImage) {
      alert("Back image is required for ID Card.");
      return;
    }

    if (editId !== null) {
      // Edit existing
      const updated = backgrounds.map((b) =>
        b.id === editId ? { ...b, ...formData } : b
      );
      setBackgrounds(updated);
      setFiltered(updated);
    } else {
      // Add new
      const newItem = {
        id: backgrounds.length + 1,
        ...formData,
      };
      const updated = [...backgrounds, newItem];
      setBackgrounds(updated);
      setFiltered(updated);
    }

    // Reset form
    setFormData({
      format: "",
      type: "",
      session: "",
      layout: "",
      frontImage: "",
      backImage: "",
    });
    setEditId(null);
    setModalOpen(false);
  };

  /* ================= EDIT ================= */
  const handleEdit = (bg) => {
    setFormData({ ...bg });
    setEditId(bg.id);
    setModalOpen(true);
  };

  return (
    <div className="main-content">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="#">Dashboard</a>
        <span>›</span>
        Background Upload
      </div>

      {/* Header */}
      <div className="page-header">
        <h2>Background List</h2>
        <button className="btn primary" onClick={() => setModalOpen(true)}>
          <FaPlus /> Add Background
        </button>
      </div>

      {/* Search */}
      <div className="action-bar">
        <input
          className="search-box"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Background Format</th>
              <th>Background Type</th>
              <th>Session</th>
              <th>Background Layout</th>
              <th>Front Part Image</th>
              <th>Back Part Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length ? (
              filtered.map((b, i) => (
                <tr key={b.id}>
                  <td>{i + 1}</td>
                  <td>{b.format}</td>
                  <td>{b.type}</td>
                  <td>{b.session || "-"}</td>
                  <td>{b.layout}</td>
                  <td>
                    <img src={b.frontImage} className="preview-img" alt="Front" />
                  </td>
                  <td>
                    {b.backImage ? (
                      <img src={b.backImage} className="preview-img" alt="Back" />
                    ) : (
                      <span className="na">N/A</span>
                    )}
                  </td>
                  <td>
                    <button className="btn-icon edit" onClick={() => handleEdit(b)}>
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="table-footer">
        Showing {filtered.length} entries
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content large">
            <span className="close" onClick={() => { setModalOpen(false); setEditId(null); }}>
              &times;
            </span>

            <h3>{editId ? "Edit Background" : "Add Background"}</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Background Format <span className="required">*</span></label>
                  <select name="format" value={formData.format} onChange={handleFormChange}>
                    <option value="">Select</option>
                    <option>Common</option>
                    <option>Department Wise</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Background Type <span className="required">*</span></label>
                  <select name="type" value={formData.type} onChange={handleFormChange}>
                    <option value="">Select</option>
                    {backgroundTypes.map((type, idx) => (
                      <option key={idx}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Session</label>
                  <select name="session" value={formData.session} onChange={handleFormChange}>
                    <option value="">All / Common</option>
                    <option>2024-2025</option>
                    <option>2025-2026</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Background Layout <span className="required">*</span></label>
                  <select name="layout" value={formData.layout} onChange={handleFormChange}>
                    <option value="">Select</option>
                    <option>Portrait</option>
                    <option>Landscape</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Front Image<span className="required">*</span></label>
                  <input type="file" name="frontImage" accept="image/*" onChange={handleFormChange} />
                  {formData.frontImage && (
                    <img src={formData.frontImage} className="preview-img" alt="Front Preview" />
                  )}
                </div>

                {dualSideTypes.includes(formData.type) && (
                  <div className="form-group">
                    <label>Back Image <span className="required">*</span></label>
                    <input type="file" name="backImage" accept="image/*" onChange={handleFormChange} />
                    {formData.backImage && (
                      <img src={formData.backImage} className="preview-img" alt="Back Preview" />
                    )}
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button className="btn primary">{editId ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundUpload;
