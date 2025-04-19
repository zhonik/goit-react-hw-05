import { useEffect, useState } from 'react';
import { SearchBox } from '../../components/SearchBox/SearchBox';
import MoviesList from '../../components/MoviesList/MoviesList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { getMovies } from '../../movie-api';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const movieQuery = searchParams.get('query') ?? '';
  const pageFromParams = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (!movieQuery) return;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setCurrentPage(pageFromParams);

        const { results, total_pages } = await getMovies(pageFromParams, movieQuery);
        setMovies(results);
        setTotalPages(total_pages);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieQuery.trim() !== '') {
      fetchMovies();
    } else {
      setMovies([]);
      setTotalPages(null);
    }
  }, [movieQuery, pageFromParams]);

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (value !== '') {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }

    if (key === 'query') {
      updatedParams.delete('page');
      setCurrentPage(1);
    }

    setSearchParams(updatedParams);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    updateSearchParams('page', page);
  };

  return (
    <div>
      <SearchBox onChange={value => updateSearchParams('query', value)} />
      {isLoading && <Loader />}
      {!isLoading && !error && <MoviesList movies={movies} />}
      {error && <ErrorMessage />}
      {movies.length !== 0 && totalPages > 1 && !isLoading && !error && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MoviesPage;
