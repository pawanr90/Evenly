import axios from 'axios';
import { Expense, Group, User } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Enable sending cookies
});

// Add request interceptor to include auth token and set content type
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // Set content type to JSON for all requests except login
  if (!config.url?.includes('/auth/login')) {
    config.headers['Content-Type'] = 'application/json';
  } else {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  // Only add token for non-login requests
  if (token && !config.url?.includes('/auth/login')) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log('Request config:', config);
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config
    });

    // If the error is due to an invalid token (401), redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  login: async (email: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      console.log('Login request:', {
        url: `${API_URL}/auth/login`,
        data: formData.toString()
      });
      const response = await api.post('/auth/login', formData.toString());
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  logout: async () => {
    try {
      localStorage.removeItem('token');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
      
      const response = await api.get('/auth/me');
      return !!response.data;
    } catch (error) {
      return false;
    }
  }
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