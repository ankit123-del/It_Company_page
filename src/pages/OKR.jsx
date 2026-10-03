import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { FaUser, FaBullseye } from "react-icons/fa";

const OKR = () => {
  const [objectives] = useState([
    {
      id: 1,
      title: "Increase monthly revenue to ₹1 Cr",
      owner: "Sarah Johnson",
      quarter: "Q4 2024",
      progress: 72,
      keyResults: [
        {
          id: 1,
          text: "Acquire 50 new clients",
          current: 38,
          target: 50,
          unit: "clients",
        },
        {
          id: 2,
          text: "Increase avg deal size to ₹2.5L",
          current: 2.1,
          target: 2.5,
          unit: "L",
        },
        {
          id: 3,
          text: "Achieve 90% client retention",
          current: 87,
          target: 90,
          unit: "%",
        },
      ],
    },
    {
      id: 2,
      title: "Launch 3 new service offerings",
      owner: "Mike Brown",
      quarter: "Q4 2024",
      progress: 33,
      keyResults: [
        {
          id: 1,
          text: "Launch AI/ML service line",
          current: 1,
          target: 1,
          unit: "done",
        },
        {
          id: 2,
          text: "Launch DevOps service",
          current: 0,
          target: 1,
          unit: "done",
        },
        {
          id: 3,
          text: "Launch Data Analytics",
          current: 0,
          target: 1,
          unit: "done",
        },
      ],
    },
    {
      id: 3,
      title: "Build world-class team",
      owner: "Emily Davis",
      quarter: "Q4 2024",
      progress: 85,
      keyResults: [
        {
          id: 1,
          text: "Hire 15 new engineers",
          current: 13,
          target: 15,
          unit: "hires",
        },
        {
          id: 2,
          text: "Achieve 4.5/5 employee satisfaction",
          current: 4.4,
          target: 4.5,
          unit: "/5",
        },
        {
          id: 3,
          text: "Complete 20 training sessions",
          current: 18,
          target: 20,
          unit: "sessions",
        },
      ],
    },
  ]);

  const overallProgress = Math.round(
    objectives.reduce((sum, o) => sum + o.progress, 0) / objectives.length,
  );

  return (
    <div className="okr-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "OKRs" }]} />
          <h1 className="page-title">Objectives & Key Results</h1>
          <p className="page-subtitle">Track company goals and progress</p>
        </div>
      </div>

      <div className="container">
        {/* Overall Progress */}
        <div className="okr-overall">
          <div className="okr-overall-circle">
            <svg viewBox="0 0 100 100" className="okr-circle-svg">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#e2e8f0"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="url(#okrGradient)"
                strokeWidth="8"
                strokeDasharray={`${overallProgress * 2.51} 251`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <defs>
                <linearGradient id="okrGradient">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <text
                x="50"
                y="55"
                textAnchor="middle"
                fontSize="20"
                fontWeight="700"
                fill="#4f46e5"
              >
                {overallProgress}%
              </text>
            </svg>
          </div>
          <div>
            <h2>Overall Progress</h2>
            <p>Q4 2024 • {objectives.length} objectives</p>
          </div>
        </div>

        {/* Objectives */}
        <div className="okr-objectives">
          {objectives.map((objective) => (
            <div key={objective.id} className="okr-objective">
              <div className="okr-objective-header">
                <div>
                  <span className="okr-objective-quarter">
                    {objective.quarter}
                  </span>
                  <h3>{objective.title}</h3>
                  <p className="okr-objective-owner">
                    <FaUser /> {objective.owner}
                  </p>
                </div>
                <div className="okr-objective-progress">
                  <span className="okr-progress-value">
                    {objective.progress}%
                  </span>
                  <div className="okr-progress-bar">
                    <div
                      className="okr-progress-fill"
                      style={{ width: `${objective.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="okr-key-results">
                {objective.keyResults.map((kr) => {
                  const krProgress = Math.min(
                    100,
                    Math.round((kr.current / kr.target) * 100),
                  );
                  return (
                    <div key={kr.id} className="okr-kr">
                      <div className="okr-kr-header">
                        <span className="okr-kr-icon">
                          <FaBullseye />
                        </span>
                        <span className="okr-kr-text">{kr.text}</span>
                      </div>
                      <div className="okr-kr-progress">
                        <div className="okr-kr-bar">
                          <div
                            className="okr-kr-fill"
                            style={{
                              width: `${krProgress}%`,
                              background:
                                krProgress >= 80
                                  ? "var(--success)"
                                  : krProgress >= 50
                                    ? "var(--warning)"
                                    : "var(--danger)",
                            }}
                          />
                        </div>
                        <span className="okr-kr-values">
                          {kr.current}/{kr.target} {kr.unit}
                        </span>
                        <span className="okr-kr-percent">{krProgress}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OKR;
