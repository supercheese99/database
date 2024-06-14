import React, { useState } from 'react'
import {NavLink, BrowserRouter, Routes, Route} from 'react-router-dom'
import SearchBar from './SearchBar'
import { slide as Menu } from 'react-burger-menu'
import customOpenIcon from '../icons/menu-open.svg'
import customCloseIcon from '../icons/menu-close.svg'

const Nav = ({ onSearch: handleSearch }) => {

    //menu open/close icons
    const menuOpenSVG = () => (
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"/>
        </svg>
    );
    const menuCrossSVG = () => (
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
        </svg>
    );

    const onSearch = (query) => {
        console.log(`Performing a search of: ${query}`);
      }

    return(
        <div className="hamburger-wrapper">
            <Menu isOpen={false} width={'300px'} right 
            customBurgerIcon={<img className="open-menu-icon" src={customOpenIcon} />} 
            customCrossIcon={<img className="close-menu-icon" src={customCloseIcon} />} >
                <ul className="nav-links">
                    <li><NavLink to="/SuperMovies" >Home</NavLink></li>
                    <li><NavLink to="/SuperMovies/favorites" >Favorites</NavLink></li>
                    <li><NavLink to="/SuperMovies/about" >About</NavLink></li>
                    <li><SearchBar onSearch={handleSearch} /></li>
                </ul>
            </Menu>
        </div>
    )
}

export default Nav;