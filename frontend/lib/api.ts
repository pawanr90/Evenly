import axios from 'axios';
import { Expense, Group, User } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to include auth token and set content type
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Set content type to JSON for all requests except login
  if (!config.url?.includes('/auth/login')) {
    config.headers['Content-Type'] = 'application/json';
  } else {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  return config;
});

// Auth endpoints
export const auth = {
  login: async (email: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    const response = await api.post('/auth/login', formData.toString());
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
};

// Group endpoints
export const groups = {
  getAll: async () => {
    const response = await api.get('/groups');
    return response.data;
  },
  create: async (group: Partial<Group>) => {
    const response = await api.post('/groups', group);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/groups/${id}`);
    return response.data;
  },
};

// Expense endpoints
export const expenses = {
  getAll: async () => {
    const response = await api.get('/expenses');
    return response.data;
  },
  create: async (expense: Partial<Expense>) => {
    const response = await api.post('/expenses', expense);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },
};

// User endpoints
export const users = {
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  updateProfile: async (user: Partial<User>) => {
    const response = await api.put('/users/me', user);
    return response.data;
  },
};

export default api; 