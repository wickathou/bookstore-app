import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const booksAPI = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/VUqoXEBLxjrzkWMVNCqp/books/';

// Add category list and make input for them when creating new book entry

export const addData = createAsyncThunk('books/add', async (bookData) => {
  console.log(bookData);
  const {
    item_id, title, author, category,
  } = bookData;
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
      throw new Error(`Server returned status code ${res.status}`);
    }
    // const data = await res.json();
    return res;
  } catch (error) {
    throw error;
  }
});

export const delData = createAsyncThunk('books/del', async (id) => {
  console.log(`Deleting record ${id}`);
  throw Error('All wrong')
  try {
    const res = await fetch(booksAPI + id, {
      method: 'DELETE',
    });
    if (await !res.ok || (/Weird/).test(await res.text())) {
      console.log('Error FOUND');
      console.log(await res.text());
      throw new Error(`Server returned status code ${res.status}`);
    }
    console.log('Deleted');
    return res;
  } catch (error) {
    console.log('delData ERROR found');
    throw error;
  }
});

export const getData = createAsyncThunk('books/get', async () => {
  try {
    console.log('data.result');
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
  const {
    title, author, item_id, category,
  } = element;
  const newBook = {
    item_id: item_id || uuidv4(),
    category: category || 'Uncategorized',
    title,
    author,
    completion: 0,
    chapter: '0',
  };
  console.log(newBook);
  return newBook;
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => ({ ...state, bookList: [...state.bookList, bookFormater(action.payload)] }),
    removeBook: (state, action) => {
      const itemId = action.payload;
      console.log(itemId);
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

      .addCase('books/removeBook', (state) => {
        console.log('runned');
      })
      .addCase(getData.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        // state.books = action.payload;
        // state.loading = false;
        // state.error = null;
        const bookList = action.payload;
        const bookArr = Object.entries(bookList);
        console.log(bookArr);
        const newBooks = bookArr.map((book) => {
          const item_id = book[0];
          const { author, category, title } = book[1][0];
          const bookObj = {
            item_id,
            author,
            category,
            title,
          };
          return bookFormater(bookObj);
        });
        return { ...state, bookList: [...state.bookList, ...newBooks] };
      })
      .addCase(getData.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.error.message;
      })

      .addCase(addData.pending, (state) => {
        // state.loading = true;
      })
      .addCase(addData.fulfilled, (state, action) => {
        // state.books = action.payload;
        // state.loading = false;
        // state.error = null;
        const bookList = action;

        // return { ...state, bookList: [...state.bookList, action.payload] };
      })
      .addCase(addData.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.error.message;
      })

      .addCase(delData.pending, (state) => {
        return {...state, status: {...state.status, loading:true, error: ''}}
      })
      .addCase(delData.fulfilled, (state, action) => {
        return {...state, status: {...state.status, loading:false, error: ''}}

      })
      .addCase(delData.rejected, (state, action) => {
        console.log(action);
        console.log('got reject');
        return {...state, status: {...state.status, loading:false, error: action.error.message || 'Remove function has failed'}}
      });
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
      // dispatch(delData(action.payload))

      break;

    case 'books/addBook':
      store.dispatch(addData(bookFormater(action.payload)));
      // dispatch(delData(action.payload))

      break;

    default:
      break;
  }

  return next(action);
};
