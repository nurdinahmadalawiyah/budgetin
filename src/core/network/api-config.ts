const DEFAULT_TIMEOUT_IN_MS = 15000;

export const apiConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? '',
  timeout: DEFAULT_TIMEOUT_IN_MS,
};

export function assertApiBaseUrl() {
  if (!apiConfig.baseURL) {
    throw new Error('Missing EXPO_PUBLIC_API_URL environment variable');
  }

  return apiConfig.baseURL;
}
