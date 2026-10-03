import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/" className="breadcrumb-link">
        Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="breadcrumb-separator">/</span>
          {item.path ? (
            <Link to={item.path} className="breadcrumb-link">
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
