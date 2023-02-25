import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="flex justify-center items-center m-8">
      <h2>
        404! quick, click here!
        {' '}
        <Link className=" text-blue-700" to="/books">Go to /books</Link>
      </h2>
    </main>
  );
}

export default NotFound;
