import React, { useState, useEffect } from "react";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/subjectSubType.css";

const SubjectSubType = () => {
  /* ================= DUMMY DATA ================= */
  const eduLevelsData = [
    { id: 1, title: "School" },
    { id: 2, title: "College" },
  ];

  const departmentsData = [
    { id: 1, title: "Science" },
    { id: 2, title: "Arts" },
  ];

  const classesData = [
    { id: 1, edu_level: 1, department: 1, class_name: "Class 9" },
    { id: 2, edu_level: 1, department: 1, class_name: "Class 10" },
    { id: 3, edu_level: 2, department: 2, class_name: "Class 11" },
  ];

  const sessionsData = [
    { id: 1, name: "2024-2025" },
    { id: 2, name: "2025-2026" },
  ];

  const subTypeData = [
    {
      id: 1,
      edu_level: 1,
      department: 1,
      class_name: "Class 9",
      session: "2024-2025",
      title: "Main Subject",
      code: "main",
      category: "main",
      num_subjects: 5,
      sort_order: 1,
      status: "Active",
    },
  ];

  /* ================= STATES ================= */
  const [eduLevels] = useState(eduLevelsData);
  const [departments] = useState(departmentsData);
  const [classes] = useState(classesData);
  const [sessions] = useState(sessionsData);

  const [subjectSubTypes, setSubjectSubTypes] = useState(subTypeData);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [filteredSubTypes, setFilteredSubTypes] = useState([]);

  const [form, setForm] = useState({
    edu_level: "",
    department: "",
    class_name: "",
    session: "",
    title: "",
    code: "",
    category: "",
    num_subjects: 1,
    sort_order: 1,
    status: "Active",
  });

  const [searchDone, setSearchDone] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  /* ================= FILTER CLASS ================= */
  useEffect(() => {
    if (form.edu_level && form.department) {
      setFilteredClasses(
        classes.filter(
          (c) =>
            String(c.edu_level) === String(form.edu_level) &&
            String(c.department) === String(form.department)
        )
      );
    } else {
      setFilteredClasses([]);
    }
  }, [form.edu_level, form.department, classes]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSearch = () => {
    if (!form.edu_level || !form.department || !form.class_name || !form.session) {
      alert("Please fill all required fields");
      return;
    }

    const result = subjectSubTypes.filter(
      (i) =>
        String(i.edu_level) === String(form.edu_level) &&
        String(i.department) === String(form.department) &&
        i.class_name === form.class_name &&
        i.session === form.session
    );

    setFilteredSubTypes(result);
    setSearchDone(true);
    setShowForm(false);
  };

  const handleAdd = () => {
    setForm({
      ...form,
      title: "",
      code: "",
      category: "",
      num_subjects: 1,
      sort_order: 1,
      status: "Active",
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title || !form.code || !form.category) {
      alert("Please fill all required fields");
      return;
    }

    if (editingId) {
      setSubjectSubTypes((prev) =>
        prev.map((i) => (i.id === editingId ? { ...form, id: editingId } : i))
      );
      alert("Updated successfully");
    } else {
      setSubjectSubTypes((prev) => [
        ...prev,
        { ...form, id: prev.length + 1 },
      ]);
      alert("Added successfully");
    }

    setShowForm(false);
    setSearchDone(false);
  };

  /* ================= JSX ================= */
  return (
    <div className="main-content">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a>Dashboard</a> <span>›</span>
        <a>Global Configuration</a> <span>›</span>
        Subject Sub Type
      </div>

      <h2>Subject Sub Type</h2>

      {/* FILTER */}
      <h3>Filter</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Education Level *</label>
          <select name="edu_level" value={form.edu_level} onChange={handleChange}>
            <option value="">Select</option>
            {eduLevels.map((e) => (
              <option key={e.id} value={e.id}>{e.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Department *</label>
          <select name="department" value={form.department} onChange={handleChange}>
            <option value="">Select</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Class *</label>
          <select name="class_name" value={form.class_name} onChange={handleChange}>
            <option value="">Select</option>
            {filteredClasses.map((c) => (
              <option key={c.id} value={c.class_name}>{c.class_name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Session *</label>
          <select name="session" value={form.session} onChange={handleChange}>
            <option value="">Select</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group align-end">
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* TABLE */}
      {searchDone && (
        <>
          <h3>List</h3>

          {filteredSubTypes.length === 0 ? (
            <div className="empty-state">
              <p>No records found</p>
              <button onClick={handleAdd}>Add New</button>
            </div>
          ) : (
            <>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Code</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubTypes.map((i, idx) => (
                    <tr key={i.id}>
                      <td>{idx + 1}</td>
                      <td>{i.title}</td>
                      <td>{i.code}</td>
                      <td>{i.category}</td>
                      <td>
                        <span className={`status ${i.status === "Active" ? "active" : "inactive"}`}>
                          {i.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-edit" onClick={() => handleEdit(i)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: 10, textAlign: "right" }}>
                <button onClick={handleAdd}>Add New</button>
              </div>
            </>
          )}
        </>
      )}

      {/* ADD / EDIT */}
      {showForm && (
        <>
          <h3>{editingId ? "Edit" : "Add"} Subject Sub Type</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Code *</label>
              <input name="code" value={form.code} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <input name="category" value={form.category} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <button onClick={handleSave}>
            {editingId ? "Update" : "Add"}
          </button>
        </>
      )}
    </div>
  );
};

export default SubjectSubType;
