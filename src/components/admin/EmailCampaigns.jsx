import React, { useState } from "react";
import {
  FaEnvelope,
  FaPlus,
  FaPaperPlane,
  FaUsers,
  FaEye,
  FaTrash,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const EmailCampaigns = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      subject: "Welcome to SMLAG!",
      recipients: 245,
      sent: 245,
      opened: 187,
      clicked: 92,
      status: "sent",
      date: "2024-10-15",
    },
    {
      id: 2,
      subject: "New Service Launch: AI/ML",
      recipients: 500,
      sent: 500,
      opened: 312,
      clicked: 145,
      status: "sent",
      date: "2024-10-12",
    },
    {
      id: 3,
      subject: "Diwali Special Offer 🎉",
      recipients: 800,
      sent: 0,
      opened: 0,
      clicked: 0,
      status: "scheduled",
      date: "2024-10-25",
    },
    {
      id: 4,
      subject: "Monthly Newsletter - Oct",
      recipients: 1200,
      sent: 0,
      opened: 0,
      clicked: 0,
      status: "draft",
      date: "—",
    },
  ]);

  const [showCompose, setShowCompose] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    recipients: "all",
    content: "",
    schedule: "now",
  });
  const [toast, setToast] = useState(null);

  const templates = [
    { id: 1, name: "Welcome Email", icon: "👋" },
    { id: 2, name: "Promotional", icon: "🎉" },
    { id: 3, name: "Newsletter", icon: "📰" },
    { id: 4, name: "Follow-up", icon: "📧" },
  ];

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSend = () => {
    if (!form.subject || !form.content) {
      showToast("Subject and content required", "error");
      return;
    }
    const newCampaign = {
      id: campaigns.length + 1,
      subject: form.subject,
      recipients: 245,
      sent: form.schedule === "now" ? 245 : 0,
      opened: 0,
      clicked: 0,
      status: form.schedule === "now" ? "sent" : "scheduled",
      date: new Date().toISOString().split("T")[0],
    };
    setCampaigns([newCampaign, ...campaigns]);
    setShowCompose(false);
    setForm({ subject: "", recipients: "all", content: "", schedule: "now" });
    showToast("Email sent successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this campaign?")) {
      setCampaigns(campaigns.filter((c) => c.id !== id));
      showToast("Campaign deleted", "info");
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      sent: "badge-green",
      scheduled: "badge-yellow",
      draft: "badge-gray",
    };
    return classes[status] || "badge-gray";
  };

  return (
    <div className="admin-dashboard">
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>{toast.type === "success" ? "✅" : "❌"}</span>
          {toast.message}
        </div>
      )}

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">📧</span>
          </div>
          <div className="admin-stat-value">{campaigns.length}</div>
          <div className="admin-stat-label">Total Campaigns</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">✉️</span>
          </div>
          <div className="admin-stat-value">
            {campaigns.reduce((s, c) => s + c.sent, 0)}
          </div>
          <div className="admin-stat-label">Emails Sent</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">👁️</span>
          </div>
          <div className="admin-stat-value">
            {campaigns.reduce((s, c) => s + c.opened, 0)}
          </div>
          <div className="admin-stat-label">Opened</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">🖱️</span>
          </div>
          <div className="admin-stat-value">
            {campaigns.reduce((s, c) => s + c.clicked, 0)}
          </div>
          <div className="admin-stat-label">Clicked</div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>📧 Email Campaigns</h3>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowCompose(true)}
          >
            <FaPlus /> New Campaign
          </button>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Recipients</th>
                <th>Sent</th>
                <th>Opened</th>
                <th>Clicked</th>
                <th>Open Rate</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => {
                const openRate =
                  c.sent > 0 ? ((c.opened / c.sent) * 100).toFixed(1) : 0;
                return (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.subject}</strong>
                    </td>
                    <td>{c.recipients}</td>
                    <td>{c.sent}</td>
                    <td>{c.opened}</td>
                    <td>{c.clicked}</td>
                    <td>
                      <strong>{openRate}%</strong>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>{c.date}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="icon-btn-sm" title="View">
                          <FaEye />
                        </button>
                        <button
                          className="icon-btn-sm"
                          onClick={() => handleDelete(c.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="modal-overlay" onClick={() => setShowCompose(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: "700px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <h2 style={{ margin: 0 }}>✉️ New Campaign</h2>
              <button
                onClick={() => setShowCompose(false)}
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

            <div className="campaign-templates">
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--gray-500)",
                  marginBottom: "0.5rem",
                }}
              >
                Quick Templates:
              </p>
              <div className="template-grid">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    className="template-btn"
                    onClick={() =>
                      setForm({
                        ...form,
                        subject: t.name,
                        content: `Hi {{name}},\n\n[Your message here]\n\nBest regards,\nSMLAG Team`,
                      })
                    }
                  >
                    <span>{t.icon}</span>
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-form">
              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  className="input-field"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  placeholder="Welcome to SMLAG!"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Recipients</label>
                  <select
                    className="input-field"
                    value={form.recipients}
                    onChange={(e) =>
                      setForm({ ...form, recipients: e.target.value })
                    }
                  >
                    <option value="all">All Users (245)</option>
                    <option value="clients">Clients Only (156)</option>
                    <option value="leads">Leads (89)</option>
                    <option value="custom">Custom List</option>
                  </select>
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
                    <option value="later">Schedule for Later</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Email Content *</label>
                <textarea
                  className="input-field"
                  rows="8"
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder="Write your email here... Use {{name}} for personalization"
                />
                <small style={{ fontSize: "0.7rem", color: "var(--gray-500)" }}>
                  💡 Tip: Use {"{{name}}"} for personalization
                </small>
              </div>

              <div className="form-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => setShowCompose(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-outline">Save as Draft</button>
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

export default EmailCampaigns;
