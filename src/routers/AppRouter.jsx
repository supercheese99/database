import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
// components
import Header from "../components/Header"
import Footer from "../components/Footer"
import Slides from "../components/Slides"
import BackToTop from "../components/BackToTop"

// pages
import HomePage from "../pages/HomePage"
import AboutPage from "../pages/AboutPage"
import MoviePage from "../pages/MoviePage"
import Favorites from "../pages/Favorites"
import SearchPage from "../pages/SearchPage"
import SearchBar from "../components/SearchBar"

const AppRouter = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/SuperMovies" element={<HomePage />} />
            <Route path="/SuperMovies/about" element={<AboutPage />} />
            <Route path="/SuperMovies/movie/:id" element={<MoviePage />} />
            <Route path="/SuperMovies/favorites" element={<Favorites />} />
            <Route path="/SuperMovies/search/:query" element={<SearchPage searchResults={searchResults} />} />
        </Routes>
        <BackToTop />
        <Footer />
    </BrowserRouter>
  )
}

export default AppRouter;