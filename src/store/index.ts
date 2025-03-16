// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';

// Configure the store
export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

// Type for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;