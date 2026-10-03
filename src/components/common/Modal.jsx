import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "400px",
    md: "600px",
    lg: "800px",
    xl: "1000px",
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: sizes[size] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "var(--gray-500)",
              padding: "0.25rem 0.5rem",
              borderRadius: "var(--radius)",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "var(--gray-100)")
            }
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
