import React from "react";
import ProjectCard from "./ProjectCard";

const RecentProjects = ({ projects, onViewAll, title = "Recent Projects" }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
        </div>
        <div className="empty-state">
          <p style={{ color: "var(--gray-500)" }}>
            No projects yet. Create your first project!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {onViewAll && (
          <button className="btn btn-ghost btn-sm" onClick={onViewAll}>
            View All →
          </button>
        )}
      </div>
      <div className="projects-grid">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
