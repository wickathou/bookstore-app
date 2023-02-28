import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { Chart } from './Chart';
import {useDispatch} from 'react-redux';
import {addBook, removeBook} from '../redux/books/booksSlice'

function BookItem({ book }) {
  const dispatch = useDispatch()
  return (
    <li className="flex justify-between content-center p-8 bg-white rounded-md border border-slate-200">
      <div className="space-y-4">
        <div>
          <h3>{book.category}</h3>
          <h2>{book.title}</h2>
          <h5>{book.author}</h5>
        </div>
        <div className="flex justify-between space-x-4">
          <h5>Comments</h5>
          <span>|</span>
          <h5 onClick={()=>dispatch(removeBook())}>Remove</h5>
          <span>|</span>
          <h5>Edit</h5>
        </div>
      </div>
      <div className="flex justify-between items-center space-x-8">
        <div className="flex justify-between items-center space-x-4">
          <div className="w-20">
            <Chart data={book.completion} />
          </div>
          <div className="text-center">
            <h6>
              {`${book.completion}%`}
            </h6>
            <p>
              Completed
            </p>
          </div>
        </div>
        <span className=" bg-slate-300 w-1 h-3/4" />
        <div className="space-y-4">
          <div className="space-y-2">
            <h4>
              CURRENT CHAPTER
            </h4>
            <p>
              Chapter
              {' '}
              {book.chapter}
            </p>
          </div>
          <Button title="UPDATE PROGRESS" onDispatch={()=>dispatch(addBook())}/>
        </div>
      </div>
    </li>
  );
}

BookItem.defaultProps = {
  book: {},
};

BookItem.propTypes = {
  book: {
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    completion: PropTypes.number.isRequired,
    chapter: PropTypes.string.isRequired,
  },
};

export default BookItem;
