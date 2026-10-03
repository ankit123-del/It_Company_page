import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  block = false,
  ...props
}) => {
  const sizeClass =
    {
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
    }[size] || "";

  const blockClass = block ? "btn-block" : "";

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${sizeClass} ${blockClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
