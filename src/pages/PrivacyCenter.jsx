import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaLock,
  FaCookieBite,
  FaChartBar,
  FaCalendarAlt,
  FaFileAlt,
  FaDownload,
  FaTrash,
  FaClipboardList,
  FaFileContract,
  FaBalanceScale,
} from "react-icons/fa";

const PrivacyCenter = () => {
  const [consents, setConsents] = useState({
    marketing: true,
    analytics: true,
    personalization: false,
    thirdParty: false,
  });

  const [exportStatus, setExportStatus] = useState(null);

  const handleExport = () => {
    setExportStatus("preparing");
    setTimeout(() => setExportStatus("ready"), 2000);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure? This will permanently delete all your data. This action cannot be undone.",
      )
    ) {
      alert(
        "Deletion request submitted. You will receive an email confirmation.",
      );
    }
  };

  return (
    <div className="privacy-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Privacy Center" }]} />
          <h1 className="page-title">
            <FaLock /> Privacy & Data
          </h1>
          <p className="page-subtitle">
            Manage your privacy and data preferences
          </p>
        </div>
      </div>

      <div className="container">
        {/* Consent Preferences */}
        <div className="privacy-card">
          <div className="privacy-card-header">
            <span className="privacy-icon">
              <FaCookieBite />
            </span>
            <div>
              <h3>Consent Preferences</h3>
              <p>Control how we use your data</p>
            </div>
          </div>
          <div className="consent-list">
            {[
              {
                key: "marketing",
                label: "Marketing Communications",
                desc: "Receive emails about products, offers, and news",
              },
              {
                key: "analytics",
                label: "Analytics & Performance",
                desc: "Help us improve by sharing anonymous usage data",
              },
              {
                key: "personalization",
                label: "Personalization",
                desc: "Get personalized recommendations and content",
              },
              {
                key: "thirdParty",
                label: "Third-party Sharing",
                desc: "Share data with our trusted partners",
              },
            ].map((item) => (
              <div key={item.key} className="consent-item">
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.desc}</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={consents[item.key]}
                    onChange={(e) =>
                      setConsents({ ...consents, [item.key]: e.target.checked })
                    }
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ))}
          </div>
          <button className="btn btn-primary">Save Preferences</button>
        </div>

        {/* Your Data */}
        <div className="privacy-card">
          <div className="privacy-card-header">
            <span className="privacy-icon">
              <FaChartBar />
            </span>
            <div>
              <h3>Your Data</h3>
              <p>Download or delete your data</p>
            </div>
          </div>

          <div className="data-actions">
            <div className="data-action">
              <div>
                <strong>Export Your Data</strong>
                <p>Download a copy of all your data (GDPR compliance)</p>
              </div>
              {exportStatus === "preparing" ? (
                <button className="btn btn-outline" disabled>
                  <span className="spinner"></span> Preparing...
                </button>
              ) : exportStatus === "ready" ? (
                <button className="btn btn-success">
                  <FaDownload /> Download
                </button>
              ) : (
                <button className="btn btn-outline" onClick={handleExport}>
                  <FaDownload /> Request Export
                </button>
              )}
            </div>

            <div className="data-action danger">
              <div>
                <strong>Delete Your Account</strong>
                <p>Permanently delete your account and all associated data</p>
              </div>
              <button className="btn btn-danger" onClick={handleDelete}>
                <FaTrash /> Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="privacy-card">
          <div className="privacy-card-header">
            <span className="privacy-icon">
              <FaCalendarAlt />
            </span>
            <div>
              <h3>Data Retention</h3>
              <p>How long we keep your data</p>
            </div>
          </div>
          <div className="retention-list">
            {[
              {
                label: "Account data",
                period: "Until you delete your account",
              },
              { label: "Project files", period: "2 years after last access" },
              { label: "Support tickets", period: "3 years" },
              { label: "Analytics logs", period: "12 months" },
              {
                label: "Billing records",
                period: "7 years (legal requirement)",
              },
            ].map((item, i) => (
              <div key={i} className="retention-item">
                <span>{item.label}</span>
                <span>{item.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Links */}
        <div className="privacy-card">
          <div className="privacy-card-header">
            <span className="privacy-icon">
              <FaFileAlt />
            </span>
            <div>
              <h3>Legal Documents</h3>
              <p>Read our policies</p>
            </div>
          </div>
          <div className="policy-links">
            {[
              { icon: <FaClipboardList />, label: "Privacy Policy" },
              { icon: <FaFileContract />, label: "Terms of Service" },
              { icon: <FaCookieBite />, label: "Cookie Policy" },
              { icon: <FaLock />, label: "Data Processing Agreement" },
              { icon: <FaBalanceScale />, label: "GDPR Compliance" },
            ].map((doc, i) => (
              <a key={i} href="#" className="policy-link">
                <span className="policy-icon">{doc.icon}</span>
                <span>{doc.label}</span>
                <span>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyCenter;
