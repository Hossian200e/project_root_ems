import React, { useState } from "react";
import "../../assets/styles/admin/teacherSetup/teacherList.css";

const TeacherList = () => {
  // Sample teacher data
  const [teachers, setTeachers] = useState([
    { code: "E000216", name: "Md. Nazrul Islam", designation: "Assistant Teacher", indexNo: "---", department: "unset", joiningDate: "--", shift: "Day", eduLevel: "unset", type: "Teacher" },
    { code: "E000217", name: "Marufa", designation: "Assistant Teacher", indexNo: "---", department: "unset", joiningDate: "--", shift: "Day", eduLevel: "unset", type: "Teacher" },
    { code: "E000218", name: "Sazia Laizu", designation: "Assistant Teacher", indexNo: "---", department: "unset", joiningDate: "--", shift: "Day", eduLevel: "unset", type: "Teacher" },
    { code: "E000219", name: "Kaniz Fatema", designation: "Assistant Teacher", indexNo: "---", department: "unset", joiningDate: "--", shift: "Day", eduLevel: "unset", type: "Teacher" },
    { code: "E000005", name: "Muhammad Liaqat Ali", designation: "Assistant Teacher", indexNo: "---", department: "Science", joiningDate: "--", shift: "Day", eduLevel: "unset", type: "Teacher" },
    { code: "E000009", name: "Sabina Laiju", designation: "Assistant Teacher", indexNo: "---", department: "unset", joiningDate: "--", shift: "Day", eduLevel: "unset", type: "Teacher" },
    { code: "E000012", name: "Md. Matiar Rahman", designation: "Assistant Teacher", indexNo: "---", department: "unset", joiningDate: "--", shift: "Day", eduLevel: "unset", type: "Teacher" },
    { code: "E000002", name: "Md. Farhad Hossain", designation: "Assistant Teacher", indexNo: "---", department: "unset", joiningDate: "--", shift: "Day", eduLevel: "unset", type: "Teacher" },
    { code: "E000004", name: "Marjina Begum", designation: "Assistant Teacher", indexNo: "---", department: "unset", joiningDate: "--", shift: "Day", eduLevel: "unset", type: "Teacher" },
    { code: "E000007", name: "Md. Abdur Razzak", designation: "Assistant Teacher", indexNo: "---", department: "unset", joiningDate: "--", shift: "Day", eduLevel: "unset", type: "Teacher" },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  // Filter teachers by search
  const filteredTeachers = teachers.filter(
    t => t.name.toLowerCase().includes(search.toLowerCase()) || t.code.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTeachers.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentTeachers = filteredTeachers.slice(startIndex, startIndex + entriesPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="teacher-list-container">
      <h2>Teacher List</h2>

      <div className="teacher-list-controls">
        <div>
          <label>Show </label>
          <select value={entriesPerPage} disabled>
            <option value="10">10</option>
          </select>
          <label> entries</label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="teacher-list-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Teacher Code</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Index No</th>
              <th>Department</th>
              <th>Joining Date</th>
              <th>Shift</th>
              <th>Education Level</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTeachers.length === 0 ? (
              <tr>
                <td colSpan="11" style={{ textAlign: "center" }}>No records found</td>
              </tr>
            ) : (
              currentTeachers.map((teacher, index) => (
                <tr key={teacher.code}>
                  <td>{startIndex + index + 1}</td>
                  <td>{teacher.code}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.designation}</td>
                  <td>{teacher.indexNo}</td>
                  <td>{teacher.department}</td>
                  <td>{teacher.joiningDate}</td>
                  <td>{teacher.shift}</td>
                  <td>{teacher.eduLevel}</td>
                  <td>{teacher.type}</td>
                  <td>
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={page === currentPage ? "active" : ""}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="showing-info">
        Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredTeachers.length)} of {filteredTeachers.length} entries
      </div>
    </div>
  );
};

export default TeacherList;
