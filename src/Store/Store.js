// Store.js

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rubixApi } from '../Services/api.service';

export const store = configureStore({
  reducer: {
    [rubixApi.reducerPath]: rubixApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rubixApi.middleware),
});

setupListeners(store.dispatch);

export default store; // Make sure to export the store variable
