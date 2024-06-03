import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../components/FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites();

  useEffect(() => {
    document.title = 'Favorites';
  }, []);

    // building the poster image of a movie
    function buildImage(path, size) {
      return `http://image.tmdb.org/t/p/${size}${path}`;
  }

  return (
    <div className="favorites-wrapper">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <div className="no-fave">
          <p>No favorite movies yet. Add some from the <Link to='/'>Movie List!</Link></p>
        </div>
      ) : (
        <ul>
          {favorites.map((movie) => (
            // const image = buildImage(poster_path, "w500");
        <Link to={`/movie/${movie.id}`}>
          {/* <img src={image} className="movie-list-img" /> */}
          <li key={movie.id}>{movie.title}</li>
        </Link>

            
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
