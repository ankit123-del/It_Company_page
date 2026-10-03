import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      category: "General",
      faqs: [
        {
          q: "What services do you offer?",
          a: "We offer web development, mobile app development, cloud solutions, cybersecurity, AI/ML, data analytics, DevOps, and UI/UX design services.",
        },
        {
          q: "How long have you been in business?",
          a: "We have been in business for over 10 years, serving clients worldwide.",
        },
        {
          q: "Where are you located?",
          a: "Our headquarters is in Mumbai, India, with remote teams across the globe.",
        },
      ],
    },
    {
      category: "Pricing",
      faqs: [
        {
          q: "How much do your services cost?",
          a: "Pricing varies based on project scope. Our plans start from ₹25,000 for basic projects. Contact us for a custom quote.",
        },
        {
          q: "Do you offer payment plans?",
          a: "Yes, we offer flexible payment plans for larger projects. Typically 30% upfront, 40% mid-project, and 30% on completion.",
        },
        {
          q: "Are there any hidden fees?",
          a: "No, we provide transparent pricing with no hidden fees. All costs are clearly outlined in the proposal.",
        },
      ],
    },
    {
      category: "Process",
      faqs: [
        {
          q: "How long does a typical project take?",
          a: "Timeline varies based on scope. Simple websites take 2-4 weeks, complex applications 8-16 weeks.",
        },
        {
          q: "What is your development process?",
          a: "We follow Agile methodology with regular sprints, client feedback sessions, and iterative development.",
        },
        {
          q: "Do you provide ongoing support?",
          a: "Yes, all our projects include post-launch support. Extended support plans are also available.",
        },
      ],
    },
    {
      category: "Technical",
      faqs: [
        {
          q: "What technologies do you use?",
          a: "We use modern technologies including React, Node.js, Python, AWS, Docker, Kubernetes, and more.",
        },
        {
          q: "Can you work with existing systems?",
          a: "Yes, we can integrate with your existing systems and provide modernization services.",
        },
        {
          q: "Do you provide source code?",
          a: "Yes, you get full ownership of the source code upon project completion.",
        },
      ],
    },
  ];

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="faq-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Frequently Asked Questions</h1>
          <p className="page-subtitle">
            Find answers to common questions about our services
          </p>
        </div>
      </div>

      <div className="container">
        {faqCategories.map((cat, catIndex) => (
          <div key={catIndex} className="faq-category">
            <h2 className="faq-category-title">{cat.category}</h2>
            <div className="faq-list">
              {cat.faqs.map((faq, faqIndex) => {
                const key = `${catIndex}-${faqIndex}`;
                const isOpen = openIndex === key;
                return (
                  <div
                    key={faqIndex}
                    className={`faq-item ${isOpen ? "open" : ""}`}
                  >
                    <button
                      className="faq-question"
                      onClick={() => toggleFAQ(catIndex, faqIndex)}
                    >
                      <span>{faq.q}</span>
                      <span className="faq-icon">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div
          className="cta-box"
          style={{ marginTop: "4rem", marginBottom: "4rem" }}
        >
          <h2>Still Have Questions?</h2>
          <p>
            Can't find the answer you're looking for? Please contact our support
            team.
          </p>
          <Link to="/contact" className="btn btn-secondary btn-lg">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
