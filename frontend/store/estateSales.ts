// const express = require('express');
// require('express-async-errors');
// const { Op } = require('sequelize');

// const {
//   ItemListing,
//   ItemListingImage,
//   ItemListingInterest,
//   Account
// } = require('../../db/models');

// const { requireAuth } = require('../../utils/auth'); // adjust if your path differs

// const router = express.Router();

// /**
//  * LIST (public)
//  * GET /api/item-listings?status=active&zipCode=33101&creatorAccountId=1&q=table&limit=20&offset=0
//  */
// router.get('/', async (req, res) => {
//   const {
//     status,
//     zipCode,
//     state,
//     city,
//     creatorAccountId,
//     q,
//     limit = 20,
//     offset = 0
//   } = req.query;

//   const where = {};
//   if (status) where.status = status;
//   if (zipCode) where.zipCode = String(zipCode);
//   if (state) where.state = String(state);
//   if (city) where.city = String(city);
//   if (creatorAccountId) where.creatorAccountId = Number(creatorAccountId);

//   if (q) {
//     where[Op.or] = [
//       { title: { [Op.iLike]: `%${q}%` } },
//       { description: { [Op.iLike]: `%${q}%` } }
//     ];
//   }

//   const rows = await ItemListing.findAll({
//     where,
//     limit: Math.min(Number(limit) || 20, 50),
//     offset: Number(offset) || 0,
//     order: [['createdAt', 'DESC']],
//     include: [
//       { model: ItemListingImage, as: 'images', separate: true, order: [['sortOrder', 'ASC']] },
//       { model: Account, as: 'creator', attributes: ['id', 'username', 'firstName', 'lastName'] }
//     ]
//   });

//   res.json({ itemListings: rows });
// });

// /**
//  * GET ONE (public)
//  * GET /api/item-listings/:id
//  */
// router.get('/:id', async (req, res) => {
//   const itemListing = await ItemListing.findByPk(req.params.id, {
//     include: [
//       { model: ItemListingImage, as: 'images', separate: true, order: [['sortOrder', 'ASC']] },
//       { model: Account, as: 'creator', attributes: ['id', 'username', 'firstName', 'lastName'] }
//     ]
//   });

//   if (!itemListing) return res.status(404).json({ message: 'Item listing not found' });
//   res.json({ itemListing });
// });

// /**
//  * CREATE (auth)
//  * POST /api/item-listings
//  */
// router.post('/', requireAuth, async (req, res) => {
//   const creatorAccountId = req.user.id;

//   const {
//     title,
//     description,
//     priceCents,
//     currency,
//     condition,
//     city,
//     state,
//     zipCode,
//     status,
//     postedAt,
//     refreshedAt,
//     soldAt,
//     autoRefreshEnabled
//   } = req.body;

//   const itemListing = await ItemListing.create({
//     creatorAccountId,
//     title,
//     description,
//     priceCents,
//     currency: currency || 'USD',
//     condition,
//     city,
//     state,
//     zipCode,
//     status: status || 'active',
//     postedAt: postedAt || new Date(),
//     refreshedAt: refreshedAt || null,
//     soldAt: soldAt || null,
//     autoRefreshEnabled: !!autoRefreshEnabled
//   });

//   const full = await ItemListing.findByPk(itemListing.id, {
//     include: [
//       { model: ItemListingImage, as: 'images' },
//       { model: Account, as: 'creator', attributes: ['id', 'username', 'firstName', 'lastName'] }
//     ]
//   });

//   res.status(201).json({ itemListing: full });
// });

// /**
//  * UPDATE (auth + owner)
//  * PUT /api/item-listings/:id
//  */
// router.put('/:id', requireAuth, async (req, res) => {
//   const itemListing = await ItemListing.findByPk(req.params.id);
//   if (!itemListing) return res.status(404).json({ message: 'Item listing not found' });

//   if (itemListing.creatorAccountId !== req.user.id) {
//     return res.status(403).json({ message: 'Forbidden' });
//   }

//   const fields = [
//     'title',
//     'description',
//     'priceCents',
//     'currency',
//     'condition',
//     'city',
//     'state',
//     'zipCode',
//     'status',
//     'postedAt',
//     'refreshedAt',
//     'soldAt',
//     'autoRefreshEnabled'
//   ];

