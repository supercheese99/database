import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppRouter from '../routers/AppRouter';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  // const [result, setResult] = useState([]);
  const navigate = useNavigate();

  const apiKey = 'db9961badca6dffe6a5b761b090bdc89';

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const resp = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
      console.log('Search results from API:', resp.data.results);
      if (typeof onSearch === 'function') {
        onSearch(resp.data.results); // Pass search results back to the parent
      } else {
        console.error('onSearch is not a function');
      }
      navigate(`/search/${query}`); // Navigate to the search results page
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <form onSubmit={handleSearch}> 
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        id="search-bar"
      />
      <input id="search-button" type="submit" value="Search">
      </input>
    </form>
  );
};

export default SearchBar;