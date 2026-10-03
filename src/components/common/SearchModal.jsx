import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchData = [
    {
      title: "Web Development",
      path: "/services",
      type: "Service",
      keywords: "react node website",
    },
    {
      title: "Mobile Development",
      path: "/services",
      type: "Service",
      keywords: "ios android app",
    },
    {
      title: "Cloud Solutions",
      path: "/services",
      type: "Service",
      keywords: "aws azure",
    },
    {
      title: "Cyber Security",
      path: "/services",
      type: "Service",
      keywords: "security audit",
    },
    {
      title: "About Us",
      path: "/about",
      type: "Page",
      keywords: "company team",
    },
    {
      title: "Careers",
      path: "/careers",
      type: "Page",
      keywords: "jobs hiring",
    },
    {
      title: "Portfolio",
      path: "/portfolio",
      type: "Page",
      keywords: "projects work",
    },
    { title: "Blog", path: "/blog", type: "Page", keywords: "articles news" },
    {
      title: "Pricing",
      path: "/pricing",
      type: "Page",
      keywords: "plans cost",
    },
    {
      title: "Contact",
      path: "/contact",
      type: "Page",
      keywords: "reach email phone",
    },
    { title: "FAQ", path: "/faq", type: "Page", keywords: "questions help" },
  ];

  const results =
    query.length > 0
      ? searchData.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.keywords.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  const handleSelect = (path) => {
    navigate(path);
    setQuery("");
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search services, pages, articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-modal-input"
            autoFocus
          />
          <button className="search-close" onClick={onClose}>
            ESC
          </button>
        </div>

        {query && (
          <div className="search-results">
            {results.length > 0 ? (
              results.map((item, i) => (
                <button
                  key={i}
                  className="search-result-item"
                  onClick={() => handleSelect(item.path)}
                >
                  <div>
                    <strong>{item.title}</strong>
                    <span className="search-result-type">{item.type}</span>
                  </div>
                  <span>→</span>
                </button>
              ))
            ) : (
              <div className="search-no-results">
                <p>No results found for "{query}"</p>
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="search-hints">
            <p className="search-hint-title">Popular Searches:</p>
            <div className="search-hint-tags">
              {["Web Development", "Mobile Apps", "Pricing", "Careers"].map(
                (tag) => (
                  <button
                    key={tag}
                    className="search-hint-tag"
                    onClick={() => setQuery(tag)}
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
