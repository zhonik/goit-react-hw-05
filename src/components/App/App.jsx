import { Route, Routes } from 'react-router-dom';
import css from './App.module.css';
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Navigation from '../Navigation/Navigation';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import { DataProvider } from '../DataContext/DataContext';

const App = () => {
  return (
    <DataProvider>
      <div className={css.container}>
        <Navigation />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movie' element={<MoviesPage />}>
            <Route path='cast' element={<MovieCast />} />
            <Route path='reviews' element={<MovieReviews />} />
          </Route>
          <Route path='/movie/:movieId' element={<MovieDetailsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </DataProvider>
  );
};

export default App;
