import { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, getCookie } from '../utils/cookies'; // Adjust the import path as needed

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Initialize favorites from session storage or use an empty array if not present
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = sessionStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    const sessionDuration = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds
    const now = new Date().getTime();
    const timestamp = getCookie('session-timestamp');

    if (!timestamp || now - parseInt(timestamp, 10) > sessionDuration) {
      sessionStorage.clear();
    } else {
      const storedFavorites = sessionStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }

    setCookie('session-timestamp', now.toString(), 90); // Set cookie for 90 days
  }, []);

  useEffect(() => {
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
    const now = new Date().getTime();
    setCookie('session-timestamp', now.toString(), 90); // Update session timestamp
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
