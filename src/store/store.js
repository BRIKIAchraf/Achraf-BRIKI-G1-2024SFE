// store/store.js (assuming this needs to be created or updated)
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

export const store = configureStore({
  reducer: rootReducer
});
