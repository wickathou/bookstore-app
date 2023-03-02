import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const booksAPI = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/VUqoXEBLxjrzkWMVNCqp/books/'

// Add category list and make input for them when creating new book entry 

export const addData = createAsyncThunk('books/add', async (bookData) => {
  const {item_id, title, author, category} = bookData
  console.log('Running thunk');
  console.log([item_id, title, author,category]);
  try {
    const res = await fetch(booksAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id,
        title,
        author,
        category,
      }),
    });
    if (await !res.ok) {
      throw new Error('Server returned status code ' + res.status);
    }
    // const data = await res.json();
    console.log('addData results');
    console.log(res);
    return res;
  } catch (error) {
    console.log('addData ERROR found');
    throw error;
  }
})

export const getData = createAsyncThunk( 'books/get', async () => {
  try {
    console.log('data.result');
    const res = await fetch(booksAPI);
    const data = await res.json();
    console.log('data');
    console.log(data);
    return data;
  } catch (error) {
    console.log('error');
    return error;
  }
})

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
      const { title, author, item_id, category } = action.payload;
      const newBook = {
        id: item_id || uuidv4(),
        category: category || 'Uncategorized',
        title,
        author,
        completion: 0,
        chapter: '0',
      };
      console.log(newBook);
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
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        // state.loading = true;
        console.log('Pending');
      })
      .addCase(getData.fulfilled, (state, action) => {
        // state.books = action.payload;
        // state.loading = false;
        // state.error = null;
        console.log('Fulfilled');
        const bookList = action.payload
        console.log(bookList);

        // return { ...state, bookList: [...state.bookList, action.payload] };
      })
      .addCase(getData.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.error.message;
        console.log('Rejected');
      })

      .addCase(addData.pending, (state) => {
        // state.loading = true;
        console.log('Pending - addData');
      })
      .addCase(addData.fulfilled, (state, action) => {
        // state.books = action.payload;
        // state.loading = false;
        // state.error = null;
        console.log('Fulfilled - addData');
        const bookList = action
        console.log(bookList);

        // return { ...state, bookList: [...state.bookList, action.payload] };
      })
      .addCase(addData.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.error.message;
        console.log('Rejected - addData');
        console.log(action);
      })
  }
});

export const allBooks = (state) => state.books;

export const {
  addBook, removeBook, updateCompletion, filterBooks, clearFilters,
} = booksSlice.actions;

export default booksSlice.reducer;
