import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import AddBook from '../components/AddBook';
import BookItem from '../components/BookItem';
import Button from '../components/Button';
import { clearFilters } from '../redux/books/booksSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';


function BookList({ books, filtered, status }) {
  const dispatch = useDispatch();
  let content;
  if (books.length > 0) {
    content = books.map((book) => <BookItem key={book.item_id} book={book} />);
  } else {
    content = <h3>Add your books!</h3>;
  }
  return (
    <>
      <main className="flex flex-col items-center space-y-2">
        {filtered ? <Button title="Clear all filters" onDispatch={() => dispatch(clearFilters())} /> : ''}
        {status.loading ? <FontAwesomeIcon icon={faSpinner} /> : 'test'}
        <div className='space-x-4'>{status.error.trim() ? <FontAwesomeIcon icon={faXmark} /> : ''}<span>{status.error}</span></div>
        <ul className="w-[80vw] p-4 space-y-4 my-4">
          {content}
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
    item_id: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    completion: PropTypes.number,
    chapter: PropTypes.string,
  })),
  filtered: PropTypes.bool.isRequired,
};

export default BookList;
