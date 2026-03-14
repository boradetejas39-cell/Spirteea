import { API_BASE_URL, API_PREFIX } from './config';

const AUTH_TOKEN_KEY = 'authToken';

const getAuthToken = () => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
};

/** Store token after login. Use sessionStorage for "remember me" false, localStorage for true. */
const setAuthToken = (token, remember = false) => {
  try {
    const storage = remember ? localStorage : sessionStorage;
    const other = remember ? sessionStorage : localStorage;
    other.removeItem(AUTH_TOKEN_KEY);
    if (token) storage.setItem(AUTH_TOKEN_KEY, token);
    else storage.removeItem(AUTH_TOKEN_KEY);
  } catch {}
};

const clearAuthToken = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {}
};

/**
 * Request options for API calls.
 * @param {Object} options
 * @param {string} [options.token] - Override auth token (otherwise read from storage).
 * @param {boolean} [options.credentials] - Send cookies (default true).
 */
function request(path, options = {}) {
  const { method = 'GET', body, token, credentials = true } = options;
  const url = `${API_BASE_URL}${API_PREFIX}${path}`;
  const authToken = token !== undefined ? token : getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const config = {
    method,
    headers,
    credentials: credentials ? 'include' : 'omit',
  };
  if (body != null && method !== 'GET') {
    config.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  return fetch(url, config).then(async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.message || data.error || res.statusText || 'Request failed');
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  });
}

export { getAuthToken, setAuthToken, clearAuthToken, request };
