import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <div className="cookie-icon">🍪</div>
        <div className="cookie-text">
          <h4>We use cookies</h4>
          <p>
            We use cookies to enhance your experience. By continuing, you agree
            to our <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
      <div className="cookie-actions">
        <button className="btn btn-outline btn-sm" onClick={handleDecline}>
          Decline
        </button>
        <button className="btn btn-primary btn-sm" onClick={handleAccept}>
          Accept All
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
