import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaEye,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/paymentGatewayCharge.css";

/* ---------------- Initial Data ---------------- */
const initialCharges = [
  {
    id: 1,
    gateway: "Bkash",
    apiConfig: "Bkash Payment Gateway",
    extraChargeRate: "1.5",
    minChargeAmount: "10",
    softbdChargeRate: "0.5",
    softbdChargeTrack: "No",
    isFixedCharge: "No",
    chargeAmount: "1.5",
    status: true,
  },
  {
    id: 2,
    gateway: "DBBL",
    apiConfig: "DBBL Payment Gateway",
    extraChargeRate: "2",
    minChargeAmount: "20",
    softbdChargeRate: "0.8",
    softbdChargeTrack: "Yes",
    isFixedCharge: "Yes",
    chargeAmount: "25",
    status: true,
  },
];

const emptyForm = {
  gateway: "",
  apiConfig: "",
  extraChargeRate: "",
  minChargeAmount: "",
  softbdChargeRate: "",
  softbdChargeTrack: "No",
  isFixedCharge: "No",
  chargeAmount: "0",
  status: true,
};

const PaymentGatewayCharge = () => {
  const [charges, setCharges] = useState(initialCharges);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loadingId, setLoadingId] = useState(null); // ⬅ for 5 sec delay

  const isView = modalType === "view";

  /* ---------------- Auto Calculate Charge ---------------- */
  useEffect(() => {
    if (formData.isFixedCharge === "No" && formData.extraChargeRate) {
      setFormData((prev) => ({
        ...prev,
        chargeAmount: prev.extraChargeRate,
      }));
    }
  }, [formData.extraChargeRate, formData.isFixedCharge]);

  /* ---------------- Toggle Status with 5 sec delay ---------------- */
  const toggleStatus = (id) => {
    setLoadingId(id);

    setTimeout(() => {
      setCharges((prev) =>
        prev.map((c) => {
          if (c.id === id) {
            const newStatus = !c.status;

            alert(
              `Gateway "${c.gateway}" has been ${
                newStatus ? "Activated" : "Deactivated"
              } successfully`
            );

            return { ...c, status: newStatus };
          }
          return c;
        })
      );

      setLoadingId(null);
    }, 5000); // ⏱ 5 seconds
  };

  /* ---------------- Modal Open ---------------- */
  const openAddModal = () => {
    setModalType("add");
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openViewModal = (item) => {
    setModalType("view");
    setSelectedItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setModalType("edit");
    setSelectedItem(item);
    setFormData(item);
    setShowModal(true);
  };

  /* ---------------- Form Change ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ---------------- Save ---------------- */
  const handleSave = () => {
    if (!formData.gateway || !formData.apiConfig || !formData.extraChargeRate) {
      alert("Please fill all required fields");
      return;
    }

    if (modalType === "add") {
      setCharges([...charges, { ...formData, id: Date.now() }]);
    } else {
      setCharges(
        charges.map((c) =>
          c.id === selectedItem.id ? { ...formData } : c
        )
      );
    }
    setShowModal(false);
  };

  return (
    <div className="main-content">
              <div className="breadcrumb">
        <a href="#">Dashboard</a> › Payment Gateway Charge
      </div>

      {/* Header */}
      <div className="page-header">
        <h2>Gateway Charge Config List</h2>
        <button className="btn primary" onClick={openAddModal}>
          <FaPlus /> Add Gateway Charge
        </button>
      </div>

      {/* Table */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Sl</th>
            <th>Gateway</th>
            <th>Payment Api Config</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {charges.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.gateway}</td>
              <td>{item.apiConfig}</td>
              <td>
                <button
                  className={`btn-icon ${item.status ? "active" : "inactive"}`}
                  disabled={loadingId === item.id}
                  onClick={() => toggleStatus(item.id)}
                >
                  {loadingId === item.id
                    ? "..."
                    : item.status
                    ? <FaToggleOn />
                    : <FaToggleOff />}
                </button>
              </td>
              <td>
                <button className="btn-icon view" onClick={() => openViewModal(item)}>
                  <FaEye />
                </button>
                <button className="btn-icon edit" onClick={() => openEditModal(item)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------------- Modal ---------------- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Gateway Charge Config</h3>
            <FaTimes className="close-btn" onClick={() => setShowModal(false)} />

            <label>Gateway *</label>
            <select disabled={isView} name="gateway" value={formData.gateway} onChange={handleChange}>
              <option value="">Select One</option>
              <option value="Bkash">Bkash</option>
              <option value="DBBL">DBBL</option>
            </select>

            <label>Status</label>
            <select disabled={isView} name="status" value={formData.status} onChange={handleChange}>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>

            <label>Payment Api Config *</label>
            <select disabled={isView} name="apiConfig" value={formData.apiConfig} onChange={handleChange}>
              <option value="">Select One</option>
              <option value="Bkash Payment Gateway">Bkash Payment Gateway</option>
              <option value="DBBL Payment Gateway">DBBL Payment Gateway</option>
            </select>

            <label>Extra Charge Rate *</label>
            <input disabled={isView} type="number" name="extraChargeRate" value={formData.extraChargeRate} onChange={handleChange} />

            <label>Minimum Charge Amount (TK)</label>
            <input disabled={isView} type="number" name="minChargeAmount" value={formData.minChargeAmount} onChange={handleChange} />

            <label>SoftBD Charge Rate</label>
            <input disabled={isView} type="number" name="softbdChargeRate" value={formData.softbdChargeRate} onChange={handleChange} />

            <label>SoftBD Charge Track</label>
            <select disabled={isView} name="softbdChargeTrack" value={formData.softbdChargeTrack} onChange={handleChange}>
              <option value="No">NO</option>
              <option value="Yes">YES</option>
            </select>

            <label>Is Fixed Charge?</label>
            <select disabled={isView} name="isFixedCharge" value={formData.isFixedCharge} onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>

            {formData.isFixedCharge === "Yes" && (
              <>
                <label>Charge Amount</label>
                <input disabled={isView} type="number" name="chargeAmount" value={formData.chargeAmount} onChange={handleChange} />
              </>
            )}

            {!isView && (
              <div className="modal-actions">
                <button className="btn cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn save" onClick={handleSave}>Save</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGatewayCharge;
