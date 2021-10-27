import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieImg, setMovieImg] = useState(null);

  const api_key = '?api_key=c65fb4b4036e2137b5346647b44aa2c0';
  const base_movie_url = `https://api.themoviedb.org/3/movie/`;
  const movie_url = base_movie_url + movieId + api_key;

  useEffect(() => {
    axios.get(movie_url).then(res => setMovie(res.data));
  }, [movie_url]);

  return (
    <>
      {movie && (
        <div className={styles.container}>
          <div>
            <img
              className={styles.image}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          </div>
          <div className={styles.filmInfo}>
            <h2>{movie.title}</h2>
            <p>{movie.release_date}</p>
          </div>
        </div>
      )}
    </>
  );
}
