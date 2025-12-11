import React, { useState } from "react";
import "../../assets/styles/admin/userManagement/UserRoleGroupManagement.css";

const initialRoles = [
  { 
    id: 1, 
    role: "Student", 
    permissions: ["View Result", "Payment"], 
    createdBy: "Admin", 
    createdAt: "2025-12-11 10:00", 
    editedBy: "Admin",
    updatedAt: "2025-12-11 10:00"
  },
  { 
    id: 2, 
    role: "Teacher", 
    permissions: ["Mark Input", "View Student"], 
    createdBy: "Admin", 
    createdAt: "2025-12-11 10:05", 
    editedBy: "Admin",
    updatedAt: "2025-12-11 10:05"
  },
];

const predefinedRoles = ["Student", "Teacher", "Admin", "Accountant", "Staff"];

const allPermissions = ["View Result", "Payment", "Mark Input", "View Student", "Manage Classes"];

export default function UserRoleGroupManagement() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRole, setNewRole] = useState({ role: "", permissions: [], createdBy: "Admin", editedBy: "Admin" });

  // View Role
  const handleView = (role) => {
    setSelectedRole(role);
    setEditMode(false);
  };

  // Edit Role
  const handleEdit = (role) => {
    setSelectedRole(role);
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    const updatedRoles = roles.map(r => 
      r.id === selectedRole.id ? { ...selectedRole, updatedAt: new Date().toLocaleString() } : r
    );
    setRoles(updatedRoles);
    setSelectedRole(null);
  };

  // Add Role
  const handleAddRole = () => {
    setNewRole({ role: "", permissions: [], createdBy: "Admin", editedBy: "Admin" });
    setShowAddModal(true);
  };

  const handleSaveNewRole = () => {
    const newId = roles.length ? Math.max(...roles.map(r => r.id)) + 1 : 1;
    const newRoleData = { 
      ...newRole, 
      id: newId, 
      createdAt: new Date().toLocaleString(), 
      updatedAt: new Date().toLocaleString() 
    };
    setRoles([...roles, newRoleData]);
    setShowAddModal(false);
  };

  // Toggle permission
  const togglePermission = (perm, roleData, setRoleData) => {
    if (roleData.permissions.includes(perm)) {
      setRoleData({ ...roleData, permissions: roleData.permissions.filter(p => p !== perm) });
    } else {
      setRoleData({ ...roleData, permissions: [...roleData.permissions, perm] });
    }
  };

  return (
    <div className="role-permission-page">
      <div className="header">
        <div className="breadcrumb">
        <a href="#">Dashboard</a> <span>›</span>
        User Role & Group Management
        </div>
        <button className="btn-add" onClick={handleAddRole}>+ Add Role</button>
      </div>

      {/* Role Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Group Name</th>
              <th>Created By</th>
              <th>Created Time</th>
              <th>Updated By</th>
              <th>Updated Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={role.id}>
                <td>{index + 1}</td>
                <td>{role.role}</td>
                <td>{role.createdBy}</td>
                <td>{role.createdAt}</td>
                <td>{role.editedBy}</td>
                <td>{role.updatedAt}</td>
                <td>
                  <button className="btn view" onClick={() => handleView(role)}>View</button>
                  <button className="btn edit" onClick={() => handleEdit(role)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View / Edit Modal */}
      {selectedRole && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{editMode ? "Edit Role & Permissions" : "Role Details"}</h3>

            {/* View Mode */}
            {!editMode && (
              <div className="view-table-layout">
                <table>
                  <tbody>
                    <tr>
                      <th>Group Name</th>
                      <td>{selectedRole.role}</td>
                    </tr>
                    <tr>
                      <th>Permissions</th>
                      <td>{selectedRole.permissions.join(", ")}</td>
                    </tr>
                    <tr>
                      <th>Created By</th>
                      <td>{selectedRole.createdBy}</td>
                    </tr>
                    <tr>
                      <th>Created Time</th>
                      <td>{selectedRole.createdAt}</td>
                    </tr>
                    <tr>
                      <th>Updated By</th>
                      <td>{selectedRole.editedBy}</td>
                    </tr>
                    <tr>
                      <th>Updated Time</th>
                      <td>{selectedRole.updatedAt}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Edit Mode */}
            {editMode && (
              <div className="edit-layout">
                <label>Group Name</label>
                <input  value={selectedRole.role}  />

                <label>Permissions</label>
                <div className="permissions-list">
                  {allPermissions.map((perm) => (
                    <label key={perm}>
                      <input
                        type="checkbox"
                        checked={selectedRole.permissions.includes(perm)}
                        onChange={() => togglePermission(perm, selectedRole, setSelectedRole)}
                      />
                      {perm}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button className="btn cancel" onClick={() => setSelectedRole(null)}>Close</button>
              {editMode && <button className="btn save" onClick={handleSaveEdit}>Save Changes</button>}
            </div>
          </div>
        </div>
      )}

      {/* Add Role Modal */}

{showAddModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Add New Role</h3>
      <div className="edit-layout">
        <label>Group Name</label>
        <select
          value={newRole.role}
          onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
        >
          <option value="">Select Role</option>
          {predefinedRoles
            .filter(roleName => !roles.some(r => r.role === roleName)) // filter already added roles
            .map(roleName => (
              <option key={roleName} value={roleName}>{roleName}</option>
            ))
          }
        </select>

        <label>Permissions</label>
        <div className="permissions-list">
          {allPermissions.map((perm) => (
            <label key={perm}>
              <input
                type="checkbox"
                checked={newRole.permissions.includes(perm)}
                onChange={() => togglePermission(perm, newRole, setNewRole)}
              />
              {perm}
            </label>
          ))}
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn cancel" onClick={() => setShowAddModal(false)}>Close</button>
        <button
          className="btn save"
          onClick={handleSaveNewRole}
          disabled={!newRole.role} // disable save if no role selected
        >
          Add Role
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
