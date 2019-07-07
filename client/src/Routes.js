import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useStateValue } from './contexts/state-context';
import AuthPage from './pages/Auth/Auth';
import EventsPage from './pages/Events/Events';
import BookingsPage from './pages/Bookings/Bookings';
import Logout from './pages/Logout/Logout';

const Routes = () => {
    const [{ token }] = useStateValue();

    return (
        <Switch>
            {token && <Redirect path="/auth" to="/events" exact />}
            {token && <Route path="/logout" component={Logout} />}
            <Route path="/events" component={EventsPage} />
            {token && <Route path="/bookings" component={BookingsPage} />}
            {!token && <Route path="/auth" component={AuthPage} />}
            {token && <Redirect to="/events" />}
            {!token && <Redirect to="/auth" />}
        </Switch>
    )
}

export default Routes;