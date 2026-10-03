import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";

const Invoices = () => {
  const [filter, setFilter] = useState("all");

  const invoices = [
    {
      id: "INV-2024-001",
      client: "TechCorp",
      amount: 250000,
      tax: 45000,
      total: 295000,
      date: "2024-10-01",
      due: "2024-10-15",
      status: "paid",
      method: "Bank Transfer",
    },
    {
      id: "INV-2024-002",
      client: "MediCare Plus",
      amount: 180000,
      tax: 32400,
      total: 212400,
      date: "2024-10-15",
      due: "2024-10-30",
      status: "pending",
      method: "UPI",
    },
    {
      id: "INV-2024-003",
      client: "PayTech",
      amount: 320000,
      tax: 57600,
      total: 377600,
      date: "2024-09-20",
      due: "2024-10-05",
      status: "overdue",
      method: "Credit Card",
    },
    {
      id: "INV-2024-004",
      client: "EduLearn",
      amount: 150000,
      tax: 27000,
      total: 177000,
      date: "2024-10-08",
      due: "2024-10-22",
      status: "paid",
      method: "Bank Transfer",
    },
  ];

  const filtered =
    filter === "all" ? invoices : invoices.filter((i) => i.status === filter);

  const stats = {
    total: invoices.reduce((sum, i) => sum + i.total, 0),
    paid: invoices
      .filter((i) => i.status === "paid")
      .reduce((sum, i) => sum + i.total, 0),
    pending: invoices
      .filter((i) => i.status === "pending")
      .reduce((sum, i) => sum + i.total, 0),
    overdue: invoices
      .filter((i) => i.status === "overdue")
      .reduce((sum, i) => sum + i.total, 0),
  };

  const formatCurrency = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className="invoices-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Invoices" }]} />
          <h1 className="page-title">Invoices & Payments</h1>
          <p className="page-subtitle">Manage your billing and payments</p>
        </div>
      </div>

      <div className="container">
        {/* Stats */}
        <div className="invoice-stats">
          <div className="invoice-stat-card">
            <span className="invoice-stat-label">Total</span>
            <span className="invoice-stat-value">
              {formatCurrency(stats.total)}
            </span>
          </div>
          <div className="invoice-stat-card success">
            <span className="invoice-stat-label">Paid</span>
            <span className="invoice-stat-value">
              {formatCurrency(stats.paid)}
            </span>
          </div>
          <div className="invoice-stat-card warning">
            <span className="invoice-stat-label">Pending</span>
            <span className="invoice-stat-value">
              {formatCurrency(stats.pending)}
            </span>
          </div>
          <div className="invoice-stat-card danger">
            <span className="invoice-stat-label">Overdue</span>
            <span className="invoice-stat-value">
              {formatCurrency(stats.overdue)}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="portfolio-filters">
          {["all", "paid", "pending", "overdue"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Invoice Table */}
        <div className="invoice-table-wrapper">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Tax</th>
                <th>Total</th>
                <th>Due Date</th>
                <th>Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <strong>{invoice.id}</strong>
                  </td>
                  <td>{invoice.client}</td>
                  <td>{formatCurrency(invoice.amount)}</td>
                  <td>{formatCurrency(invoice.tax)}</td>
                  <td>
                    <strong>{formatCurrency(invoice.total)}</strong>
                  </td>
                  <td>{invoice.due}</td>
                  <td>{invoice.method}</td>
                  <td>
                    <span
                      className={`badge badge-${
                        invoice.status === "paid"
                          ? "green"
                          : invoice.status === "pending"
                            ? "yellow"
                            : "red"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <div className="invoice-actions">
                      <button className="icon-btn-sm" title="View">
                        👁️
                      </button>
                      <button className="icon-btn-sm" title="Download">
                        ⬇️
                      </button>
                      {invoice.status !== "paid" && (
                        <button className="icon-btn-sm" title="Pay Now">
                          💳
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
