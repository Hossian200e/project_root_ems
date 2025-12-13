import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/departmentsSetup.css";

/* ---------------- Dummy Data (NO FETCH) ---------------- */
const dummyShifts = [
  { id: 1, shift_name: "Morning", status: "Active" },
  { id: 2, shift_name: "Evening", status: "Active" },
];

const dummyMediums = [
  { id: 1, shift_id: 1, name: "Bangla", status: "Active" },
  { id: 2, shift_id: 1, name: "English", status: "Active" },
  { id: 3, shift_id: 2, name: "English", status: "Active" },
];

const dummyEducationLevels = [
  { id: 1, shift_id: 1, medium_id: 1, title: "Primary", status: "Active" },
  { id: 2, shift_id: 1, medium_id: 2, title: "Secondary", status: "Active" },
];

const dummyDepartments = [
  {
    id: 1,
    shift_id: 1,
    shift_name: "Morning",
    medium_id: 1,
    medium_name: "Bangla",
    education_level_id: 1,
    education_level_title: "Primary",
    code: "SCI",
    title: "Science",
    banglaTitle: "বিজ্ঞান",
    roll: 1,
    status: "Active",
  },
];

/* ---------------- Component ---------------- */
const DepartmentsSetup = () => {
  const [departments, setDepartments] = useState(dummyDepartments);
  const [shifts] = useState(dummyShifts);
  const [allMediums] = useState(dummyMediums);
  const [educationLevels] = useState(dummyEducationLevels);

  const [mediums, setMediums] = useState([]);
  const [filteredEducationLevels, setFilteredEducationLevels] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    shift_id: "",
    shift_name: "",
    medium_id: "",
    medium_name: "",
    education_level_id: "",
    education_level_title: "",
    code: "",
    title: "",
    banglaTitle: "",
    roll: "",
    status: "Active",
  });

  const [isEditing, setIsEditing] = useState(false);

  /* ---------------- Filters ---------------- */
  useEffect(() => {
    if (!formData.shift_id) {
      setMediums([]);
      setFilteredEducationLevels([]);
      return;
    }
    setMediums(
      allMediums.filter(
        m => m.shift_id == formData.shift_id && m.status === "Active"
      )
    );
  }, [formData.shift_id, allMediums]);

  useEffect(() => {
    if (!formData.shift_id || !formData.medium_id) {
      setFilteredEducationLevels([]);
      return;
    }
    setFilteredEducationLevels(
      educationLevels.filter(
        el =>
          el.shift_id == formData.shift_id &&
          el.medium_id == formData.medium_id
      )
    );
  }, [formData.shift_id, formData.medium_id, educationLevels]);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.shift_id || !formData.medium_id || !formData.education_level_id ||
        !formData.code || !formData.title || !formData.banglaTitle || !formData.roll) {
      alert("All required fields must be filled!");
      return;
    }

    if (isEditing) {
      setDepartments(prev =>
        prev.map(d => (d.id === formData.id ? formData : d))
      );
    } else {
      setDepartments(prev => [
        ...prev,
        { ...formData, id: prev.length + 1 }
      ]);
    }

    setFormData({
      id: null,
      shift_id: "",
      shift_name: "",
      medium_id: "",
      medium_name: "",
      education_level_id: "",
      education_level_title: "",
      code: "",
      title: "",
      banglaTitle: "",
      roll: "",
      status: "Active",
    });
    setIsEditing(false);
  };

  const handleEdit = (dept) => {
    setFormData(dept);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="main-content">
      <div className="breadcrumb">
        <a>Dashboard</a> <span>›</span>
        <a>Global Configuration</a> <span>›</span>
        Departments Setup
      </div>


      {/* -------- FORM -------- */}
      <section className="section">
        <h3>{isEditing ? "Edit Department" : "Add Department"}</h3>

        <form onSubmit={handleSubmit} className="form-layout">
          <div className="form-row">
            <div className="form-group">
              <label>Shift Name<span className="required">*</span></label>
              <select
                value={formData.shift_id}
                onChange={(e) => {
                  const s = shifts.find(x => x.id == e.target.value);
                  setFormData({
                    ...formData,
                    shift_id: e.target.value,
                    shift_name: s?.shift_name || ""
                  });
                }}
              >
                <option value="">Select</option>
                {shifts.map(s => (
                  <option key={s.id} value={s.id}>{s.shift_name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Medium Name<span className="required">*</span></label>
              <select
                value={formData.medium_id}
                onChange={(e) => {
                  const m = allMediums.find(x => x.id == e.target.value);
                  setFormData({
                    ...formData,
                    medium_id: e.target.value,
                    medium_name: m?.name || ""
                  });
                }}
              >
                <option value="">Select</option>
                {mediums.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Education Level Name<span className="required">*</span></label>
              <select
                value={formData.education_level_id}
                onChange={(e) => {
                  const el = filteredEducationLevels.find(x => x.id == e.target.value);
                  setFormData({
                    ...formData,
                    education_level_id: e.target.value,
                    education_level_title: el?.title || ""
                  });
                }}
              >
                <option value="">Select</option>
                {filteredEducationLevels.map(el => (
                  <option key={el.id} value={el.id}>{el.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Department Code <span className="required">*</span></label>
              <input name="code" value={formData.code} onChange={handleChange} placeholder="Department code"/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department Name <span className="required">*</span></label>
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Department Name"/>
            </div>

            <div className="form-group">
              <label>Department Bangla Name <span className="required">*</span></label>
              <input name="banglaTitle" value={formData.banglaTitle} onChange={handleChange} placeholder="Department Bangla name "/>
            </div>

            <div className="form-group">
              <label>Roll Identifier<span className="required">*</span></label>
              <input name="roll" value={formData.roll} onChange={handleChange} placeholder="Roll Identifier"/>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <button className="btn-submit">{isEditing ? "Update" : "Save"}</button>
        </form>
      </section>

      {/* -------- TABLE -------- */}
      <section className="section">
        <h3>Departments List</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Campus Name</th>
              <th>Shift Name</th>
              <th>Medium Name</th>
              <th>Edu Level Name</th>
              <th>Department Code</th>
              <th>Department Name</th>
              <th>Department Bangla Name</th>
              <th>Identifier Roll</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d, i) => (
              <tr key={d.id}>
                <td>{i + 1}</td>
                <td>{}</td>
                <td>{d.shift_name}</td>
                <td>{d.medium_name}</td>
                <td>{d.education_level_title}</td>
                <td>{d.code}</td>
                <td>{d.title}</td>
                <td>{d.banglaTitle}</td>
                <td>{d.roll}</td>
                <td>
                  <span className={`status-${d.status.toLowerCase()}`}>
                    {d.status}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(d)}>
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default DepartmentsSetup;
