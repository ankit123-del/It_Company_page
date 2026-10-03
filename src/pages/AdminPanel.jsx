import React, { useState, useEffect, useCallback } from "react";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { adminApi } from "../api/adminApi";

// ===== ADMIN FEATURE COMPONENTS =====
import EmailCampaigns from "../components/admin/EmailCampaigns";
import TicketKanban from "../components/admin/TicketKanban";
import MediaLibrary from "../components/admin/MediaLibrary";
import SystemHealth from "../components/admin/SystemHealth";
import ActivityTimeline from "../components/admin/ActivityTimeline";
import RevenueDashboard from "../components/admin/RevenueDashboard";
import RolesPermissions from "../components/admin/RolesPermissions";
import ClientsManager from "../components/admin/ClientsManager";
import LeadsPipeline from "../components/admin/LeadsPipeline";
import TeamPerformance from "../components/admin/TeamPerformance";
import NotificationManager from "../components/admin/NotificationManager";
import SEOManager from "../components/admin/SEOManager";
import APIKeysManager from "../components/admin/APIKeysManager";
import BlogManager from "../components/admin/BlogManager";
import ContactInbox from "../components/admin/ContactInbox";
import SubscribersManager from "../components/admin/SubscribersManager";
import TeamManager from "../components/admin/TeamManager";
import TestimonialsManager from "../components/admin/TestimonialsManager";
import TwoFactorAuth from "../components/admin/TwoFactorAuth";
import DatabaseViewer from "../components/admin/DatabaseViewer";
import WebhookManager from "../components/admin/WebhookManager";

import {
  FaEdit as FaBlogIcon,
  FaInbox,
  FaUserPlus as FaUserPlusIcon,
  FaQuoteLeft,
  FaShieldAlt,
  FaPlug,
  FaUserShield,
  FaBell as FaBellSolid,
  FaSearchPlus,
  FaKey,
  FaTrophy,
  FaCog,
  FaUsers,
  FaLock,
  FaBuilding,
  FaFolder,
  FaMoneyBillWave,
  FaTicketAlt,
  FaPhone,
  FaChartLine,
  FaChartBar,
  FaFileAlt,
  FaBell,
  FaQuestionCircle,
  FaUserTie,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaUserPlus,
  FaFolderPlus,
  FaFileInvoiceDollar,
  FaPlus,
  FaDownload,
  FaSearch,
  FaEye,
  FaDesktop,
  FaMobile,
  FaTablet,
  FaGlobe,
  FaSync,
  FaClock,
  FaEnvelopeOpen,
  FaColumns,
  FaImages,
  FaHeartbeat,
  FaHistory,
  FaRupeeSign,
  FaSlidersH,
  FaDatabase,
} from "react-icons/fa";

// ============================================================
// ADMIN GATE — server-verified secret code
// ============================================================
const ADMIN_TOKEN_KEY = "admin_gate_token";
const API_BASE =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_URL) ||
  "http://localhost:5000/api";

