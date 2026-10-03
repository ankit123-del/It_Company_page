import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaUserTie,
  FaPalette,
  FaCode,
  FaUserMd,
  FaCheck,
} from "react-icons/fa";

const ProjectTracker = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: "PRJ-2024-001",
      name: "E-commerce Platform",
      client: "TechCorp",
      status: "in-progress",
      progress: 68,
      startDate: "2024-08-01",
      dueDate: "2024-12-15",
      budget: "₹8,50,000",
      spent: "₹5,78,000",

      // Font Awesome icons instead of emojis
      team: [
        { icon: FaUserTie, label: "Project Manager" },
        { icon: FaCode, label: "Developer" },
        { icon: FaCode, label: "Developer" },
        { icon: FaPalette, label: "UI/UX Designer" },
      ],

      milestones: [
        { name: "Discovery", status: "completed", date: "2024-08-05" },
        { name: "Design", status: "completed", date: "2024-08-25" },
        {
          name: "Development",
          status: "in-progress",
          date: "2024-10-30",
        },
        { name: "Testing", status: "pending", date: "2024-11-30" },
        { name: "Launch", status: "pending", date: "2024-12-15" },
      ],

      updates: [
        {
          date: "2024-10-15",
          text: "Payment integration completed",
          author: "John Doe",
        },
        {
          date: "2024-10-10",
          text: "User dashboard deployed to staging",
          author: "Jane Smith",
        },
        {
          date: "2024-10-05",
          text: "API endpoints finalized",
          author: "Mike Brown",
        },
      ],
    },

    {
      id: "PRJ-2024-002",
      name: "Healthcare Mobile App",
      client: "MediCare Plus",
      status: "review",
      progress: 92,
      startDate: "2024-06-15",
      dueDate: "2024-11-01",
      budget: "₹12,00,000",
      spent: "₹10,80,000",

      // Font Awesome icons instead of emojis
      team: [
        { icon: FaUserTie, label: "Project Manager" },
        { icon: FaCode, label: "Developer" },
        { icon: FaUserMd, label: "Healthcare Specialist" },
      ],

      milestones: [
        { name: "Discovery", status: "completed", date: "2024-06-20" },
        { name: "Design", status: "completed", date: "2024-07-15" },
        {
          name: "Development",
          status: "completed",
          date: "2024-10-01",
        },
        {
          name: "Testing",
          status: "in-progress",
          date: "2024-10-25",
        },
        { name: "Launch", status: "pending", date: "2024-11-01" },
      ],

      updates: [
        {
          date: "2024-10-14",
          text: "Final QA round in progress",
          author: "Jane Smith",
        },
      ],
    },
  ];

  const project = projects[activeProject];

  const statusColors = {
    completed: "var(--success)",
    "in-progress": "var(--primary)",
    review: "var(--warning)",
    pending: "var(--gray-400)",
  };

  return (
    <div className="project-tracker-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Project Tracker" }]} />

          <h1 className="page-title">Live Project Tracker</h1>

          <p className="page-subtitle">
            Track your project progress in real-time
          </p>
        </div>
      </div>

      <div className="container">
        {/* Project Selector */}
        <div className="project-selector">
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={`project-selector-btn ${
                i === activeProject ? "active" : ""
              }`}
              onClick={() => setActiveProject(i)}
            >
              <strong>{p.name}</strong>
              <span>{p.id}</span>
            </button>
          ))}
        </div>

        {/* Project Header */}
        <div className="tracker-header">
          <div>
            <h2>{project.name}</h2>

            <p className="tracker-client">
              Client: <strong>{project.client}</strong>
            </p>
          </div>

          <div className="tracker-status">
            <span
              className={`badge ${
                project.status === "in-progress" ? "badge-blue" : "badge-yellow"
              }`}
            >
              {project.status.replace("-", " ").toUpperCase()}
            </span>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="tracker-overview">
          <div className="tracker-progress-card">
            <h3>Overall Progress</h3>

            <div className="tracker-progress-bar">
              <div
                className="tracker-progress-fill"
                style={{ width: `${project.progress}%` }}
              >
                <span className="tracker-progress-text">
                  {project.progress}%
                </span>
              </div>
            </div>
          </div>

          <div className="tracker-info-grid">
            <div className="tracker-info-item">
              <span className="tracker-info-label">Start Date</span>
              <span className="tracker-info-value">{project.startDate}</span>
            </div>

            <div className="tracker-info-item">
              <span className="tracker-info-label">Due Date</span>
              <span className="tracker-info-value">{project.dueDate}</span>
            </div>

            <div className="tracker-info-item">
              <span className="tracker-info-label">Budget</span>
              <span className="tracker-info-value">{project.budget}</span>
            </div>

            <div className="tracker-info-item">
              <span className="tracker-info-label">Spent</span>
              <span className="tracker-info-value">{project.spent}</span>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="tracker-section">
          <h3>Project Team</h3>

          <div className="tracker-team">
            {project.team.map((member, i) => {
              const MemberIcon = member.icon;

              return (
                <div
                  key={i}
                  className="tracker-team-member"
                  title={member.label}
                  aria-label={member.label}
                >
                  <MemberIcon />
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="tracker-section">
          <h3>Milestones</h3>

          <div className="tracker-timeline">
            {project.milestones.map((ms, i) => (
              <div key={i} className={`tracker-milestone ${ms.status}`}>
                <div
                  className="tracker-milestone-dot"
                  style={{
                    background: statusColors[ms.status],
                  }}
                >
                  {ms.status === "completed" ? <FaCheck /> : i + 1}
                </div>

                <div className="tracker-milestone-content">
                  <strong>{ms.name}</strong>
                  <span>{ms.date}</span>
                </div>

                <span
                  className={`badge ${
                    ms.status === "completed"
                      ? "badge-green"
                      : ms.status === "in-progress"
                        ? "badge-blue"
                        : "badge-gray"
                  }`}
                >
                  {ms.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div className="tracker-section">
          <h3>Recent Updates</h3>

          <div className="tracker-updates">
            {project.updates.map((upd, i) => (
              <div key={i} className="tracker-update">
                <div className="tracker-update-date">{upd.date}</div>

                <div className="tracker-update-content">
                  <p>{upd.text}</p>
                  <span>by {upd.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTracker;
