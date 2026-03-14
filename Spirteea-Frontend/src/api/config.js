/**
 * API configuration - matches config (backend) base URL.
 * Set VITE_API_URL in .env (e.g. http://localhost:5000) or it defaults for local dev.
 */
export const API_BASE_URL =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
    : 'http://localhost:5000';

export const API_PREFIX = '/api';
