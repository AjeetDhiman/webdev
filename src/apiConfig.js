const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/wp-json/jwt-auth/v1/token`,
  validate: `${API_BASE_URL}/wp-json/jwt-auth/v1/token/validate`,
};
