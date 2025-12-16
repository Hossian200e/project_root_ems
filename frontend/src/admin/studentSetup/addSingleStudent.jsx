import React, { useState, useEffect } from "react";
import "../../assets/styles/admin/studentSetup/addSingleStudent.css";

const AddSingleStudent = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    fullName: "",
    fullNameBangla: "",
    birthRegNo: "",
    dob: "",
    nationality: "Bangladeshi",
    country: "Bangladesh",
    religion: "",
    bloodGroup: "",
    gender: "",
    maritalStatus: "Unmarried",
    email: "",
    profilePic: null,
    studyBreak: "",
    fatherName: "",
    fatherPhone: "",
    isFatherGuardian: false,
    fatherNID: "",
    fatherPassport: "",
    motherName: "",
    motherPhone: "",
    isMotherGuardian: false,
    motherNID: "",
    motherPassport: "",
    guardianType: "Father",
    guardianName: "",
    guardianPhone: "",
    guardianRelation: "",
    studentPhone: "",
    fatherOccupation: "",
    quota: "",
    fatherIncome: "",
    guardianIncome: "",
    fatherImage: null,
    motherImage: null,
    guardianImage: null,
    presentAddress: "",
    permanentAddress: "",
    shift: "",
    medium: "",
    eduLevel: "",
    department: "",
    className: "",
    section: "",
    session: "",
    roll: "",
    regNo: "",
    attendanceId: "",
    admissionDate: "",
    studentCategory: "",
    oldStudentCode: "",
    sscBoard: "",
    sscRegNo: "",
    hscBoard: "",
    hscRegNo: "",
    pscExamName: "",
    pscDivision: "",
    pscRoll: "",
    pscGpa: "",
    pscTotal: "",
    pscGpaWithout4th: "",
    pscPassingYear: "",
    pscRegNo: "",
    pscSession: "",
    pscBoard: "",
    jscExamName: "",
    jscBoard: "",
    sscDivision: "",
    sscSession: "",
    hscDivision: "",
    hscSession: "",
    hscBoard: "",
    hostel: "",
    hostelRoom: "",
    allotmentDate: "",
    hostelType: "",
    hostelFee: "",
    paymentStatus: "",
    guardianPermission: "",
    emergencyContact: "",
    busNo: "",
    roadNo: "",
    pickupPoint: "",
    dropPoint: "",
    transportType: "",
    driverName: "",
    driverContact: "",
    transportFee: "",
    transportPaymentStatus: "",
  });

  const educationBoards = [
    { id: 1, board_name: "Dhaka" },
    { id: 2, board_name: "Chittagong" },
    { id: 3, board_name: "Rajshahi" },
    { id: 4, board_name: "Barisal" },
    { id: 5, board_name: "Sylhet" },
    { id: 6, board_name: "Comilla" },
    { id: 7, board_name: "Jessore" },
    { id: 8, board_name: "Mymensingh" },
    { id: 9, board_name: "Dinajpur" },
    { id: 10, board_name: "Madrasah" },
    { id: 11, board_name: "Technical" },
  ];

  const studentCategories = [
    { id: 1, category_name: "New Student" },
    { id: 2, category_name: "Old Student" },
    { id: 3, category_name: "Transfer Student" },
  ];

  const [shifts, setShifts] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [eduLevels, setEduLevels] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);

  const generateStudentId = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students/latestId");
      const result = await res.json();
      const lastNumber = result.lastNumber || 0;
      const nextNumber = lastNumber + 1;
      const newId = "STU" + String(nextNumber).padStart(6, "0");
      setFormData((prev) => ({ ...prev, studentId: newId }));
    } catch (err) {
      console.error(err);
      setFormData((prev) => ({ ...prev, studentId: "STU000001" }));
    }
  };

  useEffect(() => {
    generateStudentId();
  }, []);

  useEffect(() => {
    const fetchDropdowns = async () => {
      const urls = {
        shifts: "http://localhost:5000/api/globalConfiguration/shiftSetup",
        mediums: "http://localhost:5000/api/globalConfiguration/mediumSetup",
        eduLevels: "http://localhost:5000/api/globalConfiguration/educationLevelSetup",
        departments: "http://localhost:5000/api/globalConfiguration/departments",
        classes: "http://localhost:5000/api/globalConfiguration/classSetup",
        sections: "http://localhost:5000/api/globalConfiguration/sectionSetup",
        sessions: "http://localhost:5000/api/globalConfiguration/sessionSetup",
      };

      try {
        const results = await Promise.all(
          Object.values(urls).map((url) =>
            fetch(url)
              .then((res) => res.json())
              .then((json) => json.data || [])
          )
        );

        setShifts(results[0]);
        setMediums(results[1]);
        setEduLevels(results[2]);
        setDepartments(results[3]);
        setClasses(results[4]);
        setSections(results[5]);
        setSessions(results[6]);
      } catch (err) {
        console.error("Dropdown fetch error:", err);
      }
    };

    fetchDropdowns();
  }, []);

  useEffect(() => {
    setFilteredClasses(classes.filter((c) => c.department_id == formData.department));
    setFormData((prev) => ({ ...prev, className: "", section: "", session: "" }));
  }, [formData.department, classes]);

  useEffect(() => {
    setFilteredSections(sections.filter((s) => s.class_id == formData.className));
    setFormData((prev) => ({ ...prev, section: "", session: "" }));
  }, [formData.className, sections]);

  useEffect(() => {
    setFilteredSessions(sessions.filter((s) => s.section_id == formData.section));
    setFormData((prev) => ({ ...prev, session: "" }));
  }, [formData.section, sessions]);

