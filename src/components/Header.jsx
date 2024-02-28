import React from 'react'
import SearchBar from './SearchBar'
import Nav from './Nav'
import { NavLink } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <NavLink to="/" id="logo">Super Movies</NavLink>

      < Nav/>
      < SearchBar/>
    </header>
  )
}

export default Header