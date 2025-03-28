// api/axiosInstance.js (o .ts si estás usando TypeScript)
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // o tu baseURL si es externa
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // ← nombre correcto
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
