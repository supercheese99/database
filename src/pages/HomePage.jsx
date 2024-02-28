import React from 'react'
import Carousel from '../components/Carousel';
import { useEffect } from 'react'
import MovieList from '../components/MovieList';

const HomePage = () => {

  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
  <>
    <Carousel />
    <MovieList />
  </>

  )
}

export default HomePage