import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds timeout for email generation
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
    console.error('API Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export const emailApi = {
  // Generate cold email from job URL
  generateEmail: async (jobUrl) => {
    const response = await api.post('/email/generate', { jobUrl });
    return response;
  },

  // Get email service status
  getStatus: async () => {
    const response = await api.get('/email/status');
    return response;
  },
};

export const portfolioApi = {
  // Get all portfolio data
  getPortfolio: async () => {
    const response = await api.get('/portfolio');
    return response;
  },

  // Get relevant links for skills
  getRelevantLinks: async (skills) => {
    const skillsString = Array.isArray(skills) ? skills.join(',') : skills;
    const response = await api.get(`/portfolio/skills/${encodeURIComponent(skillsString)}`);
    return response;
  },
};

export const healthApi = {
  // Basic health check
  getHealth: async () => {
    const response = await api.get('/health');
    return response;
  },

  // Detailed health check
  getDetailedHealth: async () => {
    const response = await api.get('/health/detailed');
    return response;
  },
};

export default api;
