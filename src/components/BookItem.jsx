import React from 'react';
import Button from './Button';
import { Chart } from './Chart';

function BookItem({book}) {
  return(
    <li className='flex justify-between content-center p-8 bg-white rounded-md border border-slate-200'>
          <div className='space-y-4'>
            <div>
              <h3>{book.category}</h3>
              <h2>{book.title}</h2>
              <h5>{book.author}</h5>
            </div>
            <div className='flex justify-between space-x-4'>
              <h5>Comments</h5>
              <span>|</span>
              <h5>Remove</h5>
              <span>|</span>
              <h5>Edit</h5>
            </div>
          </div>
          <div className='flex justify-between items-center space-x-8'>
            <div className='flex justify-between items-center space-x-4'>
              <div className='w-20'>
                <Chart data={book.completion}/>
              </div>
              <div className='text-center'>
                <h6>
                  {book.completion+'%'}
                </h6>
                <p>
                  Completed
                </p>
              </div>
            </div>
            <span className='bg- bg-slate-300 w-1 h-3/4'></span>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <h4>
                  CURRENT CHAPTER
                </h4>
                <p>
                  Chapter {book.chapter}
                </p>
              </div>
              <Button title='UPDATE PROGRESS' />
            </div>
          </div>
        </li>
  )
}

export default BookItem