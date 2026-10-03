import React, { useState, useEffect } from "react";

const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    {
      category: "Navigation",
      items: [
        { keys: ["Ctrl", "K"], desc: "Open command palette" },
        { keys: ["G", "H"], desc: "Go to Home" },
        { keys: ["G", "S"], desc: "Go to Services" },
        { keys: ["G", "D"], desc: "Go to Dashboard" },
        { keys: ["G", "P"], desc: "Go to Profile" },
      ],
    },
    {
      category: "Actions",
      items: [
        { keys: ["Ctrl", "N"], desc: "New Project" },
        { keys: ["Ctrl", "S"], desc: "Save changes" },
        { keys: ["Ctrl", "/"], desc: "Toggle theme" },
        { keys: ["Ctrl", "Shift", "F"], desc: "Global search" },
        { keys: ["?"], desc: "Show shortcuts" },
      ],
    },
    {
      category: "Editor",
      items: [
        { keys: ["Ctrl", "B"], desc: "Bold text" },
        { keys: ["Ctrl", "I"], desc: "Italic text" },
        { keys: ["Ctrl", "Z"], desc: "Undo" },
        { keys: ["Ctrl", "Shift", "Z"], desc: "Redo" },
      ],
    },
    {
      category: "General",
      items: [
        { keys: ["Esc"], desc: "Close modal/dialog" },
        { keys: ["Ctrl", "Enter"], desc: "Submit form" },
        { keys: ["Shift", "Enter"], desc: "New line" },
      ],
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        const tag = document.activeElement.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          setIsOpen(true);
        }
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-header">
          <h2>⌨️ Keyboard Shortcuts</h2>
          <button className="modal-close" onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>
        <div className="shortcuts-body">
          {shortcuts.map((group, i) => (
            <div key={i} className="shortcuts-group">
              <h3>{group.category}</h3>
              {group.items.map((s, j) => (
                <div key={j} className="shortcut-item">
                  <span>{s.desc}</span>
                  <div className="shortcut-keys">
                    {s.keys.map((k, ki) => (
                      <React.Fragment key={ki}>
                        <kbd>{k}</kbd>
                        {ki < s.keys.length - 1 && <span>+</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
