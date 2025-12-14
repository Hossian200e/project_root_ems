import React, { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaEye, FaTrash } from "react-icons/fa";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/designationSetup.css";

const initialDesignations = [
  { id: 1, titleEng: "Principal", titleBng: "প্রিন্সিপাল" },
  { id: 2, titleEng: "Assistant Headmaster", titleBng: "সহকারী প্রধান শিক্ষক" },
  { id: 3, titleEng: "Assistant Teacher", titleBng: "সহকারী শিক্ষক" },
  { id: 4, titleEng: "Senior Teacher", titleBng: "সিনিয়র শিক্ষক" },
  { id: 5, titleEng: "Jr. Teacher", titleBng: "জুনিয়র শিক্ষক" },
  { id: 6, titleEng: "Pion", titleBng: "পিওন" },
  { id: 7, titleEng: "Clerk", titleBng: "কেরানি" },
  { id: 8, titleEng: "Aya", titleBng: "আয়া" },
  { id: 9, titleEng: "Guard", titleBng: "গার্ড" },
  { id: 10, titleEng: "Asst.Clerk", titleBng: "অ্যাসিস্ট্যান্ট .ক্লার্ক" },
];

const DesignationSetup = () => {
  const [designations, setDesignations] = useState(initialDesignations);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState(initialDesignations);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // add, edit, view
  const [currentDesignation, setCurrentDesignation] = useState(null);

  // Filter table
  useEffect(() => {
    if (!searchTerm) {
      setFiltered(designations);
    } else {
      const lower = searchTerm.toLowerCase();
      setFiltered(
        designations.filter(
          (d) =>
            d.titleEng.toLowerCase().includes(lower) ||
            d.titleBng.toLowerCase().includes(lower)
        )
      );
    }
  }, [searchTerm, designations]);

  // Open modal
  const openModal = (type, designation = null) => {
    setModalType(type);
    setCurrentDesignation(designation);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentDesignation(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const titleEng = form.titleEng.value.trim();
    const titleBng = form.titleBng.value.trim();

    if (!titleEng || !titleBng) {
      alert("Please fill all fields.");
      return;
    }

    if (modalType === "add") {
      const newDesignation = {
        id: designations.length ? designations[designations.length - 1].id + 1 : 1,
        titleEng,
        titleBng,
      };
      setDesignations([...designations, newDesignation]);
    } else if (modalType === "edit" && currentDesignation) {
      setDesignations(
        designations.map((d) =>
          d.id === currentDesignation.id ? { ...d, titleEng, titleBng } : d
        )
      );
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this designation?")) {
      setDesignations(designations.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="main-content">
      <div className="breadcrumb">
        <a href="#">Dashboard</a> › Designations
      </div>

      <div className="page-header">
        <h2>Designation List</h2>
        <button className="btn primary" onClick={() => openModal("add")}>
          <FaPlus /> Add Designation
        </button>
      </div>

      <div className="action-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Title Eng</th>
              <th>Title Bng</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((d, idx) => (
                <tr key={d.id}>
                  <td>{idx + 1}</td>
                  <td>{d.titleEng}</td>
                  <td>{d.titleBng}</td>
                  <td className="action-buttons">
                    <button className="btn-icon view" onClick={() => openModal("view", d)}>
                      <FaEye />
                    </button>
                    <button className="btn-icon edit" onClick={() => openModal("edit", d)}>
                      <FaEdit />
                    </button>
                    <button className="btn-icon delete" onClick={() => handleDelete(d.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  No designations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Showing {filtered.length} of {designations.length} entries
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {modalType === "view" && currentDesignation ? (
              <>
                <h3>View Designation</h3>
                <p>
                  <strong>Title (Eng): </strong> {currentDesignation.titleEng}
                </p>
                <p>
                  <strong>Title (Bng): </strong> {currentDesignation.titleBng}
                </p>
              </>
            ) : (
              <>
                <h3>{modalType === "add" ? "Add Designation" : "Edit Designation"}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Title in English<span className="required">*</span></label>
                    <input
                      type="text"
                      name="titleEng"
                      placeholder="English"
                      defaultValue={currentDesignation?.titleEng || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label>Title in Bangla<span className="required">*</span></label>
                    <input
                      type="text"
                      name="titleBng"
                      placeholder="Bangla"
                      defaultValue={currentDesignation?.titleBng || ""}
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn primary">
                      {modalType === "add" ? "Add" : "Update"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignationSetup;
