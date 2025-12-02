'use client';

import Cookies from 'js-cookie'
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';


export async function csrfFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const opts: RequestInit = {
    method: 'GET',
    headers: {},
    ...options,
  };

  // Default method
  opts.method = (opts.method || 'GET').toUpperCase();

  // Ensure headers object
  const headers = (opts.headers =
    opts.headers instanceof Headers
      ? Object.fromEntries(opts.headers.entries())
      : opts.headers || {});

  // For non-GET, set Content-Type and XSRF-Token
  if (opts.method !== 'GET') {
    if (!('Content-Type' in headers)) {
      (headers as Record<string, string>)['Content-Type'] = 'application/json';
    }

    (headers as Record<string, string>)['XSRF-Token'] =
      Cookies.get('XSRF-TOKEN') || '';
  }

  const res = await fetch(url, { ...opts, headers });

  if (res.status >= 400) throw res;

  return res;
}

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
  return csrfFetch(`${API_BASE}/api/csrf/restore`);
}
