// import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Navigation from './components/Navigation/Navigation';
import NotFoundView from './components/NotFoundView/NotFoundView';

export default function App() {
    return (
        <>
            <Navigation />
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>

                <Route path="/movies">Filmec!</Route>

                <Route>
                    <NotFoundView />
                </Route>
            </Switch>
        </>
    );
}
