import axios from 'axios';

const API = axios.create({
  baseURL: 'https://qa-test-9di7.onrender.com',
});

// Add interceptors for tokens if needed
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
