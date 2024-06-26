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

// fave icons
const HeartXFilledSVG = () => (
  <svg className="svg-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path  fill="currentColor" d="m14.123 19.336c-.468.453-.944.913-1.426 1.381-.194.189-.446.283-.697.283s-.503-.094-.697-.283c-4.958-4.813-9.303-8.815-9.303-12.54 0-5.659 7.376-6.978 10-2.461 2.604-4.483 10-3.217 10 2.461 0 .68-.144 1.369-.41 2.07-1.061-1.02-2.503-1.648-4.089-1.648-3.257 0-5.9 2.644-5.9 5.9 0 2 .997 3.77 2.522 4.837zm3.377-9.336c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5zm.707 4.5s.642-.642 1.061-1.061c.187-.187.187-.519 0-.707-.188-.187-.52-.187-.707 0-.419.419-1.061 1.061-1.061 1.061s-.642-.642-1.061-1.061c-.187-.187-.519-.187-.707 0-.187.188-.187.52 0 .707.419.419 1.061 1.061 1.061 1.061s-.642.642-1.061 1.061c-.187.187-.187.519 0 .707.188.187.52.187.707 0 .419-.419 1.061-1.061 1.061-1.061s.642.642 1.061 1.061c.187.187.519.187.707 0 .187-.188.187-.52 0-.707-.419-.419-1.061-1.061-1.061-1.061z" fill-rule="nonzero"/></svg>
);

const HeartPlusLinedSVG = () => (
  <svg className="svg-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m14.121 19.337c-.467.453-.942.912-1.424 1.38-.194.189-.446.283-.697.283s-.503-.094-.697-.283c-4.958-4.813-9.303-8.815-9.303-12.54 0-3.348 2.582-5.177 5.234-5.177 1.831 0 3.636.867 4.766 2.563 1.125-1.688 2.935-2.554 4.771-2.554 2.649 0 5.229 1.815 5.229 5.168 0 .681-.144 1.37-.411 2.072-.375-.361-.798-.673-1.258-.925.113-.393.169-.773.169-1.147 0-2.52-1.933-3.668-3.729-3.668-1.969 0-3.204 1.355-4.159 2.694-.141.197-.369.314-.612.314-.243-.001-.471-.119-.611-.317-.953-1.347-2.165-2.699-4.155-2.7-.985 0-1.937.346-2.61.95-.735.658-1.124 1.602-1.124 2.727 0 2.738 3.046 5.842 8.5 11.127.346-.336.682-.663 1.007-.981.327.383.701.724 1.114 1.014zm3.38-9.335c2.58 0 4.499 2.107 4.499 4.499 0 2.58-2.105 4.499-4.499 4.499-2.586 0-4.5-2.112-4.5-4.499 0-2.406 1.934-4.499 4.5-4.499zm.5 3.999v-1.5c0-.265-.235-.5-.5-.5-.266 0-.5.235-.5.5v1.5h-1.5c-.266 0-.5.235-.5.5s.234.5.5.5h1.5v1.5c0 .265.234.5.5.5.265 0 .5-.235.5-.5v-1.5h1.499c.266 0 .5-.235.5-.5s-.234-.5-.5-.5z" fill-rule="nonzero"/></svg>
);

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
      <div>
        <h1>Favorites</h1>
      </div>
      {favorites.length === 0 ? (
        <div className="no-fave">
          <p>No favorite movies yet. Add some from the <Link to='/SuperMovies'>Movie List!</Link></p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => {
            const image = buildImage(movie.poster_path, "w500");
            const isFavorite = movie && favorites.some(fav => fav.id === movie.id);

            return (
              <div key={movie.id} className="favorite-item">
                <Link to={`/SuperMovies/movie/${movie.id}`}>
                  <img src={image} alt={movie.title} className="movie-list-img" />
                </Link>

                <p className="favorite-title"> {movie.title} </p>

                <button className="favorite-button" onClick={() => handleToggleFavorite(movie)}>
                  {isFavorite ? <HeartXFilledSVG /> : <HeartPlusLinedSVG />}
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
