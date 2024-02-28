import React from 'react'
import CarouselItem from './CarouselItem'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieList from './MovieList'
import axios from 'axios'
import AppRouter from '../routers/AppRouter'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


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
};

function buildImage(path, size) {
  return `http://image.tmdb.org/t/p/${size}${path}`;
}


  return (
    <Slider {...settings}>
        {movieData.map((item) => {
          const image = buildImage(item.poster_path, "w500");
          return (
            <div key={item.id} className="slider-item">
              <Link to={`/movie/${item.id}`} className="movie-item">
                <img src={image} alt={item.original_title} />
              </Link>
            </div>
          )
          })}
    </Slider>
  )
}

export default Carousel