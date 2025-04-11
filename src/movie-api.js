import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org';
axios.defaults.headers = {
  accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTVkMzEyNjM4YmYyOTQ4M2U5ZjE2MzNjNDM2YjNmMCIsIm5iZiI6MTc0NDM3NjQ1MC4wODUsInN1YiI6IjY3ZjkxMjgyMWJjNjM5NTY2YWRhMTcyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u_1gyuYKDvuU1nJhPQ1PjlvNYXCMFOVVP61ddABZo40',
};

export const getMovies = async (path, page) => {
  const response = await axios.get(`${path}?page=${page}`);
  console.log(response);
  return response.data;
};
