import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/sectionSetup.css";

const SectionSetup = () => {
  // ---------------- Dummy Data ----------------
  const dummyShifts = [
    { id: 1, shift_name: "Morning" },
    { id: 2, shift_name: "Evening" },
  ];

  const dummyMediums = [
    { id: 1, shift_id: 1, name: "Bangla" },
    { id: 2, shift_id: 1, name: "English" },
    { id: 3, shift_id: 2, name: "English" },
  ];

  const dummyEduLevels = [
    { id: 1, shift_id: 1, medium_id: 1, title: "Primary" },
    { id: 2, shift_id: 1, medium_id: 2, title: "Secondary" },
  ];

  const dummyDepartments = [
    { id: 1, shift_id: 1, medium_id: 1, edu_level_id: 1, title: "Science" },
    { id: 2, shift_id: 1, medium_id: 2, edu_level_id: 2, title: "Math" },
  ];

  const dummyClasses = [
    { id: 1, shift: 1, medium: 1, edu_level: 1, department: 1, class_name: "Class 1" },
    { id: 2, shift: 1, medium: 2, edu_level: 2, department: 2, class_name: "Class 2" },
  ];

  const dummySections = [
    {
      id: 1,
      shift_id: 1,
      medium_id: 1,
      edu_level_id: 1,
      department_id: 1,
      class_id: 1,
      title: "Section A",
      order: 1,
      status: "Active",
    },
  ];

  // ---------------- States ----------------
  const [sections, setSections] = useState(dummySections);
  const [formData, setFormData] = useState({
    shift: "",
    medium: "",
    eduLevel: "",
    department: "",
    class: "",
    title: "",
    order: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);

  const [mediums, setMediums] = useState([]);
  const [filteredEduLevels, setFilteredEduLevels] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);

  // ---------------- Cascading Dropdowns ----------------
  useEffect(() => {
    if (!formData.shift) return setMediums([]);
    setMediums(dummyMediums.filter((m) => m.shift_id === Number(formData.shift)));
    setFormData((prev) => ({ ...prev, medium: "", eduLevel: "", department: "", class: "" }));
  }, [formData.shift]);

  useEffect(() => {
    if (!formData.shift || !formData.medium) return setFilteredEduLevels([]);
    setFilteredEduLevels(dummyEduLevels.filter(
      (e) => e.shift_id === Number(formData.shift) && e.medium_id === Number(formData.medium)
    ));
    setFormData((prev) => ({ ...prev, eduLevel: "", department: "", class: "" }));
  }, [formData.shift, formData.medium]);

  useEffect(() => {
    if (!formData.shift || !formData.medium || !formData.eduLevel) return setFilteredDepartments([]);
    setFilteredDepartments(dummyDepartments.filter(
      (d) =>
        d.shift_id === Number(formData.shift) &&
        d.medium_id === Number(formData.medium) &&
        d.edu_level_id === Number(formData.eduLevel)
    ));
    setFormData((prev) => ({ ...prev, department: "", class: "" }));
  }, [formData.shift, formData.medium, formData.eduLevel]);

  useEffect(() => {
    if (!formData.department) return setFilteredClasses([]);
    setFilteredClasses(dummyClasses.filter(
      (c) =>
        c.shift === Number(formData.shift) &&
        c.medium === Number(formData.medium) &&
        c.edu_level === Number(formData.eduLevel) &&
        c.department === Number(formData.department)
    ));
    setFormData((prev) => ({ ...prev, class: "" }));
  }, [formData.shift, formData.medium, formData.eduLevel, formData.department]);

  // ---------------- Handlers ----------------
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.shift || !formData.medium || !formData.eduLevel || !formData.department || !formData.class || !formData.title || !formData.order) {
      alert("Please fill all required fields!");
      return;
    }

    if (editId) {
      setSections((prev) => prev.map((s) => (s.id === editId ? { ...formData, id: editId } : s)));
    } else {
      const newId = sections.length ? Math.max(...sections.map((s) => s.id)) + 1 : 1;
      setSections((prev) => [...prev, { ...formData, id: newId }]);
    }

    setEditId(null);
    setFormData({ shift: "", medium: "", eduLevel: "", department: "", class: "", title: "", order: "", status: "Active" });
  };

  const handleEdit = (sec) => {
    setFormData({
      shift: sec.shift_id,
      medium: sec.medium_id,
      eduLevel: sec.edu_level_id,
      department: sec.department_id,
      class: sec.class_id,
      title: sec.title,
      order: sec.order,
      status: sec.status,
    });
    setEditId(sec.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getTitle = (list, id) => list.find((i) => Number(i.id) === Number(id))?.title || list.find((i) => Number(i.id) === Number(id))?.class_name || list.find((i) => Number(i.id) === Number(id))?.shift_name || "-";

  // ---------------- UI ----------------
  return (
    <div className="main-content">
      <div className="breadcrumb">
        <a>Dashboard</a> <span>›</span>
        <a>Global Configuration</a> <span>›</span>
        Section Setup
      </div>

      <h2>{editId ? "Edit Section" : "Add New Section"}</h2>

      <form onSubmit={handleSubmit} className="form-layout">
        <div className="form-row">
          <div className="form-group">
            <label>Shift Name <span className="required">*</span></label>
            <select name="shift" value={formData.shift} onChange={handleChange}>
              <option value="">Select Shift</option>
              {dummyShifts.map((s) => <option key={s.id} value={s.id}>{s.shift_name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Medium Name<span className="required">*</span></label>
            <select name="medium" value={formData.medium} onChange={handleChange}>
              <option value="">Select Medium</option>
              {mediums.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Education Level Name<span className="required">*</span></label>
            <select name="eduLevel" value={formData.eduLevel} onChange={handleChange}>
              <option value="">Select Edu. Level</option>
              {filteredEduLevels.map((el) => <option key={el.id} value={el.id}>{el.title}</option>)}
            </select>
          </div>
          <div className="form-group">
             <label>Department Name<span className="required">*</span></label>
            <select name="department" value={formData.department} onChange={handleChange}>
              <option value="">Select Department</option>
              {filteredDepartments.map((d) => <option key={d.id} value={d.id}>{d.title}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Class Name <span className="required">*</span></label>
            <select name="class" value={formData.class} onChange={handleChange}>
              <option value="">Select Class</option>
              {filteredClasses.map((c) => <option key={c.id} value={c.id}>{c.class_name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Section Name <span className="required">*</span></label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Section Name" />
          </div>
          <div className="form-group">
            <label>Section Order <span className="required">*</span></label>
            <input type="number" name="order" value={formData.order} onChange={handleChange} placeholder="Order" />
          </div>
          <div className="form-group">
            <label>Status </label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="form-group align-end">
            <button type="submit" className="btn">{editId ? "Update" : "Save"}</button>
          </div>
        </div>
      </form>

      <h3>Section List</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Campus Name</th>
            <th>Shift Name</th>
            <th>Medium Name</th>
            <th>Edu. Level</th>
            <th>Department Name</th>
            <th>Class Name</th>
            <th>Section Name</th>
            <th>Order</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
<tbody>
  {sections.map((sec, idx) => (
    <tr key={sec.id}>
      <td>{idx + 1}</td>
      <td></td>
      <td>{getTitle(dummyShifts, sec.shift_id)}</td>
      <td>{getTitle(dummyMediums, sec.medium_id)}</td>
      <td>{getTitle(dummyEduLevels, sec.edu_level_id)}</td>
      <td>{getTitle(dummyDepartments, sec.department_id)}</td>
      <td>{getTitle(dummyClasses, sec.class_id)}</td>
      <td>{sec.title}</td>
      <td>{sec.order}</td>
      <td>
        <span className={sec.status === "Active" ? "status-active" : "status-inactive"}>
          {sec.status}
        </span>
      </td>
      <td>
        <button className="btn-edit" onClick={() => handleEdit(sec)}><FaEdit /></button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default SectionSetup;
