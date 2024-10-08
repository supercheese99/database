// SearchPage.jsx
import React from 'react';
import SearchBar from '../components/SearchBar';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AppRouter from '../routers/AppRouter';

const SearchPage = ({ searchResults }) => {
  const { query } = useParams();
  const [searchData, setSearchData] = useState([]);
  console.log('Received search results:', query);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const handleSearch = async() => {
    try {
      const resp = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);

      console.log('Search results from API:', resp.data.results);
      setSearchData(resp.data.results);

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]); // added 'query' to the square brackets

  function buildImage(path, size) {
    return path ? `http://image.tmdb.org/t/p/${size}${path}` : '/no-image.png';
  };

  return (
    <>
    <h2>Search Results for: "{query}"</h2>


    <div className="grid-container">

      {searchData && searchData.map((item) => {

        const image = buildImage(item.poster_path, "w500");

        return (
          <div className="movie-item">
            <Link to={`./movie/${item.id}`}>

              <img src={image} alt={item.original_title || item.original_name} className='movie-list-img' />

              <div className="movie-name">
                <h3>{item.original_title ? item.original_title : item.original_name}</h3>
              </div>

            </Link>
          </div>
        );

      })}
      
      <ul>
        {searchResults && searchResults.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      
    </div>

    </>
  );
};

export default SearchPage;