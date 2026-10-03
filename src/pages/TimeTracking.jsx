import React, { useState, useEffect } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaPlay,
  FaPause,
  FaStop,
  FaDownload,
  FaClock,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const TimeTracking = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [entries, setEntries] = useState([
    {
      id: 1,
      task: "E-commerce platform",
      project: "TechCorp",
      duration: 7200,
      date: "2024-10-16",
    },
    {
      id: 2,
      task: "API integration",
      project: "MediCare",
      duration: 5400,
      date: "2024-10-16",
    },
    {
      id: 3,
      task: "Bug fixing",
      project: "PayTech",
      duration: 3600,
      date: "2024-10-15",
    },
  ]);

  const [currentTask, setCurrentTask] = useState("");

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0",
    )}:${String(s).padStart(2, "0")}`;
  };

  const handleStop = () => {
    if (seconds > 0 && currentTask) {
      const newEntry = {
        id: entries.length + 1,
        task: currentTask,
        project: "Current Project",
        duration: seconds,
        date: new Date().toISOString().split("T")[0],
      };

      setEntries([newEntry, ...entries]);
    }

    setIsRunning(false);
    setSeconds(0);
    setCurrentTask("");
  };

  const todayTotal = entries
    .filter((e) => e.date === new Date().toISOString().split("T")[0])
    .reduce((sum, e) => sum + e.duration, 0);

  return (
    <div className="time-tracking-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Time Tracking" }]} />

          <h1 className="page-title">Time Tracking</h1>

          <p className="page-subtitle">Track your working hours efficiently</p>
        </div>
      </div>

      <div className="container">
        {/* Timer Card */}
        <div className="timer-card">
          <div className="timer-display">{formatTime(seconds)}</div>

          <input
            type="text"
            placeholder="What are you working on?"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            className="timer-input"
            disabled={isRunning}
          />

          <div className="timer-actions">
            {!isRunning ? (
              <button
                className="btn btn-primary btn-lg timer-btn"
                onClick={() => setIsRunning(true)}
                disabled={!currentTask}
              >
                <FaPlay />
                Start Timer
              </button>
            ) : (
              <>
                <button
                  className="btn btn-outline btn-lg"
                  onClick={() => setIsRunning(false)}
                >
                  <FaPause />
                  Pause
                </button>

                <button className="btn btn-danger btn-lg" onClick={handleStop}>
                  <FaStop />
                  Stop & Save
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="timer-stats">
          <div className="timer-stat">
            <span className="timer-stat-value">{formatTime(todayTotal)}</span>

            <span className="timer-stat-label">Today</span>
          </div>

          <div className="timer-stat">
            <span className="timer-stat-value">
              {formatTime(entries.reduce((sum, e) => sum + e.duration, 0))}
            </span>

            <span className="timer-stat-label">This Week</span>
          </div>

          <div className="timer-stat">
            <span className="timer-stat-value">{entries.length}</span>

            <span className="timer-stat-label">Entries</span>
          </div>
        </div>

        {/* Entries */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Recent Entries</h3>

            <button className="btn btn-outline btn-sm">
              <FaDownload />
              Export
            </button>
          </div>

          <div className="time-entries">
            {entries.map((entry) => (
              <div key={entry.id} className="time-entry">
                <span className="time-entry-icon">
                  <FaClock />
                </span>

                <div className="time-entry-info">
                  <strong>{entry.task}</strong>

                  <span>
                    {entry.project} • {entry.date}
                  </span>
                </div>

                <span className="time-entry-duration">
                  {formatTime(entry.duration)}
                </span>

                <button
                  className="icon-btn-sm"
                  title="Edit entry"
                  type="button"
                >
                  <FaEdit />
                </button>

                <button
                  className="icon-btn-sm"
                  title="Delete entry"
                  type="button"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;
