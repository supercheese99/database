import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import AppRouter from '../routers/AppRouter';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import { format } from 'date-fns';

const MovieList = () => {

    const [movieData, setMovieData] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const apiKey = 'db9961badca6dffe6a5b761b090bdc89';

    // used to be useEffect, but I thought I should use useState as I'm using it above
    // tbh I don't remember what it does
    useState(() => {
        getPopularMovieData("movie");
    }, ([]));

    // getting the popular movie data
    async function getPopularMovieData(type) {
        try {

            let resp = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
            console.log(21, resp.data.results);

            setMovieData(resp.data.results);
            setCategoryName("Popular");

            // const image = buildImage(resp.data.results[0].poster_path, "w500");
            // console.log(image);

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

    // getting Upcoming movie data
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


    function buildImage(path, size) {
        return `http://image.tmdb.org/t/p/${size}${path}`;
    }

    // display only one decimal place
    const roundToOneDecimal = (number) => {
    return number.toFixed(1);
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
            {movieData.map((item) => {
                const image = buildImage(item.poster_path, "w500");
                const formattedDate = format(new Date(item.release_date), 'MMMM dd, yyyy');
                const roundedVoteAverage = roundToOneDecimal(item.vote_average);

                    return (
                        <Link to={`/movie/${item.id}`} className="movie-item">
                            <img src={image} className="movie-list-img"/>
        
                            <div className="movie-name">
                                <div>{item.original_title ? item.original_title : item.original_name}</div>
                                <div>{formattedDate}</div>
                                <div className="vote-average">{roundedVoteAverage}</div>
                            </div>
        
        
                        </Link>
                    )
                }
        
            )}

        </div>
    </div>
  )
}

export default MovieList