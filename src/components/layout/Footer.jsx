import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const socialLinks = [
  {
    href: "#",
    icon: faFacebookF,
    label: "Facebook",
  },
  {
    href: "#",
    icon: faTwitter,
    label: "Twitter",
  },
  {
    href: "#",
    icon: faLinkedinIn,
    label: "LinkedIn",
  },
  {
    href: "#",
    icon: faYoutube,
    label: "YouTube",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {" "}
      <div className="container">
        {" "}
        <div className="footer-content">
          {/* Company Info */}{" "}
          <div className="footer-column">
            {" "}
            <div className="footer-brand">
              {" "}
              <span className="footer-logo">ST</span>{" "}
              <span className="footer-name">SMLAG TechSolutions</span>{" "}
            </div>
            <p className="footer-description">
              Innovative IT solutions for businesses worldwide. We help you grow
              with cutting-edge technology.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-link"
                  aria-label={social.label}
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>

            <Link to="/about" className="footer-link">
              About Us
            </Link>

            <Link to="/services" className="footer-link">
              Services
            </Link>

            <Link to="/contact" className="footer-link">
              Contact
            </Link>

            <Link to="/careers" className="footer-link">
              Careers
            </Link>
          </div>
          {/* Services */}
          <div className="footer-column">
            <h4 className="footer-heading">Services</h4>

            <Link to="/services" className="footer-link">
              Web Development
            </Link>

            <Link to="/services" className="footer-link">
              Mobile Apps
            </Link>

            <Link to="/services" className="footer-link">
              Cloud Solutions
            </Link>

            <Link to="/services" className="footer-link">
              Cyber Security
            </Link>
          </div>
          {/* Contact Info */}
          <div className="footer-column">
            <h4 className="footer-heading">Contact</h4>

            <p className="footer-contact">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>610 Kailash Tower, Jaipur, India</span>
            </p>

            <p className="footer-contact">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>info@smlagtech.com</span>
            </p>

            <p className="footer-contact">
              <FontAwesomeIcon icon={faPhone} />
              <span>+91 8769882582</span>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-text">
            © {currentYear} SMLAG TechSolutions Inc. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>

            <Link to="/terms" className="footer-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
