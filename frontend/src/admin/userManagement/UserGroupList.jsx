import React, { useState } from "react";
import "../../assets/styles/admin/userManagement/UserGroupList.css";

const initialGroups = [
  { id: 1, name: "Admin", users: 3, status: "Active" },
  { id: 2, name: "Teacher", users: 18, status: "Active" },
  { id: 3, name: "Student", users: 320, status: "Active" },
  { id: 4, name: "Guest", users: 12, status: "Inactive" },
];

export default function UserGroupList() {
  const [groups] = useState(initialGroups);

  return (
    <div className="user-group-page">
      <div className="user-group-header">
        <h2>User Group Management</h2>
        <button className="btn-add">+ Add Group</button>
      </div>

      <div className="table-wrapper">
        <table className="user-group-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Group Name</th>
              <th>Total Users</th>
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
                  <button className="btn view">View</button>
                  <button className="btn edit">Edit</button>
                  <button className="btn delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
