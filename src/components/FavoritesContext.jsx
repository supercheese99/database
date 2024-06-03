import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Initialize favorites from session storage or use an empty array if not present
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = sessionStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    // Update session storage whenever favorites change
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
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
