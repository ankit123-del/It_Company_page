import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { Link } from "react-router-dom";
import {
  FaHospital,
  FaUniversity,
  FaShoppingCart,
  FaBook,
  FaBriefcase,
  FaGlobe,
  FaCog,
  FaMobileAlt,
  FaRocket,
  FaLock,
  FaCreditCard,
  FaComments,
  FaEdit,
  FaChartBar,
  FaPlug,
  FaRobot,
  FaLanguage,
  FaBolt,
  FaCalendarAlt,
  FaSyncAlt,
  FaLightbulb,
  FaStar,
  FaCrown,
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
  FaBullseye,
  FaClock,
} from "react-icons/fa";

const QuoteGenerator = () => {
  const [step, setStep] = useState(1);

  const [answers, setAnswers] = useState({
    industry: "",
    projectType: "",
    features: [],
    timeline: "",
    budget: "",
    priority: "",
  });

  const [generatedQuote, setGeneratedQuote] = useState(null);

  const questions = {
    1: {
      question: "What is your industry?",
      key: "industry",
      options: [
        {
          value: "healthcare",
          label: "Healthcare",
          icon: FaHospital,
          multiplier: 1.3,
        },
        {
          value: "finance",
          label: "Finance",
          icon: FaUniversity,
          multiplier: 1.4,
        },
        {
          value: "retail",
          label: "Retail",
          icon: FaShoppingCart,
          multiplier: 1,
        },
        {
          value: "education",
          label: "Education",
          icon: FaBook,
          multiplier: 1.1,
        },
        {
          value: "other",
          label: "Other",
          icon: FaBriefcase,
          multiplier: 1,
        },
      ],
    },

    2: {
      question: "What type of project?",
      key: "projectType",
      options: [
        {
          value: "website",
          label: "Website",
          icon: FaGlobe,
          base: 50000,
        },
        {
          value: "webapp",
          label: "Web Application",
          icon: FaCog,
          base: 150000,
        },
        {
          value: "mobile",
          label: "Mobile App",
          icon: FaMobileAlt,
          base: 200000,
        },
        {
          value: "ecommerce",
          label: "E-commerce",
          icon: FaShoppingCart,
          base: 180000,
        },
        {
          value: "custom",
          label: "Custom Solution",
          icon: FaRocket,
          base: 300000,
        },
      ],
    },

    3: {
      question: "Select required features",
      key: "features",
      multi: true,
      options: [
        {
          value: "auth",
          label: "User Authentication",
          icon: FaLock,
          cost: 25000,
        },
        {
          value: "payment",
          label: "Payment Gateway",
          icon: FaCreditCard,
          cost: 35000,
        },
        {
          value: "chat",
          label: "Live Chat",
          icon: FaComments,
          cost: 15000,
        },
        {
          value: "cms",
          label: "CMS",
          icon: FaEdit,
          cost: 30000,
        },
        {
          value: "analytics",
          label: "Analytics",
          icon: FaChartBar,
          cost: 25000,
        },
        {
          value: "api",
          label: "Third-party APIs",
          icon: FaPlug,
          cost: 20000,
        },
        {
          value: "ai",
          label: "AI Integration",
          icon: FaRobot,
          cost: 75000,
        },
        {
          value: "multilang",
          label: "Multi-language",
          icon: FaLanguage,
          cost: 40000,
        },
      ],
    },

    4: {
      question: "What is your timeline?",
      key: "timeline",
      options: [
        {
          value: "urgent",
          label: "Urgent (2-4 weeks)",
          icon: FaBolt,
          multiplier: 1.5,
        },
        {
          value: "normal",
          label: "Normal (1-2 months)",
          icon: FaCalendarAlt,
          multiplier: 1,
        },
        {
          value: "flexible",
          label: "Flexible (2-3 months)",
          icon: FaSyncAlt,
          multiplier: 0.9,
        },
      ],
    },

    5: {
      question: "Priority level?",
      key: "priority",
      options: [
        {
          value: "basic",
          label: "Basic - Quality Focus",
          icon: FaLightbulb,
          multiplier: 0.9,
        },
        {
          value: "standard",
          label: "Standard - Balanced",
          icon: FaStar,
          multiplier: 1,
        },
        {
          value: "premium",
          label: "Premium - Feature Rich",
          icon: FaCrown,
          multiplier: 1.3,
        },
      ],
    },
  };

  const handleAnswer = (questionKey, value, multi = false) => {
    if (multi) {
      setAnswers((prev) => ({
        ...prev,
        [questionKey]: prev[questionKey].includes(value)
          ? prev[questionKey].filter((v) => v !== value)
          : [...prev[questionKey], value],
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [questionKey]: value,
      }));
    }
  };

  const generateQuote = () => {
    const industry = questions[1].options.find(
      (o) => o.value === answers.industry,
    );

    const projectType = questions[2].options.find(
      (o) => o.value === answers.projectType,
    );

    const timeline = questions[4].options.find(
      (o) => o.value === answers.timeline,
    );

    const priority = questions[5].options.find(
      (o) => o.value === answers.priority,
    );

    let baseCost = projectType?.base || 50000;

    baseCost *= industry?.multiplier || 1;
    baseCost *= timeline?.multiplier || 1;
    baseCost *= priority?.multiplier || 1;

    const featuresCost = answers.features.reduce((sum, f) => {
      const feature = questions[3].options.find((o) => o.value === f);

      return sum + (feature?.cost || 0);
    }, 0);

    const totalCost = baseCost + featuresCost;

    const weeks =
      timeline?.value === "urgent"
        ? 3
        : timeline?.value === "flexible"
          ? 12
          : 8;

    setGeneratedQuote({
      baseCost,
      featuresCost,
      totalCost,
      weeks,
      breakdown: [
        {
          label: "Base Development",
          value: baseCost,
        },
        ...answers.features.map((f) => {
          const feature = questions[3].options.find((o) => o.value === f);

          return {
            label: feature?.label || f,
            value: feature?.cost || 0,
          };
        }),
      ],
    });

    setStep(6);
  };

  const renderStep = () => {
    const q = questions[step];

    if (!q) return null;

    const isMulti = q.multi;
    const currentValue = answers[q.key];

    const canProceed = isMulti ? currentValue.length > 0 : currentValue;

    return (
      <div className="quote-step">
        <div className="quote-progress">
          <div
            className="quote-progress-bar"
            style={{
              width: `${(step / 5) * 100}%`,
            }}
          />
        </div>

        <span className="quote-step-indicator">Question {step} of 5</span>

        <h2 className="quote-question">{q.question}</h2>

        <div className="quote-options">
          {q.options.map((opt) => {
            const isSelected = isMulti
              ? currentValue.includes(opt.value)
              : currentValue === opt.value;

            const OptionIcon = opt.icon;

            return (
              <button
                key={opt.value}
                type="button"
                className={`quote-option ${isSelected ? "active" : ""}`}
                onClick={() => handleAnswer(q.key, opt.value, isMulti)}
              >
                <span className="quote-option-content">
                  <OptionIcon className="quote-option-icon" />
                  <span>{opt.label}</span>
                </span>

                {isSelected && (
                  <span className="quote-check">
                    <FaCheck />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="quote-actions">
          {step > 1 && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setStep(step - 1)}
            >
              <FaArrowLeft />
              Back
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => (step < 5 ? setStep(step + 1) : generateQuote())}
            disabled={!canProceed}
          >
            {step < 5 ? (
              <>
                Next
                <FaArrowRight />
              </>
            ) : (
              <>
                <FaBullseye />
                Generate Quote
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="quote-generator-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "AI Quote Generator" }]} />

          <h1 className="page-title">AI-Powered Quote Generator</h1>

          <p className="page-subtitle">
            Get an instant, personalized quote in under 2 minutes
          </p>
        </div>
      </div>

      <div className="container">
        <div className="quote-container">
          {step <= 5 ? (
            renderStep()
          ) : (
            <div className="quote-result">
              <div className="quote-result-header">
                <span className="quote-result-icon">
                  <FaBullseye />
                </span>

                <h2>Your Estimated Quote</h2>

                <p>Based on your requirements</p>
              </div>

              <div className="quote-amount">
                <span className="quote-amount-label">Estimated Cost</span>

                <span className="quote-amount-value">
                  ₹{generatedQuote.totalCost.toLocaleString("en-IN")}
                </span>

                <span className="quote-amount-time">
                  <FaClock />
                  Estimated timeline: {generatedQuote.weeks} weeks
                </span>
              </div>

              <div className="quote-breakdown">
                <h3>Cost Breakdown</h3>

                {generatedQuote.breakdown.map((item, i) => (
                  <div key={i} className="quote-breakdown-item">
                    <span>{item.label}</span>

                    <span>₹{item.value.toLocaleString("en-IN")}</span>
                  </div>
                ))}

                <div className="quote-breakdown-total">
                  <span>Total</span>

                  <span>
                    ₹{generatedQuote.totalCost.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="quote-result-actions">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Get Detailed Quote
                  <FaArrowRight />
                </Link>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setStep(1);
                    setGeneratedQuote(null);
                  }}
                >
                  Start Over
                </button>
              </div>

              <p className="quote-disclaimer">
                *This is an automated estimate. Contact us for a precise quote
                based on detailed requirements.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
