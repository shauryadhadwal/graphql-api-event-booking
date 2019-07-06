import React from 'react';
import './App.css';
import AuthPage from './pages/Auth/Auth';
import Layout from './components/Layout/Layout';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect path="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/events" component={null} />
          <Route path="/bookings" component={null} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
