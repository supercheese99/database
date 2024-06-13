import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import AppRouter from '../routers/AppRouter';
import { Link } from 'react-router-dom';
import Carousel from './Slides';
import { format } from 'date-fns';
import { useFavorites } from '../components/FavoritesContext';

const MovieList = () => {

    const [movieData, setMovieData] = useState([]);
    const [movie, setMovie] = useState(null);
    const [categoryName, setCategoryName] = useState([]);
    const apiKey = 'db9961badca6dffe6a5b761b090bdc89';
    const { addToFavorites, removeFromFavorites, favorites } = useFavorites();

    // displays the initial list of movies (I chose it to be the popular movies)
    useState(() => {
        getPopularMovieData("movie");
    }, ([]));

    // getting the popular movie data (works on button click)
    async function getPopularMovieData(type) {
        try {

            let resp = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
            console.log(21, resp.data.results);

            setMovieData(resp.data.results);
            setCategoryName("Popular");

        } catch (e) {

        } finally {

        }
    }

    // getting the now playing list
    async function getNowPlayingMovieData(type) {
        try {
            
            let resp = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
            console.log(21, resp.data.results);

            setMovieData(resp.data.results);
            setCategoryName("Now Playing");

        } catch (e) {

        } finally {

        }
    }

    // getting upcoming movie data
    async function getUpcomingMovieData(type) {
        try {

            let resp = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`);
            console.log(21, resp.data.results);

            setMovieData(resp.data.results);
            setCategoryName("Upcoming");

        } catch (e) {

        } finally {

        }
    }

    // getting top rated
    async function getTopRatedMovieData(type) {
        try {

            let resp = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
            console.log(21, resp.data.results);

            setMovieData(resp.data.results);
            setCategoryName("Top Rated");

        } catch (e) {

        } finally {

        }
    }

    // building the poster image of a movie
    function buildImage(path, size) {
        return `http://image.tmdb.org/t/p/${size}${path}`;
    }

    // display only one decimal place
    const roundToOneDecimal = (number) => {
    return number.toFixed(1);
  };

  const handleToggleFavorite = (movie) => {
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="background-container">
        
        <div className="button-container">
            <button onClick={() => {
            getPopularMovieData("movie");
            }}>Popular</button>

            <button onClick={() => {
            getNowPlayingMovieData("movie");
            }}>Now Playing</button>

            <button onClick={() => {
            getTopRatedMovieData("movie");
            }}>Top Rated</button>

            <button onClick={() => {
            getUpcomingMovieData("movie");
            }}>Upcoming</button>
        </div>

        <div className="category-name">
            <h2>{categoryName}</h2>
        </div>

        <div className="grid-container">
            {movieData.map((movie) => {
                const image = buildImage(movie.poster_path, "w500");
                const formattedDate = format(new Date(movie.release_date), 'MMMM dd, yyyy');
                const roundedVoteAverage = roundToOneDecimal(movie.vote_average);
                const isFavorite = movie && favorites.some(fav => fav.id === movie.id);

                    return (
                        <div className="movie-item" >

                            <div className="vote-title">
                                <div>
                                    <h3>{movie.original_title ? movie.original_title : movie.original_name}</h3>
                                </div>
                            </div>

                            <Link to={`/movie/${movie.id}`}>
                                <img src={image} className="movie-list-img" />
                            </Link>

                            <div>
                                <h3 className="vote-title single-vote">{roundedVoteAverage}</h3>
                            </div>

                            <div>
                                <p className="release-date">{formattedDate}</p>
                            </div>

                            <button onClick={() => handleToggleFavorite(movie)} className="fave-button">
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>

                        </div>
                    )
                }
        
            )}

        </div>
    </div>
  )
}

export default MovieList