import api from "./axios";

export const authApi = {
  // Login
  login: async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  // Register
  register: async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await api.post(`/auth/reset-password/${token}`, {
      password,
    });
    return response.data;
  },
};
