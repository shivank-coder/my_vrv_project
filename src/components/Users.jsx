import React, { useState } from "react";
import { users as initialUsers } from "../data";

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [editUserId, setEditUserId] = useState(null);
  const [newUserData, setNewUserData] = useState({ name: "", role: "", status: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleAddUser = () => {
    if (!newUserData.name || !newUserData.role || !newUserData.status) {
      alert("Please fill in all fields.");
      return;
    }
    setUsers([...users, { ...newUserData, id: Date.now() }]);
    setNewUserData({ name: "", role: "", status: "" });
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setNewUserData(user);
  };

  const handleSave = () => {
    setUsers(
      users.map((user) => (user.id === editUserId ? { ...user, ...newUserData } : user))
    );
    setEditUserId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || user.status === filter)
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h2>User Management</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) =>
            user.id === editUserId ? (
              <tr key={user.id}>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={newUserData.name}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="role"
                    value={newUserData.role}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <select
                    name="status"
                    value={newUserData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditUserId(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <h3>Add User</h3>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={newUserData.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Role"
        name="role"
        value={newUserData.role}
        onChange={handleInputChange}
      />
      <select name="status" value={newUserData.status} onChange={handleInputChange}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default Users;
