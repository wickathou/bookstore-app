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
      newState.categories = [...newState.categories, 'Under construction'];
      return newState;
    },
    filterByCountry: (state, {payload}) => {
      // console.log({ ...state, filterList: state.bookList.filter((item) => item.country !== payload) });
      console.log(payload);
      // return { ...state, filterList: allBooks(state).filter((item) => item.country !== payload) };
    }
  },
});

export const { checkStatus, filterByCountry } = categoriesSlice.actions;

export default categoriesSlice.reducer;
