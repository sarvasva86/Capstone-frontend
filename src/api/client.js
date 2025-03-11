import axios from "axios";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Request-ID': uuidv4() // For request tracing
  }
});

// Add request interceptor
axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Add response interceptor
axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login?session_expired=true';
    }
    return Promise.reject(error);
  }
);
