import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import { contactsReducer } from "./contacts/contactsSlice";
import { filterReducer } from "./filterSlice";
import { authReducer } from "./auth/authSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'token',
  storage,
  whitelist: ['token']
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const reducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
  auth: persistedReducer
})


export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)