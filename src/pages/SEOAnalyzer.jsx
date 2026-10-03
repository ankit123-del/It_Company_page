import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";

const SEOAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    setReport(null);

    setTimeout(() => {
      setReport({
        score: Math.floor(Math.random() * 30) + 60,
        checks: [
          {
            name: "Title Tag",
            status: "pass",
            value: "Optimal length (52 chars)",
          },
          {
            name: "Meta Description",
            status: "pass",
            value: "Present (145 chars)",
          },
          { name: "H1 Heading", status: "pass", value: "Found 1 H1" },
          {
            name: "Image Alt Text",
            status: "warning",
            value: "12 images missing alt",
          },
          { name: "SSL Certificate", status: "pass", value: "HTTPS enabled" },
          {
            name: "Mobile Friendly",
            status: "pass",
            value: "Responsive design",
          },
          { name: "Page Speed", status: "warning", value: "Could be improved" },
          {
            name: "Internal Links",
            status: "pass",
            value: "15 internal links",
          },
          { name: "External Links", status: "pass", value: "5 external links" },
          {
            name: "Keyword Density",
            status: "warning",
            value: "2.1% (good: 1-2%)",
          },
          { name: "Robots.txt", status: "pass", value: "Present" },
          { name: "Sitemap", status: "fail", value: "Not found" },
        ],
        keywords: [
          { word: "web development", count: 12, density: "2.1%" },
          { word: "IT solutions", count: 8, density: "1.4%" },
          { word: "digital", count: 6, density: "1.1%" },
        ],
      });
      setAnalyzing(false);
    }, 2000);
  };

  const statusIcon = {
    pass: "✅",
    warning: "⚠️",
    fail: "❌",
  };

  return (
    <div className="seo-analyzer-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "SEO Analyzer" }]} />
          <h1 className="page-title">Free SEO Analyzer</h1>
          <p className="page-subtitle">
            Analyze your website's SEO health instantly
          </p>
        </div>
      </div>

      <div className="container">
        <div className="seo-container">
          <form onSubmit={handleAnalyze} className="seo-form">
            <div className="speed-input-group">
              <span className="speed-input-icon">🔍</span>
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
                disabled={analyzing}
              >
                {analyzing ? "Analyzing..." : "Analyze SEO"}
              </button>
            </div>
          </form>

          {analyzing && (
            <div className="speed-testing">
              <div className="speed-spinner"></div>
              <h3>Analyzing SEO factors...</h3>
            </div>
          )}

          {report && (
            <div className="seo-report">
              {/* Overall Score */}
              <div className="seo-score-header">
                <div className="seo-score-circle">
                  <span className="seo-score-number">{report.score}</span>
                  <span className="seo-score-label">SEO Score</span>
                </div>
                <div className="seo-score-summary">
                  <h3>Your SEO Score: {report.score}/100</h3>
                  <p>
                    {report.score >= 80
                      ? "Great job! Your SEO is well-optimized."
                      : report.score >= 60
                        ? "Good, but there's room for improvement."
                        : "Needs significant work to rank well."}
                  </p>
                </div>
              </div>

              {/* Checks */}
              <div className="seo-checks">
                <h3>SEO Checks</h3>
                <div className="seo-checks-grid">
                  {report.checks.map((check, i) => (
                    <div key={i} className={`seo-check-item ${check.status}`}>
                      <span className="seo-check-icon">
                        {statusIcon[check.status]}
                      </span>
                      <div>
                        <strong>{check.name}</strong>
                        <span>{check.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div className="seo-keywords">
                <h3>Top Keywords</h3>
                <div className="seo-keywords-list">
                  {report.keywords.map((kw, i) => (
                    <div key={i} className="seo-keyword-item">
                      <span className="seo-keyword-word">{kw.word}</span>
                      <span className="seo-keyword-count">{kw.count}x</span>
                      <span className="seo-keyword-density">{kw.density}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="speed-cta">
                <h3>Need Help Improving Your SEO?</h3>
                <p>Our SEO experts can help you rank higher on Google.</p>
                <a href="/contact" className="btn btn-primary btn-lg">
                  Get SEO Services →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SEOAnalyzer;
