import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './HomePage.module.css';

export default function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);

  const base_url = 'https://api.themoviedb.org/3/trending/movie/day';
  const api_key = '?api_key=c65fb4b4036e2137b5346647b44aa2c0';
  const url = base_url + api_key;

  useEffect(() => {
    axios.get(url).then(res => setMovies(res.data.results));
  }, [url]);

  return (
    <>
      <h1 className={styles.heading}>Trending today</h1>
      <ul className={styles.list}>
        {movies.map(movie => {
          if (movie.title) {
            return (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: {
                      from: '/',
                      label: 'Back to Home',
                    },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            );
          }
          if (movie.name) {
            return (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: {
                      from: '/',
                      label: 'Back to Home',
                    },
                  }}
                >
                  {movie.name}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}
