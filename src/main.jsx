import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import {addData, delData, getData} from './redux/books/booksSlice';

// store.dispatch(addData({
//   'item_id': 'item21',
//   'title': 'random title',
//   'author': 'rando',
//   'category': 'somecat',
// }))

// store.dispatch(delData('item18'))
store.dispatch(getData())

import './index.css';
import App from './App';

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
