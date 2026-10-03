import React, { useState } from "react";
import { Link } from "react-router-dom";

const CostEstimator = () => {
  const [selections, setSelections] = useState({
    type: "",
    pages: "1-5",
    features: [],
    timeline: "normal",
    design: "standard",
  });

  const projectTypes = [
    { id: "website", label: "Business Website", base: 50000, icon: "🌐" },
    { id: "ecommerce", label: "E-commerce Store", base: 150000, icon: "🛒" },
    { id: "webapp", label: "Web Application", base: 250000, icon: "⚙️" },
    { id: "mobile", label: "Mobile App", base: 200000, icon: "📱" },
    { id: "custom", label: "Custom Solution", base: 300000, icon: "🚀" },
  ];

  const pageOptions = [
    { id: "1-5", label: "1-5 pages", multiplier: 1 },
    { id: "6-15", label: "6-15 pages", multiplier: 1.3 },
    { id: "16-30", label: "16-30 pages", multiplier: 1.6 },
    { id: "30+", label: "30+ pages", multiplier: 2 },
  ];

  const features = [
    { id: "auth", label: "User Authentication", cost: 25000 },
    { id: "payment", label: "Payment Gateway", cost: 35000 },
    { id: "chat", label: "Live Chat", cost: 15000 },
    { id: "cms", label: "CMS Integration", cost: 30000 },
    { id: "seo", label: "Advanced SEO", cost: 20000 },
    { id: "analytics", label: "Analytics Dashboard", cost: 25000 },
    { id: "api", label: "Third-party APIs", cost: 20000 },
    { id: "multilang", label: "Multi-language", cost: 40000 },
  ];

  const timelineOptions = [
    { id: "urgent", label: "Urgent (2-4 weeks)", multiplier: 1.5 },
    { id: "normal", label: "Normal (1-2 months)", multiplier: 1 },
    { id: "flexible", label: "Flexible (2-3 months)", multiplier: 0.9 },
  ];

  const designOptions = [
    { id: "basic", label: "Basic Design", multiplier: 0.8 },
    { id: "standard", label: "Professional Design", multiplier: 1 },
    { id: "premium", label: "Premium Custom Design", multiplier: 1.4 },
  ];

  const calculateCost = () => {
    const project = projectTypes.find((p) => p.id === selections.type);
    if (!project) return 0;

    const pages = pageOptions.find((p) => p.id === selections.pages);
    const timeline = timelineOptions.find((t) => t.id === selections.timeline);
    const design = designOptions.find((d) => d.id === selections.design);

    let cost = project.base * pages.multiplier;
    cost = cost * timeline.multiplier;
    cost = cost * design.multiplier;

    const featuresCost = selections.features.reduce((sum, id) => {
      const feature = features.find((f) => f.id === id);
      return sum + (feature ? feature.cost : 0);
    }, 0);

    return Math.round(cost + featuresCost);
  };

  const toggleFeature = (id) => {
    setSelections((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id],
    }));
  };

  const estimatedCost = calculateCost();

  return (
    <div className="cost-estimator">
      <div className="estimator-header">
        <h3>💰 Project Cost Estimator</h3>
        <p>Get an instant estimate for your project</p>
      </div>

      <div className="estimator-body">
        {/* Project Type */}
        <div className="estimator-section">
          <h4>1. Project Type</h4>
          <div className="estimator-options">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                className={`estimator-option ${selections.type === type.id ? "active" : ""}`}
                onClick={() =>
                  setSelections((prev) => ({ ...prev, type: type.id }))
                }
              >
                <span className="option-icon">{type.icon}</span>
                <span className="option-label">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pages */}
        <div className="estimator-section">
          <h4>2. Number of Pages/Screens</h4>
          <div className="estimator-options">
            {pageOptions.map((page) => (
              <button
                key={page.id}
                className={`estimator-option ${selections.pages === page.id ? "active" : ""}`}
                onClick={() =>
                  setSelections((prev) => ({ ...prev, pages: page.id }))
                }
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="estimator-section">
          <h4>3. Features (Select Multiple)</h4>
          <div className="estimator-options">
            {features.map((feature) => (
              <button
                key={feature.id}
                className={`estimator-option ${selections.features.includes(feature.id) ? "active" : ""}`}
                onClick={() => toggleFeature(feature.id)}
              >
                <span>{feature.label}</span>
                <span className="option-price">
                  +₹{feature.cost.toLocaleString("en-IN")}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="estimator-section">
          <h4>4. Timeline</h4>
          <div className="estimator-options">
            {timelineOptions.map((t) => (
              <button
                key={t.id}
                className={`estimator-option ${selections.timeline === t.id ? "active" : ""}`}
                onClick={() =>
                  setSelections((prev) => ({ ...prev, timeline: t.id }))
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Design */}
        <div className="estimator-section">
          <h4>5. Design Quality</h4>
          <div className="estimator-options">
            {designOptions.map((d) => (
              <button
                key={d.id}
                className={`estimator-option ${selections.design === d.id ? "active" : ""}`}
                onClick={() =>
                  setSelections((prev) => ({ ...prev, design: d.id }))
                }
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="estimator-result">
        <div className="estimate-display">
          <span className="estimate-label">Estimated Cost</span>
          <span className="estimate-price">
            ₹{estimatedCost.toLocaleString("en-IN")}
          </span>
          <span className="estimate-note">*Prices are approximate</span>
        </div>
        <div className="estimate-actions">
          <Link to="/contact" className="btn btn-primary btn-lg">
            Get Detailed Quote →
          </Link>
          <p className="estimate-note">
            This is an automated estimate. Contact us for a precise quote.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostEstimator;
