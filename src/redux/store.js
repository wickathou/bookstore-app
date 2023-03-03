import { configureStore } from '@reduxjs/toolkit';
import bookReducer, { getData, myMiddleware } from './books/booksSlice';
import categoriesReducer from './categories/categoriesSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleware)
});

export default store;
