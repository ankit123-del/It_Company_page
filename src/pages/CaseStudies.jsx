import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHospital,
  FaCloud,
  FaRobot,
  FaBullseye,
  FaLightbulb,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

const CaseStudies = () => {
  const [filter, setFilter] = useState("all");

  const caseStudies = [
    {
      id: 1,
      title: "E-commerce Platform for Fashion Retailer",
      client: "FashionHub",
      industry: "Retail",
      category: "web",
      icon: <FaShoppingCart />,
      challenge:
        "Needed a modern e-commerce platform to compete with market leaders.",
      solution:
        "Built a custom React-based platform with AI-powered recommendations.",
      results: [
        "300% increase in sales",
        "50% faster load times",
        "10K+ new customers",
      ],
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      duration: "4 months",
    },
    {
      id: 2,
      title: "Healthcare Mobile App",
      client: "MediCare Plus",
      industry: "Healthcare",
      category: "mobile",
      icon: <FaHospital />,
      challenge:
        "Patients needed a way to book appointments and access records easily.",
      solution: "Developed a React Native app with telemedicine features.",
      results: ["50K+ downloads", "4.8★ rating", "40% fewer no-shows"],
      tech: ["React Native", "Firebase", "WebRTC"],
      duration: "6 months",
    },
    {
      id: 3,
      title: "Cloud Migration for Fintech",
      client: "PayTech Solutions",
      industry: "Finance",
      category: "cloud",
      icon: <FaCloud />,
      challenge: "Legacy infrastructure was costly and couldn't scale.",
      solution: "Migrated to AWS with microservices architecture.",
      results: ["60% cost reduction", "99.99% uptime", "5x faster deployment"],
      tech: ["AWS", "Docker", "Kubernetes", "Terraform"],
      duration: "8 months",
    },
    {
      id: 4,
      title: "AI Chatbot for Customer Support",
      client: "SupportGenie",
      industry: "SaaS",
      category: "ai",
      icon: <FaRobot />,
      challenge: "Support team was overwhelmed with repetitive queries.",
      solution: "Built an AI chatbot using OpenAI and custom training.",
      results: [
        "80% queries automated",
        "90% customer satisfaction",
        "24/7 support",
      ],
      tech: ["Python", "OpenAI", "FastAPI"],
      duration: "3 months",
    },
  ];

  const categories = [
    { id: "all", label: "All Cases" },
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "cloud", label: "Cloud" },
    { id: "ai", label: "AI/ML" },
  ];

  const filtered =
    filter === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.category === filter);

  return (
    <div className="case-studies-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Case Studies</h1>
          <p className="page-subtitle">Real success stories from our clients</p>
        </div>
      </div>

      <div className="container">
        {/* Filters */}
        <div className="portfolio-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${filter === cat.id ? "active" : ""}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Case Studies List */}
        <div className="case-studies-list">
          {filtered.map((study) => (
            <div key={study.id} className="case-study-card">
              <div className="case-study-header">
                <div className="case-study-icon">{study.icon}</div>
                <div className="case-study-meta">
                  <span className="tag">{study.industry}</span>
                  <span className="tag">{study.duration}</span>
                </div>
              </div>

              <h2>{study.title}</h2>
              <p className="case-study-client">
                Client: <strong>{study.client}</strong>
              </p>

              <div className="case-study-sections">
                <div className="case-study-section">
                  <h4>
                    <FaBullseye /> Challenge
                  </h4>
                  <p>{study.challenge}</p>
                </div>
                <div className="case-study-section">
                  <h4>
                    <FaLightbulb /> Solution
                  </h4>
                  <p>{study.solution}</p>
                </div>
              </div>

              <div className="case-study-results">
                <h4>
                  <FaChartLine /> Results
                </h4>
                <div className="results-grid">
                  {study.results.map((result, i) => (
                    <div key={i} className="result-item">
                      <span className="result-check">
                        <FaCheckCircle />
                      </span>
                      {result}
                    </div>
                  ))}
                </div>
              </div>

              <div className="case-study-tech">
                {study.tech.map((t, i) => (
                  <span key={i} className="technology-tag">
                    {t}
                  </span>
                ))}
              </div>

              <div className="case-study-footer">
                <Link to="/contact" className="btn btn-primary">
                  Start Similar Project →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-box" style={{ marginBottom: "4rem" }}>
          <h2>Want to Be Our Next Success Story?</h2>
          <p>Let's discuss how we can help transform your business.</p>
          <Link to="/contact" className="btn btn-secondary btn-lg">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
