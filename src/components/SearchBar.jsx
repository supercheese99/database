import React, {useState} from 'react'


const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
      
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
      
    const handleSearch = () => {
        // Call a callback function to perform the search with the current query
        onSearch(query);
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