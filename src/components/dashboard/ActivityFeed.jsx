import React from "react";

const ActivityFeed = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Recent Activity</h2>
        </div>
        <div className="empty-state">
          <p style={{ color: "var(--gray-500)" }}>No recent activities</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <h2 className="section-title">Recent Activity</h2>
      </div>
      <div className="activity-feed">
        {activities.slice(0, 5).map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-avatar">
              {activity.user?.avatar || "👤"}
            </div>
            <div className="activity-content">
              <p className="activity-text">
                <strong>{activity.user?.name || "User"}</strong>{" "}
                {activity.description}
              </p>
              <p className="activity-time">
                {new Date(activity.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
