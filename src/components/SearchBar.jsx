import React from 'react'
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"


const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const apiKey = 'db9961badca6dffe6a5b761b090bdc89';
      
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
      
    const handleSearch = async () => {
      try {
        onSearch(query);

        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
        const data = await response.json();

        console.log('Search results:', data.results);

        // navigate to the page with search results
        navigate(`search/${query}`);
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
      <button onClick={handleSearch} id="search-button">Search</button>
    </div>
  );
};

export default SearchBar