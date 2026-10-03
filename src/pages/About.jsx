import React from "react";
import { Link } from "react-router-dom";
import {
  FaBullseye,
  FaEye,
  FaGem,
  FaLightbulb,
  FaHandshake,
  FaRocket,
  FaUserTie,
  FaLaptopCode,
  FaTools,
  FaPaintBrush,
  FaServer,
  FaFlask,
  FaShieldAlt,
  FaClipboardList,
} from "react-icons/fa";

const About = () => {
  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      icon: <FaUserTie />,
      bio: "15+ years in tech leadership",
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      icon: <FaLaptopCode />,
      bio: "Expert in cloud architecture",
    },
    {
      name: "Michael Brown",
      role: "Head of Engineering",
      icon: <FaTools />,
      bio: "Full-stack development expert",
    },
    {
      name: "Emily Davis",
      role: "UX Director",
      icon: <FaPaintBrush />,
      bio: "Award-winning designer",
    },
    {
      name: "David Wilson",
      role: "DevOps Lead",
      icon: <FaServer />,
      bio: "Automation specialist",
    },
    {
      name: "Lisa Anderson",
      role: "AI/ML Specialist",
      icon: <FaFlask />,
      bio: "Machine learning expert",
    },
    {
      name: "Robert Taylor",
      role: "Security Lead",
      icon: <FaShieldAlt />,
      bio: "Cybersecurity expert",
    },
    {
      name: "Jennifer Lee",
      role: "Project Manager",
      icon: <FaClipboardList />,
      bio: "Agile certified PM",
    },
  ];

  const values = [
    {
      icon: <FaBullseye />,
      title: "Excellence",
      description: "We deliver nothing but the best quality in every project",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "We embrace new technologies and creative solutions",
    },
    {
      icon: <FaHandshake />,
      title: "Integrity",
      description: "We build trust through transparency and honesty",
    },
    {
      icon: <FaRocket />,
      title: "Growth",
      description: "We help our clients and team grow continuously",
    },
  ];

  const milestones = [
    {
      year: "2015",
      title: "Company Founded",
      description:
        "TechSolutions was founded with a vision to transform businesses through technology.",
    },
    {
      year: "2017",
      title: "First Major Client",
      description:
        "Landed our first enterprise client, marking the beginning of our growth journey.",
    },
    {
      year: "2019",
      title: "Expanded to 50+ Team",
      description:
        "Grew our team and expanded our service offerings to meet increasing demand.",
    },
    {
      year: "2021",
      title: "Global Expansion",
      description:
        "Opened offices in three new countries and served clients across 20+ countries.",
    },
    {
      year: "2023",
      title: "AI Division Launch",
      description:
        "Launched dedicated AI/ML division to meet growing demand for intelligent solutions.",
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description:
        "Received multiple awards for innovation and excellence in IT services.",
    },
  ];

  return (
    <div className="about-page">
      {/* Page Header */}
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">About Us</h1>
          <p className="page-subtitle">
            We're passionate about creating innovative technology solutions
          </p>
        </div>
      </div>

      <div className="container">
        {/* Mission Section */}
        <div className="mission-section">
          <div className="mission-card">
            <div className="mission-icon">
              <FaBullseye />
            </div>
            <h3>Our Mission</h3>
            <p>
              To empower businesses with innovative technology solutions that
              drive growth, efficiency, and success in the digital age.
            </p>
          </div>
          <div className="mission-card">
            <div className="mission-icon">
              <FaEye />
            </div>
            <h3>Our Vision</h3>
            <p>
              To be the leading technology partner for businesses worldwide,
              known for excellence, innovation, and client success.
            </p>
          </div>
          <div className="mission-card">
            <div className="mission-icon">
              <FaGem />
            </div>
            <h3>Our Values</h3>
            <p>
              Innovation, integrity, excellence, and client-centric approach
              guide everything we do at TechSolutions.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="values-section">
          <div className="section-header">
            <span className="section-tag">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <span className="value-icon">{value.icon}</span>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <div className="section-header">
            <span className="section-tag">Our People</span>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              Talented professionals dedicated to your success
            </p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.icon}</div>
                <h4>{member.name}</h4>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/team" className="btn btn-outline">
              View Full Team →
            </Link>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-section">
          <div className="section-header">
            <span className="section-tag">Our Journey</span>
            <h2 className="section-title">Company Timeline</h2>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h4>{milestone.title}</h4>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="cta-box"
          style={{ marginTop: "4rem", marginBottom: "4rem" }}
        >
          <h2>Want to Join Our Team?</h2>
          <p>
            We're always looking for talented individuals to join our growing
            team.
          </p>
          <Link to="/careers" className="btn btn-secondary btn-lg">
            View Open Positions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
