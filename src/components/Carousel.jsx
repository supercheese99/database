import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieList from './MovieList'
import axios from 'axios'
import AppRouter from '../routers/AppRouter'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {format} from 'date-fns';


const Carousel = () => {

const [movieData, setMovieData] = useState([]);
const apiKey = 'db9961badca6dffe6a5b761b090bdc89';

const getRandomMovies = async () => {
  try {
    const resp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`);

    console.log(resp.data.results);

    setMovieData(resp.data.results);

  } catch (e) {
    console.error('Error fetching random movies:', e);
  }
};

useEffect(() => {
  getRandomMovies();
}, []);

// slick slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '0',
};

function buildImage(path, size) {
  return `http://image.tmdb.org/t/p/${size}${path}`;
}

// shorten the overview
const truncateOverview = (overview, maxLength) => {
  if (!overview) {
    return ''; // Handle the case where overview is null or undefined
  }
  if (overview.length <= maxLength) {
    return overview;
  }
  return overview.substring(0, maxLength).trim() + '...';
};

// display only one decimal place
const roundToOneDecimal = (number) => {
  return number.toFixed(1);
};

  return (
    <div className='carousel-container'>
      <Slider {...settings}>
          {movieData.map((item) => {
            const image = buildImage(item.backdrop_path, "w780");
            const truncatedOverview = truncateOverview(item.overview, 150);
            const formattedDate = format(new Date(item.release_date), 'MMMM dd, yyyy');
            const roundedVoteAverage = roundToOneDecimal(item.vote_average);

            return (
              <div key={item.id} className="slider-item">
                <div className='image-container'>

                <div className="movie-item">
                  <img src={image} alt={item.original_title} className='slider-img'/>

                    <div className='title-overlay'>
                      <h2>{item.original_title}</h2>
                      <h4>{formattedDate}</h4>
                      <p>{truncatedOverview}</p>

                      <Link to={`/movie/${item.id}`}>
                      <button>See More</button>
                      </Link>
                    </div>

                </div>

                </div>
              </div>
            )
            })}
      </Slider>
    </div>
  )
}

export default Carousel