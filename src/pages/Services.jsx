import React from "react";
import { Link } from "react-router-dom";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaCloud,
  FaShieldAlt,
  FaRobot,
  FaChartBar,
  FaSyncAlt,
  FaPalette,
  FaArrowRight,
} from "react-icons/fa";
import SEO from "../components/common/SEO";

const Services = () => {
  const services = [
    {
      icon: FaLaptopCode,
      title: "Web Development",
      slug: "web-development",
      description:
        "Custom web applications, e-commerce platforms, and content management systems built with modern frameworks.",
      features: ["React", "Next.js", "Node.js", "Python", "PHP"],
      price: "Starting at ₹50,000",
    },
    {
      icon: FaMobileAlt,
      title: "Mobile Development",
      slug: "mobile-development",
      description:
        "Native and cross-platform mobile applications for iOS and Android platforms.",
      features: ["React Native", "Flutter", "Swift", "Kotlin"],
      price: "Starting at ₹75,000",
    },
    {
      icon: FaCloud,
      title: "Cloud Solutions",
      slug: "cloud-solutions",
      description:
        "Cloud infrastructure design, migration services, and management for AWS, Azure, and Google Cloud.",
      features: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
      price: "Starting at ₹1,00,000",
    },
    {
      icon: FaShieldAlt,
      title: "Cyber Security",
      slug: "cyber-security",
      description:
        "Comprehensive security solutions including penetration testing, vulnerability assessment, and compliance.",
      features: [
        "Security Audits",
        "Penetration Testing",
        "Compliance",
        "Monitoring",
      ],
      price: "Starting at ₹40,000",
    },
    {
      icon: FaRobot,
      title: "AI & Machine Learning",
      slug: "ai-ml",
      description:
        "Intelligent solutions using artificial intelligence, machine learning, and natural language processing.",
      features: ["TensorFlow", "PyTorch", "OpenAI", "NLP"],
      price: "Starting at ₹1,50,000",
    },
    {
      icon: FaChartBar,
      title: "Data Analytics",
      slug: "data-analytics",
      description:
        "Data visualization, business intelligence, and predictive analytics to drive business decisions.",
      features: ["Power BI", "Tableau", "Python", "SQL"],
      price: "Starting at ₹60,000",
    },
    {
      icon: FaSyncAlt,
      title: "DevOps Services",
      slug: "devops",
      description:
        "Streamline your development pipeline with automated CI/CD, infrastructure as code, and monitoring.",
      features: ["Jenkins", "GitLab CI", "Terraform", "Prometheus"],
      price: "Starting at ₹80,000",
    },
    {
      icon: FaPalette,
      title: "UI/UX Design",
      slug: "ui-ux",
      description:
        "User-centered design solutions that deliver exceptional user experiences and beautiful interfaces.",
      features: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      price: "Starting at ₹35,000",
    },
  ];

  return (
    <>
      <SEO
        title="IT Services | Web, Mobile, Cloud & AI Solutions | SMLAG TechSolutions"
        description="Explore our comprehensive IT services - web development, mobile apps, cloud solutions, cyber security, AI/ML, and data analytics."
        keywords="IT services, software development services, custom software"
        url="/services"
        image="/images/og-services.jpg"
      />

      <div className="services-page">
        {/* Page Header */}
        <div className="page-hero">
          <div className="container">
            <h1 className="page-title">Our Services</h1>

            <p className="page-subtitle">
              Comprehensive IT solutions designed to meet your business needs
            </p>
          </div>
        </div>

        {/* Services List */}
        <div className="container">
          <div className="services-list">
            {services.map((service) => {
              const ServiceIcon = service.icon;

              return (
                <div key={service.slug} className="service-detail-card">
                  <div className="service-detail-icon">
                    <ServiceIcon />
                  </div>

                  <div className="service-detail-content">
                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <div className="service-tags">
                      {service.features.map((feature) => (
                        <span key={feature} className="tag">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="service-detail-footer">
                      <span className="service-price">{service.price}</span>

                      <Link
                        to={`/services/${service.slug}`}
                        className="btn btn-primary btn-sm"
                      >
                        Learn More
                        <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="container">
          <div
            className="cta-box"
            style={{
              marginTop: "4rem",
              marginBottom: "4rem",
            }}
          >
            <h2>Need a Custom Solution?</h2>

            <p>
              Contact us for a personalized quote tailored to your specific
              requirements.
            </p>

            <Link to="/contact" className="btn btn-secondary btn-lg">
              Get a Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
