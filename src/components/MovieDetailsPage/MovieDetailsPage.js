import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();
  console.log('url', url);
  const history = useHistory();
  const location = useLocation();

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const api_key = '?api_key=c65fb4b4036e2137b5346647b44aa2c0';
  const base_movie_url = `https://api.themoviedb.org/3/movie/`;
  const movie_url = base_movie_url + movieId + api_key;

  useEffect(() => {
    axios.get(movie_url).then(res => setMovie(res.data));
  }, [movie_url]);

  const handleClick = () => {
    history.push(location?.state?.from ?? '/movies');
    // history.push(location?.state?.from?.location?.search ?? '');
  };
  console.log('CARD Loaction: ', location);

  return (
    <>
      <button type="button" onClick={handleClick}>
        {location?.state?.label}
      </button>
      {movie && (
        <>
          <div className={styles.container}>
            <div>
              <img
                className={styles.image}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
              />
            </div>
            <div className={styles.filmInfo}>
              <h2>
                {movie.title} ({movie.release_date})
              </h2>
              <p>User score: {movie.vote_average}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul className={styles.ganresList}>
                {movie.genres.map(genre => {
                  return (
                    <li className={styles.ganresListItem} key={genre.id}>
                      {genre.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <hr />
          <h2>Additional information</h2>
          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: {
                    from: '/movies',
                    label: 'Back to movies from Cast',
                  },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: {
                    from: '/movies',
                    label: 'Back to movies from Reviews',
                  },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route path="/movies/:movieId/cast">
              <Cast movieId={movieId} />
            </Route>
            <Route path="/movies/:movieId/reviews">
              <Reviews movieId={movieId} />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}
