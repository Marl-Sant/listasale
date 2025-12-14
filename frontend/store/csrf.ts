'use client';

import Cookies from 'js-cookie';

export async function csrfFetch(
  path: string,
  options: RequestInit = {}
) {
  
  const url = path;

  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    (options.headers as Record<string, string>)['Content-Type'] =
      (options.headers as Record<string, string>)['Content-Type'] ||
      'application/json';
    (options.headers as Record<string, string>)['XSRF-Token'] =
      Cookies.get('XSRF-TOKEN') ?? '';
  }

  const res = await fetch(url, {
    ...options,
    credentials: 'include', // keep this
  });

  if (res.status >= 400) throw res;
  return res;
}

export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore');
}
