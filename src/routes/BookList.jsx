import React from 'react';
import PropTypes from 'prop-types';
import AddBook from '../components/AddBook';
import BookItem from '../components/BookItem';
import Button from '../components/Button';
import { clearFilters } from '../redux/books/booksSlice';
import { useDispatch } from 'react-redux';

function BookList({books, filtered}) {
  const dispatch = useDispatch();
  return (
    <>
      <main className="flex flex-col items-center">
        {filtered ? <Button title='Clear all filters' onDispatch={()=> dispatch(clearFilters())}/> : ''}
        <ul className="w-[80vw] p-4 space-y-4 my-4">
          {books.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </ul>
      </main>
      <AddBook />
    </>
  );
}

BookList.defaultProps = {
  books: [],
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string,
    country: PropTypes.string.isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    completion: PropTypes.number,
    chapter: PropTypes.string,
  })),
};

export default BookList;
