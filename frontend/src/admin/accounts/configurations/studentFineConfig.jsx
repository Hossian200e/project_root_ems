import React, { useState } from "react";
import "../../../assets/styles/admin/accounts/configurations/studentFineConfig.css";

const fineTypes = [
  { id: "latePayment", label: "Late Payment Fine", defaultRate: [{ days: 10, amount: 100 }] },
  { id: "absence", label: "Absence Fine", defaultRate: [{ days: 0, amount: 20 }] },
  { id: "exam", label: "Exam Fine", defaultRate: [{ days: 0, amount: 50 }] },
  { id: "library", label: "Library Fine", defaultRate: [{ days: 0, amount: 30 }] },
];

const StudentFineConfigurations = () => {
  const initialFines = fineTypes.reduce((acc, fine) => {
    acc[fine.id] = {
      enabled: "Yes",
      startDate: "",
      rates: [...fine.defaultRate],
      feeHead: "",
      remarks: "",
      showDetails: false,
    };
    return acc;
  }, {});

  const [fines, setFines] = useState(initialFines);

  // Toggle more details section
  const toggleDetails = (id) => {
    setFines({ ...fines, [id]: { ...fines[id], showDetails: !fines[id].showDetails } });
  };

  // Update fine field
  const updateFineField = (id, field, value) => {
    setFines({ ...fines, [id]: { ...fines[id], [field]: value } });
  };

  // Add new rate row
  const addRateRow = (id) => {
    const newRates = [...fines[id].rates, { days: 0, amount: 0 }];
    setFines({ ...fines, [id]: { ...fines[id], rates: newRates } });
  };

  // Update rate values
  const updateRate = (id, index, field, value) => {
    const newRates = [...fines[id].rates];
    newRates[index][field] = value;
    setFines({ ...fines, [id]: { ...fines[id], rates: newRates } });
  };

  // Save configuration
  const handleSave = () => {
    console.log("Saved Fines:", fines);
    alert("Student Fine Configuration Saved Successfully!");
  };

  return (
    <div className="student-fine-page">
      <div className="breadcrumb">Dashboard / Student Fine Configurations</div>
      <h2>Student Fine Configurations</h2>

      {fineTypes.map((fine) => (
        <div key={fine.id} className="fine-section">
          <h3>{fine.label}</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Yes"
                checked={fines[fine.id].enabled === "Yes"}
                onChange={(e) => updateFineField(fine.id, "enabled", e.target.value)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                checked={fines[fine.id].enabled === "No"}
                onChange={(e) => updateFineField(fine.id, "enabled", e.target.value)}
              />
              No
            </label>
          </div>

          <div className="input-group">
            <label>{fine.label} Start From</label>
            <input
              type="date"
              value={fines[fine.id].startDate}
              onChange={(e) => updateFineField(fine.id, "startDate", e.target.value)}
            />
          </div>

          {/* Only Late Payment Fine / Exam Fine can have fee head */}
          {["latePayment", "exam"].includes(fine.id) && (
            <div className="input-group">
              <label>Fee Head</label>
              <select
                value={fines[fine.id].feeHead}
                onChange={(e) => updateFineField(fine.id, "feeHead", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Tuition">Tuition</option>
                <option value="Exam">Exam</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {/* Fine Rate Table */}
          <div className="late-fine-table">
            <h4>{fine.label} Rate</h4>
            <table>
              <thead>
                <tr>
                  <th>Late Days (Greater than)</th>
                  <th>Fee Amount</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {fines[fine.id].rates.map((rate, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="number"
                        value={rate.days}
                        onChange={(e) =>
                          updateRate(fine.id, index, "days", Number(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={rate.amount}
                        onChange={(e) =>
                          updateRate(fine.id, index, "amount", Number(e.target.value))
                        }
                      />
                    </td>
                    <td>{index + 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-btn" onClick={() => addRateRow(fine.id)}>
              + Add More
            </button>
          </div>

          {/* More Details Section */}
          <button
            className="more-details-btn"
            onClick={() => toggleDetails(fine.id)}
          >
            {fines[fine.id].showDetails ? "Hide Details" : "More Details"}
          </button>
          {fines[fine.id].showDetails && (
            <div className="more-details-section">
              <div className="input-group">
                <label>Remarks / Notes</label>
                <textarea
                  value={fines[fine.id].remarks}
                  onChange={(e) =>
                    updateFineField(fine.id, "remarks", e.target.value)
                  }
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Save Button */}
      <div className="form-actions">
        <button className="save-btn" onClick={handleSave}>
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default StudentFineConfigurations;
