import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaLock,
  FaBan,
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaCheckCircle,
} from "react-icons/fa";

const APIKeys = () => {
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
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScopes, setNewKeyScopes] = useState(["read"]);
  const [generatedKey, setGeneratedKey] = useState(null);
  const [revealedKeys, setRevealedKeys] = useState({});

  const toggleReveal = (id) => {
    setRevealedKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newKey = {
      id: keys.length + 1,
      name: newKeyName,
      key: `smlag_live_${Math.random().toString(36).substr(2, 24)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
      scopes: newKeyScopes,
      status: "active",
    };
    setKeys([newKey, ...keys]);
    setGeneratedKey(newKey.key);
  };

  const revokeKey = (id) => {
    if (
      window.confirm(
        "Are you sure you want to revoke this key? This action cannot be undone.",
      )
    ) {
      setKeys((prev) =>
        prev.map((k) => (k.id === id ? { ...k, status: "revoked" } : k)),
      );
    }
  };

  const maskKey = (key) =>
    `${key.slice(0, 12)}${"•".repeat(20)}${key.slice(-4)}`;

  return (
    <div className="api-keys-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "API Keys" }]} />
          <h1 className="page-title">API Keys Management</h1>
          <p className="page-subtitle">
            Manage your API credentials and access
          </p>
        </div>
      </div>

      <div className="container">
        {/* Info Banner */}
        <div className="api-info-banner">
          <span className="api-info-icon">
            <FaLock />
          </span>
          <div>
            <strong>Keep your API keys secure</strong>
            <p>
              Never share your API keys publicly or commit them to version
              control. Rotate keys regularly.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="api-toolbar">
          <h3>Your API Keys ({keys.length})</h3>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            + Generate New Key
          </button>
        </div>

        {/* Keys List */}
        <div className="api-keys-list">
          {keys.map((key) => (
            <div
              key={key.id}
              className={`api-key-card ${key.status === "revoked" ? "revoked" : ""}`}
            >
              <div className="api-key-header">
                <div>
                  <h4>{key.name}</h4>
                  <span
                    className={`badge badge-${key.status === "active" ? "green" : "gray"}`}
                  >
                    {key.status}
                  </span>
                </div>
                <div className="api-key-actions">
                  {key.status === "active" && (
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => revokeKey(key.id)}
                      style={{ color: "var(--danger)" }}
                    >
                      <FaBan /> Revoke
                    </button>
                  )}
                </div>
              </div>

              <div className="api-key-value">
                <code>{revealedKeys[key.id] ? key.key : maskKey(key.key)}</code>
                <button
                  className="icon-btn-sm"
                  onClick={() => toggleReveal(key.id)}
                  title="Toggle visibility"
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
        </div>
      </div>

      {/* Create Modal */}
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
                <div className="api-generated-icon">
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
                    setNewKeyName("");
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h2>Generate New API Key</h2>
                <form onSubmit={handleCreate} className="api-create-form">
                  <div className="form-group">
                    <label>Key Name *</label>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="input-field"
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
                            checked={newKeyScopes.includes(scope)}
                            onChange={(e) => {
                              if (e.target.checked)
                                setNewKeyScopes([...newKeyScopes, scope]);
                              else
                                setNewKeyScopes(
                                  newKeyScopes.filter((s) => s !== scope),
                                );
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

export default APIKeys;
