import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

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

export default api;
