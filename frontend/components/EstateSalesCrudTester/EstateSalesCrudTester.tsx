// frontend/components/EstateSalesCrudTester/EstateSalesCrudTester.tsx
// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import type { RootState } from '@/store/store';

// import {
//   fetchEstateSales,
//   createEstateSale,
//   updateEstateSale,
//   deleteEstateSale,
//   addEstateSaleImages,
//   selectEstateSales
// } from '@/store/estateSales';

// export default function EstateSalesCrudTester() {
//   const dispatch = useDispatch<any>();
//   const rows = useSelector(selectEstateSales as any);
//   const loading = useSelector((s: RootState) => (s as any).estateSales.loading);
//   const error = useSelector((s: RootState) => (s as any).estateSales.error);

//   const [selectedId, setSelectedId] = useState<number | null>(null);

//   const selected = useMemo(() => rows.find((r: any) => r.id === selectedId) || null, [rows, selectedId]);

//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     status: 'draft'
//   });

//   const [imgUrl, setImgUrl] = useState('');

//   useEffect(() => {
//     dispatch(fetchEstateSales({ limit: 10 })).catch(() => {});
//   }, [dispatch]);

//   useEffect(() => {
//     if (!selected) return;
//     setForm({
//       title: selected.title || '',
//       description: selected.description || '',
//       city: selected.city || '',
//       state: selected.state || '',
//       zipCode: selected.zipCode || '',
//       status: selected.status || 'draft'
//     });
//   }, [selected]);

//   const onChange = (k: string) => (e: any) => setForm((p) => ({ ...p, [k]: e.target.value }));

//   const refresh = async () => {
//     await dispatch(fetchEstateSales({ limit: 10 }));
//   };

//   const onCreate = async () => {
//     const created = await dispatch(
//       createEstateSale({
//         title: form.title,
//         description: form.description,
//         city: form.city || null,
//         state: form.state || null,
//         zipCode: form.zipCode || null,
//         status: form.status
//       })
//     );
//     setSelectedId(created.id);
//     await refresh();
//   };

//   const onUpdate = async () => {
//     if (!selectedId) return;
//     await dispatch(
//       updateEstateSale(selectedId, {
//         title: form.title,
//         description: form.description,
//         city: form.city || null,
//         state: form.state || null,
//         zipCode: form.zipCode || null,
//         status: form.status
//       })
//     );
//     await refresh();
//   };

//   const onDelete = async () => {
//     if (!selectedId) return;
//     await dispatch(deleteEstateSale(selectedId));
//     setSelectedId(null);
//     setForm({ title: '', description: '', city: '', state: '', zipCode: '', status: 'draft' });
//     await refresh();
//   };

//   const onAddImage = async () => {
//     if (!selectedId || !imgUrl.trim()) return;
//     await dispatch(addEstateSaleImages(selectedId, [{ imageUrl: imgUrl.trim() }]));
//     setImgUrl('');
//     await refresh();
//   };

//   return (
//     <div className="w-100 border rounded-3 p-3 bg-white">
//       <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
//         <h2 className="h5 m-0 text-slate-800">EstateSales CRUD Tester</h2>
//         <button className="btn btn-outline-secondary btn-sm" onClick={refresh} disabled={loading}>
//           {loading ? 'Loading…' : 'Refresh'}
//         </button>
//       </div>

//       {error ? <div className="alert alert-danger py-2 mb-3">{error}</div> : null}

//       <div className="row g-3">
//         <div className="col-12 col-lg-6">
//           <label className="form-label text-sm text-slate-600 mb-1">Select (latest 10)</label>
//           <select
//             className="form-select"
//             value={selectedId ?? ''}
//             onChange={(e) => setSelectedId(e.target.value ? Number(e.target.value) : null)}
//           >
//             <option value="">—</option>
//             {rows.map((r: any) => (
//               <option key={r.id} value={r.id}>
//                 #{r.id} — {r.title}
//               </option>
//             ))}
//           </select>

