import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";

const CompareServices = () => {
  const [selected, setSelected] = useState(["basic", "pro"]);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 25000,
      features: {
        pages: "5",
        responsive: true,
        seo: "Basic",
        cms: false,
        ecommerce: false,
        auth: false,
        api: false,
        support: "3 months",
        revisions: "2",
        analytics: false,
      },
    },
    {
      id: "pro",
      name: "Professional",
      price: 75000,
      features: {
        pages: "15",
        responsive: true,
        seo: "Advanced",
        cms: true,
        ecommerce: true,
        auth: true,
        api: true,
        support: "6 months",
        revisions: "5",
        analytics: true,
      },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 200000,
      features: {
        pages: "Unlimited",
        responsive: true,
        seo: "Premium",
        cms: true,
        ecommerce: true,
        auth: true,
        api: true,
        support: "12 months",
        revisions: "Unlimited",
        analytics: true,
      },
    },
  ];

  const featureLabels = {
    pages: "Number of Pages",
    responsive: "Responsive Design",
    seo: "SEO Optimization",
    cms: "CMS Integration",
    ecommerce: "E-commerce",
    auth: "User Authentication",
    api: "API Integration",
    support: "Support Duration",
    revisions: "Design Revisions",
    analytics: "Analytics Setup",
  };

  const renderValue = (value) => {
    if (typeof value === "boolean") {
      return value ? "✅" : "❌";
    }
    return value;
  };

  const togglePlan = (id) => {
    if (selected.includes(id)) {
      if (selected.length > 2) {
        setSelected(selected.filter((p) => p !== id));
      }
    } else {
      if (selected.length < 3) {
        setSelected([...selected, id]);
      }
    }
  };

  const selectedPlans = plans.filter((p) => selected.includes(p.id));

  return (
    <div className="compare-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Compare Plans" }]} />
          <h1 className="page-title">Compare Our Plans</h1>
          <p className="page-subtitle">
            Find the perfect plan for your business
          </p>
        </div>
      </div>

      <div className="container">
        {/* Plan Selector */}
        <div className="compare-selector">
          {plans.map((plan) => (
            <button
              key={plan.id}
              className={`compare-plan-btn ${selected.includes(plan.id) ? "active" : ""}`}
              onClick={() => togglePlan(plan.id)}
              disabled={selected.length >= 3 && !selected.includes(plan.id)}
            >
              {plan.name}
              {selected.includes(plan.id) && <span>✓</span>}
            </button>
          ))}
        </div>
        <p className="compare-hint">Select up to 3 plans to compare</p>

        {/* Comparison Table */}
        <div className="compare-table-wrapper">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                {selectedPlans.map((plan) => (
                  <th key={plan.id}>
                    <div className="compare-header">
                      <h3>{plan.name}</h3>
                      <div className="compare-price">
                        ₹{plan.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(featureLabels).map((feature) => (
                <tr key={feature}>
                  <td className="compare-feature-label">
                    {featureLabels[feature]}
                  </td>
                  {selectedPlans.map((plan) => (
                    <td key={plan.id} className="compare-feature-value">
                      {renderValue(plan.features[feature])}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="compare-cta-row">
                <td></td>
                {selectedPlans.map((plan) => (
                  <td key={plan.id}>
                    <Link to="/contact" className="btn btn-primary">
                      Get Started
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareServices;
