import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppRouter from '../routers/AppRouter';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const apiKey = 'db9961badca6dffe6a5b761b090bdc89';

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
      const data = await response.json();

      console.log('Search results:', data.results);

      onSearch(query);

      // Navigate to the page with search results
      navigate(`/search/${query}`);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        id="search-bar"
      />
      <button onClick={handleSearch} id="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;