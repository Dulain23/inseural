import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";

// Import Reducers
import alertReducer from "./alertSlice";

// Combine Reducers
const rootReducer = combineReducers({ 
    alert: alertReducer
});

// Setup Redux Persist 
const persistConfig = {
    key: 'root',
    version: 1,
    storage: sessionStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);