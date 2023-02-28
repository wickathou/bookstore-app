import React from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { addBook } from '../redux/books/booksSlice';

function AddBook() {
  const dispatch = useDispatch();
  const newBook = () => ({
    title: document.querySelector('#newBookTitle').value,
    author: document.querySelector('#newBookAuthor').value,
  });
  return (
    <footer className="flex justify-center items-center">
      <div className="w-[80%] p-4 border-t border-t-slate-300 space-y-4">
        <h2 className="text-slate-500">
          ADD NEW BOOK
        </h2>
        <div className="flex justify-between items-center">
          <input type="text" placeholder="Book title" className="w-1/2 h-10 pt-2 pb-1.5 px-4" id="newBookTitle" />
          <input type="text" placeholder="Book author" className="w-1/4 h-10 pt-2 pb-1.5 px-4" id="newBookAuthor" />
          <Button title="ADD BOOK" onDispatch={() => dispatch(addBook(newBook()))} />
        </div>
      </div>
    </footer>
  );
}

export default AddBook;
