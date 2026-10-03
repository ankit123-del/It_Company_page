import React, { useState } from "react";
import {
  FaLock,
  FaUserShield,
  FaCheck,
  FaTimes,
  FaPlus,
  FaTrash,
  FaSave,
  FaListAlt,
  FaKey,
  FaUsers,
  FaFolder,
  FaMoneyBillWave,
  FaTicketAlt,
  FaCog,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const RolesPermissions = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      color: "#ef4444",
      users: 2,
      description: "Full system access",
    },
    {
      id: 2,
      name: "Manager",
      color: "#f59e0b",
      users: 3,
      description: "Manage projects and users",
    },
    {
      id: 3,
      name: "Client",
      color: "#8b5cf6",
      users: 12,
      description: "View own projects",
    },
    {
      id: 4,
      name: "Employee",
      color: "#10b981",
      users: 8,
      description: "Work on assigned tasks",
    },
    {
      id: 5,
      name: "User",
      color: "#3b82f6",
      users: 45,
      description: "Basic access",
    },
  ]);

  const [permissions, setPermissions] = useState({
    Admin: {
      users: { view: true, create: true, edit: true, delete: true },
      projects: { view: true, create: true, edit: true, delete: true },
      invoices: { view: true, create: true, edit: true, delete: true },
      tickets: { view: true, reply: true, resolve: true, delete: true },
      settings: { view: true, edit: true },
      visitors: { view: true, delete: true },
    },
    Manager: {
      users: { view: true, create: true, edit: true, delete: false },
      projects: { view: true, create: true, edit: true, delete: true },
      invoices: { view: true, create: true, edit: true, delete: false },
      tickets: { view: true, reply: true, resolve: true, delete: false },
      settings: { view: true, edit: false },
      visitors: { view: true, delete: false },
    },
    Client: {
      users: { view: false, create: false, edit: false, delete: false },
      projects: { view: true, create: false, edit: false, delete: false },
      invoices: { view: true, create: false, edit: false, delete: false },
      tickets: { view: true, reply: true, resolve: false, delete: false },
      settings: { view: false, edit: false },
      visitors: { view: false, delete: false },
    },
    Employee: {
      users: { view: true, create: false, edit: false, delete: false },
      projects: { view: true, create: false, edit: true, delete: false },
      invoices: { view: false, create: false, edit: false, delete: false },
      tickets: { view: true, reply: true, resolve: true, delete: false },
      settings: { view: false, edit: false },
      visitors: { view: false, delete: false },
    },
    User: {
      users: { view: false, create: false, edit: false, delete: false },
      projects: { view: false, create: false, edit: false, delete: false },
      invoices: { view: false, create: false, edit: false, delete: false },
      tickets: { view: true, reply: true, resolve: false, delete: false },
      settings: { view: false, edit: false },
      visitors: { view: false, delete: false },
    },
  });

  const [selectedRole, setSelectedRole] = useState("Admin");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const modules = [
    { id: "users", label: "Users", icon: <FaUsers /> },
    { id: "projects", label: "Projects", icon: <FaFolder /> },
    { id: "invoices", label: "Invoices", icon: <FaMoneyBillWave /> },
    { id: "tickets", label: "Support Tickets", icon: <FaTicketAlt /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
    { id: "visitors", label: "Visitors", icon: <FaEye /> },
  ];

  const actions = ["view", "create", "edit", "delete", "reply", "resolve"];

  const togglePermission = (module, action) => {
    setPermissions((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [module]: {
          ...prev[selectedRole][module],
          [action]: !prev[selectedRole][module]?.[action],
        },
      },
    }));
  };

  const handleSave = () => {
    localStorage.setItem("role_permissions", JSON.stringify(permissions));
    showToast("Permissions saved successfully!");
  };

  const handleAddRole = () => {
    const name = prompt("Enter role name:");
    if (name) {
      const newRole = {
        id: roles.length + 1,
        name,
        color: "#6b7280",
        users: 0,
        description: "Custom role",
      };
      setRoles([...roles, newRole]);
      setPermissions((prev) => ({
        ...prev,
        [name]: {
          users: { view: false, create: false, edit: false, delete: false },
          projects: { view: false, create: false, edit: false, delete: false },
          invoices: { view: false, create: false, edit: false, delete: false },
          tickets: {
            view: false,
            reply: false,
            resolve: false,
            delete: false,
          },
          settings: { view: false, edit: false },
          visitors: { view: false, delete: false },
        },
      }));
      showToast(`Role "${name}" added!`);
    }
  };

  const handleDeleteRole = (roleName) => {
    if (["Admin", "Manager", "Client", "Employee", "User"].includes(roleName)) {
      showToast("Cannot delete default role!", "error");
      return;
    }
    if (window.confirm(`Delete role "${roleName}"?`)) {
      setRoles(roles.filter((r) => r.name !== roleName));
      const newPerms = { ...permissions };
      delete newPerms[roleName];
      setPermissions(newPerms);
      showToast(`Role "${roleName}" deleted`, "info");
    }
  };

  const totalUsers = roles.reduce((s, r) => s + r.users, 0);

  return (
    <div className="admin-dashboard">
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>
            {toast.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
          </span>
          {toast.message}
        </div>
      )}

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#4f46e5" }}>
              <FaLock />
            </span>
          </div>
          <div className="admin-stat-value">{roles.length}</div>
          <div className="admin-stat-label">Total Roles</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#10b981" }}>
              <FaUserShield />
            </span>
          </div>
          <div className="admin-stat-value">{totalUsers}</div>
          <div className="admin-stat-label">Total Users</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#f59e0b" }}>
              <FaListAlt />
            </span>
          </div>
          <div className="admin-stat-value">{modules.length}</div>
          <div className="admin-stat-label">Modules</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#8b5cf6" }}>
              <FaKey />
            </span>
          </div>
          <div className="admin-stat-value">{actions.length}</div>
          <div className="admin-stat-label">Actions</div>
        </div>
      </div>

      <div className="roles-grid">
        {/* Roles List */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>
              <FaLock style={{ marginRight: "0.4rem" }} /> Roles
            </h3>
            <button className="btn btn-primary btn-sm" onClick={handleAddRole}>
              <FaPlus /> Add Role
            </button>
          </div>

          <div className="roles-list">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`role-item ${
                  selectedRole === role.name ? "active" : ""
                }`}
                onClick={() => setSelectedRole(role.name)}
              >
                <div
                  className="role-color"
                  style={{ background: role.color }}
                />
                <div className="role-info">
                  <strong>{role.name}</strong>
                  <span>
                    {role.users} users • {role.description}
                  </span>
                </div>
                {!["Admin", "Manager", "Client", "Employee", "User"].includes(
                  role.name,
                ) && (
                  <button
                    className="icon-btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRole(role.name);
                    }}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Editor */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>
              <FaKey style={{ marginRight: "0.4rem" }} /> Permissions —{" "}
              {selectedRole}
            </h3>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              <FaSave /> Save
            </button>
          </div>

          <div className="permissions-table-wrapper">
            <table className="permissions-table">
              <thead>
                <tr>
                  <th>Module</th>
                  {actions.map((a) => (
                    <th key={a} style={{ textTransform: "capitalize" }}>
                      {a}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => (
                  <tr key={module.id}>
                    <td>
                      <strong
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.45rem",
                        }}
                      >
                        <span
                          style={{
                            color: "#4f46e5",
                            display: "inline-flex",
                          }}
                        >
                          {module.icon}
                        </span>
                        {module.label}
                      </strong>
                    </td>
                    {actions.map((action) => {
                      const hasAction =
                        permissions[selectedRole]?.[module.id]?.[action] !==
                        undefined;
                      const value =
                        permissions[selectedRole]?.[module.id]?.[action];
                      return (
                        <td key={action} style={{ textAlign: "center" }}>
                          {hasAction ? (
                            <button
                              className={`perm-toggle ${value ? "active" : ""}`}
                              onClick={() =>
                                togglePermission(module.id, action)
                              }
                            >
                              {value ? <FaCheck /> : <FaTimes />}
                            </button>
                          ) : (
                            <span style={{ color: "var(--gray-300)" }}>—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissions;
