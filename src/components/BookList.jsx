import React from 'react';
import AddBook from './AddBook';
import BookItem from './BookItem';



function BookList({bookItem}) {
  return(
    <>
      <main className='flex justify-center'>
        <ul className='w-[80vw] p-4 space-y-4 my-4'>
          {bookItem.map((book) => (
            <BookItem key={book.id} book={book}/>
          ))}
        </ul>
      </main>
      <AddBook/>
    </>
  )
}

export default BookList