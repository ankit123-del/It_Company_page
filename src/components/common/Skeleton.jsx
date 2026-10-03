import React from "react";

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton-image"></div>
    <div className="skeleton skeleton-title"></div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text short"></div>
  </div>
);

export const SkeletonText = ({ lines = 3 }) => (
  <div className="skeleton-text-group">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`skeleton skeleton-text ${i === lines - 1 ? "short" : ""}`}
      ></div>
    ))}
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="services-grid">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
