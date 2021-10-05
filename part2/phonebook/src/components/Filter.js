import React from 'react';

const Filter = ({ value, handleChange }) => {
  return (
    <>
      filter shown with <input value={ value } onChange={ handleChange } />
    </>
  )
}

export default Filter;
