import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentScheduler = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isBooked, setIsBooked] = useState(false);

  const services = [
    "Web Development Consultation",
    "Mobile App Consultation",
    "Cloud Architecture Review",
    "Security Audit",
    "AI/ML Project Discussion",
    "General IT Consultation",
  ];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  // Generate next 14 days
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      if (date.getDay() !== 0) {
        // Skip Sundays
        dates.push({
          value: date.toISOString().split("T")[0],
          day: date.toLocaleDateString("en-US", { weekday: "short" }),
          date: date.getDate(),
          month: date.toLocaleDateString("en-US", { month: "short" }),
        });
      }
    }
    return dates;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      navigate("/contact");
    }, 3000);
  };

  if (isBooked) {
    return (
      <div className="appointment-success">
        <div className="success-icon-large">✅</div>
        <h3>Appointment Confirmed!</h3>
        <p>You'll receive a confirmation email shortly.</p>
        <div className="appointment-details">
          <p>
            <strong>Service:</strong> {formData.service}
          </p>
          <p>
            <strong>Date:</strong> {formData.date}
          </p>
          <p>
            <strong>Time:</strong> {formData.time}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-scheduler">
      <h3>Book a Free Consultation</h3>
      <p className="appointment-subtitle">30-minute session with our experts</p>

      {/* Progress */}
      <div className="appointment-progress">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`progress-step ${step >= s ? "active" : ""}`}>
            <div className="progress-circle">{s}</div>
            <span>
              {s === 1 ? "Service" : s === 2 ? "Date & Time" : "Your Info"}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="appointment-step">
          <h4>What service are you interested in?</h4>
          <div className="service-options">
            {services.map((service) => (
              <button
                key={service}
                className={`service-option ${formData.service === service ? "active" : ""}`}
                onClick={() => setFormData((prev) => ({ ...prev, service }))}
              >
                {service}
              </button>
            ))}
          </div>
          <button
            className="btn btn-primary btn-block"
            onClick={() => setStep(2)}
            disabled={!formData.service}
          >
            Next →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="appointment-step">
          <h4>Pick a date</h4>
          <div className="date-grid">
            {getAvailableDates().map((d) => (
              <button
                key={d.value}
                className={`date-option ${formData.date === d.value ? "active" : ""}`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, date: d.value }))
                }
              >
                <span className="date-day">{d.day}</span>
                <span className="date-num">{d.date}</span>
                <span className="date-month">{d.month}</span>
              </button>
            ))}
          </div>

          <h4 style={{ marginTop: "1.5rem" }}>Pick a time slot</h4>
          <div className="time-grid">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={`time-option ${formData.time === time ? "active" : ""}`}
                onClick={() => setFormData((prev) => ({ ...prev, time }))}
              >
                {time}
              </button>
            ))}
          </div>

          <div className="appointment-actions">
            <button className="btn btn-outline" onClick={() => setStep(1)}>
              ← Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setStep(3)}
              disabled={!formData.date || !formData.time}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleBooking} className="appointment-step">
          <h4>Your details</h4>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="john@example.com"
            />
          </div>
          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="+91 9876543210"
            />
          </div>
          <div className="form-group">
            <label>Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="input-field"
              rows="3"
              placeholder="Tell us about your project..."
            />
          </div>

          <div className="appointment-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setStep(2)}
            >
              ← Back
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm Booking ✓
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AppointmentScheduler;
