import { combineReducers, configureStore } from '@reduxjs/toolkit';
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

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
