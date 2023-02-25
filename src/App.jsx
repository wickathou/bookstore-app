import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BookList from './components/BookList';
import Home from './routes/Home';
import Categories from './routes/Categories';
import NotFound from './routes/NotFound';

const books = [
  {
    id: 1,
    category: 'Horror',
    title: 'A Horror Title',
    author: 'Person Named',
    completion: 50,
    chapter: '1',
  }, {
    id: 2,
    category: 'Action',
    title: 'Action Title',
    author: 'Person Named',
    completion: 50,
    chapter: '1',
  }, {
    id: 3,
    category: 'Food',
    title: 'Food Book',
    author: 'Person Named',
    completion: 50,
    chapter: '1',
  },
];

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<BookList bookItem={books} />} />
        <Route path="categories" element={<Categories />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
