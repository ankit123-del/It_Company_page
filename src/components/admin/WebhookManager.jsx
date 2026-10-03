import React, { useState } from "react";
import {
  FaPlug,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaSync,
  FaHistory,
} from "react-icons/fa";

const WebhookManager = () => {
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      name: "Slack Notifications",
      url: "https://hooks.slack.com/services/xxx",
      events: ["user.created", "project.created"],
      active: true,
      lastTriggered: "2 min ago",
      successRate: 98,
    },
    {
      id: 2,
      name: "Zapier Integration",
      url: "https://hooks.zapier.com/hooks/catch/xxx",
      events: ["invoice.paid"],
      active: true,
      lastTriggered: "1 hour ago",
      successRate: 100,
    },
    {
      id: 3,
      name: "Discord Alerts",
      url: "https://discord.com/api/webhooks/xxx",
      events: ["ticket.created", "user.registered"],
      active: false,
      lastTriggered: "3 days ago",
      successRate: 85,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [logs, setLogs] = useState([
    {
      id: 1,
      webhook: "Slack Notifications",
      event: "user.created",
      status: "success",
      time: "2 min ago",
      statusCode: 200,
    },
    {
      id: 2,
      webhook: "Zapier Integration",
      event: "invoice.paid",
      status: "success",
      time: "1 hour ago",
      statusCode: 200,
    },
    {
      id: 3,
      webhook: "Discord Alerts",
      event: "ticket.created",
      status: "failed",
      time: "3 hours ago",
      statusCode: 500,
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    url: "",
    events: [],
    active: true,
  });

  const availableEvents = [
    { id: "user.created", label: "User Created" },
    { id: "user.registered", label: "User Registered" },
    { id: "project.created", label: "Project Created" },
    { id: "project.completed", label: "Project Completed" },
    { id: "invoice.paid", label: "Invoice Paid" },
    { id: "invoice.created", label: "Invoice Created" },
    { id: "ticket.created", label: "Ticket Created" },
    { id: "ticket.resolved", label: "Ticket Resolved" },
  ];

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.url) {
      showToast("Name and URL required", "error");
      return;
    }
    if (!form.url.startsWith("http")) {
      showToast("Invalid URL", "error");
      return;
    }

    if (editing) {
      setWebhooks(
        webhooks.map((w) => (w.id === editing.id ? { ...w, ...form } : w)),
      );
      showToast("Webhook updated!");
    } else {
      setWebhooks([
        ...webhooks,
        {
          id: webhooks.length + 1,
          ...form,
          lastTriggered: "Never",
          successRate: 100,
        },
      ]);
      showToast("Webhook added!");
    }
    setShowModal(false);
    setEditing(null);
    setForm({ name: "", url: "", events: [], active: true });
  };

  const handleEdit = (w) => {
    setEditing(w);
    setForm(w);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this webhook?")) {
      setWebhooks(webhooks.filter((w) => w.id !== id));
      showToast("Deleted", "info");
    }
  };

  const toggleActive = (id) => {
    setWebhooks(
      webhooks.map((w) => (w.id === id ? { ...w, active: !w.active } : w)),
    );
  };

  const toggleEvent = (eventId) => {
    setForm((prev) => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter((e) => e !== eventId)
        : [...prev.events, eventId],
    }));
  };

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
              <FaPlug />
            </span>
          </div>
          <div className="admin-stat-value">{webhooks.length}</div>
          <div className="admin-stat-label">Total Webhooks</div>
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
            {webhooks.filter((w) => w.active).length}
          </div>
          <div className="admin-stat-label">Active</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">📊</span>
          </div>
          <div className="admin-stat-value">
            {Math.round(
              webhooks.reduce((s, w) => s + w.successRate, 0) / webhooks.length,
            )}
            %
          </div>
          <div className="admin-stat-label">Avg Success</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">📡</span>
          </div>
          <div className="admin-stat-value">{logs.length}</div>
          <div className="admin-stat-label">Recent Calls</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>🔌 Webhooks</h3>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setEditing(null);
              setForm({ name: "", url: "", events: [], active: true });
              setShowModal(true);
            }}
          >
            <FaPlus /> Add Webhook
          </button>
        </div>

        <div className="webhooks-list">
          {webhooks.map((w) => (
            <div
              key={w.id}
              className={`webhook-card ${w.active ? "active" : "inactive"}`}
            >
              <div className="webhook-header">
                <div className="webhook-title">
                  <div className="webhook-icon">
                    <FaPlug />
                  </div>
                  <div>
                    <h4>{w.name}</h4>
                    <code className="webhook-url">{w.url}</code>
                  </div>
                </div>
                <div className="webhook-actions">
                  <button
                    className="icon-btn-sm"
                    onClick={() => toggleActive(w.id)}
                    title="Toggle"
                  >
                    {w.active ? <FaCheck /> : <FaTimes />}
                  </button>
                  <button className="icon-btn-sm" onClick={() => handleEdit(w)}>
                    <FaEdit />
                  </button>
                  <button
                    className="icon-btn-sm"
                    onClick={() => handleDelete(w.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="webhook-events">
                {w.events.map((e, i) => (
                  <span key={i} className="webhook-event-tag">
                    {e}
                  </span>
                ))}
              </div>
              <div className="webhook-stats">
                <span>Last triggered: {w.lastTriggered}</span>
                <span
                  className={`webhook-success ${w.successRate >= 95 ? "good" : "warn"}`}
                >
                  {w.successRate}% success
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Logs */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>
            <FaHistory /> Recent Webhook Logs
          </h3>
          <button className="btn btn-outline btn-sm">
            <FaSync /> Refresh
          </button>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Webhook</th>
                <th>Event</th>
                <th>Status Code</th>
                <th>Result</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <strong>{log.webhook}</strong>
                  </td>
                  <td>
                    <span className="badge badge-blue">{log.event}</span>
                  </td>
                  <td>
                    <code>{log.statusCode}</code>
                  </td>
                  <td>
                    <span
                      className={`badge badge-${log.status === "success" ? "green" : "red"}`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td>{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? "✏️ Edit Webhook" : "➕ Add Webhook"}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  className="input-field"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Slack Notifications"
                  required
                />
              </div>
              <div className="form-group">
                <label>URL *</label>
                <input
                  type="url"
                  className="input-field"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://hooks.example.com/..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Trigger Events</label>
                <div className="events-grid">
                  {availableEvents.map((event) => (
                    <label key={event.id} className="event-checkbox">
                      <input
                        type="checkbox"
                        checked={form.events.includes(event.id)}
                        onChange={() => toggleEvent(event.id)}
                      />
                      <span>{event.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <label className="settings-toggle" style={{ cursor: "pointer" }}>
                <div>
                  <strong>Active</strong>
                  <span>Enable this webhook</span>
                </div>
                <div className="switch">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) =>
                      setForm({ ...form, active: e.target.checked })
                    }
                  />
                  <span className="slider"></span>
                </div>
              </label>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editing ? "Update" : "Add Webhook"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebhookManager;
