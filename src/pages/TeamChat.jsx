import React, { useState, useEffect, useRef } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaComments,
  FaCog,
  FaPalette,
  FaMoneyBillWave,
  FaRandom,
  FaUserTie,
  FaCode,
  FaRobot,
  FaBriefcase,
  FaDice,
  FaUser,
  FaSearch,
  FaVideo,
  FaPaperPlane,
  FaFilePdf,
  FaFileExcel,
  FaTools,
  FaFlask,
} from "react-icons/fa";

const TeamChat = () => {
  const [channels] = useState([
    {
      id: 1,
      name: "general",
      icon: FaComments,
      unread: 0,
    },
    {
      id: 2,
      name: "engineering",
      icon: FaCog,
      unread: 3,
    },
    {
      id: 3,
      name: "design",
      icon: FaPalette,
      unread: 0,
    },
    {
      id: 4,
      name: "sales",
      icon: FaMoneyBillWave,
      unread: 5,
    },
    {
      id: 5,
      name: "random",
      icon: FaRandom,
      unread: 1,
    },
  ]);

  const [activeChannel, setActiveChannel] = useState(1);

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        user: "Sarah W.",
        avatar: FaUserTie,
        text: "Good morning team!",
        time: "09:15",
      },
      {
        id: 2,
        user: "Mike B.",
        avatar: FaCode,
        text: "Morning! Working on the API integration today",
        time: "09:18",
      },
      {
        id: 3,
        user: "Emily D.",
        avatar: FaPalette,
        text: "Design mockups are ready for review",
        time: "09:25",
      },
    ],

    2: [
      {
        id: 1,
        user: "Dev Bot",
        avatar: FaRobot,
        text: "Deployment to staging succeeded",
        time: "08:00",
      },
      {
        id: 2,
        user: "Mike B.",
        avatar: FaCode,
        text: "Merging PR #142 now",
        time: "10:30",
      },
    ],

    3: [
      {
        id: 1,
        user: "Emily D.",
        avatar: FaPalette,
        text: "Check out the new dashboard design",
        time: "11:00",
      },
    ],

    4: [
      {
        id: 1,
        user: "Sales Bot",
        avatar: FaBriefcase,
        text: "New lead: TechCorp India",
        time: "12:00",
      },
    ],

    5: [
      {
        id: 1,
        user: "Random Bot",
        avatar: FaDice,
        text: "Fun fact: The first computer bug was a real moth!",
        time: "14:00",
      },
    ],
  });

  const [input, setInput] = useState("");

  const [onlineUsers] = useState([
    {
      name: "Sarah W.",
      avatar: FaUserTie,
      status: "online",
    },
    {
      name: "Mike B.",
      avatar: FaCode,
      status: "online",
    },
    {
      name: "Emily D.",
      avatar: FaPalette,
      status: "away",
    },
    {
      name: "David W.",
      avatar: FaTools,
      status: "offline",
    },
    {
      name: "Lisa A.",
      avatar: FaFlask,
      status: "online",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, activeChannel]);

  const handleSend = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      user: "You",
      avatar: FaUser,
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg],
    }));

    setInput("");

    // Simulate response
    setTimeout(() => {
      const responses = [
        "Sounds good!",
        "Thanks for the update!",
        "Let me check...",
      ];

      const responseUsers = [
        {
          name: "Sarah W.",
          avatar: FaUserTie,
        },
        {
          name: "Mike B.",
          avatar: FaCode,
        },
        {
          name: "Emily D.",
          avatar: FaPalette,
        },
      ];

      const randomUser =
        responseUsers[Math.floor(Math.random() * responseUsers.length)];

      const randomResponse = {
        id: Date.now() + 1,
        user: randomUser.name,
        avatar: randomUser.avatar,
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => ({
        ...prev,
        [activeChannel]: [...(prev[activeChannel] || []), randomResponse],
      }));
    }, 2000);
  };

  const currentChannel = channels.find((c) => c.id === activeChannel);

  const CurrentChannelIcon = currentChannel.icon;

  return (
    <div className="team-chat-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Team Chat" }]} />

          <h1 className="page-title">Team Messenger</h1>

          <p className="page-subtitle">
            Collaborate with your team in real-time
          </p>
        </div>
      </div>

      <div className="container">
        <div className="chat-layout">
          {/* Channels Sidebar */}
          <aside className="chat-channels">
            <div className="chat-workspace">
              <span className="chat-workspace-logo">ST</span>

              <div>
                <strong>SMLAG Team</strong>
                <span>12 members</span>
              </div>
            </div>

            <div className="chat-section">
              <h4>Channels</h4>

              {channels.map((ch) => {
                const ChannelIcon = ch.icon;

                return (
                  <button
                    key={ch.id}
                    className={`chat-channel-item ${
                      activeChannel === ch.id ? "active" : ""
                    }`}
                    onClick={() => setActiveChannel(ch.id)}
                  >
                    <span>
                      <ChannelIcon />
                    </span>

                    <span>#{ch.name}</span>

                    {ch.unread > 0 && (
                      <span className="chat-channel-badge">{ch.unread}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="chat-section">
              <h4>
                Online (
                {onlineUsers.filter((u) => u.status === "online").length})
              </h4>

              {onlineUsers.map((user, i) => {
                const UserIcon = user.avatar;

                return (
                  <div key={i} className="chat-user-item">
                    <span className="chat-user-avatar">
                      <UserIcon />
                    </span>

                    <span>{user.name}</span>

                    <span className={`chat-user-status ${user.status}`} />
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Messages Area */}
          <main className="chat-messages">
            <div className="chat-messages-header">
              <div>
                <h3>
                  <CurrentChannelIcon /> #{currentChannel.name}
                </h3>

                <p>{messages[activeChannel]?.length || 0} messages</p>
              </div>

              <div className="chat-header-actions">
                <button className="icon-btn" title="Search" type="button">
                  <FaSearch />
                </button>

                <button className="icon-btn" title="Video Call" type="button">
                  <FaVideo />
                </button>

                <button className="icon-btn" title="Settings" type="button">
                  <FaCog />
                </button>
              </div>
            </div>

            <div className="chat-messages-body">
              {(messages[activeChannel] || []).map((msg) => {
                const MessageAvatar = msg.avatar;

                return (
                  <div key={msg.id} className="chat-message">
                    <div className="chat-message-avatar">
                      <MessageAvatar />
                    </div>

                    <div className="chat-message-content">
                      <div className="chat-message-header">
                        <strong>{msg.user}</strong>
                        <span>{msg.time}</span>
                      </div>

                      <div className="chat-message-text">{msg.text}</div>
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-form" onSubmit={handleSend}>
              <input
                type="text"
                placeholder={`Message #${currentChannel.name}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="chat-input"
              />

              <button type="submit" className="btn btn-primary">
                Send
                <FaPaperPlane />
              </button>
            </form>
          </main>

          {/* Right Sidebar - Details */}
          <aside className="chat-details">
            <h4>Channel Details</h4>

            <div className="chat-details-section">
              <span className="chat-details-label">Purpose</span>

              <p>Team discussions about {currentChannel.name}</p>
            </div>

            <div className="chat-details-section">
              <span className="chat-details-label">Members</span>

              <div className="chat-details-members">
                {onlineUsers.slice(0, 4).map((u, i) => {
                  const UserIcon = u.avatar;

                  return (
                    <span key={i} className="chat-details-avatar">
                      <UserIcon />
                    </span>
                  );
                })}

                <span className="chat-details-more">+8</span>
              </div>
            </div>

            <div className="chat-details-section">
              <span className="chat-details-label">Files</span>

              <div className="chat-details-files">
                <div className="chat-details-file">
                  <FaFilePdf />
                  design.pdf
                </div>

                <div className="chat-details-file">
                  <FaFileExcel />
                  metrics.xlsx
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;
