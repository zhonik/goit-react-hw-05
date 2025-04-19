// import { createContext, useState, useEffect } from 'react';
// import { getMovies } from '../../movie-api';

// export const DataContext = createContext();

// export const DataProvider = ({ children }) => {
//   const [movies, setMovies] = useState([]);
//   const [movieDetails, setMovieDetails] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [url, setUrl] = useState('');
//   const [query, setQuery] = useState('');
//   const [movieCast, setMovieCast] = useState([]);
//   const [movieReviews, setMovieReviews] = useState([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       if (!url) return;
//       setError(null);

//       try {
//         setIsLoading(true);
//         const data = await getMovies(url, currentPage && currentPage, query && query);
//         url.includes('trending') && setMovies(data.results);
//         data.total_pages && setTotalPages(data.total_pages);
//         url.includes('credits') && setMovieCast(data.cast);
//         data.runtime && setMovieDetails(data);
//         url.includes('reviews') && setMovieReviews(data.results);
//         console.log(url);
//       } catch (error) {
//         setError(error);
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [url, currentPage, query]);

//   const dataMovie = {
//     movies,
//     movieDetails,
//     movieCast,
//     movieReviews,
//     isLoading,
//     error,
//     currentPage,
//     totalPages,
//     setCurrentPage,
//     setUrl,
//     setQuery,
//   };

//   return <DataContext.Provider value={dataMovie}>{children}</DataContext.Provider>;
// };
