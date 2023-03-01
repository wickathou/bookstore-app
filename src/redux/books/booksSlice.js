import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  bookList: [
    {
      id: 'item1',
      title: 'The Great Gatsby',
      author: 'John Smith',
      category: 'Fiction',
      completion: 0,
      chapter: '0',
    },
    {
      id: 'item2',
      title: 'Anna Karenina',
      author: 'Leo Tolstoy',
      category: 'Fiction',
      completion: 0,
      chapter: '0',
    },
    {
      id: 'item3',
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      category: 'Nonfiction',
      completion: 0,
      chapter: '0',
    },
  ],
  filterSettings: {
    filterApplied: false,
    filterSet: [],
  },
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      const { title, author } = action.payload;
      const newBook = {
        id: uuidv4(),
        category: 'Uncategorized',
        country: 'Unknown',
        title,
        author,
        completion: 0,
        chapter: '0',
      };
      return { ...state, bookList: [...state.bookList, newBook] };
    },
    removeBook: (state, action) => {
      const itemId = action.payload;
      return { ...state, bookList: state.bookList.filter((item) => item.id !== itemId) };
    },
    filterBooks: (state, { payload }) => {
      const filters = payload;
      return {
        ...state,
        filterSettings: {
          filterApplied: true,
          filterSet: state.bookList.filter((item) => item.category === filters),
        },
      };
    },
    clearFilters: (state) => ({
      ...state,
      filterSettings: {
        filterApplied: false,
        filterSet: [],
      },
    }),
  },
});

export const allBooks = (state) => state.books;

export const {
  addBook, removeBook, updateCompletion, filterBooks, clearFilters,
} = booksSlice.actions;

export default booksSlice.reducer;
