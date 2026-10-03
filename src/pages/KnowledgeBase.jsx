import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaBook,
  FaRocket,
  FaPlug,
  FaBookOpen,
  FaQuestionCircle,
  FaTools,
  FaSearch,
  FaFire,
  FaEye,
  FaClock,
  FaFileAlt,
} from "react-icons/fa";

const KnowledgeBase = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Articles", icon: <FaBook /> },
    { id: "getting-started", name: "Getting Started", icon: <FaRocket /> },
    { id: "api", name: "API Documentation", icon: <FaPlug /> },
    { id: "tutorials", name: "Tutorials", icon: <FaBookOpen /> },
    { id: "faq", name: "FAQs", icon: <FaQuestionCircle /> },
    { id: "troubleshooting", name: "Troubleshooting", icon: <FaTools /> },
  ];

  const articles = [
    {
      id: 1,
      title: "Getting Started with SMLAG Services",
      category: "getting-started",
      views: "2.3K",
      time: "5 min",
    },
    {
      id: 2,
      title: "API Authentication Guide",
      category: "api",
      views: "1.8K",
      time: "10 min",
    },
    {
      id: 3,
      title: "How to Deploy Your First App",
      category: "tutorials",
      views: "3.1K",
      time: "15 min",
    },
    {
      id: 4,
      title: "Common Integration Issues",
      category: "troubleshooting",
      views: "950",
      time: "8 min",
    },
    {
      id: 5,
      title: "Payment Gateway Setup",
      category: "tutorials",
      views: "1.5K",
      time: "12 min",
    },
    {
      id: 6,
      title: "Understanding Pricing Plans",
      category: "faq",
      views: "4.2K",
      time: "3 min",
    },
    {
      id: 7,
      title: "REST API Endpoints Reference",
      category: "api",
      views: "2.7K",
      time: "20 min",
    },
    {
      id: 8,
      title: "Setting Up Your Account",
      category: "getting-started",
      views: "1.9K",
      time: "4 min",
    },
    {
      id: 9,
      title: "Debugging Common Errors",
      category: "troubleshooting",
      views: "1.2K",
      time: "10 min",
    },
  ];

  const popularArticles = [
    { id: 6, title: "Understanding Pricing Plans", views: "4.2K" },
    { id: 3, title: "How to Deploy Your First App", views: "3.1K" },
    { id: 7, title: "REST API Endpoints Reference", views: "2.7K" },
    { id: 1, title: "Getting Started with SMLAG Services", views: "2.3K" },
    { id: 8, title: "Setting Up Your Account", views: "1.9K" },
  ];

  const filteredArticles = articles.filter((a) => {
    const matchesCategory =
      activeCategory === "all" || a.category === activeCategory;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="knowledge-base-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Knowledge Base" }]} />
          <h1 className="page-title">Knowledge Base</h1>
          <p className="page-subtitle">
            Find answers, guides, and documentation
          </p>

          {/* Search Bar */}
          <div className="kb-search">
            <span className="kb-search-icon">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search documentation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="kb-search-input"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="kb-layout">
          {/* Sidebar */}
          <aside className="kb-sidebar">
            <h3>Categories</h3>
            <nav className="kb-nav">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`kb-nav-item ${activeCategory === cat.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </nav>

            <div className="kb-popular">
              <h4>
                <FaFire /> Popular Articles
              </h4>
              {popularArticles.map((art) => (
                <Link
                  key={art.id}
                  to={`/docs/${art.id}`}
                  className="kb-popular-item"
                >
                  <span>{art.title}</span>
                  <span className="kb-views">
                    <FaEye /> {art.views}
                  </span>
                </Link>
              ))}
            </div>
          </aside>

          {/* Articles Grid */}
          <main className="kb-main">
            <div className="kb-results-info">
              <p>
                <strong>{filteredArticles.length}</strong> articles found
              </p>
            </div>
            <div className="kb-grid">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/docs/${article.id}`}
                  className="kb-card"
                >
                  <div className="kb-card-icon">
                    <FaFileAlt />
                  </div>
                  <h3>{article.title}</h3>
                  <div className="kb-card-meta">
                    <span className="tag">{article.category}</span>
                    <span>
                      <FaClock /> {article.time} read
                    </span>
                    <span>
                      <FaEye /> {article.views}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FaSearch />
                </div>
                <h3 className="empty-state-title">No articles found</h3>
                <p className="empty-state-description">
                  Try a different search term or category
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
