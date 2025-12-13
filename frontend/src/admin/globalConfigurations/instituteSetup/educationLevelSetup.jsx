import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/educationLevelSetup.css";

const EDUCATION_CODES = [
  "pre_primary",
  "primary",
  "six_eight",
  "nine_ten",
  "higher_secondary",
  "pass_degree",
  "under_graduate",
  "post_graduate",
  "private_degree",
  "preliminary_post_graduate",
  "private_post_graduate",
  "preliminary_private_post_graduate",
  "professional_masters",
];

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
  {
    id: 1,
    shift_id: 1,
    shift_name: "Morning",
    medium_id: 1,
    medium_name: "Bangla",
    title: "Primary Level",
    code: "primary",
    roll: 1,
    type: "single_year",
    number: 30,
    status: "Active",
  },
  {
    id: 2,
    shift_id: 1,
    shift_name: "Morning",
    medium_id: 2,
    medium_name: "English",
    title: "Secondary Level",
    code: "six_eight",
    roll: 2,
    type: "mixed_year",
    number: 25,
    status: "Inactive",
  },
];

const EducationLevelSetup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(20);
  const [educationLevels, setEducationLevels] = useState(dummyEducationLevels);
  const [shifts] = useState(dummyShifts);
  const [allMediums] = useState(dummyMediums);
  const [mediums, setMediums] = useState([]);
  const [form, setForm] = useState({
    shift_id: "",
    shift_name: "",
    medium_id: "",
    medium_name: "",
    title: "",
    code: EDUCATION_CODES[0],
    roll: "",
    type: "single_year",
    number: "",
    status: "Inactive",
  });
  const [editingId, setEditingId] = useState(null);

  // Update mediums when shift changes
  useEffect(() => {
    if (!form.shift_id) {
      setMediums([]);
      setForm((prev) => ({ ...prev, medium_id: "", medium_name: "" }));
    } else {
      const filtered = allMediums.filter(
        (m) => m.shift_id == form.shift_id && m.status === "Active"
      );
      setMediums(filtered);
      setForm((prev) => ({ ...prev, medium_id: "", medium_name: "" }));
    }
  }, [form.shift_id, allMediums]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, code, roll, number, shift_id, medium_id } = form;

    if (!title || !roll || !number || !shift_id || !medium_id) {
      alert("All required fields must be filled!");
      return;
    }

    if (!editingId) {
      const codeExists = educationLevels.some((level) => level.code === code);
      if (codeExists) {
        alert(`The code "${code}" is already assigned!`);
        return;
      }

      const newLevel = {
        ...form,
        id: educationLevels.length
          ? Math.max(...educationLevels.map((l) => l.id)) + 1
          : 1,
        shift_name: shifts.find((s) => s.id == shift_id)?.shift_name || "",
        medium_name: allMediums.find((m) => m.id == medium_id)?.name || "",
      };

      setEducationLevels([...educationLevels, newLevel]);
      alert("Education Level added!");
    } else {
      setEducationLevels((prev) =>
        prev.map((level) =>
          level.id === editingId
            ? {
                ...form,
                id: editingId,
                shift_name: shifts.find((s) => s.id == form.shift_id)?.shift_name || "",
                medium_name: allMediums.find((m) => m.id == form.medium_id)?.name || "",
              }
            : level
        )
      );
      alert("Education Level updated!");
    }

    setForm({
      shift_id: "",
      shift_name: "",
      medium_id: "",
      medium_name: "",
      title: "",
      code: EDUCATION_CODES.find(
        (c) => !educationLevels.some((level) => level.code === c)
      ) || EDUCATION_CODES[0],
      roll: "",
      type: "single_year",
      number: "",
      status: "Inactive",
    });
    setEditingId(null);
  };

  const handleEdit = (level) => {
    setForm({ ...level });
    setEditingId(level.id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top for UX
  };

  const filteredData = educationLevels
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shift_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.medium_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, entriesToShow);

  return (
    <div className="main-content">
      <div className="breadcrumb">
        <a>Dashboard</a> <span>›</span>
        <a>Global Configuration</a> <span>›</span>
        Education Level Setup
      </div>


      {/* Form */}
      <section>
        <h3>{editingId ? "Edit Education Level" : "Add Education Level"}</h3>
        <form onSubmit={handleSubmit} className="form-tworows">

          <div className="form-row">
            <div className="form-group">
              <label>Shift Name <span className="required">*</span></label>
              <select
                value={form.shift_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    shift_id: e.target.value,
                    shift_name: shifts.find((s) => s.id == e.target.value)?.shift_name || "",
                  })
                }
              >
                <option value="">Select Shift</option>
                {shifts.map((s) => (
                  <option key={s.id} value={s.id}>{s.shift_name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Medium Name <span className="required">*</span></label>
              <select
                value={form.medium_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    medium_id: e.target.value,
                    medium_name: mediums.find((m) => m.id == e.target.value)?.name || "",
                  })
                }
              >
                <option value="">Select Medium</option>
                {mediums.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Education Level Name <span className="required">*</span></label>
              <input
                type="text"
                name="title"
                value={form.title}
                placeholder="Enter Education Level Name"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Education Level Code <span className="required">*</span></label>
              <select name="code" value={form.code} onChange={handleInputChange}>
                {EDUCATION_CODES.map((code) => (
                  <option
                    key={code}
                    value={code}
                    disabled={!editingId && educationLevels.some((level) => level.code === code)}
                  >
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Roll Identifier <span className="required">*</span></label>
              <input type="number" name="roll" value={form.roll} onChange={handleInputChange} placeholder="Roll identifier"/>
            </div>

            <div className="form-group">
              <label>Session Type</label>
              <select name="type" value={form.type} onChange={handleInputChange}>
                <option value="single_year">Single Year</option>
                <option value="mixed_year">Mixed Year</option>
              </select>
            </div>

            <div className="form-group">
              <label>Education level Number</label>
              <input type="number" name="number" value={form.number} onChange={handleInputChange} placeholder="Edu. Level Number"/>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <button type="submit">{editingId ? "Update" : "Add"}</button>
          </div>
        </form>
      </section>

      {/* Table */}
      <section>
        <h3>Education Level List</h3>
        <div className="table-header">
          <div className="entries">
            <label>
              Show
              <select
                value={entriesToShow}
                onChange={(e) => setEntriesToShow(Number(e.target.value))}
              >
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              entries
            </label>
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Campus Name</th>
              <th>Shift Name</th>
              <th>Medium Name</th>
              <th>Education Level Name</th>
              <th>Code</th>
              <th>Roll Identifier</th>
              <th>Session Type</th>
              <th>Number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <th></th>
                  <td>{item.shift_name}</td>
                  <td>{item.medium_name}</td>
                  <td>{item.title}</td>
                  <td>{item.code}</td>
                  <td>{item.roll}</td>
                  <td>{item.type === "single_year" ? "Single Year" : "Mixed Year"}</td>
                  <td>{item.number}</td>
                  <td>
                    <span className={`status-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(item)}>
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default EducationLevelSetup;
