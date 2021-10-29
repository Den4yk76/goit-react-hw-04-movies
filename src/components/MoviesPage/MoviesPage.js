import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const base_url = 'https://api.themoviedb.org/3/search/movie';
  const api_key = '?api_key=c65fb4b4036e2137b5346647b44aa2c0';
  const query = `&query=${searchQuery}`;
  const searchUrl = base_url + api_key + query;
  const urlQuery = new URLSearchParams(location.search).get('query');

  const onSubmit = e => {
    e.preventDefault();
    console.log('сработал onSubmit');
    setSearchQuery(inputValue);
  };

  useEffect(() => {
    if (!searchQuery && !urlQuery) {
      return;
    }

    if (!inputValue && urlQuery) {
      const prevQuery = `&query=${urlQuery}`;
      const searchUrl = base_url + api_key + prevQuery;
      axios
        .get(searchUrl)
        .then(res => setMovies(res.data.results))
        .then(
          console.log('сработал if (!searchQuery && urlQuery)'),
          history.push({
            ...location,
            search: `query=${urlQuery}`,
          }),
        );
    } else
      axios
        .get(searchUrl)
        .then(res => setMovies(res.data.results))
        .then(
          console.log('сработал else'),
          history.push({
            ...location,
            search: `query=${searchQuery}`,
          }),
        );
  }, [searchQuery]);

  const onChange = e => {
    setInputValue(e.target.value);
  };

  // console.log('location', location);
  return (
    <>
      <form className="SearchForm" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="searh"
          value={inputValue}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />

        <button type="submit" className="SearchForm-button">
          Search
        </button>
      </form>
      {movies.length > 0 && (
        <ul>
          {movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: {
                      from: {
                        location,
                        label: 'Back to movies from moviePage',
                      },
                    },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
