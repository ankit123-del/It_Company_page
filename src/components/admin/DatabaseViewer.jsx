import React, { useState } from "react";
import {
  FaDatabase,
  FaEye,
  FaDownload,
  FaSync,
  FaTable,
  FaSearch,
} from "react-icons/fa";

const DatabaseViewer = () => {
  const [selectedTable, setSelectedTable] = useState("users");
  const [search, setSearch] = useState("");

  // Mock data - in real app, this comes from API
  const tables = {
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        status: "active",
      },
      {
        id: 2,
        name: "Sarah Wilson",
        email: "sarah@example.com",
        role: "admin",
        status: "active",
      },
      {
        id: 3,
        name: "Mike Brown",
        email: "mike@example.com",
        role: "manager",
        status: "pending",
      },
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        client: "John Doe",
        status: "In Progress",
        budget: 850000,
      },
      {
        id: 2,
        title: "Mobile App",
        client: "Priya Sharma",
        status: "Review",
        budget: 1200000,
      },
      {
        id: 3,
        title: "Cloud Migration",
        client: "Rajesh Kumar",
        status: "Completed",
        budget: 320000,
      },
    ],
    invoices: [
      {
        id: 1,
        number: "INV-2024-001",
        client: "John Doe",
        amount: 295000,
        status: "paid",
      },
      {
        id: 2,
        number: "INV-2024-002",
        client: "Priya Sharma",
        amount: 212400,
        status: "pending",
      },
    ],
    visitors: [
      {
        id: 1,
        ip: "192.168.1.1",
        page: "/",
        device: "Desktop",
        browser: "Chrome",
        visits: 5,
      },
      {
        id: 2,
        ip: "192.168.1.2",
        page: "/services",
        device: "Mobile",
        browser: "Safari",
        visits: 3,
      },
    ],
  };

  const tableNames = Object.keys(tables);
  const currentData = tables[selectedTable] || [];
  const columns = currentData[0] ? Object.keys(currentData[0]) : [];

  const filteredData = currentData.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase()),
    ),
  );

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(tables, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `database-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaDatabase />
            </span>
          </div>
          <div className="admin-stat-value">{tableNames.length}</div>
          <div className="admin-stat-label">Tables</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">📊</span>
          </div>
          <div className="admin-stat-value">
            {Object.values(tables).reduce((s, t) => s + t.length, 0)}
          </div>
          <div className="admin-stat-label">Total Records</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">💾</span>
          </div>
          <div className="admin-stat-value">
            {(JSON.stringify(tables).length / 1024).toFixed(1)} KB
          </div>
          <div className="admin-stat-label">Database Size</div>
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
          <div className="admin-stat-value">Online</div>
          <div className="admin-stat-label">Status</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>🗄️ Database Tables</h3>
          <div className="admin-header-filters">
            <div className="search-input-wrapper">
              <FaSearch />
              <input
                type="text"
                className="input-field input-sm"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn btn-outline btn-sm" onClick={exportJSON}>
              <FaDownload /> Export JSON
            </button>
          </div>
        </div>

        <div className="db-tables-grid">
          {tableNames.map((table) => (
            <button
              key={table}
              className={`db-table-btn ${selectedTable === table ? "active" : ""}`}
              onClick={() => setSelectedTable(table)}
            >
              <FaTable />
              <div>
                <strong>{table}</strong>
                <span>{tables[table].length} records</span>
              </div>
            </button>
          ))}
        </div>

        <div className="db-viewer-header">
          <h4>
            <FaTable /> {selectedTable}{" "}
            <span className="badge badge-blue">{filteredData.length}</span>
          </h4>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col}>
                      {typeof row[col] === "object"
                        ? JSON.stringify(row[col])
                        : String(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatabaseViewer;
