import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Types
import type { IRootState } from '@/types/redux';

// Slices
import { themeSlice } from './theme';

// Storage
import storage from './storage';

const rootReducer = combineReducers<IRootState>({
  theme: themeSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'state',
    whitelist: ['theme'],
    storage,
  },
  rootReducer,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const makeStore = () => {
  return store;
};

export const persistor = persistStore(store);
export const wrapper = createWrapper(makeStore);