const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;

  // Update the formData normally
  setFormData((prev) => {
    let updated = {
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    };

    // === Automatic Guardian Info ===
    if (name === "isFatherGuardian" && checked) {
      updated.isMotherGuardian = false; // disable mother checkbox
      updated.guardianType = "Father";
      updated.guardianName = prev.fatherName;
      updated.guardianPhone = prev.fatherPhone;
    }

    if (name === "isMotherGuardian" && checked) {
      updated.isFatherGuardian = false; // disable father checkbox
      updated.guardianType = "Mother";
      updated.guardianName = prev.motherName;
      updated.guardianPhone = prev.motherPhone;
    }

    // If unchecked, clear guardian info
    if (name === "isFatherGuardian" && !checked) {
      updated.guardianName = "";
      updated.guardianPhone = "";
    }

    if (name === "isMotherGuardian" && !checked) {
      updated.guardianName = "";
      updated.guardianPhone = "";
    }

    // Update guardian info dynamically if name/phone changes
    if (name === "fatherName" && prev.isFatherGuardian) {
      updated.guardianName = value;
    }
    if (name === "fatherPhone" && prev.isFatherGuardian) {
      updated.guardianPhone = value;
    }
    if (name === "motherName" && prev.isMotherGuardian) {
      updated.guardianName = value;
    }
    if (name === "motherPhone" && prev.isMotherGuardian) {
      updated.guardianPhone = value;
    }

    return updated;
  });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) data.append(key, value);
      });

      const res = await fetch("http://localhost:5000/api/students/add", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (!res.ok) alert("Error: " + result.message);
      else {
        alert(result.message);
        const resetData = Object.keys(formData).reduce((acc, k) => ({ ...acc, [k]: "" }), {});
        setFormData(resetData);
        generateStudentId();
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong. Check console.");
    }
  };

  const safeMap = (arr, renderFn) => (Array.isArray(arr) ? arr.map(renderFn) : null);

  return (
    <div className="main-content">
      <div className="breadcrumb">
        <a href="#">Dashboard</a> <span>›</span> Students Setup <span>›</span> Add Student
      </div>
      

      <form className="student-form" onSubmit={handleSubmit} encType="multipart/form-data">

{/* === PERSONAL INFORMATION === */}
<section className="section">

  <div className="section-header section-header-flex">
    <h3>Personal Information</h3>
    <p className="section-subtitle">Basic details of the student</p>
  </div>

  <div className="form-grid-multi">

    <div className="form-group">
      <label>Student ID</label>
      <input
        type="text"
        name="studentId"
        value={formData.studentId}
        readOnly
        className="form-control readonly"
      />
    </div>

    <div className="form-group">
      <label>Full Name <span className="required">*</span></label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Enter full name"
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
    <label>Full Name (Bangla)  <span className="required">*</span></label>
      <input
        type="text"
        name="fullNameBangla"
        value={formData.fullNameBangla}
        onChange={handleChange}
        placeholder="বাংলায় নাম লিখুন"
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
      <label>Birth Registration No</label>
      <input
        type="text"
        name="birthRegNo"
        value={formData.birthRegNo}
        onChange={handleChange}
        placeholder="Enter birth registration number"
        className="form-control"
      />
    </div>

    <div className="form-group">
        <label>Date of Birth <span className="required">*</span></label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
        <label>Nationality <span className="required">*</span></label>
      
      <input
        type="text"
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
      <label>Country <span className="required">*</span></label>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
      <label>Religion <span className="required">*</span></label>
      <select
        name="religion"
        value={formData.religion}
        onChange={handleChange}
        className="form-control"
        required
      >
        <option value="">Select Religion</option>
        <option>Islam</option>
        <option>Hinduism</option>
        <option>Christianity</option>
        <option>Buddhism</option>
      </select>
    </div>

    <div className="form-group">
      <label>Blood Group <span className="required">*</span></label>
      <select
        name="bloodGroup"
        value={formData.bloodGroup}
        onChange={handleChange}
        className="form-control"
        required
      >
        <option value="">Select Blood Group</option>
        <option>A+</option>
        <option>A-</option>
        <option>B+</option>
        <option>B-</option>
        <option>O+</option>
        <option>O-</option>
        <option>AB+</option>
        <option>AB-</option>
      </select>
    </div>

    <div className="form-group">
      <label>Gender <span className="required">*</span></label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="form-control"
        required
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </div>

    <div className="form-group">
      <label>Marital Status</label>
      <select
        name="maritalStatus"
        value={formData.maritalStatus}
        onChange={handleChange}
        className="form-control"
      >
        <option>Unmarried</option>
        <option>Married</option>
      </select>
    </div>

    <div className="form-group">
      <label>Student Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="student@email.com"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Profile Picture</label>
      <input
        type="file"
        name="profilePic"
        onChange={handleChange}
        className="form-control file-input"
      />
    </div>

    <div className="form-group full-width">
      <label>Study Break Remarks</label>
      <textarea
        name="studyBreak"
        value={formData.studyBreak}
        onChange={handleChange}
        placeholder="If any study break, mention the reason"
        className="form-control textarea"
      />
    </div>

  </div>
</section>


{/* === FAMILY INFORMATION === */}
<section className="section">
  <div className="section-header section-header-flex">
    <h3>Family Information</h3>
    <p className="section-subtitle">
      Family information of each individual student
    </p>
  </div>

  <div className="form-grid-multi">

    {/* ================= Father Information ================= */}
    <div className="form-group">
      <label>Father Name <span className="required">*</span></label>
      <input
        type="text"
        name="fatherName"
        value={formData.fatherName}
        onChange={handleChange}
        placeholder="Father's Name"
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
        <label>Father's Mobile Phone <span className="required">*</span></label>
      
      <input
        type="text"
        name="fatherPhone"
        value={formData.fatherPhone}
        onChange={handleChange}
        placeholder="Father's Mobile Phone"
        className="form-control"
        required
      />
    </div>

    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        id="fatherGuardian"
        name="isFatherGuardian"
        checked={formData.isFatherGuardian}
        onChange={handleChange}
      />
      <label htmlFor="fatherGuardian">Is Father Guardian?</label>
    </div>

    <div className="form-group">
      <label>Father NID</label>
      <input
        type="text"
        name="fatherNID"
        value={formData.fatherNID}
        onChange={handleChange}
        placeholder="Father NID"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Father Passport No</label>
      <input
        type="text"
        name="fatherPassport"
        value={formData.fatherPassport}
        onChange={handleChange}
        placeholder="Father Passport No"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Father Occupation</label>
      <input
        type="text"
        name="fatherOccupation"
        value={formData.fatherOccupation}
        onChange={handleChange}
        placeholder="Father Occupation"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Father Yearly Income</label>
      <input
        type="number"
        name="fatherIncome"
        value={formData.fatherIncome}
        onChange={handleChange}
        placeholder="Father Yearly Income"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Father Image</label>
      <input
        type="file"
        name="fatherImage"
        onChange={handleChange}
        className="form-control file-input"
      />
    </div>

    {/* ================= Mother Information ================= */}
    <div className="form-group">
      <label >Mother Name<span className="required">*</span></label>
      <input
        type="text"
        name="motherName"
        value={formData.motherName}
        onChange={handleChange}
        placeholder="Mother's Name"
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
      <label>Mother's Mobile Phone<span className="required">*</span></label>
      <input
        type="text"
        name="motherPhone"
        value={formData.motherPhone}
        onChange={handleChange}
        placeholder="Mother's Mobile Phone"
        className="form-control"
        required
      />
    </div>

    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        id="motherGuardian"
        name="isMotherGuardian"
        checked={formData.isMotherGuardian}
        onChange={handleChange}
      />
      <label htmlFor="motherGuardian">Is Mother Guardian?</label>
    </div>

    <div className="form-group">
      <label>Mother NID</label>
      <input
        type="text"
        name="motherNID"
        value={formData.motherNID}
        onChange={handleChange}
        placeholder="Mother NID"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Mother Passport No</label>
      <input
        type="text"
        name="motherPassport"
        value={formData.motherPassport}
        onChange={handleChange}
        placeholder="Mother Passport No"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Mother Occupation</label>
      <input
        type="text"
        name="motherOccupation"
        value={formData.motherOccupation}
        onChange={handleChange}
        placeholder="Mother Occupation"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Mother Yearly Income</label>
      <input
        type="number"
        name="motherIncome"
        value={formData.motherIncome}
        onChange={handleChange}
        placeholder="Mother Yearly Income"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Mother Image</label>
      <input
        type="file"
        name="motherImage"
        onChange={handleChange}
        className="form-control file-input"
      />
    </div>

    {/* ================= Guardian Information ================= */}
    <div className="form-group">
      <label>Guardian Type</label>
      <select
        name="guardianType"
        value={formData.guardianType}
        onChange={handleChange}
        className="form-control"
      >
        <option>Father</option>
        <option>Mother</option>
        <option>Other</option>
      </select>
    </div>

    <div className="form-group">
      <label>Guardian Name<span className="required">*</span></label>
      <input
        type="text"
        name="guardianName"
        value={formData.guardianName}
        onChange={handleChange}
        placeholder="Guardian Name"
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
      <label>Guardian Phone No.<span className="required">*</span></label>
      <input
        type="text"
        name="guardianPhone"
        value={formData.guardianPhone}
        onChange={handleChange}
        placeholder="Guardian Mobile Phone"
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
      <label>Guardian Relation</label>
      <input
        type="text"
        name="guardianRelation"
        value={formData.guardianRelation}
        onChange={handleChange}
        placeholder="Guardian Relation"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Guardian Yearly Income</label>
      <input
        type="number"
        name="guardianIncome"
        value={formData.guardianIncome}
        onChange={handleChange}
        placeholder="Guardian Yearly Income"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Guardian Image</label>
      <input
        type="file"
        name="guardianImage"
        onChange={handleChange}
        className="form-control file-input"
      />
    </div>

    {/* ================= Address ================= */}
    <div className="form-group full-width">
      <label>Present Address<span className="required">*</span></label>
      <textarea
        name="presentAddress"
        value={formData.presentAddress}
        onChange={handleChange}
        placeholder="Present Address"
        className="form-control textarea"
        required
      />
    </div>

    <div className="form-group full-width">
      <label>Permanent Address<span className="required">*</span></label>
      <textarea
        name="permanentAddress"
        value={formData.permanentAddress}
        onChange={handleChange}
        placeholder="Permanent Address"
        className="form-control textarea"
        required
      />
    </div>

  </div>
</section>


{/* === ACADEMIC INFORMATION === */}
<section className="section">

  <div className="section-header section-header-flex">
    <h3>Academic Information</h3>
    <p className="section-subtitle">
      Class and academic details of the student
    </p>
  </div>

  <div className="form-grid-multi">

    {/* Shift */}
    <div className="form-group">
      <label>Shift Name<span className="required">*</span></label>
      <select
        name="shift"
        value={formData.shift}
        onChange={handleChange}
        className="form-control"
        required
      >
        <option value="">Select Shift</option>
        {safeMap(shifts, (s) => (
          <option key={s.id} value={s.id}>{s.shift_name}</option>
        ))}
      </select>
    </div>

    {/* Medium */}
    <div className="form-group">
      <label>Medium Name<span className="required">*</span></label>
      <select
        name="medium"
        value={formData.medium}
        onChange={handleChange}
        className="form-control"
        required
      >
        <option value="">Select Medium</option>
        {safeMap(mediums, (m) => (
          <option key={m.id} value={m.id}>{m.medium_name}</option>
        ))}
      </select>
    </div>

    {/* Education Level */}
    <div className="form-group">
      <label>Education Level<span className="required">*</span></label>
      <select
        name="eduLevel"
        value={formData.eduLevel}
        onChange={handleChange}
        className="form-control"
        required
      >
        <option value="">Select Education Level</option>
        {safeMap(eduLevels, (e) => (
          <option key={e.id} value={e.id}>{e.level_name}</option>
        ))}
      </select>
    </div>

    {/* Department */}
    <div className="form-group">
      <label>Department Name<span className="required">*</span></label>
      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        className="form-control"
        required
      >
        <option value="">Select Department</option>
        {safeMap(departments, (d) => (
          <option key={d.id} value={d.id}>{d.department_name}</option>
        ))}
      </select>
    </div>

    {/* Class */}
    <div className="form-group">
      <label>Class Name<span className="required">*</span></label>
      <select
        name="className"
        value={formData.className}
        onChange={handleChange}
        className="form-control"
        required
      >
        <option value="">Select Class</option>
        {safeMap(filteredClasses, (c) => (
          <option key={c.id} value={c.id}>{c.class_name}</option>
        ))}
      </select>
    </div>

    {/* Section */}
    <div className="form-group">
      <label>Section Name<span className="required">*</span></label>
      <select
        name="section"
        value={formData.section}
        onChange={handleChange}
        className="form-control"
        required
      >
        <option value="">Select Section</option>
        {safeMap(filteredSections, (s) => (
          <option key={s.id} value={s.id}>{s.section_name}</option>
        ))}
      </select>
    </div>

    {/* Session */}
    <div className="form-group">
      <label>Session<span className="required">*</span></label>
      <select
        name="session"
        value={formData.session}
        onChange={handleChange}
        className="form-control"
        required
      >
        <option value="">Select Session</option>
        {safeMap(filteredSessions, (s) => (
          <option key={s.id} value={s.id}>{s.session_name}</option>
        ))}
      </select>
    </div>

    {/* Roll */}
    <div className="form-group">
      <label>Roll<span className="required">*</span></label>
      <input
        type="text"
        name="roll"
        value={formData.roll}
        onChange={handleChange}
        placeholder="Enter roll number"
        className="form-control"
        required
      />
    </div>

    {/* Registration No */}
    <div className="form-group">
      <label>Registration Number</label>
      <input
        type="text"
        name="regNo"
        value={formData.regNo}
        onChange={handleChange}
        placeholder="Enter registration number"
        className="form-control"
      />
    </div>

    {/* Attendance ID */}
    <div className="form-group">
      <label>Attendance Machine ID</label>
      <input
        type="text"
        name="attendanceId"
        value={formData.attendanceId}
        onChange={handleChange}
        placeholder="Enter attendance machine ID"
        className="form-control"
      />
    </div>

    {/* Admission Date */}
    <div className="form-group">
      <label>Admission Date</label>
      <input
        type="date"
        name="admissionDate"
        value={formData.admissionDate}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    {/* Student Category */}
    <div className="form-group">
      <label>Student Category</label>
      <select
        name="studentCategory"
        value={formData.studentCategory}
        onChange={handleChange}
        className="form-control"
      >
        <option value="">Select Category</option>
        {safeMap(studentCategories, (cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.category_name}
          </option>
        ))}
      </select>
    </div>

    {/* Old Student Code */}
    <div className="form-group">
      <label>Old Student Code</label>
      <input
        type="text"
        name="oldStudentCode"
        value={formData.oldStudentCode}
        onChange={handleChange}
        placeholder="Enter old student code"
        className="form-control"
      />
    </div>

  </div>
