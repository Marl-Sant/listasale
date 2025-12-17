'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { csrfFetch } from '@/store/csrf';

type ZipSuggestion = {
  kind: 'zip';
  zip: string;
  city: string;
  state: string;
  country: string;
  lat?: number | null;
  lng?: number | null;
  cityId?: number | null;
};

type CitySuggestion = {
  kind: 'city';
  city: string;
  state: string;
  country: string;
  lat?: number | null;
  lng?: number | null;
  cityId?: number | null;
};

type Suggestion = ZipSuggestion | CitySuggestion;

type ApiResponse = {
  source?: string;
  results: Suggestion[];
};

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);

  return debounced;
}

export default function LocationAutocompleteTester() {
  const LIMIT = 10;

  const [type, setType] = useState<'zip' | 'city'>('zip');
  const [stateCode, setStateCode] = useState('FL');

  const [q, setQ] = useState('');
  const debouncedQ = useDebouncedValue(q, 250);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [source, setSource] = useState<string | undefined>(undefined);
  const [results, setResults] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState<Suggestion | null>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const minLen = useMemo(() => (type === 'zip' ? 3 : 2), [type]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // Fetch suggestions
  useEffect(() => {
    setError(null);
    setSelected(null);

    const query = debouncedQ.trim();
    if (!open || !query || query.length < minLen) {
      setResults([]);
      setSource(undefined);
      return;
    }

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.set('q', query);
        params.set('type', type);
        params.set('limit', String(LIMIT));
        if (type === 'city' && stateCode.trim()) {
          params.set('state', stateCode.trim().toUpperCase());
        }

        const res = await csrfFetch(`/api/locations/autocomplete?${params.toString()}`);
        const data = (await res.json()) as ApiResponse;

        setSource(data.source);
        setResults(Array.isArray(data.results) ? data.results : []);
      } catch (e: any) {
        setResults([]);
        setSource(undefined);

        try {
          const body = await e.json?.();
          setError(body?.error || body?.message || 'Autocomplete request failed');
        } catch {
          setError('Autocomplete request failed');
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [debouncedQ, open, type, stateCode, minLen]);

  const onPick = (s: Suggestion) => {
    setSelected(s);
    if (s.kind === 'zip') setQ(s.zip);
    if (s.kind === 'city') setQ(`${s.city}, ${s.state}`);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="w-full">
      {/* Compact control row */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Mode toggle */}
          <div className="inline-flex rounded-xl border border-slate-200 bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => {
                setType('zip');
                setQ('');
                setOpen(false);
              }}
              className={`px-3 py-2 text-xs sm:text-sm ${
                type === 'zip'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              ZIP
            </button>
            <button
              type="button"
              onClick={() => {
                setType('city');
                setQ('');
                setOpen(false);
              }}
              className={`px-3 py-2 text-xs sm:text-sm ${
                type === 'city'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              City
            </button>
          </div>

          {/* State (only for city) */}
          <input
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value.toUpperCase())}
            disabled={type !== 'city'}
            maxLength={2}
            placeholder="FL"
            className="w-16 rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm disabled:bg-slate-100"
            aria-label="State"
          />
        </div>

        {/* Input + dropdown */}
        <div className="relative">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={type === 'zip' ? 'Type ZIP (e.g. 331)' : 'Type city (e.g. Mia)'}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
          />

          {/* Right-side status */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
            {loading ? 'Loading…' : source ? source : ''}
          </div>

          {/* Dropdown */}
          {open && q.trim().length >= minLen && (
            <div className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
              {error ? (
                <div className="px-4 py-3 text-sm text-red-600">{error}</div>
              ) : loading ? (
                <div className="px-4 py-3 text-sm text-slate-600">Searching…</div>
              ) : results.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-600">No matches</div>
              ) : (
                <ul className="max-h-64 overflow-auto divide-y divide-slate-100">
                  {results.map((r, idx) => (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={() => onPick(r)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-medium text-slate-900">
                              {r.kind === 'zip'
                                ? `${r.zip} — ${r.city}, ${r.state}`
                                : `${r.city}, ${r.state}`}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              {r.kind === 'zip'
                                ? `cityId: ${r.cityId ?? '—'} • lat/lng: ${fmtLatLng(r.lat, r.lng)}`
                                : `cityId: ${r.cityId ?? '—'} • lat/lng: ${fmtLatLng(r.lat, r.lng)}`}
                            </div>
                          </div>

                          <span className="shrink-0 text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                            {r.kind}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Optional mini footer */}
              <div className="px-4 py-2 text-[11px] text-slate-500 bg-slate-50 border-t border-slate-100">
                Limit: {LIMIT} • min chars: {minLen}
              </div>
            </div>
          )}
        </div>

        {/* Selected preview (small + optional) */}
        {selected ? (
          <details className="text-xs text-slate-600">
            <summary className="cursor-pointer select-none">
              Selected value (debug)
            </summary>
            <pre className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-100 overflow-auto">
{JSON.stringify(selected, null, 2)}
            </pre>
          </details>
        ) : null}
      </div>
    </div>
  );
}

function fmtLatLng(lat?: number | null, lng?: number | null) {
  if (lat == null || lng == null) return '—';
  return `${Number(lat).toFixed(5)}, ${Number(lng).toFixed(5)}`;
}
