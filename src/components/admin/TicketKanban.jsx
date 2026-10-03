import React, { useState, useMemo } from "react";
import {
  FaTicketAlt,
  FaUser,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaPlus,
  FaLightbulb,
  FaTrophy,
  FaSpinner,
  FaEye,
} from "react-icons/fa";
import { adminApi } from "../../api/adminApi";

const TicketKanban = ({ tickets = [] }) => {
  const [localTickets, setLocalTickets] = useState(tickets);
  const [draggedTicket, setDraggedTicket] = useState(null);
  const [toast, setToast] = useState(null);

  // Keep in sync when parent data changes
  React.useEffect(() => {
    setLocalTickets(tickets);
  }, [tickets]);

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ===== Group tickets by mapped status =====
  const grouped = useMemo(() => {
    const groups = { open: [], inprogress: [], review: [], resolved: [] };
    localTickets.forEach((t) => {
      if (t.status === "open") groups.open.push(t);
      else if (t.status === "in-progress") groups.inprogress.push(t);
      else if (t.status === "resolved" || t.status === "closed")
        groups.resolved.push(t);
      else groups.review.push(t);
    });
    return groups;
  }, [localTickets]);

  const columns = [
    {
      id: "open",
      title: "Open",
      color: "#ef4444",
      icon: <FaExclamationTriangle />,
    },
    {
      id: "inprogress",
      title: "In Progress",
      color: "#f59e0b",
      icon: <FaSpinner />,
    },
    { id: "review", title: "Review", color: "#3b82f6", icon: <FaEye /> },
    {
      id: "resolved",
      title: "Resolved",
      color: "#10b981",
      icon: <FaCheckCircle />,
    },
  ];

  const priorityColors = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#10b981",
  };

  const handleDragStart = (ticket, fromColumn) => {
    setDraggedTicket({ ticket, from: fromColumn });
  };

  const handleDrop = async (toColumn) => {
    if (!draggedTicket) return;
    const { ticket, from } = draggedTicket;
    if (from === toColumn) {
      setDraggedTicket(null);
      return;
    }

    // Optimistic update
    const optimistic = localTickets.map((t) =>
      t._id === ticket._id ? { ...t, status: toColumn } : t,
    );
    setLocalTickets(optimistic);

    // Persist to backend
    try {
      const statusMap = {
        open: "open",
        inprogress: "in-progress",
        review: "in-progress",
        resolved: "resolved",
      };
      await adminApi.updateTicket(ticket._id, {
        status: statusMap[toColumn],
      });
      if (toColumn === "resolved") {
        showToast(`Ticket ${ticket.ticketNumber || ticket._id} resolved`);
      } else {
        showToast(`Ticket moved to ${toColumn}`, "info");
      }
    } catch (err) {
      showToast(err.message, "error");
      // Revert on error
      setLocalTickets(tickets);
    }
    setDraggedTicket(null);
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "—";
    const diff = Date.now() - new Date(dateStr).getTime();
    const hrs = Math.floor(diff / 3600000);
    if (hrs < 1) return "just now";
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="admin-dashboard">
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>
            {toast.type === "success" ? <FaCheckCircle /> : <FaLightbulb />}
          </span>
          {toast.message}
        </div>
      )}

      <div className="admin-stats-grid">
        {columns.map((col) => (
          <div key={col.id} className="admin-stat-card">
            <div className="admin-stat-header">
              <span className="admin-stat-icon" style={{ color: col.color }}>
                {col.icon}
              </span>
            </div>
            <div className="admin-stat-value">{grouped[col.id].length}</div>
            <div className="admin-stat-label">{col.title}</div>
          </div>
        ))}
      </div>

      <div className="kanban-info">
        <span>
          <FaLightbulb style={{ marginRight: "0.35rem" }} />
          Tip: Drag and drop tickets between columns to update status
        </span>
        <button className="btn btn-primary btn-sm">
          <FaPlus /> New Ticket
        </button>
      </div>

      <div className="kanban-board">
        {columns.map((column) => (
          <div
            key={column.id}
            className="kanban-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.id)}
          >
            <div className="kanban-column-header">
              <div className="kanban-column-title">
                <span
                  className="kanban-column-dot"
                  style={{ background: column.color }}
                />
                <h3>{column.title}</h3>
                <span className="kanban-column-count">
                  {grouped[column.id].length}
                </span>
              </div>
            </div>

            <div className="kanban-column-body">
              {grouped[column.id].map((ticket) => (
                <div
                  key={ticket._id}
                  className="kanban-card"
                  draggable
                  onDragStart={() => handleDragStart(ticket, column.id)}
                >
                  <div className="kanban-card-header">
                    <span className="ticket-id">
                      <FaTicketAlt style={{ marginRight: "0.3rem" }} />
                      {ticket.ticketNumber || ticket._id?.slice(0, 8)}
                    </span>
                    <span
                      className="ticket-priority-dot"
                      style={{
                        background:
                          priorityColors[ticket.priority] || "#64748b",
                      }}
                      title={`Priority: ${ticket.priority}`}
                    />
                  </div>
                  <p className="kanban-card-title">{ticket.subject}</p>
                  <div className="kanban-card-tags">
                    <span className="kanban-tag">
                      {ticket.category || "General"}
                    </span>
                  </div>
                  <div className="kanban-card-footer">
                    <span className="ticket-user">
                      <FaUser /> {ticket.createdBy?.name || "Unknown"}
                    </span>
                    <span className="ticket-time">
                      <FaClock style={{ marginRight: "0.25rem" }} />
                      {formatTime(ticket.createdAt)}
                    </span>
                  </div>
                </div>
              ))}

              {grouped[column.id].length === 0 && (
                <div className="kanban-empty">
                  <p>Drop tickets here</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketKanban;
