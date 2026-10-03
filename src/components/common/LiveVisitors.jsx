import React, { useState, useEffect } from "react";

const LiveVisitors = () => {
  const [visitors, setVisitors] = useState(47);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors((prev) => {
        const change = Math.floor(Math.random() * 7) - 3;
        const newValue = prev + change;
        return Math.max(30, Math.min(80, newValue));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-visitors">
      <span className="live-dot"></span>
      <span className="live-text">
        <strong>{visitors}</strong> people viewing this site
      </span>
    </div>
  );
};

export default LiveVisitors;
