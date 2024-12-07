import React from 'react'

const SearchItem = ({searchItem,setSearchItem}) => {
  return (
    <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="search"></label>
        <input
         type="text"
         id='search'
         role='searchbox'
         placeholder='Search Item'
         value={searchItem}
         onChange={(e)=>setSearchItem(e.target.value)}
          />

    </form>
  )
}

export default SearchItem