//           <div className="mt-3">
//             <div className="text-xs text-slate-500 mb-2">Images</div>
//             <ul className="list-group">
//               {(selected?.images || []).slice(0, 5).map((img: any) => (
//                 <li key={img.id} className="list-group-item d-flex justify-content-between">
//                   <span className="text-truncate" style={{ maxWidth: 260 }}>
//                     {img.imageUrl}
//                   </span>
//                   <span className="badge text-bg-light">#{img.id}</span>
//                 </li>
//               ))}
//               {!selected?.images?.length ? <li className="list-group-item text-muted">None</li> : null}
//             </ul>

//             <div className="input-group mt-2">
//               <input
//                 className="form-control"
//                 placeholder="https://image-url"
//                 value={imgUrl}
//                 onChange={(e) => setImgUrl(e.target.value)}
//               />
//               <button className="btn btn-outline-primary" onClick={onAddImage} disabled={!selectedId}>
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-lg-6">
//           <div className="d-flex flex-column gap-2">
//             <input className="form-control" placeholder="Title" value={form.title} onChange={onChange('title')} />
//             <textarea
//               className="form-control"
//               placeholder="Description"
//               rows={3}
//               value={form.description}
//               onChange={onChange('description')}
//             />
//             <div className="d-flex gap-2">
//               <input className="form-control" placeholder="City" value={form.city} onChange={onChange('city')} />
//               <input className="form-control" placeholder="State" value={form.state} onChange={onChange('state')} />
//               <input className="form-control" placeholder="Zip" value={form.zipCode} onChange={onChange('zipCode')} />
//             </div>
//             <select className="form-select" value={form.status} onChange={onChange('status')}>
//               <option value="draft">draft</option>
//               <option value="published">published</option>
//               <option value="completed">completed</option>
//               <option value="archived">archived</option>
//             </select>

//             <div className="d-flex flex-wrap gap-2 mt-1">
//               <button className="btn btn-primary" onClick={onCreate} disabled={loading || !form.title.trim()}>
//                 Create
//               </button>
//               <button className="btn btn-outline-primary" onClick={onUpdate} disabled={loading || !selectedId}>
//                 Update
//               </button>
//               <button className="btn btn-outline-danger" onClick={onDelete} disabled={loading || !selectedId}>
//                 Delete
//               </button>
//             </div>

//             <div className="mt-2 p-2 rounded bg-slate-50 border text-xs text-slate-600">
//               <div className="fw-semibold mb-1">Selected JSON (preview)</div>
//               <pre className="m-0 text-wrap">{selected ? JSON.stringify(selected, null, 2) : 'null'}</pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import {
  createEstateSale,
  updateEstateSale,
  deleteEstateSale,
  type EstateSale,
  type EstateSaleStatus,
} from '../../store/estateSales';

type FormState = {
  id?: number;
  title: string;
  description: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  startAt: string;
  endAt: string;
  showExactFrom: string;
  status: EstateSaleStatus | '';
};

const emptyForm: FormState = {
  id: undefined,
  title: '',
  description: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  startAt: '',
  endAt: '',
  showExactFrom: '',
  status: '',
};

