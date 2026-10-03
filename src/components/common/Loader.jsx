import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p style={{ marginTop: "1rem", color: "var(--gray-500)" }}>{message}</p>
    </div>
  );
};

export default Loader;
