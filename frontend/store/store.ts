'use client';

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import {thunk} from 'redux-thunk';
import sessionReducer from './session';

// Add slice reducers here as you build them
const rootReducer = combineReducers({
  session: sessionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let enhancer: any;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  // Only used in development
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const logger = require('redux-logger').default;
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export const configureStore = (preloadedState?: Partial<RootState>) => {
  return createStore(
    rootReducer,
    preloadedState as any,
    enhancer
  );
};

// Create a singleton store for the app
export const store = configureStore();

export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore['dispatch'];
