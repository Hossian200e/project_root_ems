import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaToggleOn, FaToggleOff, FaPlus } from "react-icons/fa";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/paymentGatewayAPI.css";

const initialAPIs = [
  {
    id: 1,
    title: "Bkash Payment Gateway",
    code: "Bkash",
    mode: "Production",
    logo: null,
    status: true,
    enableForAccounts: true,
    production: { appKey: "", appSecret: "", username: "", password: "" },
    sandbox: { appKey: "", appSecret: "", username: "", password: "" },
  },
  {
    id: 2,
    title: "Nagad Payment Gateway",
    code: "Nagad",
    mode: "Production",
    logo: null,
    status: true,
    enableForAccounts: false,
    production: { appAccount: "", merchantId: "", merchantPrivateKey: "", pgPublicKey: "" },
    sandbox: { appAccount: "", merchantId: "", merchantPrivateKey: "", pgPublicKey: "" },
  },
];

const codeOptions = [
  "Bkash",
  "Rupali Cash",
  "DBBL",
  "Nagad",
  "Ekpay",
  "Sonali Pay",
  "Upay",
  "Paystation",
  "Cellfin",
  "Tap",
  "SSL Wireless",
];

const modeOptions = ["Sandbox", "Production"];

// Mapping API codes to fields to display
const apiFieldsMap = {
  "Bkash": {
    production: ["App Key", "App Secret", "Username", "Password"],
    sandbox: ["App Key", "App Secret", "Username", "Password"],
  },
  "Rupali Cash": {
    production: ["Username (Merchant Wallet No.)", "Password (API Key)"],
    sandbox: ["Username (Merchant Wallet No.)", "Password (API Key)"],
  },
  "DBBL": {
    production: ["Mode", "Username", "Password", "Client IP", "Select Payment Options"],
    sandbox: ["Mode", "Username", "Password", "ClientIP", "Select Payment Options"],
  },
  "Nagad": {
    production: ["AppAccount", "MerchantId", "MerchantPrivateKey", "PGPublicKey"],
    sandbox: ["AppAccount", "MerchantId", "MerchantPrivateKey", "PGPublicKey"],
  },
  "Ekpay": {
    production: ["MerchantId", "MerchantRegKey", "MacAddress"],
    sandbox: ["MerchantId", "MerchantRegKey", "MacAddress"],
  },
  "Sonali Pay": {
    production: ["Username", "Password", "AuthKey"],
    sandbox: ["Username", "Password", "AuthKey"],
  },
  "Upay": {
    production: ["MerchantId", "MerchantKey", "MerchantName", "MerchantCode", "MerchantCity", "MerchantPhone"],
    sandbox: ["MerchantId", "MerchantKey", "MerchantName", "MerchantCode", "MerchantCity", "MerchantPhone"],
  },
  "Paystation": {
    production: ["Username", "Password"],
    sandbox: ["Username", "Password"],
  },
  "Cellfin": {
    production: ["MerchantId", "Password"],
    sandbox: ["MerchantId", "Password"],
  },
  "Tap": {
    production: [],
    sandbox: [],
  },
  "SSL Wireless": {
    production: ["StoreID", "StorePassword"],
    sandbox:  ["StoreID", "StorePassword"],
  },
};

const PaymentGatewayAPI = () => {
  const [apis, setApis] = useState(initialAPIs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState(initialAPIs);

  const [modalMode, setModalMode] = useState(null); // "view", "edit", "add"
  const [selectedAPI, setSelectedAPI] = useState(null);
  const [newAPI, setNewAPI] = useState({
    title: "",
    code: "",
    mode: "",
    logo: null,
    status: true,
    enableForAccounts: false,
    production: {},
    sandbox: {},
  });

  // Filtering APIs
  useEffect(() => {
    if (!searchTerm) setFiltered(apis);
    else {
      const lower = searchTerm.toLowerCase();
      setFiltered(
        apis.filter(
          (api) =>
            api.title.toLowerCase().includes(lower) ||
            api.code?.toLowerCase().includes(lower) ||
            api.mode.toLowerCase().includes(lower)
        )
      );
    }
  }, [searchTerm, apis]);

  const toggleStatus = (id) => {
    const api = apis.find((a) => a.id === id);
    if (!window.confirm(`Turn ${api.status ? "OFF" : "ON"} status for ${api.title}?`)) return;
    setApis((prev) => prev.map((a) => (a.id === id ? { ...a, updating: true } : a)));
    setTimeout(() => {
      setApis((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: !a.status, updating: false } : a
        )
      );
    }, 5000);
  };

  const toggleEnableForAccounts = (id) => {
    const api = apis.find((a) => a.id === id);
    if (!window.confirm(`Turn ${api.enableForAccounts ? "OFF" : "ON"} Enable For Accounts Payment for ${api.title}?`)) return;
    setApis((prev) => prev.map((a) => (a.id === id ? { ...a, updating: true } : a)));
    setTimeout(() => {
      setApis((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, enableForAccounts: !a.enableForAccounts, updating: false } : a
        )
      );
    }, 5000);
  };

  const handleView = (api) => {
    setSelectedAPI(api);
    setModalMode("view");
  };

  const handleEdit = (api) => {
    setSelectedAPI(api);
    setModalMode("edit");
  };

  const handleAdd = () => {
    setNewAPI({
      title: "",
      code: "",
      mode: "",
      logo: null,
      status: true,
      enableForAccounts: false,
      production: {},
      sandbox: {},
    });
    setModalMode("add");
  };

  const saveEdit = () => {
    if (!selectedAPI.code || !selectedAPI.mode) {
      alert("Code and API Mode are mandatory fields.");
      return;
    }
    setApis((prev) => prev.map((api) => (api.id === selectedAPI.id ? selectedAPI : api)));
    setModalMode(null);
    setSelectedAPI(null);
  };

  const saveNew = () => {
    if (!newAPI.code || !newAPI.mode) {
      alert("Code and API Mode are mandatory fields.");
      return;
    }
    const id = apis.length ? Math.max(...apis.map((a) => a.id)) + 1 : 1;
    setApis([...apis, { ...newAPI, id }]);
    setModalMode(null);
    alert(`${newAPI.title} added successfully!`);
  };

  const handleFileChange = (e, setAPI, key = "logo") => {
    const file = e.target.files[0];
    setAPI((prev) => ({ ...prev, [key]: file }));
  };

