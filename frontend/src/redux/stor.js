import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import companyReducer from './companySlice';

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  company : companyReducer,
});


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);