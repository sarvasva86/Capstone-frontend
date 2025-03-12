import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  timeout: 10000,
});

// Add request interceptor
axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers = {
    ...config.headers,
    'Authorization': `Bearer ${token}`,
    'X-Request-ID': uuidv4()
  };
  return config;
});

// Add response interceptor
axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login?session_expired=true';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