const renderCredentialFields = (api, setAPI) => {
  if (!api?.code) return null;
  const fields = apiFieldsMap[api.code];
  if (!fields) return null;

  const renderInputs = (section) =>
    fields[section]?.map((field) => (
      <div key={field}>
        <label>
          {field.replace(/([A-Z])/g, " $1")} <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          value={api[section][field] || ""}
          required
          onChange={(e) =>
            setAPI({
              ...api,
              [section]: { ...api[section], [field]: e.target.value },
            })
          }
          placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
        />
      </div>
    ));

  return (
    <>
      <h4>Production Credentials</h4>
      {renderInputs("production")}
      <h4>Sandbox Credentials</h4>
      {renderInputs("sandbox")}
    </>
  );
};

  const renderModalForm = (api, setAPI) => (
    <>
      <label>Title <span style={{ color: "red" }}>*</span></label>
      <input type="text" value={api.title} onChange={(e) => setAPI({ ...api, title: e.target.value })} placeholder="Title" />

      <label>Code <span style={{ color: "red" }}>*</span></label>
      <select value={api.code} onChange={(e) => setAPI({ ...api, code: e.target.value })}>
        <option value="">Select</option>
        {codeOptions.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <label>API Mode <span style={{ color: "red" }}>*</span></label>
      <select value={api.mode} onChange={(e) => setAPI({ ...api, mode: e.target.value })}>
        <option value="">Select Api Mode</option>
        {modeOptions.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>

      <label>Logo</label>
      <input type="file" onChange={(e) => handleFileChange(e, setAPI)} />

      <label>Status</label>
      <select value={api.status} onChange={(e) => setAPI({ ...api, status: e.target.value === "true" })}>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>

      <label>Enable For Accounts Payment</label>
      <select value={api.enableForAccounts} onChange={(e) => setAPI({ ...api, enableForAccounts: e.target.value === "true" })}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      {renderCredentialFields(api, setAPI)}
    </>
  );

  return (
    <div className="main-content">
      <div className="breadcrumb">
        <a href="#">Dashboard</a> › Other Payment API Config List
      </div>

      <div className="page-header">
        <h2>Other Payment API Config List</h2>
        <button className="btn primary" onClick={handleAdd}>
          <FaPlus /> New Other Payment API Config
        </button>
      </div>

      <div className="action-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Title</th>
              <th>API Mode</th>
              <th>Status</th>
              <th>Enable For Accounts Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((api, idx) => (
                <tr key={api.id}>
                  <td>{idx + 1}</td>
                  <td>{api.title}</td>
                  <td>{api.mode}</td>
                  <td>
                    <button
                      className={`btn-icon ${api.status ? "active" : "inactive"}`}
                      onClick={() => toggleStatus(api.id)}
                      disabled={api.updating}
                    >
                      {api.updating ? "..." : api.status ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`btn-icon ${api.enableForAccounts ? "active" : "inactive"}`}
                      onClick={() => toggleEnableForAccounts(api.id)}
                      disabled={api.updating}
                    >
                      {api.updating ? "..." : api.enableForAccounts ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                  </td>
                  <td>
                    <button className="btn-icon view" onClick={() => handleView(api)}>
                      <FaEye />
                    </button>
                    <button className="btn-icon edit" onClick={() => handleEdit(api)}>
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No APIs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Showing {filtered.length} of {apis.length} entries
      </div>

      {/* MODAL */}
      {modalMode && (
        <div className="modal-overlay">
          <div className="modal-box">
            {modalMode === "view" && selectedAPI && (
              <>
                <h3>View API</h3>
                <p><strong>Title:</strong> {selectedAPI.title}</p>
                <p><strong>Code:</strong> {selectedAPI.code}</p>
                <p><strong>API Mode:</strong> {selectedAPI.mode}</p>
                <p><strong>Status:</strong> {selectedAPI.status ? "Active" : "Inactive"}</p>
                <p><strong>Enable For Accounts Payment:</strong> {selectedAPI.enableForAccounts ? "Yes" : "No"}</p>

                {renderCredentialFields(selectedAPI, setSelectedAPI)}

                <button className="btn cancel" onClick={() => setModalMode(null)}>Close</button>
              </>
            )}

            {modalMode === "edit" && selectedAPI && (
              <>
                <h3>Edit API</h3>
                {renderModalForm(selectedAPI, setSelectedAPI)}
                <button className="btn cancel" onClick={() => setModalMode(null)}>Cancel</button>
                <button className="btn save" onClick={saveEdit}>Save Changes</button>
              </>
            )}

            {modalMode === "add" && (
              <>
                <h3>Add New API</h3>
                {renderModalForm(newAPI, setNewAPI)}
                <button className="btn cancel" onClick={() => setModalMode(null)}>Cancel</button>
                <button className="btn save" onClick={saveNew}>Add API</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGatewayAPI;
