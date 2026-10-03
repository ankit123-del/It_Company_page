import React, { useState } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! 👋 How can we help you today?",
      sender: "bot",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const quickReplies = [
    "💼 Talk to Sales",
    "🛠️ Technical Support",
    "💰 Pricing Information",
    "📅 Book a Demo",
  ];

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      text,
      sender: "user",
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botMsg = {
        id: messages.length + 2,
        text: "Thanks for your message! Our team will get back to you shortly. For immediate assistance, call +91 9876543210.",
        sender: "bot",
        time: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className={`chat-button ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-avatar">👨‍💼</span>
              <div>
                <strong>Support Team</strong>
                <span className="chat-status">● Online</span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {messages.length === 1 && (
              <div className="chat-quick-replies">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    className="quick-reply"
                    onClick={() => handleSend(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="chat-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button type="submit" className="chat-send">
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
