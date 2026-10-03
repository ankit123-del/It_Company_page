import React, { useState, useEffect, useRef } from "react";

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Project Completed",
      message: "E-commerce platform delivered",
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "New Message",
      message: "Sarah sent you a message",
      time: "1h ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Deadline Approaching",
      message: "Healthcare app due in 3 days",
      time: "5h ago",
      read: false,
    },
    {
      id: 4,
      type: "success",
      title: "Payment Received",
      message: "₹5,50,000 from TechCorp",
      time: "1d ago",
      read: true,
    },
  ]);
  const ref = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const iconMap = {
    success: "✅",
    info: "ℹ️",
    warning: "⚠️",
    error: "❌",
  };

  return (
    <div className="notification-center" ref={ref}>
      <button
        className="icon-btn notification-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button className="notification-mark-all" onClick={markAllRead}>
                Mark all read
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty">
                <span>🎉</span>
                <p>All caught up!</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`notification-item ${!n.read ? "unread" : ""}`}
                  onClick={() => markRead(n.id)}
                >
                  <span className={`notification-icon ${n.type}`}>
                    {iconMap[n.type]}
                  </span>
                  <div className="notification-content">
                    <strong>{n.title}</strong>
                    <p>{n.message}</p>
                    <span className="notification-time">{n.time}</span>
                  </div>
                  <button
                    className="notification-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(n.id);
                    }}
                    aria-label="Delete"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="notification-footer">
            <button className="notification-view-all">
              View All Notifications →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
