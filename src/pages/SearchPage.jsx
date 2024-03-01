import React from 'react'
import { useEffect } from 'react'
import SearchBar from '../components/SearchBar';

const SearchPage = () => {

  useEffect(() => {
    document.title = 'Search Results';
  }, []);

  return (
    <div>SearchPage</div>
  )
}

export default SearchPage