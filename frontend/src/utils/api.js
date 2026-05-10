const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  async post(endpoint, data) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Request failed');
    return json;
  },

  async get(endpoint) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Request failed');
    return json;
  },

  async putFormData(endpoint, formData) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Request failed');
    return json;
  },

  async postFormData(endpoint, formData) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Request failed');
    return json;
  },

  async put(endpoint, data = {}) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Request failed');
    return json;
  },

  async delete(endpoint) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Request failed');
    return json;
  },
};
