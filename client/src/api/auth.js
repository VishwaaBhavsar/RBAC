import api from './axios.js';

const unwrap = (response) => response.data?.data;

export const registerUser = async (payload) => {
  const response = await api.post('/auth/register', payload);
  return unwrap(response);
};

export const loginUser = async (payload) => {
  const response = await api.post('/auth/login', payload);
  return unwrap(response);
};

export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return unwrap(response);
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return unwrap(response);
};
