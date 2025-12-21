import React, { useState } from "react";
import "../../../assets/styles/admin/accounts/configurations/invoiceConfiguration.css";

const InvoiceConfiguration = () => {
  const [invoiceConfigs, setInvoiceConfigs] = useState([
    {
      id: 1,
      copyName: "Student Copy",
      description: "",
      notes: "",
      signatories: ["Student's Sign", "Office's Sign", "Bank's Sign"],
    },
    {
      id: 2,
      copyName: "Bank Copy",
      description: "",
      notes: "",
      signatories: ["Student's Sign", "Office's Sign", "Bank's Sign"],
    },
    {
      id: 3,
      copyName: "Office Copy",
      description: "",
      notes: "",
      signatories: ["Student's Sign", "Office's Sign", "Bank's Sign"],
    },
    {
      id: 4,
      copyName: "Dept. Copy",
      description: "",
      notes: "",
      signatories: ["Student's Sign", "Office's Sign", "Bank's Sign"],
    },
  ]);

  // Add new signatory
  const handleAddSignatory = (id) => {
    setInvoiceConfigs((prev) =>
      prev.map((config) =>
        config.id === id
          ? { ...config, signatories: [...config.signatories, ""] }
          : config
      )
    );
  };

  // Remove signatory
  const handleRemoveSignatory = (id, index) => {
    setInvoiceConfigs((prev) =>
      prev.map((config) =>
        config.id === id
          ? {
              ...config,
              signatories: config.signatories.filter((_, i) => i !== index),
            }
          : config
      )
    );
  };

  // Update signatory value
  const handleSignatoryChange = (id, index, value) => {
    setInvoiceConfigs((prev) =>
      prev.map((config) =>
        config.id === id
          ? {
              ...config,
              signatories: config.signatories.map((s, i) =>
                i === index ? value : s
              ),
            }
          : config
      )
    );
  };

  // Update other fields
  const handleFieldChange = (id, field, value) => {
    setInvoiceConfigs((prev) =>
      prev.map((config) =>
        config.id === id ? { ...config, [field]: value } : config
      )
    );
  };

  // Add new invoice copy row
  const handleAddCopy = () => {
    const newId = Math.max(...invoiceConfigs.map((c) => c.id)) + 1;
    const newCopy = {
      id: newId,
      copyName: "",
      description: "",
      notes: "",
      signatories: ["Student's Sign", "Office's Sign", "Bank's Sign"],
    };
    setInvoiceConfigs([...invoiceConfigs, newCopy]);
  };

  const handleSave = () => {
    console.log("Saved Configurations:", invoiceConfigs);
    alert("Configurations saved! Check console.");
  };

  return (
    <div className="invoice-config-page">
      <div className="breadcrumb">
        Dashboard / Accounts / Invoice Configuration
      </div>

      <div className="page-header">
        <h2>Account Invoice Configs</h2>
      </div>

      <div className="invoice-config-table">
        {invoiceConfigs.map((config) => (
          <div key={config.id} className="invoice-row">
            {/* Copy Name */}
            <div className="copy-name">
              <input
                type="text"
                placeholder="Invoice Copy Name"
                value={config.copyName}
                onChange={(e) =>
                  handleFieldChange(config.id, "copyName", e.target.value)
                }
              />
            </div>

            {/* Description */}
            <div className="description">
              <input
                type="text"
                placeholder="Description"
                value={config.description}
                onChange={(e) =>
                  handleFieldChange(config.id, "description", e.target.value)
                }
              />
            </div>

            {/* Notes */}
            <div className="notes">
              <input
                type="text"
                placeholder="Notes"
                value={config.notes}
                onChange={(e) =>
                  handleFieldChange(config.id, "notes", e.target.value)
                }
              />
            </div>

            {/* Signatories */}
            <div className="signatories">
              {config.signatories.map((sign, idx) => (
                <div key={idx} className="signatory-field">
                  <input
                    type="text"
                    value={sign}
                    onChange={(e) =>
                      handleSignatoryChange(config.id, idx, e.target.value)
                    }
                  />
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveSignatory(config.id, idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                className="add-btn"
                onClick={() => handleAddSignatory(config.id)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="save-btn-container">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="add-copy-btn" onClick={handleAddCopy}>
          Add More Copy
        </button>
      </div>
    </div>
  );
};

export default InvoiceConfiguration;
