import React, { useState, useEffect } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import "../../assets/styles/admin/studentSetup/studentList.css";

const StudentList = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    eduLevel: "",
    department: "",
    className: "",
    section: "",
    session: "",
    shift: "",
    medium: "",
  });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const eduLevels = ["School", "College"];
  const departments = ["Science", "Humanities", "Business Studies", "Default"];
  const classes = ["Eight", "Nine", "Ten"];
  const sections = ["A", "B", "C"];
  const sessions = ["2024-2025", "2025"];

  // Sample student data
  const studentData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    studentId: `24020${i.toString().padStart(3, "0")}`,
    regNo: `REG${i + 1}`,
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
    formData: {
      fullNameBangla: "নাম",
      birthRegNo: "1234567890",
      dob: "2008-01-01",
      nationality: "Bangladeshi",
      country: "Bangladesh",
      religion: "Islam",
      bloodGroup: "A+",
      gender: "Male",
      maritalStatus: "Unmarried",
      email: `student${i + 1}@email.com`,
      fatherName: "Father Name",
      fatherPhone: "01711111111",
      motherName: "Mother Name",
      motherPhone: "01722222222",
      guardianName: "Guardian Name",
      guardianPhone: "01733333333",
      roll: 70 + i,
      session: i % 2 === 0 ? "2024-2025" : "2025",
      hostel: "Magura Hostel",
      hostelRoom: "101",
      hostelType: "Boys",
      hostelFee: 5000,
      paymentStatus: "Paid",
      busNo: "Bus 12",
      roadNo: "Road 5",
      pickupPoint: "Stop A",
      dropPoint: "Stop B",
      transportType: "Bus",
      driverName: "Driver Name",
      driverContact: "01755555555",
      transportFee: 3000,
      transportPaymentStatus: "Paid",
    },
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
        (!filters.department || s.department === filters.department) &&
        (!filters.className || s.className === filters.className) &&
        (!filters.section || s.section === filters.section) &&
        (!filters.session || s.session === filters.session) &&
        (!filters.shift || s.shift === filters.shift) &&
        (!filters.medium || s.medium === filters.medium) &&
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

  const paginate = (page) => setCurrentPage(page);
  const handleEdit = (student) => navigate("/addSingleStudent", { state: { student } });

  const handleViewPDF = async (student) => {
    const doc = new jsPDF("p", "pt", "a4");
    const { formData } = student;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 40;

    doc.setFontSize(20);
    doc.setTextColor("#0B5394");
    doc.text("Student Detailed Information", pageWidth / 2, y, { align: "center" });
    y += 30;

    if (student.image) doc.addImage(student.image, "JPEG", pageWidth - 110, y - 20, 80, 80);

    const drawSectionHeader = (title) => {
      doc.setFillColor("#D9E1F2");
      doc.setDrawColor("#0B5394");
      doc.rect(20, y, pageWidth - 40, 20, "FD");
      doc.setFontSize(14);
      doc.setTextColor("#0B5394");
      doc.text(title, 25, y + 15);
      y += 30;
    };

    const drawField = (label, value) => {
      doc.setFontSize(12);
      doc.setTextColor("#000");
      doc.text(`${label}:`, 25, y);
      doc.text(`${value}`, 150, y);
      y += 15;
      if (y > 750) {
        doc.addPage();
        y = 40;
      }
    };

    drawSectionHeader("Personal Information");
    drawField("Student ID", student.studentId);
    drawField("Name", formData.fullName || student.name);
    drawField("Name (Bangla)", formData.fullNameBangla);
    drawField("DOB", formData.dob);
    drawField("Nationality", formData.nationality);
    drawField("Country", formData.country);
    drawField("Religion", formData.religion);
    drawField("Blood Group", formData.bloodGroup);
    drawField("Gender", formData.gender);
    drawField("Email", formData.email);

    drawSectionHeader("Family Information");
    drawField("Father Name", formData.fatherName);
    drawField("Father Phone", formData.fatherPhone);
    drawField("Mother Name", formData.motherName);
    drawField("Mother Phone", formData.motherPhone);
    drawField("Guardian Name", formData.guardianName);
    drawField("Guardian Phone", formData.guardianPhone);

    drawSectionHeader("Academic Information");
    autoTable(doc, {
      startY: y,
      head: [["Class", "Department", "Shift", "Medium", "Roll", "Session"]],
      body: [[student.className, student.department, student.shift, student.medium, formData.roll, formData.session]],
      theme: "grid",
      headStyles: { fillColor: "#D9E1F2", textColor: "#0B5394" },
      alternateRowStyles: { fillColor: "#f5f5f5" },
      styles: { fontSize: 12 },
      didDrawPage: (data) => { y = data.cursor.y + 20; }
    });

    drawSectionHeader("Hostel Information");
    autoTable(doc, {
      startY: y,
      head: [["Hostel", "Room", "Type", "Fee", "Payment Status"]],
      body: [[formData.hostel, formData.hostelRoom, formData.hostelType, formData.hostelFee, formData.paymentStatus]],
      theme: "grid",
      headStyles: { fillColor: "#D9E1F2", textColor: "#0B5394" },
      alternateRowStyles: { fillColor: "#f5f5f5" },
      styles: { fontSize: 12 },
      didDrawPage: (data) => { y = data.cursor.y + 20; }
    });

    drawSectionHeader("Transport Information");
    autoTable(doc, {
      startY: y,
      head: [["Bus No", "Road No", "Pickup", "Drop", "Type", "Driver", "Contact", "Fee", "Payment Status"]],
      body: [[formData.busNo, formData.roadNo, formData.pickupPoint, formData.dropPoint, formData.transportType, formData.driverName, formData.driverContact, formData.transportFee, formData.transportPaymentStatus]],
      theme: "grid",
      headStyles: { fillColor: "#D9E1F2", textColor: "#0B5394" },
      alternateRowStyles: { fillColor: "#f5f5f5" },
      styles: { fontSize: 12 },
      didDrawPage: (data) => { y = data.cursor.y + 20; }
    });

    const qrUrl = await QRCode.toDataURL(`https://your-system.com/student/${student.studentId}`);
    doc.addImage(qrUrl, "PNG", pageWidth - 110, 750, 80, 80);

    doc.setFontSize(10);
    doc.setTextColor("#888");
    doc.text("Generated by EMS System", pageWidth / 2, 820, { align: "center" });

    window.open(doc.output("bloburl"));
  };

  return (
    <div className="student-list-page">
      <h2>Student List</h2>

      {/* ACTION BAR */}
      <div className="filter-action-bar">
        <button className="btn btn-success" onClick={() => navigate("/addSingleStudent")}>
          + Add Student
        </button>
        <button className="btn btn-info" onClick={() => navigate("/quickAddStudent")}>
          ⚡ Quick Add
        </button>
      </div>

      {/* FILTERS */}
      <div className="filters">
        {["shift", "medium", "eduLevel", "department", "className", "section", "session"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)} <span className="required">*</span></label>
            <select name={field} value={filters[field] || ""} onChange={handleFilterChange}>
              <option value="">Select {field}</option>
              {(field === "shift" ? ["Day", "Morning"] :
               field === "medium" ? ["Bangla", "English"] :
               field === "eduLevel" ? eduLevels :
               field === "department" ? departments :
               field === "className" ? classes :
               field === "section" ? sections :
               sessions
              ).map((val, i) => <option key={i} value={val}>{val}</option>)}
            </select>
          </div>
        ))}
        <button className="btn btn-primary" onClick={() => setCurrentPage(1)}>
          🔍 Show Students
        </button>
      </div>

      {/* TABLE TOP */}
      <div className="table-top">
        <label>
          Show
          <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(+e.target.value)}>
            {[5, 10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          entries
        </label>
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* STUDENT TABLE */}
      <div className="table-responsive">
        <table className="student-table">
          <thead>
            <tr>
              {["SL","Student ID","Registration Number","Image","Name","Roll","Shift","Medium","Department","Class","Section","Session","Contact","Action"].map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((s, i) => (
              <tr key={s.id}>
                <td>{indexOfFirst + i + 1}</td>
                <td>{s.studentId}</td>
                <td>{s.regNo}</td>
                <td><img src={s.image} alt={s.name} /></td>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.shift}</td>
                <td>{s.medium}</td>
                <td>{s.department}</td>
                <td>{s.className}</td>
                <td>{s.section}</td>
                <td>{s.session}</td>
                <td>{s.contact}</td>
                <td className="action-icons">
                  <button className="btn-icon view" onClick={() => handleViewPDF(s)}><FaEye /></button>
                  <button className="btn-icon edit" onClick={() => handleEdit(s)}><FaEdit /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TABLE INFO */}
      <div className="table-top-info">
        Showing {filteredStudents.length === 0 ? 0 : indexOfFirst + 1} to {indexOfLast > filteredStudents.length ? filteredStudents.length : indexOfLast} of {filteredStudents.length} entries
      </div>

      {/* PAGINATION */}
      <div className="pagination-container">
        <div className="pagination">
          <button className="btn-page" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>&laquo; Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
            if(page === 1 || page === totalPages || (page >= currentPage-2 && page <= currentPage+2)){
              return <button key={page} className={`btn-page ${currentPage===page?'active':''}`} onClick={() => paginate(page)}>{page}</button>
            } else if(page === currentPage-3 || page === currentPage+3){
              return <span key={page} className="dots">...</span>
            }
            return null;
          })}
          <button className="btn-page" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next &raquo;</button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
