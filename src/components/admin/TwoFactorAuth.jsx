import React, { useState } from "react";
import {
  FaShieldAlt,
  FaQrcode,
  FaCheck,
  FaLock,
  FaMobile,
  FaKey,
  FaDesktop,
  FaTrash,
} from "react-icons/fa";

const TwoFactorAuth = () => {
  const [enabled, setEnabled] = useState(false);
  const [setupStep, setSetupStep] = useState(0);
  const [verificationCode, setVerificationCode] = useState("");
  const [toast, setToast] = useState(null);

  const [backupCodes] = useState([
    "A1B2-C3D4",
    "E5F6-G7H8",
    "I9J0-K1L2",
    "M3N4-O5P6",
    "Q7R8-S9T0",
    "U1V2-W3X4",
    "Y5Z6-A7B8",
    "C9D0-E1F2",
  ]);

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

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      setEnabled(true);
      setSetupStep(0);
      setVerificationCode("");
      showToast("2FA enabled successfully!");
    } else {
      showToast("Enter 6-digit code", "error");
    }
  };

  const revokeSession = (id) => {
    if (window.confirm("Revoke this session?")) {
      setSessions(sessions.filter((s) => s.id !== id));
      showToast("Session revoked", "info");
    }
  };

  return (
    <div className="admin-dashboard">
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>{toast.type === "success" ? "✅" : "❌"}</span>
          {toast.message}
        </div>
      )}

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span
              className="admin-stat-icon"
              style={{ color: enabled ? "var(--success)" : "var(--warning)" }}
            >
              <FaShieldAlt />
            </span>
          </div>
          <div className="admin-stat-value">{enabled ? "ON" : "OFF"}</div>
          <div className="admin-stat-label">2FA Status</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaDesktop />
            </span>
          </div>
          <div className="admin-stat-value">{sessions.length}</div>
          <div className="admin-stat-label">Active Sessions</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaKey />
            </span>
          </div>
          <div className="admin-stat-value">{backupCodes.length}</div>
          <div className="admin-stat-label">Backup Codes</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span
              className="admin-stat-icon"
              style={{ color: "var(--success)" }}
            >
              ✅
            </span>
          </div>
          <div className="admin-stat-value">Strong</div>
          <div className="admin-stat-label">Security Level</div>
        </div>
      </div>

      {/* 2FA Setup */}
      <div className="admin-card">
        <div className="security-card-header">
          <div className="security-card-title">
            <span className="security-icon">
              <FaLock />
            </span>
            <div>
              <h3>Two-Factor Authentication</h3>
              <p>Add an extra layer of security to your account</p>
            </div>
          </div>
          <span className={`badge badge-${enabled ? "green" : "gray"}`}>
            {enabled ? "Enabled" : "Disabled"}
          </span>
        </div>

        {!enabled && setupStep === 0 && (
          <div className="twofa-start">
            <div className="twofa-info">
              <FaMobile style={{ fontSize: "3rem", color: "var(--primary)" }} />
              <h4>Setup 2FA in 3 easy steps</h4>
              <ol className="twofa-steps-list">
                <li>
                  Install an authenticator app (Google Authenticator, Authy,
                  etc.)
                </li>
                <li>Scan the QR code</li>
                <li>Enter the 6-digit code</li>
              </ol>
            </div>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setSetupStep(1)}
            >
              <FaShieldAlt /> Enable 2FA
            </button>
          </div>
        )}

        {!enabled && setupStep === 1 && (
          <div className="twofa-qr-section">
            <h4>Step 1: Scan QR Code</h4>
            <div className="twofa-qr">
              <div className="twofa-qr-code">
                <div className="twofa-qr-pattern">
                  ⬛⬜⬛⬜⬛
                  <br />
                  ⬜⬛⬜⬛⬜
                  <br />
                  ⬛⬜⬛⬜⬛
                  <br />
                  ⬜⬛⬜⬛⬜
                  <br />
                  ⬛⬜⬛⬜⬛
                </div>
              </div>
            </div>
            <p className="twofa-secret-text">
              Or enter manually: <code>JBSWY3DPEHPK3PXP</code>
            </p>
            <button className="btn btn-primary" onClick={() => setSetupStep(2)}>
              Next →
            </button>
          </div>
        )}

        {!enabled && setupStep === 2 && (
          <div className="twofa-verify">
            <h4>Step 2: Enter Verification Code</h4>
            <p>Enter the 6-digit code from your authenticator app</p>
            <div className="twofa-input-wrapper">
              <input
                type="text"
                maxLength="6"
                className="twofa-input"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(e.target.value.replace(/\D/g, ""))
                }
                placeholder="000000"
              />
            </div>
            <div className="twofa-actions">
              <button
                className="btn btn-outline"
                onClick={() => setSetupStep(1)}
              >
                ← Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleVerify}
                disabled={verificationCode.length !== 6}
              >
                <FaCheck /> Verify & Enable
              </button>
            </div>
          </div>
        )}

        {enabled && (
          <div className="twofa-enabled">
            <div className="twofa-success">
              <FaCheck style={{ fontSize: "2rem", color: "var(--success)" }} />
              <div>
                <strong>2FA is enabled</strong>
                <p>Your account is protected with two-factor authentication.</p>
              </div>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm("Disable 2FA?")) setEnabled(false);
              }}
            >
              Disable 2FA
            </button>
          </div>
        )}
      </div>

      {/* Backup Codes */}
      {enabled && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>🔑 Backup Codes</h3>
            <button className="btn btn-outline btn-sm">Regenerate</button>
          </div>
          <p
            style={{
              color: "var(--gray-600)",
              marginBottom: "1rem",
              fontSize: "0.875rem",
            }}
          >
            Save these backup codes in a safe place. Each code can be used once.
          </p>
          <div className="backup-codes-grid">
            {backupCodes.map((code, i) => (
              <div key={i} className="backup-code">
                {code}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Sessions */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>💻 Active Sessions</h3>
          <button className="btn btn-danger btn-sm">Revoke All Others</button>
        </div>
        <div className="sessions-list">
          {sessions.map((session) => (
            <div key={session.id} className="session-item">
              <span className="session-icon">
                {session.device.includes("iPhone") ? (
                  <FaMobile />
                ) : (
                  <FaDesktop />
                )}
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
    </div>
  );
};

export default TwoFactorAuth;
