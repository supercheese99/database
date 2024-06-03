import {NavLink, BrowserRouter, Routes, Route} from 'react-router-dom';
import Hamburger from './Hamburger';
import SearchBar from './SearchBar'
import { useState } from 'react';

const Nav = ({ onSearch: handleSearch }) => {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const onSearch = (query) => {
        console.log(`Performing a search of: ${query}`);
      }

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }

    return(
        <div>
            <div className="hamburger" onClick={toggleHamburger}>
                <Hamburger />
            </div>
            <nav className="main-nav">
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/favorites">Favorites</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><SearchBar onSearch={handleSearch} /></li>
                </ul>
            </nav>

            <style jsx>
                {`
                .main-nav ul {
                    display: ${hamburgerOpen ? 'inline' : 'none'};
                }
                `}
            </style>
        </div>

    )
}

export default Nav;