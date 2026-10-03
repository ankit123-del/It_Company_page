import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaCheckCircle,
  FaCreditCard,
  FaFileInvoice,
  FaDownload,
} from "react-icons/fa";

const Billing = () => {
  const [currentPlan, setCurrentPlan] = useState("professional");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: { monthly: 2500, yearly: 25000 },
      features: ["5 users", "10GB storage", "Basic support", "2 projects"],
      color: "gray",
    },
    {
      id: "professional",
      name: "Professional",
      price: { monthly: 7500, yearly: 75000 },
      features: [
        "25 users",
        "100GB storage",
        "Priority support",
        "Unlimited projects",
        "Analytics",
        "API access",
      ],
      color: "primary",
      popular: true,
    },
    {
      id: "business",
      name: "Business",
      price: { monthly: 20000, yearly: 200000 },
      features: [
        "100 users",
        "1TB storage",
        "24/7 support",
        "Everything in Pro",
        "White-label",
        "SSO",
        "Audit logs",
      ],
      color: "purple",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: { monthly: "Custom", yearly: "Custom" },
      features: [
        "Unlimited users",
        "Unlimited storage",
        "Dedicated manager",
        "Everything in Business",
        "Custom SLA",
        "On-premise option",
      ],
      color: "dark",
    },
  ];

  const invoices = [
    { id: "INV-2024-089", date: "2024-10-01", amount: 7500, status: "paid" },
    { id: "INV-2024-088", date: "2024-09-01", amount: 7500, status: "paid" },
    { id: "INV-2024-087", date: "2024-08-01", amount: 7500, status: "paid" },
    { id: "INV-2024-086", date: "2024-07-01", amount: 7500, status: "paid" },
  ];

  const usage = {
    users: { current: 18, total: 25 },
    storage: { current: 45, total: 100 },
    apiCalls: { current: 125000, total: 500000 },
    projects: { current: 12, total: "∞" },
  };

  return (
    <div className="billing-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Billing" }]} />
          <h1 className="page-title">Billing & Subscription</h1>
          <p className="page-subtitle">Manage your plan and payment methods</p>
        </div>
      </div>

      <div className="container">
        {/* Current Plan Banner */}
        <div className="billing-current">
          <div className="billing-current-info">
            <span className="billing-current-badge">Current Plan</span>
            <h2>Professional</h2>
            <p>₹7,500/month • Renews on Nov 1, 2024</p>
          </div>
          <div className="billing-current-actions">
            <button className="btn btn-outline">Change Plan</button>
            <button className="btn btn-primary">Upgrade</button>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="billing-usage">
          <h3>Usage This Month</h3>
          <div className="usage-grid">
            {Object.entries(usage).map(([key, val]) => {
              const percent =
                val.total === "∞"
                  ? 0
                  : Math.round((val.current / val.total) * 100);
              return (
                <div key={key} className="usage-card">
                  <div className="usage-card-header">
                    <span className="usage-label">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                    <span className="usage-values">
                      {val.current.toLocaleString()} /{" "}
                      {val.total === "∞" ? "∞" : val.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="usage-bar">
                    <div
                      className="usage-bar-fill"
                      style={{
                        width: `${percent}%`,
                        background:
                          percent > 80
                            ? "var(--danger)"
                            : percent > 60
                              ? "var(--warning)"
                              : "var(--success)",
                      }}
                    />
                  </div>
                  {val.total !== "∞" && (
                    <span className="usage-percent">{percent}% used</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="billing-toggle">
          <button
            className={`billing-btn ${billingCycle === "monthly" ? "active" : ""}`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            className={`billing-btn ${billingCycle === "yearly" ? "active" : ""}`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly <span className="save-badge">Save 20%</span>
          </button>
        </div>

        {/* Plans */}
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.popular ? "popular" : ""} ${currentPlan === plan.id ? "current" : ""}`}
            >
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              {currentPlan === plan.id && (
                <div className="current-badge">Current Plan</div>
              )}
              <h3 className="pricing-name">{plan.name}</h3>
              <div className="pricing-price">
                {typeof plan.price[billingCycle] === "number" ? (
                  <>
                    <span className="price-currency">₹</span>
                    <span className="price-amount">
                      {plan.price[billingCycle].toLocaleString("en-IN")}
                    </span>
                    <span className="price-period">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </>
                ) : (
                  <span className="price-amount">
                    {plan.price[billingCycle]}
                  </span>
                )}
              </div>
              <ul className="pricing-features">
                {plan.features.map((f, i) => (
                  <li key={i}>
                    <span className="feature-check">
                      <FaCheckCircle />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`btn ${plan.popular ? "btn-primary" : "btn-outline"} btn-block`}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? "Current Plan" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Method */}
        <div className="billing-card">
          <div className="billing-card-header">
            <h3>
              <FaCreditCard /> Payment Method
            </h3>
            <button className="btn btn-outline btn-sm">+ Add Method</button>
          </div>
          <div className="payment-method">
            <span className="payment-icon">
              <FaCreditCard />
            </span>
            <div>
              <strong>•••• •••• •••• 4242</strong>
              <span>Visa • Expires 12/2026</span>
            </div>
            <span className="badge badge-green">Default</span>
          </div>
        </div>

        {/* Invoice History */}
        <div className="billing-card">
          <div className="billing-card-header">
            <h3>
              <FaFileInvoice /> Invoice History
            </h3>
            <button className="btn btn-ghost btn-sm">Export All</button>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <strong>{inv.id}</strong>
                    </td>
                    <td>{inv.date}</td>
                    <td>₹{inv.amount.toLocaleString("en-IN")}</td>
                    <td>
                      <span className="badge badge-green">{inv.status}</span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm">
                        <FaDownload /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
