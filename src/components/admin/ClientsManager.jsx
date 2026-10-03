import React, { useState, useMemo } from "react";
import {
  FaBuilding,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaMoneyBillWave,
  FaFolder,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";
import { adminApi } from "../../api/adminApi";

const ClientsManager = ({ users = [], invoices = [] }) => {
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    isActive: true,
  });

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ===== Only clients from real users =====
  const clients = useMemo(
    () => users.filter((u) => u.role === "client"),
    [users],
  );

  // ===== Derive project count + revenue per client =====
  const enriched = useMemo(() => {
    return clients.map((c) => {
      const clientInvoices = invoices.filter(
        (i) => i.client?._id === c._id || i.client === c._id,
      );
      const revenue = clientInvoices
        .filter((i) => i.status === "paid")
        .reduce((s, i) => s + (i.total || 0), 0);
      return {
        ...c,
        projects: clientInvoices.length,
        revenue,
      };
    });
  }, [clients, invoices]);

  const filtered = enriched.filter(
    (c) =>
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.company || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(search.toLowerCase()),
  );

  const totalRevenue = enriched.reduce((s, c) => s + c.revenue, 0);
  const totalProjects = enriched.reduce((s, c) => s + c.projects, 0);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      showToast("Name and email are required", "error");
      return;
    }
    if (editing) {
      try {
        await adminApi.updateUser(editing._id, {
          name: form.name,
          company: form.company,
          phone: form.phone,
          isActive: form.isActive,
        });
        showToast("Client updated");
        setShowModal(false);
        setEditing(null);
      } catch (err) {
        showToast(err.message, "error");
      }
    } else {
      showToast("New clients register themselves via the signup page", "info");
      setShowModal(false);
    }
  };

  const handleEdit = (client) => {
    setEditing(client);
    setForm({
      name: client.name || "",
      email: client.email || "",
      company: client.company || "",
      phone: client.phone || "",
      isActive: client.isActive !== false,
    });
    setShowModal(true);
  };

  const handleDelete = async (client) => {
    if (!window.confirm(`Delete client "${client.name}"?`)) return;
    try {
      await adminApi.deleteUser(client._id);
      showToast("Client deleted", "info");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const formatCurrency = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
    return `₹${(val || 0).toLocaleString("en-IN")}`;
  };

  const formatDate = (d) => {
    if (!d) return "—";
    try {
      return new Date(d).toLocaleDateString("en-IN", {
        dateStyle: "medium",
      });
    } catch {
      return d;
    }
  };

  return (
    <div className="admin-dashboard">
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>
            {toast.type === "success" ? <FaCheckCircle /> : <FaUsers />}
          </span>
          {toast.message}
        </div>
      )}

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaBuilding />
            </span>
          </div>
          <div className="admin-stat-value">{clients.length}</div>
          <div className="admin-stat-label">Total Clients</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#10b981" }}>
              <FaCheckCircle />
            </span>
          </div>
          <div className="admin-stat-value">
            {clients.filter((c) => c.isActive !== false).length}
          </div>
          <div className="admin-stat-label">Active</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#4f46e5" }}>
              <FaFolder />
            </span>
          </div>
          <div className="admin-stat-value">{totalProjects}</div>
          <div className="admin-stat-label">Total Invoices</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#f59e0b" }}>
              <FaMoneyBillWave />
            </span>
          </div>
          <div className="admin-stat-value">{formatCurrency(totalRevenue)}</div>
          <div className="admin-stat-label">Total Revenue</div>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>
            <FaBuilding style={{ marginRight: "0.4rem" }} /> All Clients
          </h3>
          <div className="admin-header-filters">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search clients..."
                className="input-field input-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setEditing(null);
                setForm({
                  name: "",
                  email: "",
                  company: "",
                  phone: "",
                  isActive: true,
                });
                setShowModal(true);
              }}
            >
              <FaPlus /> Add Client
            </button>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Invoices</th>
                <th>Revenue</th>
                <th>Status</th>
                <th>Since</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((client) => (
                <tr key={client._id}>
                  <td>
                    <div className="client-cell">
                      <div className="client-logo">
                        {(client.company || client.name || "?")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div>
                        <strong>{client.company || client.name}</strong>
                        <span style={{ fontSize: "0.75rem" }}>
                          {client.company ? client.name : ""}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <strong>{client.name}</strong>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--gray-500)",
                          display: "block",
                        }}
                      >
                        <FaEnvelope
                          style={{ marginRight: "0.3rem", fontSize: "0.7rem" }}
                        />
                        {client.email}
                      </span>
                      {client.phone && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--gray-500)",
                            display: "block",
                          }}
                        >
                          <FaPhone
                            style={{
                              marginRight: "0.3rem",
                              fontSize: "0.7rem",
                            }}
                          />
                          {client.phone}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-blue">{client.projects}</span>
                  </td>
                  <td>
                    <strong>{formatCurrency(client.revenue)}</strong>
                  </td>
                  <td>
                    <span
                      className={`badge badge-${
                        client.isActive !== false ? "green" : "gray"
                      }`}
                    >
                      {client.isActive !== false ? "active" : "inactive"}
                    </span>
                  </td>
                  <td>{formatDate(client.createdAt)}</td>
                  <td>
                    <div className="admin-actions">
                      <button
                        className="icon-btn-sm"
                        onClick={() => handleEdit(client)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="icon-btn-sm"
                        onClick={() => handleDelete(client)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    style={{ textAlign: "center", padding: "2rem" }}
                  >
                    No clients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <h2 style={{ margin: 0 }}>
                {editing ? "Edit Client" : "Add Client"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="input-field"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!!editing}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="input-field"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    className="input-field"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="isActive"
                    className="input-field"
                    value={form.isActive ? "true" : "false"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        isActive: e.target.value === "true",
                      })
                    }
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsManager;
