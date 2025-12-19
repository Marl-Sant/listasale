// frontend/components/ItemListingsCrudTester/ItemListingsCrudTester.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

import {
  fetchItemListings,
  createItemListing,
  updateItemListing,
  deleteItemListing,
  addItemListingImages,
  selectItemListings
} from '@/store/itemListings';

export default function ItemListingsCrudTester() {
  const dispatch = useDispatch<any>();
  const rows = useSelector((state:RootState) => selectItemListings(state));
  const loading = useSelector((s: RootState) => (s as any).itemListings.loading);
  const error = useSelector((s: RootState) => (s as any).itemListings.error);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selected = useMemo(() => rows.find((r: any) => r.id === selectedId) || null, [rows, selectedId]);

  const [form, setForm] = useState({
    title: '',
    description: '',
    priceCents: '1000',
    currency: 'USD',
    condition: 'used_good',
    city: '',
    state: '',
    zipCode: '',
    status: 'active'
  });

  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    dispatch(fetchItemListings({ limit: 10 })).catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    if (!selected) return;
    setForm({
      title: selected.title || '',
      description: selected.description || '',
      priceCents: String(selected.priceCents ?? 1000),
      currency: selected.currency || 'USD',
      condition: selected.condition || 'used_good',
      city: selected.city || '',
      state: selected.state || '',
      zipCode: selected.zipCode || '',
      status: selected.status || 'active'
    });
  }, [selected]);

  const onChange = (k: string) => (e: any) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const refresh = async () => {
    await dispatch(fetchItemListings({ limit: 10 }));
  };

  const onCreate = async () => {
    const created = await dispatch(
      createItemListing({
        title: form.title,
        description: form.description,
        priceCents: Number(form.priceCents || 0),
        currency: form.currency || 'USD',
        condition: form.condition || null,
        city: form.city || null,
        state: form.state || null,
        zipCode: form.zipCode || null,
        status: form.status
      })
    );
    setSelectedId(created.id);
    await refresh();
  };

  const onUpdate = async () => {
    if (!selectedId) return;
    await dispatch(
      updateItemListing(selectedId, {
        title: form.title,
        description: form.description,
        priceCents: Number(form.priceCents || 0),
        currency: form.currency || 'USD',
        condition: form.condition || null,
        city: form.city || null,
        state: form.state || null,
        zipCode: form.zipCode || null,
        status: form.status
      })
    );
    await refresh();
  };

  const onDelete = async () => {
    if (!selectedId) return;
    await dispatch(deleteItemListing(selectedId));
    setSelectedId(null);
    setForm({
      title: '',
      description: '',
      priceCents: '1000',
      currency: 'USD',
      condition: 'used_good',
      city: '',
      state: '',
      zipCode: '',
      status: 'active'
    });
    await refresh();
  };

  const onAddImage = async () => {
    if (!selectedId || !imgUrl.trim()) return;
    await dispatch(addItemListingImages(selectedId, [{ imageUrl: imgUrl.trim() }]));
    setImgUrl('');
    await refresh();
  };

  return (
    <div className="w-100 border rounded-3 p-3 bg-white">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
        <h2 className="h5 m-0 text-slate-800">ItemListings CRUD Tester</h2>
        <button className="btn btn-outline-secondary btn-sm" onClick={refresh} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      {error ? <div className="alert alert-danger py-2 mb-3">{error}</div> : null}

      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <label className="form-label text-sm text-slate-600 mb-1">Select (latest 10)</label>
          <select
            className="form-select"
            value={selectedId ?? ''}
            onChange={(e) => setSelectedId(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">—</option>
            {rows.map((r: any) => (
              <option key={r.id} value={r.id}>
                #{r.id} — {r.title} (${(r.priceCents ?? 0) / 100})
              </option>
            ))}
          </select>

          <div className="mt-3">
            <div className="text-xs text-slate-500 mb-2">Images</div>
            <ul className="list-group">
              {(selected?.images || []).slice(0, 5).map((img: any) => (
                <li key={img.id} className="list-group-item d-flex justify-content-between">
                  <span className="text-truncate" style={{ maxWidth: 260 }}>
                    {img.imageUrl}
                  </span>
                  <span className="badge text-bg-light">#{img.id}</span>
                </li>
              ))}
              {!selected?.images?.length ? <li className="list-group-item text-muted">None</li> : null}
            </ul>

            <div className="input-group mt-2">
              <input
                className="form-control"
                placeholder="https://image-url"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
              <button className="btn btn-outline-primary" onClick={onAddImage} disabled={!selectedId}>
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="d-flex flex-column gap-2">
            <input className="form-control" placeholder="Title" value={form.title} onChange={onChange('title')} />
            <textarea
              className="form-control"
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={onChange('description')}
            />

            <div className="d-flex gap-2">
              <input
                className="form-control"
                placeholder="Price cents"
                value={form.priceCents}
                onChange={onChange('priceCents')}
              />
              <input className="form-control" placeholder="Currency" value={form.currency} onChange={onChange('currency')} />
            </div>

            <div className="d-flex gap-2">
              <input className="form-control" placeholder="Condition" value={form.condition} onChange={onChange('condition')} />
              <select className="form-select" value={form.status} onChange={onChange('status')}>
                <option value="active">active</option>
                <option value="sold">sold</option>
                <option value="expired">expired</option>
                <option value="deleted">deleted</option>
              </select>
            </div>

            <div className="d-flex gap-2">
              <input className="form-control" placeholder="City" value={form.city} onChange={onChange('city')} />
              <input className="form-control" placeholder="State" value={form.state} onChange={onChange('state')} />
              <input className="form-control" placeholder="Zip" value={form.zipCode} onChange={onChange('zipCode')} />
            </div>

            <div className="d-flex flex-wrap gap-2 mt-1">
              <button className="btn btn-primary" onClick={onCreate} disabled={loading || !form.title.trim()}>
                Create
              </button>
              <button className="btn btn-outline-primary" onClick={onUpdate} disabled={loading || !selectedId}>
                Update
              </button>
              <button className="btn btn-outline-danger" onClick={onDelete} disabled={loading || !selectedId}>
                Delete
              </button>
            </div>

            <div className="mt-2 p-2 rounded bg-slate-50 border text-xs text-slate-600">
              <div className="fw-semibold mb-1">Selected JSON (preview)</div>
              <pre className="m-0 text-wrap">{selected ? JSON.stringify(selected, null, 2) : 'null'}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
