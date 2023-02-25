import React from 'react';
import PropTypes from 'prop-types';
import AddBook from './AddBook';
import BookItem from './BookItem';

function BookList({ bookItem }) {
  return (
    <>
      <main className="flex justify-center">
        <ul className="w-[80vw] p-4 space-y-4 my-4">
          {bookItem.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </ul>
      </main>
      <AddBook />
    </>
  );
}

BookList.defaultProps = {
  bookItem: [],
};

BookList.propTypes = {
  bookItem: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    completion: PropTypes.number,
    chapter: PropTypes.string,
  })),
};

export default BookList;
