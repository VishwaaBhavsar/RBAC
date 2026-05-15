import axios from 'axios';

const api = axios.create({
  // Keep the default aligned with the backend default in this repo (.env sets PORT=3000).
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Retry once after the backend rotates cookies through the refresh token flow.
    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !originalRequest?.url?.includes('/auth/login') &&
      !originalRequest?.url?.includes('/auth/register') &&
      !originalRequest?.url?.includes('/auth/refresh-token')
    ) {
      originalRequest._retry = true;
      await api.post('/auth/refresh-token');
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const getApiErrorMessage = (error, fallback = 'Something went wrong') => {
  return error.response?.data?.message || error.message || fallback;
};

export default api;