//   const updates = {};
//   for (const f of fields) {
//     if (Object.prototype.hasOwnProperty.call(req.body, f)) updates[f] = req.body[f];
//   }

//   await itemListing.update(updates);

//   const full = await ItemListing.findByPk(itemListing.id, {
//     include: [
//       { model: ItemListingImage, as: 'images', separate: true, order: [['sortOrder', 'ASC']] },
//       { model: Account, as: 'creator', attributes: ['id', 'username', 'firstName', 'lastName'] }
//     ]
//   });

//   res.json({ itemListing: full });
// });

// /**
//  * DELETE (auth + owner)
//  * DELETE /api/item-listings/:id
//  */
// router.delete('/:id', requireAuth, async (req, res) => {
//   const itemListing = await ItemListing.findByPk(req.params.id);
//   if (!itemListing) return res.status(404).json({ message: 'Item listing not found' });

//   if (itemListing.creatorAccountId !== req.user.id) {
//     return res.status(403).json({ message: 'Forbidden' });
//   }

//   await itemListing.destroy();
//   res.json({ message: 'Deleted' });
// });

// /**
//  * ADD IMAGES (auth + owner)
//  * POST /api/item-listings/:id/images
//  * body: { images: [{ imageUrl, storageKey, sortOrder }] }
//  */
// router.post('/:id/images', requireAuth, async (req, res) => {
//   const itemListing = await ItemListing.findByPk(req.params.id);
//   if (!itemListing) return res.status(404).json({ message: 'Item listing not found' });

//   if (itemListing.creatorAccountId !== req.user.id) {
//     return res.status(403).json({ message: 'Forbidden' });
//   }

//   const images = Array.isArray(req.body.images) ? req.body.images : [];
//   const payload = images.map((img, idx) => ({
//     itemListingId: itemListing.id,
//     imageUrl: img.imageUrl,
//     storageKey: img.storageKey || null,
//     sortOrder: Number.isFinite(img.sortOrder) ? img.sortOrder : idx
//   }));

//   if (!payload.length) return res.status(400).json({ message: 'images array required' });

//   await ItemListingImage.bulkCreate(payload, { validate: true });

//   const refreshed = await ItemListing.findByPk(itemListing.id, {
//     include: [{ model: ItemListingImage, as: 'images', separate: true, order: [['sortOrder', 'ASC']] }]
//   });

//   res.status(201).json({ itemListing: refreshed });
// });

// /**
//  * DELETE IMAGE (auth + owner)
//  * DELETE /api/item-listings/:id/images/:imageId
//  */
// router.delete('/:id/images/:imageId', requireAuth, async (req, res) => {
//   const itemListing = await ItemListing.findByPk(req.params.id);
//   if (!itemListing) return res.status(404).json({ message: 'Item listing not found' });

//   if (itemListing.creatorAccountId !== req.user.id) {
//     return res.status(403).json({ message: 'Forbidden' });
//   }

//   const img = await ItemListingImage.findOne({
//     where: { id: req.params.imageId, itemListingId: itemListing.id }
//   });

//   if (!img) return res.status(404).json({ message: 'Image not found' });

//   await img.destroy();
//   res.json({ message: 'Deleted' });
// });

// /**
//  * EXPRESS INTEREST (auth)
//  * POST /api/item-listings/:id/interests
//  */
// router.post('/:id/interests', requireAuth, async (req, res) => {
//   const itemListing = await ItemListing.findByPk(req.params.id);
//   if (!itemListing) return res.status(404).json({ message: 'Item listing not found' });

//   const {
//     message,
//     offerCents,
//     buyoutRequested,
//     buyerNameSnapshot,
//     buyerEmailSnapshot,
//     buyerPhoneSnapshot
//   } = req.body;

