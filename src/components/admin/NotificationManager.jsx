import React, { useState } from "react";
import {
  FaBell,
  FaPlus,
  FaPaperPlane,
  FaTrash,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaBullhorn,
  FaBullseye,
  FaCalendarAlt,
  FaEye,
  FaSave,
} from "react-icons/fa";

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Project Assigned",
      message: "You have been assigned to E-commerce Platform",
      type: "info",
      target: "all",
      sent: 245,
      read: 187,
      date: "2024-10-16 10:00",
      status: "sent",
    },
    {
      id: 2,
      title: "System Maintenance",
      message: "Server maintenance scheduled for Sunday",
      type: "warning",
      target: "admins",
      sent: 15,
      read: 12,
      date: "2024-10-15 14:30",
      status: "sent",
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Payment of ₹2,95,000 received from TechCorp",
      type: "success",
      target: "admins",
      sent: 15,
      read: 15,
      date: "2024-10-15 09:00",
      status: "sent",
    },
    {
      id: 4,
      title: "New Feature Launch",
      message: "AI Assistant is now available for all users",
      type: "info",
      target: "all",
      sent: 0,
      read: 0,
      date: "—",
      status: "draft",
    },
  ]);

  const [showCompose, setShowCompose] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "info",
    target: "all",
    schedule: "now",
  });

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const typeConfig = {
    info: {
      color: "#3b82f6",
      bg: "#dbeafe",
      icon: <FaInfoCircle />,
    },
    success: {
      color: "#10b981",
      bg: "#d1fae5",
      icon: <FaCheckCircle />,
    },
    warning: {
      color: "#f59e0b",
      bg: "#fef3c7",
      icon: <FaExclamationTriangle />,
    },
    error: {
      color: "#ef4444",
      bg: "#fee2e2",
      icon: <FaTimesCircle />,
    },
  };

  const handleSend = () => {
    if (!form.title || !form.message) {
      showToast("Title and message required", "error");
      return;
    }

    const targets = { all: 245, admins: 15, clients: 12, employees: 8 };

    const newNotif = {
      id: notifications.length + 1,
      title: form.title,
      message: form.message,
      type: form.type,
      target: form.target,
      sent: form.schedule === "now" ? targets[form.target] : 0,
      read: 0,
      date: form.schedule === "now" ? new Date().toLocaleString("en-IN") : "—",
      status: form.schedule === "now" ? "sent" : "scheduled",
    };

    setNotifications([newNotif, ...notifications]);
    setShowCompose(false);
    setForm({
      title: "",
      message: "",
      type: "info",
      target: "all",
      schedule: "now",
    });
    showToast("Notification sent!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this notification?")) {
      setNotifications(notifications.filter((n) => n.id !== id));
      showToast("Deleted", "info");
    }
  };

  const totalSent = notifications.reduce((s, n) => s + n.sent, 0);
  const totalRead = notifications.reduce((s, n) => s + n.read, 0);
  const scheduledCount = notifications.filter(
    (n) => n.status === "scheduled",
  ).length;

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
              <FaBell />
            </span>
          </div>
          <div className="admin-stat-value">{notifications.length}</div>
          <div className="admin-stat-label">Total Notifications</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#3b82f6" }}>
              <FaBullhorn />
            </span>
          </div>
          <div className="admin-stat-value">{totalSent}</div>
          <div className="admin-stat-label">Total Sent</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#10b981" }}>
              <FaCheckCircle />
            </span>
          </div>
          <div className="admin-stat-value">{totalRead}</div>
          <div className="admin-stat-label">Total Read</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#f59e0b" }}>
              <FaCalendarAlt />
            </span>
          </div>
          <div className="admin-stat-value">{scheduledCount}</div>
          <div className="admin-stat-label">Scheduled</div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>
            <FaBell style={{ marginRight: "0.4rem" }} /> Notifications
          </h3>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowCompose(true)}
          >
            <FaPlus /> New Notification
          </button>
        </div>

        <div className="notification-list-admin">
          {notifications.map((n) => {
            const config = typeConfig[n.type];
            return (
              <div key={n.id} className="notification-admin-item">
                <div
                  className="notification-admin-icon"
                  style={{ background: config.bg, color: config.color }}
                >
                  {config.icon}
                </div>
                <div className="notification-admin-content">
                  <div className="notification-admin-header">
                    <strong>{n.title}</strong>
                    <span
                      className={`badge badge-${
                        n.status === "sent"
                          ? "green"
                          : n.status === "scheduled"
                            ? "yellow"
                            : "gray"
                      }`}
                    >
                      {n.status}
                    </span>
                  </div>
                  <p>{n.message}</p>
                  <div className="notification-admin-meta">
                    <span>
                      <FaBullseye
                        style={{ marginRight: "0.3rem", fontSize: "0.7rem" }}
                      />
                      Target: {n.target}
                    </span>
                    <span>
                      <FaBullhorn
                        style={{ marginRight: "0.3rem", fontSize: "0.7rem" }}
                      />
                      Sent: {n.sent}
                    </span>
                    <span>
                      <FaEye
                        style={{ marginRight: "0.3rem", fontSize: "0.7rem" }}
                      />
                      Read: {n.read}
                    </span>
                    <span>
                      <FaCalendarAlt
                        style={{ marginRight: "0.3rem", fontSize: "0.7rem" }}
                      />
                      {n.date}
                    </span>
                  </div>
                </div>
                <button
                  className="icon-btn-sm"
                  onClick={() => handleDelete(n.id)}
                >
                  <FaTrash />
                </button>
              </div>
            );
          })}
          {notifications.length === 0 && (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "var(--gray-500)",
              }}
            >
              No notifications yet
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="modal-overlay" onClick={() => setShowCompose(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <FaBell />
                Send Notification
              </h2>
              <button
                onClick={() => setShowCompose(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  color: "var(--gray-500)",
                }}
              >
                <FaTimes />
              </button>
            </div>
            <div className="admin-form">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  className="input-field"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Notification title"
                />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  className="input-field"
                  rows="4"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Notification message"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    className="input-field"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Target</label>
                  <select
                    className="input-field"
                    value={form.target}
                    onChange={(e) =>
                      setForm({ ...form, target: e.target.value })
                    }
                  >
                    <option value="all">All Users (245)</option>
                    <option value="admins">Admins (15)</option>
                    <option value="clients">Clients (12)</option>
                    <option value="employees">Employees (8)</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Schedule</label>
                <select
                  className="input-field"
                  value={form.schedule}
                  onChange={(e) =>
                    setForm({ ...form, schedule: e.target.value })
                  }
                >
                  <option value="now">Send Now</option>
                  <option value="later">Schedule Later</option>
                </select>
              </div>
              <div className="form-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => setShowCompose(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSend}>
                  <FaPaperPlane />{" "}
                  {form.schedule === "now" ? "Send Now" : "Schedule"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationManager;
