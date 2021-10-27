import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export default function HomePage(popularMovies) {
    const [movies, setMovies] = useState([]);

    const base_url = 'https://api.themoviedb.org/3/trending/movie/day';
    const api_key = '?api_key=c65fb4b4036e2137b5346647b44aa2c0';
    const url = base_url + api_key;

    useEffect(() => {
        if (movies.length === 0) {
            axios.get(url).then(res => setMovies(res.data.results));
        }
    }, []);

    return (
        <ul className={styles.list}>
            {movies.map(movie => {
                if (movie.title) {
                    return (
                        <li key={movie.id}>
                            <Link>{movie.title}</Link>
                        </li>
                    );
                }
                if (movie.name) {
                    return (
                        <li key={movie.id}>
                            <Link>{movie.name}</Link>
                        </li>
                    );
                }
            })}
        </ul>
    );
}
