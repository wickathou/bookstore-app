import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { checkStatus } from '../redux/categories/categoriesSlice';

// checked ? 'Status checked' : 'null'

function Categories() {
  const { checked } = useSelector((store) => store.categories);
  const dispatch = useDispatch();
  return (
    <main className="flex justify-center items-center m-8">
      <Button type="button" title={checked ? 'STATUS CHECKED' : 'UPDATE PROGRESS'} onDispatch={() => dispatch(checkStatus())} />
    </main>
  );
}

export default Categories;
