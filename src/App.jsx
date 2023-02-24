import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import BookList from "./components/BookList";

const books = [
  {
    id: 1,
    category: 'Horror',
    title: 'A Horror Title',
    author: 'Person Named',
    completion: 50,
    chapter: '1',
  },{
    id: 2,
    category: 'Action',
    title: 'Action Title',
    author: 'Person Named',
    completion: 50,
    chapter: '1',
  },{
    id: 3,
    category: 'Food',
    title: 'Food Book',
    author: 'Person Named',
    completion: 50,
    chapter: '1',
  }
]

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<BookList bookItem={books}/>}/>
      </Route>
    </Routes>
  );
}

export default App;
