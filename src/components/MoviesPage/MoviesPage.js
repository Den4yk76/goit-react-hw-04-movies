import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const base_url = 'https://api.themoviedb.org/3/search/movie';
  const api_key = '?api_key=c65fb4b4036e2137b5346647b44aa2c0';
  const query = `&query=${searchQuery}`;
  const searchUrl = base_url + api_key + query;

  const onSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      axios
        .get(searchUrl)
        .then(res => setMovies(res.data.results))
        .then(
          history.push({
            ...location,
            search: `query=${searchQuery}`,
          }),
        );
      // .then(console.log(history));
    } else alert('Add your search query');
  };

  // useEffect(() => {
  //   if (searchQuery.trim() === '') {
  //     return;
  //   }
  //   const sortOrder = new URLSearchParams(location.search).get('query');
  //   setSearchQuery(sortOrder);
  //   console.log(sortOrder);
  //   axios.get(searchUrl).then(res => setMovies(res.data.results));
  // }, []);

  const onChange = e => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <form className="SearchForm" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="searh"
          value={searchQuery}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />

        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>
      {movies.length > 0 && (
        <ul>
          {movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
