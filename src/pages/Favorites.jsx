import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../components/FavoritesContext';

const Favorites = () => {
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();

  useEffect(() => {
    document.title = 'Favorites';
  }, []);

    // building the poster image of a movie
    function buildImage(path, size) {
      return `http://image.tmdb.org/t/p/${size}${path}`;
  }

  // making sure one can remove a movie from their favorites list from the
  // list level, instead of going to the single movie page to do that
  const handleToggleFavorite = (movie) => {
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="favorites-wrapper">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <div className="no-fave">
          <p>No favorite movies yet. Add some from the <Link to='/'>Movie List!</Link></p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => {
            const image = buildImage(movie.poster_path, "w500");
            const isFavorite = movie && favorites.some(fav => fav.id === movie.id);
            return (
              <div key={movie.id} className="favorite-item">
                <Link to={`/movie/${movie.id}`}>
                  <img src={image} alt={movie.title} className="movie-list-img" />
                  <div className="favorite-title">{movie.title}</div>
                </Link>
                <button onClick={() => handleToggleFavorite(movie)} className="fave-button">
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
