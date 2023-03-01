import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {allBooks} from '../books/booksSlice';

const initialState = {
  categories: [],
  filterList: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    checkStatus: (state) => {
      console.log('status checked');
      const newState = { ...state };
      newState.categories = [...newState.categories, 'Status checked'];
      return newState;
    },
  },
});

export const { checkStatus } = categoriesSlice.actions;

export default categoriesSlice.reducer;
