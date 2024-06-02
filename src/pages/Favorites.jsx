import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../components/FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites();

  useEffect(() => {
    document.title = 'Favorites';
  }, []);

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
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
