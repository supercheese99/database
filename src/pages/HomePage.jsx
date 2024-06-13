import React from 'react'
import Slides from '../components/Slides';
import { useEffect } from 'react'
import MovieList from '../components/MovieList';

const HomePage = () => {

  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
  <>
    <Slides />
    <MovieList />
  </>

  )
}

export default HomePage