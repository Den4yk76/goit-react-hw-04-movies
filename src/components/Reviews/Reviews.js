import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './Reviews.module.css';

export default function Reviews({ movieId }) {
  const api_key = '?api_key=c65fb4b4036e2137b5346647b44aa2c0';
  const movie_url = `https://api.themoviedb.org/3/movie/${movieId}/reviews${api_key}&page=1`;

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(movie_url).then(res => setReviews(res.data.results));
  }, [movie_url]);

  return (
    <ul className={styles.castList}>
      {reviews.length
        ? reviews.map(review => {
            return (
              <li key={review.id}>
                <b>Author: {review.author}</b>
                <p>{review.content}</p>
              </li>
            );
          })
        : 'We don`t have any reviews for this movie'}
    </ul>
  );
}
