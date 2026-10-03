import React, { useState } from "react";
import {
  FaSearch,
  FaSave,
  FaEye,
  FaGoogle,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFile,
  FaEdit,
  FaAward,
  FaTimesCircle,
} from "react-icons/fa";

const SEOManager = () => {
  const [pages, setPages] = useState([
    {
      id: 1,
      url: "/",
      title: "SMLAG TechSolutions | #1 IT Company in India",
      description:
        "Leading IT company in India offering web development, mobile apps, cloud solutions.",
      keywords: "IT company, web development, mobile apps",
      score: 92,
    },
    {
      id: 2,
      url: "/services",
      title: "Our Services | SMLAG TechSolutions",
      description: "Explore our comprehensive IT services.",
      keywords: "IT services, software development",
      score: 88,
    },
    {
      id: 3,
      url: "/about",
      title: "About Us | SMLAG TechSolutions",
      description: "Learn about our company, team, and mission.",
      keywords: "about us, IT team",
      score: 85,
    },
    {
      id: 4,
      url: "/contact",
      title: "Contact Us | SMLAG TechSolutions",
      description: "Get in touch with our team.",
      keywords: "contact, IT company",
      score: 78,
    },
  ]);

  const [selected, setSelected] = useState(pages[0]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    setPages(pages.map((p) => (p.id === selected.id ? selected : p)));
    showToast("SEO settings saved!");
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "var(--success)";
    if (score >= 70) return "var(--warning)";
    return "var(--danger)";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    return "Needs Work";
  };

  const avgScore = Math.round(
    pages.reduce((s, p) => s + p.score, 0) / pages.length,
  );
  const excellentCount = pages.filter((p) => p.score >= 90).length;
  const needsWorkCount = pages.filter((p) => p.score < 80).length;

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

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaSearch />
            </span>
          </div>
          <div className="admin-stat-value">{pages.length}</div>
          <div className="admin-stat-label">Pages Indexed</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#4f46e5" }}>
              <FaChartLine />
            </span>
          </div>
          <div className="admin-stat-value">{avgScore}</div>
          <div className="admin-stat-label">Avg Score</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#10b981" }}>
              <FaAward />
            </span>
          </div>
          <div className="admin-stat-value">{excellentCount}</div>
          <div className="admin-stat-label">Excellent Pages</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#f59e0b" }}>
              <FaExclamationTriangle />
            </span>
          </div>
          <div className="admin-stat-value">{needsWorkCount}</div>
          <div className="admin-stat-label">Needs Work</div>
        </div>
      </div>

      <div className="seo-grid">
        {/* Pages List */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>
              <FaFile style={{ marginRight: "0.4rem" }} /> Pages
            </h3>
          </div>
          <div className="seo-pages-list">
            {pages.map((page) => (
              <button
                key={page.id}
                className={`seo-page-item ${
                  selected.id === page.id ? "active" : ""
                }`}
                onClick={() => setSelected(page)}
              >
                <div className="seo-page-info">
                  <strong>{page.url}</strong>
                  <span>{page.title.substring(0, 40)}...</span>
                </div>
                <div
                  className="seo-page-score"
                  style={{ color: getScoreColor(page.score) }}
                >
                  {page.score}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>
              <FaEdit style={{ marginRight: "0.4rem" }} /> Edit SEO
            </h3>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              <FaSave /> Save
            </button>
          </div>

          <div className="admin-form">
            <div className="form-group">
              <label>Page URL</label>
              <input
                type="text"
                className="input-field"
                value={selected.url}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Meta Title</label>
              <input
                type="text"
                className="input-field"
                value={selected.title}
                onChange={(e) =>
                  setSelected({ ...selected, title: e.target.value })
                }
                maxLength="60"
              />
              <small>{selected.title.length}/60 chars</small>
            </div>

            <div className="form-group">
              <label>Meta Description</label>
              <textarea
                className="input-field"
                rows="3"
                value={selected.description}
                onChange={(e) =>
                  setSelected({ ...selected, description: e.target.value })
                }
                maxLength="160"
              />
              <small>{selected.description.length}/160 chars</small>
            </div>

            <div className="form-group">
              <label>Keywords</label>
              <input
                type="text"
                className="input-field"
                value={selected.keywords}
                onChange={(e) =>
                  setSelected({ ...selected, keywords: e.target.value })
                }
              />
            </div>

            {/* Google Preview */}
            <div className="seo-preview">
              <div className="seo-preview-label">
                <FaGoogle style={{ marginRight: "0.35rem" }} />
                Google Preview
              </div>
              <div className="seo-preview-card">
                <div className="seo-preview-url">
                  smlagtech.com{selected.url}
                </div>
                <div className="seo-preview-title">{selected.title}</div>
                <div className="seo-preview-desc">{selected.description}</div>
              </div>
            </div>

            {/* Score */}
            <div className="seo-score-box">
              <div
                className="seo-score-circle"
                style={{ borderColor: getScoreColor(selected.score) }}
              >
                <strong style={{ color: getScoreColor(selected.score) }}>
                  {selected.score}
                </strong>
              </div>
              <div>
                <strong>{getScoreLabel(selected.score)}</strong>
                <p style={{ fontSize: "0.8125rem", color: "var(--gray-600)" }}>
                  {selected.score >= 90
                    ? "Your page is well optimized!"
                    : "Consider improving meta tags."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOManager;
