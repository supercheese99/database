import { BrowserRouter, Routes, Route } from "react-router-dom"
// components
import Header from "../components/Header"
import Footer from "../components/Footer"

// pages
import HomePage from "../pages/HomePage"
import AboutPage from "../pages/AboutPage"
import MoviePage from "../pages/MoviePage"
import Favourites from "../pages/Favourites"
import Carousel from "../components/Carousel"
import BackToTop from "../components/BackToTop"
import SearchPage from "../pages/SearchPage"



const AppRouter = () => {


  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/search/:query" element={<SearchPage />} />
        </Routes>
        <BackToTop />
        <Footer />
    </BrowserRouter>
  )
}

export default AppRouter