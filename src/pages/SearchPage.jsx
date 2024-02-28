import React from 'react'
import { useEffect } from 'react'

const SearchPage = () => {

  useEffect(() => {
    document.title = 'Search Results';
  }, []);

  return (
    <div>SearchPage</div>
  )
}

export default SearchPage