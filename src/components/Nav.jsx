import React from 'react';
import {NavLink, BrowserRouter, Routes, Route} from 'react-router-dom';
import SearchBar from './SearchBar'
import { slide as Menu } from 'react-burger-menu';
import { useState } from 'react';

const Nav = ({ onSearch: handleSearch }) => {

    const onSearch = (query) => {
        console.log(`Performing a search of: ${query}`);
      }

    return(
        <div className="hamburger-wrapper">
            <Menu isOpen={false} width={'300px'} right>
                <ul className="nav-links">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/favorites">Favorites</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><SearchBar onSearch={handleSearch} /></li>
                </ul>
            </Menu>
        </div>
    )
}

export default Nav;