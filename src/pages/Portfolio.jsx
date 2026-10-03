import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHospital,
  FaUniversity,
  FaCloud,
  FaRobot,
  FaTruck,
  FaBook,
  FaLock,
  FaBullseye,
} from "react-icons/fa";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      title: "E-commerce Platform",
      category: "web",
      image: <FaShoppingCart />,
      description: "Full-featured e-commerce platform with payment integration",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      result: "300% increase in sales",
    },
    {
      title: "Healthcare Mobile App",
      category: "mobile",
      image: <FaHospital />,
      description: "Patient management app for a healthcare provider",
      tech: ["React Native", "Firebase", "Node.js"],
      result: "50K+ downloads",
    },
    {
      title: "Banking Dashboard",
      category: "web",
      image: <FaUniversity />,
      description: "Real-time banking dashboard for financial institution",
      tech: ["React", "D3.js", "PostgreSQL"],
      result: "Used by 10K+ users daily",
    },
    {
      title: "Cloud Migration",
      category: "cloud",
      image: <FaCloud />,
      description: "Migrated legacy system to AWS cloud infrastructure",
      tech: ["AWS", "Docker", "Kubernetes"],
      result: "60% cost reduction",
    },
    {
      title: "AI Chatbot",
      category: "ai",
      image: <FaRobot />,
      description: "Customer support chatbot using NLP",
      tech: ["Python", "TensorFlow", "OpenAI"],
      result: "80% queries automated",
    },
    {
      title: "Logistics App",
      category: "mobile",
      image: <FaTruck />,
      description: "Real-time logistics tracking application",
      tech: ["Flutter", "Google Maps", "Firebase"],
      result: "40% faster deliveries",
    },
    {
      title: "Learning Platform",
      category: "web",
      image: <FaBook />,
      description: "Online learning platform with video courses",
      tech: ["Next.js", "Stripe", "AWS S3"],
      result: "100K+ active learners",
    },
    {
      title: "Security Audit",
      category: "security",
      image: <FaLock />,
      description: "Complete security audit for fintech company",
      tech: ["Penetration Testing", "OWASP", "Burp Suite"],
      result: "Zero vulnerabilities found",
    },
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "cloud", label: "Cloud Solutions" },
    { id: "ai", label: "AI & ML" },
    { id: "security", label: "Security" },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="portfolio-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Our Portfolio</h1>
          <p className="page-subtitle">
            Explore our successful projects and client success stories
          </p>
        </div>
      </div>

      <div className="container">
        {/* Stats */}
        <div className="portfolio-stats">
          <div className="portfolio-stat">
            <span className="portfolio-stat-number">500+</span>
            <span className="portfolio-stat-label">Projects Completed</span>
          </div>
          <div className="portfolio-stat">
            <span className="portfolio-stat-number">300+</span>
            <span className="portfolio-stat-label">Happy Clients</span>
          </div>
          <div className="portfolio-stat">
            <span className="portfolio-stat-number">20+</span>
            <span className="portfolio-stat-label">Countries Served</span>
          </div>
          <div className="portfolio-stat">
            <span className="portfolio-stat-number">15+</span>
            <span className="portfolio-stat-label">Industries</span>
          </div>
        </div>

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

        {/* Projects Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project, index) => (
            <div key={index} className="portfolio-card">
              <div className="portfolio-image">{project.image}</div>
              <div className="portfolio-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="portfolio-tech">
                  {project.tech.map((t, i) => (
                    <span key={i} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="portfolio-result">
                  <span className="result-badge">
                    <FaBullseye /> {project.result}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="cta-box"
          style={{ marginTop: "4rem", marginBottom: "4rem" }}
        >
          <h2>Have a Project in Mind?</h2>
          <p>Let's discuss how we can help bring your vision to life.</p>
          <Link to="/contact" className="btn btn-secondary btn-lg">
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
