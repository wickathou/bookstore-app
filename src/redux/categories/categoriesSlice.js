import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  filterList: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    checkStatus: (state) => {
      const newState = { ...state };
      newState.categories = [...newState.categories, 'Status checked'];
      return newState;
    },
  },
});

export const { checkStatus } = categoriesSlice.actions;

export default categoriesSlice.reducer;
