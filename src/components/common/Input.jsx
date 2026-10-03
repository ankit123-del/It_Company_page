import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ label, error, className = "", type = "text", icon, ...props }, ref) => {
    const errorClass = error ? "error" : "";
    const iconClass = icon ? "with-icon" : "";

    return (
      <div className="input-group">
        {label && <label className="input-label">{label}</label>}
        <div className="input-wrapper">
          {icon && <span className="input-icon">{icon}</span>}
          <input
            ref={ref}
            type={type}
            className={`input-field ${errorClass} ${iconClass} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="input-error">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
