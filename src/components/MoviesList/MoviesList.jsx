import { NavLink, useLocation } from 'react-router-dom';
import css from './MoviesList.module.css';

const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {movies.map(
        movie =>
          movie.poster_path && (
            <li key={movie.id} className={css.item}>
              <NavLink to={`/movies/${movie.id}`} state={location} className={css.poster}>
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className={css.img}
                  />
                )}
                {movie.title}
              </NavLink>
            </li>
          )
      )}
    </ul>
  );
};

export default MoviesList;
