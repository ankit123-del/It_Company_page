import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaUser,
  FaCalendarAlt,
  FaUmbrellaBeach,
  FaMoneyBillWave,
  FaFileAlt,
  FaUserCircle,
  FaDownload,
  FaUpload,
} from "react-icons/fa";

const EmployeePortal = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const employee = {
    name: "John Smith",
    role: "Senior Developer",
    department: "Engineering",
    empId: "EMP-001",
    email: "john@smlagtech.com",
    joinDate: "2020-03-15",
    manager: "Sarah Johnson",
    location: "Mumbai, India",
  };

  const leaves = {
    casual: { used: 3, total: 12 },
    sick: { used: 1, total: 8 },
    earned: { used: 2, total: 15 },
  };

  const payslips = [
    {
      month: "October 2024",
      amount: 95000,
      status: "paid",
      date: "2024-10-01",
    },
    {
      month: "September 2024",
      amount: 95000,
      status: "paid",
      date: "2024-09-01",
    },
    { month: "August 2024", amount: 92000, status: "paid", date: "2024-08-01" },
  ];

  const attendance = {
    present: 22,
    absent: 1,
    halfDay: 0,
    leaves: 2,
    workFromHome: 5,
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "attendance", label: "Attendance", icon: <FaCalendarAlt /> },
    { id: "leaves", label: "Leaves", icon: <FaUmbrellaBeach /> },
    { id: "payslips", label: "Payslips", icon: <FaMoneyBillWave /> },
    { id: "documents", label: "Documents", icon: <FaFileAlt /> },
  ];

  return (
    <div className="employee-portal-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Employee Portal" }]} />
          <h1 className="page-title">Welcome, {employee.name}!</h1>
          <p className="page-subtitle">Your employee dashboard</p>
        </div>
      </div>

      <div className="container">
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

        {activeTab === "profile" && (
          <div className="employee-profile">
            <div className="employee-profile-card">
              <div className="employee-avatar-large">
                <FaUserCircle />
              </div>
              <h2>{employee.name}</h2>
              <p className="employee-role">{employee.role}</p>
              <p className="employee-dept">{employee.department}</p>
            </div>
            <div className="employee-details-card">
              <h3>Employee Details</h3>
              <div className="employee-detail-row">
                <span>Employee ID</span>
                <strong>{employee.empId}</strong>
              </div>
              <div className="employee-detail-row">
                <span>Email</span>
                <strong>{employee.email}</strong>
              </div>
              <div className="employee-detail-row">
                <span>Join Date</span>
                <strong>{employee.joinDate}</strong>
              </div>
              <div className="employee-detail-row">
                <span>Manager</span>
                <strong>{employee.manager}</strong>
              </div>
              <div className="employee-detail-row">
                <span>Location</span>
                <strong>{employee.location}</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="employee-attendance">
            <div className="attendance-stats">
              <div className="attendance-stat">
                <span className="attendance-stat-value">
                  {attendance.present}
                </span>
                <span className="attendance-stat-label">Present</span>
              </div>
              <div className="attendance-stat">
                <span className="attendance-stat-value">
                  {attendance.absent}
                </span>
                <span className="attendance-stat-label">Absent</span>
              </div>
              <div className="attendance-stat">
                <span className="attendance-stat-value">
                  {attendance.workFromHome}
                </span>
                <span className="attendance-stat-label">WFH</span>
              </div>
              <div className="attendance-stat">
                <span className="attendance-stat-value">
                  {attendance.leaves}
                </span>
                <span className="attendance-stat-label">Leaves</span>
              </div>
            </div>

            <div className="attendance-chart">
              <h3>This Month</h3>
              <div className="attendance-calendar">
                {Array.from({ length: 30 }, (_, i) => {
                  const day = i + 1;
                  const isWeekend = [6, 7, 13, 14, 20, 21, 27, 28].includes(
                    day,
                  );
                  const isLeave = [10, 25].includes(day);
                  const isAbsent = day === 17;
                  return (
                    <div
                      key={day}
                      className={`attendance-day ${isWeekend ? "weekend" : isLeave ? "leave" : isAbsent ? "absent" : "present"}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "leaves" && (
          <div className="employee-leaves">
            <div className="leaves-header">
              <h3>Leave Balance</h3>
              <button className="btn btn-primary">+ Apply for Leave</button>
            </div>
            <div className="leaves-grid">
              {Object.entries(leaves).map(([type, data]) => (
                <div key={type} className="leave-card">
                  <h4>{type.charAt(0).toUpperCase() + type.slice(1)} Leave</h4>
                  <div className="leave-progress">
                    <div className="leave-progress-bar">
                      <div
                        className="leave-progress-fill"
                        style={{ width: `${(data.used / data.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="leave-info">
                    <span>
                      <strong>{data.used}</strong> used
                    </span>
                    <span>
                      <strong>{data.total - data.used}</strong> available
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "payslips" && (
          <div className="employee-payslips">
            <div className="admin-card">
              <div className="admin-card-header">
                <h3>Payslips</h3>
                <button className="btn btn-outline btn-sm">
                  <FaDownload /> Download All
                </button>
              </div>
              {payslips.map((slip, i) => (
                <div key={i} className="payslip-item">
                  <span className="payslip-icon">
                    <FaFileAlt />
                  </span>
                  <div className="payslip-info">
                    <strong>{slip.month}</strong>
                    <span>Generated: {slip.date}</span>
                  </div>
                  <span className="payslip-amount">
                    ₹{slip.amount.toLocaleString("en-IN")}
                  </span>
                  <span className="badge badge-green">{slip.status}</span>
                  <button className="btn btn-ghost btn-sm">
                    <FaDownload /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="employee-documents">
            <div className="admin-card">
              <div className="admin-card-header">
                <h3>My Documents</h3>
                <button className="btn btn-primary btn-sm">
                  <FaUpload /> Upload
                </button>
              </div>
              <div className="portal-documents-grid">
                {[
                  { name: "Offer Letter.pdf", size: "450 KB" },
                  { name: "ID Proof.pdf", size: "1.2 MB" },
                  { name: "PAN Card.pdf", size: "890 KB" },
                  { name: "Resume.pdf", size: "320 KB" },
                ].map((doc, i) => (
                  <div key={i} className="portal-document-item">
                    <span className="portal-document-icon">
                      <FaFileAlt />
                    </span>
                    <div>
                      <strong>{doc.name}</strong>
                      <span>{doc.size}</span>
                    </div>
                    <button className="icon-btn-sm">
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

export default EmployeePortal;
