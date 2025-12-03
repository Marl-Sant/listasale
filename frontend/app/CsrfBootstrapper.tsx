'use client';

import { useEffect } from 'react';
import { restoreCSRF } from '../store/csrf';

export function CsrfBootstrapper() {
  useEffect(() => {
    restoreCSRF().catch(() => {
    });
  }, []);

  return null;
}
