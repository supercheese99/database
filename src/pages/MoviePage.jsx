import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';
import MovieList from '../components/MovieList';
import { format } from 'date-fns';
import Recommended from '../components/Recommended';
import { useFavorites } from '../components/FavoritesContext';

const MoviePage = () => {

  const {id} = useParams();
  const [movieData, setMovieData] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();
  const [showFullCast, setShowFullCast] = useState(false);

  const apiKey = 'db9961badca6dffe6a5b761b090bdc89';

  // fave icons
  const HeartXFilledSVG = () => (
    <svg className="svg-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path  fill="currentColor" d="m14.123 19.336c-.468.453-.944.913-1.426 1.381-.194.189-.446.283-.697.283s-.503-.094-.697-.283c-4.958-4.813-9.303-8.815-9.303-12.54 0-5.659 7.376-6.978 10-2.461 2.604-4.483 10-3.217 10 2.461 0 .68-.144 1.369-.41 2.07-1.061-1.02-2.503-1.648-4.089-1.648-3.257 0-5.9 2.644-5.9 5.9 0 2 .997 3.77 2.522 4.837zm3.377-9.336c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5zm.707 4.5s.642-.642 1.061-1.061c.187-.187.187-.519 0-.707-.188-.187-.52-.187-.707 0-.419.419-1.061 1.061-1.061 1.061s-.642-.642-1.061-1.061c-.187-.187-.519-.187-.707 0-.187.188-.187.52 0 .707.419.419 1.061 1.061 1.061 1.061s-.642.642-1.061 1.061c-.187.187-.187.519 0 .707.188.187.52.187.707 0 .419-.419 1.061-1.061 1.061-1.061s.642.642 1.061 1.061c.187.187.519.187.707 0 .187-.188.187-.52 0-.707-.419-.419-1.061-1.061-1.061-1.061z" fill-rule="nonzero"/></svg>
);

const HeartPlusLinedSVG = () => (
    <svg className="svg-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m14.121 19.337c-.467.453-.942.912-1.424 1.38-.194.189-.446.283-.697.283s-.503-.094-.697-.283c-4.958-4.813-9.303-8.815-9.303-12.54 0-3.348 2.582-5.177 5.234-5.177 1.831 0 3.636.867 4.766 2.563 1.125-1.688 2.935-2.554 4.771-2.554 2.649 0 5.229 1.815 5.229 5.168 0 .681-.144 1.37-.411 2.072-.375-.361-.798-.673-1.258-.925.113-.393.169-.773.169-1.147 0-2.52-1.933-3.668-3.729-3.668-1.969 0-3.204 1.355-4.159 2.694-.141.197-.369.314-.612.314-.243-.001-.471-.119-.611-.317-.953-1.347-2.165-2.699-4.155-2.7-.985 0-1.937.346-2.61.95-.735.658-1.124 1.602-1.124 2.727 0 2.738 3.046 5.842 8.5 11.127.346-.336.682-.663 1.007-.981.327.383.701.724 1.114 1.014zm3.38-9.335c2.58 0 4.499 2.107 4.499 4.499 0 2.58-2.105 4.499-4.499 4.499-2.586 0-4.5-2.112-4.5-4.499 0-2.406 1.934-4.499 4.5-4.499zm.5 3.999v-1.5c0-.265-.235-.5-.5-.5-.266 0-.5.235-.5.5v1.5h-1.5c-.266 0-.5.235-.5.5s.234.5.5.5h1.5v1.5c0 .265.234.5.5.5.265 0 .5-.235.5-.5v-1.5h1.499c.266 0 .5-.235.5-.5s-.234-.5-.5-.5z" fill-rule="nonzero"/></svg>
);

  useEffect(() => {
    document.title = 'Movie';
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        setMovie(response.data);
        setLoading(false); // Update loading state
      } catch (error) {
        setError(error); // Set error state
        setLoading(false); // Update loading state even in case of error
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      }
    };

    if (movie) {
      fetchMovieCredits();
    }
  }, [id, movie]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  const isFavorite = movie && favorites.some(fav => fav.id === movie.id);

  const handleToggleFavorite = () => {
    if (movie) {
      if (isFavorite) {
        removeFromFavorites(movie.id);
      } else {
        addToFavorites(movie);
      }
    }
  };

// display only some cast members by default
const handleToggleCast = () => {
  setShowFullCast(!showFullCast);
};

// access the movie data
  const {original_title, overview, poster_path, release_date, vote_average, original_language, genres} = movie;

// get the image, display default no-image image if there's no custom one
  function buildImage(path, size) {
    return path ? `http://image.tmdb.org/t/p/${size}${path}` : '/no-image.png';
};

function buildCastImage(path) {
  return path ? `https://image.tmdb.org/t/p/w200${path}` : '/no-image.png';
  };

// display only one decimal place
  const roundToOneDecimal = (number) => {
    return number.toFixed(1);
  };

const formattedDate = format(new Date(release_date), 'MMMM dd, yyyy');
const roundedVoteAverage = roundToOneDecimal(vote_average);
const image = buildImage(poster_path, "w500");

  return (
    <>
    <h1>{original_title}</h1>
    
    <div className="movie-container">
      <div>
        <img src={image} alt={original_title} className="single-img" />
      </div>

      <div>
          <div className="info-tidbits">
            <p className="release-date">Release Date: <span>{formattedDate}</span></p>
            <p className="language">Language: <span>{original_language}</span></p>
            <p className="genres">Genres: <span>{genres.map(genre => genre.name).join(', ')}</span></p>
            <h2 className="rating">Rating: <span>{roundedVoteAverage}</span></h2>

            <div className="favorite-button-wrapper">
              <button className="favorite-button" onClick={() => handleToggleFavorite(movie)}>
                  {isFavorite ? <HeartXFilledSVG /> : <HeartPlusLinedSVG />}
              </button>
            </div>

            <p>{overview}</p>
          </div>
      </div>

    </div>

    <div className="cast-container">
        <h2>Cast</h2>
        <div className="cast-list">
          {(showFullCast ? cast : cast.slice(0, 5)).map((actor) => {
            const castImage = buildCastImage(actor.profile_path);

            return (
              <div className="actor" key={actor.id}>
              <img src={castImage} alt={actor.name} />
              <div>
                <h3>{actor.name}</h3>
                <p>{actor.character}</p>
              </div>
            </div>
            );
          })}
        </div>
        {cast.length > 5 && (
          <button onClick={handleToggleCast} className="see-more-button">
            {showFullCast ? 'See Less' : 'See More'}
          </button>
        )}
      </div>
    {/* <Recommended /> */}
    </>
  )
}

export default MoviePage