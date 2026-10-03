import React, { useState } from "react";
import {
  FaEnvelope,
  FaUserPlus,
  FaTrash,
  FaDownload,
  FaCheck,
  FaTimes,
  FaUsers,
  FaSearch,
} from "react-icons/fa";

const SubscribersManager = () => {
  const [subscribers, setSubscribers] = useState([
    {
      id: 1,
      email: "rajesh@techcorp.com",
      name: "Rajesh Kumar",
      status: "active",
      source: "Website",
      joined: "2024-10-15",
    },
    {
      id: 2,
      email: "priya@startup.io",
      name: "Priya Sharma",
      status: "active",
      source: "Popup",
      joined: "2024-10-14",
    },
    {
      id: 3,
      email: "amit@cloud.com",
      name: "Amit Patel",
      status: "active",
      source: "Blog",
      joined: "2024-10-12",
    },
    {
      id: 4,
      email: "sneha@dataflow.in",
      name: "Sneha Reddy",
      status: "unsubscribed",
      source: "Website",
      joined: "2024-10-10",
    },
    {
      id: 5,
      email: "vikram@fintech.com",
      name: "Vikram Singh",
      status: "active",
      source: "Referral",
      joined: "2024-10-08",
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ email: "", name: "" });

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.email) {
      showToast("Email required", "error");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      showToast("Invalid email", "error");
      return;
    }
    if (subscribers.find((s) => s.email === form.email)) {
      showToast("Already subscribed!", "error");
      return;
    }

    const newSub = {
      id: subscribers.length + 1,
      email: form.email,
      name: form.name || "—",
      status: "active",
      source: "Manual",
      joined: new Date().toISOString().split("T")[0],
    };
    setSubscribers([newSub, ...subscribers]);
    setShowAdd(false);
    setForm({ email: "", name: "" });
    showToast("Subscriber added!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this subscriber?")) {
      setSubscribers(subscribers.filter((s) => s.id !== id));
      showToast("Deleted", "info");
    }
  };

  const toggleStatus = (id) => {
    setSubscribers(
      subscribers.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "active" ? "unsubscribed" : "active" }
          : s,
      ),
    );
  };

  const exportCSV = () => {
    const csv = [
      "Email,Name,Status,Source,Joined",
      ...subscribers.map(
        (s) =>
          `"${s.email}","${s.name}","${s.status}","${s.source}","${s.joined}"`,
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `subscribers-${Date.now()}.csv`;
    a.click();
    showToast("CSV exported!");
  };

  const filtered = subscribers.filter((s) => {
    const matchesSearch =
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-dashboard">
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>{toast.type === "success" ? "✅" : "❌"}</span>
          {toast.message}
        </div>
      )}

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaUsers />
            </span>
          </div>
          <div className="admin-stat-value">{subscribers.length}</div>
          <div className="admin-stat-label">Total</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span
              className="admin-stat-icon"
              style={{ color: "var(--success)" }}
            >
              ✅
            </span>
          </div>
          <div className="admin-stat-value">
            {subscribers.filter((s) => s.status === "active").length}
          </div>
          <div className="admin-stat-label">Active</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span
              className="admin-stat-icon"
              style={{ color: "var(--danger)" }}
            >
              ❌
            </span>
          </div>
          <div className="admin-stat-value">
            {subscribers.filter((s) => s.status === "unsubscribed").length}
          </div>
          <div className="admin-stat-label">Unsubscribed</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span
              className="admin-stat-icon"
              style={{ color: "var(--warning)" }}
            >
              📈
            </span>
          </div>
          <div className="admin-stat-value">
            {Math.round(
              (subscribers.filter((s) => s.status === "active").length /
                subscribers.length) *
                100,
            )}
            %
          </div>
          <div className="admin-stat-label">Active Rate</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>📬 Newsletter Subscribers</h3>
          <div className="admin-header-filters">
            <div className="search-input-wrapper">
              <FaSearch />
              <input
                type="text"
                className="input-field input-sm"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="input-field input-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
            <button className="btn btn-outline btn-sm" onClick={exportCSV}>
              <FaDownload /> CSV
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowAdd(true)}
            >
              <FaUserPlus /> Add
            </button>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Source</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>
                    <strong>{s.email}</strong>
                  </td>
                  <td>{s.name}</td>
                  <td>
                    <span className="badge badge-blue">{s.source}</span>
                  </td>
                  <td>
                    <span
                      className={`badge badge-${s.status === "active" ? "green" : "gray"}`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td>{s.joined}</td>
                  <td>
                    <div className="admin-actions">
                      <button
                        className="icon-btn-sm"
                        onClick={() => toggleStatus(s.id)}
                        title="Toggle Status"
                      >
                        {s.status === "active" ? <FaTimes /> : <FaCheck />}
                      </button>
                      <button
                        className="icon-btn-sm"
                        onClick={() => handleDelete(s.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>➕ Add Subscriber</h2>
            <form onSubmit={handleAdd} className="admin-form">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  className="input-field"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Name (Optional)</label>
                <input
                  type="text"
                  className="input-field"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAdd(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Subscriber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribersManager;
