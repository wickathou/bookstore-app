import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  filterList: [],
  checked: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    checkStatus: (state) => {
      const newState = { ...state };
      newState.checked = true;
      return newState;
    },
  },
});

export const { checkStatus } = categoriesSlice.actions;

export default categoriesSlice.reducer;
