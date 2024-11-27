import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your backend URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // JWT token stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