export default function EstateSalesCrudTester() {
  const dispatch = useDispatch<AppDispatch>();

  // Explicitly typed selector – no `unknown`
  const estateSales: EstateSale[] = useSelector((state: RootState) =>
    state.estateSales.allIds.map((id) => state.estateSales.byId[id])
  );

  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Narrow the type when field is `status`
    if (name === 'status') {
      setForm((prev) => ({
        ...prev,
        status: value as EstateSaleStatus | '',
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEdit = (sale: EstateSale) => {
    setForm({
      id: sale.id,
      title: sale.title ?? '',
      description: sale.description ?? '',
      streetAddress: sale.streetAddress ?? '',
      city: sale.city ?? '',
      state: sale.state ?? '',
      zipCode: sale.zipCode ?? '',
      startAt: sale.startAt ?? '',
      endAt: sale.endAt ?? '',
      showExactFrom: sale.showExactFrom ?? '',
      status: (sale.status as EstateSaleStatus) ?? '',
    });
  };

  const handleReset = () => {
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: form.title,
        description: form.description,
        streetAddress: form.streetAddress,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        startAt: form.startAt || null,
        endAt: form.endAt || null,
        showExactFrom: form.showExactFrom || null,
        status: (form.status || 'draft') as EstateSaleStatus,
      };

      if (form.id) {
  await dispatch(
    updateEstateSale(
      form.id,
      payload // Partial<EstateSale>
    ) as any
  );
} else {
  await dispatch(createEstateSale(payload) as any);
}

      handleReset();
    } catch (err) {
      console.error('Estate sale save failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this estate sale?')) return;
    setLoading(true);
    try {
      await dispatch(deleteEstateSale(id) as any);
      if (form.id === id) handleReset();
    } catch (err) {
      console.error('Delete failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-4 sm:p-6 space-y-4 border border-slate-100"
      >
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          {form.id ? 'Edit Estate Sale' : 'Create Estate Sale'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label block text-xs font-medium text-slate-600 mb-1">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-control form-control-sm w-full"
              required
            />
          </div>

          <div>
            <label className="form-label block text-xs font-medium text-slate-600 mb-1">
              Street Address
            </label>
            <input
              name="streetAddress"
              value={form.streetAddress}
              onChange={handleChange}
              className="form-control form-control-sm w-full"
              required
            />
          </div>

          <div>
            <label className="form-label block text-xs font-medium text-slate-600 mb-1">
              City
            </label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="form-control form-control-sm w-full"
            />
          </div>

          <div>
            <label className="form-label block text-xs font-medium text-slate-600 mb-1">
              State
            </label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              className="form-control form-control-sm w-full"
              maxLength={2}
            />
          </div>

          <div>
            <label className="form-label block text-xs font-medium text-slate-600 mb-1">
              ZIP Code
            </label>
            <input
              name="zipCode"
              value={form.zipCode}
              onChange={handleChange}
              className="form-control form-control-sm w-full"
            />
          </div>

          <div>
            <label className="form-label block text-xs font-medium text-slate-600 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-select form-select-sm w-full"
            >
              <option value="">(default: draft)</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="form-label block text-xs font-medium text-slate-600 mb-1">
              Start At
            </label>
            <input
              type="datetime-local"
              name="startAt"
              value={form.startAt}
              onChange={handleChange}
              className="form-control form-control-sm w-full"
            />
          </div>

          <div>
            <label className="form-label block text-xs font-medium text-slate-600 mb-1">
              End At
            </label>
            <input
              type="datetime-local"
              name="endAt"
              value={form.endAt}
              onChange={handleChange}
              className="form-control form-control-sm w-full"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="form-label block text-xs font-medium text-slate-600 mb-1">
              Show Exact Address From
            </label>
            <input
              type="datetime-local"
              name="showExactFrom"
              value={form.showExactFrom}
              onChange={handleChange}
              className="form-control form-control-sm w-full"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="form-label block text-xs font-medium text-slate-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-control form-control-sm w-full"
              rows={3}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="submit"
            className="btn btn-sm btn-primary"
            disabled={loading}
          >
            {loading
              ? 'Saving...'
              : form.id
              ? 'Update Estate Sale'
              : 'Create Estate Sale'}
          </button>
          {form.id && (
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleReset}
              disabled={loading}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="bg-white shadow rounded-xl p-4 sm:p-6 border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          Existing Estate Sales
        </h2>

        {estateSales.length === 0 ? (
          <p className="text-sm text-slate-500">
            No estate sales yet. Use the form above to create one.
          </p>
        ) : (
          <ul className="space-y-2">
            {estateSales.map((sale: EstateSale) => (
              <li
                key={sale.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-50 border border-slate-100 rounded-lg px-3 py-2"
              >
                <div className="text-xs sm:text-sm text-slate-700">
                  <div className="font-medium">
                    #{sale.id} – {sale.title}
                  </div>
                  <div className="text-slate-500">
                    {sale.city}, {sale.state} {sale.zipCode} •{' '}
                    <span className="uppercase text-[0.7rem] font-semibold">
                      {sale.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 flex gap-2">
                  <button
                    type="button"
                    className="btn btn-xs btn-outline-primary"
                    onClick={() => handleEdit(sale)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-xs btn-outline-danger"
                    onClick={() => handleDelete(sale.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
