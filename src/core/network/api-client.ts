import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { apiConfig, assertApiBaseUrl } from '@/core/network/api-config';
import { getAuthToken } from '@/core/network/auth-token-provider';

export type ApiErrorPayload = {
  message?: string;
  [key: string]: unknown;
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseURL || undefined,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: apiConfig.timeout,
});

apiClient.interceptors.request.use(async (config) => {
  if (!config.baseURL && !config.url?.startsWith('http')) {
    config.baseURL = assertApiBaseUrl();
  }

  const token = await getAuthToken();

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorPayload>) => {
    return Promise.reject(error);
  }
);

export async function apiRequest<TResponse>(config: AxiosRequestConfig) {
  const response = await apiClient.request<TResponse>(config);
  return response.data;
}

export function isApiError(error: unknown): error is AxiosError<ApiErrorPayload> {
  return axios.isAxiosError(error);
}
