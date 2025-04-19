import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { getMovieCast } from '../../movie-api';

const MovieCast = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movieCast, setMovieCast] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  // useEffect(() => {
  //   const url = `/3/movie/${movieId}/credits`;
  //   setUrl(url);
  //   console.log(movieCast);
  // }, [movieCast, movieId, setUrl]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const { cast } = await getMovieCast(movieId);
        setMovieCast(cast);
        console.log(cast);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [movieId]);

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <>
      {isLoading && <Loader />}
      {!error && !isLoading && (
        <ul className={css.list}>
          {movieCast.map(({ cast_id, character, name, profile_path }) => (
            <li key={cast_id} className={css.item}>
              <h3 className={css.title}>{character}</h3>

              <img
                src={profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : defaultImg}
                alt={name}
                className={css.img}
              />

              <h3 className={css.name}>{name}</h3>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
