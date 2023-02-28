import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categories: []
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    checkStatus: (state, action) => {
      console.log('Categories test');
      state.categories = 'Under construction'
    },
  }
})

export const { checkStatus } = categoriesSlice.actions;

export default categoriesSlice.reducer