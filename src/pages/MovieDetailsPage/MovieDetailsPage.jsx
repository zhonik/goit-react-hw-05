import { useLocation, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { useContext } from 'react';
import { DataContext } from '../../components/DataContext/DataContext';

const MovieDetailsPage = () => {
  const { movies } = useContext(DataContext);
  const location = useLocation();

  const backLinkHref = location.state ?? '/';

  const { movieId } = useParams();

  return <div>MovieDetailsPage</div>;
};

export default MovieDetailsPage;
