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
    <div className="movie-container">
      <h1>{original_title}</h1>
      <img src={image} alt={original_title} className="single-img" />

      <div className='movie-details'>
        <div>
          <div className="genres">
            <p className="release-date">Release Date: {formattedDate}</p>
            <p className="language">Language: {original_language}</p>
            <p className="genres">Genres: {genres.map(genre => genre.name).join(', ')}</p>
          </div>

          <div className="rating-favorite">
            <h2 className="rating">Rating: {roundedVoteAverage}</h2>
            <button onClick={handleToggleFavorite} className="favorite-button">
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>

        <p>{overview}</p>
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