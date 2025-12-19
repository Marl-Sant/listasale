// frontend/store/itemListings.ts
'use client';

import { csrfFetch } from './csrf';

export type ItemListingStatus = 'active' | 'sold' | 'expired' | 'deleted' | string;

export type ItemListingImage = {
  id: number;
  itemListingId: number;
  imageUrl: string;
  storageKey?: string | null;
  sortOrder?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ItemListing = {
  id: number;
  creatorAccountId: number;
  title: string;
  description?: string | null;
  priceCents: number;
  currency: string;
  condition?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  status: ItemListingStatus;
  postedAt?: string | null;
  refreshedAt?: string | null;
  soldAt?: string | null;
  autoRefreshEnabled?: boolean;
  images?: ItemListingImage[];
  createdAt?: string;
  updatedAt?: string;
};

type ItemListingsState = {
  byId: Record<number, ItemListing>;
  allIds: number[];
  currentId: number | null;
  loading: boolean;
  error: string | null;
};

const SET_LIST = 'itemListings/SET_LIST' as const;
const UPSERT_ONE = 'itemListings/UPSERT_ONE' as const;
const REMOVE_ONE = 'itemListings/REMOVE_ONE' as const;
const SET_CURRENT = 'itemListings/SET_CURRENT' as const;
const SET_LOADING = 'itemListings/SET_LOADING' as const;
const SET_ERROR = 'itemListings/SET_ERROR' as const;

const setList = (itemListings: ItemListing[]) => ({ type: SET_LIST, itemListings });
const upsertOne = (itemListing: ItemListing) => ({ type: UPSERT_ONE, itemListing });
const removeOne = (id: number) => ({ type: REMOVE_ONE, id });
export const setCurrentItemListing = (id: number | null) => ({ type: SET_CURRENT, id });
const setLoading = (loading: boolean) => ({ type: SET_LOADING, loading });
const setError = (error: string | null) => ({ type: SET_ERROR, error });

const initialState: ItemListingsState = {
  byId: {},
  allIds: [],
  currentId: null,
  loading: false,
  error: null
};

export default function itemListingsReducer(
  state: ItemListingsState = initialState,
  action: any
): ItemListingsState {
  switch (action.type) {
    case SET_LIST: {
      const byId: Record<number, ItemListing> = {};
      const allIds: number[] = [];
      for (const s of action.itemListings as ItemListing[]) {
        byId[s.id] = s;
        allIds.push(s.id);
      }
      return { ...state, byId, allIds };
    }
    case UPSERT_ONE: {
      const s = action.itemListing as ItemListing;
      const exists = !!state.byId[s.id];
      return {
        ...state,
        byId: { ...state.byId, [s.id]: s },
        allIds: exists ? state.allIds : [s.id, ...state.allIds.filter((x) => x !== s.id)],
        currentId: state.currentId ?? s.id
      };
    }
    case REMOVE_ONE: {
      const id = action.id as number;
      const { [id]: _removed, ...rest } = state.byId;
      return {
        ...state,
        byId: rest,
        allIds: state.allIds.filter((x) => x !== id),
        currentId: state.currentId === id ? null : state.currentId
      };
    }
    case SET_CURRENT:
      return { ...state, currentId: action.id as number | null };
    case SET_LOADING:
      return { ...state, loading: !!action.loading };
    case SET_ERROR:
      return { ...state, error: action.error as string | null };
    default:
      return state;
  }
}

/** Selectors */
export const selectItemListings = (state: any) =>
  state.itemListings.allIds.map((id: number) => state.itemListings.byId[id]);

export const selectItemListingById = (id: number) => (state: any) =>
  state.itemListings.byId[id] || null;

export const selectCurrentItemListing = (state: any) =>
  state.itemListings.currentId ? state.itemListings.byId[state.itemListings.currentId] : null;

/** Thunks */
export const fetchItemListings =
  (params: {
    status?: string;
    zipCode?: string;
    city?: string;
    state?: string;
    creatorAccountId?: number;
    q?: string;
    limit?: number;
    offset?: number;
  } = {}) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const qs = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null || v === '') return;
        qs.set(k, String(v));
      });

      const res = await csrfFetch(`/api/item-listings${qs.toString() ? `?${qs}` : ''}`);
      const data = await res.json();
      dispatch(setList(data.itemListings || []));
      return data.itemListings as ItemListing[];
    } catch (e: any) {
      dispatch(setError('Failed to load item listings'));
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchItemListingById = (id: number) => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const res = await csrfFetch(`/api/item-listings/${id}`);
    const data = await res.json();
    dispatch(upsertOne(data.itemListing));
    dispatch(setCurrentItemListing(data.itemListing.id));
    return data.itemListing as ItemListing;
  } catch (e: any) {
    dispatch(setError('Failed to load item listing'));
    throw e;
  } finally {
    dispatch(setLoading(false));
  }
};

export const createItemListing = (payload: Partial<ItemListing>) => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const res = await csrfFetch('/api/item-listings', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    dispatch(upsertOne(data.itemListing));
    dispatch(setCurrentItemListing(data.itemListing.id));
    return data.itemListing as ItemListing;
  } catch (e: any) {
    dispatch(setError('Failed to create item listing'));
    throw e;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateItemListing =
  (id: number, payload: Partial<ItemListing>) => async (dispatch: any) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const res = await csrfFetch(`/api/item-listings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      dispatch(upsertOne(data.itemListing));
      dispatch(setCurrentItemListing(data.itemListing.id));
      return data.itemListing as ItemListing;
    } catch (e: any) {
      dispatch(setError('Failed to update item listing'));
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteItemListing = (id: number) => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    await csrfFetch(`/api/item-listings/${id}`, { method: 'DELETE' });
    dispatch(removeOne(id));
    return true;
  } catch (e: any) {
    dispatch(setError('Failed to delete item listing'));
    throw e;
  } finally {
    dispatch(setLoading(false));
  }
};

export const addItemListingImages =
  (id: number, images: { imageUrl: string; storageKey?: string | null; sortOrder?: number }[]) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const res = await csrfFetch(`/api/item-listings/${id}/images`, {
        method: 'POST',
        body: JSON.stringify({ images })
      });
      const data = await res.json();
      dispatch(upsertOne(data.itemListing));
      return data.itemListing as ItemListing;
    } catch (e: any) {
      dispatch(setError('Failed to add images'));
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  };
