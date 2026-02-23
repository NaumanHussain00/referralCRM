import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on 401 errors
      localStorage.removeItem("token");
      // Redirect to login if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authApi = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  getMe: () => api.get("/auth/me"),
  updateProfile: (data) => api.put("/auth/profile", data),
  changePassword: (data) => api.put("/auth/password", data),
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
  resetPassword: (token, data) =>
    api.post(`/auth/reset-password/${token}`, data),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  resendVerification: () => api.post("/auth/resend-verification"),
};

// Companies API
export const companiesApi = {
  getAll: () => api.get("/companies"),
  getById: (id) => api.get(`/companies/${id}`),
  create: (data) => api.post("/companies", data),
  delete: (id) => api.delete(`/companies/${id}`),
  fetchProfiles: (id) => api.post(`/companies/${id}/fetch-profiles`),
};

// Profiles API
export const profilesApi = {
  getByCompany: (companyId) => api.get(`/profiles/company/${companyId}`),
  getById: (id) => api.get(`/profiles/${id}`),
  updateStatus: (id, status) => api.patch(`/profiles/${id}/status`, { status }),
  updateNotes: (id, notes) => api.patch(`/profiles/${id}/notes`, { notes }),
  delete: (id) => api.delete(`/profiles/${id}`),
};

// Messages API
export const messagesApi = {
  generate: (data) => api.post("/messages/generate", data),
};

// Guest API (no authentication required)
export const guestApi = {
  searchProfiles: (data) => api.post("/guest/search", data),
};

export default api;