</section>


<section className="section">
  <div className="section-header section-header-flex">
    <h3>Qualification Information</h3>
    <p className="section-subtitle">Detailed academic qualifications of the student</p>
  </div>

  <div className="qualification-table">
    {/* Table Header */}
    <div className="table-row table-header">
      <div>Exam Name</div>
      <div>Group / Division</div>
      <div>Board Roll Number</div>
      <div>GPA</div>
      <div>Total Marks</div>
      <div>GPA (Without 4th)</div>
      <div>Passing Year</div>
      <div>Reg. Number</div>
      <div>Session</div>
      <div>Education Board</div>
    </div>

    {/* PSC Row */}
    <div className="table-row">
      <div>PSC</div>
      <input type="text" name="pscDivision" value={formData.pscDivision} onChange={handleChange} className="table-input" />
      <input type="text" name="pscRoll" value={formData.pscRoll} onChange={handleChange} className="table-input" />
      <input type="text" name="pscGpa" value={formData.pscGpa} onChange={handleChange} className="table-input" />
      <input type="text" name="pscTotal" value={formData.pscTotal} onChange={handleChange} className="table-input" />
      <input type="text" name="pscGpaWithout4th" value={formData.pscGpaWithout4th} onChange={handleChange} className="table-input" />
      <input type="text" name="pscPassingYear" value={formData.pscPassingYear} onChange={handleChange} className="table-input" />
      <input type="text" name="pscRegNo" value={formData.pscRegNo} onChange={handleChange} className="table-input" />
      <input type="text" name="pscSession" value={formData.pscSession} onChange={handleChange} className="table-input" />
      <select name="pscBoard" value={formData.pscBoard} onChange={handleChange} className="table-input">
        <option value="">Select Board</option>
        {safeMap(educationBoards, (b) => <option key={b.id} value={b.id}>{b.board_name}</option>)}
      </select>
    </div>

    {/* JSC Row */}
    <div className="table-row">
      <div>JSC</div>
      <input type="text" name="jscDivision" value={formData.jscDivision} onChange={handleChange} className="table-input" />
      <input type="text" name="jscRoll" value={formData.jscRoll} onChange={handleChange} className="table-input" />
      <input type="text" name="jscGpa" value={formData.jscGpa} onChange={handleChange} className="table-input" />
      <input type="text" name="jscTotal" value={formData.jscTotal} onChange={handleChange} className="table-input" />
      <input type="text" name="jscGpaWithout4th" value={formData.jscGpaWithout4th} onChange={handleChange} className="table-input" />
      <input type="text" name="jscPassingYear" value={formData.jscPassingYear} onChange={handleChange} className="table-input" />
      <input type="text" name="jscRegNo" value={formData.jscRegNo} onChange={handleChange} className="table-input" />
      <input type="text" name="jscSession" value={formData.jscSession} onChange={handleChange} className="table-input" />
      <select name="jscBoard" value={formData.jscBoard} onChange={handleChange} className="table-input">
        <option value="">Select Board</option>
        {safeMap(educationBoards, (b) => <option key={b.id} value={b.id}>{b.board_name}</option>)}
      </select>
    </div>

    {/* SSC Row */}
    <div className="table-row">
      <div>SSC</div>
      <input type="text" name="sscDivision" value={formData.sscDivision} onChange={handleChange} className="table-input" />
      <input type="text" name="sscRoll" value={formData.sscRoll} onChange={handleChange} className="table-input" />
      <input type="text" name="sscGpa" value={formData.sscGpa} onChange={handleChange} className="table-input" />
      <input type="text" name="sscTotal" value={formData.sscTotal} onChange={handleChange} className="table-input" />
      <input type="text" name="sscGpaWithout4th" value={formData.sscGpaWithout4th} onChange={handleChange} className="table-input" />
      <input type="text" name="sscPassingYear" value={formData.sscPassingYear} onChange={handleChange} className="table-input" />
      <input type="text" name="sscRegNo" value={formData.sscRegNo} onChange={handleChange} className="table-input" />
      <input type="text" name="sscSession" value={formData.sscSession} onChange={handleChange} className="table-input" />
      <select name="sscBoard" value={formData.sscBoard} onChange={handleChange} className="table-input">
        <option value="">Select Board</option>
        {safeMap(educationBoards, (b) => <option key={b.id} value={b.id}>{b.board_name}</option>)}
      </select>
    </div>

    {/* HSC Row */}
    <div className="table-row">
      <div>HSC</div>
      <input type="text" name="hscDivision" value={formData.hscDivision} onChange={handleChange} className="table-input" />
      <input type="text" name="hscRoll" value={formData.hscRoll} onChange={handleChange} className="table-input" />
      <input type="text" name="hscGpa" value={formData.hscGpa} onChange={handleChange} className="table-input" />
      <input type="text" name="hscTotal" value={formData.hscTotal} onChange={handleChange} className="table-input" />
      <input type="text" name="hscGpaWithout4th" value={formData.hscGpaWithout4th} onChange={handleChange} className="table-input" />
      <input type="text" name="hscPassingYear" value={formData.hscPassingYear} onChange={handleChange} className="table-input" />
      <input type="text" name="hscRegNo" value={formData.hscRegNo} onChange={handleChange} className="table-input" />
      <input type="text" name="hscSession" value={formData.hscSession} onChange={handleChange} className="table-input" />
      <select name="hscBoard" value={formData.hscBoard} onChange={handleChange} className="table-input">
        <option value="">Select Board</option>
        {safeMap(educationBoards, (b) => <option key={b.id} value={b.id}>{b.board_name}</option>)}
      </select>
    </div>
  </div>
