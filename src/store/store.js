// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // ✅ Correct relative path

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
