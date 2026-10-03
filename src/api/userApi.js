import api from "./axios";

export const userApi = {
  // Get all users (admin only)
  getUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (id, data) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Update profile
  updateProfile: async (data) => {
    const response = await api.put("/users/profile", data);
    return response.data;
  },

  // Change password
  changePassword: async (data) => {
    const response = await api.put("/users/change-password", data);
    return response.data;
  },
};
