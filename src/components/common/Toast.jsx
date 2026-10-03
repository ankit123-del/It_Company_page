import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const types = {
    success: "toast-success",
    error: "toast-error",
    warning: "toast-warning",
    info: "toast-info",
  };

  const icons = {
    success: FaCheckCircle,
    error: FaTimesCircle,
    warning: FaExclamationTriangle,
    info: FaInfoCircle,
  };

  const Icon = icons[type] || FaInfoCircle;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <div className={`toast ${types[type] || types.info}`}>
      <span className="toast-icon">
        <Icon />
      </span>

      <span className="toast-message">{message}</span>

      <button
        className="toast-close"
        onClick={handleClose}
        aria-label="Close notification"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id || index}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id || index)}
        />
      ))}
    </div>
  );
};
