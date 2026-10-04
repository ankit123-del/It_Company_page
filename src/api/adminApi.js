// ============================================================
// ADMIN API — uses the admin-gate token from sessionStorage
// ============================================================
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ADMIN_TOKEN_KEY = "admin_gate_token";

const getToken = () => {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY) || "";
  } catch {
    return "";
  }
};

const request = async (path, options = {}) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }
  return data;
};

export const adminApi = {
  // ===== Users =====
  getUsers: () => request("/users"),
  getUser: (id) => request(`/users/${id}`),
  updateUser: (id, body) =>
    request(`/users/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteUser: (id) => request(`/users/${id}`, { method: "DELETE" }),
  getUserStats: () => request("/users/stats/overview"),

  // ===== Projects =====
  getProjects: () => request("/projects"),
  getProject: (id) => request(`/projects/${id}`),
  createProject: (body) =>
    request("/projects", { method: "POST", body: JSON.stringify(body) }),
  updateProject: (id, body) =>
    request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: "DELETE" }),

  // ===== Invoices =====
  getInvoices: () => request("/invoices"),
  getInvoice: (id) => request(`/invoices/${id}`),
  createInvoice: (body) =>
    request("/invoices", { method: "POST", body: JSON.stringify(body) }),
  updateInvoice: (id, body) =>
    request(`/invoices/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteInvoice: (id) => request(`/invoices/${id}`, { method: "DELETE" }),
  getInvoiceStats: () => request("/invoices/stats/overview"),

  // ===== Tickets =====
  getTickets: () => request("/tickets"),
  getTicket: (id) => request(`/tickets/${id}`),
  createTicket: (body) =>
    request("/tickets", { method: "POST", body: JSON.stringify(body) }),
  updateTicket: (id, body) =>
    request(`/tickets/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteTicket: (id) => request(`/tickets/${id}`, { method: "DELETE" }),
  addTicketMessage: (id, body) =>
    request(`/tickets/${id}/messages`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // ===== Leads =====
  getLeads: () => request("/leads"),
  getLead: (id) => request(`/leads/${id}`),
  createLead: (body) =>
    request("/leads", { method: "POST", body: JSON.stringify(body) }),
  updateLead: (id, body) =>
    request(`/leads/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteLead: (id) => request(`/leads/${id}`, { method: "DELETE" }),
  addLeadNote: (id, body) =>
    request(`/leads/${id}/notes`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // ===== Visitors =====
  getVisitors: (page = 1, limit = 100) =>
    request(`/visitors?page=${page}&limit=${limit}`),
  getVisitorStats: () => request("/visitors/stats"),
  clearVisitors: () => request("/visitors", { method: "DELETE" }),

  // ===== Blog =====
  getBlogPosts: () => request("/blog/admin/all"),
  getBlogPost: (id) => request(`/blog/${id}`),
  createBlogPost: (body) =>
    request("/blog", { method: "POST", body: JSON.stringify(body) }),
  updateBlogPost: (id, body) =>
    request(`/blog/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteBlogPost: (id) => request(`/blog/${id}`, { method: "DELETE" }),
  getPublicPosts: () => request("/blog"),
};

export default adminApi;
