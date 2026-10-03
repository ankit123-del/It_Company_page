import React from "react";
import { Link } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaHospital,
  FaUmbrellaBeach,
  FaBook,
  FaHome,
  FaRocket,
  FaGamepad,
  FaLaptopCode,
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
} from "react-icons/fa";

const Careers = () => {
  const openings = [
    {
      title: "Senior React Developer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "4-6 years",
      description:
        "We are looking for an experienced React developer to join our growing team.",
    },
    {
      title: "Node.js Backend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      description:
        "Build scalable backend services using Node.js and modern frameworks.",
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "2-4 years",
      description:
        "Design beautiful and intuitive user interfaces for web and mobile apps.",
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      description:
        "Manage cloud infrastructure and CI/CD pipelines for our projects.",
    },
    {
      title: "Project Manager",
      department: "Operations",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "5+ years",
      description:
        "Lead project delivery and coordinate with cross-functional teams.",
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      description:
        "Drive our digital marketing efforts and grow our online presence.",
    },
  ];

  const benefits = [
    {
      icon: <FaMoneyBillWave />,
      title: "Competitive Salary",
      description: "Industry-leading compensation packages",
    },
    {
      icon: <FaHospital />,
      title: "Health Insurance",
      description: "Comprehensive health coverage for you and family",
    },
    {
      icon: <FaUmbrellaBeach />,
      title: "Paid Time Off",
      description: "Generous vacation and leave policies",
    },
    {
      icon: <FaBook />,
      title: "Learning Budget",
      description: "Annual budget for courses and certifications",
    },
    {
      icon: <FaHome />,
      title: "Remote Work",
      description: "Flexible work-from-home options",
    },
    {
      icon: <FaRocket />,
      title: "Growth Opportunities",
      description: "Fast-track career growth",
    },
    {
      icon: <FaGamepad />,
      title: "Fun Culture",
      description: "Regular team events and activities",
    },
    {
      icon: <FaLaptopCode />,
      title: "Latest Tech",
      description: "Work with cutting-edge technologies",
    },
  ];

  return (
    <div className="careers-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Join Our Team</h1>
          <p className="page-subtitle">
            Build your career with us and shape the future of technology
          </p>
        </div>
      </div>

      <div className="container">
        {/* Why Join Us */}
        <div className="section-header">
          <span className="section-tag">Why Join Us</span>
          <h2 className="section-title">Benefits & Perks</h2>
          <p className="section-subtitle">We take care of our team members</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <span className="benefit-icon">{benefit.icon}</span>
              <h4>{benefit.title}</h4>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Open Positions */}
        <div className="openings-section">
          <div className="section-header">
            <span className="section-tag">Open Positions</span>
            <h2 className="section-title">Current Openings</h2>
            <p className="section-subtitle">
              {openings.length} positions available
            </p>
          </div>
          <div className="openings-list">
            {openings.map((job, index) => (
              <div key={index} className="opening-card">
                <div className="opening-content">
                  <h3>{job.title}</h3>
                  <div className="opening-meta">
                    <span className="opening-tag">
                      <FaBuilding /> {job.department}
                    </span>
                    <span className="opening-tag">
                      <FaMapMarkerAlt /> {job.location}
                    </span>
                    <span className="opening-tag">
                      <FaClock /> {job.type}
                    </span>
                    <span className="opening-tag">
                      <FaBriefcase /> {job.experience}
                    </span>
                  </div>
                  <p className="opening-description">{job.description}</p>
                </div>
                <Link to="/contact" className="btn btn-primary">
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="cta-box"
          style={{ marginTop: "4rem", marginBottom: "4rem" }}
        >
          <h2>Don't See Your Role?</h2>
          <p>
            Send us your resume and we'll keep you in mind for future openings.
          </p>
          <Link to="/contact" className="btn btn-secondary btn-lg">
            Send Resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Careers;
