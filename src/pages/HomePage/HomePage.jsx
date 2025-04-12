import { useContext, useEffect } from 'react';
import css from './HomePage.module.css';
import { NavLink, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import { DataContext } from '../../components/DataContext/DataContext';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MoviesList from '../../components/MoviesList/MoviesList';

const HomePage = () => {
  const { movies, setUrl, isLoading, setCurrentPage, totalPages, currentPage, error } =
    useContext(DataContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromParams = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const url = '/3/trending/movie/week';
    setUrl(url);
    setCurrentPage(pageFromParams);
  }, [pageFromParams, setCurrentPage, setUrl]);

  const handlePageChange = page => {
    setCurrentPage(page);
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set('page', page);
    setSearchParams(updatedParams);
  };

  return (
    <main>
      {isLoading && <Loader />}
      {movies && <MoviesList movies={movies} />}
      {error && <ErrorMessage />}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default HomePage;
