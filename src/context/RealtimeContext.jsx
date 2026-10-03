import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const RealtimeContext = createContext();

export const RealtimeProvider = ({ children }) => {
  const [connected, setConnected] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [listeners] = useState(() => new Map());

  // Simulate WebSocket connection
  useEffect(() => {
    setConnected(true);
    const interval = setInterval(() => {
      // Simulate incoming real-time events
      const events = [
        {
          type: "project.updated",
          message: 'Project "E-commerce" was updated',
          user: "Sarah W.",
        },
        {
          type: "ticket.created",
          message: "New support ticket received",
          user: "System",
        },
        {
          type: "payment.received",
          message: "Payment of ₹50,000 received",
          user: "Stripe",
        },
        {
          type: "user.joined",
          message: "New team member joined",
          user: "HR System",
        },
        {
          type: "deploy.success",
          message: "Production deployment successful",
          user: "CI/CD",
        },
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      const notif = {
        id: Date.now(),
        ...randomEvent,
        time: new Date().toISOString(),
        read: false,
      };
      setNotifications((prev) => [notif, ...prev].slice(0, 50));

      // Notify listeners
      listeners.forEach((cb) => cb(notif));
    }, 15000);

    return () => clearInterval(interval);
  }, [listeners]);

  const subscribe = useCallback(
    (eventType, callback) => {
      const id = Date.now() + Math.random();
      listeners.set(id, (notif) => {
        if (eventType === "*" || notif.type === eventType) {
          callback(notif);
        }
      });
      return () => listeners.delete(id);
    },
    [listeners],
  );

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const clearAll = () => setNotifications([]);

  const value = {
    connected,
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    subscribe,
    markAsRead,
    clearAll,
  };

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => {
  const ctx = useContext(RealtimeContext);
  if (!ctx) throw new Error("useRealtime must be used within RealtimeProvider");
  return ctx;
};
