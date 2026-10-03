import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("exit_popup_shown");
    if (hasShown) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("exit_popup_shown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setShow(false), 3000);
  };

  if (!show) return null;

  return (
    <div className="exit-overlay" onClick={() => setShow(false)}>
      <div className="exit-popup" onClick={(e) => e.stopPropagation()}>
        <button className="exit-close" onClick={() => setShow(false)}>
          ✕
        </button>

        {submitted ? (
          <div className="exit-success">
            <div className="exit-icon">🎉</div>
            <h3>Thank You!</h3>
            <p>Check your email for the free guide.</p>
          </div>
        ) : (
          <>
            <div className="exit-icon">🎁</div>
            <h3>Wait! Don't Leave Yet</h3>
            <p className="exit-subtitle">
              Get our FREE guide:{" "}
              <strong>
                "10 Ways to Transform Your Business with Technology"
              </strong>
            </p>

            <form onSubmit={handleSubmit} className="exit-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field"
                required
              />
              <button type="submit" className="btn btn-primary btn-block">
                Send Me the Free Guide →
              </button>
            </form>

            <p className="exit-note">No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ExitIntentPopup;
