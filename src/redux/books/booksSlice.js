import {createSlice} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  books: []
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      const {title,author} = action.payload
      state.books = [...state.books,{
        id: uuidv4(),
        category: 'default',
        title: title,
        author: author,
        completion: 0,
        chapter: 0,
      }]
    },
    removeBook: (state, action) => {
      const itemId = action.payload
      state.books = state.books.filter((item) => item.id !== itemId)
    }
  }
})

export const { addBook, removeBook } = booksSlice.actions;

export default booksSlice.reducer