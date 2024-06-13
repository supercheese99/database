import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <footer id="footer-1">
      <nav>
        <h2>Legal</h2>
        <Link to="">Terms Of Use</Link>
        <Link to="">Privacy Policy</Link>
      </nav>

      <nav>
        <h2>The Basics</h2>
        <Link to="/about">About Super Movies</Link>
        <Link to="https://www.themoviedb.org/">API</Link>
      </nav>
    </footer>

    <footer id="footer-2">
    2024 &copy; by Oliwia Wegner
    </footer>
    </>
  )
}

export default Footer