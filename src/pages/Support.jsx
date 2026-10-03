import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";

const Support = () => {
  const [activeTicket, setActiveTicket] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showNewTicket, setShowNewTicket] = useState(false);

  const [tickets, setTickets] = useState([
    {
      id: "TKT-101",
      subject: "Payment gateway integration issue",
      priority: "high",
      status: "open",
      category: "Billing",
      createdAt: "2024-10-15 10:30",
      messages: [
        {
          from: "user",
          text: "Payment gateway is showing error code 500",
          time: "10:30",
        },
        {
          from: "agent",
          text: "We are looking into this. Could you share the error logs?",
          time: "10:45",
        },
        { from: "user", text: "Sending logs now...", time: "11:00" },
      ],
    },
    {
      id: "TKT-102",
      subject: "Feature request: Dark mode",
      priority: "medium",
      status: "in-progress",
      category: "Feature Request",
      createdAt: "2024-10-14 15:20",
      messages: [
        {
          from: "user",
          text: "Would love to see dark mode in the dashboard",
          time: "15:20",
        },
        {
          from: "agent",
          text: "Great suggestion! Added to our roadmap.",
          time: "16:00",
        },
      ],
    },
    {
      id: "TKT-103",
      subject: "Documentation query",
      priority: "low",
      status: "resolved",
      category: "General",
      createdAt: "2024-10-12 09:00",
      messages: [
        { from: "user", text: "Where can I find the API docs?", time: "09:00" },
        { from: "agent", text: "Here is the link: /docs", time: "09:15" },
      ],
    },
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const ticket = {
      id: `TKT-${100 + tickets.length + 1}`,
      subject: newTicket.subject,
      priority: newTicket.priority,
      status: "open",
      category: newTicket.category,
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      messages: [
        {
          from: "user",
          text: newTicket.description,
          time: new Date().toLocaleTimeString(),
        },
      ],
    };
    setTickets([ticket, ...tickets]);
    setShowNewTicket(false);
    setNewTicket({
      subject: "",
      category: "",
      priority: "medium",
      description: "",
    });
    setActiveTicket(ticket);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeTicket) return;
    const updatedTickets = tickets.map((t) =>
      t.id === activeTicket.id
        ? {
            ...t,
            messages: [
              ...t.messages,
              {
                from: "user",
                text: newMessage,
                time: new Date().toLocaleTimeString(),
              },
            ],
          }
        : t,
    );
    setTickets(updatedTickets);
    setActiveTicket(updatedTickets.find((t) => t.id === activeTicket.id));
    setNewMessage("");
  };

  return (
    <div className="support-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Support" }]} />
          <h1 className="page-title">Support Center</h1>
          <p className="page-subtitle">Get help from our team</p>
        </div>
      </div>

      <div className="container">
        <div className="support-layout">
          {/* Sidebar */}
          <aside className="support-sidebar">
            <button
              className="btn btn-primary btn-block"
              onClick={() => setShowNewTicket(true)}
            >
              + New Ticket
            </button>

            <div className="support-filters">
              <h4>Filter</h4>
              {["All", "Open", "In Progress", "Resolved"].map((f) => (
                <button key={f} className="support-filter-btn">
                  {f}
                </button>
              ))}
            </div>

            <div className="support-tickets-list">
              <h4>Your Tickets</h4>
              {tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  className={`support-ticket-item ${activeTicket?.id === ticket.id ? "active" : ""}`}
                  onClick={() => setActiveTicket(ticket)}
                >
                  <div className="support-ticket-header">
                    <strong>{ticket.id}</strong>
                    <span
                      className={`badge badge-${ticket.priority === "high" ? "red" : ticket.priority === "medium" ? "yellow" : "gray"}`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="support-ticket-subject">{ticket.subject}</p>
                  <div className="support-ticket-meta">
                    <span>{ticket.status}</span>
                    <span>{ticket.createdAt.split(" ")[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Chat */}
          <main className="support-chat">
            {activeTicket ? (
              <>
                <div className="support-chat-header">
                  <div>
                    <h3>
                      {activeTicket.id} - {activeTicket.subject}
                    </h3>
                    <p>
                      {activeTicket.category} • {activeTicket.createdAt}
                    </p>
                  </div>
                  <span
                    className={`badge badge-${activeTicket.status === "open" ? "blue" : activeTicket.status === "resolved" ? "green" : "yellow"}`}
                  >
                    {activeTicket.status}
                  </span>
                </div>

                <div className="support-chat-body">
                  {activeTicket.messages.map((msg, i) => (
                    <div key={i} className={`support-message ${msg.from}`}>
                      <div className="support-message-avatar">
                        {msg.from === "user" ? "👤" : "👨‍💼"}
                      </div>
                      <div className="support-message-content">
                        <div className="support-message-text">{msg.text}</div>
                        <span className="support-message-time">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="support-chat-input">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="input-field"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleSendMessage}
                  >
                    Send ➤
                  </button>
                </div>
              </>
            ) : (
              <div className="support-empty">
                <div className="support-empty-icon">💬</div>
                <h3>Select a ticket</h3>
                <p>
                  Choose a ticket from the list or create a new one to get
                  started.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div className="modal-overlay" onClick={() => setShowNewTicket(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Ticket</h2>
            <form onSubmit={handleCreateTicket} className="support-new-form">
              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, subject: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, category: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="">Select...</option>
                    <option value="Billing">Billing</option>
                    <option value="Technical">Technical</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, priority: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, description: e.target.value })
                  }
                  className="input-field"
                  rows="5"
                  required
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowNewTicket(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
