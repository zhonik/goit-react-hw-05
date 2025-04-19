import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { Suspense, useEffect, useRef, useState } from 'react';
import { BackLink } from '../../components/BackLink/BackLink';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getMovieDetails } from '../../movie-api';
import Loader from '../../components/Loader/Loader';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState({});
  const [error, setError] = useState(null);

  const location = useLocation();
  const { movieId } = useParams();

  const backLinkHref = useRef(location.state ?? '/movies');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const movieDetails = await getMovieDetails(movieId);
        setMovies(movieDetails);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [movieId]);

  const {
    genres,
    original_title,
    title,
    overview,
    poster_path,
    release_date,
    runtime,
    production_countries,
    tagline,
    vote_average,
  } = movies;

  const countries = production_countries && production_countries.map(item => item.name).join(', ');
  const genresToString = genres && genres.map(genre => genre.name).join(', ');
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <>
      <BackLink to={backLinkHref.current}>Back to movies</BackLink>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <div className={css.container}>
          <img
            src={poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : defaultImg}
            alt={title}
          />

          {movies && (
            <div>
              {title && <h1 className={css.title}>{title}</h1>}
              {original_title && <p className={css.subtitle}>{original_title}</p>}

              <ul className={css.list}>
                {vote_average && (
                  <li>
                    Rating: <span className={css.span}>{vote_average}/10</span>
                  </li>
                )}
                {tagline && (
                  <li>
                    Tagline: <span className={css.span}>{tagline}</span>
                  </li>
                )}
                {genresToString && (
                  <li>
                    Genres: <span className={css.span}>{genresToString}</span>
                  </li>
                )}
                {release_date && (
                  <li>
                    Release date: <span className={css.span}>{release_date}</span>
                  </li>
                )}
                {countries && (
                  <li>
                    Countries: <span className={css.span}>{countries}</span>
                  </li>
                )}
                {runtime && (
                  <li>
                    Duration: <span className={css.span}>{runtime} min.</span>
                  </li>
                )}
                {overview && (
                  <li>
                    Description: <span className={css.span}>{overview}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {!isLoading && !error && (
        <ul className={css.outletList}>
          <li className={css.outletItem}>
            <NavLink to='cast' state={location.state} className={buildLinkClass}>
              Cast
            </NavLink>
          </li>
          <li className={css.outletItem}>
            <NavLink to='reviews' state={location.state} className={buildLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
      )}
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
