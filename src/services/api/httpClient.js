import axios from 'axios';
import { env } from '../../config/env.js';
import { tokenStorage } from '../storage/tokenStorage.js';

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

httpClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      const refresh = tokenStorage.getRefreshToken();

      if (!refresh) {
        tokenStorage.clear();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${env.apiBaseUrl}${env.endpoints.tokenRefresh}`, {
          refresh
        });

        tokenStorage.saveTokens({ access: response.data.access });
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

        return httpClient(originalRequest);
      } catch (refreshError) {
        tokenStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
