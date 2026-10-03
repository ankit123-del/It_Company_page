import React, { useState } from "react";

const FAQSearch = ({ faqs, onFilter }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (value) => {
    setQuery(value);
    const filtered = faqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(value.toLowerCase()) ||
        faq.a.toLowerCase().includes(value.toLowerCase()),
    );
    onFilter(filtered);
  };

  return (
    <div className="faq-search">
      <span className="faq-search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search FAQs..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="faq-search-input"
      />
      {query && (
        <button className="faq-search-clear" onClick={() => handleSearch("")}>
          ✕
        </button>
      )}
    </div>
  );
};

export default FAQSearch;
