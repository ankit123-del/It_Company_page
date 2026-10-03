import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setProgress(scrollPercent);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      className="scroll-to-top"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      <svg className="progress-ring" width="56" height="56">
        <circle
          className="progress-ring-circle"
          stroke="var(--primary)"
          strokeWidth="3"
          fill="transparent"
          r="26"
          cx="28"
          cy="28"
          style={{
            strokeDasharray: `${2 * Math.PI * 26}`,
            strokeDashoffset: `${2 * Math.PI * 26 * (1 - progress / 100)}`,
          }}
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
