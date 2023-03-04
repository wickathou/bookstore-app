import { configureStore } from '@reduxjs/toolkit';
import bookReducer, { asyncMiddleware } from './books/booksSlice';
import categoriesReducer from './categories/categoriesSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(asyncMiddleware),
});

export default store;
