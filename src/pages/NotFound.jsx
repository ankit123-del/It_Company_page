import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaEnvelope } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-code">404</div>
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-text">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              <FaHome /> Back to Home
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg">
              <FaEnvelope /> Contact Support
            </Link>
          </div>

          <div className="not-found-links">
            <p>Popular Pages:</p>
            <div className="not-found-tags">
              <Link to="/services" className="tag">
                Services
              </Link>
              <Link to="/about" className="tag">
                About
              </Link>
              <Link to="/portfolio" className="tag">
                Portfolio
              </Link>
              <Link to="/blog" className="tag">
                Blog
              </Link>
              <Link to="/pricing" className="tag">
                Pricing
              </Link>
              <Link to="/faq" className="tag">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
