import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  return(
    <header className='flex justify-center h-[10vh] border border-b border-b-slate-200 bg-white'>
      <nav className='flex justify-between items-center p-4 w-[80vw]'>
        <div className='flex justify-between items-center space-x-8'>
          <h1>Bookstore CMS</h1>
          <ul className='flex justify-between items-center space-x-4'>
            <li><Link>Books</Link></li>
            <li><Link>Categories</Link></li>
          </ul>
        </div>
        <div className='flex justify-center items-center rounded-full border-slate-300 border w-10 h-10'>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </nav>
    </header>
  )
}

export default Navbar