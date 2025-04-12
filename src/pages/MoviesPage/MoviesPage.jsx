import { useContext, useEffect, useState } from 'react';
import css from './MoviesPage.module.css';
import { DataContext } from '../../components/DataContext/DataContext';
import { SearchBox } from '../../components/SearchBox/SearchBox';
import MoviesList from '../../components/MoviesList/MoviesList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const { movies, setUrl, setQuery, isLoading, setCurrentPage, totalPages, currentPage, error } =
    useContext(DataContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const movieQuery = searchParams.get('query') ?? '';
  const pageFromParams = Number(searchParams.get('page')) || 1;

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (value !== '') {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }

    setSearchParams(updatedParams);
  };

  useEffect(() => {
    const url = '/3/search/movie';
    setUrl(url);
    setQuery(movieQuery);
    setCurrentPage(pageFromParams);
  }, [movieQuery, pageFromParams, setCurrentPage, setQuery, setUrl]);

  const handlePageChange = page => {
    setCurrentPage(page);
    updateSearchParams('page', page);
  };

  return (
    <div>
      <SearchBox value={movieQuery} onChange={value => updateSearchParams('query', value)} />
      {isLoading && <Loader />}
      <MoviesList movies={movies} />
      {error && <ErrorMessage />}
      {movies.length !== 0 && totalPages > 1 && (
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
