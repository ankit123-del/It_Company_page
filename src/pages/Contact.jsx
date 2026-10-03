import React, { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaCheckCircle,
  FaMap,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const services = [
    "Web Development",
    "Mobile Development",
    "Cloud Solutions",
    "Cyber Security",
    "AI & Machine Learning",
    "Data Analytics",
    "DevOps Services",
    "UI/UX Design",
    "Other",
  ];

  const budgets = [
    "Less than ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹5,00,000",
    "₹5,00,000 - ₹10,00,000",
    "More than ₹10,00,000",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        message: "",
      });
    }, 5000);
  };

  return (
    <div className="contact-page">
      {/* Page Header */}
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Get in touch with us for any inquiries or support
          </p>
        </div>
      </div>

      <div className="container">
        {/* Contact Info Cards */}
        <div className="contact-info-grid">
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>Visit Us</h3>
            <p>610,611 Kailash Tower </p>
            <p>Jaipur, Rajasthan 302031</p>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <FaEnvelope />
            </div>
            <h3>Email Us</h3>
            <p>info@smlagtech.com</p>
            <p>support@smlagtech.com</p>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <FaPhone />
            </div>
            <h3>Call Us</h3>
            <p>+91 8769882582</p>
            <p>+91 6260160276</p>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <FaClock />
            </div>
            <h3>Working Hours</h3>
            <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
            <p>Sat: 10:00 AM - 2:00 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-grid">
          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            <p className="contact-form-subtitle">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="success-message">
                <FaCheckCircle /> Thank you for contacting us! We'll get back to
                you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <Input
                    label="Your Name *"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="John Doe"
                  />
                  <Input
                    label="Your Email *"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-row">
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                  />
                  <Input
                    label="Company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                  />
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label className="input-label">Service Interested In</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select budget</option>
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`input-field ${errors.message ? "error" : ""}`}
                    rows="5"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className="input-error">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" variant="primary" size="lg" block>
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Map / Sidebar */}
          <div className="contact-sidebar">
            <div className="contact-map">
              <div className="map-placeholder">
                <span className="map-icon">
                  <FaMap />
                </span>
                <p>610 Kailash Tower, Lal Kothi</p>
                <p>Jaipur, Rajasthan 400001</p>
              </div>
            </div>

            <div className="contact-faq">
              <h3>Quick Answers</h3>
              <div className="faq-item">
                <h4>How long does a project take?</h4>
                <p>Timeline varies based on scope. Typically 4-12 weeks.</p>
              </div>
              <div className="faq-item">
                <h4>Do you provide support?</h4>
                <p>Yes, we provide 24/7 support for all our projects.</p>
              </div>
              <div className="faq-item">
                <h4>What about pricing?</h4>
                <p>We offer flexible pricing based on project requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
