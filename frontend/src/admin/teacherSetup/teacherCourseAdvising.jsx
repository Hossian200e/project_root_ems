import React, { useState } from "react";
import "../../assets/styles/admin/teacherSetup/teacherCourseAdvising.css";

const TeacherCourseAdvising = () => {
  const [teachers] = useState([
    {
      code: "E000216",
      name: "Md. Nazrul Islam",
      department: "Science",
      eduLevel: "Higher Secondary",
      session: "2025-2026",
      shift: "Day",
      medium: "Bangla",
      courses: [
        {
          className: "HSC-Science",
          sections: ["2nd Year", "1st Year", "1st Year (A)"],
          subjects: [
            "Bangla",
            "English",
            "Bangla 1st Part",
            "Bangla 2nd Part",
            "English 1st Part",
            "English 2nd Part",
            "Physics",
            "Physics 1st Part",
            "Physics 2nd Part",
            "Chemistry",
            "Chemistry 1st Part",
            "Chemistry 2nd Part",
            "Biology",
            "Biology 1st Paper",
            "Biology 2nd Part",
            "Higher Mathematics",
            "Higher Mathematics 1st Part",
            "Higher Mathematics 2nd Part",
            "ICT",
          ],
        },
        {
          className: "HSC-Humanities",
          sections: ["2nd Year", "1st Year"],
          subjects: [
            "Bangla 1st Part",
            "Bangla",
            "Bangla 2nd Part",
            "English 1st Part",
            "English",
            "English 2nd Part",
            "ICT",
            "Economics 1st Part",
            "Economics",
            "Economics 2nd Part",
            "Logic 1st Part",
            "Logic",
            "Logic 2nd Part",
            "Islamic History 1st Part",
            "Islamic History",
            "Islamic History 2nd Part",
            "Civics 1st Part",
            "Civics",
            "Civics 2nd Part",
            "Islamic Studies",
            "Islamic Studies 1st Part",
            "Islamic Studies 2nd Part",
            "Psychology",
            "Psychology 1st Part",
            "Psychology 2nd Part",
            "Geography",
            "Geography 1st Part",
            "Geography 2nd Part",
            "Social Work 1st Paper",
            "Social Work 2nd Paper",
            "Home Science 1st Part",
            "Home Science 2nd Part",
          ],
        },
      ],
    },
    {
      code: "E000217",
      name: "Marufa",
      department: "Arts",
      eduLevel: "Higher Secondary",
      session: "2025-2026",
      shift: "Day",
      medium: "English",
      courses: [
        {
          className: "HSC-Arts",
          sections: ["1st Year", "2nd Year"],
          subjects: ["Bangla", "English", "History", "Civics"],
        },
      ],
    },
  ]);

  const [filters, setFilters] = useState({
    eduLevel: "",
    session: "",
    shift: "",
    medium: "",
    department: "",
    teacherCode: "",
  });

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState({});

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setSelectedTeacher(null);
    setSelectedSubjects({});
  };

  const handleShowTeacher = () => {
    const teacher = teachers.find(
      (t) =>
        (filters.teacherCode === "" || t.code === filters.teacherCode) &&
        (filters.eduLevel === "" || t.eduLevel === filters.eduLevel) &&
        (filters.session === "" || t.session === filters.session) &&
        (filters.shift === "" || t.shift === filters.shift) &&
        (filters.medium === "" || t.medium === filters.medium) &&
        (filters.department === "" || t.department === filters.department)
    );
    setSelectedTeacher(teacher || null);
    setSelectedSubjects({});
  };

  const handleSubjectChange = (className, section, subject, checked) => {
    const key = `${className}-${section}`;
    setSelectedSubjects((prev) => {
      const current = prev[key] || [];
      if (checked) {
        return { ...prev, [key]: [...current, subject] };
      } else {
        return { ...prev, [key]: current.filter((s) => s !== subject) };
      }
    });
  };

  const handleSubmit = () => {
    // Here you can send the selected subjects to backend API
    console.log("Allocated Courses:", selectedSubjects);
    alert("Courses submitted successfully!");
  };

  return (
    <div className="teacher-course-container">
      <h2>Teacher Course Advising</h2>

      <div className="teacher-course-filters">
        <div className="filter-row">
          <label>Edu Level</label>
          <select name="eduLevel" value={filters.eduLevel} onChange={handleFilterChange}>
            <option value="">Select Edu Level</option>
            <option value="Higher Secondary">Higher Secondary</option>
            <option value="Graduate">Graduate</option>
          </select>

          <label>Session</label>
          <select name="session" value={filters.session} onChange={handleFilterChange}>
            <option value="">Select Session</option>
            <option value="2025-2026">2025-2026</option>
          </select>

          <label>Shift</label>
          <select name="shift" value={filters.shift} onChange={handleFilterChange}>
            <option value="">Select Shift</option>
            <option value="Day">Day</option>
            <option value="Evening">Evening</option>
          </select>

          <label>Medium</label>
          <select name="medium" value={filters.medium} onChange={handleFilterChange}>
            <option value="">Select Medium</option>
            <option value="Bangla">Bangla</option>
            <option value="English">English</option>
          </select>
        </div>

        <div className="filter-row">
          <label>Department</label>
          <select name="department" value={filters.department} onChange={handleFilterChange}>
            <option value="">Select Department</option>
            <option value="Science">Science</option>
            <option value="Arts">Arts</option>
            <option value="Commerce">Commerce</option>
            <option value="Business">Business</option>
          </select>

          <label>Teacher</label>
          <select name="teacherCode" value={filters.teacherCode} onChange={handleFilterChange}>
            <option value="">Select Teacher</option>
            {teachers.map((t) => (
              <option key={t.code} value={t.code}>{t.name}</option>
            ))}
          </select>

          <button className="show-btn" onClick={handleShowTeacher}>
            Show Course Advising Panel
          </button>
        </div>
      </div>

      {selectedTeacher && (
        <div className="advising-panel">
          <div className="left-panel">
            <h3>Class and Section Wise Subjects</h3>
            <p><strong>Education:</strong> {selectedTeacher.eduLevel}</p>
            <p><strong>Teacher:</strong> {selectedTeacher.name}</p>
            {selectedTeacher.courses.map((course, idx) => (
              <div key={idx} className="course-block">
                <p><strong>Class:</strong> {course.className} ({selectedTeacher.medium} Medium - {selectedTeacher.shift} Shift)</p>
                {course.sections.map((sec, i) => (
                  <div key={i} className="section-block">
                    <p><strong>Section:</strong> {sec}</p>
                    <div className="subjects">
                      {course.subjects.map((sub, j) => (
                        <label key={j}>
                          <input
                            type="checkbox"
                            checked={(selectedSubjects[`${course.className}-${sec}`] || []).includes(sub)}
                            onChange={(e) =>
                              handleSubjectChange(course.className, sec, sub, e.target.checked)
                            }
                          />
                          {sub}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="right-panel">
            <h3>Allocated Course(s)</h3>
            <table className="allocated-table">
              <thead>
                <tr>
                  <th>Shift</th>
                  <th>Medium</th>
                  <th>Edu. Level</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(selectedSubjects).map((key) => {
                  const [className, section] = key.split("-");
                  return selectedSubjects[key].map((sub, idx) => (
                    <tr key={`${key}-${sub}-${idx}`}>
                      <td>{selectedTeacher.shift}</td>
                      <td>{selectedTeacher.medium}</td>
                      <td>{selectedTeacher.eduLevel}</td>
                      <td>{className}</td>
                      <td>{section}</td>
                      <td>{sub}</td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>

            {/* Submit button */}
            <div style={{ marginTop: "15px", textAlign: "right" }}>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCourseAdvising;
