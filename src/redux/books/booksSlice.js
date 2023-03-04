import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const booksAPI = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/VUqoXEBLxjrzkWMVNCqp/books/';

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
  try {
    const res = await fetch(booksAPI + id, {
      method: 'DELETE',
    });
    if (await !res.ok || (/Weird/).test(await res.text())) {
      console.log(res.ok);
      console.log('Error FOUND');
      console.log(res.statusText);
      console.log(res);
      throw new Error(`Refresh the page, the operation failed`);
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
  return newBook;
};

const returnStatus = (type, state, action) => {
  switch (type) {
    case 'pending':
      return {...state, status: {...state.status, loading:true, error: ''}}
    case 'fulfilled':
      return {...state, status: {...state.status, loading:false, error: ''}}
    case 'rejected':
      return {...state, status: {...state.status, loading:false, error: action.error.message || 'The operation has failed'}}
    default:
      break;
  }
}

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
      .addCase(getData.pending, (state) => {
        return returnStatus('pending', state)
      })
      .addCase(getData.fulfilled, (state, action) => {
        const bookList = action.payload;
        const bookArr = Object.entries(bookList);
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
        return { ...state, bookList: [...state.bookList, ...newBooks], status: {...state.status, loading:false, error: ''}};
      })
      .addCase(getData.rejected, (state, action) => {
        return returnStatus('rejected', state, action)
      })

      .addCase(addData.pending, (state) => {
        return returnStatus('pending', state)

      })
      .addCase(addData.fulfilled, (state) => {
        return returnStatus('fulfilled', state)
      })
      .addCase(addData.rejected, (state, action) => {
        return returnStatus('rejected', state, action)
      })

      .addCase(delData.pending, (state) => {
        return returnStatus('pending', state)

      })
      .addCase(delData.fulfilled, (state) => {
        return returnStatus('fulfilled', state)


      })
      .addCase(delData.rejected, (state, action) => {
        return returnStatus('rejected', state, action)
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
      console.log(action.payload);
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
