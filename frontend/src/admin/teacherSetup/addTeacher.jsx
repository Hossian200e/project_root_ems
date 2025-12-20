import React, { useState } from "react";
import "../../assets/styles/admin/teacherSetup/addTeacher.css";

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    eduLevel: "",
    department: "",
    fullNameEn: "",
    fullNameBn: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    religion: "",
    bloodGroup: "",
    nationalId: "",
    birthPlace: "",
    responsibility: "",
    designation: "",
    joiningDate: "",
    batchId: "",
    indexNo: "",
    teacherPicture: null,
    presentAddress: "",
    permanentAddress: "",
    contactPhone: "",
    mobileNo: "",
    email: "",
    bcsBatch: "",
    degreeName: "",
    divisionGPA: "",
    obtainYear: "",
    boardUniversity: "",
    otherDegreeName: "",
    otherDivisionGPA: "",
    otherObtainYear: "",
    otherBoardUniversity: "",
    resume: null,
    employeeType: "Teacher",
    instituteName: "",
    position: "",
    experienceYear: "",
    officeAddress: "",
    attendanceId: "",
    timeSchedule: "",
    ordering: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="add-teacher-container">
      <h2>Add Teacher/Employee</h2>
      <form className="add-teacher-form" onSubmit={handleSubmit}>

        {/* Personal Information */}
        <fieldset>
          <legend>Personal Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Edu. Level</label>
              <select name="eduLevel" value={formData.eduLevel} onChange={handleChange}>
                <option value="">Select Edu. Level</option>
                <option value="Higher Secondary">Higher Secondary</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>
            <div className="form-group">
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleChange}>
                <option value="">Select Department</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Full Name (English)</label>
              <input type="text" name="fullNameEn" value={formData.fullNameEn} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Full Name (Bangla)</label>
              <input type="text" name="fullNameBn" value={formData.fullNameBn} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Father/Husband Name</label>
              <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Mother Name</label>
              <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Religion</label>
              <select name="religion" value={formData.religion} onChange={handleChange}>
                <option value="">Select Religion</option>
                <option value="Islam">Islam</option>
                <option value="Hindu">Hindu</option>
                <option value="Christian">Christian</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Blood Group</label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>National ID</label>
              <input type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Birth Place</label>
              <input type="text" name="birthPlace" value={formData.birthPlace} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Country</label>
              <input type="text" value="BANGLADESH" disabled />
            </div>
            <div className="form-group">
              <label>Nationality</label>
              <input type="text" value="Bangladeshi" disabled />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Responsibility</label>
              <input type="text" name="responsibility" value={formData.responsibility} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Joining Date</label>
              <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Batch ID/ID</label>
              <input type="text" name="batchId" value={formData.batchId} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Index No</label>
              <input type="text" name="indexNo" value={formData.indexNo} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Teacher/Employee Picture</label>
              <input type="file" name="teacherPicture" accept="image/*" onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        {/* Contact Information */}
        <fieldset>
          <legend>Contact Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Present Address</label>
              <input type="text" name="presentAddress" value={formData.presentAddress} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Permanent Address</label>
              <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Mobile No</label>
              <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>BCS Batch No</label>
              <input type="text" name="bcsBatch" value={formData.bcsBatch} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        {/* Other Degree Information */}
        <fieldset>
          <legend>Educational Information (Other Degree)</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Degree Name</label>
              <input type="text" name="otherDegreeName" value={formData.otherDegreeName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Division/GPA</label>
              <input type="text" name="otherDivisionGPA" value={formData.otherDivisionGPA} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Obtain Year</label>
              <input type="text" name="otherObtainYear" value={formData.otherObtainYear} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Board/University</label>
              <input type="text" name="otherBoardUniversity" value={formData.otherBoardUniversity} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        {/* Experience Information */}
        <fieldset>
          <legend>Experience Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Resume Upload (PDF Only)</label>
              <input type="file" name="resume" accept=".pdf" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Employee Type</label>
              <select name="employeeType" value={formData.employeeType} onChange={handleChange}>
                <option value="Teacher">Teacher</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Institute/Company Name</label>
              <input type="text" name="instituteName" value={formData.instituteName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input type="text" name="position" value={formData.position} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Year of Experience</label>
              <input type="number" name="experienceYear" value={formData.experienceYear} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Office Address</label>
              <input type="text" name="officeAddress" value={formData.officeAddress} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        {/* Time Schedule & Ordering */}
        <fieldset>
          <legend>Time Schedule & Ordering</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Attendance Identifier</label>
              <input type="text" name="attendanceId" value={formData.attendanceId} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Time Schedule</label>
              <input type="text" name="timeSchedule" value={formData.timeSchedule} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Ordering</label>
              <input type="number" name="ordering" value={formData.ordering} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-btn">Add Teacher/Employee</button>
      </form>
    </div>
  );
};

export default AddTeacher;
