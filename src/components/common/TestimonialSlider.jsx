import React, { useState, useEffect } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialSlider = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="testimonial-slider">
      <div className="testimonial-slide">
        <div className="testimonial-slide-content">
          <div className="testimonial-stars">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} />
            ))}
          </div>

          <p className="testimonial-slide-text">
            "{testimonials[current].text}"
          </p>

          <div className="testimonial-author">
            <span className="testimonial-avatar">
              {testimonials[current].avatar}
            </span>

            <div>
              <strong>{testimonials[current].name}</strong>
              <span>{testimonials[current].role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-controls">
        <button
          className="testimonial-btn"
          onClick={prev}
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button className="testimonial-btn" onClick={next} aria-label="Next">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
