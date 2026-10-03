import React, { useState } from "react";
import {
  FaUsers,
  FaTrophy,
  FaFire,
  FaStar,
  FaChartBar,
  FaTasks,
  FaMedal,
  FaCode,
  FaLaptopCode,
  FaPalette,
  FaServer,
  FaBrain,
  FaDatabase,
} from "react-icons/fa";

const TeamPerformance = () => {
  const [period, setPeriod] = useState("month");

  const team = [
    {
      id: 1,
      name: "Sarah Wilson",
      role: "Senior Developer",
      icon: "code",
      tasksCompleted: 45,
      projects: 5,
      rating: 4.9,
      streak: 32,
      points: 15420,
    },
    {
      id: 2,
      name: "Mike Brown",
      role: "Full Stack Dev",
      icon: "fullstack",
      tasksCompleted: 38,
      projects: 4,
      rating: 4.7,
      streak: 21,
      points: 13890,
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "UI/UX Designer",
      icon: "design",
      tasksCompleted: 42,
      projects: 6,
      rating: 4.8,
      streak: 28,
      points: 12345,
    },
    {
      id: 4,
      name: "David Wilson",
      role: "DevOps Engineer",
      icon: "devops",
      tasksCompleted: 32,
      projects: 3,
      rating: 4.5,
      streak: 18,
      points: 11200,
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "AI/ML Engineer",
      icon: "ai",
      tasksCompleted: 28,
      projects: 3,
      rating: 4.6,
      streak: 15,
      points: 10150,
    },
    {
      id: 6,
      name: "John Smith",
      role: "Backend Developer",
      icon: "backend",
      tasksCompleted: 24,
      projects: 4,
      rating: 4.4,
      streak: 12,
      points: 9800,
    },
  ];

  const iconMap = {
    code: <FaCode />,
    fullstack: <FaLaptopCode />,
    design: <FaPalette />,
    devops: <FaServer />,
    ai: <FaBrain />,
    backend: <FaDatabase />,
  };

  const sortedTeam = [...team].sort((a, b) => b.points - a.points);
  const maxTasks = Math.max(...team.map((t) => t.tasksCompleted));

  const avgRating = (
    team.reduce((s, t) => s + t.rating, 0) / team.length
  ).toFixed(2);
  const totalTasks = team.reduce((s, t) => s + t.tasksCompleted, 0);
  const longestStreak = Math.max(...team.map((t) => t.streak));

  return (
    <div className="admin-dashboard">
      {/* Period */}
      <div className="time-range-selector" style={{ marginBottom: "1.5rem" }}>
        {["week", "month", "quarter", "year"].map((p) => (
          <button
            key={p}
            className={`time-range-btn ${period === p ? "active" : ""}`}
            onClick={() => setPeriod(p)}
          >
            This {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#4f46e5" }}>
              <FaUsers />
            </span>
          </div>
          <div className="admin-stat-value">{team.length}</div>
          <div className="admin-stat-label">Team Members</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#10b981" }}>
              <FaTasks />
            </span>
          </div>
          <div className="admin-stat-value">{totalTasks}</div>
          <div className="admin-stat-label">Tasks Completed</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#f59e0b" }}>
              <FaStar />
            </span>
          </div>
          <div className="admin-stat-value">{avgRating}</div>
          <div className="admin-stat-label">Avg Rating</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#ef4444" }}>
              <FaFire />
            </span>
          </div>
          <div className="admin-stat-value">{longestStreak}</div>
          <div className="admin-stat-label">Longest Streak</div>
        </div>
      </div>

      {/* Podium */}
      <div className="admin-card">
        <div className="chart-header">
          <h3>
            <FaTrophy style={{ marginRight: "0.4rem" }} /> Top Performers
          </h3>
        </div>

        <div className="podium">
          {[sortedTeam[1], sortedTeam[0], sortedTeam[2]].map((member, i) => {
            const heights = ["80%", "100%", "65%"];
            const medalColors = ["#C0C0C0", "#FFD700", "#CD7F32"];
            const place = [2, 1, 3][i];
            return (
              <div key={member.id} className={`podium-item podium-${place}`}>
                <div className="podium-avatar">
                  {iconMap[member.icon] || <FaCode />}
                  <span
                    className="podium-medal"
                    style={{ color: medalColors[i] }}
                  >
                    <FaMedal />
                  </span>
                </div>
                <strong>{member.name}</strong>
                <span className="podium-points">
                  {member.points.toLocaleString()} pts
                </span>
                <div className="podium-stand" style={{ height: heights[i] }}>
                  <span className="podium-rank">#{place}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>
            <FaChartBar style={{ marginRight: "0.4rem" }} /> Team Performance
          </h3>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Member</th>
                <th>Tasks Completed</th>
                <th>Projects</th>
                <th>Rating</th>
                <th>Streak</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeam.map((member, i) => (
                <tr key={member.id}>
                  <td>
                    <span
                      className={`leaderboard-rank ${i < 3 ? "rank-top" : ""}`}
                    >
                      {i + 1}
                    </span>
                  </td>
                  <td>
                    <div className="admin-user-cell">
                      <span className="admin-avatar">
                        {iconMap[member.icon] || <FaCode />}
                      </span>
                      <div>
                        <strong>{member.name}</strong>
                        <span>{member.role}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="perf-bar-wrapper">
                      <div className="perf-bar">
                        <div
                          className="perf-fill"
                          style={{
                            width: `${(member.tasksCompleted / maxTasks) * 100}%`,
                          }}
                        />
                      </div>
                      <strong>{member.tasksCompleted}</strong>
                    </div>
                  </td>
                  <td>{member.projects}</td>
                  <td>
                    <span className="rating">
                      <FaStar
                        style={{
                          color: "#f59e0b",
                          marginRight: "0.3rem",
                        }}
                      />
                      {member.rating}
                    </span>
                  </td>
                  <td>
                    <FaFire
                      style={{ color: "#ef4444", marginRight: "0.35rem" }}
                    />
                    {member.streak} days
                  </td>
                  <td>
                    <strong>{member.points.toLocaleString()}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformance;