const AdminPanel = () => {
  // ===== GATE =====
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return !!sessionStorage.getItem(ADMIN_TOKEN_KEY);
    } catch {
      return false;
    }
  });
  const [secretCode, setSecretCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [verifying, setVerifying] = useState(false);

  // ===== PANEL STATE =====
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ===== DATA STATE =====
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [leads, setLeads] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [visitorStats, setVisitorStats] = useState(null);

  // ===== LOADING / ERROR =====
  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);

  // ===== MODALS =====
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // ===== FORMS =====
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "user",
    company: "",
    phone: "",
    status: "active",
  });
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    client: "",
    status: "Pending",
    priority: "Medium",
    budget: "",
    dueDate: "",
  });
  const [invoiceForm, setInvoiceForm] = useState({
    client: "",
    description: "",
    amount: "",
    tax: 18,
    dueDate: "",
  });

  // ===== FILTERS =====
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // ===== TOAST =====
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ============================================================
  // ===== GATE HANDLERS =====
  // ============================================================
  const handleUnlock = async (e) => {
    e.preventDefault();
    if (verifying) return;
    setVerifying(true);
    setCodeError("");

    try {
      const res = await fetch(`${API_BASE}/admin/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretCode }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setAttempts((a) => a + 1);
        setCodeError(data.message || "Invalid access code. Please try again.");
        setSecretCode("");
        return;
      }

      sessionStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setIsUnlocked(true);
      setSecretCode("");
      setCodeError("");
      setAttempts(0);
      setShowCode(false);
    } catch (err) {
      console.error("Admin unlock error:", err);
      setCodeError("Network error. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    setIsUnlocked(false);
    setSecretCode("");
    setCodeError("");
    setShowCode(false);
    setAttempts(0);
    setActiveSection("dashboard");
  };

  // ============================================================
  // ===== DATA LOADERS =====
  // ============================================================
  const setSectionLoading = (key, value) =>
    setLoading((prev) => ({ ...prev, [key]: value }));

  const loadUsers = useCallback(async () => {
    setSectionLoading("users", true);
    try {
      const data = await adminApi.getUsers();
      setUsers(data.users || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      showToast(err.message, "error");
    } finally {
      setSectionLoading("users", false);
    }
  }, []);

  const loadProjects = useCallback(async () => {
    setSectionLoading("projects", true);
    try {
      const data = await adminApi.getProjects();
      setProjects(data.projects || []);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSectionLoading("projects", false);
    }
  }, []);

  const loadInvoices = useCallback(async () => {
    setSectionLoading("invoices", true);
    try {
      const data = await adminApi.getInvoices();
      setInvoices(data.invoices || []);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSectionLoading("invoices", false);
    }
  }, []);

  const loadTickets = useCallback(async () => {
    setSectionLoading("tickets", true);
    try {
      const data = await adminApi.getTickets();
      setTickets(data.tickets || []);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSectionLoading("tickets", false);
    }
  }, []);

  const loadLeads = useCallback(async () => {
    setSectionLoading("leads", true);
    try {
      const data = await adminApi.getLeads();
      setLeads(data.leads || []);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSectionLoading("leads", false);
    }
  }, []);

  const loadVisitors = useCallback(async () => {
    setSectionLoading("visitors", true);
    try {
      const [statsRes, listRes] = await Promise.all([
        adminApi.getVisitorStats(),
        adminApi.getVisitors(1, 100),
      ]);
      setVisitorStats(statsRes.stats);
      setVisitors(listRes.visitors || []);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSectionLoading("visitors", false);
    }
  }, []);

  // Load users + projects + invoices once on unlock (needed everywhere)
  useEffect(() => {
    if (!isUnlocked) return;
    loadUsers();
    loadProjects();
    loadInvoices();
  }, [isUnlocked, loadUsers, loadProjects, loadInvoices]);

  // Load section-specific data when the section changes
  useEffect(() => {
    if (!isUnlocked) return;
    if (activeSection === "tickets" || activeSection === "kanban")
      loadTickets();
    if (activeSection === "leads") loadLeads();
    if (activeSection === "visitors") loadVisitors();
    if (activeSection === "revenue") loadInvoices();
  }, [
    activeSection,
    isUnlocked,
    loadTickets,
    loadLeads,
    loadVisitors,
    loadInvoices,
  ]);

  // Validate admin-gate token on mount
  useEffect(() => {
    if (!isUnlocked) return;
    (async () => {
      try {
        const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);
        const res = await fetch(`${API_BASE}/admin/auth/session`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) handleLock();
      } catch {
        /* network error — leave unlocked */
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnlocked]);

  // ============================================================
  // ===== CRUD HANDLERS =====
  // ============================================================

  // ===== USERS =====
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email) {
      showToast("Name and email are required", "error");
      return;
    }
    try {
      // Backend has no POST /users (users register themselves). We'll update
      // the local list optimistically so the UI reflects it. If you add a
      // POST /users route later, swap this for adminApi.createUser().
      const newUser = {
        _id: `local-${Date.now()}`,
        ...userForm,
        isActive: userForm.status === "active",
        createdAt: new Date().toISOString(),
        lastLogin: null,
      };
      setUsers([newUser, ...users]);
      setUserForm({
        name: "",
        email: "",
        role: "user",
        company: "",
        phone: "",
        status: "active",
      });
      setShowUserModal(false);
      setShowCreateModal(false);
      showToast(`User "${newUser.name}" added`);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company || "",
      phone: user.phone || "",
      status: user.isActive ? "active" : "inactive",
    });
    setShowUserModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      await adminApi.updateUser(editingUser._id, {
        name: userForm.name,
        role: userForm.role,
        company: userForm.company,
        phone: userForm.phone,
        isActive: userForm.status === "active",
      });
      setUsers(
        users.map((u) =>
          u._id === editingUser._id
            ? {
                ...u,
                ...userForm,
                isActive: userForm.status === "active",
              }
            : u,
        ),
      );
      setEditingUser(null);
      setUserForm({
        name: "",
        email: "",
        role: "user",
        company: "",
        phone: "",
        status: "active",
      });
      setShowUserModal(false);
      showToast("User updated successfully");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await adminApi.deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
      showToast("User deleted", "info");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // ===== PROJECTS =====
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.client) {
      showToast("Title and client are required", "error");
      return;
    }
    try {
      const payload = {
        title: projectForm.title,
        description: projectForm.description,
        client: projectForm.client,
        status: projectForm.status,
        priority: projectForm.priority,
        budget: parseInt(projectForm.budget) || 0,
        dueDate: projectForm.dueDate || undefined,
      };
      const data = await adminApi.createProject(payload);
      setProjects([data.project, ...projects]);
      setProjectForm({
        title: "",
        description: "",
        client: "",
        status: "Pending",
        priority: "Medium",
        budget: "",
        dueDate: "",
      });
      setShowProjectModal(false);
      setShowCreateModal(false);
      showToast(`Project "${data.project.title}" created`);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await adminApi.deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
      showToast("Project deleted", "info");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // ===== INVOICES =====
  const handleAddInvoice = async (e) => {
    e.preventDefault();
    if (!invoiceForm.client || !invoiceForm.amount) {
      showToast("Client and amount required", "error");
      return;
    }
    try {
      const amount = parseInt(invoiceForm.amount);
      const tax = (amount * invoiceForm.tax) / 100;
      const payload = {
        client: invoiceForm.client,
        items: [
          {
            description: invoiceForm.description || "Services",
            quantity: 1,
            rate: amount,
            amount: amount,
          },
        ],
        tax,
        dueDate: invoiceForm.dueDate || undefined,
      };
      const data = await adminApi.createInvoice(payload);
      setInvoices([data.invoice, ...invoices]);
      setInvoiceForm({
        client: "",
        description: "",
        amount: "",
        tax: 18,
        dueDate: "",
      });
      setShowInvoiceModal(false);
      setShowCreateModal(false);
      showToast(`Invoice ${data.invoice.invoiceNumber} created`);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // ===== VISITORS =====
  const handleClearVisitors = async () => {
    if (!window.confirm("Clear all visitor data? This cannot be undone."))
      return;
    try {
      await adminApi.clearVisitors();
      showToast("All visitors cleared", "info");
      loadVisitors();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // ============================================================
  // ===== DERIVED DATA =====
  // ============================================================
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalRevenue = invoices
    .filter((i) => i.status === "paid")
    .reduce((s, i) => s + (i.total || 0), 0);

  const stats = [
    {
      label: "Total Users",
      value: users.length.toString(),
      change: "+12%",
      up: true,
      icon: <FaUsers />,
    },
    {
      label: "Active Projects",
      value: projects
        .filter((p) => p.status === "In Progress")
        .length.toString(),
      change: "+8%",
      up: true,
      icon: <FaFolder />,
    },
    {
      label: "Revenue (Paid)",
      value: `₹${(totalRevenue / 100000).toFixed(1)}L`,
      change: "+18%",
      up: true,
      icon: <FaMoneyBillWave />,
    },
    {
      label: "Open Tickets",
      value: tickets.filter((t) => t.status === "open").length.toString(),
      change: "-5%",
      up: false,
      icon: <FaTicketAlt />,
    },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleString("en-IN", {
        dateStyle: "short",
        timeStyle: "short",
      });
    } catch {
      return dateStr;
    }
  };

  // ============================================================
  // ===== GATE SCREEN =====
  // ============================================================
  if (!isUnlocked) {
    return (
      <div className="admin-gate">
        <div className="admin-gate-card">
          <div className="admin-gate-icon">
            <FaLock />
          </div>
          <h2 className="admin-gate-title">Restricted Area</h2>
          <p className="admin-gate-subtitle">
            Enter the secret access code to open the Admin Panel
          </p>

          <form onSubmit={handleUnlock} className="admin-gate-form">
            <div className="admin-gate-input-wrap">
              <FaLock className="admin-gate-input-icon" />
              <input
                type={showCode ? "text" : "password"}
                className="admin-gate-input"
                placeholder="Enter access code"
                value={secretCode}
                onChange={(e) => {
                  setSecretCode(e.target.value);
                  if (codeError) setCodeError("");
                }}
                autoFocus
                autoComplete="off"
                spellCheck="false"
                disabled={verifying}
              />
              <button
                type="button"
                className="admin-gate-eye"
                onClick={() => setShowCode((s) => !s)}
                tabIndex={-1}
              >
                <FaEye />
              </button>
            </div>

            {codeError && (
              <div className="admin-gate-error">
                <span>❌</span> {codeError}
                {attempts >= 3 && (
                  <div className="admin-gate-error-hint">
                    Hint: contact the site owner for the access code.
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="admin-gate-btn"
              disabled={verifying || !secretCode.trim()}
            >
              {verifying ? "Verifying..." : "Unlock Admin Panel"}
            </button>
          </form>

          <p className="admin-gate-footer">
            🔒 This area is protected. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ===== MAIN PANEL =====
  // ============================================================
  const sections = [
    { id: "dashboard", label: "Dashboard", icon: <FaChartBar /> },
    { id: "revenue", label: "Revenue", icon: <FaRupeeSign /> },
    { id: "users", label: "Users", icon: <FaUsers />, badge: users.length },
    { id: "roles", label: "Roles & Permissions", icon: <FaUserShield /> },
    {
      id: "clients",
      label: "Clients",
      icon: <FaBuilding />,
      badge: users.filter((u) => u.role === "client").length,
    },
    {
      id: "projects",
      label: "Projects",
      icon: <FaFolder />,
      badge: projects.length,
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: <FaMoneyBillWave />,
      badge: invoices.filter((i) => i.status === "pending").length,
    },
    { id: "leads", label: "Leads / CRM", icon: <FaPhone /> },
    { id: "tickets", label: "Support Tickets", icon: <FaTicketAlt /> },
    { id: "kanban", label: "Ticket Board", icon: <FaColumns /> },
    { id: "team", label: "Team Performance", icon: <FaTrophy /> },
    {
      id: "visitors",
      label: "Visitors",
      icon: <FaEye />,
      badge: visitorStats?.totalVisitors || 0,
    },
    { id: "analytics", label: "Analytics", icon: <FaChartLine /> },
    { id: "email", label: "Email Campaigns", icon: <FaEnvelopeOpen /> },
    { id: "notifications", label: "Notifications", icon: <FaBellSolid /> },
    { id: "media", label: "Media Library", icon: <FaImages /> },
    { id: "activity", label: "Activity Timeline", icon: <FaHistory /> },
    { id: "blog", label: "Blog Posts", icon: <FaBlogIcon /> },
    { id: "inbox", label: "Contact Inbox", icon: <FaInbox /> },
    { id: "subscribers", label: "Subscribers", icon: <FaUserPlusIcon /> },
    { id: "team-members", label: "Team Members", icon: <FaUsers /> },
    { id: "testimonials", label: "Testimonials", icon: <FaQuoteLeft /> },
    { id: "seo", label: "SEO Manager", icon: <FaSearchPlus /> },
    { id: "api-keys", label: "API Keys", icon: <FaKey /> },
    { id: "webhooks", label: "Webhooks", icon: <FaPlug /> },
    { id: "2fa", label: "Two-Factor Auth", icon: <FaShieldAlt /> },
    { id: "database", label: "Database Viewer", icon: <FaDatabase /> },
    { id: "health", label: "System Health", icon: <FaHeartbeat /> },
    { id: "logs", label: "Audit Logs", icon: <FaFileAlt /> },
    { id: "settings", label: "Site Settings", icon: <FaSlidersH /> },
  ];

  const isLoading = (key) => loading[key];

  return (
    <div className="admin-page">
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>
            {toast.type === "success"
              ? "✅"
              : toast.type === "error"
                ? "❌"
                : "ℹ️"}
          </span>
          {toast.message}
        </div>
      )}

      <div className="admin-layout">
        {/* ===== SIDEBAR ===== */}
        <aside
          className={`admin-sidebar ${sidebarOpen ? "open" : "collapsed"}`}
        >
          <div className="admin-sidebar-header">
            <span className="admin-sidebar-logo">
              <FaCog />
            </span>
            {sidebarOpen && (
              <span className="admin-sidebar-title">Admin Panel</span>
            )}
            <button
              className="admin-sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? "◀" : "▶"}
            </button>
          </div>

          <nav className="admin-nav">
            {sections.map((section, index) => (
              <button
                key={`${section.id}-${index}`}
                className={`admin-nav-item ${
                  activeSection === section.id ? "active" : ""
                }`}
                onClick={() => setActiveSection(section.id)}
                title={section.label}
              >
                <span className="admin-nav-icon">{section.icon}</span>
                {sidebarOpen && (
                  <>
                    <span className="admin-nav-label">{section.label}</span>
                    {section.badge > 0 && (
                      <span className="admin-nav-badge">{section.badge}</span>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <div className="admin-user-info">
              <span className="admin-user-avatar">
                <FaUserTie />
              </span>
              {sidebarOpen && (
                <div className="admin-user-meta">
                  <strong>Admin User</strong>
                  <span>Super Admin</span>
                </div>
              )}
              <button
                className="admin-lock-btn"
                onClick={handleLock}
                title="Lock Admin Panel"
              >
                <FaLock />
              </button>
            </div>
          </div>
        </aside>

        {/* ===== MAIN ===== */}
        <main className="admin-main">
          <div className="admin-header">
            <div>
              <h1 className="admin-title">
                {sections.find((s) => s.id === activeSection)?.icon}{" "}
                {sections.find((s) => s.id === activeSection)?.label}
              </h1>
              <p className="admin-subtitle">
                Manage your{" "}
                {sections
                  .find((s) => s.id === activeSection)
                  ?.label.toLowerCase()}
              </p>
            </div>
            <div className="admin-header-actions">
              {(activeSection === "visitors" ||
                activeSection === "users" ||
                activeSection === "projects" ||
                activeSection === "invoices" ||
                activeSection === "tickets" ||
                activeSection === "leads") && (
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    if (activeSection === "visitors") loadVisitors();
                    if (activeSection === "users") loadUsers();
                    if (activeSection === "projects") loadProjects();
                    if (activeSection === "invoices") loadInvoices();
                    if (activeSection === "tickets") loadTickets();
                    if (activeSection === "leads") loadLeads();
                  }}
                >
                  <FaSync /> Refresh
                </button>
              )}
              <button className="icon-btn" title="Notifications">
                <FaBell />
              </button>
              <button className="icon-btn" title="Help">
                <FaQuestionCircle />
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowCreateModal(true)}
              >
                <FaPlus style={{ marginRight: "0.5rem" }} /> Create New
              </button>
            </div>
          </div>

          {error && (
            <div className="admin-card" style={{ borderColor: "#fecaca" }}>
              <p style={{ color: "#991b1b" }}>⚠️ {error}</p>
            </div>
          )}

          {/* ===== DASHBOARD ===== */}
          {activeSection === "dashboard" && (
            <div className="admin-dashboard">
              <div className="admin-stats-grid">
                {stats.map((stat, i) => (
                  <div key={i} className="admin-stat-card">
                    <div className="admin-stat-header">
                      <span className="admin-stat-icon">{stat.icon}</span>
                      <span className={`kpi-change ${stat.up ? "up" : "down"}`}>
                        {stat.up ? "▲" : "▼"} {stat.change}
                      </span>
                    </div>
                    <div className="admin-stat-value">{stat.value}</div>
                    <div className="admin-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Recent Users</h3>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setActiveSection("users")}
                  >
                    View All →
                  </button>
                </div>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.slice(0, 4).map((user) => (
                        <tr key={user._id}>
                          <td>
                            <div className="admin-user-cell">
                              <span className="admin-avatar">
                                <FaUserCircle />
                              </span>
                              <div>
                                <strong>{user.name}</strong>
                                <span>{user.email}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span
                              className={`badge badge-${
                                user.role === "admin"
                                  ? "red"
                                  : user.role === "manager"
                                    ? "yellow"
                                    : user.role === "client"
                                      ? "purple"
                                      : "blue"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge badge-${
                                user.isActive ? "green" : "gray"
                              }`}
                            >
                              {user.isActive ? "active" : "inactive"}
                            </span>
                          </td>
                          <td>
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString()
                              : "—"}
                          </td>
                          <td>
                            <div className="admin-actions">
                              <button
                                className="icon-btn-sm"
                                onClick={() => handleEditUser(user)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="icon-btn-sm"
                                onClick={() => handleDeleteUser(user._id)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {users.length === 0 && !isLoading("users") && (
                        <tr>
                          <td
                            colSpan="5"
                            style={{ textAlign: "center", padding: "2rem" }}
                          >
                            No users yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="admin-quick-actions">
                <h3>Quick Actions</h3>
                <div className="admin-actions-grid">
                  {[
                    {
                      icon: <FaUserPlus />,
                      label: "Add User",
                      color: "indigo",
                      action: () => setShowUserModal(true),
                    },
                    {
                      icon: <FaFolderPlus />,
                      label: "Create Project",
                      color: "blue",
                      action: () => setShowProjectModal(true),
                    },
                    {
                      icon: <FaFileInvoiceDollar />,
                      label: "Generate Invoice",
                      color: "green",
                      action: () => setShowInvoiceModal(true),
                    },
                    {
                      icon: <FaEye />,
                      label: "View Visitors",
                      color: "purple",
                      action: () => setActiveSection("visitors"),
                    },
                    {
                      icon: <FaEnvelopeOpen />,
                      label: "Email Campaign",
                      color: "yellow",
                      action: () => setActiveSection("email"),
                    },
                    {
                      icon: <FaHeartbeat />,
                      label: "System Health",
                      color: "gray",
                      action: () => setActiveSection("health"),
                    },
                  ].map((action, i) => (
                    <button
                      key={i}
                      className={`admin-quick-action action-${action.color}`}
                      onClick={action.action}
                    >
                      <span className="admin-quick-icon">{action.icon}</span>
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== USERS ===== */}
          {activeSection === "users" && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3>All Users ({filteredUsers.length})</h3>
                <div className="admin-header-filters">
                  <div className="search-input-wrapper">
                    <FaSearch />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="input-field input-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="input-field input-sm"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                    <option value="client">Client</option>
                    <option value="user">User</option>
                  </select>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowUserModal(true)}
                  >
                    <FaUserPlus style={{ marginRight: "0.5rem" }} /> Add User
                  </button>
                </div>
              </div>

              {isLoading("users") ? (
                <p style={{ padding: "2rem", textAlign: "center" }}>
                  Loading users…
                </p>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user._id}>
                          <td>
                            <strong>{user.name}</strong>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <span
                              className={`badge badge-${
                                user.role === "admin"
                                  ? "red"
                                  : user.role === "manager"
                                    ? "yellow"
                                    : user.role === "client"
                                      ? "purple"
                                      : "blue"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge badge-${
                                user.isActive ? "green" : "gray"
                              }`}
                            >
                              {user.isActive ? "active" : "inactive"}
                            </span>
                          </td>
                          <td>
                            {user.lastLogin
                              ? formatDate(user.lastLogin)
                              : "Never"}
                          </td>
                          <td>
                            <div className="admin-actions">
                              <button
                                className="icon-btn-sm"
                                onClick={() => handleEditUser(user)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="icon-btn-sm"
                                onClick={() => handleDeleteUser(user._id)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ===== PROJECTS ===== */}
          {activeSection === "projects" && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3>All Projects ({projects.length})</h3>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowProjectModal(true)}
                >
                  <FaFolderPlus style={{ marginRight: "0.5rem" }} /> New Project
                </button>
              </div>
              {isLoading("projects") ? (
                <p style={{ padding: "2rem", textAlign: "center" }}>
                  Loading projects…
                </p>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Client</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Budget</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project._id}>
                          <td>
                            <strong>{project.title}</strong>
                          </td>
                          <td>{project.client?.name || "—"}</td>
                          <td>
                            <span
                              className={`badge badge-${
                                project.status === "Completed"
                                  ? "green"
                                  : project.status === "In Progress"
                                    ? "blue"
                                    : "yellow"
                              }`}
                            >
                              {project.status}
                            </span>
                          </td>
                          <td>
                            <div className="progress-bar-mini">
                              <div
                                className="progress-fill-mini"
                                style={{ width: `${project.progress || 0}%` }}
                              />
                            </div>
                            <span style={{ fontSize: "0.75rem" }}>
                              {project.progress || 0}%
                            </span>
                          </td>
                          <td>
                            ₹{(project.budget || 0).toLocaleString("en-IN")}
                          </td>
                          <td>
                            <div className="admin-actions">
                              <button
                                className="icon-btn-sm"
                                onClick={() => handleDeleteProject(project._id)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {projects.length === 0 && (
                        <tr>
                          <td
                            colSpan="6"
                            style={{ textAlign: "center", padding: "2rem" }}
                          >
                            No projects yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ===== INVOICES ===== */}
          {activeSection === "invoices" && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3>All Invoices ({invoices.length})</h3>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowInvoiceModal(true)}
                >
                  <FaFileInvoiceDollar style={{ marginRight: "0.5rem" }} />{" "}
                  Generate Invoice
                </button>
              </div>
              {isLoading("invoices") ? (
                <p style={{ padding: "2rem", textAlign: "center" }}>
                  Loading invoices…
                </p>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Invoice #</th>
                        <th>Client</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((inv) => (
                        <tr key={inv._id}>
                          <td>
                            <strong>{inv.invoiceNumber}</strong>
                          </td>
                          <td>{inv.client?.name || "—"}</td>
                          <td>₹{(inv.total || 0).toLocaleString("en-IN")}</td>
                          <td>
                            <span
                              className={`badge badge-${
                                inv.status === "paid"
                                  ? "green"
                                  : inv.status === "pending"
                                    ? "yellow"
                                    : "red"
                              }`}
                            >
                              {inv.status}
                            </span>
                          </td>
                          <td>{formatDate(inv.issueDate)}</td>
                        </tr>
                      ))}
                      {invoices.length === 0 && (
                        <tr>
                          <td
                            colSpan="5"
                            style={{ textAlign: "center", padding: "2rem" }}
                          >
                            No invoices yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ===== VISITORS ===== */}
          {activeSection === "visitors" && (
            <div className="admin-dashboard">
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-header">
                    <span
                      className="admin-stat-icon"
                      style={{ color: "var(--success)" }}
                    >
                      <FaEye />
                    </span>
                    <span className="kpi-change up">● Live</span>
                  </div>
                  <div className="admin-stat-value">
                    {visitorStats?.onlineNow || 0}
                  </div>
                  <div className="admin-stat-label">Online Now</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-header">
                    <span
                      className="admin-stat-icon"
                      style={{ color: "var(--primary)" }}
                    >
                      <FaUsers />
                    </span>
                  </div>
                  <div className="admin-stat-value">
                    {visitorStats?.todayVisitors || 0}
                  </div>
                  <div className="admin-stat-label">Today's Visitors</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-header">
                    <span
                      className="admin-stat-icon"
                      style={{ color: "#2563EB" }}
                    >
                      <FaChartLine />
                    </span>
                  </div>
                  <div className="admin-stat-value">
                    {visitorStats?.last7Days || 0}
                  </div>
                  <div className="admin-stat-label">Last 7 Days</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-header">
                    <span
                      className="admin-stat-icon"
                      style={{ color: "var(--secondary)" }}
                    >
                      <FaGlobe />
                    </span>
                  </div>
                  <div className="admin-stat-value">
                    {visitorStats?.totalVisitors || 0}
                  </div>
                  <div className="admin-stat-label">Total Visitors</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-header">
                    <span
                      className="admin-stat-icon"
                      style={{ color: "var(--warning)" }}
                    >
                      <FaClock />
                    </span>
                  </div>
                  <div className="admin-stat-value">
                    {visitorStats?.totalPageViews || 0}
                  </div>
                  <div className="admin-stat-label">Total Page Views</div>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>🕐 Recent Visitors ({visitors.length})</h3>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={loadVisitors}
                      disabled={isLoading("visitors")}
                    >
                      <FaSync />{" "}
                      {isLoading("visitors") ? "Loading…" : "Refresh"}
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={handleClearVisitors}
                    >
                      <FaTrash /> Clear All
                    </button>
                  </div>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>IP</th>
                        <th>Page</th>
                        <th>Device</th>
                        <th>Browser</th>
                        <th>OS</th>
                        <th>Visits</th>
                        <th>Last Seen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitors.map((v) => (
                        <tr key={v._id}>
                          <td>
                            <code style={{ fontSize: "0.75rem" }}>{v.ip}</code>
                          </td>
                          <td>
                            <span className="badge badge-blue">
                              {v.currentPage || v.page || "/"}
                            </span>
                          </td>
                          <td>{v.device || "Unknown"}</td>
                          <td>{v.browser || "Unknown"}</td>
                          <td>{v.os || "Unknown"}</td>
                          <td>
                            <strong>{v.pageViews || 1}</strong>
                          </td>
                          <td style={{ fontSize: "0.75rem" }}>
                            {formatDate(v.lastVisit)}
                          </td>
                        </tr>
                      ))}
                      {visitors.length === 0 && !isLoading("visitors") && (
                        <tr>
                          <td
                            colSpan="7"
                            style={{ textAlign: "center", padding: "3rem" }}
                          >
                            <div className="empty-state">
                              <div className="empty-state-icon">👀</div>
                              <h3 className="empty-state-title">
                                No visitors yet
                              </h3>
                              <p className="empty-state-description">
                                Data will appear when someone visits your
                                website.
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===== REVENUE ===== */}
          {activeSection === "revenue" && (
            <RevenueDashboard invoices={invoices} />
          )}

          {/* ===== OTHER FEATURE COMPONENTS ===== */}
          {activeSection === "kanban" && <TicketKanban tickets={tickets} />}
          {activeSection === "email" && <EmailCampaigns />}
          {activeSection === "media" && <MediaLibrary />}
          {activeSection === "activity" && <ActivityTimeline />}
          {activeSection === "health" && <SystemHealth />}
          {activeSection === "roles" && <RolesPermissions />}
          {activeSection === "clients" && <ClientsManager users={users} />}
          {activeSection === "leads" && <LeadsPipeline leads={leads} />}
          {activeSection === "team" && <TeamPerformance />}
          {activeSection === "notifications" && <NotificationManager />}
          {activeSection === "seo" && <SEOManager />}
          {activeSection === "api-keys" && <APIKeysManager />}
          {activeSection === "blog" && <BlogManager />}
          {activeSection === "inbox" && <ContactInbox />}
          {activeSection === "subscribers" && <SubscribersManager />}
          {activeSection === "team-members" && <TeamManager />}
          {activeSection === "testimonials" && <TestimonialsManager />}
          {activeSection === "2fa" && <TwoFactorAuth />}
          {activeSection === "database" && <DatabaseViewer />}
          {activeSection === "webhooks" && <WebhookManager />}
        </main>
      </div>

      {/* ===== CREATE NEW MODAL ===== */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="What do you want to create?"
      >
        <div className="create-new-grid">
          <button
            className="create-new-option"
            onClick={() => {
              setShowCreateModal(false);
              setShowUserModal(true);
            }}
          >
            <FaUserPlus />
            <strong>Add User</strong>
            <span>Create a new user account</span>
          </button>
          <button
            className="create-new-option"
            onClick={() => {
              setShowCreateModal(false);
              setShowProjectModal(true);
            }}
          >
            <FaFolderPlus />
            <strong>New Project</strong>
            <span>Start a new project</span>
          </button>
          <button
            className="create-new-option"
            onClick={() => {
              setShowCreateModal(false);
              setShowInvoiceModal(true);
            }}
          >
            <FaFileInvoiceDollar />
            <strong>Create Invoice</strong>
            <span>Generate a new invoice</span>
          </button>
        </div>
      </Modal>

      {/* ===== USER MODAL ===== */}
      <Modal
        isOpen={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setEditingUser(null);
          setUserForm({
            name: "",
            email: "",
            role: "user",
            company: "",
            phone: "",
            status: "active",
          });
        }}
        title={editingUser ? "Edit User" : "Add New User"}
      >
        <form
          onSubmit={editingUser ? handleUpdateUser : handleAddUser}
          className="admin-form"
        >
          <Input
            label="Full Name *"
            type="text"
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            placeholder="John Doe"
            required
          />
          <Input
            label="Email *"
            type="email"
            value={userForm.email}
            onChange={(e) =>
              setUserForm({ ...userForm, email: e.target.value })
            }
            placeholder="john@example.com"
            disabled={!!editingUser}
            required
          />
          <div className="form-row">
            <div className="form-group">
              <label>Role</label>
              <select
                className="input-field"
                value={userForm.role}
                onChange={(e) =>
                  setUserForm({ ...userForm, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="client">Client</option>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="input-field"
                value={userForm.status}
                onChange={(e) =>
                  setUserForm({ ...userForm, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <Input
            label="Company"
            type="text"
            value={userForm.company}
            onChange={(e) =>
              setUserForm({ ...userForm, company: e.target.value })
            }
            placeholder="ABC Corp"
          />
          <Input
            label="Phone"
            type="tel"
            value={userForm.phone}
            onChange={(e) =>
              setUserForm({ ...userForm, phone: e.target.value })
            }
            placeholder="+91 9876543210"
          />
          <div className="form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowUserModal(false);
                setEditingUser(null);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingUser ? "Update User" : "Add User"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* ===== PROJECT MODAL ===== */}
      <Modal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        title="Create New Project"
      >
        <form onSubmit={handleAddProject} className="admin-form">
          <Input
            label="Project Title *"
            type="text"
            value={projectForm.title}
            onChange={(e) =>
              setProjectForm({ ...projectForm, title: e.target.value })
            }
            placeholder="E-commerce Platform"
            required
          />
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="input-field"
              rows="3"
              value={projectForm.description}
              onChange={(e) =>
                setProjectForm({ ...projectForm, description: e.target.value })
              }
              placeholder="Project details..."
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Client *</label>
              <select
                className="input-field"
                value={projectForm.client}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, client: e.target.value })
                }
                required
              >
                <option value="">Select client</option>
                {users
                  .filter((u) => u.role === "client" || u.role === "user")
                  .map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                className="input-field"
                value={projectForm.priority}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, priority: e.target.value })
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <Input
              label="Budget (₹)"
              type="number"
              value={projectForm.budget}
              onChange={(e) =>
                setProjectForm({ ...projectForm, budget: e.target.value })
              }
              placeholder="500000"
            />
            <Input
              label="Due Date"
              type="date"
              value={projectForm.dueDate}
              onChange={(e) =>
                setProjectForm({ ...projectForm, dueDate: e.target.value })
              }
            />
          </div>
          <div className="form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowProjectModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Project
            </Button>
          </div>
        </form>
      </Modal>

      {/* ===== INVOICE MODAL ===== */}
      <Modal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        title="Generate Invoice"
      >
        <form onSubmit={handleAddInvoice} className="admin-form">
          <div className="form-group">
            <label>Client *</label>
            <select
              className="input-field"
              value={invoiceForm.client}
              onChange={(e) =>
                setInvoiceForm({ ...invoiceForm, client: e.target.value })
              }
              required
            >
              <option value="">Select client</option>
              {users
                .filter((u) => u.role === "client" || u.role === "user")
                .map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="input-field"
              value={invoiceForm.description}
              onChange={(e) =>
                setInvoiceForm({ ...invoiceForm, description: e.target.value })
              }
              placeholder="Website Development"
            />
          </div>
          <div className="form-row">
            <Input
              label="Amount (₹) *"
              type="number"
              value={invoiceForm.amount}
              onChange={(e) =>
                setInvoiceForm({ ...invoiceForm, amount: e.target.value })
              }
              placeholder="250000"
              required
            />
            <Input
              label="Tax (%)"
              type="number"
              value={invoiceForm.tax}
              onChange={(e) =>
                setInvoiceForm({ ...invoiceForm, tax: e.target.value })
              }
            />
          </div>
          <Input
            label="Due Date"
            type="date"
            value={invoiceForm.dueDate}
            onChange={(e) =>
              setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })
            }
          />
          <div className="form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowInvoiceModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Generate Invoice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPanel;
