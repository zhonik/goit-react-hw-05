import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { useEffect, useState } from 'react';
import { BackLink } from '../../components/BackLink/BackLink';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getMovieDetails } from '../../movie-api';
import Loader from '../../components/Loader/Loader';

const MovieDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState({});
  const [error, setError] = useState(null);

  const location = useLocation();
  const { movieId } = useParams();

  const backLinkHref = location.state ?? '/movies';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);

        const movieDetails = await getMovieDetails(movieId); // закінчив тут, потрібно доналаштувати МувіДетейлс
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
      <BackLink to={backLinkHref}>Back to movies</BackLink>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={css.container}>
          <img
            src={poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : defaultImg}
            alt={title}
          />

          {movies && (
            <div className={css.movieDetails}>
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

      <ul>
        <li>
          <Link to='cast' state={location.state}>
            Cast
          </Link>
        </li>
        <li>
          <Link to='reviews' state={location.state}>
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
