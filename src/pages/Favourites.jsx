import React from 'react'
import {useEffect} from 'react';
import { Link } from 'react-router-dom';


const Favourites = ({favorites}) => {

  useEffect(() => {
    document.title = 'Favourites';
  }, []);

  return (
    <div className="favorites-wrapper">
      <h1>Favourites</h1>
      {/* {favorites.length === 0 ? ( */}
      <div className="no-fave">
        <p>No favourite movies yet. Add some from the <Link to='/'>Movie List!</Link></p>
      </div>
      {/* ) : (
        <ul>
          {favorites.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )} */}
    </div>
  )
}

export default Favourites