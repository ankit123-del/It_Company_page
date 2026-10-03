import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaChartBar,
  FaFolder,
  FaCheckCircle,
  FaUsers,
  FaUser,
  FaCog,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaChartBar /> },
    { path: "/projects", label: "Projects", icon: <FaFolder /> },
    { path: "/tasks", label: "Tasks", icon: <FaCheckCircle /> },
    { path: "/team", label: "Team", icon: <FaUsers /> },
    { path: "/profile", label: "Profile", icon: <FaUser /> },
    { path: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  // Admin only menu items
  if (user?.role === "admin" || user?.role === "manager") {
    menuItems.push({ path: "/users", label: "Users", icon: <FaUsers /> });
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">Menu</h3>
          <button className="sidebar-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={onClose}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
