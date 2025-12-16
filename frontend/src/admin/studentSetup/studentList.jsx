import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTimes } from "react-icons/fa"; // Add close icon
import "../../assets/styles/admin/studentSetup/studentList.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    eduLevel: "",
    department: "",
    className: "",
    section: "",
    session: "",
  });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStudent, setModalStudent] = useState(null);
  const [modalType, setModalType] = useState(""); // "view" or "edit"

  const eduLevels = ["School", "College"];
  const departments = ["Science", "Humanities", "Business Studies", "Default"];
  const classes = ["Eight", "Nine", "Ten"];
  const sections = ["A", "B", "C"];
  const sessions = ["2024-2025", "2025"];

  const studentData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    studentId: `24020${i.toString().padStart(3, "0")}`,
    regNo: "",
    session: i % 2 === 0 ? "2024-2025" : "2025",
    image: `https://i.pravatar.cc/80?img=${i + 1}`,
    name: `Student ${i + 1}`,
    roll: 70 + i,
    medium: "Bangla",
    shift: "Day",
    className: classes[i % 3],
    department: departments[i % 4],
    section: sections[i % 3],
    contact: `0170000${(i + 1000).toString().slice(-7)}`,
  }));

  useEffect(() => {
    setStudents(studentData);
    setFilteredStudents(studentData);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  useEffect(() => {
    const filtered = students.filter((s) => {
      return (
        (!filters.eduLevel || s.className === filters.eduLevel) &&
        (!filters.department || s.department === filters.department) &&
        (!filters.className || s.className === filters.className) &&
        (!filters.section || s.section === filters.section) &&
        (!filters.session || s.session === filters.session) &&
        (s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.studentId.includes(search) ||
          s.roll.toString().includes(search))
      );
    });
    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [filters, search, students]);

  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open modal
  const openModal = (student, type) => {
    setModalStudent(student);
    setModalType(type);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setModalStudent(null);
    setModalType("");
  };

  return (
    <div className="student-list-page">
      <h2>Student List</h2>

      {/* Filters */}
      <div className="filters">
        <select name="eduLevel" onChange={handleFilterChange} value={filters.eduLevel}>
          <option value="">Select Edu. Level</option>
          {eduLevels.map((e, i) => <option key={i} value={e}>{e}</option>)}
        </select>
        <select name="department" onChange={handleFilterChange} value={filters.department}>
          <option value="">Select Department</option>
          {departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
        </select>
        <select name="className" onChange={handleFilterChange} value={filters.className}>
          <option value="">Select Class</option>
          {classes.map((c, i) => <option key={i} value={c}>{c}</option>)}
        </select>
        <select name="section" onChange={handleFilterChange} value={filters.section}>
          <option value="">Select Section</option>
          {sections.map((s, i) => <option key={i} value={s}>{s}</option>)}
        </select>
        <select name="session" onChange={handleFilterChange} value={filters.session}>
          <option value="">Select Session</option>
          {sessions.map((s, i) => <option key={i} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Entries and Search */}
      <div className="table-top">
        <div className="entries">
          <label>
            Show
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
              {[5, 10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            entries
          </label>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <table className="student-table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Student ID</th>
            <th>Registration Number</th>
            <th>Session</th>
            <th>Image</th>
            <th>Student Name</th>
            <th>Roll</th>
            <th>Medium</th>
            <th>Shift</th>
            <th>Class</th>
            <th>Department/Subject</th>
            <th>Section</th>
            <th>Contact Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((s, i) => (
            <tr key={s.id}>
              <td>{indexOfFirst + i + 1}</td>
              <td>{s.studentId}</td>
              <td>{s.regNo}</td>
              <td>{s.session}</td>
              <td><img src={s.image} alt={s.name} /></td>
              <td>{s.name}</td>
              <td>{s.roll}</td>
              <td>{s.medium}</td>
              <td>{s.shift}</td>
              <td>{s.className}</td>
              <td>{s.department}</td>
              <td>{s.section}</td>
              <td>{s.contact}</td>
              <td className="action-icons">
                <FaEye className="icon view-icon" onClick={() => openModal(s, "view")} />
                <FaEdit className="icon edit-icon" onClick={() => openModal(s, "edit")} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredStudents.length)} of {filteredStudents.length} entries
      </p>

      {/* Pagination */}
      <div className="pagination-container">
        <div className="pagination">
          <button onClick={() => paginate(1)} disabled={currentPage === 1}>«</button>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>‹</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
          <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>»</button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && modalStudent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}><FaTimes /></button>
            <h3>{modalType === "view" ? "View Student" : "Edit Student"}</h3>
            <div className="modal-body">
              <img src={modalStudent.image} alt={modalStudent.name} />
              <p><strong>ID:</strong> {modalStudent.studentId}</p>
              <p><strong>Name:</strong> {modalStudent.name}</p>
              <p><strong>Roll:</strong> {modalStudent.roll}</p>
              <p><strong>Class:</strong> {modalStudent.className}</p>
              <p><strong>Department:</strong> {modalStudent.department}</p>
              <p><strong>Session:</strong> {modalStudent.session}</p>
              <p><strong>Contact:</strong> {modalStudent.contact}</p>
              <p><strong>Medium:</strong> {modalStudent.medium}</p>
              <p><strong>Shift:</strong> {modalStudent.shift}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
