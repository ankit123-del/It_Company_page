import React, { useState, useEffect } from "react";

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem("newsletter_shown");
    if (!shown) {
      const timer = setTimeout(() => setIsVisible(true), 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("newsletter_shown", "true");
    setIsVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    localStorage.setItem("newsletter_shown", "true");
    setTimeout(handleClose, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="newsletter-popup-overlay" onClick={handleClose}>
      <div className="newsletter-popup" onClick={(e) => e.stopPropagation()}>
        <button className="newsletter-popup-close" onClick={handleClose}>
          ✕
        </button>

        {subscribed ? (
          <div className="newsletter-popup-success">
            <div className="success-icon">✅</div>
            <h3>Thank you!</h3>
            <p>You've been subscribed to our newsletter.</p>
          </div>
        ) : (
          <>
            <div className="newsletter-popup-icon">📬</div>
            <h3>Subscribe to Our Newsletter</h3>
            <p>
              Get the latest tech insights and updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="newsletter-popup-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-popup-input"
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
            <p className="newsletter-popup-note">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup;
