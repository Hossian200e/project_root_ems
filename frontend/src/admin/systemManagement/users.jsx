import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "../../assets/styles/admin/systemManagement/users.css";

// Sample user groups
const userGroups = ["Admin", "Teacher", "Student", "Guest"];

// Sample initial users
const initialUsers = [
  { id: 1, group: "Admin", username: "superman", name: "Super Admin", email: "demo@gmail.com", mobile: "01700000001", status: "Active" },
  { id: 2, group: "Admin", username: "admin", name: "Admin", email: "admin@email.com", mobile: "01700000002", status: "Active" },
  { id: 3, group: "Teacher", username: "admission_admin", name: "Admission Admin", email: "info@admission.com", mobile: "01700000003", status: "Active" },
  { id: 1, group: "Admin", username: "superman", name: "Super Admin", email: "demo@gmail.com", mobile: "01700000001", status: "Active" },
  { id: 2, group: "Admin", username: "admin", name: "Admin", email: "admin@email.com", mobile: "01700000002", status: "Active" },
  { id: 3, group: "Teacher", username: "admission_admin", name: "Admission Admin", email: "info@admission.com", mobile: "01700000003", status: "Active" },
];

export default function UserList() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [newUser, setNewUser] = useState({
    group: "",
    username: "",
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: "Active"
  });

  // Filtered users
  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, totalUsers);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Add new user
  const handleSaveNewUser = () => {
    const { group, username, name, password, confirmPassword } = newUser;
    if (!group || !username || !name || !password || !confirmPassword) {
      alert("Please fill all mandatory fields (*)!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, { ...newUser, id: newId }]);
    setNewUser({
      group: "",
      username: "",
      name: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      status: "Active"
    });
    setShowAddModal(false);
  };

  // Edit user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditMode(true);
  };

  const handleSaveEditUser = () => {
    setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
    setSelectedUser(null);
    setEditMode(false);
  };

  // View user
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setEditMode(false);
  };

  // Delete user
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="user-list-container">
      {/* Breadcrumb & Header */}
      <div className="user-list-header">
        <div className="header-top">
          <h2>User Lists</h2>
          <button className="btn-add" onClick={() => setShowAddModal(true)}>+ New User</button>
        </div>
      </div>

      {/* Top controls */}
      <div className="top-controls">
        <div className="entries-control">
          <label>Show:</label>
          <select value={entries} onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span>entries per page</span>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
        </div>
      </div>

      {/* User table */}
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Group</th>
              <th>Username</th>
              <th>Name En</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{startIndex + index + 1}</td>
                <td>{user.group}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email || "-"}</td>
                <td>{user.mobile || "-"}</td>
                <td><span className={`status-badge ${user.status === "Active" ? "active" : "inactive"}`}>{user.status}</span></td>
                <td className="action-buttons">
                  <button className="btn-icon view" onClick={() => handleViewUser(user)}><FaEye /></button>
                  <button className="btn-icon edit" onClick={() => handleEditUser(user)}><FaEdit /></button>
                  <button className="btn-icon delete" onClick={() => handleDeleteUser(user.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-wrapper">
        <span>Showing {startIndex + 1} to {endIndex} of {totalUsers} entries</span>
        <div className="pagination-buttons">
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>«</button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>‹</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
          <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>»</button>
        </div>
      </div>

      {/* Add New User Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add New User</h3>
            <div className="edit-layout">
              <label>User Group <span className="mandatory">*</span></label>
              <select value={newUser.group} onChange={(e) => setNewUser({ ...newUser, group: e.target.value })}>
                <option value="">Select Group</option>
                {userGroups.map((g, i) => <option key={i} value={g}>{g}</option>)}
              </select>

              <label>Username <span className="mandatory">*</span></label>
              <input type="text" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />

              <label>Name En <span className="mandatory">*</span></label>
              <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />

              <label>Mobile Number</label>
              <input type="text" value={newUser.mobile} onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })} />

              <label>Email</label>
              <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />

              <label>Password <span className="mandatory">*</span></label>
              <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />

              <label>Confirm Password <span className="mandatory">*</span></label>
              <input type="password" value={newUser.confirmPassword} onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })} />

              <label>Status</label>
              <select value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn save" onClick={handleSaveNewUser}>Add User</button>
            </div>
          </div>
        </div>
      )}

{/* View / Edit Modal */}
{selectedUser && (
  <div className="modal-overlay">
    <div className="modal-box view-modal" style={{ width: "500px" }}>
      <h3>{editMode ? "Edit User" : "View User"}</h3>

      {editMode ? (
        <div className="edit-layout">
          <label>User Group <span className="mandatory">*</span></label>
          <select value={selectedUser.group} onChange={(e) => setSelectedUser({ ...selectedUser, group: e.target.value })}>
            {userGroups.map((g, i) => <option key={i} value={g}>{g}</option>)}
          </select>

          <label>Username <span className="mandatory">*</span></label>
          <input type="text" value={selectedUser.username} onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} />

          <label>Name En <span className="mandatory">*</span></label>
          <input type="text" value={selectedUser.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />

          <label>Mobile Number</label>
          <input type="text" value={selectedUser.mobile} onChange={(e) => setSelectedUser({ ...selectedUser, mobile: e.target.value })} />

          <label>Email</label>
          <input type="email" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />

          <label>Status</label>
          <select value={selectedUser.status} onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: 500, padding: "8px", width: "35%", borderBottom: "1px solid #eee" }}>User Group:</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{selectedUser.group}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 500, padding: "8px", borderBottom: "1px solid #eee" }}>Username:</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{selectedUser.username}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 500, padding: "8px", borderBottom: "1px solid #eee" }}>Name En:</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{selectedUser.name}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 500, padding: "8px", borderBottom: "1px solid #eee" }}>Email:</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{selectedUser.email || "-"}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 500, padding: "8px", borderBottom: "1px solid #eee" }}>Mobile:</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{selectedUser.mobile || "-"}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 500, padding: "8px" }}>Status:</td>
              <td style={{ padding: "8px" }}>{selectedUser.status}</td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="modal-actions" style={{ marginTop: "15px" }}>
        <button className="btn cancel" onClick={() => setSelectedUser(null)}>Close</button>
        {editMode && <button className="btn save" onClick={handleSaveEditUser}>Save Changes</button>}
      </div>
    </div>
  </div>
)}


    </div>
  );
}
