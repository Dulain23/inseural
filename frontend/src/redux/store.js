import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/es/storage";

// Import Reducers
import alertReducer from "./alertSlice";
import userReducer from "./userSlice"

// Combine Reducers
const rootReducer = combineReducers({ 
    user: userReducer,
    alert: alertReducer
});

// Setup Redux Persist 
const persistConfig = {
    key: 'root',
    version: 1,
    storage: localStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);