import React, { useState } from "react";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/classSubjects.css";

const ClassSubjects = () => {
  // ---------------- HARD-CODED DATA ----------------
  const eduLevels = [
    { id: 1, title: "School" },
    { id: 2, title: "College" },
  ];

  const shifts = [
    { id: 1, title: "Morning" },
    { id: 2, title: "Day" },
    { id: 3, title: "Evening" },
  ];

  const mediums = [
    { id: 1, title: "Bangla" },
    { id: 2, title: "English" },
    { id: 3, title: "Bilingual" },
  ];

  const departments = [
    { id: 1, education_level_id: 1, title: "Science" },
    { id: 2, education_level_id: 1, title: "Arts" },
    { id: 3, education_level_id: 2, title: "Commerce" },
  ];

  const classes = [
    { id: 1, edu_level: 1, department: 1, class_name: "Six" },
    { id: 2, edu_level: 1, department: 1, class_name: "Seven" },
    { id: 3, edu_level: 1, department: 2, class_name: "Six" },
  ];

  const sessions = [
    { id: 1, name: "2025" },
    { id: 2, name: "2026" },
  ];

  const subjects = [
    { id: 1, name: "Bangla" },
    { id: 2, name: "English" },
    { id: 3, name: "Mathematics" },
    { id: 4, name: "Science" },
    { id: 5, name: "History" },
    { id: 6, name: "Geography" },
  ];

  const subjectTypeOptions = [
    { code: "main", title: "Main" },
    { code: "additional", title: "Additional" },
    { code: "special", title: "Special" },
    { code: "main_choosable", title: "Main Choosable" },
  ];

  // ---------------- STATE ----------------
  const [filters, setFilters] = useState({
    shift: "",
    medium: "",
    eduLevel: "",
    department: "",
    className: "",
    session: "",
  });

  const [displaySubjects, setDisplaySubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [savedSubjectsMap, setSavedSubjectsMap] = useState({}); // store subjects per filter key

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredDepartments = departments.filter(
    (d) => !filters.eduLevel || String(d.education_level_id) === String(filters.eduLevel)
  );

  const filteredClasses = classes.filter(
    (c) =>
      (!filters.eduLevel || String(c.edu_level) === String(filters.eduLevel)) &&
      (!filters.department || String(c.department) === String(filters.department))
  );

  // Helper to create a unique key for each filter combination
  const getFilterKey = () => {
    return `${filters.shift}-${filters.medium}-${filters.eduLevel}-${filters.department}-${filters.className}-${filters.session}`;
  };

  const handleShow = () => {
    if (
      !filters.shift ||
      !filters.medium ||
      !filters.eduLevel ||
      !filters.department ||
      !filters.className ||
      !filters.session
    ) {
      return alert("Please select all filters before showing subjects!");
    }

    const filterKey = getFilterKey();

    const alreadySaved = savedSubjectsMap[filterKey] || [];

    const selectedAndSavedIds = [
      ...selectedSubjects.map((s) => s.subject_id),
      ...alreadySaved.map((s) => s.subject_id),
    ];

    setDisplaySubjects(subjects.filter((s) => !selectedAndSavedIds.includes(s.id)));
  };

  const addSubject = (sub) => {
    if (selectedSubjects.find((s) => s.subject_id === sub.id)) return;

    const newSubject = {
      id: sub.id,
      subject_id: sub.id,
      subject_name: sub.name,
      subject_code: "",
      subject_type: [],
      subject_order: selectedSubjects.length + 1,
    };
    setSelectedSubjects((prev) => [...prev, newSubject]);
    setDisplaySubjects((prev) => prev.filter((x) => x.id !== sub.id));
  };

  const removeSubject = (row) => {
    setSelectedSubjects((prev) => prev.filter((s) => s.subject_id !== row.subject_id));
    setDisplaySubjects((prev) => [...prev, { id: row.subject_id, name: row.subject_name }]);
  };

  const updateSubjectField = (id, field, value) => {
    setSelectedSubjects((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              [field]:
                field === "subject_type"
                  ? Array.from(value, (option) => option.value)
                  : value,
            }
          : s
      )
    );
  };

  const handleSubmit = () => {
    if (selectedSubjects.length === 0) return alert("Select at least one subject!");
    for (const s of selectedSubjects) {
      if (!s.subject_code || s.subject_type.length === 0 || !s.subject_order) {
        return alert("All fields are required!");
      }
    }

    const filterKey = getFilterKey();

    setSavedSubjectsMap((prev) => ({
      ...prev,
      [filterKey]: [...(prev[filterKey] || []), ...selectedSubjects],
    }));

    setSelectedSubjects([]);
    setDisplaySubjects([]);
    alert("Subjects saved successfully!");
  };

  const currentSavedSubjects = savedSubjectsMap[getFilterKey()] || [];
  const allSelectedSubjects = [...currentSavedSubjects, ...selectedSubjects];

  return (
    <div className="main-content-professional">
      <div className="breadcrumb">
        <a>Dashboard</a> <span>›</span>
        <a>Global Configuration</a> <span>›</span>
        Section Setup
      </div>

      <h2 className="page-title">Class Subjects</h2>

      {/* FILTER PANEL */}
      <section className="filter-section-professional">
        <div className="filter-card">
          <div className="form-row-professional">
            <div className="form-group-professional">
              <label>Shift Name <span className="required">*</span></label>
              <select name="shift" value={filters.shift} onChange={handleFilter}>
                <option value="">Select</option>
                {shifts.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group-professional">
              <label>Medium Name <span className="required">*</span></label>
              <select name="medium" value={filters.medium} onChange={handleFilter}>
                <option value="">Select</option>
                {mediums.map((m) => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group-professional">
              <label>Edu. Level Name <span className="required">*</span></label>
              <select name="eduLevel" value={filters.eduLevel} onChange={handleFilter}>
                <option value="">Select</option>
                {eduLevels.map((e) => (
                  <option key={e.id} value={e.id}>{e.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group-professional">
              <label>Department Name <span className="required">*</span></label>
              <select name="department" value={filters.department} onChange={handleFilter}>
                <option value="">Select</option>
                {filteredDepartments.map((d) => (
                  <option key={d.id} value={d.id}>{d.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group-professional">
              <label>Class Name <span className="required">*</span></label>
              <select name="className" value={filters.className} onChange={handleFilter}>
                <option value="">Select</option>
                {filteredClasses.map((c) => (
                  <option key={c.id} value={c.class_name}>{c.class_name}</option>
                ))}
              </select>
            </div>

            <div className="form-group-professional">
              <label>Session  <span className="required">*</span></label>
              <select name="session" value={filters.session} onChange={handleFilter}>
                <option value="">Select</option>
                {sessions.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group-professional">
              <button className="btn-professional show-btn" onClick={handleShow}>Show Subjects</button>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL TABLES */}
      <div className="dual-table-container-professional">
        {/* LEFT TABLE */}
        <div className="table-card-professional">
          <h3>Available Subjects</h3>
          <table className="data-table-professional">
            <thead>
              <tr>
                <th>SL</th>
                <th>Select</th>
                <th>Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {displaySubjects.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input type="checkbox" onChange={() => addSubject(s)} />
                  </td>
                  <td>{s.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RIGHT TABLE */}
        <div className="table-card-professional">
          <h3>Selected Subjects (Editable)</h3>
          <table className="data-table-professional">
            <thead>
              <tr>
                <th>SL</th>
                <th>Remove</th>
                <th>Subject Name</th>
                <th><label>Subject Code <span className="required">*</span></label></th>
                <th><label>Subject Type Code <span className="required">*</span></label></th>
                <th><label>Subject order<span className="required">*</span></label></th>
              </tr>
            </thead>
            <tbody>
              {allSelectedSubjects.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>
                    <button className="remove-btn-professional" onClick={() => removeSubject(s)}>X</button>
                  </td>
                  <td>{s.subject_name}</td>
                  <td>
                    <input
                      type="text"
                      value={s.subject_code}
                      onChange={(e) => updateSubjectField(s.id, "subject_code", e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      multiple
                      value={s.subject_type}
                      onChange={(e) => updateSubjectField(s.id, "subject_type", e.target.selectedOptions)}
                    >
                      {subjectTypeOptions.map((o) => (
                        <option key={o.code} value={o.code}>{o.title}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={s.subject_order}
                      onChange={(e) => updateSubjectField(s.id, "subject_order", Number(e.target.value))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="form-actions-professional">
            <button className="btn-professional submit-btn" onClick={handleSubmit}>Submit Subjects</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSubjects;