</section>



    {/* === HOSTEL INFORMATION === */}
<section className="section-wrapper">
  <div className="section-header">
    <h3>Hostel Information</h3>
    <p className="section-subtitle">
      Details about student's hostel allotment
    </p>
  </div>

  <div className="form-grid-multi">
    <div className="form-group">
      <label htmlFor="hostel">Hostel Name</label>
      <input
        type="text"
        id="hostel"
        name="hostel"
        value={formData.hostel}
        onChange={handleChange}
        placeholder="Enter hostel name"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label htmlFor="hostelRoom">Room / Bed Number</label>
      <input
        type="text"
        id="hostelRoom"
        name="hostelRoom"
        value={formData.hostelRoom}
        onChange={handleChange}
        placeholder="Enter room or bed number"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label htmlFor="allotmentDate">Allotment Date</label>
      <input
        type="date"
        id="allotmentDate"
        name="allotmentDate"
        value={formData.allotmentDate}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label htmlFor="hostelType">Hostel Type</label>
      <select
        id="hostelType"
        name="hostelType"
        value={formData.hostelType}
        onChange={handleChange}
        className="form-control"
      >
        <option value="">Select Type</option>
        <option value="boys">Boys</option>
        <option value="girls">Girls</option>
        <option value="staff">Staff</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="hostelFee">Hostel Fee</label>
      <input
        type="number"
        id="hostelFee"
        name="hostelFee"
        value={formData.hostelFee}
        onChange={handleChange}
        placeholder="Enter hostel fee"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label htmlFor="paymentStatus">Payment Status</label>
      <select
        id="paymentStatus"
        name="paymentStatus"
        value={formData.paymentStatus}
        onChange={handleChange}
        className="form-control"
      >
        <option value="">Select Status</option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="partial">Partial</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="guardianPermission">Guardian Permission</label>
      <select
        id="guardianPermission"
        name="guardianPermission"
        value={formData.guardianPermission}
        onChange={handleChange}
        className="form-control"
      >
        <option value="">Select</option>
        <option value="granted">Granted</option>
        <option value="notGranted">Not Granted</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="emergencyContact">Emergency Contact</label>
      <input
        type="text"
        id="emergencyContact"
        name="emergencyContact"
        value={formData.emergencyContact}
        onChange={handleChange}
        placeholder="Enter guardian/emergency contact number"
        className="form-control"
      />
    </div>
  </div>
