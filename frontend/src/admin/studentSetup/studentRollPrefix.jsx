import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../../assets/styles/admin/studentSetup/studentRollPrefix.css";

const StudentRollPrefix = () => {
  const [prefixes, setPrefixes] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editPrefix, setEditPrefix] = useState(null);
  const [newPrefix, setNewPrefix] = useState({
    shift: "",
    medium: "",
    eduLevel: "",
    department: "",
    className: "",
    session: "",
    startNumber: "",
    status: "Active",
  });

  const filteredPrefixes = prefixes.filter(
    (p) =>
      p.shift.toLowerCase().includes(search.toLowerCase()) ||
      p.medium.toLowerCase().includes(search.toLowerCase()) ||
      p.eduLevel.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase()) ||
      p.className.toLowerCase().includes(search.toLowerCase()) ||
      p.session.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (p) => {
    setEditPrefix(p);
    setNewPrefix(p);
    setShowModal(true);
  };

  const handleSave = () => {
    if (
      !newPrefix.shift ||
      !newPrefix.medium ||
      !newPrefix.eduLevel ||
      !newPrefix.department ||
      !newPrefix.className ||
      !newPrefix.session ||
      !newPrefix.startNumber
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editPrefix) {
      setPrefixes(
        prefixes.map((p) => (p.id === editPrefix.id ? { ...p, ...newPrefix } : p))
      );
    } else {
      const nextId = prefixes.length + 1;
      setPrefixes([...prefixes, { id: nextId, ...newPrefix }]);
    }

    setNewPrefix({
      shift: "",
      medium: "",
      eduLevel: "",
      department: "",
      className: "",
      session: "",
      startNumber: "",
      status: "Active",
    });
    setEditPrefix(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this prefix?")) {
      setPrefixes(prefixes.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="student-roll-prefix">
      <div className="header">
        <h2>Student Code Prefix</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Prefix
        </button>
      </div>

      <div className="controls">
        <div className="entries">
          <label>
            Show
            <select>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </label>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Shift</th>
              <th>Medium</th>
              <th>Edu. Level</th>
              <th>Department</th>
              <th>Class</th>
              <th>Session</th>
              <th>Prefix</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrefixes.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-data">
                  No data available in table
                </td>
              </tr>
            ) : (
              filteredPrefixes.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.shift}</td>
                  <td>{p.medium}</td>
                  <td>{p.eduLevel}</td>
                  <td>{p.department}</td>
                  <td>{p.className}</td>
                  <td>{p.session}</td>
                  <td>{p.startNumber}</td>
                  <td>
                    <span
                      className={`status ${
                        p.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="actions">
                    <FaEdit className="edit" onClick={() => handleEdit(p)} />
                    <FaTrash className="delete" onClick={() => handleDelete(p.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>
          Showing {filteredPrefixes.length} of {prefixes.length} entries
        </span>
        <div className="pages">
          <button disabled>«</button>
          <button disabled>‹</button>
          <button className="active">1</button>
          <button>›</button>
          <button>»</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editPrefix ? "Edit Prefix" : "Create Student Code Prefix"}</h3>
            <div className="modal-body grid-modal">
              <label>
                Shift:
                <select
                  value={newPrefix.shift}
                  onChange={(e) =>
                    setNewPrefix({ ...newPrefix, shift: e.target.value })
                  }
                >
                  <option value="">Select Shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Day">Day</option>
                  <option value="Evening">Evening</option>
                </select>
              </label>

              <label>
                Medium:
                <select
                  value={newPrefix.medium}
                  onChange={(e) =>
                    setNewPrefix({ ...newPrefix, medium: e.target.value })
                  }
                >
                  <option value="">Select Medium</option>
                  <option value="Bangla">Bangla</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </label>

              <label>
                Edu. Level:
                <select
                  value={newPrefix.eduLevel}
                  onChange={(e) =>
                    setNewPrefix({ ...newPrefix, eduLevel: e.target.value })
                  }
                >
                  <option value="">Select Edu. Level</option>
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Higher">Higher</option>
                </select>
              </label>

              <label>
                Department:
                <select
                  value={newPrefix.department}
                  onChange={(e) =>
                    setNewPrefix({ ...newPrefix, department: e.target.value })
                  }
                >
                  <option value="">Select Department</option>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                </select>
              </label>

              <label>
                Class:
                <select
                  value={newPrefix.className}
                  onChange={(e) =>
                    setNewPrefix({ ...newPrefix, className: e.target.value })
                  }
                >
                  <option value="">Select Class</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                </select>
              </label>

              <label>
                Session:
                <select
                  value={newPrefix.session}
                  onChange={(e) =>
                    setNewPrefix({ ...newPrefix, session: e.target.value })
                  }
                >
                  <option value="">Select Session</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2026-2027">2026-2027</option>
                </select>
              </label>

              <label>
                Start Number (4 Digit *):
                <input
                  type="number"
                  min="1000"
                  max="9999"
                  value={newPrefix.startNumber}
                  onChange={(e) =>
                    setNewPrefix({ ...newPrefix, startNumber: e.target.value })
                  }
                />
              </label>

              <label>
                Status:
                <select
                  value={newPrefix.status}
                  onChange={(e) =>
                    setNewPrefix({ ...newPrefix, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>
            <div className="modal-footer">
              <button onClick={handleSave}>{editPrefix ? "Update" : "Save"}</button>
              <button
                className="close-btn"
                onClick={() => {
                  setShowModal(false);
                  setEditPrefix(null);
                  setNewPrefix({
                    shift: "",
                    medium: "",
                    eduLevel: "",
                    department: "",
                    className: "",
                    session: "",
                    startNumber: "",
                    status: "Active",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRollPrefix;
