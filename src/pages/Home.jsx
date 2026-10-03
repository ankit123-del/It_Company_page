import React from "react";
import { Link } from "react-router-dom";
import AnimatedCounter from "../components/common/AnimatedCounter";
import TestimonialSlider from "../components/common/TestimonialSlider";
import SEO from "../components/common/SEO";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaCloud,
  FaLock,
  FaRobot,
  FaChartBar,
  FaRocket,
  FaHospital,
  FaUniversity,
  FaShoppingCart,
  FaBook,
  FaIndustry,
  FaPlane,
  FaUserTie,
  FaCheckCircle,
} from "react-icons/fa";

const Home = () => {
  const services = [
    {
      icon: <FaLaptopCode />,
      title: "Web Development",
      description: "Custom web applications built with modern technologies",
      path: "/services/web-development",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Development",
      description: "Native and cross-platform mobile apps",
      path: "/services/mobile-development",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure on AWS, Azure",
      path: "/services/cloud-solutions",
    },
    {
      icon: <FaLock />,
      title: "Cyber Security",
      description: "Protect your business with advanced security",
      path: "/services/cyber-security",
    },
    {
      icon: <FaRobot />,
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by AI",
      path: "/services/ai-ml",
    },
    {
      icon: <FaChartBar />,
      title: "Data Analytics",
      description: "Turn data into actionable insights",
      path: "/services/data-analytics",
    },
  ];

  const technologies = [
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "Kubernetes",
    "MongoDB",
    "PostgreSQL",
    "TypeScript",
    "Next.js",
    "Flutter",
    "TensorFlow",
  ];

  const industries = [
    { icon: <FaHospital />, name: "Healthcare" },
    { icon: <FaUniversity />, name: "Banking" },
    { icon: <FaShoppingCart />, name: "E-commerce" },
    { icon: <FaBook />, name: "Education" },
    { icon: <FaIndustry />, name: "Manufacturing" },
    { icon: <FaPlane />, name: "Travel" },
  ];

  const testimonials = [
    {
      text: "SMLAG TechSolutions transformed our business with their innovative web solutions. The team is professional, responsive, and highly skilled.",
      name: "Rajesh Kumar",
      role: "CEO, TechCorp India",
      avatar: <FaUserTie />,
    },
    {
      text: "Their mobile app development team is exceptional. Delivered on time and exceeded all our expectations.",
      name: "Priya Sharma",
      role: "Founder, StartupHub",
      avatar: <FaUserTie />,
    },
    {
      text: "Professional team with deep technical expertise. Our cloud migration was seamless and well-executed.",
      name: "Amit Patel",
      role: "CTO, CloudNine",
      avatar: <FaUserTie />,
    },
  ];

  return (
    <>
      <SEO
        title="SMLAG TechSolutions | #1 IT Company in India | Web & Mobile Development"
        description="Leading IT company in India offering web development, mobile apps, cloud solutions, AI/ML, and cyber security. 500+ projects delivered. Get a free quote today!"
        keywords="IT company India, web development, mobile app development, cloud solutions, software company Mumbai"
        url="/"
        image="/images/og-home.jpg"
      />

      <div className="home-page">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-content">
                <span className="hero-badge">
                  <FaRocket /> Trusted by 500+ Companies Worldwide
                </span>

                <h1 className="hero-title">
                  Innovative IT Solutions
                  <br />
                  <span className="text-gradient">
                    For Your Business Growth
                  </span>
                </h1>

                <p className="hero-description">
                  We help businesses transform their digital presence with
                  cutting-edge technology solutions. From web development to
                  cloud infrastructure, we deliver excellence.
                </p>

                <div className="hero-buttons">
                  <Link to="/contact" className="btn btn-primary btn-lg">
                    Get Started
                  </Link>

                  <Link to="/portfolio" className="btn btn-outline btn-lg">
                    View Portfolio
                  </Link>
                </div>

                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="hero-stat-number">
                      <AnimatedCounter end={10} suffix="+" />
                    </span>
                    <span className="hero-stat-label">Years Experience</span>
                  </div>

                  <div className="hero-stat">
                    <span className="hero-stat-number">
                      <AnimatedCounter end={500} suffix="+" />
                    </span>
                    <span className="hero-stat-label">Projects Done</span>
                  </div>

                  <div className="hero-stat">
                    <span className="hero-stat-number">
                      <AnimatedCounter end={50} suffix="+" />
                    </span>
                    <span className="hero-stat-label">Team Members</span>
                  </div>

                  <div className="hero-stat">
                    <span className="hero-stat-number">
                      <AnimatedCounter end={98} suffix="%" />
                    </span>
                    <span className="hero-stat-label">Satisfaction</span>
                  </div>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-card">
                  <div className="hero-card-icon">
                    <FaLaptopCode />
                  </div>
                  <h3>Web Development</h3>
                  <p>Modern & responsive websites</p>
                </div>

                <div className="hero-card">
                  <div className="hero-card-icon">
                    <FaMobileAlt />
                  </div>
                  <h3>Mobile Apps</h3>
                  <p>iOS & Android solutions</p>
                </div>

                <div className="hero-card">
                  <div className="hero-card-icon">
                    <FaCloud />
                  </div>
                  <h3>Cloud Services</h3>
                  <p>Scalable infrastructure</p>
                </div>

                <div className="hero-card">
                  <div className="hero-card-icon">
                    <FaLock />
                  </div>
                  <h3>Cyber Security</h3>
                  <p>Protect your business</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="trusted-section">
          <div className="container">
            <p className="trusted-title">Trusted by leading companies</p>

            <div className="trusted-logos">
              {[
                "Google",
                "Microsoft",
                "Amazon",
                "Netflix",
                "Adobe",
                "Spotify",
              ].map((company) => (
                <div key={company} className="trusted-logo">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">What We Offer</span>
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle">
                Comprehensive IT solutions tailored to your business needs
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <Link
                  to={service.path}
                  key={service.title}
                  className="service-card"
                >
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-link">Learn More →</span>
                </Link>
              ))}
            </div>

            <div className="section-cta">
              <Link to="/services" className="btn btn-outline">
                View All Services →
              </Link>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="technologies-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Tech Stack</span>
              <h2 className="section-title">Technologies We Use</h2>
              <p className="section-subtitle">
                Modern, reliable, and scalable technologies
              </p>
            </div>

            <div className="technologies-grid">
              {technologies.map((tech) => (
                <div key={tech} className="technology-tag">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="industries-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Industries</span>
              <h2 className="section-title">Industries We Serve</h2>
              <p className="section-subtitle">
                Expertise across diverse industry verticals
              </p>
            </div>

            <div className="industries-grid">
              {industries.map((industry) => (
                <div key={industry.name} className="industry-card">
                  <span className="industry-icon">{industry.icon}</span>
                  <span className="industry-name">{industry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="process-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">How We Work</span>
              <h2 className="section-title">Our Process</h2>
              <p className="section-subtitle">
                A proven methodology that delivers results
              </p>
            </div>

            <div className="process-grid">
              <div className="process-step">
                <div className="process-number">01</div>
                <h3>Discovery</h3>
                <p>We understand your business goals and requirements</p>
              </div>

              <div className="process-step">
                <div className="process-number">02</div>
                <h3>Planning</h3>
                <p>We create a detailed roadmap and strategy</p>
              </div>

              <div className="process-step">
                <div className="process-number">03</div>
                <h3>Development</h3>
                <p>We build with agile methodology and best practices</p>
              </div>

              <div className="process-step">
                <div className="process-number">04</div>
                <h3>Delivery</h3>
                <p>We test, deploy, and provide ongoing support</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="container">
            <div className="about-grid">
              <div className="about-content">
                <span className="section-tag">Why Choose Us</span>

                <h2 className="section-title" style={{ textAlign: "left" }}>
                  We Deliver Excellence in Every Project
                </h2>

                <p>
                  With over 10 years of experience, we've helped hundreds of
                  businesses transform their digital presence and achieve their
                  goals.
                </p>

                <ul className="about-features">
                  <li>
                    <span className="feature-check">
                      <FaCheckCircle />
                    </span>
                    Expert team of developers and engineers
                  </li>

                  <li>
                    <span className="feature-check">
                      <FaCheckCircle />
                    </span>
                    Cutting-edge technology stack
                  </li>

                  <li>
                    <span className="feature-check">
                      <FaCheckCircle />
                    </span>
                    24/7 customer support
                  </li>

                  <li>
                    <span className="feature-check">
                      <FaCheckCircle />
                    </span>
                    Agile development methodology
                  </li>

                  <li>
                    <span className="feature-check">
                      <FaCheckCircle />
                    </span>
                    Scalable and secure solutions
                  </li>

                  <li>
                    <span className="feature-check">
                      <FaCheckCircle />
                    </span>
                    On-time project delivery
                  </li>
                </ul>

                <Link to="/about" className="btn btn-primary">
                  Learn More About Us
                </Link>
              </div>

              <div className="about-stats">
                <div className="stat-box">
                  <span className="stat-number">
                    <AnimatedCounter end={10} suffix="+" />
                  </span>
                  <span className="stat-label">Years Experience</span>
                </div>

                <div className="stat-box">
                  <span className="stat-number">
                    <AnimatedCounter end={500} suffix="+" />
                  </span>
                  <span className="stat-label">Projects Delivered</span>
                </div>

                <div className="stat-box">
                  <span className="stat-number">
                    <AnimatedCounter end={98} suffix="%" />
                  </span>
                  <span className="stat-label">Client Satisfaction</span>
                </div>

                <div className="stat-box">
                  <span className="stat-number">
                    <AnimatedCounter end={50} suffix="+" />
                  </span>
                  <span className="stat-label">Team Members</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Testimonials</span>
              <h2 className="section-title">What Our Clients Say</h2>
              <p className="section-subtitle">
                Trusted by businesses worldwide
              </p>
            </div>

            <TestimonialSlider testimonials={testimonials} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <h2>Ready to Transform Your Business?</h2>

              <p>
                Get in touch with us today for a free consultation and discover
                how we can help your business thrive.
              </p>

              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-secondary btn-lg">
                  Contact Us Now
                </Link>

                <Link
                  to="/pricing"
                  className="btn btn-outline btn-lg"
                  style={{
                    borderColor: "white",
                    color: "white",
                  }}
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
