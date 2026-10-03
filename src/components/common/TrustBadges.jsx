import React from "react";
import {
  FaTrophy,
  FaLock,
  FaCheckCircle,
  FaStar,
  FaMedal,
  FaHandshake,
} from "react-icons/fa";

const TrustBadges = () => {
  const badges = [
    {
      icon: FaTrophy,
      label: "ISO 27001 Certified",
      sublabel: "Information Security",
    },
    {
      icon: FaLock,
      label: "SSL Secured",
      sublabel: "256-bit Encryption",
    },
    {
      icon: FaCheckCircle,
      label: "GDPR Compliant",
      sublabel: "Data Protection",
    },
    {
      icon: FaStar,
      label: "5.0 Rating",
      sublabel: "500+ Reviews",
    },
    {
      icon: FaMedal,
      label: "Award Winning",
      sublabel: "Best IT Company 2024",
    },
    {
      icon: FaHandshake,
      label: "Clutch Verified",
      sublabel: "Top B2B Company",
    },
  ];

  return (
    <div className="trust-badges">
      {badges.map((badge, i) => {
        const Icon = badge.icon;

        return (
          <div key={i} className="trust-badge">
            <span className="trust-badge-icon">
              <Icon />
            </span>

            <div>
              <strong>{badge.label}</strong>
              <span>{badge.sublabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrustBadges;
