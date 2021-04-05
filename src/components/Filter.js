import React from 'react'


export const Filter = ({ term, handleSearch }) => {


  return (
    <>
      filtering shown with <input className="" type="text" value={term} onChange={handleSearch} />
    </>
  )
}