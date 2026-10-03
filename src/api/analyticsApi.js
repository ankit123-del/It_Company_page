import api from "./axios";

export const analyticsApi = {
  track: async (data) => {
    try {
      const response = await api.post("/visitors/track", data);
      return response.data;
    } catch (error) {
      console.warn("Analytics tracking failed:", error.message);
      return { success: false };
    }
  },

  getAll: async (page = 1, limit = 50) => {
    const { data } = await api.get("/visitors?page=" + page + "&limit=" + limit);
    return data;
  },

  getStats: async () => {
    const { data } = await api.get("/visitors/stats");
    return data;
  },

  clear: async () => {
    const { data } = await api.delete("/visitors");
    return data;
  },
};
