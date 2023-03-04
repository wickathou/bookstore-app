import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { getData } from './redux/books/booksSlice';

import './index.css';
import App from './App';

store.dispatch(getData());

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/bookstore-app">
      <Provider store={store}>

        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