//   const interest = await ItemListingInterest.create({
//     itemListingId: itemListing.id,
//     interestedAccountId: req.user.id,
//     message: message || null,
//     offerCents: offerCents ?? null,
//     buyoutRequested: !!buyoutRequested,
//     buyerNameSnapshot: buyerNameSnapshot || null,
//     buyerEmailSnapshot: buyerEmailSnapshot || req.user.email || null,
//     buyerPhoneSnapshot: buyerPhoneSnapshot || null
//   });

//   res.status(201).json({ interest });
// });

// module.exports = router;


'use client';

import Cookies from 'js-cookie';
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { RootState } from './store';

/** ---------------- Types ---------------- */

export type EstateSaleStatus = 'draft' | 'published' | 'completed' | 'archived';

export type EstateSaleImage = {
  id: number;
  estateSaleId: number;
  imageUrl: string;
  storageKey: string | null;
  sortOrder: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type EstateSale = {
  id: number;
  creatorAccountId: number;

  title: string;
  description: string | null;

  startAt: string | null;
  endAt: string | null;

  streetAddress: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;

  latitude: number | null;
  longitude: number | null;

  showExactFrom: string | null;

  status: EstateSaleStatus;
  maxImagesAllowed: number | null;

  images?: EstateSaleImage[];

  createdAt?: string;
  updatedAt?: string;
};

type EstateSalesState = {
  byId: Record<number, EstateSale>;
  allIds: number[];
  currentId: number | null;
  loading: boolean;
  error: string | null;
};

type EstateSalesQueryParams = {
  status?: string;
  zipCode?: string;
  state?: string;
  city?: string;
  creatorAccountId?: number;
  q?: string;
  limit?: number;
  offset?: number;
};

type AppThunk<ReturnType = unknown> = ThunkAction<
  Promise<ReturnType>,
  RootState,
  unknown,
  AnyAction
>;

/** ---------------- csrfFetch (local copy to keep this file self-contained + typed) ---------------- */

async function csrfFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = path;

  const method = (options.method || 'GET').toUpperCase();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  };

  if (method !== 'GET') {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN') ?? '';
  }

  const res = await fetch(url, {
    ...options,
    method,
    headers,
    credentials: 'include',
  });

  return res;
}

/** ---------------- Actions ---------------- */

const SET_LIST = 'estateSales/SET_LIST' as const;
const UPSERT_ONE = 'estateSales/UPSERT_ONE' as const;
const REMOVE_ONE = 'estateSales/REMOVE_ONE' as const;
const SET_CURRENT = 'estateSales/SET_CURRENT' as const;
const SET_LOADING = 'estateSales/SET_LOADING' as const;
const SET_ERROR = 'estateSales/SET_ERROR' as const;

const setList = (estateSales: EstateSale[]) => ({ type: SET_LIST, estateSales });
const upsertOne = (estateSale: EstateSale) => ({ type: UPSERT_ONE, estateSale });
const removeOne = (id: number) => ({ type: REMOVE_ONE, id });
export const setCurrentEstateSale = (id: number | null) => ({ type: SET_CURRENT, id });
const setLoading = (loading: boolean) => ({ type: SET_LOADING, loading });
const setError = (error: string | null) => ({ type: SET_ERROR, error });

type EstateSalesAction =
  | ReturnType<typeof setList>
  | ReturnType<typeof upsertOne>
  | ReturnType<typeof removeOne>
  | ReturnType<typeof setCurrentEstateSale>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setError>;

/** ---------------- Reducer ---------------- */

const initialState: EstateSalesState = {
  byId: {},
  allIds: [],
  currentId: null,
  loading: false,
  error: null,
};

