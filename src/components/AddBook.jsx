import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { addBook } from '../redux/books/booksSlice';

function AddBook() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const updateTitle = (e) => {
    setTitleInput(e.target.value);
  };
  const updateAuthor = (e) => {
    setAuthorInput(e.target.value);
  };
  const updateCategory = (e) => {
    setCategoryInput(e.target.value);
  };

  const newBook = {
    title: titleInput,
    author: authorInput,
    category: categoryInput,
  };
  return (
    <footer className="flex justify-center items-center">
      <div className="w-[80%] p-4 border-t border-t-slate-300 space-y-4">
        <h2 className="text-slate-500">
          ADD NEW BOOK
        </h2>
        <div className="flex justify-between items-center">
          <input type="text" placeholder="Book title" onChange={updateTitle} className="w-1/4 h-10 pt-2 pb-1.5 px-4" value={titleInput} />
          <input type="text" placeholder="Book author" onChange={updateAuthor} className="w-1/4 h-10 pt-2 pb-1.5 px-4" value={authorInput} />
          <input type="text" placeholder="Book category" onChange={updateCategory} className="w-1/4 h-10 pt-2 pb-1.5 px-4" value={categoryInput} />
          <div>
            <Button
              title="ADD BOOK"
              onDispatch={() => {
                if (newBook.title.trim() && newBook.author.trim()) {
                  setMessage('');
                  setTitleInput('');
                  setAuthorInput('');
                  setCategoryInput('');
                  dispatch(addBook(newBook));
                } else {
                  setMessage('Fill all info');
                }
              }}
            />
            <div>{message}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AddBook;
