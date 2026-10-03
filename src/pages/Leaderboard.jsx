import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaTrophy,
  FaBolt,
  FaBullseye,
  FaFire,
  FaPalette,
  FaLightbulb,
  FaFlask,
  FaBriefcase,
  FaMedal,
  FaStar,
  FaGem,
  FaLock,
  FaAward,
  FaUserTie,
  FaLaptopCode,
  FaPaintBrush,
  FaTools,
} from "react-icons/fa";

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState("month");

  const [leaderboard] = useState([
    {
      rank: 1,
      name: "Sarah Wilson",
      avatar: <FaUserTie />,
      points: 15420,
      badges: [
        <FaTrophy key="a" />,
        <FaBolt key="b" />,
        <FaBullseye key="c" />,
      ],
      streak: 45,
      tasks: 187,
    },
    {
      rank: 2,
      name: "Mike Brown",
      avatar: <FaLaptopCode />,
      points: 13890,
      badges: [
        <FaMedal key="a" style={{ color: "silver" }} />,
        <FaFire key="b" />,
      ],
      streak: 32,
      tasks: 154,
    },
    {
      rank: 3,
      name: "Emily Davis",
      avatar: <FaPaintBrush />,
      points: 12345,
      badges: [
        <FaMedal key="a" style={{ color: "#cd7f32" }} />,
        <FaPalette key="b" />,
        <FaLightbulb key="c" />,
      ],
      streak: 28,
      tasks: 142,
    },
    {
      rank: 4,
      name: "David Wilson",
      avatar: <FaTools />,
      points: 11200,
      badges: [<FaBolt key="a" />],
      streak: 21,
      tasks: 128,
    },
    {
      rank: 5,
      name: "Lisa Anderson",
      avatar: <FaFlask />,
      points: 10150,
      badges: [<FaFlask key="a" />],
      streak: 18,
      tasks: 115,
    },
    {
      rank: 6,
      name: "John Smith",
      avatar: <FaUserTie />,
      points: 9800,
      badges: [],
      streak: 15,
      tasks: 102,
    },
    {
      rank: 7,
      name: "Amit Patel",
      avatar: <FaLaptopCode />,
      points: 8900,
      badges: [<FaBullseye key="a" />],
      streak: 12,
      tasks: 98,
    },
    {
      rank: 8,
      name: "Priya Sharma",
      avatar: <FaUserTie />,
      points: 8100,
      badges: [<FaBriefcase key="a" />],
      streak: 10,
      tasks: 87,
    },
  ]);

  const [achievements] = useState([
    {
      icon: <FaTrophy />,
      name: "Top Performer",
      desc: "Rank #1 for a month",
      unlocked: true,
    },
    {
      icon: <FaFire />,
      name: "Streak Master",
      desc: "30+ day streak",
      unlocked: true,
    },
    {
      icon: <FaBullseye />,
      name: "Task Champion",
      desc: "Complete 150+ tasks",
      unlocked: true,
    },
    {
      icon: <FaBolt />,
      name: "Speed Demon",
      desc: "5 tasks in one day",
      unlocked: true,
    },
    {
      icon: <FaStar />,
      name: "Rising Star",
      desc: "Top 3 for 3 months",
      unlocked: false,
    },
    {
      icon: <FaGem />,
      name: "Diamond Elite",
      desc: "Rank #1 for 6 months",
      unlocked: false,
    },
  ]);

  const currentUser = leaderboard[5];

  return (
    <div className="leaderboard-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Leaderboard" }]} />
          <h1 className="page-title">
            <FaTrophy /> Leaderboard
          </h1>
          <p className="page-subtitle">Celebrate your team's achievements</p>
        </div>
      </div>

      <div className="container">
        {/* Your Rank */}
        <div className="leaderboard-you">
          <div className="leaderboard-you-rank">#{currentUser.rank}</div>
          <div className="leaderboard-you-avatar">{currentUser.avatar}</div>
          <div className="leaderboard-you-info">
            <strong>You - {currentUser.name}</strong>
            <span>
              {currentUser.points.toLocaleString()} points • <FaFire />{" "}
              {currentUser.streak} day streak
            </span>
          </div>
          <div className="leaderboard-you-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "78%" }} />
            </div>
            <span>Top 30%</span>
          </div>
        </div>

        {/* Timeframe Toggle */}
        <div className="billing-toggle" style={{ marginBottom: "2rem" }}>
          {["week", "month", "quarter", "year"].map((t) => (
            <button
              key={t}
              className={`billing-btn ${timeframe === t ? "active" : ""}`}
              onClick={() => setTimeframe(t)}
            >
              This {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="podium">
          {[leaderboard[1], leaderboard[0], leaderboard[2]].map((user, i) => {
            const heights = ["80%", "100%", "65%"];
            const medalColors = ["silver", "gold", "#cd7f32"];
            const place = [2, 1, 3][i];
            return (
              <div key={user.rank} className={`podium-item podium-${place}`}>
                <div className="podium-avatar">
                  {user.avatar}
                  <span className="podium-medal">
                    <FaMedal style={{ color: medalColors[i] }} />
                  </span>
                </div>
                <strong>{user.name}</strong>
                <span className="podium-points">
                  {user.points.toLocaleString()} pts
                </span>
                <div className="podium-stand" style={{ height: heights[i] }}>
                  <span className="podium-rank">#{user.rank}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Full Rankings</h3>
            <span className="badge badge-blue">
              {leaderboard.length} members
            </span>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Member</th>
                  <th>Points</th>
                  <th>Streak</th>
                  <th>Tasks</th>
                  <th>Badges</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user) => (
                  <tr key={user.rank}>
                    <td>
                      <span
                        className={`leaderboard-rank rank-${user.rank <= 3 ? "top" : "normal"}`}
                      >
                        {user.rank}
                      </span>
                    </td>
                    <td>
                      <div className="admin-user-cell">
                        <span className="admin-avatar">{user.avatar}</span>
                        <strong>{user.name}</strong>
                      </div>
                    </td>
                    <td>
                      <strong>{user.points.toLocaleString()}</strong>
                    </td>
                    <td>
                      <FaFire /> {user.streak} days
                    </td>
                    <td>{user.tasks}</td>
                    <td>
                      <div className="leaderboard-badges">
                        {user.badges.map((b, i) => (
                          <span key={i} title="Badge">
                            {b}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Achievements */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>
              <FaAward /> Achievements
            </h3>
            <span className="badge badge-green">
              {achievements.filter((a) => a.unlocked).length}/
              {achievements.length} unlocked
            </span>
          </div>
          <div className="achievements-grid">
            {achievements.map((ach, i) => (
              <div
                key={i}
                className={`achievement-card ${ach.unlocked ? "unlocked" : "locked"}`}
              >
                <span className="achievement-icon">{ach.icon}</span>
                <strong>{ach.name}</strong>
                <span>{ach.desc}</span>
                {!ach.unlocked && (
                  <span className="achievement-lock">
                    <FaLock />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
