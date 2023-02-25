import React from 'react';
import Button from './Button';

function AddBook() {
  return (
    <footer className="flex justify-center items-center">
      <div className="w-[80%] p-4 border-t border-t-slate-300 space-y-4">
        <h2 className="text-slate-500">
          ADD NEW BOOK
        </h2>
        <div className="flex justify-between items-center">
          <input type="text" placeholder="Book title" className="w-1/2 h-10 pt-2 pb-1.5 px-4" />
          <input type="text" placeholder="Book author" className="w-1/4 h-10 pt-2 pb-1.5 px-4" />
          <Button title="ADD BOOK" />
        </div>
      </div>
    </footer>
  );
}

export default AddBook;
