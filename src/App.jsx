import { useState } from 'react'
import AppRouter from './routers/AppRouter'
import { FavoritesProvider } from './components/FavouritesContext';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

    <>
    <FavoritesProvider>
      <AppRouter />
    </FavoritesProvider>
    </>
  )
}

export default App
