import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const booksAPI = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/VUqoXEBLxjrzkWMVNCqp/books/';

export const addData = createAsyncThunk('books/add', async (bookData) => {
  const { title, author, category } = bookData;
  const itemId = bookData.item_id;
  const res = await fetch(booksAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: itemId,
      title,
      author,
      category,
    }),
  });
  if (await !res.ok) {
    throw new Error(`Server returned status code ${res.status}`);
  }
  return res;
});

export const delData = createAsyncThunk('books/del', async (id) => {
  const res = await fetch(booksAPI + id, {
    method: 'DELETE',
  });
  if (await !res.ok || (/Weird/).test(await res.text())) {
    throw new Error('Refresh the page, the operation failed');
  }
  return res;
});

export const getData = createAsyncThunk('books/get', async () => {
  try {
    const res = await fetch(booksAPI);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  bookList: [],
  filterSettings: {
    filterApplied: false,
    filterSet: [],
  },
  status: {
    loading: false,
    error: '',
  },
};

const bookFormater = (element) => {
  const { title, author, category } = element;
  const itemId = element.item_id;
  const newBook = {
    item_id: itemId || uuidv4(),
    category: category || 'Uncategorized',
    title,
    author,
    completion: 0,
    chapter: '0',
  };
  return newBook;
};

const returnStatus = (type, state, action) => {
  switch (type) {
    case 'pending':
      return { ...state, status: { ...state.status, loading: true, error: '' } };
    case 'fulfilled':
      return { ...state, status: { ...state.status, loading: false, error: '' } };
    case 'rejected':
      return { ...state, status: { ...state.status, loading: false, error: action.error.message || 'The operation has failed' } };
    default:
      break;
  }
  return { ...state };
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      const bookData = action.payload;
      return { ...state, bookList: [...state.bookList, bookFormater(bookData)] };
    },
    removeBook: (state, action) => {
      const itemId = action.payload;
      return { ...state, bookList: state.bookList.filter((item) => item.item_id !== itemId) };
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
      .addCase(getData.pending, (state) => returnStatus('pending', state))
      .addCase(getData.fulfilled, (state, action) => {
        const bookList = action.payload;
        const bookArr = Object.entries(bookList);
        const newBooks = bookArr.map((book) => {
          const itemId = book[0];
          const { author, category, title } = book[1][0];
          const bookObj = {
            item_id: itemId,
            author,
            category,
            title,
          };
          return bookFormater(bookObj);
        });
        return { ...state, bookList: [...state.bookList, ...newBooks], status: { ...state.status, loading: false, error: '' } };
      })
      .addCase(getData.rejected, (state, action) => returnStatus('rejected', state, action))

      .addCase(addData.pending, (state) => returnStatus('pending', state))
      .addCase(addData.fulfilled, (state) => returnStatus('fulfilled', state))
      .addCase(addData.rejected, (state, action) => returnStatus('rejected', state, action))

      .addCase(delData.pending, (state) => returnStatus('pending', state))
      .addCase(delData.fulfilled, (state) => returnStatus('fulfilled', state))
      .addCase(delData.rejected, (state, action) => returnStatus('rejected', state, action));
  },
});

export const allBooks = (state) => state.books;

export const {
  addBook, removeBook, updateCompletion, filterBooks, clearFilters,
} = booksSlice.actions;

export default booksSlice.reducer;

export const asyncMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'books/removeBook':
      store.dispatch(delData(action.payload));
      break;
    case 'books/addBook':
      store.dispatch(addData(bookFormater(action.payload)));
      break;
    default:
      break;
  }

  return next(action);
};
