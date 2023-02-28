import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './books/booksSlice'

export const store = configureStore({
  reducer: {
    cart: bookReducer,
  },
})