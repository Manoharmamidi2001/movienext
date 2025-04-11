import React from 'react'
import { useLocation } from 'react-router-dom'

const SearchPage = () => {
    const location = useLocation('')

    console.log('location', location);
    
  return (
    <div>
      Search
    </div>
  )
}

export default SearchPage
