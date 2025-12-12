import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";   // <-- added icons
import "../../assets/styles/admin/systemManagement/task.css";

const initialMenus = [
  {
    id: 1,
    name: "Dashboard",
    controller: "Dashboard",
    method: "index",
    children: 0,
    status: "Active",
  },
  {
    id: 2,
    name: "System Management",
    controller: "index",
    method: "2",
    children: 2,
    status: "Active",
  },
  {
    id: 3,
    name: "User Management",
    controller: "UserGroups",
    method: "index",
    children: 4,
    status: "Inactive",
  },
  {
    id: 4,
    name: "Logout",
    controller: "Dashboard",
    method: "logout",
    children: 0,
    status: "Active",
  },
];

export default function MenuBuilder() {
  const [menus, setMenus] = useState(initialMenus);

  return (
    <div className="menu-builder-container">
      <div className="header">
        <h2>Menu Builder - Hierarchical Structure</h2>
        <button className="btn-add">+ Add Menu</button>
      </div>

      <p className="subtitle">
        Build and manage your menu structure with parent-child relationships
      </p>

      <div className="table-wrapper">
        <table className="menu-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Menu Name</th>
              <th>Controller</th>
              <th>Method</th>
              <th>Children</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {menus.map((menu, index) => (
              <tr key={menu.id}>
                <td>{index + 1}</td>

                <td>{menu.name}</td>
                <td>{menu.controller}</td>
                <td>{menu.method}</td>

                <td>
                  <span className="child-badge">{menu.children}</span>
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      menu.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    {menu.status}
                  </span>
                </td>

                <td className="action-buttons">
                  <button className="btn icon-btn view"><FaEye /></button>
                  <button className="btn icon-btn edit"><FaEdit /></button>
                  <button className="btn icon-btn delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
