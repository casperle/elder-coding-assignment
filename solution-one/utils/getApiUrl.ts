export const getApiUrl = (): string => {
  const API_URL = process.env.API_URL || 'http://localhost:3000';

  return API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
};
