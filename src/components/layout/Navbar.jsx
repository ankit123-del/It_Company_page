import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import SearchModal from "../common/SearchModal";
import NotificationCenter from "../common/NotificationCenter";
import LanguageSelector from "../common/LanguageSelector";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaCloud,
  FaLock,
  FaRobot,
  FaChartBar,
  FaSyncAlt,
  FaPalette,
  FaBuilding,
  FaUsers,
  FaBriefcase,
  FaBullseye,
  FaChartLine,
  FaFileAlt,
  FaBook,
  FaBalanceScale,
  FaMoneyBillWave,
  FaSearch,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  // ✅ Timeout ref to delay dropdown close
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ✅ Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // ✅ Open dropdown immediately (cancel any pending close)
  const handleDropdownEnter = (name) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(name);
  };

  // ✅ Close dropdown with 250ms delay
  const handleDropdownLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 250);
  };

  const servicesMenu = [
    {
      name: "Web Development",
      path: "/services/web-development",
      icon: <FaLaptopCode />,
    },
    {
      name: "Mobile Development",
      path: "/services/mobile-development",
      icon: <FaMobileAlt />,
    },
    {
      name: "Cloud Solutions",
      path: "/services/cloud-solutions",
      icon: <FaCloud />,
    },
    {
      name: "Cyber Security",
      path: "/services/cyber-security",
      icon: <FaLock />,
    },
    {
      name: "AI & Machine Learning",
      path: "/services/ai-ml",
      icon: <FaRobot />,
    },
    {
      name: "Data Analytics",
      path: "/services/data-analytics",
      icon: <FaChartBar />,
    },
    { name: "DevOps Services", path: "/services/devops", icon: <FaSyncAlt /> },
    { name: "UI/UX Design", path: "/services/ui-ux", icon: <FaPalette /> },
  ];

  const companyMenu = [
    { name: "About Us", path: "/about", icon: <FaBuilding /> },
    { name: "Our Team", path: "/team", icon: <FaUsers /> },
    { name: "Careers", path: "/careers", icon: <FaBriefcase /> },
    { name: "Portfolio", path: "/portfolio", icon: <FaBullseye /> },
    { name: "Case Studies", path: "/case-studies", icon: <FaChartLine /> },
    { name: "Blog", path: "/blog", icon: <FaFileAlt /> },
    { name: "Knowledge Base", path: "/docs", icon: <FaBook /> },
    { name: "Analytics", path: "/analytics", icon: <FaChartBar /> },
  ];

  const toolsMenu = [
    { name: "AI Quote Generator", path: "/quote", icon: <FaBullseye /> },
    {
      name: "Compare Plans",
      path: "/services/compare",
      icon: <FaBalanceScale />,
    },
    { name: "Project Tracker", path: "/tracker", icon: <FaChartLine /> },
    { name: "Pricing Calculator", path: "/quote", icon: <FaMoneyBillWave /> },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <Link to="/" className="navbar-brand">
              <span className="navbar-logo">ST</span>
              <span className="navbar-brand-text">SMLAG TechSolutions</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="navbar-links">
              <Link to="/" className="navbar-link">
                {t("nav.home")}
              </Link>

              {/* Services Dropdown */}
              <div
                className="navbar-dropdown"
                onMouseEnter={() => handleDropdownEnter("services")}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="navbar-link navbar-dropdown-toggle">
                  {t("nav.services")} <span className="dropdown-arrow">▾</span>
                </button>
                {activeDropdown === "services" && (
                  <div className="dropdown-menu">
                    <div className="dropdown-grid">
                      {servicesMenu.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="dropdown-item"
                        >
                          <span className="dropdown-icon">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="dropdown-footer">
                      <Link to="/services" className="dropdown-view-all">
                        View All Services →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Company Dropdown */}
              <div
                className="navbar-dropdown"
                onMouseEnter={() => handleDropdownEnter("company")}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="navbar-link navbar-dropdown-toggle">
                  Company <span className="dropdown-arrow">▾</span>
                </button>
                {activeDropdown === "company" && (
                  <div className="dropdown-menu">
                    <div className="dropdown-grid">
                      {companyMenu.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="dropdown-item"
                        >
                          <span className="dropdown-icon">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tools Dropdown */}
              <div
                className="navbar-dropdown"
                onMouseEnter={() => handleDropdownEnter("tools")}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="navbar-link navbar-dropdown-toggle">
                  Tools <span className="dropdown-arrow">▾</span>
                </button>
                {activeDropdown === "tools" && (
                  <div className="dropdown-menu dropdown-menu-small">
                    <div className="dropdown-grid dropdown-grid-single">
                      {toolsMenu.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="dropdown-item"
                        >
                          <span className="dropdown-icon">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/pricing" className="navbar-link">
                {t("nav.pricing")}
              </Link>
              <Link to="/contact" className="navbar-link">
                {t("nav.contact")}
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="navbar-actions">
              <button
                className="icon-btn"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                title="Search (Ctrl+K)"
              >
                <FaSearch />
              </button>

              <button
                className="icon-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>

              <NotificationCenter />
              <LanguageSelector />

              <Link to="/contact" className="btn btn-primary">
                Get a Quote
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="navbar-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`navbar-mobile ${isMenuOpen ? "active" : ""}`}>
            <div
              className="navbar-mobile-actions"
              style={{ marginTop: 0, marginBottom: "1rem" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <button
                  className="icon-btn"
                  onClick={() => setIsSearchOpen(true)}
                  style={{ flex: 1 }}
                >
                  <FaSearch /> Search
                </button>
                <button
                  className="icon-btn"
                  onClick={toggleTheme}
                  style={{ flex: 1 }}
                >
                  {theme === "dark" ? (
                    <>
                      <FaSun /> Light
                    </>
                  ) : (
                    <>
                      <FaMoon /> Dark
                    </>
                  )}
                </button>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <LanguageSelector />
                <NotificationCenter />
              </div>
            </div>

            <div className="navbar-mobile-links">
              <Link to="/" className="navbar-mobile-link">
                {t("nav.home")}
              </Link>

              <div className="navbar-mobile-section">
                <span className="navbar-mobile-section-title">
                  {t("nav.services")}
                </span>
                {servicesMenu.slice(0, 4).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="navbar-mobile-sublink"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
                <Link to="/services" className="navbar-mobile-sublink view-all">
                  <span>→</span>
                  <span>View All Services</span>
                </Link>
              </div>

              <div className="navbar-mobile-section">
                <span className="navbar-mobile-section-title">Company</span>
                {companyMenu.slice(0, 4).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="navbar-mobile-sublink"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="navbar-mobile-section">
                <span className="navbar-mobile-section-title">Tools</span>
                {toolsMenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="navbar-mobile-sublink"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              <Link to="/pricing" className="navbar-mobile-link">
                {t("nav.pricing")}
              </Link>
              <Link to="/faq" className="navbar-mobile-link">
                FAQ
              </Link>
              <Link to="/contact" className="navbar-mobile-link">
                {t("nav.contact")}
              </Link>
            </div>

            <div className="navbar-mobile-actions">
              <Link to="/contact" className="btn btn-primary btn-block">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
