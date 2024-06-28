import React from 'react'
import Nav from './Nav'
import { NavLink } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from 'react'

const Header = () => {

  return (
    <header>
      <NavLink to="/SuperMovies" id="logo">Super Movies</NavLink>
      < Nav/>
    </header>
  )
}

export default Header