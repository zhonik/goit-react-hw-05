import { useContext, useEffect } from 'react';
import css from './HomePage.module.css';
import { NavLink } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import { DataContext } from '../../components/DataContext/DataContext';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const HomePage = () => {
  const { movies, setUrl, isLoading, setCurrentPage, totalPages, currentPage, error } =
    useContext(DataContext);

  useEffect(() => {
    const url = '/3/trending/movie/week';
    setUrl(url);
  }, [setUrl]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <main>
      {isLoading && <Loader />}
      <ul className={css.list}>
        {movies.map(movie => (
          <li key={movie.id} className={css.item}>
            <NavLink to={`${movie.id}`} className={css.poster}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                className={css.img}
              />
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
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
