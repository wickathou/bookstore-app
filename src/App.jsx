import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
import BookList from './routes/BookList';
import Home from './routes/Home';
import Categories from './routes/Categories';
import NotFound from './routes/NotFound';

// const books = [
//   {
//     id: 1,
//     category: 'Horror',
//     title: 'A Horror Title',
//     author: 'Person Named',
//     completion: 50,
//     chapter: '1',
//   }, {
//     id: 2,
//     category: 'Action',
//     title: 'Action Title',
//     author: 'Person Named',
//     completion: 50,
//     chapter: '1',
//   }, {
//     id: 3,
//     category: 'Food',
//     title: 'Food Book',
//     author: 'Person Named',
//     completion: 50,
//     chapter: '1',
//   },
// ];

function App() {
  const { bookList, filterSettings, status } = useSelector((store) => store.books);
  const { filterApplied, filterSet } = filterSettings;
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<BookList books={filterApplied ? filterSet : bookList} filtered={filterApplied} status={status} />} />
        <Route path="categories" element={<Categories />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
