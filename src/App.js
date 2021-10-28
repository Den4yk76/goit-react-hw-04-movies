// import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/HomePage/HomePage';
import MoviesPage from './components/MoviesPage/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage/MovieDetailsPage';
import NotFoundView from './components/NotFoundView/NotFoundView';

export default function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>

        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </>
  );
}