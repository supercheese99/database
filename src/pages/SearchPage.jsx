// SearchPage.jsx
import React from 'react';
import SearchBar from '../components/SearchBar';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppRouter from '../routers/AppRouter';

const SearchPage = ({ searchResults }) => {
  const { query } = useParams();

  function buildImage(path, size) {
    return `http://image.tmdb.org/t/p/${size}${path}`;
};

  return (
    <>
    <h2>Search Results for: "{query}"</h2>


    <div className="grid-container">

      {searchResults && searchResults.map((item) => {

        const image = buildImage(item.poster_path, "w500");

        return (
          <div className="movie-item">
            <Link to={`/movie/${item.id}`}>

              <img src={image} className='movie-list-image' />

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