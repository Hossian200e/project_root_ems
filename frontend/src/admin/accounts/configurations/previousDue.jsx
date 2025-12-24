import React, { useState } from "react";
import "../../../assets/styles/admin/accounts/configurations/previousDue.css";

const PreviousDue = () => {
  const [searchId, setSearchId] = useState("");
  const [searchRoll, setSearchRoll] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [newDue, setNewDue] = useState({
    head: "",
    month: "",
    amount: "",
  });

  const [students, setStudents] = useState([
    {
      id: "S001",
      roll: "01",
      name: "Md. Sojibul Islam",
      transactions: [
        {
          head: "Tuition Fee",
          month: "January 2025",
          due: 500,
          waiver: 50,
          payable: 450,
          remarks: "Late Payment",
        },
        {
          head: "Exam Fee",
          month: "February 2025",
          due: 300,
          waiver: 0,
          payable: 300,
          remarks: "",
        },
      ],
    },
    {
      id: "S002",
      roll: "02",
      name: "Jane Smith",
      transactions: [
        {
          head: "Tuition Fee",
          month: "January 2025",
          due: 400,
          waiver: 0,
          payable: 400,
          remarks: "",
        },
      ],
    },
    {
      id: "S003",
      roll: "03",
      name: "Michael Brown",
      transactions: [
        {
          head: "Exam Fee",
          month: "March 2025",
          due: 200,
          waiver: 0,
          payable: 200,
          remarks: "",
        },
      ],
    },
  ]);

  // Filter students by any field that has value
  const handleSearch = () => {
    const filtered = students.filter((student) => {
      const matchId = searchId
        ? student.id.toLowerCase().includes(searchId.toLowerCase())
        : true;
      const matchRoll = searchRoll
        ? student.roll.toLowerCase().includes(searchRoll.toLowerCase())
        : true;
      const matchName = searchName
        ? student.name.toLowerCase().includes(searchName.toLowerCase())
        : true;
      return matchId && matchRoll && matchName;
    });
    setFilteredStudents(filtered);
  };

  const openAddDueModal = (student) => {
    setSelectedStudent(student);
    setNewDue({ head: "", month: "", amount: "" });
    setModalOpen(true);
  };

  const handleAddDue = () => {
    if (!newDue.head || !newDue.month || !newDue.amount) {
      alert("Please fill all fields");
      return;
    }

    const updatedStudents = students.map((stu) => {
      if (stu.id === selectedStudent.id) {
        return {
          ...stu,
          transactions: [
            ...stu.transactions,
            {
              head: newDue.head,
              month: newDue.month,
              due: parseFloat(newDue.amount),
              waiver: 0,
              payable: parseFloat(newDue.amount),
              remarks: "",
            },
          ],
        };
      }
      return stu;
    });

    setStudents(updatedStudents);

    // Re-apply search after adding new due
    const filtered = updatedStudents.filter((student) => {
      const matchId = searchId
        ? student.id.toLowerCase().includes(searchId.toLowerCase())
        : true;
      const matchRoll = searchRoll
        ? student.roll.toLowerCase().includes(searchRoll.toLowerCase())
        : true;
      const matchName = searchName
        ? student.name.toLowerCase().includes(searchName.toLowerCase())
        : true;
      return matchId && matchRoll && matchName;
    });
    setFilteredStudents(filtered);
    setModalOpen(false);
  };

  return (
    <div className="previous-due-page">
      <div className="breadcrumb">Dashboard / Dues / Student Due List</div>
      <h2>Student Previous Dues</h2>

      {/* Search Boxes */}
      <div className="search-boxes">
        <div className="search-box">
          <label>Search by Student ID</label>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="search-box">
          <label>Search by Roll</label>
          <input
            type="text"
            placeholder="Enter Roll"
            value={searchRoll}
            onChange={(e) => setSearchRoll(e.target.value)}
          />
        </div>
        <div className="search-box">
          <label>Search by Name</label>
          <input
            type="text"
            placeholder="Enter Student Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="search-button">
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* Students Table */}
      {filteredStudents.length > 0 ? (
        filteredStudents.map((student) => (
          <div key={student.id} className="student-due-card">
            <h3>{student.name}</h3>
            <table className="due-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Roll</th>
                  <th>Name</th>
                  <th>#</th>
                  <th>Transaction Due Head</th>
                  <th>Month</th>
                  <th>Due Amount</th>
                  <th>Waiver</th>
                  <th>Payable Amount</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {student.transactions.map((tran, index) => (
                  <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.roll}</td>
                    <td>{student.name}</td>
                    <td>{index + 1}</td>
                    <td>{tran.head}</td>
                    <td>{tran.month}</td>
                    <td>{tran.due.toFixed(2)}</td>
                    <td>{tran.waiver.toFixed(2)}</td>
                    <td>{tran.payable.toFixed(2)}</td>
                    <td>{tran.remarks}</td>
                    <td>
                      <button className="pay-btn">Pay</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="add-due-btn"
              onClick={() => openAddDueModal(student)}
            >
              Add Due
            </button>
          </div>
        ))
      ) : (
        <div className="no-data">No students found. Please search above.</div>
      )}

      {/* Add Due Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Dues</h3>
              <button className="close-btn" onClick={() => setModalOpen(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <label>Select Due Transaction Head</label>
                <select
                  value={newDue.head}
                  onChange={(e) =>
                    setNewDue({ ...newDue, head: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Tuition Fees (Due)">Tuition Fees (Due)</option>
                  <option value="Exam Fees (Due)">Exam Fees (Due)</option>
                  <option value="Other Fees">Other Fees</option>
                </select>
              </div>
              <div className="input-group">
                <label>Year & Month</label>
                <input
                  type="month"
                  value={newDue.month}
                  onChange={(e) =>
                    setNewDue({ ...newDue, month: e.target.value })
                  }
                />
              </div>
              <div className="input-group">
                <label>Amount</label>
                <input
                  type="number"
                  value={newDue.amount}
                  onChange={(e) =>
                    setNewDue({ ...newDue, amount: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="save-btn" onClick={handleAddDue}>
                Save
              </button>
              <button className="close-btn" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviousDue;
