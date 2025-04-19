import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org';
axios.defaults.headers = {
  accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTVkMzEyNjM4YmYyOTQ4M2U5ZjE2MzNjNDM2YjNmMCIsIm5iZiI6MTc0NDM3NjQ1MC4wODUsInN1YiI6IjY3ZjkxMjgyMWJjNjM5NTY2YWRhMTcyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u_1gyuYKDvuU1nJhPQ1PjlvNYXCMFOVVP61ddABZo40',
};

export const getTrendingMovies = async page => {
  const response = await axios.get(`/3/trending/movie/week?page=${page}`);
  return response.data;
};

export const getMovies = async (page, query) => {
  const response = await axios.get(`/3/search/movie?page=${page}&query=${query}`);
  return response.data;
};

export const getMovieDetails = async id => {
  const response = await axios.get(`/3/movie/${id}`);
  return response.data;
};

export const getMovieReviews = async id => {
  const response = await axios.get(`/3/movie/${id}/reviews`);
  return response.data;
};

export const getMovieCast = async id => {
  const response = await axios.get(`/3/movie/${id}/credits`);
  return response.data;
};
