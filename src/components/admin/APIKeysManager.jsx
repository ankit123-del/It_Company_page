import React, { useState } from "react";
import {
  FaKey,
  FaCopy,
  FaTrash,
  FaPlus,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaLock,
  FaBan,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const APIKeysManager = () => {
  const [keys, setKeys] = useState([
    {
      id: 1,
      name: "Production API",
      key: "smlag_live_prod_a1b2c3d4e5f6g7h8",
      created: "2024-08-15",
      lastUsed: "2 min ago",
      scopes: ["read", "write"],
      status: "active",
    },
    {
      id: 2,
      name: "Staging API",
      key: "smlag_test_stg_i9j8k7l6m5n4o3p2",
      created: "2024-09-01",
      lastUsed: "1 hour ago",
      scopes: ["read", "write"],
      status: "active",
    },
    {
      id: 3,
      name: "Mobile App",
      key: "smlag_live_mob_q1r2s3t4u5v6w7x8",
      created: "2024-09-20",
      lastUsed: "5 min ago",
      scopes: ["read"],
      status: "active",
    },
    {
      id: 4,
      name: "Old Integration",
      key: "smlag_test_old_y9z8a7b6c5d4e3f2",
      created: "2024-05-10",
      lastUsed: "30 days ago",
      scopes: ["read"],
      status: "revoked",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [revealedKeys, setRevealedKeys] = useState({});
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ name: "", scopes: ["read"] });
  const [generatedKey, setGeneratedKey] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleReveal = (id) => setRevealedKeys((p) => ({ ...p, [id]: !p[id] }));

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard!");
  };

  const maskKey = (key) =>
    `${key.slice(0, 12)}${"•".repeat(20)}${key.slice(-4)}`;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.name) {
      showToast("Name required", "error");
      return;
    }

    const newKey = `smlag_live_${Math.random().toString(36).substr(2, 24)}`;
    const newEntry = {
      id: keys.length + 1,
      name: form.name,
      key: newKey,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
      scopes: form.scopes,
      status: "active",
    };

    setKeys([newEntry, ...keys]);
    setGeneratedKey(newKey);
    showToast("API Key generated!");
  };

  const handleRevoke = (id) => {
    if (window.confirm("Revoke this key? This action cannot be undone.")) {
      setKeys(keys.map((k) => (k.id === id ? { ...k, status: "revoked" } : k)));
      showToast("Key revoked", "info");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this key?")) {
      setKeys(keys.filter((k) => k.id !== id));
      showToast("Key deleted", "info");
    }
  };

  const activeCount = keys.filter((k) => k.status === "active").length;
  const revokedCount = keys.filter((k) => k.status === "revoked").length;
  const uniqueScopes = new Set(keys.flatMap((k) => k.scopes)).size;

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

      {/* Info Banner */}
      <div className="api-info-banner">
        <span className="api-info-icon">
          <FaLock />
        </span>
        <div>
          <strong>Keep your API keys secure</strong>
          <p>
            Never share your API keys publicly. Rotate keys regularly for
            security.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#4f46e5" }}>
              <FaKey />
            </span>
          </div>
          <div className="admin-stat-value">{keys.length}</div>
          <div className="admin-stat-label">Total Keys</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#10b981" }}>
              <FaCheckCircle />
            </span>
          </div>
          <div className="admin-stat-value">{activeCount}</div>
          <div className="admin-stat-label">Active</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#ef4444" }}>
              <FaBan />
            </span>
          </div>
          <div className="admin-stat-value">{revokedCount}</div>
          <div className="admin-stat-label">Revoked</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#8b5cf6" }}>
              <FaShieldAlt />
            </span>
          </div>
          <div className="admin-stat-value">{uniqueScopes}</div>
          <div className="admin-stat-label">Unique Scopes</div>
        </div>
      </div>

      {/* Keys list */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>
            <FaKey style={{ marginRight: "0.4rem" }} /> API Keys
          </h3>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowCreateModal(true)}
          >
            <FaPlus /> Generate Key
          </button>
        </div>

        <div className="api-keys-list">
          {keys.map((key) => (
            <div
              key={key.id}
              className={`api-key-card ${
                key.status === "revoked" ? "revoked" : ""
              }`}
            >
              <div className="api-key-header">
                <div>
                  <h4>{key.name}</h4>
                  <span
                    className={`badge badge-${
                      key.status === "active" ? "green" : "gray"
                    }`}
                  >
                    {key.status}
                  </span>
                </div>
                <div className="api-key-actions">
                  {key.status === "active" && (
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleRevoke(key.id)}
                      style={{
                        color: "var(--danger)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      <FaBan /> Revoke
                    </button>
                  )}
                  <button
                    className="icon-btn-sm"
                    onClick={() => handleDelete(key.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="api-key-value">
                <code>{revealedKeys[key.id] ? key.key : maskKey(key.key)}</code>
                <button
                  className="icon-btn-sm"
                  onClick={() => toggleReveal(key.id)}
                  title={revealedKeys[key.id] ? "Hide" : "Reveal"}
                >
                  {revealedKeys[key.id] ? <FaEyeSlash /> : <FaEye />}
                </button>
                <button
                  className="icon-btn-sm"
                  onClick={() => copyToClipboard(key.key)}
                  title="Copy"
                >
                  <FaCopy />
                </button>
              </div>

              <div className="api-key-meta">
                <div>
                  <span className="api-key-meta-label">Created</span>
                  <span>{key.created}</span>
                </div>
                <div>
                  <span className="api-key-meta-label">Last Used</span>
                  <span>{key.lastUsed}</span>
                </div>
                <div>
                  <span className="api-key-meta-label">Scopes</span>
                  <div className="api-scopes">
                    {key.scopes.map((s, i) => (
                      <span key={i} className="api-scope">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {keys.length === 0 && (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "var(--gray-500)",
              }}
            >
              No API keys yet
            </div>
          )}
        </div>
      </div>

      {/* Create modal */}
      {showCreateModal && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowCreateModal(false);
            setGeneratedKey(null);
          }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {generatedKey ? (
              <div className="api-generated">
                <div
                  className="api-generated-icon"
                  style={{ color: "var(--success)" }}
                >
                  <FaCheckCircle />
                </div>
                <h2>API Key Generated!</h2>
                <p>Save this key now. You won't be able to see it again.</p>
                <div className="api-generated-key">
                  <code>{generatedKey}</code>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => copyToClipboard(generatedKey)}
                  >
                    <FaCopy /> Copy
                  </button>
                </div>
                <button
                  className="btn btn-outline btn-block"
                  onClick={() => {
                    setShowCreateModal(false);
                    setGeneratedKey(null);
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FaKey />
                    Generate New API Key
                  </h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "1.25rem",
                      cursor: "pointer",
                      color: "var(--gray-500)",
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="api-create-form">
                  <div className="form-group">
                    <label>Key Name *</label>
                    <input
                      type="text"
                      className="input-field"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="e.g., Production API"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Scopes</label>
                    <div className="api-scope-selector">
                      {["read", "write", "delete", "admin"].map((scope) => (
                        <label key={scope} className="api-scope-option">
                          <input
                            type="checkbox"
                            checked={form.scopes.includes(scope)}
                            onChange={(e) => {
                              if (e.target.checked)
                                setForm({
                                  ...form,
                                  scopes: [...form.scopes, scope],
                                });
                              else
                                setForm({
                                  ...form,
                                  scopes: form.scopes.filter(
                                    (s) => s !== scope,
                                  ),
                                });
                            }}
                          />
                          <span>{scope}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setShowCreateModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Generate Key
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default APIKeysManager;
