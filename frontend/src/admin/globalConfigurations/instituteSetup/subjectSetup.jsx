import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/subjectSetup.css";

const SubjectSetup = () => {
  // ---------------- Dummy Data ----------------
  const dummySubjects = [
    { id: 1, name: "Mathematics", parent: "None", status: "Active" },
    { id: 2, name: "Physics", parent: "Science", status: "Active" },
    { id: 3, name: "Bangla", parent: "None", status: "Inactive" },
  ];

  // ---------------- States ----------------
  const [subjects, setSubjects] = useState(dummySubjects);
  const [subjectName, setSubjectName] = useState("");
  const [parentSubject, setParentSubject] = useState("");
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ---------------- Handlers ----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectName.trim()) {
      alert("Subject Name is required!");
      return;
    }

    const payload = {
      id: editingId || subjects.length + 1,
      name: subjectName,
      parent: parentSubject || "None",
      status,
    };

    if (editingId) {
      setSubjects(subjects.map((s) => (s.id === editingId ? payload : s)));
      alert("Subject updated successfully!");
    } else {
      setSubjects([...subjects, payload]);
      alert("Subject added successfully!");
    }

    setSubjectName("");
    setParentSubject("");
    setStatus("Active");
    setEditingId(null);
  };

  const handleEdit = (subject) => {
    setSubjectName(subject.name);
    setParentSubject(subject.parent === "None" ? "" : subject.parent);
    setStatus(subject.status);
    setEditingId(subject.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------------- Filter for parent dropdown ----------------
  const parentOnly = subjects.filter((s) => s.parent === "None");

  // ---------------- Filter for table ----------------
  const filteredSubjects = subjects
    .filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.parent.toLowerCase().includes(search.toLowerCase())
    )
    .filter((s) => {
      if (!parentSubject) return true; // show all if no parent selected
      return s.parent === parentSubject || s.name === parentSubject;
    });

  // ---------------- UI ----------------
  return (
    <div className="main-content">
      <div className="breadcrumb">
        <a href="#">Dashboard</a> <span>›</span>
        <a href="#">Global Configuration</a> <span>›</span>
        Subject Setup
      </div>

      <h2>{editingId ? "Edit Subject" : "Add Subject"}</h2>
      <form className="form-row" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Subject Title <span className="required">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Parent Subject</label>
          <select
            value={parentSubject}
            onChange={(e) => setParentSubject(e.target.value)}
          >
            <option value="">None</option>
            {parentOnly.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn save-btn">
            {editingId ? "Update" : "Save"}
          </button>
        </div>
      </form>

      <h3>Subject List</h3>
      <div className="table-header">
        <div className="entries">
          <label>
            Show
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            entries
          </label>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Parent Subject</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.length ? (
            filteredSubjects.map((s, index) => (
              <tr key={s.id}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td>{s.parent}</td>
                <td>
                  <span
                    className={s.status === "Active" ? "status-active" : "status-inactive"}
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
              <td colSpan="5" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <p className="table-info">
        Showing {filteredSubjects.length} of {filteredSubjects.length} entries
      </p>
    </div>
  );
};

export default SubjectSetup;
