import React, { useState } from "react";
import "../../assets/styles/admin/studentSetup/studentImageDownload.css";


const StudentImageDownload = () => {
  const [filters, setFilters] = useState({
    eduLevel: "Higher Secondary",
    department: "Science",
    className: "HSC-Science",
    section: "1st Year",
    session: "2025-2026",
  });

  const [students] = useState([
    {
      id: 1,
      studentCode: "2514010030063",
      name: "Saiful Islam",
      roll: "1202526033046",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      studentCode: "2514010030064",
      name: "MD. Nasimul Islam",
      roll: "1202526033047",
      image: "https://via.placeholder.com/80",
    },
  ]);

  const [selected, setSelected] = useState([]);

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = (e) => {
    if (e.target.checked) {
      setSelected(students.map((s) => s.id));
    } else {
      setSelected([]);
    }
  };

  const handleDownload = () => {
    alert(`Downloading ${selected.length} student images`);
    // API / ZIP logic goes here
  };

  return (
    <div className="student-image-page">
      <h2>Student Image Download</h2>

      {/* Filters */}
      <div className="filter-card">
        <label>
          Edu. Level
          <select value={filters.eduLevel} onChange={(e) => handleChange("eduLevel", e.target.value)}>
            <option>Higher Secondary</option>
            <option>Secondary</option>
          </select>
        </label>

        <label>
          Department
          <select value={filters.department} onChange={(e) => handleChange("department", e.target.value)}>
            <option>Science</option>
            <option>Arts</option>
          </select>
        </label>

        <label>
          Class
          <select value={filters.className} onChange={(e) => handleChange("className", e.target.value)}>
            <option>HSC-Science</option>
            <option>HSC-Arts</option>
          </select>
        </label>

        <label>
          Section
          <select value={filters.section} onChange={(e) => handleChange("section", e.target.value)}>
            <option>1st Year</option>
            <option>2nd Year</option>
          </select>
        </label>

        <label>
          Session
          <select value={filters.session} onChange={(e) => handleChange("session", e.target.value)}>
            <option>2025-2026</option>
            <option>2026-2027</option>
          </select>
        </label>

        <button className="show-btn">Show</button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={selectAll} />
              </th>
              <th>SL</th>
              <th>Student Image</th>
              <th>Student Code</th>
              <th>Name</th>
              <th>Roll</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(s.id)}
                    onChange={() => toggleSelect(s.id)}
                  />
                </td>
                <td>{i + 1}</td>
                <td>
                  <img src={s.image} alt="student" />
                </td>
                <td>{s.studentCode}</td>
                <td>{s.name}</td>
                <td>{s.roll}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="download-area">
        <button onClick={handleDownload} disabled={!selected.length}>
          Download Selected Images
        </button>
      </div>
    </div>
  );
};

export default StudentImageDownload;
