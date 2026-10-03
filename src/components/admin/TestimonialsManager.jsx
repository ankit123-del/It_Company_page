import React, { useState } from "react";
import {
  FaQuoteLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaStar,
  FaRegStar,
  FaCheck,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaCommentDots,
  FaUserPlus,
  FaTimesCircle,
} from "react-icons/fa";

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      company: "TechCorp India",
      role: "CEO",
      text: "SMLAG TechSolutions transformed our business with their innovative web solutions. Highly recommended!",
      rating: 5,
      approved: true,
      date: "2024-10-15",
    },
    {
      id: 2,
      name: "Priya Sharma",
      company: "StartupHub",
      role: "Founder",
      text: "Their mobile app development team is exceptional. Delivered on time and exceeded all our expectations.",
      rating: 5,
      approved: true,
      date: "2024-10-12",
    },
    {
      id: 3,
      name: "Amit Patel",
      company: "CloudNine",
      role: "CTO",
      text: "Professional team with deep technical expertise. Our cloud migration was seamless.",
      rating: 5,
      approved: false,
      date: "2024-10-10",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    text: "",
    rating: 5,
    approved: true,
  });

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.text) {
      showToast("Name and text required", "error");
      return;
    }

    if (editing) {
      setTestimonials(
        testimonials.map((t) => (t.id === editing.id ? { ...t, ...form } : t)),
      );
      showToast("Testimonial updated!");
    } else {
      setTestimonials([
        {
          id: testimonials.length + 1,
          ...form,
          date: new Date().toISOString().split("T")[0],
        },
        ...testimonials,
      ]);
      showToast("Testimonial added!");
    }
    setShowModal(false);
    setEditing(null);
    setForm({
      name: "",
      company: "",
      role: "",
      text: "",
      rating: 5,
      approved: true,
    });
  };

  const handleEdit = (t) => {
    setEditing(t);
    setForm(t);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this testimonial?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
      showToast("Deleted", "info");
    }
  };

  const toggleApproved = (id) => {
    setTestimonials(
      testimonials.map((t) =>
        t.id === id ? { ...t, approved: !t.approved } : t,
      ),
    );
  };

  // ===== Render star row with Font Awesome =====
  const renderStars = (rating, interactive = false, onPick = null) => (
    <div style={{ display: "inline-flex", gap: "0.15rem" }}>
      {[1, 2, 3, 4, 5].map((r) => {
        const filled = rating >= r;
        const StarIcon = filled ? FaStar : FaRegStar;
        const starEl = (
          <StarIcon
            style={{
              color: filled ? "#f59e0b" : "#cbd5e1",
              fontSize: interactive ? "1.35rem" : "0.95rem",
            }}
          />
        );

        if (!interactive) return <span key={r}>{starEl}</span>;

        return (
          <button
            key={r}
            type="button"
            onClick={() => onPick?.(r)}
            style={{
              background: "none",
              border: "none",
              padding: "0.15rem",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            {starEl}
          </button>
        );
      })}
    </div>
  );

  const approvedCount = testimonials.filter((t) => t.approved).length;
  const pendingCount = testimonials.filter((t) => !t.approved).length;
  const avgRating = testimonials.length
    ? (
        testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length
      ).toFixed(1)
    : "0.0";

  return (
    <div className="admin-dashboard">
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>
            {toast.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
          </span>
          {toast.message}
        </div>
      )}

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#4f46e5" }}>
              <FaQuoteLeft />
            </span>
          </div>
          <div className="admin-stat-value">{testimonials.length}</div>
          <div className="admin-stat-label">Total</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#10b981" }}>
              <FaCheckCircle />
            </span>
          </div>
          <div className="admin-stat-value">{approvedCount}</div>
          <div className="admin-stat-label">Approved</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#f59e0b" }}>
              <FaClock />
            </span>
          </div>
          <div className="admin-stat-value">{pendingCount}</div>
          <div className="admin-stat-label">Pending</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#f59e0b" }}>
              <FaStar />
            </span>
          </div>
          <div className="admin-stat-value">{avgRating}</div>
          <div className="admin-stat-label">Avg Rating</div>
        </div>
      </div>

      {/* Grid */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>
            <FaCommentDots style={{ marginRight: "0.4rem" }} /> Testimonials
          </h3>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setEditing(null);
              setShowModal(true);
            }}
          >
            <FaPlus /> Add Testimonial
          </button>
        </div>

        <div className="testimonials-admin-grid">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`testimonial-admin-card ${
                t.approved ? "approved" : "pending"
              }`}
            >
              <div className="testimonial-admin-quote">
                <FaQuoteLeft />
              </div>
              <div className="testimonial-admin-stars">
                {renderStars(t.rating)}
              </div>
              <p className="testimonial-admin-text">"{t.text}"</p>
              <div className="testimonial-admin-author">
                <div className="testimonial-admin-avatar">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <strong>{t.name}</strong>
                  <span>
                    {t.role} • {t.company}
                  </span>
                </div>
              </div>
              <div className="testimonial-admin-footer">
                <span
                  className={`badge badge-${t.approved ? "green" : "yellow"}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  {t.approved ? (
                    <>
                      <FaCheckCircle /> Approved
                    </>
                  ) : (
                    <>
                      <FaClock /> Pending
                    </>
                  )}
                </span>
                <div className="admin-actions">
                  <button
                    className="icon-btn-sm"
                    onClick={() => toggleApproved(t.id)}
                    title={t.approved ? "Unapprove" : "Approve"}
                  >
                    {t.approved ? <FaTimes /> : <FaCheck />}
                  </button>
                  <button className="icon-btn-sm" onClick={() => handleEdit(t)}>
                    <FaEdit />
                  </button>
                  <button
                    className="icon-btn-sm"
                    onClick={() => handleDelete(t.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "var(--gray-500)",
                gridColumn: "1 / -1",
              }}
            >
              No testimonials yet
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {editing ? <FaEdit /> : <FaUserPlus />}
                {editing ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  color: "var(--gray-500)",
                }}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Client Name *</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="CEO"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  className="input-field"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Testimonial Text *</label>
                <textarea
                  className="input-field"
                  rows="4"
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <div className="rating-picker">
                  {renderStars(form.rating, true, (r) =>
                    setForm({ ...form, rating: r }),
                  )}
                </div>
              </div>
              <label className="settings-toggle" style={{ cursor: "pointer" }}>
                <div>
                  <strong>Approved</strong>
                  <span>Show on website</span>
                </div>
                <div className="switch">
                  <input
                    type="checkbox"
                    checked={form.approved}
                    onChange={(e) =>
                      setForm({ ...form, approved: e.target.checked })
                    }
                  />
                  <span className="slider"></span>
                </div>
              </label>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManager;
