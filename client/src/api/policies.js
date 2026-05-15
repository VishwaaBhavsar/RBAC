import api from './axios.js';

const unwrap = (response) => response.data?.data;

export const createPolicy = async (payload) => {
  const response = await api.post('/policies', payload);
  return unwrap(response);
};

export const getPolicies = async () => {
  const response = await api.get('/policies');
  return unwrap(response);
};

export const getPendingPolicies = async () => {
  const response = await api.get('/policies/pending');
  return unwrap(response);
};

export const getMyPolicies = async () => {
  const response = await api.get('/policies/mine');
  return unwrap(response);
};

export const updatePolicyStatus = async (id, status) => {
  const response = await api.patch(`/policies/${id}/status`, { status });
  return unwrap(response);
};
