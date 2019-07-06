import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useStateValue } from './contexts/state-context';
import AuthPage from './pages/Auth/Auth';
import EventsPage from './pages/Events/Events';
import BookingsPage from './pages/Bookings/Bookings';

const Routes = () => {
    const [{token}] = useStateValue();

    return (
            <Switch>
                {!token && <Redirect path="/" to="/auth" exact />}
                {token && <Redirect path="/" to="/events" exact />}
                {token && <Redirect path="/auth" to="/events" />}
                <Route path="/auth" component={AuthPage} />
                <Route path="/events" component={EventsPage} />
                {token && <Route path="/bookings" component={BookingsPage} />}
            </Switch>
    )
}

export default Routes;