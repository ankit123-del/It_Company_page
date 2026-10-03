import React from "react";

const ProjectCard = ({ project, onClick }) => {
  const getStatusBadge = (status) => {
    const classes = {
      Completed: "badge-green",
      "In Progress": "badge-blue",
      Review: "badge-yellow",
      Pending: "badge-gray",
      Cancelled: "badge-red",
    };
    return `badge ${classes[status] || "badge-gray"}`;
  };

  const getPriorityEmoji = (priority) => {
    const emojis = {
      High: "🔴",
      Medium: "🟡",
      Low: "🟢",
    };
    return emojis[priority] || "⚪";
  };

  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-card-header">
        <h4 className="project-card-title">{project.title}</h4>
        <span className={getStatusBadge(project.status)}>{project.status}</span>
      </div>
      <p className="project-card-description">
        {project.description?.length > 100
          ? project.description.slice(0, 100) + "..."
          : project.description}
      </p>
      <div className="project-card-footer">
        <span style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>
          {getPriorityEmoji(project.priority)} {project.priority}
        </span>
        <span style={{ fontSize: "0.75rem", color: "var(--gray-400)" }}>
          {project.dueDate
            ? `Due: ${new Date(project.dueDate).toLocaleDateString()}`
            : "No due date"}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
