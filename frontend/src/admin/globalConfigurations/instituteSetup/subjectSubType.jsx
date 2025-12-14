import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
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

  const dummyShifts = [
    { id: 1, shift_name: "Morning" },
    { id: 2, shift_name: "Evening" },
  ];

  const mediums = [
    { id: 1, name: "English" },
    { id: 2, name: "Bangla" },
  ];

  const subTypeData = [
    {
      id: 1,
      edu_level: 1,
      department: 1,
      class_name: "Class 9",
      session: "2024-2025",
      shift: 1,
      medium: 1,
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
  const [shifts] = useState(dummyShifts);
  const [mediumList] = useState(mediums);

  const [subjectSubTypes, setSubjectSubTypes] = useState(subTypeData);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [filteredSubTypes, setFilteredSubTypes] = useState([]);

  const [form, setForm] = useState({
    edu_level: "",
    department: "",
    class_name: "",
    session: "",
    shift: "",
    medium: "",
    title: "",
    code: "",
    category: "",
    num_subjects: 1,
    sort_order: 1,
    status: "Active",
  });

  const [searchDone, setSearchDone] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  /* ================= AUTO REFRESH FILTER ================= */
  useEffect(() => {
    if (searchDone) {
      const result = subjectSubTypes.filter(
        (i) =>
          String(i.edu_level) === String(form.edu_level) &&
          String(i.department) === String(form.department) &&
          i.class_name === form.class_name &&
          i.session === form.session &&
          String(i.shift) === String(form.shift) &&
          String(i.medium) === String(form.medium)
      );
      setFilteredSubTypes(result);
    }
  }, [subjectSubTypes, form, searchDone]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // SEARCH
  const handleSearch = () => {
    if (
      !form.edu_level ||
      !form.department ||
      !form.class_name ||
      !form.session ||
      !form.shift ||
      !form.medium
    ) {
      alert("Please fill all required fields");
      return;
    }

    const result = subjectSubTypes.filter(
      (i) =>
        String(i.edu_level) === String(form.edu_level) &&
        String(i.department) === String(form.department) &&
        i.class_name === form.class_name &&
        i.session === form.session &&
        String(i.shift) === String(form.shift) &&
        String(i.medium) === String(form.medium)
    );

    setFilteredSubTypes(result);
    setSearchDone(true);
  };

  // ADD
  const handleAdd = () => {
    setForm({
      edu_level: form.edu_level || "",
      department: form.department || "",
      class_name: form.class_name || "",
      session: form.session || "",
      shift: form.shift || "",
      medium: form.medium || "",
      title: "",
      code: "",
      category: "",
      num_subjects: 1,
      sort_order: 1,
      status: "Active",
    });
    setEditingId(null);
    setShowModal(true);
  };

  // EDIT
  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
    setShowModal(true);
  };

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setSubjectSubTypes((prev) => prev.filter((i) => i.id !== id));
    }
  };

  // SAVE (ADD OR EDIT)
  const handleSave = () => {
    if (!form.title || !form.code || !form.category) {
      alert("Please fill all required fields");
      return;
    }

    if (editingId) {
      // UPDATE
      setSubjectSubTypes((prev) =>
        prev.map((i) => (i.id === editingId ? { ...form, id: editingId } : i))
      );
      alert("Updated successfully");
    } else {
      // ADD
      const newId =
        subjectSubTypes.length > 0
          ? Math.max(...subjectSubTypes.map((i) => i.id)) + 1
          : 1;

      const newSubType = { ...form, id: newId };
      setSubjectSubTypes((prev) => [...prev, newSubType]);

      // IF CURRENT FILTER MATCHES, ADD TO FILTERED TABLE IMMEDIATELY
      if (
        searchDone &&
        String(form.edu_level) === String(form.edu_level) &&
        String(form.department) === String(form.department) &&
        form.class_name === form.class_name &&
        form.session === form.session &&
        String(form.shift) === String(form.shift) &&
        String(form.medium) === String(form.medium)
      ) {
        setFilteredSubTypes((prev) => [...prev, newSubType]);
      }

      alert("Added successfully");
    }

    setShowModal(false);
  };

  return (
    <div className="main-content">
      <div className="breadcrumb">
        <a>Dashboard</a> <span>›</span>
        <a>Global Configuration</a> <span>›</span>
        Subject Sub Type
      </div>



      {/* FILTER */}
      <h3>Filter</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Shift Name <span className="required">*</span></label>
          <select name="shift" value={form.shift} onChange={handleChange}>
            <option value="">Select Shift</option>
            {shifts.map((s) => (
              <option key={s.id} value={s.id}>
                {s.shift_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Medium Name<span className="required">*</span></label>
          <select name="medium" value={form.medium} onChange={handleChange}>
            <option value="">Select Medium</option>
            {mediumList.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Education Level Name<span className="required">*</span></label>
          <select name="edu_level" value={form.edu_level} onChange={handleChange}>
            <option value="">Select</option>
            {eduLevels.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Department Name<span className="required">*</span></label>
          <select name="department" value={form.department} onChange={handleChange}>
            <option value="">Select</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Class Name <span className="required">*</span></label>
          <select name="class_name" value={form.class_name} onChange={handleChange}>
            <option value="">Select</option>
            {filteredClasses.map((c) => (
              <option key={c.id} value={c.class_name}>
                {c.class_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Session <span className="required">*</span></label>
          <select name="session" value={form.session} onChange={handleChange}>
            <option value="">Select</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
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
          <div style={{ marginTop: 10, textAlign: "right" }}>
            <button onClick={handleAdd}>+ Add New</button>
          </div>
          {filteredSubTypes.length === 0 ? (
            <div className="empty-state">
              <p>No records found</p>
              <button onClick={handleAdd}>Add New</button>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Class Name</th>
                  <th>Session</th>
                  <th>Subject Type</th>
                  <th>Code</th>
                  <th>Subject Count</th>
                  <th>Sort Order</th>
                  <th>Type Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubTypes.map((i, idx) => (
                  <tr key={i.id}>
                    <td>{idx + 1}</td>
                    <td>{i.class_name}</td>
                    <td>{i.session}</td>
                    <td>{i.title}</td>
                    <td>{i.code}</td>
                    <td>{i.num_subjects}</td>
                    <td>{i.sort_order}</td>
                    <td>{i.category}</td>
                    <td>
                      <span className={`status ${i.status === "Active" ? "active" : "inactive"}`}>
                        {i.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEdit(i)}>
                        <FaEdit />
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(i.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

{/* ADD / EDIT MODAL */}
{showModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>{editingId ? "Edit" : "Add"} Subject Sub Type</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Title <span className="required">*</span></label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title"/>
        </div>

        <div className="form-group">
          <label>Sub Type Code  <span className="required">*</span></label>
          <select name="code" value={form.code} onChange={handleChange}>
            <option value="">Select Code</option>
            <option value="main">main</option>
            <option value="additional">additional</option>
            <option value="special">special</option>
            <option value="main_choosable">main_choosable</option>
          </select>
        </div>

        <div className="form-group">
          <label>Sub Type Category <span className="required">*</span></label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="main">main</option>
            <option value="additional">additional</option>
            <option value="special">special</option>
          </select>
        </div>

        <div className="form-group">
          <label>Num of Subject to Choose<span className="required">*</span></label>
          <input type="number" name="num_subjects" value={form.num_subjects} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Sub Type Order <span className="required">*</span></label>
          <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Status <span className="required">*</span></label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn cancel" onClick={() => setShowModal(false)}>Close</button>
        <button className="btn save" onClick={handleSave}>{editingId ? "Update" : "Add"}</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default SubjectSubType;
