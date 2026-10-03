import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const commands = [
    // Navigation
    {
      id: "home",
      icon: "🏠",
      label: "Go to Home",
      category: "Navigation",
      action: () => navigate("/"),
    },
    {
      id: "services",
      icon: "💼",
      label: "View Services",
      category: "Navigation",
      action: () => navigate("/services"),
    },
    {
      id: "about",
      icon: "🏢",
      label: "About Us",
      category: "Navigation",
      action: () => navigate("/about"),
    },
    {
      id: "contact",
      icon: "📧",
      label: "Contact Us",
      category: "Navigation",
      action: () => navigate("/contact"),
    },
    {
      id: "pricing",
      icon: "💰",
      label: "View Pricing",
      category: "Navigation",
      action: () => navigate("/pricing"),
    },
    {
      id: "portfolio",
      icon: "🎯",
      label: "See Portfolio",
      category: "Navigation",
      action: () => navigate("/portfolio"),
    },
    {
      id: "blog",
      icon: "📝",
      label: "Read Blog",
      category: "Navigation",
      action: () => navigate("/blog"),
    },

    // Dashboard
    {
      id: "admin",
      icon: "⚙️",
      label: "Admin Panel",
      category: "Dashboard",
      action: () => navigate("/admin"),
    },
    {
      id: "analytics",
      icon: "📊",
      label: "Analytics",
      category: "Dashboard",
      action: () => navigate("/analytics"),
    },
    {
      id: "chat",
      icon: "💬",
      label: "Team Chat",
      category: "Dashboard",
      action: () => navigate("/chat"),
    },
    {
      id: "crm",
      icon: "📞",
      label: "CRM / Leads",
      category: "Dashboard",
      action: () => navigate("/crm"),
    },
    {
      id: "kanban",
      icon: "📋",
      label: "Kanban Board",
      category: "Dashboard",
      action: () => navigate("/kanban"),
    },
    {
      id: "okr",
      icon: "🎯",
      label: "OKRs",
      category: "Dashboard",
      action: () => navigate("/okr"),
    },
    {
      id: "invoices",
      icon: "💰",
      label: "Invoices",
      category: "Dashboard",
      action: () => navigate("/invoices"),
    },
    {
      id: "support",
      icon: "🎫",
      label: "Support",
      category: "Dashboard",
      action: () => navigate("/support"),
    },

    // Tools
    {
      id: "quote",
      icon: "🎯",
      label: "Generate Quote",
      category: "Tools",
      action: () => navigate("/quote"),
    },
    {
      id: "speed",
      icon: "⚡",
      label: "Speed Tester",
      category: "Tools",
      action: () => navigate("/tools/speed-test"),
    },
    {
      id: "seo",
      icon: "🔍",
      label: "SEO Analyzer",
      category: "Tools",
      action: () => navigate("/tools/seo-analyzer"),
    },
    {
      id: "ai",
      icon: "🤖",
      label: "AI Assistant",
      category: "Tools",
      action: () => navigate("/ai"),
    },

    // Actions
    {
      id: "theme",
      icon: "🌙",
      label: "Toggle Dark Mode",
      category: "Actions",
      action: () => {
        const current = document.documentElement.getAttribute("data-theme");
        document.documentElement.setAttribute(
          "data-theme",
          current === "dark" ? "light" : "dark",
        );
        localStorage.setItem("theme", current === "dark" ? "light" : "dark");
      },
    },
    {
      id: "logout",
      icon: "🚪",
      label: "Logout",
      category: "Actions",
      action: () => {
        localStorage.clear();
        window.location.href = "/";
      },
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase()),
      )
    : commands;

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatFiltered[selectedIndex]) {
        flatFiltered[selectedIndex].action();
        setIsOpen(false);
        setQuery("");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-overlay" onClick={() => setIsOpen(false)}>
      <div className="cmd-palette" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-wrapper">
          <span className="cmd-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="cmd-input"
          />
          <kbd className="cmd-kbd">ESC</kbd>
        </div>

        <div className="cmd-results">
          {flatFiltered.length === 0 ? (
            <div className="cmd-empty">
              <span>🔍</span>
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="cmd-group">
                <span className="cmd-group-label">{category}</span>
                {items.map((cmd) => {
                  const globalIndex = flatFiltered.indexOf(cmd);
                  return (
                    <button
                      key={cmd.id}
                      className={`cmd-item ${globalIndex === selectedIndex ? "selected" : ""}`}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                        setQuery("");
                      }}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                    >
                      <span className="cmd-item-icon">{cmd.icon}</span>
                      <span className="cmd-item-label">{cmd.label}</span>
                      {globalIndex === selectedIndex && (
                        <span className="cmd-item-enter">↵</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <div className="cmd-footer-keys">
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd> Navigate
            </span>
            <span>
              <kbd>↵</kbd> Select
            </span>
            <span>
              <kbd>ESC</kbd> Close
            </span>
          </div>
          <span className="cmd-footer-brand">SMLAG Command Palette</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
