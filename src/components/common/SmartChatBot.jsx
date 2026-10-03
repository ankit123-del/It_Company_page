import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faXmark,
  faRobot,
  faPhone,
  faPaperPlane,
  faCircle,
  faLaptopCode,
  faMobileScreenButton,
  faCloud,
  faShieldHalved,
  faBrain,
  faChartColumn,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const SmartChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const knowledgeBase = [
    {
      keywords: ["price", "pricing", "cost", "budget", "rate"],
      response:
        "Our pricing starts from ₹25,000 for basic projects. For a detailed quote, please share your requirements. Would you like to see our pricing plans?",
      quickReplies: ["View Pricing", "Talk to Sales"],
      links: [{ label: "View Pricing Plans", path: "/pricing" }],
    },
    {
      keywords: ["web", "website", "web development"],
      response:
        "We build custom websites using React, Next.js, and Node.js. Our web development services start from ₹50,000. Would you like to discuss your project?",
      quickReplies: ["Get Quote", "See Portfolio"],
      links: [{ label: "Web Development", path: "/services/web-development" }],
    },
    {
      keywords: ["mobile", "app", "android", "ios"],
      response:
        "We develop native and cross-platform mobile apps using React Native and Flutter. Starting from ₹75,000. Check out our portfolio!",
      quickReplies: ["See Mobile Apps", "Get Quote"],
      links: [
        {
          label: "Mobile Development",
          path: "/services/mobile-development",
        },
      ],
    },
    {
      keywords: ["contact", "call", "email", "reach"],
      response:
        "You can reach us at:\n+91 9876543210\ninfo@smlagtech.com\nMumbai, India\n\nOr fill out our contact form!",
      quickReplies: ["Contact Form", "WhatsApp Us"],
      links: [{ label: "Contact Us", path: "/contact" }],
    },
    {
      keywords: ["career", "job", "hiring", "work"],
      response:
        "We are always hiring talented developers, designers, and engineers! Check our current openings.",
      quickReplies: ["View Openings", "Send Resume"],
      links: [{ label: "View Careers", path: "/careers" }],
    },
    {
      keywords: ["service", "services", "what do you do"],
      response:
        "We offer:\nWeb Development\nMobile Development\nCloud Solutions\nCyber Security\nAI & ML\nData Analytics",
      quickReplies: ["All Services", "Get Quote"],
      links: [{ label: "All Services", path: "/services" }],
    },
    {
      keywords: ["about", "company", "who are you"],
      response:
        "SMLAG TechSolutions is a leading IT company with 10+ years of experience, 500+ projects delivered, and 50+ team members worldwide.",
      quickReplies: ["About Us", "Our Team"],
      links: [{ label: "Learn More", path: "/about" }],
    },
    {
      keywords: ["hi", "hello", "hey", "greetings"],
      response:
        "Hello! Welcome to SMLAG TechSolutions. How can I help you today?",
      quickReplies: ["Our Services", "Pricing", "Contact Us"],
    },
  ];

  const findResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    for (const item of knowledgeBase) {
      if (item.keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return item;
      }
    }

    return {
      response:
        "I'm not sure about that. Let me connect you with our team. You can also:\nCall: +91 9876543210\nEmail: info@smlagtech.com",
      quickReplies: ["Contact Us", "View Services"],
      links: [{ label: "Contact Support", path: "/contact" }],
    };
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: "Hi! I'm SMLAG Assistant. How can I help you today?",
            sender: "bot",
            quickReplies: ["Our Services", "Pricing", "Contact Us", "About Us"],
          },
        ]);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      text,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseData = findResponse(text);

      const botMsg = {
        id: Date.now() + 1,
        text: responseData.response,
        sender: "bot",
        quickReplies: responseData.quickReplies,
        links: responseData.links,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className={`smart-chat-button ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <FontAwesomeIcon icon={faXmark} />
        ) : (
          <>
            <FontAwesomeIcon icon={faComments} />
            <span className="chat-notification">1</span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="smart-chat-window">
          {/* Header */}
          <div className="smart-chat-header">
            <div className="smart-chat-header-info">
              <div className="smart-chat-avatar">
                <FontAwesomeIcon icon={faRobot} />
              </div>

              <div>
                <strong>SMLAG Assistant</strong>

                <span className="smart-chat-status">
                  <FontAwesomeIcon icon={faCircle} />
                  Online • AI Powered
                </span>
              </div>
            </div>

            <button
              className="smart-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* Messages */}
          <div className="smart-chat-body">
            {messages.map((msg) => (
              <div key={msg.id} className="smart-chat-message-group">
                <div className={`smart-chat-message ${msg.sender}`}>
                  {msg.text.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < msg.text.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>

                {/* Links */}
                {msg.links && (
                  <div className="smart-chat-links">
                    {msg.links.map((link, i) => (
                      <Link
                        key={i}
                        to={link.path}
                        className="smart-chat-link"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label} →
                      </Link>
                    ))}
                  </div>
                )}

                {/* Quick Replies */}
                {msg.quickReplies && (
                  <div className="smart-chat-quick-replies">
                    {msg.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        className="smart-quick-reply"
                        onClick={() => handleSend(reply)}
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="smart-chat-message bot typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            className="smart-chat-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="smart-chat-input"
            />

            <button
              type="submit"
              className="smart-chat-send"
              aria-label="Send message"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>

          {/* Footer */}
          <div className="smart-chat-footer">
            <span>Powered by AI</span>

            <a href="tel:+919876543210">
              <FontAwesomeIcon icon={faPhone} />
              Call Support
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default SmartChatBot;
