import React, { useState } from "react";
import {
  FaSearch,
  FaVideo,
  FaCog,
  FaBullseye,
  FaCheckCircle,
  FaCalendarAlt,
  FaLink,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

const VideoConsultation = () => {
  const [step, setStep] = useState(1);

  const [booking, setBooking] = useState({
    type: "",
    date: "",
    time: "",
    duration: "30",
    name: "",
    email: "",
    notes: "",
  });

  const [confirmed, setConfirmed] = useState(false);

  const meetingTypes = [
    {
      id: "discovery",
      label: "Discovery Call",
      duration: "30 min",
      icon: <FaSearch />,
    },
    {
      id: "demo",
      label: "Product Demo",
      duration: "45 min",
      icon: <FaVideo />,
    },
    {
      id: "technical",
      label: "Technical Consultation",
      duration: "60 min",
      icon: <FaCog />,
    },
    {
      id: "strategy",
      label: "Strategy Session",
      duration: "90 min",
      icon: <FaBullseye />,
    },
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

  const handleBook = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="video-confirm">
        <div className="video-confirm-icon">
          <FaCheckCircle />
        </div>

        <h2>Video Call Scheduled!</h2>

        <p>We've sent a calendar invite to your email.</p>

        <div className="video-confirm-card">
          <div className="video-confirm-row">
            <span>Meeting Type:</span>
            <strong>
              {meetingTypes.find((t) => t.id === booking.type)?.label}
            </strong>
          </div>

          <div className="video-confirm-row">
            <span>Date:</span>
            <strong>{booking.date}</strong>
          </div>

          <div className="video-confirm-row">
            <span>Time:</span>
            <strong>{booking.time}</strong>
          </div>

          <div className="video-confirm-row">
            <span>Duration:</span>
            <strong>
              {meetingTypes.find((t) => t.id === booking.type)?.duration}
            </strong>
          </div>
        </div>

        <div className="video-confirm-actions">
          <button className="btn btn-primary">
            <FaCalendarAlt />
            Add to Calendar
          </button>

          <button className="btn btn-outline">
            <FaLink />
            Copy Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="video-consultation">
      <div className="video-progress">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`video-step ${step >= s ? "active" : ""}`}>
            <div className="video-step-circle">{s}</div>

            <span>{s === 1 ? "Type" : s === 2 ? "Schedule" : "Details"}</span>
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="video-step-content">
          <h3>What type of consultation?</h3>

          <div className="meeting-types-grid">
            {meetingTypes.map((type) => (
              <button
                key={type.id}
                className={`meeting-type-card ${
                  booking.type === type.id ? "active" : ""
                }`}
                onClick={() =>
                  setBooking({
                    ...booking,
                    type: type.id,
                  })
                }
              >
                <span className="meeting-type-icon">{type.icon}</span>

                <strong>{type.label}</strong>

                <span className="meeting-type-duration">{type.duration}</span>
              </button>
            ))}
          </div>

          <button
            className="btn btn-primary btn-block"
            onClick={() => setStep(2)}
            disabled={!booking.type}
          >
            Continue
            <FaArrowRight />
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="video-step-content">
          <h3>Choose date & time</h3>

          <div className="video-datetime-grid">
            <div>
              <label className="input-label">Date</label>

              <input
                type="date"
                value={booking.date}
                onChange={(e) =>
                  setBooking({
                    ...booking,
                    date: e.target.value,
                  })
                }
                className="input-field"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <label className="input-label">Time</label>

              <div className="time-slots-grid">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={`time-slot ${
                      booking.time === time ? "active" : ""
                    }`}
                    onClick={() =>
                      setBooking({
                        ...booking,
                        time,
                      })
                    }
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="video-actions">
            <button className="btn btn-outline" onClick={() => setStep(1)}>
              <FaArrowLeft />
              Back
            </button>

            <button
              className="btn btn-primary"
              onClick={() => setStep(3)}
              disabled={!booking.date || !booking.time}
            >
              Continue
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <form className="video-step-content" onSubmit={handleBook}>
          <h3>Your details</h3>

          <div className="video-form-grid">
            <div>
              <label className="input-label">Name *</label>

              <input
                type="text"
                value={booking.name}
                onChange={(e) =>
                  setBooking({
                    ...booking,
                    name: e.target.value,
                  })
                }
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="input-label">Email *</label>

              <input
                type="email"
                value={booking.email}
                onChange={(e) =>
                  setBooking({
                    ...booking,
                    email: e.target.value,
                  })
                }
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="input-label">Notes (Optional)</label>

            <textarea
              value={booking.notes}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  notes: e.target.value,
                })
              }
              className="input-field"
              rows="3"
              placeholder="What would you like to discuss?"
            />
          </div>

          <div className="video-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setStep(2)}
            >
              <FaArrowLeft />
              Back
            </button>

            <button type="submit" className="btn btn-primary">
              <FaVideo />
              Confirm Booking
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default VideoConsultation;
