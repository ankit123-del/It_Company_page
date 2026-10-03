import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const CRM = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      company: "TechCorp",
      email: "rajesh@techcorp.com",
      phone: "+91 9876543210",
      stage: "new",
      value: 850000,
      source: "Website",
      created: "2024-10-16",
    },
    {
      id: 2,
      name: "Priya Sharma",
      company: "StartupHub",
      email: "priya@startuphub.io",
      phone: "+91 9876543211",
      stage: "contacted",
      value: 1200000,
      source: "Referral",
      created: "2024-10-15",
    },
    {
      id: 3,
      name: "Amit Patel",
      company: "CloudNine",
      email: "amit@cloudnine.com",
      phone: "+91 9876543212",
      stage: "qualified",
      value: 2500000,
      source: "LinkedIn",
      created: "2024-10-14",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      company: "DataFlow",
      email: "sneha@dataflow.in",
      phone: "+91 9876543213",
      stage: "proposal",
      value: 1800000,
      source: "Cold Call",
      created: "2024-10-13",
    },
    {
      id: 5,
      name: "Vikram Singh",
      company: "FinTech Pro",
      email: "vikram@fintech.com",
      phone: "+91 9876543214",
      stage: "negotiation",
      value: 3200000,
      source: "Event",
      created: "2024-10-12",
    },
    {
      id: 6,
      name: "Anita Desai",
      company: "HealthTech",
      email: "anita@healthtech.in",
      phone: "+91 9876543215",
      stage: "won",
      value: 1500000,
      source: "Website",
      created: "2024-10-10",
    },
  ]);

  const stages = [
    { id: "new", label: "New Leads", color: "var(--info)" },
    { id: "contacted", label: "Contacted", color: "var(--primary)" },
    { id: "qualified", label: "Qualified", color: "var(--purple)" },
    { id: "proposal", label: "Proposal Sent", color: "var(--warning)" },
    {
      id: "negotiation",
      label: "Negotiation",
      color: "var(--orange, #f97316)",
    },
    { id: "won", label: "Won", color: "var(--success)" },
  ];

  const formatCurrency = (val) => `₹${(val / 100000).toFixed(1)}L`;

  const getTotalValue = (stage) => {
    return leads
      .filter((l) => l.stage === stage)
      .reduce((sum, l) => sum + l.value, 0);
  };

  const totalPipeline = leads
    .filter((l) => l.stage !== "won")
    .reduce((sum, l) => sum + l.value, 0);

  const winRate = Math.round(
    (leads.filter((l) => l.stage === "won").length / leads.length) * 100,
  );

  return (
    <div className="crm-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "CRM – Leads" }]} />
          <h1 className="page-title">Lead Management</h1>
          <p className="page-subtitle">Track and convert your sales pipeline</p>
        </div>
      </div>

      <div className="container">
        {/* CRM Stats */}
        <div className="crm-stats">
          <div className="crm-stat-card">
            <span className="crm-stat-label">Total Leads</span>
            <span className="crm-stat-value">{leads.length}</span>
          </div>
          <div className="crm-stat-card">
            <span className="crm-stat-label">Pipeline Value</span>
            <span className="crm-stat-value">
              {formatCurrency(totalPipeline)}
            </span>
          </div>
          <div className="crm-stat-card success">
            <span className="crm-stat-label">Win Rate</span>
            <span className="crm-stat-value">{winRate}%</span>
          </div>
          <div className="crm-stat-card warning">
            <span className="crm-stat-label">Avg Deal Size</span>
            <span className="crm-stat-value">
              {formatCurrency(
                leads.reduce((s, l) => s + l.value, 0) / leads.length,
              )}
            </span>
          </div>
        </div>

        {/* Pipeline */}
        <div className="crm-pipeline">
          {stages.map((stage) => (
            <div key={stage.id} className="crm-pipeline-column">
              <div
                className="crm-pipeline-header"
                style={{ borderTopColor: stage.color }}
              >
                <h4>{stage.label}</h4>
                <span className="crm-pipeline-count">
                  {leads.filter((l) => l.stage === stage.id).length}
                </span>
                <span className="crm-pipeline-value">
                  {formatCurrency(getTotalValue(stage.id))}
                </span>
              </div>
              <div className="crm-leads-list">
                {leads
                  .filter((l) => l.stage === stage.id)
                  .map((lead) => (
                    <div key={lead.id} className="crm-lead-card">
                      <div className="crm-lead-header">
                        <strong>{lead.name}</strong>
                        <span className="crm-lead-value">
                          {formatCurrency(lead.value)}
                        </span>
                      </div>
                      <p className="crm-lead-company">{lead.company}</p>
                      <div className="crm-lead-meta">
                        <span>
                          <FaEnvelope /> {lead.email.split("@")[0]}
                        </span>
                        <span>
                          <FaPhone /> {lead.phone.slice(-4).padStart(10, "•")}
                        </span>
                      </div>
                      <div className="crm-lead-source">{lead.source}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CRM;
