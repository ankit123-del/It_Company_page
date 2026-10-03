import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";
import ShareButtons from "../components/common/ShareButtons";

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const servicesData = {
    "web-development": {
      icon: "💻",
      title: "Web Development",
      tagline: "Custom web applications built with modern technologies",
      description:
        "We build fast, scalable, and secure web applications that help your business grow. From simple landing pages to complex enterprise applications, our team delivers excellence.",
      features: [
        "Responsive & Mobile-First Design",
        "Progressive Web Apps (PWA)",
        "E-commerce Solutions",
        "Content Management Systems",
        "API Development & Integration",
        "Performance Optimization",
        "SEO-Friendly Architecture",
        "Cross-Browser Compatibility",
      ],
      technologies: [
        "React",
        "Next.js",
        "Vue",
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
      ],
      process: [
        {
          step: "01",
          title: "Discovery",
          desc: "Understanding your requirements and goals",
        },
        {
          step: "02",
          title: "Design",
          desc: "Creating wireframes and prototypes",
        },
        {
          step: "03",
          title: "Development",
          desc: "Building with agile methodology",
        },
        {
          step: "04",
          title: "Launch",
          desc: "Testing, deployment, and support",
        },
      ],
    },
    "mobile-development": {
      icon: "📱",
      title: "Mobile Development",
      tagline: "Native and cross-platform mobile applications",
      description:
        "Reach your customers on iOS and Android with beautiful, performant mobile applications that deliver exceptional user experiences.",
      features: [
        "Native iOS & Android Apps",
        "Cross-Platform Development",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality",
        "In-App Purchases",
        "Analytics Integration",
        "Regular Updates & Support",
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      process: [
        {
          step: "01",
          title: "Strategy",
          desc: "Defining app concept and features",
        },
        {
          step: "02",
          title: "Design",
          desc: "Creating intuitive mobile UI/UX",
        },
        { step: "03", title: "Build", desc: "Developing and testing the app" },
        { step: "04", title: "Deploy", desc: "Publishing to app stores" },
      ],
    },
  };

  const service = servicesData[slug] || servicesData["web-development"];

  return (
    <div className="service-detail-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Services", path: "/services" },
              { label: service.title },
            ]}
          />
          <div className="service-hero-icon">{service.icon}</div>
          <h1 className="page-title">{service.title}</h1>
          <p className="page-subtitle">{service.tagline}</p>
        </div>
      </div>

      <div className="container">
        {/* Overview */}
        <div className="service-overview">
          <h2>Overview</h2>
          <p>{service.description}</p>
        </div>

        {/* Features */}
        <div className="service-features-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            {service.features.map((feature, i) => (
              <div key={i} className="feature-item">
                <span className="feature-check">✅</span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="service-technologies">
          <h2>Technologies We Use</h2>
          <div className="technologies-grid">
            {service.technologies.map((tech, i) => (
              <span key={i} className="technology-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="service-process">
          <h2>Our Process</h2>
          <div className="process-grid">
            {service.process.map((p, i) => (
              <div key={i} className="process-step">
                <div className="process-number">{p.step}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="service-share">
          <ShareButtons />
        </div>

        {/* CTA */}
        <div
          className="cta-box"
          style={{ marginTop: "4rem", marginBottom: "4rem" }}
        >
          <h2>Ready to Get Started?</h2>
          <p>
            Let's discuss your {service.title.toLowerCase()} project
            requirements.
          </p>
          <Link to="/contact" className="btn btn-secondary btn-lg">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
