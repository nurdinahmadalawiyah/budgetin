type AuthTokenProvider = () => Promise<string | null> | string | null;

let authTokenProvider: AuthTokenProvider | null = null;

export function setAuthTokenProvider(provider: AuthTokenProvider) {
  authTokenProvider = provider;
}

export async function getAuthToken() {
  if (!authTokenProvider) {
    return null;
  }

  return authTokenProvider();
}

export function clearAuthTokenProvider() {
  authTokenProvider = null;
}
