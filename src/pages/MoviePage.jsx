import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';
import MovieList from '../components/MovieList';
import Carousel from '../components/Carousel';

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
  const {original_title, overview, poster_path} = movieData;


//  function to get the image
  function buildImage(path, size) {
    return `http://image.tmdb.org/t/p/${size}${path}`;
}


  return (
    <div className="movie-container">

      <img src={`http://image.tmdb.org/t/p/w500${poster_path}`} alt={original_title} />
      <div className='movie-info'>
        <h2>{original_title}</h2>
        <p>{overview}</p>
      </div>

    </div>
  )
}

export default MoviePage