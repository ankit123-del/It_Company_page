import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";

const SecuritySettings = () => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: "Chrome on MacOS",
      location: "Mumbai, India",
      ip: "192.168.1.1",
      current: true,
      lastActive: "Active now",
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Mumbai, India",
      ip: "192.168.1.5",
      current: false,
      lastActive: "2 hours ago",
    },
    {
      id: 3,
      device: "Firefox on Windows",
      location: "Delhi, India",
      ip: "192.168.1.8",
      current: false,
      lastActive: "3 days ago",
    },
  ]);

  const [ipAllowlist, setIpAllowlist] = useState(["192.168.1.1", "10.0.0.0/8"]);
  const [newIP, setNewIP] = useState("");

  const handleVerify2FA = (e) => {
    e.preventDefault();
    if (verificationCode.length === 6) {
      setTwoFAEnabled(true);
      setShowSetup(false);
      setVerificationCode("");
    }
  };

  const revokeSession = (id) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const addIP = () => {
    if (newIP.trim() && !ipAllowlist.includes(newIP.trim())) {
      setIpAllowlist([...ipAllowlist, newIP.trim()]);
      setNewIP("");
    }
  };

  const removeIP = (ip) => {
    setIpAllowlist(ipAllowlist.filter((i) => i !== ip));
  };

  return (
    <div className="security-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Security Settings" }]} />
          <h1 className="page-title">Security</h1>
          <p className="page-subtitle">Manage your account security</p>
        </div>
      </div>

      <div className="container">
        {/* 2FA Section */}
        <div className="security-card">
          <div className="security-card-header">
            <div className="security-card-title">
              <span className="security-icon">🔐</span>
              <div>
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
              </div>
            </div>
            <span className={`badge badge-${twoFAEnabled ? "green" : "gray"}`}>
              {twoFAEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          {!twoFAEnabled && !showSetup && (
            <button
              className="btn btn-primary"
              onClick={() => setShowSetup(true)}
            >
              Enable 2FA
            </button>
          )}

          {showSetup && (
            <div className="twofa-setup">
              <div className="twofa-steps">
                <div className="twofa-step">
                  <span className="twofa-step-num">1</span>
                  <div>
                    <strong>Install an authenticator app</strong>
                    <p>Download Google Authenticator, Authy, or 1Password</p>
                  </div>
                </div>
                <div className="twofa-step">
                  <span className="twofa-step-num">2</span>
                  <div>
                    <strong>Scan this QR code</strong>
                    <div className="twofa-qr">
                      <div className="twofa-qr-placeholder">
                        <span>▢▢▢▢▢</span>
                        <span>▢ ▢</span>
                        <span>▢ ▢ ▢</span>
                        <span>▢ ▢</span>
                        <span>▢▢▢▢▢</span>
                      </div>
                    </div>
                    <p className="twofa-secret">
                      Or enter manually: <code>JBSWY3DPEHPK3PXP</code>
                    </p>
                  </div>
                </div>
                <div className="twofa-step">
                  <span className="twofa-step-num">3</span>
                  <div>
                    <strong>Enter 6-digit code</strong>
                    <form onSubmit={handleVerify2FA} className="twofa-form">
                      <input
                        type="text"
                        maxLength="6"
                        value={verificationCode}
                        onChange={(e) =>
                          setVerificationCode(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="000000"
                        className="twofa-input"
                      />
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={verificationCode.length !== 6}
                      >
                        Verify & Enable
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setShowSetup(false)}
              >
                Cancel
              </button>
            </div>
          )}

          {twoFAEnabled && (
            <button
              className="btn btn-outline"
              onClick={() => setTwoFAEnabled(false)}
            >
              Disable 2FA
            </button>
          )}
        </div>

        {/* Active Sessions */}
        <div className="security-card">
          <div className="security-card-header">
            <div className="security-card-title">
              <span className="security-icon">💻</span>
              <div>
                <h3>Active Sessions</h3>
                <p>{sessions.length} devices currently logged in</p>
              </div>
            </div>
          </div>

          <div className="sessions-list">
            {sessions.map((session) => (
              <div key={session.id} className="session-item">
                <span className="session-icon">
                  {session.device.includes("iPhone") ? "📱" : "💻"}
                </span>
                <div className="session-info">
                  <strong>
                    {session.device}
                    {session.current && (
                      <span className="session-current">Current</span>
                    )}
                  </strong>
                  <span>
                    {session.location} • {session.ip} • {session.lastActive}
                  </span>
                </div>
                {!session.current && (
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => revokeSession(session.id)}
                    style={{ color: "var(--danger)" }}
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* IP Allowlist */}
        <div className="security-card">
          <div className="security-card-header">
            <div className="security-card-title">
              <span className="security-icon">🌐</span>
              <div>
                <h3>IP Allowlist</h3>
                <p>Restrict access to specific IP addresses</p>
              </div>
            </div>
          </div>

          <div className="ip-list">
            {ipAllowlist.map((ip, i) => (
              <div key={i} className="ip-item">
                <code>{ip}</code>
                <button className="icon-btn-sm" onClick={() => removeIP(ip)}>
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="ip-add">
            <input
              type="text"
              placeholder="Enter IP or CIDR (e.g., 192.168.1.1)"
              value={newIP}
              onChange={(e) => setNewIP(e.target.value)}
              className="input-field"
            />
            <button className="btn btn-primary" onClick={addIP}>
              Add IP
            </button>
          </div>
        </div>

        {/* Login Activity */}
        <div className="security-card">
          <div className="security-card-header">
            <div className="security-card-title">
              <span className="security-icon">📊</span>
              <div>
                <h3>Recent Login Activity</h3>
                <p>Last 10 login attempts</p>
              </div>
            </div>
          </div>

          <div className="login-activity">
            {[
              {
                time: "2024-10-16 14:30",
                location: "Mumbai, India",
                status: "success",
                device: "Chrome/Mac",
              },
              {
                time: "2024-10-16 09:15",
                location: "Mumbai, India",
                status: "success",
                device: "iPhone",
              },
              {
                time: "2024-10-15 22:00",
                location: "Unknown",
                status: "failed",
                device: "Unknown",
              },
              {
                time: "2024-10-15 18:20",
                location: "Delhi, India",
                status: "success",
                device: "Firefox/Win",
              },
            ].map((log, i) => (
              <div key={i} className="login-log">
                <span className={`login-log-status ${log.status}`}>
                  {log.status === "success" ? "✅" : "❌"}
                </span>
                <div>
                  <strong>{log.device}</strong>
                  <span>
                    {log.location} • {log.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
