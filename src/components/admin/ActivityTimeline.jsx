import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUserPlus,
  FaFileInvoice,
  FaMoneyBillWave,
  FaTicketAlt,
  FaUpload,
  FaSignInAlt,
  FaEye,
} from "react-icons/fa";

const ActivityTimeline = () => {
  const [activities] = useState([
    {
      id: 1,
      type: "user_created",
      user: "Admin",
      message: "Created new user: John Doe",
      time: "2 min ago",
      date: "Today",
    },
    {
      id: 2,
      type: "project_created",
      user: "Sarah W.",
      message: "Created project: E-commerce Platform",
      time: "15 min ago",
      date: "Today",
    },
    {
      id: 3,
      type: "invoice_paid",
      user: "System",
      message: "Invoice INV-2024-001 paid: ₹2,95,000",
      time: "1 hour ago",
      date: "Today",
    },
    {
      id: 4,
      type: "ticket_resolved",
      user: "Mike B.",
      message: "Resolved ticket TKT-104",
      time: "2 hours ago",
      date: "Today",
    },
    {
      id: 5,
      type: "file_uploaded",
      user: "Admin",
      message: "Uploaded file: hero-image.jpg",
      time: "3 hours ago",
      date: "Today",
    },
    {
      id: 6,
      type: "user_login",
      user: "Emily D.",
      message: "Logged in from Chrome/Win",
      time: "4 hours ago",
      date: "Today",
    },
    {
      id: 7,
      type: "project_updated",
      user: "Sarah W.",
      message: "Updated project: Mobile App",
      time: "5 hours ago",
      date: "Today",
    },
    {
      id: 8,
      type: "user_created",
      user: "Admin",
      message: "Created user: Priya Sharma",
      time: "1 day ago",
      date: "Yesterday",
    },
    {
      id: 9,
      type: "invoice_created",
      user: "Admin",
      message: "Created invoice INV-2024-002",
      time: "1 day ago",
      date: "Yesterday",
    },
    {
      id: 10,
      type: "delete",
      user: "Admin",
      message: "Deleted old project: Legacy System",
      time: "2 days ago",
      date: "2 days ago",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const getActivityIcon = (type) => {
    const icons = {
      user_created: { icon: <FaUserPlus />, color: "#4f46e5", bg: "#eef2ff" },
      user_login: { icon: <FaSignInAlt />, color: "#10b981", bg: "#f0fdf4" },
      project_created: { icon: <FaPlus />, color: "#2563eb", bg: "#dbeafe" },
      project_updated: { icon: <FaEdit />, color: "#f59e0b", bg: "#fff7ed" },
      invoice_paid: {
        icon: <FaMoneyBillWave />,
        color: "#10b981",
        bg: "#f0fdf4",
      },
      invoice_created: {
        icon: <FaFileInvoice />,
        color: "#8b5cf6",
        bg: "#f3e8ff",
      },
      ticket_resolved: {
        icon: <FaTicketAlt />,
        color: "#06b6d4",
        bg: "#cffafe",
      },
      file_uploaded: { icon: <FaUpload />, color: "#d97706", bg: "#fef3c7" },
      delete: { icon: <FaTrash />, color: "#ef4444", bg: "#fef2f2" },
    };
    return icons[type] || icons.project_created;
  };

  const getFilteredActivities = () => {
    if (filter === "all") return activities;
    if (filter === "users")
      return activities.filter((a) => a.type.includes("user"));
    if (filter === "projects")
      return activities.filter((a) => a.type.includes("project"));
    if (filter === "invoices")
      return activities.filter((a) => a.type.includes("invoice"));
    if (filter === "tickets")
      return activities.filter((a) => a.type.includes("ticket"));
    return activities;
  };

  const filtered = getFilteredActivities();

  // Group by date
  const grouped = filtered.reduce((acc, activity) => {
    const date = activity.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(activity);
    return acc;
  }, {});

  return (
    <div className="admin-dashboard">
      {/* Filters */}
      <div className="timeline-filters">
        {[
          { id: "all", label: "All Activity", icon: <FaEye /> },
          { id: "users", label: "Users", icon: <FaUserPlus /> },
          { id: "projects", label: "Projects", icon: <FaPlus /> },
          { id: "invoices", label: "Invoices", icon: <FaFileInvoice /> },
          { id: "tickets", label: "Tickets", icon: <FaTicketAlt /> },
        ].map((f) => (
          <button
            key={f.id}
            className={`filter-btn ${filter === f.id ? "active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>📅 Activity Timeline</h3>
          <span className="badge badge-blue">{filtered.length} activities</span>
        </div>

        <div className="timeline-wrapper">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date} className="timeline-group">
              <div className="timeline-date-divider">
                <span>{date}</span>
              </div>
              {items.map((activity) => {
                const config = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="timeline-item">
                    <div
                      className="timeline-icon"
                      style={{ background: config.bg, color: config.color }}
                    >
                      {config.icon}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>{activity.user}</strong>
                        <span className="timeline-time">{activity.time}</span>
                      </div>
                      <p className="timeline-message">{activity.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {filtered.length === 0 && (
            <div
              className="empty-state"
              style={{ padding: "3rem", textAlign: "center" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
              <h3>No activities found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
