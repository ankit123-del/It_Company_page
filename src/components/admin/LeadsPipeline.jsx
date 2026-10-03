import React, { useState, useMemo, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMoneyBillWave,
  FaCheckCircle,
  FaChartBar,
  FaTrophy,
  FaLightbulb,
  FaBuilding,
} from "react-icons/fa";
import { adminApi } from "../../api/adminApi";

const LeadsPipeline = ({ leads = [] }) => {
  const [localLeads, setLocalLeads] = useState(leads);
  const [draggedLead, setDraggedLead] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setLocalLeads(leads);
  }, [leads]);

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ===== Group leads by stage =====
  const grouped = useMemo(() => {
    const stages = [
      "new",
      "contacted",
      "qualified",
      "proposal",
      "negotiation",
      "won",
    ];
    const groups = {};
    stages.forEach((s) => (groups[s] = []));
    localLeads.forEach((l) => {
      const stage = l.stage || "new";
      if (groups[stage]) groups[stage].push(l);
      else groups.new.push(l);
    });
    return groups;
  }, [localLeads]);

  const stages = [
    { id: "new", label: "New Lead", color: "#3b82f6" },
    { id: "contacted", label: "Contacted", color: "#8b5cf6" },
    { id: "qualified", label: "Qualified", color: "#6366f1" },
    { id: "proposal", label: "Proposal Sent", color: "#f59e0b" },
    { id: "negotiation", label: "Negotiation", color: "#f97316" },
    { id: "won", label: "Won", color: "#10b981" },
  ];

  const handleDragStart = (lead, from) => setDraggedLead({ lead, from });

  const handleDrop = async (to) => {
    if (!draggedLead || draggedLead.from === to) return;
    const { lead, from } = draggedLead;

    // Optimistic
    setLocalLeads((prev) =>
      prev.map((l) => (l._id === lead._id ? { ...l, stage: to } : l)),
    );

    try {
      await adminApi.updateLead(lead._id, { stage: to });
      if (to === "won") {
        showToast(`${lead.name} converted`);
      } else {
        showToast(
          `Lead moved to ${stages.find((s) => s.id === to)?.label}`,
          "info",
        );
      }
    } catch (err) {
      showToast(err.message, "error");
      setLocalLeads(leads);
    }
    setDraggedLead(null);
  };

  const getStageValue = (stage) =>
    grouped[stage].reduce((s, l) => s + (l.value || 0), 0);

  const totalPipeline = Object.keys(grouped)
    .filter((s) => s !== "won")
    .reduce((s, k) => s + getStageValue(k), 0);

  const totalLeads = localLeads.length;
  const wonCount = grouped.won.length;
  const winRate = totalLeads ? Math.round((wonCount / totalLeads) * 100) : 0;

  const formatCurrency = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
    return `₹${(val || 0).toLocaleString("en-IN")}`;
  };

  return (
    <div className="admin-dashboard">
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>
            {toast.type === "success" ? <FaCheckCircle /> : <FaLightbulb />}
          </span>
          {toast.message}
        </div>
      )}

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaPhone />
            </span>
          </div>
          <div className="admin-stat-value">{totalLeads}</div>
          <div className="admin-stat-label">Total Leads</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#f59e0b" }}>
              <FaMoneyBillWave />
            </span>
          </div>
          <div className="admin-stat-value">
            {formatCurrency(totalPipeline)}
          </div>
          <div className="admin-stat-label">Pipeline Value</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#10b981" }}>
              <FaTrophy />
            </span>
          </div>
          <div className="admin-stat-value">{wonCount}</div>
          <div className="admin-stat-label">Won Deals</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#8b5cf6" }}>
              <FaChartBar />
            </span>
          </div>
          <div className="admin-stat-value">{winRate}%</div>
          <div className="admin-stat-label">Win Rate</div>
        </div>
      </div>

      {/* Pipeline */}
      <div className="crm-pipeline">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="crm-pipeline-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(stage.id)}
          >
            <div
              className="crm-pipeline-header"
              style={{ borderTopColor: stage.color }}
            >
              <h4>{stage.label}</h4>
              <span className="crm-pipeline-count">
                {grouped[stage.id].length} leads
              </span>
              <span className="crm-pipeline-value">
                {formatCurrency(getStageValue(stage.id))}
              </span>
            </div>
            <div className="crm-leads-list">
              {grouped[stage.id].map((lead) => (
                <div
                  key={lead._id}
                  className="crm-lead-card"
                  draggable
                  onDragStart={() => handleDragStart(lead, stage.id)}
                >
                  <div className="crm-lead-header">
                    <strong>{lead.name}</strong>
                    <span className="crm-lead-value">
                      {formatCurrency(lead.value)}
                    </span>
                  </div>
                  <p className="crm-lead-company">
                    <FaBuilding
                      style={{ marginRight: "0.35rem", fontSize: "0.75rem" }}
                    />
                    {lead.company || "—"}
                  </p>
                  <div className="crm-lead-meta">
                    <span>
                      <FaEnvelope />
                      {(lead.email || "").split("@")[0] || "—"}
                    </span>
                    <span>
                      <FaPhone />
                      {(lead.phone || "").slice(-4).padStart(10, "•") || "—"}
                    </span>
                  </div>
                  {lead.source && (
                    <span className="crm-lead-source">{lead.source}</span>
                  )}
                </div>
              ))}
              {grouped[stage.id].length === 0 && (
                <div className="kanban-empty">Drop leads here</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsPipeline;
