import React, { useState, useEffect } from "react";

const OnboardingTour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to SMLAG TechSolutions! 🎉",
      description:
        "Let's take a quick tour of your new dashboard. It'll only take 60 seconds.",
      icon: "👋",
      target: "center",
    },
    {
      title: "Your Dashboard 📊",
      description:
        "See all your projects, invoices, and analytics in one place.",
      icon: "📊",
      target: "dashboard",
    },
    {
      title: "Team Collaboration 💬",
      description: "Chat with your team, share files, and stay in sync.",
      icon: "💬",
      target: "chat",
    },
    {
      title: "AI Assistant 🤖",
      description: "Get help with anything - from writing to analysis.",
      icon: "🤖",
      target: "ai",
    },
    {
      title: "Command Palette ⌨️",
      description: "Press Ctrl+K anytime to quickly navigate anywhere.",
      icon: "⚡",
      target: "command",
    },
    {
      title: "You're all set! 🚀",
      description: "Start exploring and let us know if you need help.",
      icon: "✨",
      target: "center",
    },
  ];

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("onboarding_tour_done");
    if (!hasSeenTour) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("onboarding_tour_done", "true");
      setIsVisible(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding_tour_done", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const current = steps[step];

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <button className="onboarding-skip" onClick={handleSkip}>
          Skip Tour
        </button>

        <div className="onboarding-icon">{current.icon}</div>
        <h2>{current.title}</h2>
        <p>{current.description}</p>

        <div className="onboarding-progress">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`onboarding-dot ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}
            />
          ))}
        </div>

        <div className="onboarding-actions">
          {step > 0 && (
            <button
              className="btn btn-outline"
              onClick={() => setStep(step - 1)}
            >
              ← Back
            </button>
          )}
          <button className="btn btn-primary" onClick={handleNext}>
            {step === steps.length - 1 ? "Get Started 🚀" : "Next →"}
          </button>
        </div>

        <span className="onboarding-step-counter">
          Step {step + 1} of {steps.length}
        </span>
      </div>
    </div>
  );
};

export default OnboardingTour;
