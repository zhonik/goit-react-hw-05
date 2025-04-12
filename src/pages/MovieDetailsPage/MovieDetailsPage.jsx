import { useLocation, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../components/DataContext/DataContext';
import { BackLink } from '../../components/BackLink/BackLink';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MovieDetailsPage = () => {
  const { movieDetails, setUrl, error } = useContext(DataContext);
  const location = useLocation();
  const { movieId } = useParams();

  const backLinkHref = location.state ?? '/movies';

  useEffect(() => {
    const url = `/3/movie/${movieId}`;
    setUrl(url);
  }, [movieDetails, movieId, setUrl]);

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
  } = movieDetails;

  const countries = production_countries && production_countries.map(item => item.name).join(', ');
  const genresString = genres && genres.map(genre => genre.name).join(', ');

  return (
    <>
      <BackLink to={backLinkHref}>Back to movies</BackLink>
      {error && <ErrorMessage />}
      <div className={css.container}>
        {poster_path && <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} />}

        {movieDetails && (
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
              {genresString && (
                <li>
                  Genres: <span className={css.span}>{genresString}</span>
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
    </>
  );
};

export default MovieDetailsPage;
