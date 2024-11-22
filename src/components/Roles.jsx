import React, { useState } from "react";
import { roles as initialRoles } from "../data";

const Roles = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [editRoleId, setEditRoleId] = useState(null);
  const [newRoleData, setNewRoleData] = useState({ name: "", permissions: [] });
  const [allPermissions] = useState(["Read", "Write", "Delete"]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoleData({ ...newRoleData, [name]: value });
  };

  const handlePermissionToggle = (permission) => {
    const updatedPermissions = newRoleData.permissions.includes(permission)
      ? newRoleData.permissions.filter((perm) => perm !== permission)
      : [...newRoleData.permissions, permission];
    setNewRoleData({ ...newRoleData, permissions: updatedPermissions });
  };

  const handleAddRole = () => {
    if (!newRoleData.name || newRoleData.permissions.length === 0) {
      alert("Please provide a role name and at least one permission.");
      return;
    }
    setRoles([...roles, { ...newRoleData, id: Date.now() }]);
    setNewRoleData({ name: "", permissions: [] });
  };

  const handleEdit = (role) => {
    setEditRoleId(role.id);
    setNewRoleData(role);
  };

  const handleSave = () => {
    setRoles(
      roles.map((role) => (role.id === editRoleId ? { ...role, ...newRoleData } : role))
    );
    setEditRoleId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((role) => role.id !== id));
    }
  };

  return (
    <div>
      <h2>Role Management</h2>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) =>
            role.id === editRoleId ? (
              <tr key={role.id}>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={newRoleData.name}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  {allPermissions.map((perm) => (
                    <label key={perm}>
                      <input
                        type="checkbox"
                        checked={newRoleData.permissions.includes(perm)}
                        onChange={() => handlePermissionToggle(perm)}
                      />
                      {perm}
                    </label>
                  ))}
                </td>
                <td>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditRoleId(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.permissions.join(", ")}</td>
                <td>
                  <button onClick={() => handleEdit(role)}>Edit</button>
                  <button onClick={() => handleDelete(role.id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <h3>Add Role</h3>
      <input
        type="text"
        placeholder="Role Name"
        name="name"
        value={newRoleData.name}
        onChange={handleInputChange}
      />
      <div>
        {allPermissions.map((perm) => (
          <label key={perm}>
            <input
              type="checkbox"
              checked={newRoleData.permissions.includes(perm)}
              onChange={() => handlePermissionToggle(perm)}
            />
            {perm}
          </label>
        ))}
      </div>
      <button onClick={handleAddRole}>Add Role</button>
    </div>
  );
};

export default Roles;
