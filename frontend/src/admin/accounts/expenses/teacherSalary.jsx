import React, { useState } from "react";
import "../../../assets/styles/admin/accounts/expenses/teacherSalary.css";

const initialTeachers = [
  { id: 1, name: "Md. Nazrul Islam", designation: "Assistant Teacher", monthlyAmount: 30000 },
  { id: 2, name: "Marufa", designation: "Assistant Teacher", monthlyAmount: 28000 },
  { id: 3, name: "Sazia Laizu", designation: "Assistant Teacher", monthlyAmount: 28000 },
  { id: 4, name: "Kaniz Fatema", designation: "Assistant Teacher", monthlyAmount: 28000 },
  { id: 5, name: "Muhammad Liaqat Ali", designation: "Assistant Teacher", monthlyAmount: 28000 },
  // ... add more teachers up to 166
];

const bonusOptions = ["Performance Bonus", "Festival Bonus", "Other Bonus"];

const TeacherSalary = () => {
  const [teachers, setTeachers] = useState(
    initialTeachers.map((t) => ({ ...t, bonusPurpose: "", bonus: 0, fine: 0 }))
  );
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setTeachers(teachers.map((t) => ({ ...t, selected: !selectAll })));
  };

  const handleTeacherChange = (id, field, value) => {
    setTeachers(
      teachers.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const calculateTotal = (teacher) => {
    return teacher.monthlyAmount + Number(teacher.bonus || 0) - Number(teacher.fine || 0);
  };

  const handleSave = () => {
    // Here you can send the data to backend or console log
    console.log("Saved Teacher Salary Data:", teachers);
    alert("Teacher salary data saved successfully!");
  };

  return (
    <div className="teacher-salary-page">
      <h2>Teacher Salary</h2>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              Select All
            </th>
            <th>SL</th>
            <th>Teacher Name</th>
            <th>Designation</th>
            <th>Monthly Amount</th>
            <th>TWD</th>
            <th>TPD</th>
            <th>TAD</th>
            <th>TLD</th>
            <th>THD</th>
            <th>Fine</th>
            <th>Bonus Purpose</th>
            <th>Bonus</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={teacher.id}>
              <td>
                <input
                  type="checkbox"
                  checked={teacher.selected || false}
                  onChange={(e) =>
                    handleTeacherChange(teacher.id, "selected", e.target.checked)
                  }
                />
              </td>
              <td>{index + 1}</td>
              <td>{teacher.name}</td>
              <td>{teacher.designation}</td>
              <td>{teacher.monthlyAmount}</td>
              <td><input type="number" placeholder="TWD" /></td>
              <td><input type="number" placeholder="TPD" /></td>
              <td><input type="number" placeholder="TAD" /></td>
              <td><input type="number" placeholder="TLD" /></td>
              <td><input type="number" placeholder="THD" /></td>
              <td>
                <input
                  type="number"
                  value={teacher.fine}
                  onChange={(e) => handleTeacherChange(teacher.id, "fine", e.target.value)}
                />
              </td>
              <td>
                <select
                  value={teacher.bonusPurpose}
                  onChange={(e) =>
                    handleTeacherChange(teacher.id, "bonusPurpose", e.target.value)
                  }
                >
                  <option value="">Select Bonus Purpose</option>
                  {bonusOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={teacher.bonus}
                  onChange={(e) => handleTeacherChange(teacher.id, "bonus", e.target.value)}
                />
              </td>
              <td>{calculateTotal(teacher)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>

      <div className="footnotes">
        <p><strong>Foot Note:</strong> TWD: Total Working Day, TPD: Total Present Day, TAD: Total Absent Day, TLD: Total Leave Day, THD: Total Half Day</p>
      </div>
    </div>
  );
};

export default TeacherSalary;
