import { useEffect, useState } from 'react';
import css from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { getMovieReviews } from '../../movie-api';
import Loader from '../Loader/Loader';

const MovieReviews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const { results } = await getMovieReviews(movieId);
        setReviews(results);
        console.log(results);
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
          {reviews.length !== 0
            ? reviews.map(
                ({ author, content, created_at, id, author_details: { avatar_path } }) => (
                  <li key={id} className={css.item}>
                    <img
                      src={
                        avatar_path ? `https://image.tmdb.org/t/p/w200${avatar_path}` : defaultImg
                      }
                      alt={author}
                      className={css.img}
                    />

                    <div>
                      <div>
                        <h3 className={css.title}>{author}</h3>
                        <span>{format(new Date(created_at), 'PPpp')}</span>
                      </div>
                      <p className={css.content}>{content}</p>
                    </div>
                  </li>
                )
              )
            : 'We have not found any reviews for this film.'}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
