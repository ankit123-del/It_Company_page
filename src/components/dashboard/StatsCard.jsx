import React from "react";

const StatsCard = ({ title, value, icon, color = "indigo" }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-content">
        <div className="stat-info">
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
        </div>
        <div className={`stat-icon stat-icon-${color}`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