</section>


{/* === TRANSPORT INFORMATION === */}
<section className="section-wrapper">
  <div className="section-header">
    <h3>Transport Information</h3>
    <p className="section-subtitle">
      Details about student's transport arrangements
    </p>
  </div>

  <div className="form-grid-multi">
    <div className="form-group">
      <label htmlFor="busNo">Bus / Route Number</label>
      <input
        type="text"
        id="busNo"
        name="busNo"
        value={formData.busNo}
        onChange={handleChange}
        placeholder="Enter bus or route number"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label htmlFor="roadNo">Road / Stop Number</label>
      <input
        type="text"
        id="roadNo"
        name="roadNo"
        value={formData.roadNo}
        onChange={handleChange}
        placeholder="Enter road or stop number"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label htmlFor="pickupPoint">Pickup Point</label>
      <input
        type="text"
        id="pickupPoint"
        name="pickupPoint"
        value={formData.pickupPoint}
        onChange={handleChange}
        placeholder="Enter pickup point"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label htmlFor="dropPoint">Drop Point</label>
      <input
        type="text"
        id="dropPoint"
        name="dropPoint"
        value={formData.dropPoint}
        onChange={handleChange}
        placeholder="Enter drop point"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label htmlFor="transportType">Transport Type</label>
      <select
        id="transportType"
        name="transportType"
        value={formData.transportType}
        onChange={handleChange}
        className="form-control"
      >
        <option value="">Select Transport Type</option>
        <option value="bus">Bus</option>
        <option value="van">Van</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="driverName">Driver Name</label>
      <input
        type="text"
        id="driverName"
        name="driverName"
        value={formData.driverName}
        onChange={handleChange}
        placeholder="Enter driver name"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label htmlFor="driverContact">Driver Contact</label>
      <input
        type="text"
        id="driverContact"
        name="driverContact"
        value={formData.driverContact}
        onChange={handleChange}
        placeholder="Enter driver contact number"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label htmlFor="transportFee">Transport Fee</label>
      <input
        type="number"
        id="transportFee"
        name="transportFee"
        value={formData.transportFee}
        onChange={handleChange}
        placeholder="Enter transport fee"
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label htmlFor="transportPaymentStatus">Payment Status</label>
      <select
        id="transportPaymentStatus"
        name="transportPaymentStatus"
        value={formData.transportPaymentStatus}
        onChange={handleChange}
        className="form-control"
      >
        <option value="">Select Payment Status</option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="partial">Partial</option>
      </select>
    </div>
  </div>
</section>


        <button type="submit" className="submit-btn">Save Student</button>
      </form>
    </div>
  );
};

export default AddSingleStudent;
