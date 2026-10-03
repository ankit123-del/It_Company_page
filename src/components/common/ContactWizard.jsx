import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    projectType: "",
    // Step 2
    budget: "",
    timeline: "",
    // Step 3
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    // Step 4
    agreeToTerms: false,
  });

  const steps = [
    { num: 1, label: "Project" },
    { num: 2, label: "Budget" },
    { num: 3, label: "Details" },
    { num: 4, label: "Confirm" },
  ];

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    navigate("/contact?success=true");
  };

  return (
    <div className="contact-wizard">
      {/* Progress */}
      <div className="wizard-progress">
        {steps.map((s) => (
          <div
            key={s.num}
            className={`wizard-step ${step >= s.num ? "active" : ""}`}
          >
            <div className="wizard-circle">{step > s.num ? "✓" : s.num}</div>
            <span className="wizard-label">{s.label}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="wizard-form">
        {step === 1 && (
          <div className="wizard-content">
            <h3>What can we help you with?</h3>
            <div className="wizard-options">
              {[
                { id: "new-project", icon: "🚀", label: "Start a New Project" },
                {
                  id: "existing",
                  icon: "🔧",
                  label: "Existing Project Support",
                },
                { id: "consultation", icon: "💡", label: "Free Consultation" },
                {
                  id: "partnership",
                  icon: "🤝",
                  label: "Partnership Opportunity",
                },
                { id: "other", icon: "💬", label: "Other Inquiry" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`wizard-option ${formData.projectType === opt.id ? "active" : ""}`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, projectType: opt.id }))
                  }
                >
                  <span className="wizard-option-icon">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleNext}
              disabled={!formData.projectType}
            >
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="wizard-content">
            <h3>Tell us about your budget & timeline</h3>

            <div className="wizard-field">
              <label>Budget Range</label>
              <div className="wizard-options-grid">
                {[
                  { id: "under-50k", label: "Under ₹50,000" },
                  { id: "50k-100k", label: "₹50K - ₹1L" },
                  { id: "100k-500k", label: "₹1L - ₹5L" },
                  { id: "500k-1m", label: "₹5L - ₹10L" },
                  { id: "above-1m", label: "Above ₹10L" },
                  { id: "not-sure", label: "Not Sure Yet" },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`wizard-option-small ${formData.budget === b.id ? "active" : ""}`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, budget: b.id }))
                    }
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="wizard-field">
              <label>Timeline</label>
              <div className="wizard-options-grid">
                {[
                  { id: "asap", label: "⚡ ASAP" },
                  { id: "1-month", label: "📅 1 Month" },
                  { id: "2-3-months", label: "📅 2-3 Months" },
                  { id: "flexible", label: "🔄 Flexible" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`wizard-option-small ${formData.timeline === t.id ? "active" : ""}`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, timeline: t.id }))
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="wizard-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleBack}
              >
                ← Back
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
                disabled={!formData.budget || !formData.timeline}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="wizard-content">
            <h3>Your contact details</h3>

            <div className="wizard-field">
              <label>Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="input-field"
                required
              />
            </div>

            <div className="wizard-row">
              <div className="wizard-field">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="input-field"
                  required
                />
              </div>
              <div className="wizard-field">
                <label>Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="wizard-field">
              <label>Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
                className="input-field"
              />
            </div>

            <div className="wizard-field">
              <label>Project Description *</label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="input-field"
                rows="4"
                required
                placeholder="Tell us about your project..."
              />
            </div>

            <div className="wizard-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleBack}
              >
                ← Back
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
                disabled={
                  !formData.name ||
                  !formData.email ||
                  !formData.phone ||
                  !formData.message
                }
              >
                Review →
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="wizard-content">
            <h3>Review & Confirm</h3>

            <div className="review-card">
              <div className="review-item">
                <span>Project Type:</span>
                <strong>{formData.projectType}</strong>
              </div>
              <div className="review-item">
                <span>Budget:</span>
                <strong>{formData.budget}</strong>
              </div>
              <div className="review-item">
                <span>Timeline:</span>
                <strong>{formData.timeline}</strong>
              </div>
              <div className="review-item">
                <span>Name:</span>
                <strong>{formData.name}</strong>
              </div>
              <div className="review-item">
                <span>Email:</span>
                <strong>{formData.email}</strong>
              </div>
              <div className="review-item">
                <span>Phone:</span>
                <strong>{formData.phone}</strong>
              </div>
              {formData.company && (
                <div className="review-item">
                  <span>Company:</span>
                  <strong>{formData.company}</strong>
                </div>
              )}
              <div className="review-item full">
                <span>Message:</span>
                <p>{formData.message}</p>
              </div>
            </div>

            <label className="wizard-checkbox">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    agreeToTerms: e.target.checked,
                  }))
                }
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            <div className="wizard-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleBack}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!formData.agreeToTerms}
              >
                Submit Inquiry ✓
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactWizard;
