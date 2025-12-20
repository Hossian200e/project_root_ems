import React, { useState } from "react";
import "../../assets/styles/admin/studentSetup/studentMigration.css"; // same CSS

const StudentMigration = () => {
  const [filters, setFilters] = useState({
    shift: "Day",
    medium: "Bangla",
    eduLevel: "Higher Secondary",
    department: "Science",
    currentClass: "HSC-Science",
    currentSection: "1st Year",
    currentSession: "2025-2026",
    examName: "",
    migrateShift: "Day",
    migrateMedium: "Bangla",
    migrateEduLevel: "",
    migrateDepartment: "",
    migrateClass: "",
    migrateSection: "",
    migrateSession: "",
    prevCourseAdvising: false,
    prevClassRoll: false,
    archive: false,
    date: new Date().toISOString().split("T")[0],
  });

  const [students, setStudents] = useState([
    { sl: 1, session: "2025-2026", regNo: "2210607239", name: "SAIFUL ISLAM", prevRoll: "1202526033046", classRoll: "", remarks: "" },
    { sl: 2, session: "2025-2026", regNo: "2210662472", name: "MD. NASIMUL ISLAM RADOAN", prevRoll: "1202526033047", classRoll: "", remarks: "" },
    { sl: 3, session: "2025-2026", regNo: "2210608416", name: "MD. MAHARAB HOSSEN", prevRoll: "1202526033048", classRoll: "", remarks: "" },
    // Add more students as needed
  ]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleSelectStudent = (regNo) => {
    setSelectedStudents((prev) =>
      prev.includes(regNo)
        ? prev.filter((id) => id !== regNo)
        : [...prev, regNo]
    );
  };

  const handleMigrate = () => {
    if (selectedStudents.length === 0) return alert("Select students first");

    alert(
      `Migrated ${selectedStudents.length} students to ${filters.migrateClass}-${filters.migrateSection}`
    );

    setSelectedStudents([]);
  };

  return (
    <div className="student-promotion-page">
      <h2>Student Migration</h2>

      {/* Current Filters */}
      <div className="filters current-filters">
        {[
          { label: "Shift", key: "shift", options: ["Day", "Morning"] },
          { label: "Medium", key: "medium", options: ["Bangla", "English"] },
          { label: "Edu Level", key: "eduLevel", options: ["Higher Secondary", "Secondary"] },
          { label: "Department", key: "department", options: ["Science", "Arts"] },
          { label: "Class", key: "currentClass", options: ["HSC-Science", "HSC-Arts"] },
          { label: "Section", key: "currentSection", options: ["1st Year", "2nd Year"] },
          { label: "Session", key: "currentSession", options: ["2025-2026", "2026-2027"] },
          { label: "Exam Name", key: "examName", options: ["", "Final", "Midterm"] },
        ].map((f) => (
          <label key={f.key}>
            {f.label}:
            <select
              value={filters[f.key]}
              onChange={(e) => setFilters({ ...filters, [f.key]: e.target.value })}
            >
              {f.options.map((opt) => (
                <option key={opt} value={opt}>{opt || "Select"}</option>
              ))}
            </select>
          </label>
        ))}

        <button className="show-btn" onClick={() => setShowTable(true)}>Show</button>
      </div>


      {/* Student Table */}
      {showTable && (
        <>
          <div className="student-table">
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedStudents(e.target.checked ? students.map((s) => s.regNo) : [])
                      }
                      checked={selectedStudents.length === students.length && students.length > 0}
                    />
                  </th>
                  <th>SL #</th>
                  <th>Session</th>
                  <th>Registration Number</th>
                  <th>Student Name</th>
                  <th>Previous Class Roll</th>
                  <th>Class Roll Number</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.regNo}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(s.regNo)}
                        onChange={() => handleSelectStudent(s.regNo)}
                      />
                    </td>
                    <td>{s.sl}</td>
                    <td>{s.session}</td>
                    <td>{s.regNo}</td>
                    <td>{s.name}</td>
                    <td>{s.prevRoll}</td>
                    <td>{s.classRoll}</td>
                    <td>{s.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      {/* Additional Filters */}
      {showTable && (
        <div className="additional-filters">


          <label>
            <input
              type="checkbox"
              checked={filters.archive}
              onChange={(e) => setFilters({ ...filters, archive: e.target.checked })}
            />
            Admission Cancel 
          </label>

          <label>
            Date:
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </label>
        </div>
      )}

          {/* Migrate To Filters */}
          <div className="filters promote-to">
            {[
              { label: "Shift", key: "migrateShift", options: ["Day", "Morning"] },
              { label: "Medium", key: "migrateMedium", options: ["Bangla", "English"] },
              { label: "Edu Level", key: "migrateEduLevel", options: ["", "Higher Secondary", "Secondary"] },
              { label: "Department", key: "migrateDepartment", options: ["", "Science", "Arts"] },
              { label: "Class", key: "migrateClass", options: ["", "HSC-Science", "HSC-Arts"] },
              { label: "Section", key: "migrateSection", options: ["", "2nd Year", "3rd Year"] },
              { label: "Session", key: "migrateSession", options: ["", "2026-2027", "2027-2028"] },
            ].map((f) => (
              <label key={f.key}>
                {f.label}:
                <select
                  value={filters[f.key]}
                  onChange={(e) => setFilters({ ...filters, [f.key]: e.target.value })}
                >
                  {f.options.map((opt) => (
                    <option key={opt} value={opt}>{opt || "Select"}</option>
                  ))}
                </select>
              </label>
            ))}

            <button className="promote-btn" onClick={handleMigrate}>
              Migrate Selected Students
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentMigration;
