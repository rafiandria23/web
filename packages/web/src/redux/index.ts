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

// Slices
import { themeSlice } from './theme';

// Storage
import storage from './storage';

const rootReducer = combineReducers({
  theme: themeSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(
  {
    key: 'root',
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

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
