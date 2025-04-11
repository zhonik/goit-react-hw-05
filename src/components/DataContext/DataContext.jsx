import { createContext, useState, useEffect } from 'react';
import { getMovies } from '../../movie-api';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      if (!url) return;

      setIsLoading(true);

      try {
        const { results, total_pages } = await getMovies(url, currentPage);
        setMovies(results);
        setTotalPages(total_pages);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingMovies();
  }, [url, currentPage]);

  const getMovieById = movieId => {
    return movies.find(movie => movie.id === movieId);
  };

  const dataMovie = {
    movies,
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    setUrl,
    error,
    getMovieById,
  };

  return <DataContext.Provider value={dataMovie}>{children}</DataContext.Provider>;
};
