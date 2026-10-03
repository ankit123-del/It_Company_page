import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaFolder,
  FaMoneyBillWave,
  FaTicketAlt,
  FaClock,
  FaChartBar,
  FaFileAlt,
  FaHandPaper,
  FaDownload,
  FaUpload,
} from "react-icons/fa";

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      label: "Active Projects",
      value: "3",
      icon: <FaFolder />,
      color: "indigo",
    },
    {
      label: "Pending Invoices",
      value: "2",
      icon: <FaMoneyBillWave />,
      color: "yellow",
    },
    { label: "Open Tickets", value: "1", icon: <FaTicketAlt />, color: "red" },
    { label: "Hours Used", value: "127", icon: <FaClock />, color: "green" },
  ];

  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      progress: 68,
      status: "in-progress",
      due: "Dec 15, 2024",
    },
    {
      id: 2,
      name: "Mobile App",
      progress: 92,
      status: "review",
      due: "Nov 01, 2024",
    },
    {
      id: 3,
      name: "Cloud Migration",
      progress: 100,
      status: "completed",
      due: "Oct 10, 2024",
    },
  ];

  const invoices = [
    { id: "INV-001", amount: "₹2,50,000", date: "2024-10-01", status: "paid" },
    {
      id: "INV-002",
      amount: "₹1,80,000",
      date: "2024-10-15",
      status: "pending",
    },
    {
      id: "INV-003",
      amount: "₹3,20,000",
      date: "2024-09-20",
      status: "overdue",
    },
  ];

  const tickets = [
    {
      id: "TKT-101",
      subject: "Payment gateway issue",
      priority: "high",
      status: "open",
      date: "2h ago",
    },
    {
      id: "TKT-102",
      subject: "Feature request",
      priority: "medium",
      status: "in-progress",
      date: "1d ago",
    },
    {
      id: "TKT-103",
      subject: "Documentation query",
      priority: "low",
      status: "resolved",
      date: "3d ago",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: <FaChartBar /> },
    { id: "projects", label: "Projects", icon: <FaFolder /> },
    { id: "invoices", label: "Invoices", icon: <FaMoneyBillWave /> },
    { id: "tickets", label: "Support", icon: <FaTicketAlt /> },
    { id: "documents", label: "Documents", icon: <FaFileAlt /> },
  ];

  return (
    <div className="client-portal-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Client Portal" }]} />
          <h1 className="page-title">
            Welcome Back, TechCorp! <FaHandPaper />
          </h1>
          <p className="page-subtitle">
            Manage your projects, invoices, and support tickets
          </p>
        </div>
      </div>

      <div className="container">
        {/* Stats Cards */}
        <div className="portal-stats">
          {stats.map((stat, i) => (
            <div key={i} className={`portal-stat-card stat-icon-${stat.color}`}>
              <span className="portal-stat-icon">{stat.icon}</span>
              <div>
                <span className="portal-stat-value">{stat.value}</span>
                <span className="portal-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="portal-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`portal-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="portal-content">
            <div className="portal-grid">
              <div className="portal-card">
                <h3>Recent Projects</h3>
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="portal-project-item">
                    <div className="portal-project-info">
                      <strong>{project.name}</strong>
                      <span>Due: {project.due}</span>
                    </div>
                    <div className="portal-project-progress">
                      <div className="portal-progress-bar">
                        <div
                          className="portal-progress-fill"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span>{project.progress}%</span>
                    </div>
                  </div>
                ))}
                <Link to="/tracker" className="portal-view-all">
                  View All Projects →
                </Link>
              </div>

              <div className="portal-card">
                <h3>Recent Invoices</h3>
                {invoices.slice(0, 3).map((invoice) => (
                  <div key={invoice.id} className="portal-invoice-item">
                    <div>
                      <strong>{invoice.id}</strong>
                      <span>{invoice.date}</span>
                    </div>
                    <div className="portal-invoice-right">
                      <span className="portal-invoice-amount">
                        {invoice.amount}
                      </span>
                      <span
                        className={`badge badge-${invoice.status === "paid" ? "green" : invoice.status === "pending" ? "yellow" : "red"}`}
                      >
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="portal-content">
            <div className="portal-card">
              <h3>All Projects</h3>
              {projects.map((project) => (
                <div key={project.id} className="portal-project-item">
                  <div className="portal-project-info">
                    <strong>{project.name}</strong>
                    <span>Due: {project.due}</span>
                  </div>
                  <div className="portal-project-progress">
                    <div className="portal-progress-bar">
                      <div
                        className="portal-progress-fill"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span>{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === "invoices" && (
          <div className="portal-content">
            <div className="portal-card">
              <div className="portal-card-header">
                <h3>All Invoices</h3>
                <button className="btn btn-outline btn-sm">
                  <FaDownload /> Download All
                </button>
              </div>
              <div className="portal-table">
                <table>
                  <thead>
                    <tr>
                      <th>Invoice ID</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>
                          <strong>{invoice.id}</strong>
                        </td>
                        <td>{invoice.date}</td>
                        <td>
                          <strong>{invoice.amount}</strong>
                        </td>
                        <td>
                          <span
                            className={`badge badge-${invoice.status === "paid" ? "green" : invoice.status === "pending" ? "yellow" : "red"}`}
                          >
                            {invoice.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-ghost btn-sm">
                            <FaFileAlt /> View
                          </button>
                          <button className="btn btn-ghost btn-sm">
                            <FaDownload /> Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === "tickets" && (
          <div className="portal-content">
            <div className="portal-card">
              <div className="portal-card-header">
                <h3>Support Tickets</h3>
                <button className="btn btn-primary btn-sm">+ New Ticket</button>
              </div>
              {tickets.map((ticket) => (
                <div key={ticket.id} className="portal-ticket-item">
                  <div>
                    <strong>{ticket.id}</strong>
                    <span>{ticket.subject}</span>
                  </div>
                  <div className="portal-ticket-meta">
                    <span
                      className={`badge badge-${ticket.priority === "high" ? "red" : ticket.priority === "medium" ? "yellow" : "gray"}`}
                    >
                      {ticket.priority}
                    </span>
                    <span className="badge badge-blue">{ticket.status}</span>
                    <span className="portal-ticket-time">{ticket.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="portal-content">
            <div className="portal-card">
              <div className="portal-card-header">
                <h3>Project Documents</h3>
                <button className="btn btn-primary btn-sm">
                  <FaUpload /> Upload
                </button>
              </div>
              <div className="portal-documents-grid">
                {[
                  {
                    name: "Project Proposal.pdf",
                    size: "2.4 MB",
                    date: "2024-10-01",
                  },
                  {
                    name: "Design Mockups.fig",
                    size: "15.2 MB",
                    date: "2024-10-05",
                  },
                  {
                    name: "API Documentation.pdf",
                    size: "1.8 MB",
                    date: "2024-10-08",
                  },
                  { name: "Contract.pdf", size: "890 KB", date: "2024-09-15" },
                ].map((doc, i) => (
                  <div key={i} className="portal-document-item">
                    <span className="portal-document-icon">
                      <FaFileAlt />
                    </span>
                    <div>
                      <strong>{doc.name}</strong>
                      <span>
                        {doc.size} • {doc.date}
                      </span>
                    </div>
                    <button className="btn btn-ghost btn-sm">
                      <FaDownload />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPortal;
