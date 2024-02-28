import React from 'react'
import {useEffect} from 'react';

const Favourites = () => {

  useEffect(() => {
    document.title = 'Favourites';
  }, []);

  return (
    <div>Favourites</div>
  )
}

export default Favourites