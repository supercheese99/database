import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
// components
import Header from "../components/Header"
import Footer from "../components/Footer"

// pages
import HomePage from "../pages/HomePage"
import AboutPage from "../pages/AboutPage"
import MoviePage from "../pages/MoviePage"
import Favorites from "../pages/Favorites"
import Carousel from "../components/Carousel"
import BackToTop from "../components/BackToTop"
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
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search/:query" element={<SearchPage searchResults={searchResults} />} />
        </Routes>
        <BackToTop />
        <Footer />
    </BrowserRouter>
  )
}

export default AppRouter;