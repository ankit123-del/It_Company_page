import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");

  const kpis = [
    {
      label: "Total Revenue",
      value: "₹45.2L",
      change: "+12.5%",
      up: true,
      icon: "💰",
    },
    {
      label: "Active Projects",
      value: "47",
      change: "+8.2%",
      up: true,
      icon: "📁",
    },
    {
      label: "New Clients",
      value: "23",
      change: "+15.3%",
      up: true,
      icon: "👥",
    },
    {
      label: "Conversion Rate",
      value: "4.8%",
      change: "-0.5%",
      up: false,
      icon: "📈",
    },
  ];

  // Simple bar chart data
  const revenueData = [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 78 },
    { month: "Mar", value: 90 },
    { month: "Apr", value: 81 },
    { month: "May", value: 95 },
    { month: "Jun", value: 120 },
    { month: "Jul", value: 110 },
    { month: "Aug", value: 135 },
    { month: "Sep", value: 145 },
    { month: "Oct", value: 160 },
    { month: "Nov", value: 155 },
    { month: "Dec", value: 180 },
  ];

  const serviceBreakdown = [
    { name: "Web Development", percent: 35, color: "#4f46e5" },
    { name: "Mobile Apps", percent: 25, color: "#7c3aed" },
    { name: "Cloud Solutions", percent: 20, color: "#06b6d4" },
    { name: "Cyber Security", percent: 12, color: "#10b981" },
    { name: "AI/ML", percent: 8, color: "#f59e0b" },
  ];

  const maxValue = Math.max(...revenueData.map((d) => d.value));

  return (
    <div className="analytics-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Analytics" }]} />
          <h1 className="page-title">Analytics Dashboard</h1>
          <p className="page-subtitle">
            Track your business performance in real-time
          </p>
        </div>
      </div>

      <div className="container">
        {/* Time Range Selector */}
        <div className="analytics-toolbar">
          <div className="time-range-selector">
            {["7d", "30d", "90d", "1y"].map((range) => (
              <button
                key={range}
                className={`time-range-btn ${timeRange === range ? "active" : ""}`}
                onClick={() => setTimeRange(range)}
              >
                {range === "7d"
                  ? "Last 7 days"
                  : range === "30d"
                    ? "Last 30 days"
                    : range === "90d"
                      ? "Last 90 days"
                      : "Last year"}
              </button>
            ))}
          </div>
          <button className="btn btn-outline btn-sm">📥 Export PDF</button>
        </div>

        {/* KPI Cards */}
        <div className="analytics-kpis">
          {kpis.map((kpi, i) => (
            <div key={i} className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-icon">{kpi.icon}</span>
                <span className={`kpi-change ${kpi.up ? "up" : "down"}`}>
                  {kpi.up ? "▲" : "▼"} {kpi.change}
                </span>
              </div>
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-label">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="analytics-grid">
          {/* Revenue Chart */}
          <div className="analytics-card">
            <div className="analytics-card-header">
              <h3>Revenue Trend</h3>
              <span className="analytics-badge">Last 12 months</span>
            </div>
            <div className="bar-chart">
              {revenueData.map((item, i) => (
                <div key={i} className="bar-item">
                  <div className="bar-wrapper">
                    <div
                      className="bar"
                      style={{ height: `${(item.value / maxValue) * 100}%` }}
                      title={`₹${item.value}L`}
                    >
                      <span className="bar-tooltip">₹{item.value}L</span>
                    </div>
                  </div>
                  <span className="bar-label">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Breakdown */}
          <div className="analytics-card">
            <div className="analytics-card-header">
              <h3>Service Breakdown</h3>
            </div>
            <div className="donut-chart">
              <svg viewBox="0 0 100 100" className="donut-svg">
                {(() => {
                  let offset = 0;
                  return serviceBreakdown.map((item, i) => {
                    const circle = (
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="20"
                        strokeDasharray={`${item.percent * 2.51} 251`}
                        strokeDashoffset={-offset * 2.51}
                        transform="rotate(-90 50 50)"
                      />
                    );
                    offset += item.percent;
                    return circle;
                  });
                })()}
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dy=".3em"
                  className="donut-text"
                >
                  100%
                </text>
              </svg>
              <div className="donut-legend">
                {serviceBreakdown.map((item, i) => (
                  <div key={i} className="legend-item">
                    <span
                      className="legend-color"
                      style={{ background: item.color }}
                    ></span>
                    <span className="legend-name">{item.name}</span>
                    <span className="legend-value">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="analytics-card full-width">
            <div className="analytics-card-header">
              <h3>Recent Activity</h3>
              <button className="btn btn-ghost btn-sm">View All →</button>
            </div>
            <div className="analytics-table">
              <table>
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      client: "TechCorp",
                      project: "E-commerce Platform",
                      status: "In Progress",
                      amount: "₹8,50,000",
                      date: "2024-10-15",
                    },
                    {
                      client: "MediCare",
                      project: "Healthcare App",
                      status: "Completed",
                      amount: "₹12,00,000",
                      date: "2024-10-12",
                    },
                    {
                      client: "PayTech",
                      project: "Cloud Migration",
                      status: "In Review",
                      amount: "₹15,50,000",
                      date: "2024-10-10",
                    },
                    {
                      client: "EduLearn",
                      project: "LMS Platform",
                      status: "In Progress",
                      amount: "₹6,80,000",
                      date: "2024-10-08",
                    },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td>
                        <strong>{row.client}</strong>
                      </td>
                      <td>{row.project}</td>
                      <td>
                        <span
                          className={`badge ${
                            row.status === "Completed"
                              ? "badge-green"
                              : row.status === "In Progress"
                                ? "badge-blue"
                                : "badge-yellow"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <strong>{row.amount}</strong>
                      </td>
                      <td>{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
