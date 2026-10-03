import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faUnlock,
  faDownload,
  faClock,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const AuditLog = ({ logs = [] }) => {
  const [filter, setFilter] = useState("all");

  const defaultLogs = [
    {
      id: 1,
      user: "Admin User",
      action: "created",
      entity: "Project",
      entityName: "E-commerce Platform",
      time: "2024-10-16 14:30",
      ip: "192.168.1.1",
      type: "create",
    },
    {
      id: 2,
      user: "Sarah Wilson",
      action: "updated",
      entity: "User",
      entityName: "John Doe",
      time: "2024-10-16 14:15",
      ip: "192.168.1.2",
      type: "update",
    },
    {
      id: 3,
      user: "Mike Brown",
      action: "deleted",
      entity: "Ticket",
      entityName: "TKT-099",
      time: "2024-10-16 13:45",
      ip: "192.168.1.3",
      type: "delete",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "logged in",
      entity: "Session",
      entityName: "Web Session",
      time: "2024-10-16 13:00",
      ip: "192.168.1.4",
      type: "login",
    },
    {
      id: 5,
      user: "Admin User",
      action: "changed",
      entity: "Settings",
      entityName: "Email config",
      time: "2024-10-16 12:30",
      ip: "192.168.1.1",
      type: "update",
    },
  ];

  const data = logs.length ? logs : defaultLogs;

  const filtered =
    filter === "all"
      ? data
      : data.filter((l) => l.type === filter);

  const typeIcons = {
    create: faPlus,
    update: faPen,
    delete: faTrash,
    login: faUnlock,
  };

  const typeColors = {
    create: "var(--success)",
    update: "var(--info)",
    delete: "var(--danger)",
    login: "var(--purple)",
  };

  return (
    <div className="audit-log">
      <div className="audit-log-toolbar">
        <div className="time-range-selector">
          {["all", "create", "update", "delete", "login"].map((f) => (
            <button
              key={f}
              className={`time-range-btn ${
                filter === f ? "active" : ""
              }`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <button className="btn btn-outline btn-sm">
          <FontAwesomeIcon icon={faDownload} />
          <span>Export</span>
        </button>
      </div>

      <div className="audit-log-list">
        {filtered.map((log) => (
          <div key={log.id} className="audit-log-item">
            <span
              className="audit-log-type"
              style={{ background: typeColors[log.type] }}
            >
              <FontAwesomeIcon icon={typeIcons[log.type]} />
            </span>

            <div className="audit-log-content">
              <p>
                <strong>{log.user}</strong> {log.action}{" "}
                <span className="audit-log-entity">
                  {log.entity}: {log.entityName}
                </span>
              </p>

              <div className="audit-log-meta">
                <span>
                  <FontAwesomeIcon icon={faClock} />
                  {log.time}
                </span>

                <span>
                  <FontAwesomeIcon icon={faGlobe} />
                  {log.ip}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLog;