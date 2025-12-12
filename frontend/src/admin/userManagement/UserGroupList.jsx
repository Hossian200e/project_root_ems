import React, { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import "../../assets/styles/admin/userManagement/UserGroupList.css";

const initialGroups = [
  { id: 1, name: "Admin", users: 3, ordering: 1, status: "Active", createdBy: "System", editedBy: "Admin", description: "Full system admin" },
  { id: 2, name: "Teacher", users: 18, ordering: 2, status: "Active", createdBy: "Admin", editedBy: "Admin", description: "Teacher panel" },
  { id: 3, name: "Student", users: 320, ordering: 3, status: "Active", createdBy: "Admin", editedBy: "Admin", description: "Student panel" },
  { id: 4, name: "Guest", users: 12, ordering: 4, status: "Inactive", createdBy: "Teacher", editedBy: "Admin", description: "Limited guest access" },
];

export default function UserGroupList() {
  const [groups, setGroups] = useState(initialGroups);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    users: 0,
    ordering: groups.length + 1,
    status: "Active",
    description: "",
    createdBy: "Admin",
    editedBy: "Admin",
  });

  // VIEW
  const handleView = (group) => {
    setSelectedGroup(group);
    setEditMode(false);
  };

  // EDIT
  const handleEdit = (group) => {
    setSelectedGroup(group);
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    setGroups((prev) =>
      prev.map((g) => (g.id === selectedGroup.id ? selectedGroup : g))
    );
    setSelectedGroup(null);
  };

  // ADD
  const handleAddGroup = () => {
    setNewGroup({
      name: "",
      users: 0,
      ordering: groups.length + 1,
      status: "Active",
      description: "",
      createdBy: "Admin",
      editedBy: "Admin",
    });
    setShowAddModal(true);
  };

  const handleSaveNewGroup = () => {
    const newId = groups.length ? Math.max(...groups.map((g) => g.id)) + 1 : 1;
    setGroups([...groups, { ...newGroup, id: newId }]);
    setShowAddModal(false);
  };

  return (
    <div className="user-group-page">
      <div className="user-group-header">
        <div className="breadcrumb">
          <a href="#">Dashboard</a> <span>›</span> User Management
        </div>
        <button className="btn-add" onClick={handleAddGroup}>
          + Add Group
        </button>
      </div>

      <div className="table-wrapper">
        <table className="user-group-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Group Name</th>
              <th>Total Users</th>
              <th>Ordering</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr key={group.id}>
                <td>{index + 1}</td>
                <td className="group-name">{group.name}</td>
                <td>{group.users}</td>
                <td>{group.ordering}</td>
                <td>
                  <span
                    className={`status ${
                      group.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    {group.status}
                  </span>
                </td>
                <td className="actions">

                  {/* FIXED BUTTONS */}
                  <button
                    className="btn-icon view"
                    onClick={() => handleView(group)}
                  >
                    <FaEye />
                  </button>

                  <button
                    className="btn-icon edit"
                    onClick={() => handleEdit(group)}
                  >
                    <FaEdit />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW / EDIT MODAL */}
      {selectedGroup && (
        <div className="modal-overlay">
          <div className="modal-box view-modal">
            <h3>{editMode ? "Edit Group" : "Group Details"}</h3>

            {/* VIEW MODE */}
            {!editMode && (
              <div className="view-layout">
                <div className="view-row">
                  <strong>Group Name:</strong> <span>{selectedGroup.name}</span>
                </div>
                <div className="view-row">
                  <strong>Total Users:</strong>{" "}
                  <span>{selectedGroup.users}</span>
                </div>
                <div className="view-row">
                  <strong>Ordering:</strong>{" "}
                  <span>{selectedGroup.ordering}</span>
                </div>
                <div className="view-row">
                  <strong>Status:</strong> <span>{selectedGroup.status}</span>
                </div>
                <div className="view-row">
                  <strong>Description:</strong>{" "}
                  <span>{selectedGroup.description}</span>
                </div>
                <div className="view-row">
                  <strong>Created By:</strong>{" "}
                  <span>{selectedGroup.createdBy}</span>
                </div>
                <div className="view-row">
                  <strong>Edited By:</strong>{" "}
                  <span>{selectedGroup.editedBy}</span>
                </div>
              </div>
            )}

            {/* EDIT MODE */}
            {editMode && (
              <div className="edit-layout">
                <label>Group Name</label>
                <input
                  type="text"
                  value={selectedGroup.name}
                  onChange={(e) =>
                    setSelectedGroup({
                      ...selectedGroup,
                      name: e.target.value,
                    })
                  }
                />

                <label>Ordering</label>
                <input
                  type="number"
                  value={selectedGroup.ordering}
                  onChange={(e) =>
                    setSelectedGroup({
                      ...selectedGroup,
                      ordering: parseInt(e.target.value),
                    })
                  }
                />

                <label>Description</label>
                <textarea
                  value={selectedGroup.description}
                  onChange={(e) =>
                    setSelectedGroup({
                      ...selectedGroup,
                      description: e.target.value,
                    })
                  }
                />

                <label>Status</label>
                <select
                  value={selectedGroup.status}
                  onChange={(e) =>
                    setSelectedGroup({
                      ...selectedGroup,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            )}

            <div className="modal-actions">
              <button className="btn cancel" onClick={() => setSelectedGroup(null)}>
                Close
              </button>
              {editMode && (
                <button className="btn save" onClick={handleSaveEdit}>
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ADD GROUP MODAL */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add New Group</h3>
            <div className="edit-layout">
              <label>Group Name</label>
              <input
                type="text"
                value={newGroup.name}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, name: e.target.value })
                }
              />

              <label>Ordering</label>
              <input
                type="number"
                value={newGroup.ordering}
                onChange={(e) =>
                  setNewGroup({
                    ...newGroup,
                    ordering: parseInt(e.target.value),
                  })
                }
              />

              <label>Description</label>
              <textarea
                value={newGroup.description}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, description: e.target.value })
                }
              />

              <label>Status</label>
              <select
                value={newGroup.status}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn cancel" onClick={() => setShowAddModal(false)}>
                Close
              </button>
              <button className="btn save" onClick={handleSaveNewGroup}>
                Add Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
