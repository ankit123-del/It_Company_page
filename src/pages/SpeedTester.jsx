import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaGlobe,
  FaRocket,
  FaBolt,
  FaUniversalAccess,
  FaCheckCircle,
  FaSearch,
  FaClock,
  FaFileAlt,
  FaLightbulb,
  FaBullseye,
  FaArrowRight,
} from "react-icons/fa";

const SpeedTester = () => {
  const [url, setUrl] = useState("");
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(null);

  const handleTest = (e) => {
    e.preventDefault();
    setTesting(true);
    setResult(null);

    // Simulate test
    setTimeout(() => {
      setResult({
        performance: Math.floor(Math.random() * 40) + 60,
        accessibility: Math.floor(Math.random() * 30) + 70,
        bestPractices: Math.floor(Math.random() * 25) + 75,
        seo: Math.floor(Math.random() * 20) + 80,
        loadTime: (Math.random() * 3 + 0.5).toFixed(2),
        pageSize: (Math.random() * 2000 + 500).toFixed(0),
        requests: Math.floor(Math.random() * 80) + 20,
        suggestions: [
          "Optimize images (save 450KB)",
          "Enable text compression (save 120KB)",
          "Remove unused CSS (save 85KB)",
          "Eliminate render-blocking resources",
        ],
      });

      setTesting(false);
    }, 2500);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "var(--success)";
    if (score >= 50) return "var(--warning)";
    return "var(--danger)";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Good";
    if (score >= 50) return "Needs Work";
    return "Poor";
  };

  return (
    <div className="speed-tester-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Website Speed Tester" }]} />

          <h1 className="page-title">Website Speed Tester</h1>

          <p className="page-subtitle">
            Analyze your website performance for free
          </p>
        </div>
      </div>

      <div className="container">
        <div className="speed-tester-container">
          <form onSubmit={handleTest} className="speed-form">
            <div className="speed-input-group">
              <span className="speed-input-icon">
                <FaGlobe />
              </span>

              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-website.com"
                className="speed-input"
                required
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={testing}
              >
                {testing ? (
                  "Testing..."
                ) : (
                  <>
                    <FaRocket />
                    Analyze
                  </>
                )}
              </button>
            </div>
          </form>

          {testing && (
            <div className="speed-testing">
              <div className="speed-spinner"></div>

              <h3>Analyzing your website...</h3>

              <div className="speed-progress">
                <div className="speed-progress-bar"></div>
              </div>

              <ul className="speed-testing-steps">
                <li className="done">
                  <FaCheckCircle />
                  Loading page
                </li>

                <li className="done">
                  <FaCheckCircle />
                  Analyzing resources
                </li>

                <li className="active">
                  <FaClock />
                  Running performance tests
                </li>

                <li>
                  <FaClock />
                  Generating report
                </li>
              </ul>
            </div>
          )}

          {result && (
            <div className="speed-results">
              <div className="speed-scores">
                {[
                  {
                    label: "Performance",
                    value: result.performance,
                    icon: FaBolt,
                  },
                  {
                    label: "Accessibility",
                    value: result.accessibility,
                    icon: FaUniversalAccess,
                  },
                  {
                    label: "Best Practices",
                    value: result.bestPractices,
                    icon: FaCheckCircle,
                  },
                  {
                    label: "SEO",
                    value: result.seo,
                    icon: FaSearch,
                  },
                ].map((score, i) => {
                  const ScoreIcon = score.icon;

                  return (
                    <div key={i} className="speed-score-card">
                      <svg viewBox="0 0 100 100" className="speed-score-svg">
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
                          stroke={getScoreColor(score.value)}
                          strokeWidth="8"
                          strokeDasharray={`${score.value * 2.51} 251`}
                          strokeDashoffset="0"
                          transform="rotate(-90 50 50)"
                          strokeLinecap="round"
                        />

                        <text
                          x="50"
                          y="55"
                          textAnchor="middle"
                          fontSize="20"
                          fontWeight="700"
                          fill={getScoreColor(score.value)}
                        >
                          {score.value}
                        </text>
                      </svg>

                      <span className="speed-score-icon">
                        <ScoreIcon />
                      </span>

                      <strong>{score.label}</strong>

                      <span
                        className="speed-score-label"
                        style={{
                          color: getScoreColor(score.value),
                        }}
                      >
                        {getScoreLabel(score.value)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="speed-metrics">
                <div className="speed-metric">
                  <span className="speed-metric-value">{result.loadTime}s</span>

                  <span className="speed-metric-label">Load Time</span>
                </div>

                <div className="speed-metric">
                  <span className="speed-metric-value">
                    {result.pageSize} KB
                  </span>

                  <span className="speed-metric-label">Page Size</span>
                </div>

                <div className="speed-metric">
                  <span className="speed-metric-value">{result.requests}</span>

                  <span className="speed-metric-label">Requests</span>
                </div>
              </div>

              <div className="speed-suggestions">
                <h3>
                  <FaBullseye />
                  Optimization Suggestions
                </h3>

                {result.suggestions.map((suggestion, i) => (
                  <div key={i} className="speed-suggestion">
                    <span className="speed-suggestion-icon">
                      <FaLightbulb />
                    </span>

                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>

              <div className="speed-cta">
                <h3>Want us to optimize your website?</h3>

                <p>Our experts can improve your score to 90+ in 2 weeks.</p>

                <a href="/contact" className="btn btn-primary btn-lg">
                  Get Optimization Quote
                  <FaArrowRight />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeedTester;
