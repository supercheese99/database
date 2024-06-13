import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieList from './MovieList'
import axios from 'axios'
import AppRouter from '../routers/AppRouter'
import { Link } from 'react-router-dom'
import {format} from 'date-fns'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'


const Slides = () => {

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

function buildImage(path, size) {
  return `http://image.tmdb.org/t/p/${size}${path}`;
}

// shorten the overview
const truncateOverview = (overview, maxLength) => {
  if (!overview) {
    return 'No overview available.'; // Handle the case where overview is null or undefined
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
    <Swiper
    spaceBetween={100}
    slidesPerView={1}
    loop={true}
    // autoplay={{
    //   delay: 4000,
    //   disableOnInteraction: false
    // }}
    // modules={[Autoplay]}
    allowTouchMove={true}
    preventClicks={false}
    // preventClicksPropagation={false}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}>

        {movieData.map((item) => {
          const image = buildImage(item.backdrop_path, "w780");
          const truncatedOverview = truncateOverview(item.overview, 150);
          const formattedDate = format(new Date(item.release_date), 'MMMM dd, yyyy');
          const roundedVoteAverage = roundToOneDecimal(item.vote_average);

          return (
            <SwiperSlide key={item.id}>
            <div className="swiper-item">
              <div className="slider-movie-item">
                <div className='slider-img'>
                  <img src={image} alt={item.original_title} />
                </div>

                <div className='title-overlay'>
                  <h2>{item.original_title}</h2>
                  <h4>{formattedDate}</h4>
                  <p className='truncatedOverview'>{truncatedOverview}</p>

                  <Link to={`/movie/${item.id}`}>
                  <button>Read More</button>
                  </Link>
                </div>

              </div>
            </div>
            </SwiperSlide>

          )
          })}
    </Swiper>
  )
}

export default Slides