import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';
import MovieList from '../components/MovieList';
import { format } from 'date-fns';
import Recommended from '../components/Recommended';

const MoviePage = () => {

  // const id = useParams().id;
  const {id} = useParams();
  console.log("Item:", id);

  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'db9961badca6dffe6a5b761b090bdc89';

  useEffect(() => {
    document.title = 'Movie';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        setMovieData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, apiKey]);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error!</div>
  }

// access the movie data
  const {original_title, overview, poster_path, release_date, vote_average} = movieData;


//  function to get the image
  function buildImage(path, size) {
    return `http://image.tmdb.org/t/p/${size}${path}`;
}
// display only one decimal place
  const roundToOneDecimal = (number) => {
    return number.toFixed(1);
};

const formattedDate = format(new Date(release_date), 'MMMM dd, yyyy');
const roundedVoteAverage = roundToOneDecimal(vote_average);

// favouriting movies
  const handleAddToFavorites = (movie) => {
    addToFavorites(movie);
  };


  return (
    <>
    <div className="movie-container">

      <img src={`http://image.tmdb.org/t/p/w500${poster_path}`} alt={original_title} className="single-img" />
      <div className='movie-info'>
        <h1>{original_title}</h1>

        <div>
          <p className="release-date">Release Date: {formattedDate}</p>
          <div className="vote-fave">
            <h2 className="single-vote">{roundedVoteAverage}</h2>
            <button onClick={() => handleAddToFavorites({ id: movieData.id, title: movieData.original_title })} className="fave-button">
                Add to Favorites
            </button>
          </div>
          
        </div>

        <p>{overview}</p>
      </div>

    </div>
    <Recommended />
    </>
  )
}

export default MoviePage