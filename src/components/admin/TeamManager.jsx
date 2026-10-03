import React, { useState } from "react";
import {
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaUserTie,
  FaUser,
  FaCode,
  FaLaptopCode,
  FaPalette,
  FaServer,
  FaBrain,
  FaBullhorn,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaBuilding,
  FaUserPlus,
  FaTimes,
} from "react-icons/fa";

const TeamManager = () => {
  // Icon keys for the avatar picker
  const avatarIcons = {
    user: <FaUser />,
    ceo: <FaUserTie />,
    code: <FaCode />,
    fullstack: <FaLaptopCode />,
    design: <FaPalette />,
    devops: <FaServer />,
    ai: <FaBrain />,
    marketing: <FaBullhorn />,
  };

  const [team, setTeam] = useState([
    {
      id: 1,
      name: "John Smith",
      role: "CEO & Founder",
      dept: "Management",
      avatar: "ceo",
      email: "john@smlag.com",
      phone: "+91 98765 43210",
      bio: "15+ years in tech leadership",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "CTO",
      dept: "Engineering",
      avatar: "fullstack",
      email: "sarah@smlag.com",
      phone: "+91 98765 43211",
      bio: "Cloud architecture expert",
      status: "active",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Head of Engineering",
      dept: "Engineering",
      avatar: "devops",
      email: "mike@smlag.com",
      phone: "+91 98765 43212",
      bio: "Full-stack expert",
      status: "active",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "UX Director",
      dept: "Design",
      avatar: "design",
      email: "emily@smlag.com",
      phone: "+91 98765 43213",
      bio: "Award-winning designer",
      status: "active",
    },
    {
      id: 5,
      name: "David Wilson",
      role: "DevOps Lead",
      dept: "Engineering",
      avatar: "devops",
      email: "david@smlag.com",
      phone: "+91 98765 43214",
      bio: "Automation specialist",
      status: "on-leave",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      role: "AI/ML Specialist",
      dept: "AI/ML",
      avatar: "ai",
      email: "lisa@smlag.com",
      phone: "+91 98765 43215",
      bio: "ML engineer",
      status: "active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    dept: "Engineering",
    avatar: "user",
    email: "",
    phone: "",
    bio: "",
    status: "active",
  });

  const departments = [
    "Management",
    "Engineering",
    "Design",
    "AI/ML",
    "Marketing",
    "Sales",
  ];

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role) {
      showToast("Name and role required", "error");
      return;
    }

    if (editing) {
      setTeam(team.map((m) => (m.id === editing.id ? { ...m, ...form } : m)));
      showToast("Team member updated!");
    } else {
      setTeam([...team, { id: team.length + 1, ...form }]);
      showToast("Team member added!");
    }
    setShowModal(false);
    setEditing(null);
    setForm({
      name: "",
      role: "",
      dept: "Engineering",
      avatar: "user",
      email: "",
      phone: "",
      bio: "",
      status: "active",
    });
  };

  const handleEdit = (member) => {
    setEditing(member);
    setForm(member);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this team member?")) {
      setTeam(team.filter((m) => m.id !== id));
      showToast("Removed", "info");
    }
  };

  const activeCount = team.filter((m) => m.status === "active").length;
  const onLeaveCount = team.filter((m) => m.status === "on-leave").length;
  const deptCount = new Set(team.map((m) => m.dept)).size;

  return (
    <div className="admin-dashboard">
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>
            {toast.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
          </span>
          {toast.message}
        </div>
      )}

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#4f46e5" }}>
              <FaUsers />
            </span>
          </div>
          <div className="admin-stat-value">{team.length}</div>
          <div className="admin-stat-label">Total Members</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#10b981" }}>
              <FaCheckCircle />
            </span>
          </div>
          <div className="admin-stat-value">{activeCount}</div>
          <div className="admin-stat-label">Active</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#f59e0b" }}>
              <FaCalendarAlt />
            </span>
          </div>
          <div className="admin-stat-value">{onLeaveCount}</div>
          <div className="admin-stat-label">On Leave</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#8b5cf6" }}>
              <FaBuilding />
            </span>
          </div>
          <div className="admin-stat-value">{deptCount}</div>
          <div className="admin-stat-label">Departments</div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>
            <FaUsers style={{ marginRight: "0.4rem" }} /> Team Members
          </h3>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setEditing(null);
              setShowModal(true);
            }}
          >
            <FaPlus /> Add Member
          </button>
        </div>

        <div className="team-admin-grid">
          {team.map((member) => (
            <div key={member.id} className="team-admin-card">
              <div className="team-admin-avatar">
                {avatarIcons[member.avatar] || <FaUser />}
              </div>
              <div className="team-admin-info">
                <h4>{member.name}</h4>
                <p className="team-admin-role">{member.role}</p>
                <p className="team-admin-dept">{member.dept}</p>
                <div className="team-admin-contact">
                  <span>
                    <FaEnvelope /> {member.email}
                  </span>
                  <span>
                    <FaPhone /> {member.phone}
                  </span>
                </div>
                <p className="team-admin-bio">{member.bio}</p>
                <div className="team-admin-footer">
                  <span
                    className={`badge badge-${
                      member.status === "active" ? "green" : "yellow"
                    }`}
                  >
                    {member.status}
                  </span>
                  <div className="admin-actions">
                    <button
                      className="icon-btn-sm"
                      onClick={() => handleEdit(member)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="icon-btn-sm"
                      onClick={() => handleDelete(member.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {team.length === 0 && (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "var(--gray-500)",
                gridColumn: "1 / -1",
              }}
            >
              No team members yet
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {editing ? <FaEdit /> : <FaUserPlus />}
                {editing ? "Edit Member" : "Add Team Member"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  color: "var(--gray-500)",
                }}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <select
                    className="input-field"
                    value={form.dept}
                    onChange={(e) => setForm({ ...form, dept: e.target.value })}
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="input-field"
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="on-leave">On Leave</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="input-field"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="input-field"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Avatar Icon</label>
                <div className="emoji-picker">
                  {Object.entries(avatarIcons).map(([key, icon]) => (
                    <button
                      key={key}
                      type="button"
                      className={`emoji-option ${
                        form.avatar === key ? "active" : ""
                      }`}
                      onClick={() => setForm({ ...form, avatar: key })}
                      title={key}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  className="input-field"
                  rows="2"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManager;
