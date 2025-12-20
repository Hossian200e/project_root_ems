import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../../assets/styles/admin/studentSetup/studentCategories.css";

const StudentCategories = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    title: "",
    categoryCode: "",
    status: "Active",
  });

  // Filter categories based on search
  const filteredCategories = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(search.toLowerCase()) ||
      cat.categoryCode.toLowerCase().includes(search.toLowerCase())
  );

  // Open modal for edit
  const handleEdit = (cat) => {
    setEditCategory(cat);
    setNewCategory(cat);
    setShowModal(true);
  };

  // Save new or edited category
  const handleSaveCategory = () => {
    if (editCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editCategory.id ? { ...cat, ...newCategory } : cat
        )
      );
    } else {
      const nextId = categories.length + 1;
      setCategories([...categories, { id: nextId, ...newCategory }]);
    }
    setNewCategory({ title: "", categoryCode: "", status: "Active" });
    setEditCategory(null);
    setShowModal(false);
  };

  // Delete category
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div className="student-categories">
      <div className="header">
        <h2>Student Categories</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="controls">
        <div className="entries">
          <label>
            Show
            <select>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </label>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Category Code</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  No data available in table
                </td>
              </tr>
            ) : (
              filteredCategories.map((cat, index) => (
                <tr key={cat.id}>
                  <td>{index + 1}</td>
                  <td>{cat.title}</td>
                  <td>{cat.categoryCode}</td>
                  <td>
                    <span
                      className={`status ${
                        cat.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className="actions">
                    <FaEdit className="edit" onClick={() => handleEdit(cat)} />
                    <FaTrash
                      className="delete"
                      onClick={() => handleDelete(cat.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>
          Showing {filteredCategories.length} of {categories.length} entries
        </span>
        <div className="pages">
          <button disabled>«</button>
          <button disabled>‹</button>
          <button className="active">1</button>
          <button>›</button>
          <button>»</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editCategory ? "Edit Category" : "Add New Category"}</h3>
            <div className="modal-body">
              <label>
                Title:
                <input
                  type="text"
                  value={newCategory.title}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, title: e.target.value })
                  }
                />
              </label>
              <label>
                Category Code:
                <input
                  type="text"
                  value={newCategory.categoryCode}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      categoryCode: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Status:
                <select
                  value={newCategory.status}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>
            <div className="modal-footer">
              <button onClick={handleSaveCategory}>
                {editCategory ? "Update" : "Save"}
              </button>
              <button
                className="close-btn"
                onClick={() => {
                  setShowModal(false);
                  setEditCategory(null);
                  setNewCategory({ title: "", categoryCode: "", status: "Active" });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCategories;
