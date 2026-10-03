import React, { useState, useMemo } from "react";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaReply,
  FaCheck,
  FaStar,
  FaRegStar,
  FaInbox,
  FaPaperPlane,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

// ============================================================
// Optional props — pass real data when backend is ready:
//   <ContactInbox messages={messages} onReply={fn} onDelete={fn} />
// Falls back to local mock data if no props given.
// ============================================================
const ContactInbox = ({ messages: externalMessages, onReply, onDelete }) => {
  const [localMessages, setLocalMessages] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@techcorp.com",
      subject: "Project Inquiry - E-commerce",
      message:
        "Hi, I'm interested in building an e-commerce platform. Can we schedule a call?",
      date: "2024-10-16 10:30",
      status: "unread",
      starred: true,
      replied: false,
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@startup.io",
      subject: "Mobile App Development",
      message:
        "Looking for a partner to build a mobile app. Please share your portfolio.",
      date: "2024-10-16 09:15",
      status: "read",
      starred: false,
      replied: true,
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@cloud.com",
      subject: "Cloud Services Quote",
      message: "Need a quote for cloud migration services.",
      date: "2024-10-15 16:20",
      status: "unread",
      starred: false,
      replied: false,
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha@dataflow.in",
      subject: "Partnership Opportunity",
      message: "Would like to discuss potential partnership.",
      date: "2024-10-15 11:45",
      status: "read",
      starred: true,
      replied: true,
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram@fintech.com",
      subject: "Technical Support Needed",
      message: "Facing issues with existing integration.",
      date: "2024-10-14 14:00",
      status: "unread",
      starred: false,
      replied: false,
    },
  ]);

  const messages =
    externalMessages && externalMessages.length > 0
      ? externalMessages
      : localMessages;
  const setMessages = externalMessages ? () => {} : setLocalMessages;

  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const [replyText, setReplyText] = useState("");

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleMarkRead = (id) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, status: "read" } : m)),
    );
  };

  const handleStar = (id) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)),
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this message?")) return;
    setMessages(messages.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
    onDelete?.(id);
    showToast("Message deleted", "info");
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    const updated = messages.map((m) =>
      m.id === selected.id ? { ...m, replied: true } : m,
    );
    setMessages(updated);
    setSelected({ ...selected, replied: true });
    onReply?.(selected.id, replyText);
    setReplyText("");
    showToast("Reply sent");
  };

  const filtered = useMemo(
    () =>
      messages.filter((m) => {
        if (filter === "unread") return m.status === "unread";
        if (filter === "starred") return m.starred;
        if (filter === "replied") return m.replied;
        return true;
      }),
    [messages, filter],
  );

  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const starredCount = messages.filter((m) => m.starred).length;
  const repliedCount = messages.filter((m) => m.replied).length;

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
            <span className="admin-stat-icon">
              <FaInbox />
            </span>
          </div>
          <div className="admin-stat-value">{messages.length}</div>
          <div className="admin-stat-label">Total Messages</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span
              className="admin-stat-icon"
              style={{ color: "var(--primary)" }}
            >
              <FaEnvelope />
            </span>
            {unreadCount > 0 && <span className="kpi-change up">NEW</span>}
          </div>
          <div className="admin-stat-value">{unreadCount}</div>
          <div className="admin-stat-label">Unread</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span
              className="admin-stat-icon"
              style={{ color: "var(--warning)" }}
            >
              <FaStar />
            </span>
          </div>
          <div className="admin-stat-value">{starredCount}</div>
          <div className="admin-stat-label">Starred</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span
              className="admin-stat-icon"
              style={{ color: "var(--success)" }}
            >
              <FaCheckCircle />
            </span>
          </div>
          <div className="admin-stat-value">{repliedCount}</div>
          <div className="admin-stat-label">Replied</div>
        </div>
      </div>

      <div className="inbox-layout">
        {/* Messages List */}
        <div className="admin-card inbox-list">
          <div className="admin-card-header">
            <h3>
              <FaInbox style={{ marginRight: "0.4rem" }} />
              Inbox ({unreadCount} unread)
            </h3>
          </div>
          <div className="inbox-filters">
            {[
              { id: "all", label: "All" },
              { id: "unread", label: "Unread" },
              { id: "starred", label: "Starred" },
              { id: "replied", label: "Replied" },
            ].map((f) => (
              <button
                key={f.id}
                className={`filter-btn ${filter === f.id ? "active" : ""}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="inbox-messages">
            {filtered.map((m) => (
              <div
                key={m.id}
                className={`inbox-item ${
                  m.status === "unread" ? "unread" : ""
                } ${selected?.id === m.id ? "active" : ""}`}
                onClick={() => {
                  setSelected(m);
                  handleMarkRead(m.id);
                }}
              >
                <div className="inbox-avatar">{m.name.charAt(0)}</div>
                <div className="inbox-content">
                  <div className="inbox-header">
                    <strong>{m.name}</strong>
                    <button
                      className="inbox-star"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStar(m.id);
                      }}
                    >
                      {m.starred ? (
                        <FaStar style={{ color: "#f59e0b" }} />
                      ) : (
                        <FaRegStar />
                      )}
                    </button>
                  </div>
                  <p className="inbox-subject">{m.subject}</p>
                  <p className="inbox-preview">
                    {m.message.substring(0, 50)}...
                  </p>
                  <span className="inbox-time">{m.date}</span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: "var(--gray-500)",
                }}
              >
                No messages
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        {selected ? (
          <div className="admin-card inbox-detail">
            <div className="admin-card-header">
              <h3>
                <FaEnvelopeOpen style={{ marginRight: "0.4rem" }} /> Message
                Details
              </h3>
              <button
                className="icon-btn-sm"
                onClick={() => handleDelete(selected.id)}
              >
                <FaTrash />
              </button>
            </div>
            <div className="inbox-detail-body">
              <div className="inbox-detail-header">
                <div className="inbox-detail-avatar">
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <strong>{selected.name}</strong>
                  <p>{selected.email}</p>
                </div>
              </div>
              <div className="inbox-detail-meta">
                <span>
                  <FaCalendarAlt style={{ marginRight: "0.35rem" }} />
                  {selected.date}
                </span>
                <span>
                  <FaEnvelope style={{ marginRight: "0.35rem" }} />
                  {selected.email}
                </span>
              </div>
              <h4 style={{ marginBottom: "0.5rem" }}>{selected.subject}</h4>
              <p className="inbox-detail-message">{selected.message}</p>

              <div className="inbox-reply">
                <label>Reply:</label>
                <textarea
                  className="input-field"
                  rows="4"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                />
                <button className="btn btn-primary" onClick={handleReply}>
                  <FaPaperPlane /> Send Reply
                </button>
              </div>

              {selected.replied && (
                <div className="inbox-replied-badge">
                  <FaCheck style={{ marginRight: "0.35rem" }} />
                  You have replied to this message
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="admin-card inbox-empty">
            <FaEnvelope
              style={{ fontSize: "4rem", color: "var(--gray-300)" }}
            />
            <h3>Select a message</h3>
            <p>Choose a message from the list to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInbox;
