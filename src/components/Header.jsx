import React from 'react'
import SearchBar from './SearchBar'
import Nav from './Nav'
import { NavLink } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"

const Header = () => {

  const onSearch = (query) => {
    console.log(`Performing a search of: ${query}`);
  }

  return (
    <header>
      <NavLink to="/" id="logo">Super Movies</NavLink>

      < Nav/>
      < SearchBar onSearch={onSearch} />
    </header>
  )
}

export default Header