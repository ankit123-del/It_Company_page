import React, { useState, useEffect } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (docHeight - windowHeight)) * 100;
      setProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
  );
};

export default ReadingProgress;
