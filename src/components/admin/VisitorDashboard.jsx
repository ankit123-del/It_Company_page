import React, { useState, useEffect } from "react";
import { visitorApi } from "../../api/visitorApi";
import {
  FaEye,
  FaDesktop,
  FaMobile,
  FaTablet,
  FaUsers,
  FaChartLine,
  FaGlobe,
  FaClock,
  FaTrash,
  FaSync,
} from "react-icons/fa";

const VisitorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, visitorsRes] = await Promise.all([
        visitorApi.getStats(),
        visitorApi.getAll(1, 20),
      ]);
      setStats(statsRes.stats);
      setVisitors(visitorsRes.visitors);
    } catch (error) {
      console.error("Failed to load visitors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = async () => {
    if (window.confirm("Clear all visitor data?")) {
      await visitorApi.clear();
      loadData();
    }
  };

  if (loading && !stats) {
    return (
      <div className="admin-card">
        <p>Loading visitor data...</p>
      </div>
    );
  }

  return (
    <>
      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaUsers />
            </span>
            <span className="kpi-change up">● Live</span>
          </div>
          <div className="admin-stat-value">{stats?.onlineNow || 0}</div>
          <div className="admin-stat-label">Online Now</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaEye />
            </span>
          </div>
          <div className="admin-stat-value">{stats?.todayVisitors || 0}</div>
          <div className="admin-stat-label">Today's Visitors</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaChartLine />
            </span>
          </div>
          <div className="admin-stat-value">{stats?.last7Days || 0}</div>
          <div className="admin-stat-label">Last 7 Days</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaGlobe />
            </span>
          </div>
          <div className="admin-stat-value">{stats?.totalVisitors || 0}</div>
          <div className="admin-stat-label">Total Visitors</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaClock />
            </span>
          </div>
          <div className="admin-stat-value">{stats?.totalPageViews || 0}</div>
          <div className="admin-stat-label">Total Page Views</div>
        </div>
      </div>

      {/* Device & Browser Breakdown */}
      <div className="visitor-breakdown-grid">
        <div className="admin-card">
          <h3>📱 By Device</h3>
          <div className="breakdown-list">
            {Object.entries(stats?.byDevice || {}).map(([key, val]) => (
              <div key={key} className="breakdown-item">
                <span className="breakdown-label">
                  {key === "Mobile" && <FaMobile />}
                  {key === "Desktop" && <FaDesktop />}
                  {key === "Tablet" && <FaTablet />} {key}
                </span>
                <span className="breakdown-value">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h3>🌐 By Browser</h3>
          <div className="breakdown-list">
            {Object.entries(stats?.byBrowser || {}).map(([key, val]) => (
              <div key={key} className="breakdown-item">
                <span className="breakdown-label">{key}</span>
                <span className="breakdown-value">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h3>🔥 Top Pages</h3>
          <div className="breakdown-list">
            {(stats?.topPages || []).slice(0, 5).map((item, i) => (
              <div key={i} className="breakdown-item">
                <span className="breakdown-label">{item.page}</span>
                <span className="breakdown-value">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Visitors Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>🕐 Recent Visitors</h3>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-outline btn-sm" onClick={loadData}>
              <FaSync /> Refresh
            </button>
            <button className="btn btn-danger btn-sm" onClick={handleClear}>
              <FaTrash /> Clear All
            </button>
          </div>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>IP Address</th>
                <th>Page</th>
                <th>Device</th>
                <th>Browser</th>
                <th>OS</th>
                <th>Country</th>
                <th>Referrer</th>
                <th>Visits</th>
                <th>Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v) => (
                <tr key={v._id}>
                  <td>
                    <code>{v.ip}</code>
                  </td>
                  <td>
                    <span className="badge badge-blue">
                      {v.currentPage || v.page}
                    </span>
                  </td>
                  <td>
                    {v.device === "Mobile" && <FaMobile />}
                    {v.device === "Desktop" && <FaDesktop />}
                    {v.device === "Tablet" && <FaTablet />} {v.device}
                  </td>
                  <td>{v.browser}</td>
                  <td>{v.os}</td>
                  <td>{v.country || "Unknown"}</td>
                  <td>{v.referrer}</td>
                  <td>
                    <strong>{v.pageViews}</strong>
                  </td>
                  <td>{new Date(v.lastVisit).toLocaleString()}</td>
                </tr>
              ))}
              {visitors.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    style={{ textAlign: "center", padding: "2rem" }}
                  >
                    No visitors yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VisitorDashboard;
