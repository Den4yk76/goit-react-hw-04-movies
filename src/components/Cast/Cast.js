import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './Cast.module.css';

export default function Cast({ movieId }) {
  const api_key = '?api_key=c65fb4b4036e2137b5346647b44aa2c0';
  const movie_url = `https://api.themoviedb.org/3/movie/${movieId}/credits${api_key}`;

  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios.get(movie_url).then(res => setCast(res.data.cast));
  }, [movie_url]);

  return (
    <ul className={styles.castList}>
      {cast.map(actor => {
        return (
          <li key={actor.id}>
            <img
              className={styles.actorImage}
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt=""
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        );
      })}
    </ul>
  );
}
