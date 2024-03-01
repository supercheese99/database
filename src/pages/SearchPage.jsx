import React from 'react'
import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar';
import { BrowserRouter, Routes, Route } from "react-router-dom"

const SearchPage = () => {

  useEffect(() => {
    document.title = 'Search Results';
  }, []);

  return (
    <div><h2>Search Results</h2></div>
  )
}

export default SearchPage