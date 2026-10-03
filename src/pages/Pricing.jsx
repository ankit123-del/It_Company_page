import React, { useState } from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      price: { monthly: 25000, yearly: 250000 },
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 5 pages website",
        "Basic SEO setup",
        "Responsive design",
        "Contact form",
        "3 months support",
        "Basic analytics",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: { monthly: 75000, yearly: 750000 },
      description: "Ideal for growing businesses",
      features: [
        "Custom web application",
        "Advanced SEO",
        "E-commerce integration",
        "CMS integration",
        "API development",
        "6 months support",
        "Advanced analytics",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: { monthly: 200000, yearly: 2000000 },
      description: "For large organizations with complex needs",
      features: [
        "Full-scale web application",
        "Custom features",
        "Cloud infrastructure",
        "Mobile app (iOS + Android)",
        "Third-party integrations",
        "12 months support",
        "Dedicated team",
        "24/7 premium support",
        "SLA guarantee",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "Can I change my plan later?",
      a: "Yes, you can upgrade or downgrade at any time.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, bank transfers, and UPI.",
    },
    {
      q: "Is there a setup fee?",
      a: "No setup fees. You only pay for the plan you choose.",
    },
    {
      q: "What if I need a custom solution?",
      a: "Contact us for a custom quote tailored to your needs.",
    },
  ];

  return (
    <div className="pricing-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Pricing Plans</h1>
          <p className="page-subtitle">
            Flexible pricing options for businesses of all sizes
          </p>
        </div>
      </div>

      <div className="container">
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

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.popular ? "popular" : ""}`}
            >
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              <h3 className="pricing-name">{plan.name}</h3>
              <p className="pricing-description">{plan.description}</p>
              <div className="pricing-price">
                <span className="price-currency">₹</span>
                <span className="price-amount">
                  {plan.price[billingCycle].toLocaleString("en-IN")}
                </span>
                <span className="price-period">
                  /{billingCycle === "monthly" ? "month" : "year"}
                </span>
              </div>
              <ul className="pricing-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <span className="feature-check">✅</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`btn ${plan.popular ? "btn-primary" : "btn-outline"} btn-block`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="pricing-faqs">
          <div className="section-header">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faqs-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="cta-box"
          style={{ marginTop: "4rem", marginBottom: "4rem" }}
        >
          <h2>Need a Custom Plan?</h2>
          <p>
            Contact us for a personalized quote tailored to your specific
            requirements.
          </p>
          <Link to="/contact" className="btn btn-secondary btn-lg">
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
