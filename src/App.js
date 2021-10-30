import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
// import HomePage from './components/HomePage/HomePage';
// import MoviesPage from './components/MoviesPage/MoviesPage';
// import MovieDetailsPage from './components/MovieDetailsPage/MovieDetailsPage';
// import NotFoundView from './components/NotFoundView/NotFoundView';

const HomePage = lazy(() =>
  import('./components/HomePage/HomePage' /* webpackChunkName: 'HomePage' */),
);
const MoviesPage = lazy(() =>
  import(
    './components/MoviesPage/MoviesPage' /* webpackChunkName: 'MoviesPage' */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: 'MovieDetailsPage' */
  ),
);
const NotFoundView = lazy(() =>
  import(
    './components/NotFoundView/NotFoundView' /* webpackChunkName: 'NotFoundPage' */
  ),
);

export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback="waiting">
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
      </Suspense>
    </>
  );
}
