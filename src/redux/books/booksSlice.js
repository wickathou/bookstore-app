import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  books: []
}

const books = [
  
];

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state) => {
      console.log(state);
    },
    removeBook: (state, action) => {
      console.log(action);
    }
  }
})

export const { addBook, removeBook } = booksSlice.actions;

export default booksSlice.reducer