export default function estateSalesReducer(
  state: EstateSalesState = initialState,
  action: EstateSalesAction
): EstateSalesState {
  switch (action.type) {
    case SET_LIST: {
      const byId: Record<number, EstateSale> = {};
      const allIds: number[] = [];

      for (const s of action.estateSales) {
        byId[s.id] = s;
        allIds.push(s.id);
      }

      return { ...state, byId, allIds };
    }

    case UPSERT_ONE: {
      const s = action.estateSale;
      const exists = Boolean(state.byId[s.id]);

      return {
        ...state,
        byId: { ...state.byId, [s.id]: s },
        allIds: exists ? state.allIds : [s.id, ...state.allIds.filter((x) => x !== s.id)],
        currentId: state.currentId ?? s.id,
      };
    }

    case REMOVE_ONE: {
      const id = action.id;
      const { [id]: _removed, ...rest } = state.byId;

      return {
        ...state,
        byId: rest,
        allIds: state.allIds.filter((x) => x !== id),
        currentId: state.currentId === id ? null : state.currentId,
      };
    }

    case SET_CURRENT:
      return { ...state, currentId: action.id };

    case SET_LOADING:
      return { ...state, loading: action.loading };

    case SET_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
}

/** ---------------- Selectors ---------------- */

export const selectEstateSales = (state: RootState): EstateSale[] =>
  state.estateSales.allIds.map((id) => state.estateSales.byId[id]);

export const selectEstateSaleById =
  (id: number) =>
  (state: RootState): EstateSale | null =>
    state.estateSales.byId[id] || null;

export const selectCurrentEstateSale = (state: RootState): EstateSale | null =>
  state.estateSales.currentId ? state.estateSales.byId[state.estateSales.currentId] : null;

/** ---------------- Thunks ---------------- */

export const fetchEstateSales =
  (params: EstateSalesQueryParams = {}): AppThunk<EstateSale[]> =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const qs = new URLSearchParams();

      (Object.entries(params) as Array<[keyof EstateSalesQueryParams, EstateSalesQueryParams[keyof EstateSalesQueryParams]]>)
        .forEach(([k, v]) => {
          if (v === undefined || v === null || v === '') return;
          qs.set(String(k), String(v));
        });

      const res = await csrfFetch(`/api/estate-sales${qs.toString() ? `?${qs}` : ''}`);
      if (!res.ok) throw res;

      const data: { estateSales: EstateSale[] } = await res.json();
      dispatch(setList(data.estateSales || []));
      return data.estateSales || [];
    } catch (e) {
      dispatch(setError('Failed to load estate sales'));
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchEstateSaleById =
  (id: number): AppThunk<EstateSale> =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const res = await csrfFetch(`/api/estate-sales/${id}`);
      if (!res.ok) throw res;

      const data: { estateSale: EstateSale } = await res.json();
      dispatch(upsertOne(data.estateSale));
      dispatch(setCurrentEstateSale(data.estateSale.id));
      return data.estateSale;
    } catch (e) {
      dispatch(setError('Failed to load estate sale'));
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createEstateSale =
  (payload: Partial<EstateSale>): AppThunk<EstateSale> =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const res = await csrfFetch('/api/estate-sales', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw res;

      const data: { estateSale: EstateSale } = await res.json();
      dispatch(upsertOne(data.estateSale));
      dispatch(setCurrentEstateSale(data.estateSale.id));
      return data.estateSale;
    } catch (e) {
      dispatch(setError('Failed to create estate sale'));
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateEstateSale =
  (id: number, payload: Partial<EstateSale>): AppThunk<EstateSale> =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const res = await csrfFetch(`/api/estate-sales/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw res;

      const data: { estateSale: EstateSale } = await res.json();
      dispatch(upsertOne(data.estateSale));
      dispatch(setCurrentEstateSale(data.estateSale.id));
      return data.estateSale;
    } catch (e) {
      dispatch(setError('Failed to update estate sale'));
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteEstateSale =
  (id: number): AppThunk<boolean> =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const res = await csrfFetch(`/api/estate-sales/${id}`, { method: 'DELETE' });
      if (!res.ok) throw res;

      dispatch(removeOne(id));
      return true;
    } catch (e) {
      dispatch(setError('Failed to delete estate sale'));
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const addEstateSaleImages =
  (
    id: number,
    images: Array<{ imageUrl: string; storageKey?: string | null; sortOrder?: number | null }>
  ): AppThunk<EstateSale> =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const res = await csrfFetch(`/api/estate-sales/${id}/images`, {
        method: 'POST',
        body: JSON.stringify({ images }),
      });
      if (!res.ok) throw res;

      const data: { estateSale: EstateSale } = await res.json();
      dispatch(upsertOne(data.estateSale));
      return data.estateSale;
    } catch (e) {
      dispatch(setError('Failed to add images'));
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  };
