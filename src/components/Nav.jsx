import {NavLink} from 'react-router-dom';
import Hamburger from './Hamburger';

const Nav = () => {
    function blur(e){
        e.target.blur();
    }

    return(
        <nav className="main-nav" onClick={blur}>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/favorites">Favorites</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
            </ul>

            <div>
                <Hamburger />
            </div>
        </nav>
    )
}

export default Nav;