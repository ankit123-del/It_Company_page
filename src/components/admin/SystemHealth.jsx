import React, { useState, useEffect } from "react";
import {
  FaServer,
  FaDatabase,
  FaHdd,
  FaMemory,
  FaMicrochip,
  FaWifi,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSync,
} from "react-icons/fa";

const SystemHealth = () => {
  const [health, setHealth] = useState({
    api: { status: "online", responseTime: 45, uptime: 99.9 },
    database: { status: "online", size: 2.4, records: 1247 },
    storage: { used: 45, total: 100, files: 234 },
    memory: { used: 62, total: 100 },
    cpu: { usage: 34, cores: 4 },
    network: { latency: 12, bandwidth: 89 },
  });

  const [loading, setLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHealth((prev) => ({
        ...prev,
        api: { ...prev.api, responseTime: Math.floor(Math.random() * 30) + 30 },
        memory: { ...prev.memory, used: Math.floor(Math.random() * 20) + 50 },
        cpu: { ...prev.cpu, usage: Math.floor(Math.random() * 30) + 20 },
        network: {
          ...prev.network,
          latency: Math.floor(Math.random() * 10) + 8,
        },
      }));
      setLastCheck(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLastCheck(new Date());
    }, 1000);
  };

  const getStatusColor = (value, warning = 70, danger = 90) => {
    if (value >= danger) return "var(--danger)";
    if (value >= warning) return "var(--warning)";
    return "var(--success)";
  };

  const getStatusIcon = (status) => {
    return status === "online" ? <FaCheckCircle /> : <FaExclamationTriangle />;
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="health-header">
        <div>
          <h3 style={{ margin: 0 }}>🖥️ System Health Monitor</h3>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--gray-500)",
              margin: "0.25rem 0 0 0",
            }}
          >
            Last checked: {lastCheck.toLocaleTimeString()}
          </p>
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleRefresh}
          disabled={loading}
        >
          <FaSync /> {loading ? "Checking..." : "Refresh"}
        </button>
      </div>

      {/* Status Cards */}
      <div className="health-grid">
        {/* API Status */}
        <div className="admin-card health-card">
          <div className="health-card-header">
            <div
              className="health-icon"
              style={{ background: "#eef2ff", color: "#4f46e5" }}
            >
              <FaServer />
            </div>
            <div>
              <h4>API Server</h4>
              <span
                className={`health-status health-status-${health.api.status}`}
              >
                {getStatusIcon(health.api.status)} {health.api.status}
              </span>
            </div>
          </div>
          <div className="health-metrics">
            <div className="health-metric">
              <span>Response Time</span>
              <strong
                style={{
                  color: getStatusColor(health.api.responseTime, 100, 500),
                }}
              >
                {health.api.responseTime}ms
              </strong>
            </div>
            <div className="health-metric">
              <span>Uptime</span>
              <strong>{health.api.uptime}%</strong>
            </div>
          </div>
        </div>

        {/* Database */}
        <div className="admin-card health-card">
          <div className="health-card-header">
            <div
              className="health-icon"
              style={{ background: "#dbeafe", color: "#2563eb" }}
            >
              <FaDatabase />
            </div>
            <div>
              <h4>Database</h4>
              <span
                className={`health-status health-status-${health.database.status}`}
              >
                {getStatusIcon(health.database.status)} {health.database.status}
              </span>
            </div>
          </div>
          <div className="health-metrics">
            <div className="health-metric">
              <span>Size</span>
              <strong>{health.database.size} MB</strong>
            </div>
            <div className="health-metric">
              <span>Records</span>
              <strong>{health.database.records.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Storage */}
        <div className="admin-card health-card">
          <div className="health-card-header">
            <div
              className="health-icon"
              style={{ background: "#f0fdf4", color: "#10b981" }}
            >
              <FaHdd />
            </div>
            <div>
              <h4>Storage</h4>
              <span className="health-status health-status-online">
                <FaCheckCircle /> {health.storage.used}% used
              </span>
            </div>
          </div>
          <div className="health-progress">
            <div className="health-progress-bar">
              <div
                className="health-progress-fill"
                style={{
                  width: `${health.storage.used}%`,
                  background: getStatusColor(health.storage.used),
                }}
              />
            </div>
            <div className="health-progress-info">
              <span>{health.storage.used} GB used</span>
              <span>{health.storage.total} GB total</span>
            </div>
          </div>
          <div className="health-metric" style={{ marginTop: "0.75rem" }}>
            <span>Total Files</span>
            <strong>{health.storage.files}</strong>
          </div>
        </div>

        {/* Memory */}
        <div className="admin-card health-card">
          <div className="health-card-header">
            <div
              className="health-icon"
              style={{ background: "#fff7ed", color: "#f59e0b" }}
            >
              <FaMemory />
            </div>
            <div>
              <h4>Memory</h4>
              <span
                className="health-status"
                style={{ color: getStatusColor(health.memory.used) }}
              >
                {health.memory.used}% used
              </span>
            </div>
          </div>
          <div className="health-progress">
            <div className="health-progress-bar">
              <div
                className="health-progress-fill"
                style={{
                  width: `${health.memory.used}%`,
                  background: getStatusColor(health.memory.used),
                }}
              />
            </div>
          </div>
        </div>

        {/* CPU */}
        <div className="admin-card health-card">
          <div className="health-card-header">
            <div
              className="health-icon"
              style={{ background: "#fef3c7", color: "#d97706" }}
            >
              <FaMicrochip />
            </div>
            <div>
              <h4>CPU</h4>
              <span
                className="health-status"
                style={{ color: getStatusColor(health.cpu.usage) }}
              >
                {health.cpu.usage}% usage
              </span>
            </div>
          </div>
          <div className="health-progress">
            <div className="health-progress-bar">
              <div
                className="health-progress-fill"
                style={{
                  width: `${health.cpu.usage}%`,
                  background: getStatusColor(health.cpu.usage),
                }}
              />
            </div>
          </div>
          <div className="health-metric" style={{ marginTop: "0.75rem" }}>
            <span>Cores</span>
            <strong>{health.cpu.cores}</strong>
          </div>
        </div>

        {/* Network */}
        <div className="admin-card health-card">
          <div className="health-card-header">
            <div
              className="health-icon"
              style={{ background: "#f3e8ff", color: "#8b5cf6" }}
            >
              <FaWifi />
            </div>
            <div>
              <h4>Network</h4>
              <span className="health-status health-status-online">
                <FaCheckCircle /> Connected
              </span>
            </div>
          </div>
          <div className="health-metrics">
            <div className="health-metric">
              <span>Latency</span>
              <strong
                style={{
                  color: getStatusColor(health.network.latency, 50, 100),
                }}
              >
                {health.network.latency}ms
              </strong>
            </div>
            <div className="health-metric">
              <span>Bandwidth</span>
              <strong>{health.network.bandwidth}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* System Logs */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>📋 System Logs</h3>
        </div>
        <div className="health-logs">
          {[
            {
              time: "10:32:45",
              level: "info",
              message: "Server started successfully",
            },
            {
              time: "10:33:12",
              level: "success",
              message: "Database connected",
            },
            {
              time: "10:35:23",
              level: "warning",
              message: "High memory usage detected (62%)",
            },
            {
              time: "10:36:01",
              level: "info",
              message: "Visitor tracking active",
            },
            {
              time: "10:38:45",
              level: "success",
              message: "Auto-backup completed",
            },
          ].map((log, i) => (
            <div key={i} className={`health-log health-log-${log.level}`}>
              <span className="health-log-time">{log.time}</span>
              <span
                className={`health-log-badge health-log-badge-${log.level}`}
              >
                {log.level.toUpperCase()}
              </span>
              <span className="health-log-message">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
