import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Recommended = () => {
  const [movieData, setMovieData] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

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
    <div className='recommended-container'>
      <h2>Check These Movies Out</h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {movieData.map((item) => {
          const image = buildImage(item.poster_path, 'w500');

          return (
            <SwiperSlide key={item.id}>
              <Link to={`/SuperMovies/movie/${item.id}`}>
                <div className='recommended-movie-item'>
                  <img src={image} alt={item.original_title} className='recommended-slider-img' />
                  <h2>{item.original_title}</h2>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Recommended;
