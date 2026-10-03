import React, { useState, useRef, useEffect } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaRobot,
  FaUser,
  FaBriefcase,
  FaChartBar,
  FaChartLine,
  FaPen,
  FaLightbulb,
  FaTools,
  FaBullseye,
  FaExclamationTriangle,
  FaMobileAlt,
  FaLeaf,
  FaGraduationCap,
  FaHospital,
  FaCheckCircle,
  FaSearch,
  FaPlus,
  FaHistory,
  FaCog,
  FaPaperclip,
  FaRocket,
} from "react-icons/fa";

// Maps the emoji tokens that used to live inline in message text to
// Font Awesome icon elements, so chat content can be rendered with icons
// instead of emoji glyphs.
const iconTokenMap = {
  "💼": <FaBriefcase />,
  "📊": <FaChartBar />,
  "✍️": <FaPen />,
  "💡": <FaLightbulb />,
  "🔧": <FaTools />,
  "📈": <FaChartLine />,
  "🎯": <FaBullseye />,
  "⚠️": <FaExclamationTriangle />,
  "🤖": <FaRobot />,
  "📱": <FaMobileAlt />,
  "🌱": <FaLeaf />,
  "🎓": <FaGraduationCap />,
  "🏥": <FaHospital />,
  "✅": <FaCheckCircle />,
  "🔍": <FaSearch />,
};

const tokenRegex = new RegExp(
  Object.keys(iconTokenMap)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|"),
  "gu",
);

// Splits a line of text on known emoji tokens and swaps each token for its
// matching Font Awesome icon element, preserving the surrounding text.
const renderWithIcons = (text) => {
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  tokenRegex.lastIndex = 0;
  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      React.cloneElement(iconTokenMap[match[0]], { key: `icon-${key++}` }),
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
};

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm SMLAG AI, your intelligent assistant. I can help you with:\n\n• 💼 Business insights\n• 📊 Data analysis\n• ✍️ Content writing\n• 💡 Creative ideas\n• 🔧 Technical help\n\nWhat would you like to explore today?",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    { icon: <FaChartBar />, text: "Analyze my sales data" },
    { icon: <FaPen />, text: "Write a blog post about AI" },
    { icon: <FaLightbulb />, text: "Generate project ideas" },
    { icon: <FaSearch />, text: "Optimize my SEO strategy" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes("sales") || q.includes("data")) {
      return "Based on your current sales data:\n\n📈 Revenue is up 12% this month\n🎯 Top performing service: Web Development\n⚠️ Consider improving mobile app marketing\n\nWould you like a detailed breakdown?";
    }
    if (q.includes("blog") || q.includes("write") || q.includes("content")) {
      return "Here's a blog post outline:\n\n**Title:** The Future of AI in Business\n\n1. Introduction to AI transformation\n2. Key use cases across industries\n3. Implementation challenges\n4. Success stories\n5. Future predictions\n\nWould you like me to expand any section?";
    }
    if (q.includes("idea") || q.includes("project")) {
      return "Here are 5 innovative project ideas:\n\n1. 🤖 AI-powered customer service bot\n2. 📱 AR mobile shopping app\n3. 🌱 Carbon footprint tracker\n4. 🎓 Personalized learning platform\n5. 🏥 Telemedicine consultation app\n\nWant me to elaborate on any of these?";
    }
    if (q.includes("seo")) {
      return "Here's your SEO optimization checklist:\n\n✅ Improve page load speed (currently 3.2s → target 1.5s)\n✅ Add more internal links\n✅ Optimize meta descriptions\n✅ Create more backlinks\n✅ Target long-tail keywords\n\nExpected impact: +40% organic traffic in 3 months";
    }
    return (
      "That's an interesting question! Here's what I think:\n\n" +
      query +
      " — this is a great area to explore. Based on industry trends and best practices, I'd recommend:\n\n1. Start with a clear strategy\n2. Leverage modern tools\n3. Measure and iterate\n4. Focus on user value\n\nWould you like me to dive deeper?"
    );
  };

  const handleSend = (text) => {
    const query = text || input;
    if (!query.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      role: "user",
      content: query,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = {
        id: messages.length + 2,
        role: "assistant",
        content: generateResponse(query),
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="ai-assistant-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "AI Assistant" }]} />
          <h1 className="page-title">
            <FaRobot /> SMLAG AI Assistant
          </h1>
          <p className="page-subtitle">Your intelligent business companion</p>
        </div>
      </div>

      <div className="container">
        <div className="ai-chat-container">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-avatar">
              <span>
                <FaRobot />
              </span>
              <span className="ai-status-dot"></span>
            </div>
            <div>
              <strong>SMLAG AI</strong>
              <span>Online • Powered by GPT-4</span>
            </div>
            <div className="ai-header-actions">
              <button className="icon-btn" title="New chat">
                <FaPlus />
              </button>
              <button className="icon-btn" title="History">
                <FaHistory />
              </button>
              <button className="icon-btn" title="Settings">
                <FaCog />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="ai-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message ai-message-${msg.role}`}>
                <div className="ai-message-avatar">
                  {msg.role === "assistant" ? <FaRobot /> : <FaUser />}
                </div>
                <div className="ai-message-content">
                  <div className="ai-message-text">
                    {msg.content.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {renderWithIcons(line)}
                        {i < msg.content.split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  <span className="ai-message-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message ai-message-assistant">
                <div className="ai-message-avatar">
                  <FaRobot />
                </div>
                <div className="ai-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="ai-suggestions">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className="ai-suggestion"
                  onClick={() => handleSend(s.text)}
                >
                  {s.icon} {s.text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            className="ai-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="ai-input"
            />
            <button type="button" className="ai-attach" title="Attach file">
              <FaPaperclip />
            </button>
            <button type="submit" className="ai-send" disabled={!input.trim()}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </form>

          <div className="ai-footer">
            <span>AI can make mistakes. Verify important info.</span>
            <span>
              <FaRocket /> GPT-4 Turbo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
