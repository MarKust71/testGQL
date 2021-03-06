import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Home from './Views/Home';
import Login from './Views/Login';
import { useQuery } from '@apollo/react-hooks';

import { me } from './Components/Common'

const App = () => {
  const { data, loading, error } = useQuery(me);

  if (loading) return <p>Się ładuje...</p>;
  if (error) return `Błąd! ${error.message}`;

  if (!data.me && window.location.pathname !== '/login') return <Redirect to="/login" />;
  if (data.me && window.location.pathname !== '/') return <Redirect to="/" />;

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
    </Switch>
  );
};

export default withRouter(App);
