import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="flex justify-center items-center m-8">
      <h2>
        This is the home page,
        {' '}
        <Link className=" text-blue-700" to="/books">click here to see all books</Link>
      </h2>
    </main>
  );
}

export default Home;
