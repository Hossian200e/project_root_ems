import React, { useEffect, useState } from "react";
import "../../assets/styles/admin/dashboard/AdminDashboard.css";
import { FaUserGraduate, FaChalkboardTeacher, FaFileAlt, FaCalendarCheck, FaUsers } from "react-icons/fa";
import { GiCheckMark, GiCancel, GiAlarmClock, GiExitDoor } from "react-icons/gi"; // Icons for attendance

export default function Dashboard() {
  const [counts, setCounts] = useState({
    activeStudents: 0,
    activeTeachers: 0,
    tcRequests: 0,
    studentAttendance: { present: 0, absent: 0, late: 0, leave: 0 },
    teacherAttendance: { present: 0, absent: 0, late: 0, leave: 0 },
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/counts")
      .then((res) => res.json())
      .then((data) => setCounts(data))
      .catch((err) => console.error("Error fetching counts:", err));
  }, []);

  const cardsData = [
    {
      title: "Total Students",
      value: counts.activeStudents,
      description: "Overall  students",
      icon: <FaUserGraduate size={28} color="#4e73df" />,
    },
    {
      title: "Total Teachers",
      value: counts.activeTeachers,
      description: "Overall  teachers",
      icon: <FaChalkboardTeacher size={28} color="#1cc88a" />,
    },
    {
      title: "TC Requests",
      value: counts.tcRequests,
      description: "Pending TC requests",
      icon: <FaFileAlt size={28} color="#36b9cc" />,
    },
  ];

  return (
    <main className="main-content">
      <div className="breadcrumb">Dashboard</div>

      <section className="cards">
        {cardsData.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <h3>{card.title}</h3>
              <div className="card-icon">{card.icon}</div>
            </div>
            <p className="number">{card.value}</p>
            <hr className="card-divider" />
            <small className="card-description">{card.description}</small>
          </div>
        ))}

        {/* ===== Student Attendance ===== */}
        <div className="card">
          <div className="card-header">
            <h3>Student Attendance</h3>
            <div className="card-icon">
              <FaCalendarCheck size={28} color="#f6c23e" />
            </div>
          </div>

          <div className="attendance-counts-column">
            <p className="present"><GiCheckMark /> Present: {counts.studentAttendance.present}</p>
            <p className="absent"><GiCancel /> Absent: {counts.studentAttendance.absent}</p>
            <p className="late"><GiAlarmClock /> Late: {counts.studentAttendance.late}</p>
            <p className="leave"><GiExitDoor /> Leave: {counts.studentAttendance.leave}</p>
          </div>

          <hr className="card-divider" />
          <small className="card-description">Overall student attendance report</small>
        </div>

        {/* ===== Teacher Attendance ===== */}
        <div className="card">
          <div className="card-header">
            <h3>Teacher Attendance</h3>
            <div className="card-icon">
              <FaUsers size={28} color="#e74a3b" />
            </div>
          </div>

          <div className="attendance-counts-column">
            <p className="present"><GiCheckMark /> Present: {counts.teacherAttendance.present}</p>
            <p className="absent"><GiCancel /> Absent: {counts.teacherAttendance.absent}</p>
            <p className="late"><GiAlarmClock /> Late: {counts.teacherAttendance.late}</p>
            <p className="leave"><GiExitDoor /> Leave: {counts.teacherAttendance.leave}</p>
          </div>

          <hr className="card-divider" />
          <small className="card-description">Overall teacher attendance report</small>
        </div>
      </section>
    </main>
  );
}
