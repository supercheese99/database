import { useState } from 'react'
import AppRouter from './routers/AppRouter'
import { FavoritesProvider } from './components/FavoritesContext';
import './App.scss'

function App() {

  return (

    <>
    <FavoritesProvider>
      <AppRouter />
    </FavoritesProvider>
    </>
  )
}

export default App
