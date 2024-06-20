import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { encryptTransform } from "redux-persist-transform-encrypt";
import auth from "./Slice/auth";

// Import your reducers and combine them
const rootReducer = combineReducers({
  // Add your reducers here
  auth: auth,
});

// Define encryption for persisted state
const encryptor = encryptTransform({
  secretKey: "webStore",
  onError: function (error) {
    // console.log(error);
  },
});

// Configuration for persisting the Redux store
const persistConfig = {
  key: "root",
  storage,
  transforms: [encryptor],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), // This line already includes thunk middleware
});

// Export store state and persistor
export const RootState = store.getState();
export const persistor = persistStore(store);
