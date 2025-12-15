import React, { useState } from "react";
import { FaEdit, FaEye, FaPlus, FaTimes } from "react-icons/fa";
import "../../assets/styles/admin/globalConfigurations/globalSettings.css";

const initialSettings = [
  {
    id: 1,
    projectSubDir: "N/A",
    admissionPrintCopy: 2,
    mujibLogo: "No",
    classDetails: "Yes",
    teacherContactShow: "Yes",
    affiliatedWith: "NU",
  },
];

const emptyForm = {
  projectSubDir: "",
  admissionPrintCopy: "",
  mujibLogo: "No",
  classDetails: "No",
  teacherContactShow: "No",
  affiliatedWith: "",
};

const GlobalSettings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // add | edit | view
  const [formData, setFormData] = useState(emptyForm);
  const [selectedItem, setSelectedItem] = useState(null);

  const isView = modalType === "view";

  /* ---------------- Modal Open ---------------- */
  const openAddModal = () => {
    setModalType("add");
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setModalType("edit");
    setSelectedItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const openViewModal = (item) => {
    setModalType("view");
    setSelectedItem(item);
    setFormData(item);
    setShowModal(true);
  };

  /* ---------------- Form Change ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ---------------- Save ---------------- */
  const handleSave = () => {
    if (!formData.projectSubDir || !formData.admissionPrintCopy || !formData.affiliatedWith) {
      alert("Please fill all required fields");
      return;
    }

    if (modalType === "add") {
      setSettings([...settings, { ...formData, id: Date.now() }]);
    } else if (modalType === "edit") {
      setSettings(
        settings.map((item) => (item.id === selectedItem.id ? formData : item))
      );
    }
    setShowModal(false);
  };

  return (
    <div className="main-content">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Dashboard</span> › <span>Global Settings</span>
      </div>

      {/* Header */}
      <div className="page-header">
        <h2>Global Settings</h2>
        <button className="btn primary" onClick={openAddModal}>
          <FaPlus /> Add Setting
        </button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Project Sub Dir.</th>
              <th>Admission Print Copy No.</th>
              <th>Mujib Logo</th>
              <th>Class Details</th>
              <th>Teacher Cont. No. Show</th>
              <th>Affiliated With</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.projectSubDir}</td>
                <td>{item.admissionPrintCopy}</td>
                <td>
                  <span className={`badge ${item.mujibLogo === "Yes" ? "yes" : "no"}`}>
                    {item.mujibLogo}
                  </span>
                </td>
                <td>
                  <span className={`badge ${item.classDetails === "Yes" ? "yes" : "no"}`}>
                    {item.classDetails}
                  </span>
                </td>
                <td>
                  <span className={`badge ${item.teacherContactShow === "Yes" ? "yes" : "no"}`}>
                    {item.teacherContactShow}
                  </span>
                </td>
                <td>{item.affiliatedWith}</td>
                <td>
                  <button className="btn-icon view" onClick={() => openViewModal(item)}>
                    <FaEye />
                  </button>
                  <button className="btn-icon edit" onClick={() => openEditModal(item)}>
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- Modal ---------------- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{modalType === "add" ? "Add Setting" : modalType === "edit" ? "Edit Setting" : "View Setting"}</h3>
            <FaTimes className="close-btn" onClick={() => setShowModal(false)} />

            <label>Project Sub Dir *</label>
            <input
              type="text"
              name="projectSubDir"
              disabled={isView}
              value={formData.projectSubDir}
              onChange={handleChange}
            />

            <label>Admission Print Copy No *</label>
            <input
              type="number"
              name="admissionPrintCopy"
              disabled={isView}
              value={formData.admissionPrintCopy}
              onChange={handleChange}
            />

            <label>Mujib Logo</label>
            <select name="mujibLogo" disabled={isView} value={formData.mujibLogo} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label>Class Details</label>
            <select name="classDetails" disabled={isView} value={formData.classDetails} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label>Teacher Contact No. Show</label>
            <select name="teacherContactShow" disabled={isView} value={formData.teacherContactShow} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label>Affiliated With *</label>
            <input
              type="text"
              name="affiliatedWith"
              disabled={isView}
              value={formData.affiliatedWith}
              onChange={handleChange}
            />

            {!isView && (
              <div className="modal-actions">
                <button className="btn cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn save" onClick={handleSave}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSettings;
