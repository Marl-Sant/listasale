'use client';

import { Dispatch } from 'redux';
import { csrfFetch } from './csrf';

// ---- Types ----

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface SessionState {
  user: User | null;
}

// ---- Action type constants ----

const SET_USER = 'session/setUser' as const;
const REMOVE_USER = 'session/removeUser' as const;

// ---- Action creators ----

const setUser = (user: User | null) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

type SessionAction =
  | ReturnType<typeof setUser>
  | ReturnType<typeof removeUser>;

// ---- Thunks ----

// Login: POST /api/session
export const login = (user: {
  credential: string;
  password: string;
}) => async (dispatch: Dispatch) => {
  const { credential, password } = user;

  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password }),
  });

  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// Restore: GET /api/session
export const restoreUser = () => async (dispatch: Dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user ?? null));
  return response;
};

// Optional: logout thunk (for later)
export const logout = () => async (dispatch: Dispatch) => {
  await csrfFetch('/api/session', { method: 'DELETE' });
  dispatch(removeUser());
};

// ---- Reducer ----

const initialState: SessionState = { user: null };

const sessionReducer = (
  state: SessionState = initialState,
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;

// Export actions namespace for dev debugging
export const sessionActions = {
  login,
  restoreUser,
  logout,
  setUser,
  removeUser,
};
